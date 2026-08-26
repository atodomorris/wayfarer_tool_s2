# Hijuelas Wayspot Scout Overlay

## Qué hace

Hijuelas Wayspot Scout Overlay es un userscript propio para el mapa actual de Wayfarer. Dibuja **todas las celdas S17 y S14 que intersectan el área visible**, incluso cuando no contienen un Wayspot cargado. Permite evaluar el centro de la vista y dibuja círculos de 22 metros alrededor de las referencias clasificadas como «en juego» en la respuesta actual del mapa.

No se integra con la aplicación anterior, no usa Google Maps propio ni necesita una API de pago. Se ejecuta solo dentro de `https://wayfarer.nianticlabs.com/new/mapview*`.

> **Advertencia de cuenta.** Es una herramienta no oficial. Usa el script bajo tu responsabilidad y revísalo antes de instalarlo. No lo uses para enviar, editar o automatizar nominaciones.

## Límites de seguridad aplicados

| Permitido | No permitido |
| --- | --- |
| Observar la respuesta que el mapa ya recibió para mostrar sus referencias cargadas. | Lanzar solicitudes de red propias o repetir la consulta del mapa. |
| Leer posición, zoom y centro del mapa ya abierto. | Hacer clic, enviar formularios, modificar nominaciones o realizar acciones de cuenta. |
| Dibujar polígonos S2, círculos y un panel local. | Usar `localStorage`, IndexedDB, exportaciones o sincronización remota. |
| Limpiar los datos en memoria con un botón. | Conservar los Wayspots después de recargar la pestaña. |

## Instalación y actualizaciones en Android

1. Instala **Firefox para Android** y agrega **Violentmonkey** desde el catálogo oficial de complementos de Firefox.
2. En Violentmonkey, elimina o desactiva la instalación anterior llamada **Hijuelas Wayspot Scout Overlay**. Es una única migración para evitar scripts duplicados.
3. Abre este enlace desde Firefox: [Instalar Hijuelas Wayspot Scout Overlay](https://raw.githubusercontent.com/atodomorris/wayfarer_tool_s2/main/hijuelas-wayspot-scout.user.js). Violentmonkey abrirá su instalador; pulsa **Instalar**. No copies ni pegues código.
4. Después, abre Wayfarer en Firefox, inicia sesión por tu cuenta y visita **Mapa**. No ejecutes el script en las pantallas de envío o revisión.
5. Acerca el mapa hasta que Wayfarer cargue los Wayspots. Pulsa el botón azul **S2**, activa las capas deseadas y elige **Evaluar centro** con el objeto físico centrado.
6. En **Estilo de celdas**, elige independientemente uno de diez colores para S17 y S14. En **Grosor**, «Gruesa» duplica el trazo estándar y «Muy gruesa» lo triplica. Estos ajustes se aplican solo a la pestaña actual.
7. La cuadrícula se recalcula al terminar de mover o ampliar el mapa. El panel mostrará «Cuadrícula completa» junto con el número de celdas dibujadas. Si el área requiere más de 1.500 S17 o 350 S14, no se dibuja una cuadrícula parcial: acerca el mapa hasta que el aviso desaparezca.

Para cada actualización futura, abre Violentmonkey, busca Hijuelas Wayspot Scout Overlay y toca **Buscar actualizaciones**. La versión actual ya incluye una URL estable, por lo que el gestor descargará e instalará la versión nueva sin copiar el archivo completo.

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
| `Conflicto de 22 m` | Se detectó una referencia en juego a menos de 22 m. |
| `Revisión de 22 m` | No se detectó referencia en juego dentro de 22 m entre los datos actualmente cargados. |

Los resultados son una ayuda comunitaria y empírica. La nominación debe describir un objeto real y ubicarse en su posición real.
