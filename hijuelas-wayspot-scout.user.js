import { assessPoint, countPoiKinds, parseObservedPois, s2Geometry, viewportS2Coverage, type GeoPoint, type ObservedPoi, type PoiCounts, type PoiKind, type S2Geometry } from "./geometry";
import { createCandidate, loadCandidates, saveCandidates, type CandidateStorage, type LocalCandidate } from "./candidate-store";
import { DEFAULT_COLOR_PREFERENCES, loadColorPreferences, saveColorPreferences, type ColorPreferences } from "./color-preferences";

declare const __WAYFINDER_LOGO__: string;
declare const __WAYFINDER_COUNT_ICONS__: Record<"pokestop" | "gym" | "powerspot", string>;

declare global {
  interface Window {
    google?: any;
    __hwsXhrObserverInstalled?: boolean;
  }
}

type GoogleMap = any;
type Polygon = any;
type Circle = any;
type ColorLayer = "s17" | "s14" | "pokestop" | "gym" | "powerspot";

function browserStorage(): CandidateStorage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

const candidateStorage = browserStorage();
const colorPreferences = candidateStorage ? loadColorPreferences(candidateStorage) : { ...DEFAULT_COLOR_PREFERENCES };

const THEME_STORAGE_KEY = "hws-theme";
type ThemePreference = "light" | "dark" | "auto";

function loadThemePreference(): ThemePreference {
  try {
    const raw = candidateStorage?.getItem(THEME_STORAGE_KEY);
    return raw === "light" || raw === "dark" ? raw : "auto";
  } catch {
    return "auto";
  }
}

function saveThemePreference(theme: ThemePreference): boolean {
  try {
    if (theme === "auto") candidateStorage?.removeItem(THEME_STORAGE_KEY);
    else candidateStorage?.setItem(THEME_STORAGE_KEY, theme);
    return true;
  } catch {
    return false;
  }
}

const MAP_ROUTE = "/new/mapview";
const GCS_PATH = "/api/v1/vault/mapview/gcs";
const MAX_DRAWN_CIRCLES = 220;
const MAX_VISIBLE_S17 = 1_500;
const MAX_VISIBLE_S14 = 350;
const CELL_COLORS = [
  { value: "#2a84e8", name: "Azul" },
  { value: "#f0b429", name: "Amarillo" },
  { value: "#e53935", name: "Rojo" },
  { value: "#1f9d70", name: "Verde" },
  { value: "#8e5cc7", name: "Morado" },
  { value: "#00a9c0", name: "Turquesa" },
  { value: "#ffab24", name: "Ámbar" },
  { value: "#f57c00", name: "Naranja" },
  { value: "#3949ab", name: "Índigo" },
  { value: "#795548", name: "Café" },
  { value: "#eceff1", name: "Blanco" },
] as const;
const PRIMARY_COLOR_COUNT = 6;

const state: {
  map: GoogleMap | null;
  mapListeners: any[];
  pois: Map<string, ObservedPoi>;
  polygons: Polygon[];
  circles: Circle[];
  markers: Circle[];
  candidateMarkers: Circle[];
  evaluation: GeoPoint | null;
  evaluationSource: "toque" | "candidato" | null;
  locationMessage: string;
  showS17: boolean;
  showS14: boolean;
  showCircles: boolean;
  panel: HTMLElement | null;
  result: HTMLElement | null;
  gcsStamp: number;
  s17Color: string;
  s14Color: string;
  pokestopColor: string;
  gymColor: string;
  powerspotColor: string;
  lineMultiplier: number;
  gridMessage: string;
  candidates: LocalCandidate[];
  candidateList: HTMLElement | null;
  candidateCount: HTMLElement | null;
  deselectButton: HTMLButtonElement | null;
} = {
  map: null,
  mapListeners: [],
  pois: new Map(),
  polygons: [],
  circles: [],
  markers: [],
  candidateMarkers: [],
  evaluation: null,
  evaluationSource: null,
  locationMessage: "Toca un punto del mapa para evaluar su L17, L14 y distancia de 22 m.",
  showS17: true,
  showS14: true,
  showCircles: true,
  panel: null,
  result: null,
  gcsStamp: 0,
  s17Color: colorPreferences.s17Color,
  s14Color: colorPreferences.s14Color,
  pokestopColor: colorPreferences.pokestopColor,
  gymColor: colorPreferences.gymColor,
  powerspotColor: colorPreferences.powerspotColor,
  lineMultiplier: 1,
  gridMessage: "Esperando límites del mapa",
  candidates: candidateStorage ? loadCandidates(candidateStorage) : [],
  candidateList: null,
  candidateCount: null,
  deselectButton: null,
};

function isMapCandidate(value: unknown): boolean {
  return !!value && typeof (value as any).getCenter === "function" && typeof (value as any).getDiv === "function";
}

function findMap(): GoogleMap | null {
  const host = document.querySelector("app-wf-base-map") as any;
  if (!host) return null;
  const context = host.__ngContext__ as unknown[] | undefined;
  if (!Array.isArray(context)) return null;

  for (const item of context) {
    if (isMapCandidate(item)) return item;
    if (item && typeof item === "object") {
      for (const key of ["map", "googleMap", "componentRef"]) {
        const candidate = (item as any)[key];
        if (isMapCandidate(candidate)) return candidate as GoogleMap;
        if (isMapCandidate((candidate as any)?.map)) return (candidate as any).map as GoogleMap;
      }
    }
  }
  return null;
}

function mapIsActive(): boolean {
  return window.location.pathname.startsWith(MAP_ROUTE);
}

