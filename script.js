// ============================================
// 1. DATOS DEL CV (ÚNICA FUENTE DE VERDAD)
// ============================================
const cvData = {
    nombre: "Flavio Sistro",
    titulo: "Desarrollador en Formación | Narrativa Audiovisual",
    email: "fsistro@gmail.com",
    telefono: "0221 6122976",
    github: "FlavertT",
    linkedin: "flavertptuntomov",
    ubicacion: "La Plata, Argentina",
    habilidades: ["Programación en C", "SQL", "Python", "HTML5", "CSS3", "JavaScript"]  // ← En inglés
};

// ============================================
// 2. FUNCIONES DE CARGA DE DATOS
// ============================================

// Cargar datos del CV al HTML
function cargarDatosCV() {
    const nombreElement = document.getElementById('nombre');
    if (nombreElement) nombreElement.textContent = cvData.nombre;
    
    const tituloElement = document.querySelector('.titulo');
    if (tituloElement) tituloElement.textContent = cvData.titulo;
    
    const telefonoElement = document.querySelector('#telefono .contact-value');
    if (telefonoElement) telefonoElement.textContent = cvData.telefono;
    
    const emailElement = document.querySelector('#email .contact-value');
    if (emailElement) {
        emailElement.href = `mailto:${cvData.email}`;
        emailElement.textContent = cvData.email;
    }
    
    const linkedinElement = document.querySelector('#linkedin .contact-value');
    if (linkedinElement) {
        linkedinElement.href = `https://www.linkedin.com/in/${cvData.linkedin}/`;
        linkedinElement.textContent = cvData.linkedin;
    }
    
    const githubElement = document.querySelector('#github .contact-value');
    if (githubElement) {
        githubElement.href = `https://github.com/${cvData.github}/`;
        githubElement.textContent = cvData.github;
    }
    
    const ubicacionElement = document.querySelector('#ubicacion .contact-value');
    if (ubicacionElement) ubicacionElement.textContent = cvData.ubicacion;
}

// Cargar habilidades (EN INGLÉS como vos querés)
function cargarHabilidades() {
    const container = document.getElementById('skills-container');
    if (container) {
        container.innerHTML = '';
        cvData.habilidades.forEach(habilidad => {
            const tag = document.createElement('li');
            tag.className = 'skill-tag';
            tag.textContent = habilidad;  // ← Se muestra en inglés
            tag.addEventListener('click', () => mostrarAlerta(`Skill: ${habilidad}`, 'info'));
            container.appendChild(tag);
        });
    }
}

// ============================================
// 3. FUNCIONES DE INTERACCIÓN
// ============================================

// Pantalla de carga con video
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

// Obtener datos de GitHub
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

// Contador de visitas
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

// Alertas personalizadas
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

// Tema oscuro/claro
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

// Descargar PDF
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

// Formulario de contacto
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

// Efecto de escritura
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

// Tooltips para redes sociales
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

// Animación de barras de progreso
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Efectos interactivos
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

// Lazy loading para videos
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

            // Agregar manejo de errores
            iframe.onerror = function() {
                placeholder.innerHTML = '<div style="color: white; text-align: center; padding: 20px;">Error al cargar el video. Verifica que el enlace sea correcto.</div>';
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
        // Fallback para navegadores antiguos: cargar al clic (si no se puede observar)
        videoPlaceholders.forEach(placeholder => {
            placeholder.addEventListener('click', () => loadYouTubePlayer(placeholder));
        });
    }
}


// ============================================
// 4. INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Cargar datos del CV
    cargarDatosCV();
    
    // 2. Cargar habilidades (EN INGLÉS)
    cargarHabilidades();
    
    // 3. Contador y GitHub
    actualizarContadorVisitas();
    obtenerGitHubStats();
    
    // 4. Pantalla de carga
    initIntroVideo();
    
    // 5. Interacciones
    initThemeToggle();
    initPDFDownload();
    initContactForm();
    efectoEscritura();
    initSocialTooltips();
    initProgressBars();
    initInteractiveEffects();
    initLazyVideos();
    
    // 6. Mensaje de bienvenida
    setTimeout(() => {
        mostrarAlerta(`¡Bienvenido al CV de ${cvData.nombre}!`, 'success');
    }, 1200);
});

// ============================================
// 5. EXPORTAR PARA USO GLOBAL
// ============================================
window.cvData = cvData;
window.mostrarAlerta = mostrarAlerta;