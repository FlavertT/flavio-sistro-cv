// ============================================
// 1. DATOS DEL CV (ÚNICA FUENTE DE VERDAD)
// ============================================
const cvData = {
    // Datos personales
    nombre: "Flavio Sistro",
    titulo: "Desarrollador en Formación | Narrativa Audiovisual",
    email: "fsistro@gmail.com",
    telefono: "0221 6122976",
    github: "FlavertT",
    linkedin: "flavertptuntomov",
    ubicacion: "La Plata, Argentina",
    
    // Habilidades
    habilidades: ["Programación en C", "SQL", "Python", "HTML5", "CSS3", "JavaScript"],
    
    // Idiomas
    idiomas: [
        { nombre: "Español", nivel: 100, texto: "Nativo" },
        { nombre: "Inglés", nivel: 75, texto: "Intermedio" }
    ],
    
    // Certificaciones
    certificaciones: [
        {
            titulo: "El Vuelo del Moscardón",
            descripcion: "Película de interés Provincial",
            link: "https://www.youtube.com/watch?v=eY4jXLyNNV0",
            linkTexto: "Ver tráiler"
        }
    ],
    
    // Experiencia laboral
    experiencia: [
        {
            puesto: "Camarógrafo - Flavertt",
            periodo: "marzo de 2018 - Presente (8 años 1 mes)",
            ubicacion: "Provincia de Buenos Aires, Argentina",
            tareas: [
                "Gestión de proyectos audiovisuales desde la preproducción hasta la entrega final",
                "Cumplimiento de plazos y expectativas del cliente",
                "Coordinación de equipos de trabajo y recursos técnicos"
            ]
        }
    ],
    
    // Educación
    educacion: [
        {
            titulo: "Tecnicatura en Programación",
            fecha: "2024 - diciembre de 2027",
            institucion: "Universidad Tecnológica Nacional (UTN)"
        },
        {
            titulo: "Licenciatura en Artes Audiovisuales",
            fecha: "marzo de 2012 - octubre de 2024",
            institucion: "Facultad de Artes",
            subtitulo: "Comunicación y Marketing"
        }
    ],
    
    // Proyectos destacados
    proyectos: [
        {
            titulo: "Sistema de Gestión de Proyectos",
            descripcion: "Desarrollo de una aplicación web para la gestión de proyectos audiovisuales, incluyendo seguimiento de tareas, calendario de producción y gestión de recursos.",
            tecnologias: ["Python", "SQL", "Flask"]
        },
        {
            titulo: "Portfolio Interactivo",
            descripcion: "Creación de un portfolio personal con animaciones y diseño responsive, mostrando trabajos audiovisuales y proyectos de programación.",
            tecnologias: ["HTML5", "CSS3", "JavaScript"]
        }
    ],
    
    // Videos
    videos: {
        moscardon: {
            titulo: '"El Vuelo del Moscardón" - Tráiler Oficial',
            badge: "🏆 Película de interés Provincial",
            descripcion: "Una producción audiovisual que captura la esencia y las tradiciones de nuestra provincia. Reconocida por su valor cultural y artístico.",
            tags: ["Largometraje", "Documental", "Dirección", "2025"],
            videoId: "eY4jXLyNNV0"
        },
        toyota: {
            titulo: "Planta Automatizada Toyota",
            badge: "📅 Febrero 2026",
            empresa: "Toyota Argentina",
            descripcion: "Trabajo audiovisual realizado en la planta automatizada de Toyota, documentando procesos de automatización industrial, líneas de ensamblaje y control de calidad.",
            tags: ["Industria 4.0", "Automatización", "Toyota", "Producción Industrial", "Febrero 2026"],
            archivo: "TOYOTA1.mp4",
            poster: "toyuta.png"
        }
    }
};

