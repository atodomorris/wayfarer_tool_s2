# Hijuelas Wayspot Scout Overlay

## Qué hace

Hijuelas Wayspot Scout Overlay es un userscript propio para el mapa actual de Wayfarer. Dibuja **todas las celdas S17 y S14 que intersectan el área visible**, incluso cuando no contienen un Wayspot cargado. Permite evaluar el centro de la vista y dibuja círculos de 22 metros alrededor de las referencias clasificadas como «en juego» en la respuesta actual del mapa.

No se integra con la aplicación anterior, no usa Google Maps propio ni necesita una API de pago. Se ejecuta únicamente dentro de las rutas de mapa `https://wayfarer.scopely.com/new/mapview*` y `https://wayfarer.nianticlabs.com/new/mapview*`.

> **Advertencia de cuenta.** Es una herramienta no oficial. Usa el script bajo tu responsabilidad y revísalo antes de instalarlo. No lo uses para enviar, editar o automatizar nominaciones.

## Límites de seguridad aplicados

| Permitido | No permitido |
| --- | --- |
| Observar la respuesta que el mapa ya recibió para mostrar sus referencias cargadas. | Lanzar solicitudes de red propias o repetir la consulta del mapa. |
| Leer posición, zoom y centro del mapa ya abierto. | Hacer clic, enviar formularios, modificar nominaciones o realizar acciones de cuenta. |
| Dibujar polígonos S2, círculos y un panel local. | Persistir Wayspots observados, exportarlos o sincronizarlos remotamente. |
| Guardar candidatos creados explícitamente en `localStorage` del navegador. | Usar IndexedDB o sincronización remota. |
| Limpiar los datos en memoria con un botón. | Conservar los Wayspots después de recargar la pestaña. |

## Instalación y actualizaciones en Android

