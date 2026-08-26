# Recuperación y respaldo de Violentmonkey

Una lista vacía en el panel de Violentmonkey significa que la extensión no conserva scripts en su base local actual. No es el mismo estado que un script desactivado: un script desactivado seguiría apareciendo en la lista.

No es posible determinar desde una captura qué borró el almacenamiento. Las causas habituales a revisar son el borrado de datos de Firefox, la reinstalación/restablecimiento o actualización de la extensión, un cambio de perfil/navegador, o herramientas de limpieza de Android. Cerrar el navegador durante doce horas, por sí solo, no debería eliminar un script instalado.

La recuperación inmediata es volver a instalar desde la URL estable de GitHub. Para evitar pérdidas futuras, después de reinstalar se recomienda exportar los scripts desde el menú de Violentmonkey como ZIP y guardarlo fuera de Firefox. La página oficial de Violentmonkey también declara opciones de sincronización con Dropbox, OneDrive, Google Drive o WebDAV; deben configurarse solo si la pantalla de ajustes de la extensión en Android ofrece esa función y si la persona usuaria desea conceder ese acceso.

Los candidatos de Hijuelas Wayspot Scout se guardan separadamente en el almacenamiento del sitio Wayfarer dentro de Firefox. Un respaldo de scripts de Violentmonkey no incluye necesariamente esos candidatos. Si se activa el modo de candidatos, debe añadirse una exportación/importación local JSON para protegerlos frente al borrado de datos del navegador.