// ============================================
// 2. FUNCIÓN QUE CARGA TODO EL CONTENIDO
// ============================================
function cargarTodoElContenido() {
    // Header
    document.getElementById('nombre').textContent = cvData.nombre;
    document.querySelector('.titulo').textContent = cvData.titulo;
    
    // Contacto
    document.querySelector('#telefono .contact-value').textContent = cvData.telefono;
    const emailLink = document.querySelector('#email .contact-value');
    emailLink.href = `mailto:${cvData.email}`;
    emailLink.textContent = cvData.email;
    const linkedinLink = document.querySelector('#linkedin .contact-value');
    linkedinLink.href = `https://www.linkedin.com/in/${cvData.linkedin}/`;
    linkedinLink.textContent = cvData.linkedin;
    const githubLink = document.querySelector('#github .contact-value');
    githubLink.href = `https://github.com/${cvData.github}/`;
    githubLink.textContent = cvData.github;
    document.querySelector('#ubicacion .contact-value').textContent = cvData.ubicacion;
    
    // Habilidades
    const skillsContainer = document.getElementById('skills-container');
    skillsContainer.innerHTML = '';
    cvData.skilss.forEach(habilidad => {
        const tag = document.createElement('div');
        tag.className = 'skill-tag';
        tag.textContent = habilidad;
        tag.addEventListener('click', () => mostrarAlerta(`Skill: ${habilidad}`, 'info'));
        skillsContainer.appendChild(tag);
    });
    
    // Idiomas (usando <progress>)
    const idiomasContainer = document.querySelector('.left-column .section:nth-child(3)');
    if (idiomasContainer) {
        idiomasContainer.innerHTML = `
            <h2><i class="fas fa-language"></i> Idiomas</h2>
            ${cvData.idiomas.map(idioma => `
                <div class="language-item">
                    <span>${idioma.nombre}</span>
                    <progress class="language-progress" value="${idioma.nivel}" max="100">${idioma.nivel}%</progress>
                    <span>${idioma.texto}</span>
                </div>
            `).join('')}
        `;
    }
    
    // Certificaciones
    const certificacionesContainer = document.querySelector('.certification-item');
    if (certificacionesContainer && cvData.certificaciones[0]) {
        certificacionesContainer.innerHTML = `
            <p><strong>"${cvData.certificaciones[0].titulo}"</strong></p>
            <p>${cvData.certificaciones[0].descripcion}</p>
            <a href="${cvData.certificaciones[0].link}" target="_blank" rel="noopener noreferrer" class="watch-link">
                <i class="fab fa-youtube"></i> ${cvData.certificaciones[0].linkTexto}
            </a>
        `;
    }
    
    // Experiencia
    const experienciaContainer = document.querySelector('.experience-item');
    if (experienciaContainer && cvData.experiencia[0]) {
        experienciaContainer.innerHTML = `
            <h3>${cvData.experiencia[0].puesto}</h3>
            <p class="company">${cvData.experiencia[0].periodo}</p>
            <p class="location"><i class="fas fa-map-marker-alt"></i> ${cvData.experiencia[0].ubicacion}</p>
            <ul>
                ${cvData.experiencia[0].tareas.map(tarea => `<li>${tarea}</li>`).join('')}
            </ul>
        `;
    }
    
    // Educación
    const educationContainer = document.querySelector('.right-column .section:nth-child(2)');
    if (educationContainer) {
        educationContainer.innerHTML = `
            <h2><i class="fas fa-graduation-cap"></i> Educación</h2>
            ${cvData.educacion.map(edu => `
                <div class="education-item">
                    <h3>${edu.titulo}</h3>
                    <p class="date">${edu.fecha}</p>
                    <p>${edu.institucion}</p>
                    ${edu.subtitulo ? `<p class="subtitle">${edu.subtitulo}</p>` : ''}
                </div>
            `).join('')}
        `;
    }
    
    // Proyectos
    const proyectosContainer = document.querySelector('.right-column .section:nth-child(3)');
    if (proyectosContainer) {
        proyectosContainer.innerHTML = `
            <h2><i class="fas fa-project-diagram"></i> Proyectos Destacados</h2>
            ${cvData.proyectos.map(proy => `
                <div class="project-item">
                    <h3>${proy.titulo}</h3>
                    <p>${proy.descripcion}</p>
                    <div class="project-tech">
                        ${proy.tecnologias.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            `).join('')}
        `;
    }
    
    // Videos
    const moscardonContainer = document.querySelector('.video-showcase .video-section:first-child .video-info');
    if (moscardonContainer) {
        moscardonContainer.innerHTML = `
            <h3>${cvData.videos.moscardon.titulo}</h3>
            <p class="video-badge">${cvData.videos.moscardon.badge}</p>
            <p>${cvData.videos.moscardon.descripcion}</p>
            <div class="video-tags">
                ${cvData.videos.moscardon.tags.map(tag => `<span class="video-tag">${tag}</span>`).join('')}
            </div>
        `;
    }
    
    const toyotaContainer = document.querySelector('.video-showcase .video-section:last-child .video-info');
    if (toyotaContainer) {
        toyotaContainer.innerHTML = `
            <h3>${cvData.videos.toyota.titulo}</h3>
            <p class="video-badge toyota-badge">${cvData.videos.toyota.badge}</p>
            <p class="video-company"><i class="fas fa-building"></i> ${cvData.videos.toyota.empresa}</p>
            <p>${cvData.videos.toyota.descripcion}</p>
            <div class="video-tags">
                ${cvData.videos.toyota.tags.map(tag => `<span class="video-tag">${tag}</span>`).join('')}
            </div>
        `;
    }
}

// ============================================
// 3. FUNCIONES DE INTERACCIÓN (sin cambios)
// ============================================

function initIntroVideo() {
    const loadingScreen = document.getElementById('loading-screen');
    const introVideo = document.getElementById('intro-video');
    const skipBtn = document.getElementById('skip-intro');
    
    if (!loadingScreen) return;
    
    function hideIntro() {
        loadingScreen.classList.add('hide');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            if (introVideo) introVideo.pause();
        }, 500);
    }
    
    if (skipBtn) {
        skipBtn.addEventListener('click', hideIntro);
    }
    
    if (introVideo) {
        introVideo.addEventListener('ended', hideIntro);
        document.body.addEventListener('click', () => {
            introVideo.muted = false;
        }, { once: true });
    }
    
    setTimeout(hideIntro, 10000);
}

