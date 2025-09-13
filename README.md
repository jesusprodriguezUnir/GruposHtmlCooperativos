# Generador de Grupos — GruposHtmlCooperativos

Versión: 1.0

Descripción

Generador web estático para crear 6 grupos de 4 alumnos respetando un conjunto de restricciones pedagógicas (líderes separados, alumnado que necesita apoyo en grupos distintos, parejas que deben o no deben coincidir, preferencias, etc.). El proyecto está diseñado para uso en el aula y como herramienta educativa.

Demo (URL pública)

Si ya desplegaste el proyecto en GitHub Pages o Netlify, pega aquí la URL pública para acceder directamente:

Online (ejemplo): [https://tu-usuario.github.io/GruposHtmlCooperativos/](https://tu-usuario.github.io/GruposHtmlCooperativos/)

(Reemplaza la URL anterior con la tuya una vez hayas publicado.)

Si aún no has publicado, la página principal local es `generador_grupos.html`.

Contenido del repositorio

- `generador_grupos.html` — Página principal (interfaz y referencias a CSS/JS).
- `styles.css` — Estilos visuales.
- `script.js` — Lógica de generación y utilidades de exportación.
- `.gitignore` — Ignora archivos locales comunes.
- `README.md` — Documentación (este archivo).

Uso rápido

1. Abrir `generador_grupos.html` en un navegador moderno.
2. Pulsar "Generar Grupos" para crear la distribución.
3. Revisar la sección de resultados; exportar en CSV o JSON si lo deseas.

Buenas prácticas

- Antes de editar: crea una copia de seguridad de `generador_grupos.html`.
- Si vas a hacer cambios frecuentes, trabaja en una rama nueva y realiza commits pequeños y descriptivos.

Despliegue (GitHub Pages) — pasos rápidos

1. Asegúrate de que el repositorio está en GitHub y tiene los archivos en la rama `main`.
2. En GitHub: Settings → Pages → Source → seleccionar `main` branch y carpeta `/ (root)` → Save.
3. Opcional: renombra `generador_grupos.html` a `index.html` para que la URL raíz sirva automáticamente la página.

Comandos útiles (PowerShell)

```powershell
cd 'D:\Personal\Noemi\GruposHtmlCooperativos'
git init
git add .
git commit -m "v1: generador de grupos"
git branch -M main
git remote add origin https://github.com/<tu-usuario>/GruposHtmlCooperativos.git
git push -u origin main
```

Despliegue alternativo (Netlify)

- Arrastra la carpeta con los archivos a Netlify Drop (no requiere git) o conecta el repositorio para despliegues automáticos.

Consideraciones técnicas

- El script intenta maximizar el cumplimiento de preferencias y minimizar conflictos. No garantiza solución perfecta en todos los intentos; puedes ejecutar la generación varias veces.
- `script.js` expone la última configuración en `window.currentGroups` para facilitar exportación.

Contribuciones

Si quieres mejorar el proyecto, envía un pull request o reporta issues con ejemplos de restricciones adicionales.

Licencia

Uso personal y educativo. Contacta al autor si quieres uso comercial.
