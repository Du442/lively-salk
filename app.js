document.addEventListener('DOMContentLoaded', () => {

    // --- NAVBAR COM ESTILO SCROLL ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- MENU MOBILE ---
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fechar menu mobile ao clicar em algum link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // --- DESTAQUE DE LINKS DA NAVBAR NO SCROLL ---
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // --- ANIMAÇÃO DE BARRAS DE HABILIDADES (INTERSECTION OBSERVER) ---
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    
    const animateSkills = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const percent = bar.getAttribute('data-percent');
                bar.style.width = percent;
                observer.unobserve(bar); // Executa apenas uma vez
            }
        });
    };

    const skillsObserver = new IntersectionObserver(animateSkills, {
        root: null,
        threshold: 0.1
    });

    skillBars.forEach(bar => {
        skillsObserver.observe(bar);
    });

    // --- FILTRO DE PROJETOS ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover classe ativa de todos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adicionar ao botão clicado
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // --- FORMULÁRIO DE CONTATO (SIMULAÇÃO DE ENVIO) ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const formSubmit = document.getElementById('form-submit');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Mudar estado do botão de envio
            formSubmit.disabled = true;
            formSubmit.innerHTML = 'Enviando... <i class="fas fa-spinner fa-spin" style="margin-left: 8px;"></i>';

            // Simular tempo de resposta de 1.5 segundos
            setTimeout(() => {
                const name = document.getElementById('name').value;

                // Sucesso na simulação
                formStatus.className = 'form-status success';
                formStatus.innerText = `Obrigado pelo contato, ${name}! Sua mensagem foi enviada com sucesso.`;
                
                // Limpar campos
                contactForm.reset();

                // Restaurar botão de envio
                formSubmit.disabled = false;
                formSubmit.innerHTML = 'Enviar Mensagem <i class="fas fa-paper-plane" style="margin-left: 8px;"></i>';

                // Ocultar mensagem de sucesso após 5 segundos
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);

            }, 1500);
        });
    }
});