async function obtenerGitHubStats() {
    const username = cvData.github;
    const repoCountElement = document.getElementById('repo-count');
    const starsCountElement = document.getElementById('stars-count');
    const languagesElement = document.getElementById('languages');
    
    if (!repoCountElement) return;
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const repos = await response.json();
        
        if (response.ok && !repos.message) {
            repoCountElement.textContent = repos.length;
            const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
            starsCountElement.textContent = totalStars;
            
            const languages = {};
            repos.forEach(repo => {
                if (repo.language) {
                    languages[repo.language] = (languages[repo.language] || 0) + 1;
                }
            });
            
            const topLanguages = Object.entries(languages)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(([lang]) => lang)
                .join(', ');
            
            languagesElement.textContent = topLanguages || 'No disponible';
        } else {
            throw new Error('Error al obtener datos');
        }
    } catch (error) {
        console.error('Error al obtener datos de GitHub:', error);
        repoCountElement.textContent = 'Error';
        starsCountElement.textContent = 'Error';
        languagesElement.textContent = 'Error';
    }
}

function actualizarContadorVisitas() {
    let visitas = localStorage.getItem('visitas_cv');
    if (visitas === null) visitas = 1;
    else visitas = parseInt(visitas) + 1;
    localStorage.setItem('visitas_cv', visitas);
    
    const footerText = document.querySelector('.footer-text');
    if (footerText && !footerText.innerHTML.includes('Visitas:')) {
        footerText.innerHTML += ` | Visitas: ${visitas}`;
    }
}

function mostrarAlerta(mensaje, tipo = 'info') {
    const alerta = document.createElement('div');
    alerta.className = 'custom-alert';
    
    let icono = 'fa-info-circle';
    if (tipo === 'success') icono = 'fa-check-circle';
    if (tipo === 'error') icono = 'fa-exclamation-circle';
    
    alerta.innerHTML = `
        <div class="alert-content">
            <i class="fas ${icono}"></i>
            <p>${mensaje}</p>
            <button class="alert-close"><i class="fas fa-times"></i></button>
        </div>
    `;
    document.body.appendChild(alerta);
    const closeBtn = alerta.querySelector('.alert-close');
    closeBtn.addEventListener('click', () => alerta.remove());
    setTimeout(() => alerta.remove(), 3500);
}

function initThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        btn.innerHTML = '<i class="fas fa-sun"></i><span>Modo Claro</span>';
    }
    
    btn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            btn.innerHTML = '<i class="fas fa-sun"></i><span>Modo Claro</span>';
            mostrarAlerta('Modo oscuro activado', 'info');
        } else {
            localStorage.setItem('theme', 'light');
            btn.innerHTML = '<i class="fas fa-moon"></i><span>Modo Oscuro</span>';
            mostrarAlerta('Modo claro activado', 'info');
        }
    });
}