function updatePanel(): void {
  const loaded = countPoiKinds([...state.pois.values()]);
  if (state.deselectButton) state.deselectButton.hidden = !state.evaluation;
  if (!state.result) return;
  if (!state.evaluation) {
    state.result.classList.remove("hws-result--selected");
    renderCountCards(loaded, "Vista actual del mapa");
    state.result.innerHTML = `<strong>Toca un punto del mapa</strong><span>${state.locationMessage}</span><small>Los contadores superiores muestran los datos que Wayfarer ya cargó en esta vista.</small>`;
    return;
  }

  const assessment = assessPoint(state.evaluation, [...state.pois.values()]);
  state.result.classList.add("hws-result--selected");
  renderCountCards(assessment.s14Counts, "Celda L14", true);
  const nearest = assessment.nearestInGame;
  const conflicts = assessment.within22InGame;
  const coordinateText = `${state.evaluation.lat.toFixed(6)}, ${state.evaluation.lng.toFixed(6)}`;
  const s17Summary = assessment.s17References.length
    ? wayspotCountText(assessment.s17References.length)
    : "Sin Wayspots";
  const distanceSummary = conflicts.length
    ? `Hay ${conflicts.length} ${conflicts.length === 1 ? "Wayspot" : "Wayspots"} a menos de 22m`
    : "No hay Wayspots a menos de 22m del punto seleccionado";
  const distanceDetails = conflicts.length
    ? conflicts.map((reference) => wayspotRowMarkup(reference.poi, reference.meters)).join("")
    : nearest
      ? wayspotRowMarkup(nearest.poi, nearest.meters, true)
      : `<span class="hws-card-empty">No hay Wayspots en el juego entre los datos cargados.</span>`;

  state.result.innerHTML = `
    <section class="hws-detail-card" aria-label="Wayspots de la celda L17 seleccionada">
      <strong class="hws-card-title">Celda L17 · ${s17Summary}</strong>
      ${assessment.s17References.length ? `<div class="hws-poi-list">${assessment.s17References.map((poi) => wayspotRowMarkup(poi)).join("")}</div>` : ""}
    </section>
    <section class="hws-detail-card" aria-label="Distancia de 22 metros para Nodos Energéticos">
      <strong class="hws-card-title">Distancia 22 m</strong>
      <span class="hws-card-status">${distanceSummary}</span>
      <div class="hws-poi-list">${distanceDetails}</div>
      ${coordinateMarkup(coordinateText)}
    </section>`;
  wireCoordinateCopyButton();
}

function renderCountCards(counts: PoiCounts, context: string, selected = false): void {
  const contextElement = document.getElementById("hws-count-context");
  if (contextElement) {
    contextElement.textContent = context;
    contextElement.classList.toggle("hws-count-context--selected", selected);
  }
  const cards: Array<["pokestop" | "gym" | "powerspot", string, string]> = [
    ["pokestop", "Poképaradas", state.pokestopColor],
    ["gym", "Gimnasios", state.gymColor],
    ["powerspot", "Nodos", state.powerspotColor],
  ];
  cards.forEach(([kind, label, color]) => {
    const number = document.getElementById(`hws-count-${kind}`);
    if (!number) return;
    number.textContent = String(counts[kind]);
    const box = number.parentElement;
    if (box) {
      box.style.setProperty("--hws-count", color);
      box.style.color = color;
    }
    number.setAttribute("aria-label", `${counts[kind]} ${label}`);
  });
}

function countIconMarkup(kind: "pokestop" | "gym" | "powerspot"): string {
  const source = __WAYFINDER_COUNT_ICONS__[kind];
  return `<img class="hws-count-icon" src="${source}" alt="" aria-hidden="true">`;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character);
}

function wayspotCountText(count: number): string {
  return `${count} ${count === 1 ? "Wayspot" : "Wayspots"}`;
}

function poiIconMarkup(kind: PoiKind): string {
  if (kind === "other") return `<span class="hws-poi-icon hws-poi-icon--other" aria-hidden="true">•</span>`;
  return `<img class="hws-poi-icon" src="${__WAYFINDER_COUNT_ICONS__[kind]}" alt="" aria-hidden="true">`;
}

function wayspotRowMarkup(poi: ObservedPoi, meters?: number, isNearest = false): string {
  const metadata = [
    isNearest ? "Más cercana" : "",
    isNearest ? "Está en el juego" : "",
    typeof meters === "number" ? `${meters.toFixed(1)} m` : "",
  ].filter(Boolean).join(" · ");
  return `<div class="hws-poi-row">${poiIconMarkup(poi.kind)}<div class="hws-poi-copy"><span class="hws-poi-name">${escapeHtml(poi.title)}</span>${metadata ? `<small class="hws-poi-meta">${metadata}</small>` : ""}</div></div>`;
}

function coordinateMarkup(coordinates: string): string {
  return `<div class="hws-coordinate"><span>Punto tocado</span><code>${coordinates}</code><button type="button" class="hws-copy-coordinate" data-hws-coordinates="${coordinates}" aria-label="Copiar coordenadas del punto tocado">Copiar</button></div>`;
}

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Firefox puede denegar el portapapeles de forma puntual; se usa la alternativa local.
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    textarea.remove();
  }
}

