document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navDer = document.querySelector('.nav_der');
    const body = document.body;
    
    if (mobileMenuBtn && navDer) {
        mobileMenuBtn.addEventListener('click', function() {
            navDer.classList.toggle('active');
            body.classList.toggle('no-scroll');
            this.innerHTML = navDer.classList.contains('active') ? '✕' : '☰';
        });
    }
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.nav_barr')?.offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                if (navDer && navDer.classList.contains('active')) {
                    navDer.classList.remove('active');
                    body.classList.remove('no-scroll');
                    if (mobileMenuBtn) mobileMenuBtn.innerHTML = '☰';
                }
            }
        });
    });

    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in, .luxury-fade-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        if (e.target.closest('a, button, .hover-effect')) {
            cursor.classList.add('cursor-active');
        } else {
            cursor.classList.remove('cursor-active');
        }
    });
    window.addEventListener('scroll', function() {
        const navBar = document.querySelector('.nav_barr');
        if (navBar) {
            if (window.scrollY > 100) {
                navBar.classList.add('scrolled');
            } else {
                navBar.classList.remove('scrolled');
            }
        }
        
        animateOnScroll();
    });

    function initLoader() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-logo">
                    <span style="color: #0066ff;">DISITE</span><span style="color:#002d70;">-XPERT</span>
                </div>
                <div class="loader-bar">
                    <div class="loader-progress"></div>
                </div>
            </div>
        `;
        document.body.appendChild(loader);
        let progress = 0;
        const progressBar = document.querySelector('.loader-progress');
        if (progressBar) {
            const interval = setInterval(() => {
                progress += Math.random() * 10;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    setTimeout(() => {
                        loader.style.opacity = '0';
                        setTimeout(() => {
                            loader.remove();
                        }, 500);
                    }, 300);
                }
                progressBar.style.width = `${progress}%`;
            }, 100);
        }
    }
    initLoader();
    animateOnScroll();

    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
    
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {});
    }
        const parallaxSections = document.querySelectorAll('.parallax-section');
    window.addEventListener('scroll', () => {
        parallaxSections.forEach(section => {
            const scrollPosition = window.pageYOffset;
            const sectionPosition = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition > sectionPosition - window.innerHeight && 
                scrollPosition < sectionPosition + sectionHeight) {
                const speed = section.dataset.speed || 0.5;
                const yPos = -(scrollPosition - sectionPosition) * speed;
                section.style.backgroundPositionY = `${yPos}px`;
            }
        });
    });
});

function initParticles() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '1';
    canvas.style.pointerEvents = 'none';
    
    heroSection.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = heroSection.offsetWidth;
    canvas.height = heroSection.offsetHeight;
    
    const particles = [];
    const particleCount = Math.floor(canvas.width * canvas.height / 10000);
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speed: Math.random() * 0.5 + 0.1,
            opacity: Math.random() * 0.5 + 0.1,
            direction: Math.random() * Math.PI * 2
        });
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            ctx.fill();
            
            particle.x += Math.cos(particle.direction) * particle.speed;
            particle.y += Math.sin(particle.direction) * particle.speed;
            
            if (particle.x < 0 || particle.x > canvas.width) {
                particle.direction = Math.PI - particle.direction;
            }
            if (particle.y < 0 || particle.y > canvas.height) {
                particle.direction = -particle.direction;
            }
            
            particle.x = Math.max(0, Math.min(canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    window.addEventListener('resize', () => {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
    });
}

window.addEventListener('load', initParticles);