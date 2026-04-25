// script.js
// Datos del CV
const cvData = {
    nombre: "Flavio Sistro",
    titulo: "Desarrollador en Formación | Narrativa Audiovisual",
    email: "fsistro@gmail.com",
    telefono: "0221 6122976",
    github: "FlavertT",
    linkedin: "flavertptuntomov",
    ubicacion: "La Plata, Argentina",
    sobreMi: "Desarrollador en formación con una sólida base en programación en C, Python y SQL, actualmente cursando la tecnicatura en la UTN. Me encuentro en la búsqueda de mi primera oportunidad profesional donde pueda aplicar mis habilidades técnicas y mi pasión por crear soluciones digitales.",
    habilidades: ["Programación en C", "SQL", "Python", "HTML5", "CSS3", "JavaScript"],
    idiomas: [
        { nombre: "Español", nivel: 100, texto: "Nativo" },
        { nombre: "Inglés", nivel: 75, texto: "Intermedio" }
    ]
};

// Función para obtener datos de GitHub
async function obtenerGitHubStats() {
    const username = cvData.github;
    const repoCountElement = document.getElementById('repo-count');
    const starsCountElement = document.getElementById('stars-count');
    const languagesElement = document.getElementById('languages');
    
    try {
        // Obtener repositorios del usuario
        const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const repos = await response.json();
        
        if (response.ok && !repos.message) {
            // Contar repositorios
            const repoCount = repos.length;
            repoCountElement.textContent = repoCount;
            
            // Contar estrellas totales
            const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
            starsCountElement.textContent = totalStars;
            
            // Obtener lenguajes principales
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
        repoCountElement.textContent = 'No disponible';
        starsCountElement.textContent = 'No disponible';
        languagesElement.textContent = 'No disponible';
    }
}

// Contador de visitas usando localStorage
function actualizarContadorVisitas() {
    let visitas = localStorage.getItem('visitas_cv');
    if (visitas === null) {
        visitas = 1;
    } else {
        visitas = parseInt(visitas) + 1;
    }
    localStorage.setItem('visitas_cv', visitas);
    
    console.log(`Visitas al CV: ${visitas}`);
    
    const footerText = document.querySelector('.footer-text');
    if (footerText && !footerText.innerHTML.includes('Visitas:')) {
        footerText.innerHTML += ` | Visitas: ${visitas}`;
    }
}

// Función para cargar las habilidades
function cargarHabilidades() {
    const skillsContainer = document.getElementById('skills-container');
    if (skillsContainer) {
        skillsContainer.innerHTML = '';
        cvData.habilidades.forEach(habilidad => {
            const skillTag = document.createElement('div');
            skillTag.className = 'skill-tag';
            skillTag.textContent = habilidad;
            skillTag.addEventListener('click', () => {
                mostrarAlerta(`Has seleccionado la habilidad: ${habilidad}`);
            });
            skillsContainer.appendChild(skillTag);
        });
    }
}

// Función para mostrar alertas personalizadas
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
    closeBtn.addEventListener('click', () => {
        alerta.remove();
    });
    
    setTimeout(() => {
        if (alerta.parentNode) {
            alerta.remove();
        }
    }, 3000);
}

// Función para cambiar tema oscuro/claro
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i><span>Modo Claro</span>';
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i><span>Modo Claro</span>';
            mostrarAlerta('Modo oscuro activado', 'info');
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i><span>Modo Oscuro</span>';
            mostrarAlerta('Modo claro activado', 'info');
        }
    });
}

// Función para descargar PDF
function initPDFDownload() {
    const downloadBtn = document.getElementById('download-pdf');
    const cvContainer = document.getElementById('cv-container');
    
    downloadBtn.addEventListener('click', async () => {
        mostrarAlerta('Generando PDF, por favor espera...', 'info');
        
        const themeContainer = document.querySelector('.theme-toggle-container');
        if (themeContainer) {
            themeContainer.style.display = 'none';
        }
        
        const opt = {
            margin: [0.5, 0.5, 0.5, 0.5],
            filename: `CV_${cvData.nombre.replace(/\s/g, '_')}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, letterRendering: true },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        
        try {
            await html2pdf().set(opt).from(cvContainer).save();
            mostrarAlerta('PDF generado exitosamente!', 'success');
        } catch (error) {
            console.error('Error al generar PDF:', error);
            mostrarAlerta('Error al generar el PDF', 'error');
        } finally {
            if (themeContainer) {
                themeContainer.style.display = 'flex';
            }
        }
    });
}

// Función para manejar el formulario de contacto
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nombre = document.getElementById('name')?.value || '';
            const email = document.getElementById('email')?.value || '';
            const asunto = document.getElementById('subject')?.value || '';
            const mensaje = document.getElementById('message')?.value || '';
            
            if (!nombre || !email || !asunto || !mensaje) {
                mostrarAlerta('Por favor, completa todos los campos', 'error');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                mostrarAlerta('Por favor, ingresa un email válido', 'error');
                return;
            }
            
            mostrarAlerta(`¡Gracias ${nombre}! Tu mensaje ha sido enviado. Te contactaré pronto.`, 'success');
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
            
            console.log('Mensajes guardados:', mensajes);
        });
    }
}

// Función para efecto de escritura en el título
function efectoEscritura() {
    const tituloElement = document.querySelector('.titulo');
    if (tituloElement) {
        const textoOriginal = tituloElement.textContent;
        tituloElement.textContent = '';
        let i = 0;
        
        function escribir() {
            if (i < textoOriginal.length) {
                tituloElement.textContent += textoOriginal.charAt(i);
                i++;
                setTimeout(escribir, 30);
            }
        }
        
        escribir();
    }
}

// Función para inicializar tooltips en redes sociales
function initSocialTooltips() {
    const socialLinks = document.querySelectorAll('.social-link');
    const tooltips = {
        linkedin: 'Visitar LinkedIn',
        github: 'Visitar GitHub',
        twitter: 'Visitar Twitter',
        instagram: 'Visitar Instagram'
    };
    
    socialLinks.forEach(link => {
        const icon = link.querySelector('i');
        if (icon) {
            let social = '';
            if (icon.classList.contains('fa-linkedin')) social = 'linkedin';
            if (icon.classList.contains('fa-github')) social = 'github';
            if (icon.classList.contains('fa-twitter')) social = 'twitter';
            if (icon.classList.contains('fa-instagram')) social = 'instagram';
            
            if (social && tooltips[social]) {
                link.setAttribute('title', tooltips[social]);
                if (social === 'github') {
                    link.addEventListener('click', (e) => {
                        // El enlace ya tiene href, solo mostramos mensaje
                        mostrarAlerta('Abriendo perfil de GitHub', 'info');
                    });
                } else {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        mostrarAlerta(`Redirigiendo a ${tooltips[social]}`, 'info');
                    });
                }
            }
        }
    });
}

// Función para animar barras de progreso
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
