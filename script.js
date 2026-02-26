document.addEventListener('DOMContentLoaded', () => {
    
    // Elementos del DOM
    const navbar = document.getElementById('navbar');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const contactForm = document.getElementById('contactForm');
   

    // 1. Control del Menú Móvil
    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Cerrar menú al hacer clic en un enlace (Mejora UX)
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // 2. Efecto de Navbar al hacer Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-md', 'bg-white/95');
            navbar.classList.remove('bg-white/90');
        } else {
            navbar.classList.remove('shadow-md', 'bg-white/95');
            navbar.classList.add('bg-white/90');
        }
    });
 
    
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            // Cambiar estado del botón a "Enviando..."
            btn.innerText = 'Enviando...';
            btn.disabled = true;
            btn.classList.add('opacity-70', 'cursor-not-allowed');

            // Recopilar datos
            const formData = new FormData(contactForm);

            // Enviar a FormSubmit (API Gratuita segura)
            fetch("https://formsubmit.co/ajax/desoftsis@gmail.com", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // ÉXITO
                alert('¡Gracias! Tu mensaje ha sido enviado a DESOFTSIS LLC. Te responderemos pronto.');
                contactForm.reset();
            })
            .catch(error => {
                // ERROR
                console.error('Error:', error);
                alert('Hubo un error al enviar el mensaje. Por favor intenta de nuevo o escribe directamente a desoftsis@gmail.com');
            })
            .finally(() => {
                // Restaurar botón
                btn.innerText = originalText;
                btn.disabled = false;
                btn.classList.remove('opacity-70', 'cursor-not-allowed');
            });
        });
    }

    // 4. Scroll Suave para enlaces internos (Polyfill simple)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});