function wireCoordinateCopyButton(): void {
  const button = state.result?.querySelector<HTMLButtonElement>("[data-hws-coordinates]");
  if (!button) return;
  button.addEventListener("click", () => {
    const coordinates = button.dataset.hwsCoordinates;
    if (!coordinates) return;
    void copyText(coordinates).then((copied) => {
      if (!copied) return;
      button.textContent = "✓ Copiado";
      button.classList.add("hws-copy-coordinate--done");
      button.disabled = true;
    });
  });
}

function clearVisuals(): void {
  state.polygons.forEach((polygon) => polygon.setMap?.(null));
  state.circles.forEach((circle) => circle.setMap?.(null));
  state.markers.forEach((marker) => marker.setMap?.(null));
  state.candidateMarkers.forEach((marker) => marker.setMap?.(null));
  state.polygons = [];
  state.circles = [];
  state.markers = [];
  state.candidateMarkers = [];
}

function addCellGeometry(geometry: S2Geometry, color: string, opacity: number): void {
  const google = window.google;
  if (!google?.maps || !state.map) return;
  const polygon = new google.maps.Polygon({
    paths: geometry.vertices,
    strokeColor: color,
    strokeOpacity: 0.92,
    strokeWeight: (geometry.level === 14 ? 2.4 : 1.4) * state.lineMultiplier,
    fillColor: color,
    fillOpacity: opacity,
    clickable: false,
    zIndex: geometry.level === 14 ? 91 : 90,
    map: state.map,
  });
  state.polygons.push(polygon);
}

function circleColor(kind: PoiKind): string {
  if (kind === "gym") return state.gymColor;
  if (kind === "powerspot") return state.powerspotColor;
  return state.pokestopColor;
}

function mapBounds(): { south: number; west: number; north: number; east: number } | null {
  const bounds = state.map?.getBounds?.();
  if (!bounds) return null;
  const southWest = bounds.getSouthWest?.();
  const northEast = bounds.getNorthEast?.();
  if (!southWest || !northEast) return null;
  return { south: southWest.lat(), west: southWest.lng(), north: northEast.lat(), east: northEast.lng() };
}

function redraw(): void {
  clearVisuals();
  if (!state.map || !window.google?.maps) return;

  const bounds = mapBounds();
  if (bounds && bounds.west < bounds.east) {
    const s17 = viewportS2Coverage(bounds.south, bounds.west, bounds.north, bounds.east, 17, MAX_VISIBLE_S17);
    const s14 = viewportS2Coverage(bounds.south, bounds.west, bounds.north, bounds.east, 14, MAX_VISIBLE_S14);
    if (state.showS17 && s17.complete) s17.cells.forEach((cell) => addCellGeometry(cell, state.s17Color, 0.012));
    if (state.showS14 && s14.complete) s14.cells.forEach((cell) => addCellGeometry(cell, state.s14Color, 0.008));
    const details = [
      s17.complete ? `${s17.requiredCells} L17` : `L17: acerca el mapa (${s17.requiredCells}+ celdas)`,
      s14.complete ? `${s14.requiredCells} L14` : `L14: acerca el mapa (${s14.requiredCells}+ celdas)`,
    ];
    state.gridMessage = `Cuadrícula completa: ${details.join(" · ")}`;
  } else {
    state.gridMessage = "Cuadrícula no disponible: mueve el mapa fuera del antimeridiano";
  }

  if (state.evaluation) {
    if (state.showS17) addCellGeometry(s2Geometry(state.evaluation, 17), state.s17Color, 0.11);
    const evaluationMarker = new window.google.maps.Circle({
      center: state.evaluation,
      radius: 3,
      strokeColor: "#125eac",
      strokeOpacity: 1,
      strokeWeight: 1.5,
      fillColor: "#e7f2ff",
      fillOpacity: 1,
      clickable: false,
      zIndex: 97,
      map: state.map,
    });
    state.markers.push(evaluationMarker);
  }

  if (state.showCircles) {
    [...state.pois.values()]
      .filter((poi) => poi.gameState === "in-game" && poi.is22mReference)
      .slice(0, MAX_DRAWN_CIRCLES)
      .forEach((poi) => {
        const color = circleColor(poi.kind);
        const circle = new window.google.maps.Circle({
          center: poi,
          radius: 22,
          strokeColor: color,
          strokeOpacity: 0.9,
          strokeWeight: 1.5,
          fillColor: color,
          fillOpacity: 0.08,
          clickable: false,
          zIndex: 92,
          map: state.map,
        });
        state.circles.push(circle);
      });
  }
  state.candidates.forEach((candidate) => {
    const marker = new window.google.maps.Circle({
      center: candidate,
      radius: 8,
      strokeColor: "#6e42bd",
      strokeOpacity: 1,
      strokeWeight: 2,
      fillColor: "#d9c6ff",
      fillOpacity: 0.9,
      clickable: false,
      zIndex: 95,
      map: state.map,
    });
    state.candidateMarkers.push(marker);
  });
  renderCandidates();
  updatePanel();
}

function evaluatePoint(point: GeoPoint, source: "toque" | "candidato"): void {
  state.evaluation = point;
  state.evaluationSource = source;
  state.locationMessage = source === "toque" ? "Punto tocado evaluado." : "Candidato local evaluado.";
  redraw();
}

function clearEvaluation(): void {
  state.evaluation = null;
  state.evaluationSource = null;
  state.locationMessage = "Vista actual restaurada. Toca otro punto para evaluar su celda.";
  redraw();
}

function clearLocalData(): void {
  state.pois.clear();
  state.evaluation = null;
  state.evaluationSource = null;
  state.locationMessage = "Datos del mapa limpiados. Toca el mapa para evaluar un punto.";
  redraw();
}

