// Datos del CV
const cvData = {
    nombre: "Flavio Sistro",
    titulo: "Desarrollador en Formación | Narrativa Audiovisual",
    email: "fsistro@gmail.com",
    telefono: "0221 6122976",
    github: "FlavertT",
    linkedin: "flavertptuntomov",
    ubicacion: "La Plata, Argentina",
    habilidades: ["Programación en C", "SQL", "Python", "HTML5", "CSS3", "JavaScript"]
};

// ========== FUNCIÓN PARA LA PANTALLA DE CARGA CON VIDEO ==========
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
        
        // Para activar sonido después de interacción del usuario
        document.body.addEventListener('click', () => {
            introVideo.muted = false;
        }, { once: true });
    }
    
    // Timeout de seguridad: si el video no termina en 10 segundos, se cierra igual
    setTimeout(hideIntro, 10000);
}

// ========== FUNCIÓN PARA OBTENER DATOS DE GITHUB ==========
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

// Cargar habilidades
function cargarHabilidades() {
    const container = document.getElementById('skills-container');
    if (container) {
        container.innerHTML = '';
        cvData.habilidades.forEach(habilidad => {
            const tag = document.createElement('div');
            tag.className = 'skill-tag';
            tag.textContent = habilidad;
            tag.addEventListener('click', () => mostrarAlerta(`Habilidad: ${habilidad}`, 'info'));
            container.appendChild(tag);
        });
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
    closeBtn.addEventListener('click', () => alert