function initPDFDownload() {
    const btn = document.getElementById('download-pdf');
    const container = document.getElementById('cv-container');
    
    if (!btn) return;
    
    btn.addEventListener('click', async () => {
        mostrarAlerta('Generando PDF, por favor espera...', 'info');
        
        const themeContainer = document.querySelector('.theme-toggle-container');
        if (themeContainer) themeContainer.style.display = 'none';
        
        try {
            await html2pdf().set({
                margin: 0.5,
                filename: `CV_Flavio_Sistro.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
            }).from(container).save();
            mostrarAlerta('PDF generado exitosamente!', 'success');
        } catch (error) {
            console.error('Error:', error);
            mostrarAlerta('Error al generar el PDF', 'error');
        } finally {
            if (themeContainer) themeContainer.style.display = 'flex';
        }
    });
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('name')?.value;
        const email = document.getElementById('email')?.value;
        const asunto = document.getElementById('subject')?.value;
        const mensaje = document.getElementById('message')?.value;
        
        if (!nombre || !email || !asunto || !mensaje) {
            mostrarAlerta('Por favor, completa todos los campos', 'error');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            mostrarAlerta('Por favor, ingresa un email válido', 'error');
            return;
        }
        
        mostrarAlerta(`¡Gracias ${nombre}! Tu mensaje ha sido enviado.`, 'success');
        form.reset();
        
        const mensajes = JSON.parse(localStorage.getItem('mensajes_contacto') || '[]');
        mensajes.push({
            nombre,
            email,
            asunto,
            mensaje,
            fecha: new Date().toISOString()
        });
        localStorage.setItem('mensajes_contacto', JSON.stringify(mensajes));
    });
}

function efectoEscritura() {
    const titulo = document.querySelector('.titulo');
    if (titulo && titulo.textContent) {
        const texto = titulo.textContent;
        titulo.textContent = '';
        let i = 0;
        function escribir() {
            if (i < texto.length) {
                titulo.textContent += texto.charAt(i);
                i++;
                setTimeout(escribir, 40);
            }
        }
        escribir();
    }
}

function initSocialTooltips() {
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href') === '#') {
                e.preventDefault();
                mostrarAlerta('Próximamente disponible', 'info');
            }
        });
    });
}

function initInteractiveEffects() {
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(5px)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
        });
    });
    
    const contactInfo = document.querySelector('.contact-info');
    if (contactInfo) {
        contactInfo.addEventListener('click', (e) => {
            const item = e.target.closest('span');
            if (item) {
                const texto = item.textContent.trim();
                mostrarAlerta(`Contacto: ${texto}`, 'info');
            }
        });
    }
}

function initLazyVideos() {
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    if (videoPlaceholders.length === 0) return;

    function loadYouTubePlayer(placeholder) {
        const videoId = placeholder.getAttribute('data-video-id');
        if (!videoId || placeholder.hasAttribute('data-loaded')) return;
        placeholder.setAttribute('data-loaded', 'true');

        const loader = placeholder.querySelector('.video-loader');
        if (loader) loader.style.display = 'flex';

        setTimeout(() => {
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;
            iframe.title = "EL VUELO DEL MOSCARDÓN | Tráiler";
            iframe.frameBorder = "0";
            iframe.allow = "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
            iframe.allowFullscreen = true;
            iframe.style.width = "100%";
            iframe.style.height = "100%";
            iframe.style.position = "absolute";
            iframe.style.top = "0";
            iframe.style.left = "0";

            iframe.onerror = function() {
                placeholder.innerHTML = '<div style="color: white; text-align: center; padding: 20px;">Error al cargar el video.</div>';
            };

            placeholder.innerHTML = '';
            placeholder.appendChild(iframe);
            placeholder.classList.add('video-loaded');
        }, 100);
    }

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadYouTubePlayer(entry.target);
                }
            });
        }, {
            rootMargin: '200px',
            threshold: 0.1
        });

        videoPlaceholders.forEach(placeholder => {
            observer.observe(placeholder);
            placeholder.addEventListener('click', () => loadYouTubePlayer(placeholder));
        });
    } else {
        videoPlaceholders.forEach(placeholder => {
            placeholder.addEventListener('click', () => loadYouTubePlayer(placeholder));
        });
    }
}

// ============================================
// 4. INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Cargar TODO el contenido desde cvData
    cargarTodoElContenido();
    
    // 2. Contador y GitHub
    actualizarContadorVisitas();
    obtenerGitHubStats();
    
    // 3. Pantalla de carga
    initIntroVideo();
    
    // 4. Interacciones
    initThemeToggle();
    initPDFDownload();
    initContactForm();
    efectoEscritura();
    initSocialTooltips();
    initInteractiveEffects();
    initLazyVideos();
    
    // 5. Mensaje de bienvenida
    setTimeout(() => {
        mostrarAlerta(`¡Bienvenido al CV de ${cvData.nombre}!`, 'success');
    }, 1200);
});

window.cvData = cvData;
window.mostrarAlerta = mostrarAlerta;