function persistCandidates(): boolean {
  if (!candidateStorage || !saveCandidates(candidateStorage, state.candidates)) {
    state.locationMessage = "No se pudieron guardar candidatos locales. Revisa el almacenamiento del navegador.";
    updatePanel();
    return false;
  }
  return true;
}

function persistColorPreferences(): boolean {
  if (!candidateStorage) return false;
  const preferences: ColorPreferences = {
    s17Color: state.s17Color,
    s14Color: state.s14Color,
    pokestopColor: state.pokestopColor,
    gymColor: state.gymColor,
    powerspotColor: state.powerspotColor,
  };
  return saveColorPreferences(candidateStorage, preferences);
}

function renderCandidates(): void {
  if (state.candidateCount) state.candidateCount.textContent = String(state.candidates.length);
  const list = state.candidateList;
  if (!list) return;
  list.replaceChildren();
  if (!state.candidates.length) {
    const empty = document.createElement("p");
    empty.className = "hws-candidate-empty";
    empty.textContent = "No hay candidatos guardados en este navegador.";
    list.appendChild(empty);
    return;
  }
  state.candidates.forEach((candidate) => {
    const row = document.createElement("div");
    row.className = "hws-candidate-row";
    const open = document.createElement("button");
    open.className = "hws-candidate-open";
    open.textContent = `${candidate.title} · ${candidate.lat.toFixed(5)}, ${candidate.lng.toFixed(5)}`;
    open.addEventListener("click", () => {
      state.map?.panTo?.(candidate);
      evaluatePoint(candidate, "candidato");
    });
    const remove = document.createElement("button");
    remove.className = "hws-candidate-remove";
    remove.setAttribute("aria-label", `Eliminar ${candidate.title}`);
    remove.textContent = "×";
    remove.addEventListener("click", () => {
      const before = state.candidates;
      state.candidates = state.candidates.filter((item) => item.id !== candidate.id);
      if (!persistCandidates()) state.candidates = before;
      redraw();
    });
    row.append(open, remove);
    if (candidate.note) {
      const note = document.createElement("small");
      note.textContent = candidate.note;
      row.appendChild(note);
    }
    list.appendChild(row);
  });
}

function addCandidate(): void {
  if (!state.evaluation) {
    state.locationMessage = "Primero toca un punto del mapa antes de guardar un punto Wayfinder.";
    updatePanel();
    return;
  }
  const titleInput = document.getElementById("hws-candidate-title") as HTMLInputElement | null;
  const noteInput = document.getElementById("hws-candidate-note") as HTMLTextAreaElement | null;
  const candidate = createCandidate(state.evaluation, titleInput?.value ?? "", noteInput?.value ?? "");
  const before = state.candidates;
  state.candidates = [candidate, ...state.candidates];
  if (!persistCandidates()) {
    state.candidates = before;
    return;
  }
  if (titleInput) titleInput.value = "";
  if (noteInput) noteInput.value = "";
  state.locationMessage = "Candidato guardado únicamente en este navegador.";
  redraw();
}

function clearCandidates(): void {
  const before = state.candidates;
  state.candidates = [];
  if (!persistCandidates()) state.candidates = before;
  else {
    state.locationMessage = "Candidatos locales eliminados.";
    redraw();
  }
}

function paletteMarkup(layer: ColorLayer): string {
  const current = layer === "s17"
    ? state.s17Color
    : layer === "s14"
      ? state.s14Color
      : layer === "pokestop"
        ? state.pokestopColor
        : layer === "gym"
          ? state.gymColor
          : state.powerspotColor;
  const swatch = (color: (typeof CELL_COLORS)[number]) =>
    `<button class="hws-color${color.value === current ? " hws-color--active" : ""}" data-hws-color="${color.value}" data-hws-layer="${layer}" style="--hws-color:${color.value}" title="${color.name}" aria-label="Color ${color.name} para ${layer.toUpperCase()}"></button>`;
  const primary = CELL_COLORS.slice(0, PRIMARY_COLOR_COUNT);
  const extra = CELL_COLORS.slice(PRIMARY_COLOR_COUNT);
  const currentInExtra = extra.some((color) => color.value === current);
  const primaryMarkup = `<div class="hws-palette">${primary.map(swatch).join("")}</div>`;
  if (extra.length === 0) return primaryMarkup;
  return `${primaryMarkup}<details class="hws-palette-more"${currentInExtra ? " open" : ""}><summary>Más colores</summary><div class="hws-palette">${extra.map(swatch).join("")}</div></details>`;
}

