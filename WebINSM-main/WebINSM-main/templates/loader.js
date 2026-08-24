document.addEventListener('DOMContentLoaded', () => {
    // 1. OBTENER EL ID DEL PROYECTO
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id') || 'feria-ciencias'; 

    // 2. BUSCAR EL ARCHIVO JSON CORRESPONDIENTE
    fetch(`data/proyectos/${projectId}.json`)
        .then(response => {
            if (!response.ok) {
                console.error(`Error: No se pudo cargar el archivo de datos JSON para el proyecto '${projectId}'`);
                throw new Error("No se pudo cargar el archivo de datos JSON");
            }
            return response.json();
        })
        .then(data => {
            validateProjectData(data, projectId);
            loadProjectData(data);
            initVisualEffects();
        })
        .catch(error => {
            console.error('Error en la carga del proyecto:', error);
        });
});

// FUNCIÓN: Validar la estructura del JSON
function validateProjectData(data, id) {
    const requiredFields = {
        'hero': ['titleLine1', 'titleLine2', 'backgroundImage'],
        'general': ['date', 'summary', 'detail', 'image'],
        'academic': ['value1', 'value2', 'value3']
    };

    for (const [section, fields] of Object.entries(requiredFields)) {
        if (!data[section]) {
            console.error(`Error: El proyecto '${id}' no tiene la sección crítica '${section}' definida en su JSON.`);
            continue;
        }
        fields.forEach(field => {
            if (data[section][field] === undefined || data[section][field] === null) {
                console.error(`Error: El proyecto '${id}' no tiene el campo '${field}' definido en la sección '${section}'.`);
            }
        });
    }
}

// FUNCIÓN: Rellenar el HTML con los datos del JSON
function loadProjectData(data) {
    // Verificación de IDs Críticos del DOM
    const criticalIDs = [
        'hero-title-1', 'hero-title-2', 'hero-section', 'general-date', 
        'general-summary', 'general-detail', 'general-image',
        'academic-val-1', 'academic-val-2', 'academic-val-3'
    ];
    
    criticalIDs.forEach(id => {
        if (!document.getElementById(id)) {
            console.error(`Error: El contenedor esencial con ID '${id}' no fue encontrado en el DOM.`);
        }
    });

    // --- Sección 1: Hero (DOS LÍNEAS) ---
    const hTitle1 = document.getElementById('hero-title-1');
    const hTitle2 = document.getElementById('hero-title-2');
    
    if(hTitle1) hTitle1.textContent = data.hero?.titleLine1 || '';
    if(hTitle2) hTitle2.textContent = data.hero?.titleLine2 || '';
    
    const heroSection = document.getElementById('hero-section');
    if(heroSection && data.hero?.backgroundImage) {
        heroSection.style.backgroundImage = `url('${data.hero.backgroundImage}')`;
    }

    // --- Sección 2: General ---
    setText('general-date', data.general?.date || '');
    setText('general-summary', data.general?.summary || '');
    
    const detailDiv = document.getElementById('general-detail');
    if(detailDiv) detailDiv.innerHTML = data.general?.detail || ''; 

    const genImg = document.getElementById('general-image');
    if(genImg && data.general?.image) genImg.src = data.general.image;

    // --- Sección 3: Académica ---
    setText('academic-val-1', data.academic?.value1 || '');
    setText('academic-val-2', data.academic?.value2 || '');
    setText('academic-val-3', data.academic?.value3 || '');
    
    const icon3 = document.getElementById('academic-icon-3');
    if(icon3 && data.academic?.icon3) icon3.className = data.academic.icon3;

    // ============================================================
    // SECCIONES OPCIONALES (Galería, Videos, Recursos)
    // ============================================================

    // --- Sección 4: Galería ---
    const secGallery = document.getElementById('sec-gallery');
    const galleryContainer = document.getElementById('gallery-container');
    
    if (data.gallery && data.gallery.length > 0) {
        if(secGallery) secGallery.style.display = 'block';
        if(galleryContainer) {
            galleryContainer.innerHTML = ''; 
            data.gallery.forEach(src => {
                const item = document.createElement('div');
                item.className = 'gallery-item';
                item.innerHTML = `<img src="${src}" alt="Imagen de galería">`;
                galleryContainer.appendChild(item);
            });
        }
    } else {
        if(secGallery) secGallery.style.display = 'none';
    }

    // --- Sección 5: Videos ---
    const secVideo = document.getElementById('sec-video');
    const videoContainer = document.getElementById('video-container');

    if (data.videos && data.videos.length > 0) {
        if(secVideo) secVideo.style.display = 'block';
        if(videoContainer) {
            videoContainer.innerHTML = ''; 
            data.videos.forEach(src => {
                const item = document.createElement('div');
                item.className = 'video-item';
                item.innerHTML = `<iframe src="${src}" title="Video player" allowfullscreen></iframe>`;
                videoContainer.appendChild(item);
            });
        }
    } else {
        if(secVideo) secVideo.style.display = 'none';
    }

    // --- Sección 6: Recursos ---
    const secResources = document.getElementById('sec-resources');
    const resContainer = document.getElementById('resources-container');

    if (data.resources && data.resources.length > 0) {
        if(secResources) secResources.style.display = 'block';
        if(resContainer) {
            resContainer.innerHTML = '';
            data.resources.forEach(res => {
                const btn = document.createElement('a');
                btn.href = res.url;
                btn.target = "_blank"; 
                btn.className = "resource-btn";
                btn.innerHTML = `
                    <i class="${res.icon}"></i>
                    <div>
                        <span>${res.title}</span>
                        <small>${res.subtitle}</small>
                    </div>
                `;
                resContainer.appendChild(btn);
            });
        }
    } else {
        if(secResources) secResources.style.display = 'none';
    }

    // --- RECALCULAR COLORES DE FONDO ---
    fixBackgroundColors();

    // --- ACTUALIZAR MENÚ LATERAL (ÍNDICE) ---
    updateSideMenu();
}

