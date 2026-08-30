# Imágenes pendientes / a revisar

No puedo generar ni inventar fotos reales del colegio, así que dejo acá el detalle
exacto de qué imagen falta o está mal puesta, y dónde, para que las reemplacen
con material real cuando lo tengan.

## 1. Fotos del personal (`img/personal/`)

Armé el código para que cada persona del carrusel de "Personal" (en las 4 páginas
de Nivel) y la foto de la dirección busquen automáticamente un archivo en
`img/personal/<nombre-apellido>.jpg`. Si el archivo no existe, se muestra el
avatar genérico (`img/usuario_default.png`) sin romper el diseño.

Ya está resuelta:
- ✅ `marisa-brisio.jpg` → encontré que ya tenían subida una foto real
  (`img/NivelInicial_Directivo.png`) sin usar en ningún lado. La copié a
  `img/personal/marisa-brisio.jpg` y ahora se usa tanto en la foto de
  dirección como en el carrusel, en las 4 páginas de Nivel.

Faltan subir (con esos nombres exactos, formato jpg, foto tipo carnet/retrato):
- ❌ `img/personal/adela.jpg` — **importante:** el archivo `img/adela.jpg` que
  estaba puesto para la secretaria en realidad es el póster de un cortometraje
  llamado "Adela" (proyecto Premios Torres), no una foto de la persona. Ya lo
  desconecté para que no se muestre por error; solo hace falta la foto real.
- ❌ `img/personal/juan-perez.jpg`
- ❌ `img/personal/maria-garcia.jpg`
- ❌ `img/personal/carlos-lopez.jpg`

Sugerencia: usar fotos cuadradas (por ejemplo 500×500 px) para que el
recorte del carrusel se vea prolijo.

## 2. Revista EME — Edición N° 16 (2024)

No encontré en el repositorio imágenes propias de la edición N° 16 (tapa,
contratapa, capturas internas). Antes se usaban de relleno fotos de otros
eventos del colegio (Colación, Convivencia, Deporte, etc.), que no tenían
nada que ver con la revista. Por ahora dejé la edición N° 16 con la imagen
genérica `img/EME.jpg` como portada, para no mostrar fotos que no
corresponden. Ideal: reemplazar por `tapa_revista_eme_2024.png`,
`contratapa_revista_eme_2024.png`, etc. cuando las consigan (mismo criterio
de nombres que usa la edición 2025).

También el enlace de descarga en PDF de la edición 2024 apuntaba al mismo
PDF que la edición 2025 — lo saqué de la edición 2024 hasta que tengan el
link correcto (el botón "Ver página de la Revista" sigue funcionando porque
es el mismo sitio para todas las ediciones).

## 3. Revisión general de fotos por sección

Como grupo mencionaron que quieren que las imágenes sean acordes al
contenido de cada sección. No pude auditar cada una de las ~230 referencias
a imágenes del sitio, pero encontré este patrón repetido: varias secciones
(sobre todo tarjetas de eventos/proyectos en `templates/data/proyectos/*.json`
e `index-proyectos.json`) reutilizan la misma imagen genérica
(`img/Cooperativa 1.jpg`) como relleno en más de un evento distinto. Si
tienen fotos reales de cada evento, lo ideal es que cada JSON en
`templates/data/proyectos/` apunte a su propia imagen en vez de repetir
siempre la misma.

Si quieren, puedo ayudarles a recorrer cada sección puntual una vez que
tengan las fotos reales y decirles exactamente en qué archivo/línea va cada una.
