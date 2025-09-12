# Generador de grupos - GruposHtmlCooperativos

Pequeña utilidad web para generar 6 grupos de 4 alumnos respetando restricciones específicas del aula.

Descripción

- Archivo principal: `generador_grupos.html` (HTML que incluye estructura, controles y referencias a `styles.css` y `script.js`).
- Estilos: `styles.css`.
- Lógica: `script.js`.

Cómo usar

1. Abrir `generador_grupos.html` en un navegador moderno (Chrome, Edge, Firefox).
2. Pulsar "Generar Grupos" para crear una distribución automática.
3. Usar "Limpiar" para borrar la vista actual.
4. Exportar con los botones CSV/JSON si se han generado grupos.

Notas técnicas

- La asignación intenta respetar preferencias y restricciones (líderes separados, estudiantes que necesitan ayuda en distintos grupos, restricciones específicas entre alumnos, etc.).
- El archivo `script.js` guarda la última generación en `window.currentGroups` para permitir exportar.
- Para evitar cambios accidentales, guarda una copia de `generador_grupos.html` antes de editar.

Archivos incluidos

- `generador_grupos.html` - Interfaz y referencias.
- `styles.css` - Estilos.
- `script.js` - Lógica de generación.
- `README.md` - Este archivo.

Licencia

Uso personal y educativo. No comercial sin permiso.
