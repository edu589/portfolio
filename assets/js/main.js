
        let currentLang = 'es';
        let particles = [];
        let mouse = { x: 0, y: 0 };

        document.addEventListener('DOMContentLoaded', function() {
            initParticles();
            initNavigation();
            initThemeToggle();
            initLanguageToggle();
            initMouseTracking();
            initDownloadCV();
            initMobileMenu();
            initDownloadCV();
        });

        function initParticles() {
            const bg = document.getElementById('dynamicBg');
            const particleCount = 50;

            for (let i = 0; i < particleCount; i++) {
                createParticle(bg);
            }

            setInterval(animateParticles, 100);
        }

        function createParticle(container) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = Math.random() * window.innerHeight + 'px';
            
            const duration = Math.random() * 3 + 3;
            particle.style.animationDuration = duration + 's';
            
            container.appendChild(particle);
            particles.push({
                element: particle,
                x: parseFloat(particle.style.left),
                y: parseFloat(particle.style.top),
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }

        function animateParticles() {
            particles.forEach(particle => {
                const dx = mouse.x - particle.x;
                const dy = mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    particle.vx += dx * 0.0001;
                    particle.vy += dy * 0.0001;
                }
                
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
                if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;
                
                particle.element.style.left = particle.x + 'px';
                particle.element.style.top = particle.y + 'px';
            });
        }

        function initMouseTracking() {
            document.addEventListener('mousemove', (e) => {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
            });
        }

        function initNavigation() {
            const navLinks = document.querySelectorAll('.nav-link');
            const sections = document.querySelectorAll('.section');

            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    navLinks.forEach(nl => nl.classList.remove('active'));
                    sections.forEach(section => section.classList.remove('active'));
                    

                    link.classList.add('active');
                    const sectionId = link.getAttribute('data-section');
                    document.getElementById(sectionId).classList.add('active');
                });
            });
        }

        function getRelativePath(path) {
            const base = window.location.pathname.replace(/\/[^/]*$/, '/'); // carpeta actual
            return base + path;
        }

        function initThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const mobileThemeToggle = document.getElementById('mobileThemeToggle');
        const body = document.body;
        const logoImg = document.getElementById('logoImg');

        function toggleTheme() {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);

            const icon = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            themeToggle.innerHTML = icon;
            mobileThemeToggle.innerHTML = icon;

            logoImg.setAttribute('src', getRelativePath(newTheme === 'dark' 
            ? 'assets/img/light_logo.png' 
            : 'assets/img/dark_logo.png'));
        }

        themeToggle.addEventListener('click', toggleTheme);
        mobileThemeToggle.addEventListener('click', toggleTheme);
    }


        function initLanguageToggle() {
            const langToggle = document.getElementById('langToggle');
            const mobileLangToggle = document.getElementById('mobileLangToggle');

            function toggleLanguage() {
                currentLang = currentLang === 'es' ? 'en' : 'es';
                const newText = currentLang === 'es' ? 'EN' : 'ES';
                langToggle.textContent = newText;
                mobileLangToggle.textContent = newText;
                updateLanguage();
            }

            langToggle.addEventListener('click', toggleLanguage);
            mobileLangToggle.addEventListener('click', toggleLanguage);
        }

        function updateLanguage() {
            const elements = document.querySelectorAll(`[data-${currentLang}]`);
            elements.forEach(element => {
                element.textContent = element.getAttribute(`data-${currentLang}`);
            });
        }

        function initDownloadCV() {
            const downloadBtn = document.querySelector('.download-cv');
            const loaderModal = document.getElementById('cv-loader-modal');
            const errorModal = document.getElementById('cv-error-modal');
            const closeErrorBtn = document.getElementById('close-error');

            downloadBtn.addEventListener('click', async () => {
                const cvPath = 'assets/cv.pdf';

                loaderModal.style.display = 'flex';
                errorModal.style.display = 'none';

                try {

                    const response = await fetch(cvPath, { method: 'HEAD' });
                    if (!response.ok) throw new Error('Archivo no encontrado');

                    setTimeout(() => {
                        const link = document.createElement('a');
                        link.href = cvPath;
                        link.download = 'Silva_Eduardo_CV.pdf';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);

                        loaderModal.style.display = 'none';
                    }, 1000);

                } catch (error) {
                    console.error(error);
                    loaderModal.style.display = 'none';
                    errorModal.style.display = 'flex'; 
                }
            });

            closeErrorBtn.addEventListener('click', () => {
                errorModal.style.display = 'none';
            });
        }

        function initMobileMenu() {
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const sidebar = document.querySelector('.sidebar');
            const sidebarOverlay = document.getElementById('sidebarOverlay');
            const navLinks = document.querySelectorAll('.nav-link');

            mobileMenuBtn.addEventListener('click', () => {
                sidebar.classList.add('open');
                sidebarOverlay.classList.add('show');
            });

            sidebarOverlay.addEventListener('click', () => {
                sidebar.classList.remove('open');
                sidebarOverlay.classList.remove('show');
            });

            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 768) {
                        sidebar.classList.remove('open');
                        sidebarOverlay.classList.remove('show');
                    }
                });
            });
        }

        window.addEventListener('resize', () => {

            particles.forEach(particle => {
                if (particle.x > window.innerWidth) particle.x = window.innerWidth - 10;
                if (particle.y > window.innerHeight) particle.y = window.innerHeight - 10;
            });
        });