// FUNCIÓN: Generar dinámicamente los links del slider según secciones visibles
function updateSideMenu() {
    const sideMenuLinks = document.getElementById('sideMenuLinks');
    if (!sideMenuLinks) return;

    // Limpiar menú actual
    sideMenuLinks.innerHTML = '';

    // Definición de secciones potenciales y sus íconos/nombres
    const sections = [
        { id: 'narrative-section', name: 'Descripción General', icon: 'fas fa-align-left' },
        { id: 'details-section', name: 'Información Académica', icon: 'fas fa-info-circle' },
        { id: 'sec-gallery', name: 'Momentos Capturados', icon: 'fas fa-images' },
        { id: 'sec-video', name: 'Material Audiovisual', icon: 'fas fa-video' },
        { id: 'sec-resources', name: 'Descargas y Enlaces', icon: 'fas fa-download' }
    ];

    sections.forEach(sec => {
        const element = document.getElementById(sec.id) || document.querySelector(`.${sec.id}`);
        
        // Solo agregar al índice si la sección existe y NO está oculta
        if (element && element.style.display !== 'none') {
            const li = document.createElement('li');
            li.innerHTML = `
                <a href="#${sec.id}" onclick="toggleSideMenu()">
                    <i class="${sec.icon}"></i> ${sec.name}
                </a>
            `;
            sideMenuLinks.appendChild(li);
        }
    });
}