1. Instala **Firefox para Android** y agrega **Tampermonkey** desde el catálogo oficial de complementos de Firefox.
2. En Tampermonkey, confirma que **Hijuelas Wayspot Scout Overlay** está habilitado. Mantén una única instalación para evitar scripts duplicados.
3. Abre este enlace desde Firefox: [Instalar Hijuelas Wayspot Scout Overlay](https://raw.githubusercontent.com/atodomorris/wayfarer_tool_s2/main/hijuelas-wayspot-scout.user.js). Tampermonkey abrirá su instalador; pulsa **Instalar** o **Actualizar**. No copies ni pegues código.
4. Después, abre Wayfarer en Firefox, inicia sesión por tu cuenta y visita **Mapa** en `wayfarer.scopely.com/new/mapview`. No ejecutes el script en las pantallas de envío o revisión.
5. Acerca el mapa hasta que Wayfarer cargue los Wayspots. Pulsa el botón azul **S2** y toca el objeto físico en el mapa. El punto azul es deliberadamente pequeño y solo se resalta su **S17**, no toda la S14.
6. El menú compacto abre primero el resultado de evaluación: conflicto o revisión de 22 m, S17 y el desglose de la **celda S14 seleccionada**: `P` para Poképaradas, `G` para gimnasios y `N` para nodos energéticos. El conteo se limita a la respuesta de mapa disponible; no afirma la elegibilidad de una nominación.
7. Usa las fichas `S17`, `S14` y `22 m` para encender o apagar rápidamente las capas. Los detalles **Capas y estilo**, **Colores de círculos 22 m** y **Candidatos locales** se abren solo cuando los necesites, de modo que no cubran el resultado principal.
8. El panel usa un tema oscuro semitransparente para mantener contraste sobre el mapa. En **Capas y estilo**, elige independientemente uno de diez colores para S17 y S14. En **Colores de círculos 22 m**, ajusta cada tipo por separado. Los valores iniciales son rojo para Poképaradas, verde para gimnasios y amarillo para nodos. En **Grosor**, «Gruesa» duplica el trazo estándar y «Muy gruesa» lo triplica. Estos ajustes se aplican solo a la pestaña actual.
9. La cuadrícula se recalcula al terminar de mover o ampliar el mapa. El panel mostrará «Cuadrícula completa» junto con el número de celdas dibujadas. Si el área requiere más de 1.500 S17 o 350 S14, no se dibuja una cuadrícula parcial: acerca el mapa hasta que el aviso desaparezca.

Para cada actualización futura, abre Tampermonkey, busca Hijuelas Wayspot Scout Overlay y toca **Buscar actualizaciones**. La versión actual ya incluye una URL estable, por lo que el gestor descargará e instalará la versión nueva sin copiar el archivo completo. Desde la versión 0.4.2 el script cubre el dominio actual `wayfarer.scopely.com` y conserva el dominio anterior por compatibilidad. La versión 0.5.0 añade colores configurables de radios y conteo por S14; la 0.6.0 incorpora el panel oscuro compacto orientado a evaluación.

## Si Violentmonkey aparece vacío

Una lista vacía significa que la extensión perdió su almacenamiento local; no equivale a un script desactivado. Cerrar Firefox por sí solo no debería eliminar una instalación. Revisa si se borraron datos de Firefox, se reinstaló/restableció Violentmonkey, cambiaste de perfil o una herramienta de limpieza de Android eliminó datos de la aplicación.

Para recuperarlo, abre Firefox y visita siempre este enlace estable: [Reinstalar Hijuelas Wayspot Scout Overlay](https://raw.githubusercontent.com/atodomorris/wayfarer_tool_s2/main/hijuelas-wayspot-scout.user.js). Violentmonkey mostrará su instalador; pulsa **Instalar**. No necesitas volver a copiar el código desde Manus.

Después de reinstalar, abre el menú **⋮** de Violentmonkey y busca **Exportar** o **Exportar ZIP**. Guarda esa copia fuera de Firefox (por ejemplo, en Descargas o Drive). La página oficial de Violentmonkey también describe sincronización con Dropbox, OneDrive, Google Drive o WebDAV; úsala solo si aparece en los ajustes de tu versión Android y deseas autorizarla.

> El respaldo ZIP de Violentmonkey protege el script. Los candidatos del Scout se guardan aparte, en el almacenamiento del sitio Wayfarer de Firefox; si se borran los datos del navegador, esos candidatos pueden perderse.

## Uso de terreno: toque, GPS y candidatos

| Acción | Cómo usarla | Datos que conserva |
| --- | --- | --- |
| Evaluar un punto | Toca el objeto real en el mapa. Se marcará en azul y el panel calculará S14, S17 y 22 m. | Ninguno después de recargar, salvo si se guarda como candidato. |
| Mi ubicación | Toca **Mi ubicación**, acepta el permiso de Firefox y espera el centrado. El anillo morado muestra la precisión aproximada del GPS. | Ninguno; no hay seguimiento continuo. |
| Guardar candidato | Tras evaluar un punto, abre **Candidatos locales**, escribe nombre/notas y toca **Guardar punto evaluado**. | Nombre, nota, coordenada y fecha en `localStorage` del navegador. |

Los candidatos se muestran como círculos morados. Toca un candidato de la lista para volver a ese punto o el botón **×** para eliminarlo. El botón para borrar todos elimina solo los candidatos de este navegador; no toca los Wayspots mostrados por Wayfarer.

## Interpretación del panel

| Indicador | Lectura adecuada |
| --- | --- |
| `Cuadrícula completa: N S17 · N S14` | Se dibujaron todas las celdas que intersectan el viewport actual, no solo las que contienen referencias observadas. |
| `S17: sin referencias observadas` | La respuesta cargada no entregó un Wayspot en esa S17; no es una garantía de inclusión. |
| `S14: N referencias observadas` | Conteo local de la respuesta disponible en esa S14. |
| `Conteo de la celda S14 seleccionada` | Desglose de las referencias cargadas para la S14 del punto: `P` Poképaradas, `G` gimnasios y `N` nodos. |
| Círculos rojo, verde y amarillo | Valores iniciales para Poképaradas, gimnasios y nodos respectivamente; se pueden cambiar en el panel. |
| `Conflicto de 22 m` | Se detectó una referencia en juego a menos de 22 m. |
| `Revisión de 22 m` | No se detectó referencia en juego dentro de 22 m entre los datos actualmente cargados. |

Los resultados son una ayuda comunitaria y empírica. La nominación debe describir un objeto real y ubicarse en su posición real.