function createUi(): void {
  if (document.getElementById("hws-root")) return;
  const root = document.createElement("div");
  root.id = "hws-root";
  root.innerHTML = `
    <button id="hws-toggle" aria-label="Abrir Wayfinder"><img src="${__WAYFINDER_LOGO__}" alt=""></button>
    <section id="hws-panel" aria-label="Wayfinder" hidden>
      <header><strong class="hws-title">Wayfinder</strong><button id="hws-theme" class="hws-theme-toggle" aria-label="Cambiar tema claro/oscuro" title="Cambiar tema">🌙</button><button id="hws-close" aria-label="Cerrar Wayfinder">×</button></header>
      <div class="hws-switches" aria-label="Capas visibles">
        <label class="hws-chip"><input id="hws-s17" type="checkbox" checked> Celda L17</label>
        <label class="hws-chip"><input id="hws-s14" type="checkbox" checked> Celda L14</label>
        <label class="hws-chip"><input id="hws-22m" type="checkbox" checked> Distancia 22m</label>
      </div>
      <section class="hws-counts" aria-label="Conteo de referencias en la celda seleccionada">
        <strong id="hws-count-context" class="hws-count-context">Wayspots en la vista actual del mapa</strong>
        <div class="hws-count-grid">
          <div class="hws-count-item"><div class="hws-count-number">${countIconMarkup("pokestop")}<span id="hws-count-pokestop">0</span></div><small>Poképaradas</small></div>
          <div class="hws-count-item"><div class="hws-count-number">${countIconMarkup("gym")}<span id="hws-count-gym">0</span></div><small>Gimnasios</small></div>
          <div class="hws-count-item"><div class="hws-count-number">${countIconMarkup("powerspot")}<span id="hws-count-powerspot">0</span></div><small>Nodos</small></div>
        </div>
      </section>
      <div id="hws-result" class="hws-result"></div>
      <button id="hws-deselect" class="hws-deselect" hidden>Volver a la vista actual</button>
      <p class="hws-hint">Toca un punto del mapa para revisar L17, L14 y la distancia empírica de 22 m.</p>
      <details class="hws-style">
        <summary>Capas del mapa</summary>
        <div class="hws-color-row"><span>L17</span>${paletteMarkup("s17")}</div>
        <div class="hws-color-row"><span>L14</span>${paletteMarkup("s14")}</div>
        <label class="hws-width">Grosor <select id="hws-width"><option value="1">Estándar</option><option value="2">Gruesa (2×)</option><option value="3">Muy gruesa (3×)</option></select></label>
      </details>
      <details class="hws-style">
        <summary>Radios y colores de 22 m</summary>
        <div class="hws-color-row"><span>Parada</span>${paletteMarkup("pokestop")}</div>
        <div class="hws-color-row"><span>Gimnasio</span>${paletteMarkup("gym")}</div>
        <div class="hws-color-row"><span>Nodo</span>${paletteMarkup("powerspot")}</div>
      </details>
      <details class="hws-candidates">
        <summary>Puntos Wayfinder (<span id="hws-candidate-count">0</span>)</summary>
        <input id="hws-candidate-title" maxlength="80" placeholder="Nombre del objeto real">
        <textarea id="hws-candidate-note" maxlength="600" placeholder="Notas de visita o foto pendiente"></textarea>
        <button id="hws-save-candidate" class="hws-candidate-save">Guardar punto evaluado</button>
        <div id="hws-candidate-list"></div>
        <button id="hws-clear-candidates" class="hws-candidate-clear">Borrar todos los candidatos</button>
      </details>
      <button id="hws-clear" class="hws-secondary">Limpiar datos de esta vista</button>
      <footer>Wayfinder analiza solo los datos que el mapa ya cargó. No envía, modifica ni guarda información fuera de este navegador.</footer>
    </section>`;
  document.body.appendChild(root);

  const style = document.createElement("style");
  style.textContent = `
    /* ---- Tokens Wayfinder (extraídos de la UI real de Wayfarer) ---- */
    #hws-root{
      --hws-font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
      --hws-font-size-title:18px;--hws-font-weight-title:600;
      --hws-font-size-section:13px;--hws-font-weight-section:600;
      --hws-font-size-body:12px;

      /* Tema claro (default) */
      --hws-surface:#fff;--hws-surface-raised:#f8f8f8;
      --hws-text-primary:#181718;--hws-text-secondary:#777579;--hws-text-tertiary:#929194;
      --hws-border:#e5e5e5;--hws-divider:#f2f2f2;--hws-hover:#f2f2f2;
      --hws-active-bg:#202124;--hws-active-text:#fff;
      --hws-danger:#c20000;--hws-danger-bg:#fdeceb;
      --hws-accent:#ff4713;--hws-accent-contrast:#fff;
      --hws-radius:.5rem;--hws-radius-lg:16px;--hws-radius-pill:999px;
      --hws-shadow:0 4px 12px rgba(0,0,0,.18);--hws-shadow-lg:0 14px 34px rgba(0,0,0,.28);
    }
    @media (prefers-color-scheme:dark){
      #hws-root:not([data-theme="light"]){
        --hws-surface:#202124;--hws-surface-raised:#2b2d2f;
        --hws-text-primary:#e8eaed;--hws-text-secondary:#9aa0a6;--hws-text-tertiary:#83898f;
        --hws-border:#3c4043;--hws-divider:#3c4043;--hws-hover:#2b2d2f;
        --hws-active-bg:#e8eaed;--hws-active-text:#202124;
        --hws-danger:#ff6b5b;--hws-danger-bg:#3a2320;
        --hws-shadow:0 4px 14px rgba(0,0,0,.5);--hws-shadow-lg:0 20px 44px rgba(0,0,0,.6);
      }
    }
    #hws-root[data-theme="dark"]{
      --hws-surface:#202124;--hws-surface-raised:#2b2d2f;
      --hws-text-primary:#e8eaed;--hws-text-secondary:#9aa0a6;--hws-text-tertiary:#83898f;
      --hws-border:#3c4043;--hws-divider:#3c4043;--hws-hover:#2b2d2f;
      --hws-active-bg:#e8eaed;--hws-active-text:#202124;
      --hws-danger:#ff6b5b;--hws-danger-bg:#3a2320;
      --hws-shadow:0 4px 14px rgba(0,0,0,.5);--hws-shadow-lg:0 20px 44px rgba(0,0,0,.6);
    }

    /* ---- Estructura y layout ---- */
    #hws-root{position:fixed;left:16px;bottom:30px;z-index:2147483000;font-family:var(--hws-font-family);color:var(--hws-text-primary)}
    #hws-toggle{width:48px;height:48px;border:1px solid var(--hws-border);background:var(--hws-surface);border-radius:var(--hws-radius);display:grid;place-items:center;padding:0;box-shadow:var(--hws-shadow-lg);overflow:hidden}
    #hws-toggle img{width:32px;height:32px;display:block;object-fit:contain}
    .hws-title{font-size:var(--hws-font-size-title);font-weight:var(--hws-font-weight-title);letter-spacing:-.01em;color:var(--hws-text-primary)}
    #hws-panel{position:absolute;left:0;bottom:68px;width:min(352px,calc(100vw - 32px));max-height:min(66dvh,calc(100dvh - 184px));overflow:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;touch-action:pan-y;background:var(--hws-surface);border:1px solid var(--hws-border);border-radius:var(--hws-radius-lg);box-shadow:var(--hws-shadow-lg);padding:0 14px 14px;box-sizing:border-box}
    #hws-panel header{position:sticky;top:0;z-index:5;height:44px;margin:0 -14px 8px;padding:0 10px 0 14px;background:var(--hws-surface);display:flex;align-items:center;gap:6px;border-bottom:1px solid var(--hws-divider);border-radius:var(--hws-radius-lg) var(--hws-radius-lg) 0 0}
    .hws-title{flex:1}
    #hws-theme,#hws-close{border:1px solid var(--hws-border);border-radius:50%;background:var(--hws-surface-raised);color:var(--hws-text-primary);display:grid;place-items:center;flex:0 0 auto}
    #hws-theme{width:28px;height:28px;font-size:14px;line-height:1}
    #hws-close{width:30px;height:30px;font-size:20px;line-height:1}

    /* ---- Contadores ---- */
    #hws-counter{padding:0 1px;color:var(--hws-text-secondary);font-size:10px}
    .hws-counts{margin:0 0 9px;background:var(--hws-surface-raised);border:1px solid var(--hws-border);border-radius:var(--hws-radius-lg);padding:10px}
    .hws-count-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
    .hws-count-item{display:flex;flex-direction:column;align-items:center;gap:5px;min-width:0}
    .hws-count-number{display:flex;align-items:center;justify-content:center;gap:6px;width:100%;min-height:45px;border:1px solid var(--hws-border);border-radius:12px;background:var(--hws-surface);font-size:22px;font-weight:700;line-height:1;font-variant-numeric:tabular-nums}
    .hws-count-number span{font-variant-numeric:tabular-nums}
    .hws-count-icon{width:20px;height:20px;flex:0 0 auto}
    .hws-count-item small{color:var(--hws-text-secondary);font-size:10px;font-weight:600;text-align:center;line-height:1.1}
    #hws-count-context{display:block;margin:0 0 8px;color:var(--hws-text-secondary);font-size:11px;font-weight:700;line-height:1.25;letter-spacing:.02em;text-transform:uppercase;padding-bottom:6px;border-bottom:1px solid var(--hws-border)}
    #hws-count-context.hws-count-context--selected{color:var(--hws-text-primary)}

    /* ---- Botones y chips ---- */
    .hws-secondary{width:100%;border:1px solid var(--hws-border);border-radius:var(--hws-radius);padding:10px 8px;margin-top:9px;background:var(--hws-surface-raised);color:var(--hws-text-primary);font-weight:600;font-size:var(--hws-font-size-body)}
    .hws-hint{margin:8px 1px 0;color:var(--hws-text-secondary);font-size:10px;line-height:1.35}
    .hws-switches{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;margin:10px 0 8px}
    .hws-chip{box-sizing:border-box;min-height:36px;display:flex;gap:5px;align-items:center;justify-content:center;background:var(--hws-surface-raised);border:1px solid var(--hws-border);border-radius:var(--hws-radius-pill);padding:7px 6px;color:var(--hws-text-primary);font-weight:600;font-size:10px;white-space:nowrap}
    .hws-chip input{accent-color:var(--hws-accent);margin:0;flex:0 0 auto}

    /* ---- Secciones plegables (capas / candidatos) ---- */
    .hws-style,.hws-candidates{margin:8px 0;padding:0 9px;background:var(--hws-surface-raised);border:1px solid var(--hws-border);border-radius:13px}
    .hws-style summary,.hws-candidates summary{cursor:pointer;padding:10px 0;font-size:var(--hws-font-size-section);font-weight:var(--hws-font-weight-section);color:var(--hws-text-primary)}
    .hws-color-row{display:flex;flex-direction:column;gap:6px;margin:0 0 12px;font-size:11px;font-weight:600}
    .hws-color-row:last-of-type{margin-bottom:0}
    .hws-color-row>span{color:var(--hws-text-secondary);text-transform:uppercase;letter-spacing:.03em;font-size:10px}
    .hws-palette{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
    .hws-palette-more{margin-top:2px}
    .hws-palette-more summary{list-style:none;cursor:pointer;display:inline-block;color:var(--hws-accent);font-size:10px;font-weight:700}
    .hws-palette-more summary::-webkit-details-marker{display:none}
    .hws-palette-more[open] summary{margin-bottom:6px}
    .hws-color{width:28px;height:28px;border-radius:50%;border:2px solid var(--hws-surface);background:var(--hws-color);box-shadow:0 0 0 1px var(--hws-border);box-sizing:border-box;flex:0 0 auto}
    .hws-color--active{box-shadow:0 0 0 2px var(--hws-accent)}
    .hws-width{display:flex;align-items:center;justify-content:space-between;margin:10px 0;font-size:12px;font-weight:600;color:var(--hws-text-primary)}
    .hws-width select{border:1px solid var(--hws-border);border-radius:8px;background:var(--hws-surface);padding:6px;color:var(--hws-text-primary);font-size:12px}

    /* ---- Candidatos ---- */
    .hws-candidates input,.hws-candidates textarea{width:100%;box-sizing:border-box;border:1px solid var(--hws-border);border-radius:8px;background:var(--hws-surface);color:var(--hws-text-primary);padding:8px;margin-top:7px;font:inherit;font-size:12px}
    .hws-candidates textarea{min-height:54px;resize:vertical}
    .hws-candidate-save,.hws-candidate-clear{width:100%;border:1px solid var(--hws-border);border-radius:9px;padding:9px;font-weight:600;font-size:12px;margin-top:7px}
    .hws-candidate-save{background:var(--hws-accent);border-color:var(--hws-accent);color:var(--hws-accent-contrast)}
    .hws-candidate-clear{background:var(--hws-surface);color:var(--hws-text-primary)}
    .hws-candidate-empty{font-size:11px;color:var(--hws-text-secondary);margin:9px 0}
    .hws-candidate-row{display:grid;grid-template-columns:1fr auto;gap:3px 7px;padding:8px 0;border-bottom:1px solid var(--hws-divider)}
    .hws-candidate-open{border:0;background:transparent;padding:0;text-align:left;color:var(--hws-accent);font-size:12px;font-weight:600;line-height:1.3}
    .hws-candidate-remove{border:1px solid var(--hws-danger);border-radius:50%;width:22px;height:22px;background:var(--hws-danger-bg);color:var(--hws-danger);font-size:16px;line-height:1}
    .hws-candidate-row small{grid-column:1/-1;color:var(--hws-text-secondary);font-size:11px;line-height:1.3}

    /* ---- Resultado / detalle de punto evaluado ---- */
    #hws-result{display:flex;flex-direction:column;gap:5px;background:var(--hws-surface-raised);border:1px solid var(--hws-border);border-radius:var(--hws-radius-lg);padding:10px;font-size:11px;line-height:1.35;color:var(--hws-text-primary)}
    #hws-result strong{font-size:13px;color:var(--hws-text-primary)}
    #hws-result small{color:var(--hws-text-secondary);margin-top:2px}
    #hws-result.hws-result--selected{gap:8px;background:transparent;border:0;padding:0}
    .hws-detail-card{display:flex;flex-direction:column;gap:6px;background:var(--hws-surface-raised);border:1px solid var(--hws-border);border-radius:var(--hws-radius-lg);padding:11px;color:var(--hws-text-primary)}
    .hws-card-title{display:block;font-size:11px;font-weight:700;line-height:1.25;color:var(--hws-text-primary);letter-spacing:.02em;text-transform:uppercase;padding-bottom:6px;margin-bottom:6px;border-bottom:1px solid var(--hws-border)}
    .hws-card-status{font-size:11px;font-weight:600;line-height:1.35;color:var(--hws-text-primary)}
    .hws-card-empty{font-size:10px;color:var(--hws-text-secondary)}
    .hws-poi-list{display:flex;flex-direction:column}
    .hws-poi-row{display:flex;align-items:center;gap:8px;padding:7px 0;border-top:1px solid var(--hws-divider)}
    .hws-poi-icon{width:20px;height:20px;flex:0 0 20px;object-fit:contain;opacity:.85}
    #hws-root[data-theme="dark"] .hws-poi-icon{filter:brightness(0) invert(1)}
    @media (prefers-color-scheme:dark){#hws-root:not([data-theme="light"]) .hws-poi-icon{filter:brightness(0) invert(1)}}
    .hws-poi-icon--other{display:grid;place-items:center;border:1px solid var(--hws-text-tertiary);border-radius:50%;color:var(--hws-text-secondary);font-size:18px;line-height:1}
    .hws-poi-copy{display:flex;flex:1;min-width:0;flex-direction:column;gap:2px}
    .hws-poi-name{font-size:11px;font-weight:600;line-height:1.3;color:var(--hws-text-primary);overflow-wrap:anywhere}
    .hws-poi-meta{font-size:10px!important;color:var(--hws-text-secondary)}
    .hws-coordinate{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:6px;margin-top:2px;padding-top:8px;border-top:1px solid var(--hws-divider);color:var(--hws-text-secondary);font-size:10px}
    .hws-coordinate code{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--hws-text-primary);font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:10px}
    .hws-copy-coordinate{border:1px solid var(--hws-border);border-radius:8px;background:var(--hws-surface);color:var(--hws-text-primary);padding:5px 7px;font-size:10px;font-weight:600}
    .hws-copy-coordinate--done{border-color:#1d9e75;color:#1d9e75;background:transparent;opacity:1}
    .hws-deselect{width:100%;margin-top:8px;padding:8px 10px;border:1px solid var(--hws-border);border-radius:11px;background:var(--hws-surface-raised);color:var(--hws-text-primary);font-size:11px;font-weight:600}
    #hws-panel footer{font-size:9px;line-height:1.35;color:var(--hws-text-tertiary);margin:9px 1px 0}
    .hws-count-icon{width:22px;height:22px;object-fit:contain;opacity:.85}
    #hws-root[data-theme="dark"] .hws-count-icon{filter:brightness(0) invert(1)}
    @media (prefers-color-scheme:dark){#hws-root:not([data-theme="light"]) .hws-count-icon{filter:brightness(0) invert(1)}}
  `;
  document.head.appendChild(style);

  let themePreference = loadThemePreference();
  const themeButton = root.querySelector("#hws-theme") as HTMLButtonElement | null;
  const applyTheme = (): void => {
    if (themePreference === "auto") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", themePreference);
    if (themeButton) {
      const isDark =
        themePreference === "dark" ||
        (themePreference === "auto" && window.matchMedia?.("(prefers-color-scheme: dark)").matches);
      themeButton.textContent = isDark ? "☀️" : "🌙";
      themeButton.title = isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro";
    }
  };
  applyTheme();
  themeButton?.addEventListener("click", () => {
    const isDarkNow =
      themePreference === "dark" ||
      (themePreference === "auto" && window.matchMedia?.("(prefers-color-scheme: dark)").matches);
    themePreference = isDarkNow ? "light" : "dark";
    if (!saveThemePreference(themePreference)) {
      state.locationMessage = "El tema se aplicó, pero Firefox no permitió guardar la preferencia local.";
    }
    applyTheme();
  });

  const panel = root.querySelector("#hws-panel") as HTMLElement;
  state.panel = panel;
  state.result = root.querySelector("#hws-result");
  state.candidateList = root.querySelector("#hws-candidate-list");
  state.candidateCount = root.querySelector("#hws-candidate-count");
  state.deselectButton = root.querySelector("#hws-deselect");
  root.querySelector("#hws-toggle")?.addEventListener("click", () => (panel.hidden = !panel.hidden));
  root.querySelector("#hws-close")?.addEventListener("click", () => (panel.hidden = true));
  state.deselectButton?.addEventListener("click", clearEvaluation);
  root.querySelector("#hws-clear")?.addEventListener("click", clearLocalData);
  root.querySelector("#hws-save-candidate")?.addEventListener("click", addCandidate);
  root.querySelector("#hws-clear-candidates")?.addEventListener("click", clearCandidates);
  (root.querySelector("#hws-s17") as HTMLInputElement).addEventListener("change", (event) => {
    state.showS17 = (event.target as HTMLInputElement).checked;
    redraw();
  });
  (root.querySelector("#hws-s14") as HTMLInputElement).addEventListener("change", (event) => {
    state.showS14 = (event.target as HTMLInputElement).checked;
    redraw();
  });
  (root.querySelector("#hws-22m") as HTMLInputElement).addEventListener("change", (event) => {
    state.showCircles = (event.target as HTMLInputElement).checked;
    redraw();
  });
  root.querySelectorAll<HTMLButtonElement>("[data-hws-color]").forEach((button) => {
    button.addEventListener("click", () => {
      const color = button.dataset.hwsColor;
      const layer = button.dataset.hwsLayer;
      if (!color || !["s17", "s14", "pokestop", "gym", "powerspot"].includes(layer ?? "")) return;
      if (layer === "s17") state.s17Color = color;
      else if (layer === "s14") state.s14Color = color;
      else if (layer === "pokestop") state.pokestopColor = color;
      else if (layer === "gym") state.gymColor = color;
      else state.powerspotColor = color;
      if (!persistColorPreferences()) {
        state.locationMessage = "El color se aplicó, pero Firefox no permitió guardar la preferencia local.";
      }
      root.querySelectorAll<HTMLButtonElement>(`[data-hws-layer="${layer}"]`).forEach((candidate) => {
        candidate.classList.toggle("hws-color--active", candidate.dataset.hwsColor === color);
      });
      redraw();
    });
  });
  (root.querySelector("#hws-width") as HTMLSelectElement).addEventListener("change", (event) => {
    state.lineMultiplier = Number((event.target as HTMLSelectElement).value);
    redraw();
  });
  updatePanel();
  renderCandidates();
}