// FUNCIÓN: Alternar colores solo en secciones visibles
function fixBackgroundColors() {
    // Seleccionamos todas las secciones dentro de Main, excepto el Hero
    const sections = document.querySelectorAll('main section:not(#hero-section)');
    
    let visibleIndex = 0;

    sections.forEach(section => {
        // Solo trabajamos con las secciones que NO están ocultas
        if (section.style.display !== 'none') {
            // Limpiamos clases previas
            section.classList.remove('bg-white', 'bg-gray');

            // Si el índice es par -> Blanco, Impar -> Gris (#f8f9fa)
            if (visibleIndex % 2 === 0) {
                section.classList.add('bg-white');
            } else {
                section.classList.add('bg-gray');
            }
            visibleIndex++;
        }
    });
}

// Helper para texto simple
function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

// FUNCIÓN: Iniciar Animaciones y Efectos Visuales
function initVisualEffects() {
    document.body.style.opacity = '1';

    // --- A. Animación del Título Hero ---
    const line1 = document.getElementById('hero-title-1');
    const line2 = document.getElementById('hero-title-2');
    const paragraph = document.querySelector('.hero-content p');
    const heroTitleContainer = document.querySelector('.hero-content h1');

    if (line1 && line2 && paragraph && heroTitleContainer) {
        const prepareText = (element) => {
            const text = element.textContent;
            element.innerHTML = '';
            [...text].forEach((char) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.classList.add('letter');
                element.appendChild(span);
            });
        };

        prepareText(line1);
        prepareText(line2);

        heroTitleContainer.style.visibility = 'visible';
        paragraph.style.visibility = 'visible';

        let delay = 300;
        const stagger = 40;
        const duration = 1200;

        const animateElement = (element) => {
            const letters = element.querySelectorAll('.letter');
            letters.forEach((letter) => {
                letter.style.animation = `riseIn ${duration}ms cubic-bezier(.2,.9,.3,1) ${delay}ms both`;
                delay += stagger;
            });
        };

        animateElement(line1);
        animateElement(line2); 
        
        delay += 100;
        paragraph.style.animation = `riseIn ${duration}ms cubic-bezier(.2,.9,.3,1) ${delay}ms both`;
    }

    // --- B. Lógica del Lightbox ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    let gallerySources = [];
    let currentImgIndex = 0;
    let isNavigating = false; // Mecanismo de seguridad (cooldown)

    // Variables para el arrastre (Compartidas entre grilla y lightbox)
    let startPos = 0;
    let isDragging = false;
    let wasDragged = false; 

    // Función para actualizar la imagen del lightbox
    const updateLightboxImg = (index) => {
        if (index >= 0 && index < gallerySources.length) {
            currentImgIndex = index;
            
            // Desvanecer la imagen actual
            lightboxImg.style.opacity = '0';
            
            // Esperar a que la imagen nueva cargue antes de mostrarla
            const handleLoad = () => {
                lightboxImg.style.opacity = '1';
                lightboxImg.removeEventListener('load', handleLoad);
            };

            // Pequeño retraso para permitir que el desvanecimiento comience (aprox 300ms)
            setTimeout(() => {
                lightboxImg.addEventListener('load', handleLoad);
                lightboxImg.src = gallerySources[currentImgIndex];
                
                // Si la imagen ya está en caché, el evento load puede no dispararse en algunos navegadores
                if (lightboxImg.complete) {
                    handleLoad();
                }
            }, 300);
        }
    };

    const nextImg = () => {
        if (isNavigating) return;
        isNavigating = true;
        setTimeout(() => (isNavigating = false), 450); // Cooldown ajustado a la transición

        const newIndex = (currentImgIndex + 1) % gallerySources.length;
        updateLightboxImg(newIndex);
    };

    const prevImg = () => {
        if (isNavigating) return;
        isNavigating = true;
        setTimeout(() => (isNavigating = false), 450); // Cooldown ajustado a la transición

        const newIndex = (currentImgIndex - 1 + gallerySources.length) % gallerySources.length;
        updateLightboxImg(newIndex);
    };

    const closeLightbox = () => {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar scroll body
        document.documentElement.style.overflow = ''; // Restaurar scroll html
    };

    // --- MANEJO DE CLICS EN LA GRILLA ---
    document.body.addEventListener('mousedown', (e) => {
        const galleryItem = e.target.closest('.gallery-item');
        if (galleryItem) {
            startPos = e.clientX;
            isDragging = true;
            wasDragged = false;
        }
    });

    document.body.addEventListener('click', (e) => {
        const galleryItem = e.target.closest('.gallery-item');
        if (galleryItem) {
            // Si el usuario estaba arrastrando la grilla, no abrir el lightbox
            if (wasDragged) {
                wasDragged = false;
                return;
            }

            const allItems = Array.from(document.querySelectorAll('.gallery-item img'));
            gallerySources = allItems.map((img) => img.src);

            const img = galleryItem.querySelector('img');
            if (img) {
                currentImgIndex = gallerySources.indexOf(img.src);
                
                // --- APERTURA LIMPIA SIN FLASH ---
                lightboxImg.style.opacity = '0'; // Asegurar que empiece invisible
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
                
                // Mostrar solo cuando esté lista
                const handleInitialLoad = () => {
                    lightboxImg.style.opacity = '1';
                    lightboxImg.removeEventListener('load', handleInitialLoad);
                };

                if (lightboxImg.complete) {
                    handleInitialLoad();
                } else {
                    lightboxImg.addEventListener('load', handleInitialLoad);
                }
                
                // BLOQUEO TOTAL DE SCROLL (Body + HTML)
                document.body.style.overflow = 'hidden';
                document.documentElement.style.overflow = 'hidden';
            }
        }
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            prevImg();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            nextImg();
        });
    }

    // --- LÓGICA DE DESLIZAMIENTO (SWIPE) MEJORADA ---
    if (lightbox) {
        // Bloquear deslizamiento del fondo en móviles
        lightbox.addEventListener('touchmove', (e) => {
            if (lightbox.classList.contains('active')) {
                e.preventDefault();
            }
        }, { passive: false });

        lightbox.addEventListener('mousedown', (e) => {
            if (e.target.closest('.lightbox-nav') || e.target === closeBtn) return;
            
            // Solo permitir arrastre si comienza sobre la imagen
            if (e.target !== lightboxImg) return;

            startPos = e.clientX;
            isDragging = true;
            wasDragged = false;
            lightbox.style.cursor = 'grabbing';
        });

        // Escuchar mouseup en window para que funcione aunque el mouse esté fuera
        window.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            if (lightbox) lightbox.style.cursor = 'default';
            
            const diff = e.clientX - startPos;
            
            // Si el movimiento es mayor a un pequeño margen, se considera arrastre
            if (Math.abs(diff) > 10) {
                wasDragged = true;
            }

            // Solo ejecutar navegación si el lightbox está activo
            if (lightbox.classList.contains('active')) {
                if (diff < -40) {
                    nextImg();
                } else if (diff > 40) {
                    prevImg();
                }
            }
        });

        lightbox.addEventListener('touchstart', (e) => {
            startPos = e.touches[0].clientX;
        }, { passive: true });

        lightbox.addEventListener('touchend', (e) => {
            const diff = e.changedTouches[0].clientX - startPos;
            if (diff < -40) {
                nextImg();
            } else if (diff > 40) {
                prevImg();
            }
        });

        lightbox.addEventListener('click', (e) => {
            // Si el mouse se soltó después de un arrastre, no cerrar el lightbox
            if (wasDragged) {
                wasDragged = false;
                return;
            }

            // Cerrar solo si se hace clic en el fondo (fuera de la imagen y controles)
            if (e.target !== lightboxImg && !e.target.closest('.lightbox-nav')) {
                closeLightbox();
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            closeLightbox();
        });
    }

    // Soporte para teclado
    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;

        if (e.key === 'ArrowLeft') {
            prevImg();
        } else if (e.key === 'ArrowRight') {
            nextImg();
        } else if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}