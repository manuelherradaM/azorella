// Seleccionar la navbar
const navbar = document.querySelector('.navbar-custom');

// Agregar un evento de scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Agregar el manejo del formulario
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = this;
    const submitButton = form.querySelector('button[type="submit"]');
    const messageDiv = document.getElementById('formMessage');
    const messageAlert = messageDiv.querySelector('.alert');
    
    // Deshabilitar el botón mientras se envía
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';
    
    try {
        const formData = new FormData(form);
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Mostrar mensaje de éxito
            messageAlert.className = 'alert alert-success';
            messageAlert.textContent = '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.';
            form.reset(); // Limpiar el formulario
        } else {
            // Mostrar mensaje de error
            messageAlert.className = 'alert alert-danger';
            messageAlert.textContent = 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.';
        }
    } catch (error) {
        // Mostrar mensaje de error en caso de fallo
        messageAlert.className = 'alert alert-danger';
        messageAlert.textContent = 'Error de conexión. Por favor, verifica tu conexión a internet e intenta nuevamente.';
    } finally {
        // Restaurar el botón y mostrar el mensaje
        submitButton.disabled = false;
        submitButton.innerHTML = 'Enviar Mensaje';
        messageDiv.style.display = 'block';
        
        // Hacer scroll suave hasta el mensaje
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Ocultar el mensaje después de 5 segundos si fue exitoso
        if (messageAlert.classList.contains('alert-success')) {
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        }
    }
});

// Agregar al inicio de tu scripts.js
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    const videoIframe = document.querySelector('.video-container iframe');
    
    // Función para ocultar el loader
    function hideLoader() {
        loader.classList.add('loader-hidden');
        setTimeout(function() {
            loader.style.display = 'none';
        }, 500);
    }

    // Escuchar cuando el video esté listo
    videoIframe.addEventListener('load', hideLoader);
    
    // Backup por si algo falla (máximo 4 segundos)
    setTimeout(hideLoader, 4000);
});
