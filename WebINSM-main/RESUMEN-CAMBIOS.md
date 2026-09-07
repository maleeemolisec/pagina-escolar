# Resumen de cambios — sitio web INSM

Este paquete parte de la rama `cambios-male` (ya tenía resueltos varios puntos)
y le sumé lo que faltaba. Estado de cada pedido del grupo:

| Pedido | Estado |
|---|---|
| Eliminar "Evento: Espejos de Cultura" | ✅ Ya estaba resuelto en `cambios-male` |
| Convertir "Donde nace la magia" en apartado nostálgico | ✅ Ya estaba resuelto en `cambios-male` |
| Que se pueda abrir bien desde celular | ✅ Ya estaba resuelto en `cambios-male` (index + 4 páginas de Nivel) |
| Cambiar imágenes acordes a cada sección | ⚠️ Parcial — ver `IMAGENES-PENDIENTES.md`. Necesitan fotos reales que no tengo. |
| Unificar Revista EME (N°16 y N°17) en una sola sección con ediciones | ✅ Nuevo: tarjeta única "Revista EME" con selector de edición |
| Sacar información repetida de Niveles (contenido de Secundario en Inicial/Primario/Terciario) | ✅ Corregido — ver detalle abajo |
| Agregar fotos del personal | ⚠️ Parcial — armé el sistema para que funcione automáticamente, falta que suban las fotos reales. Una ya la encontré sin usar y la conecté. |

## Detalle técnico de lo nuevo que agregué

### 1. Fotos de personal con fallback automático
En `NivelInicial.html`, `NivelPrimario.html`, `NivelSecundario.html` y
`NivelTerciario.html`, cada foto de personal (dirección + carrusel) ahora
busca el archivo en `img/personal/<nombre-apellido>.jpg`. Si no existe,
muestra el avatar genérico sin romper nada. Encontré una foto real de la
directora que estaba subida sin usar (`img/NivelInicial_Directivo.png`) y
la conecté como `img/personal/marisa-brisio.jpg`.

También detecté que la foto puesta para "Adela" (secretaria) en realidad era
el póster de un cortometraje llamado "Adela" — la desconecté para que no se
muestre por error.

### 2. Revista EME unificada con selector de ediciones
- Nuevo archivo `templates/data/proyectos/revista-eme.json`: una "colección"
  con las ediciones N° 17 (2025) y N° 16 (2024).
- `templates/loader.js`: agregué `resolveProjectCollection()` y
  `renderEditionSelector()` para que una página de proyecto pueda mostrar
  varias ediciones y cambiar entre ellas sin recargar toda la lógica.
- `templates/Proyecto.html`: agregué la sección/CSS del selector de
  ediciones (los botones para cambiar entre N° 17 / N° 16).
- `templates/data/index-proyectos.json`: ahora hay una sola tarjeta
  "Revista EME" en vez de dos tarjetas repetidas.

### 3. Contenido de Niveles corregido
Encontré que las 4 páginas de Nivel tenían **copiado literalmente** el mismo
bloque "Nuestras Especialidades" de Secundario (ciclo orientado, Informática,
Humanidades, con links a los planes de estudio de Secundario), incluso en
Nivel Inicial. Lo reemplacé por contenido acorde a cada nivel:
- **Inicial:** salas (3 años / 4 y 5 años).
- **Primario:** ciclos (Primer Ciclo 1°-3°, Segundo Ciclo 4°-6°).
- **Secundario:** se mantiene igual (ahí sí corresponde).
- **Terciario:** dejé un bloque placeholder marcado con `<!-- TODO -->`
  porque no tengo la info real de las carreras/tecnicaturas que dicta — hay
  que completarlo con los nombres reales.

También corregí el texto alternativo (`alt`) de la foto de dirección en
cada página, que decía "Director de Nivel Secundario" en las 4 páginas.

## Cómo subir esto a GitHub

No tengo credenciales para pushear directo al repositorio, así que las
opciones son:

**Opción A (recomendada) — aplicar el patch:**
```bash
git checkout cambios-male
git pull origin cambios-male
git apply cambios-completos.patch
git add -A
git commit -m "Completar cambios pendientes"
git push origin cambios-male
```

**Opción B — reemplazar archivos a mano:**
Descomprimir `WebINSM-cambios-completos.zip` y reemplazar la carpeta del
proyecto en su rama local por esta versión, después hacer commit y push.

Después de subir esto, sugiero abrir un Pull Request de `cambios-male` hacia
`main` para que el resto del grupo revise antes de fusionar.
