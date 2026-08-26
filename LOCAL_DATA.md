# Datos locales y permisos

La versión con candidatos cambia un límite deliberado de la versión anterior: puede guardar **solo los candidatos creados explícitamente por la persona usuaria** en `localStorage` del navegador, bajo la clave `hws-candidates-v1`.

| Dato | Origen | Persistencia | Sale del navegador |
| --- | --- | --- | --- |
| Candidato, nota, coordenada y fecha | Botón «Guardar candidato» | `localStorage` local | No |
| Ubicación actual y precisión | Permiso GPS solicitado al tocar «Mi ubicación» | No | No |
| Wayspots cargados por el mapa | Respuesta que Wayfarer ya recibió | Solo memoria de la pestaña | No |

Los candidatos tienen límites de tamaño: título de 80 caracteres y nota de 600 caracteres. El panel permite eliminarlos individualmente o borrar todos los candidatos locales. No se incluyen fotos, exportación, sincronización ni seguimiento continuo de ubicación.

La evaluación por toque utiliza únicamente el evento local del mapa. El script no simula clics de Wayfarer, no realiza solicitudes de red propias y no automatiza envíos o acciones de cuenta.
