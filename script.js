// --- LÓGICA DE MODAL ---
function openModal(serviceName) {
    const modal = document.getElementById('serviceModal') || document.getElementById('contactModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const serviceInput = document.getElementById('serviceType');

    if(modalTitle && serviceInput) {
        modalTitle.innerText = `Solicitar: ${serviceName}`;
        serviceInput.value = serviceName;
    }
    
    if(modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; 
    }
}

function closeModal() {
    const modal = document.getElementById('serviceModal') || document.getElementById('contactModal');
    if(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; 
    }
}

// Cerrar al hacer clic fuera del contenido
window.onclick = function(event) {
    const modal = document.getElementById('serviceModal') || document.getElementById('contactModal');
    if (event.target == modal) {
        closeModal();
    }
}

// --- GESTIÓN DEL ENVÍO DE CORREO (FORMSPREE) ---
const contactForm = document.getElementById('contactForm');
if(contactForm) {
    contactForm.addEventListener("submit", async function(event) {
        event.preventDefault(); // Evitamos que la página se recargue bruscamente
        
        const btn = event.target.querySelector('button[type="submit"]');
        const originalText = btn.innerText;
        
        btn.innerText = "ENVIANDO CORREO...";
        btn.disabled = true;

        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                alert("¡Mensaje enviado con éxito! Nos pondremos en contacto contigo lo antes posible.");
                contactForm.reset();
                closeModal();
            } else {
                alert("Hubo un problema al enviar el mensaje. Por favor, asegúrate de haber puesto tu ID de formspree en el HTML o usa nuestro WhatsApp.");
            }
        } catch (error) {
            alert("Error de conexión. Por favor, escríbenos directamente por WhatsApp.");
        } finally {
            btn.innerText = originalText;
            btn.disabled = false;
        }
    });
}

// --- VISUALIZAR NOMBRE DE ARCHIVO SUBIDO ---
const fileInput = document.getElementById('fileInput');
if(fileInput) {
    fileInput.addEventListener('change', function(e) {
        const fileName = e.target.files[0] ? e.target.files[0].name : "Haz clic para seleccionar fotos";
        e.target.previousElementSibling.innerText = fileName;
        e.target.previousElementSibling.style.color = "var(--primary)";
    });
}

// --- SCROLL SUAVE PARA NAVEGACIÓN ---
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, 
                behavior: 'smooth'
            });
        }
    });
});

// --- EFECTO DE APARICIÓN AL HACER SCROLL ---
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

// --- LÓGICA DE FAQ (ACORDEÓN) ---
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentNode;
        
        // Cerrar todos los demás faq-item
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Alternar el actual
        item.classList.toggle('active');
    });
});