function installMap(): void {
  if (!mapIsActive()) return;
  createUi();
  const map = findMap();
  if (!map) {
    state.gridMessage = "Esperando el mapa de Wayfarer";
    updatePanel();
    return;
  }
  if (state.map === map) return;

  clearVisuals();
  state.map = map;
  state.mapListeners.forEach((listener) => listener?.remove?.());
  state.mapListeners = [
    map.addListener?.("idle", () => redraw()),
    map.addListener?.("click", (event: any) => {
      const latLng = event?.latLng;
      if (!latLng) return;
      evaluatePoint({ lat: latLng.lat(), lng: latLng.lng() }, "toque");
    }),
  ];
  redraw();
}

function observeGcsResponses(): void {
  if (window.__hwsXhrObserverInstalled) return;
  window.__hwsXhrObserverInstalled = true;
  const nativeOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method: string, url: string | URL, ...rest: any[]): any {
    (this as any).__hwsUrl = String(url);
    return nativeOpen.call(this, method, String(url), ...rest);
  };

  const nativeSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function (...args: any[]): any {
    const url = (this as any).__hwsUrl as string | undefined;
    if (url?.includes(GCS_PATH)) {
      const requestStamp = ++state.gcsStamp;
      this.addEventListener("load", () => {
        if (!mapIsActive() || requestStamp !== state.gcsStamp || this.status < 200 || this.status >= 300) return;
        try {
          const observed = parseObservedPois(JSON.parse(this.responseText));
          state.pois = new Map(observed.map((poi) => [poi.id, poi]));
          redraw();
        } catch {
          // A response-shape or parse failure must remain inert and never retry a request.
        }
      });
    }
    return nativeSend.apply(this, args as any);
  };
}

observeGcsResponses();
setInterval(installMap, 800);
