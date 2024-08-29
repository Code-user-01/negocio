document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.createElement('div');
    const navLinks = document.querySelector('nav').cloneNode(true); // Clona el menú de navegación existente
    const socialIcons = document.querySelector('.social-icons').cloneNode(true); // Clona las redes sociales

    // Clona el contenedor de banderas
    const languageToggle = document.querySelector('#language-toggle').cloneNode(true);

    // Crea el contenedor para la imagen de perfil
    const profilePicture = document.createElement('div');
    profilePicture.classList.add('profile-picture');
    const profileImg = document.createElement('img');
    profileImg.src = 'images/logo2.jpg'; // Ruta de la imagen del perfil
    profileImg.alt = 'Perfil';
    profilePicture.appendChild(profileImg);

    // Configura el nuevo contenedor de navegación móvil
    mobileNav.id = 'mobile-nav';
    mobileNav.classList.add('mobile-nav-hidden'); // Inicialmente oculto usando una clase
    mobileNav.appendChild(profilePicture); // Añade la imagen de perfil al menú móvil
    mobileNav.appendChild(languageToggle); // Añade el contenedor de banderas al menú móvil
    mobileNav.appendChild(navLinks);
    mobileNav.appendChild(socialIcons);
    document.body.appendChild(mobileNav);

    // Función para mostrar/ocultar el menú de navegación móvil
    function toggleNav() {
        mobileNav.classList.toggle('mobile-nav-visible');
        mobileNav.classList.toggle('mobile-nav-hidden');

        if (mobileNav.classList.contains('mobile-nav-visible')) {
            hamburger.textContent = '✖'; // Cambia el icono a una "X"
        } else {
            hamburger.textContent = '☰'; // Cambia el icono de nuevo a la hamburguesa
        }
    }

    // Función para cerrar el menú
    function closeNav() {
        if (mobileNav.classList.contains('mobile-nav-visible')) {
            toggleNav();
        }
    }

    // Añade el evento de clic al botón de hamburguesa
    hamburger.addEventListener('click', toggleNav);

    // Cierra el menú si se hace clic en un enlace
    mobileNav.addEventListener('click', function (event) {
        if (event.target.tagName === 'A') {
            closeNav(); // Usa la función closeNav para cerrar el menú
        }
    });

    // Cierra el menú si se hace clic fuera de él
    document.addEventListener('click', function (event) {
        if (!mobileNav.contains(event.target) && !hamburger.contains(event.target)) {
            closeNav(); // Cierra el menú si haces clic fuera
        }
    });

    // Manejadores para el cambio de idioma
    const languageButtons = document.querySelectorAll('.flag-btn');

    // Función para cargar y aplicar traducciones
    function loadTranslations(language) {
        fetch('translations.json')
            .then(response => response.json())
            .then(translations => {
                applyTranslations(translations[language]);
            })
            .catch(error => console.error('Error cargando las traducciones:', error));
    }

    // Función para aplicar las traducciones al DOM
    function applyTranslations(translations) {
        // Header
        document.querySelector('nav a[href="#inicio"]').textContent = translations.header.inicio;
        document.querySelector('nav a[href="#nosotros"]').textContent = translations.header.nosotros;
        document.querySelector('nav a[href="#renta"]').textContent = translations.header.renta;
        document.querySelector('nav a[href="#accesorios"]').textContent = translations.header.accesorios;
        document.querySelector('nav a[href="#taller"]').textContent = translations.header.taller;

        // Mobile Nav
        const mobileNavLinks = document.querySelectorAll('#mobile-nav a');
        if (mobileNavLinks.length > 0) {
            mobileNavLinks[0].textContent = translations.header.inicio;
            mobileNavLinks[1].textContent = translations.header.nosotros;
            mobileNavLinks[2].textContent = translations.header.renta;
            mobileNavLinks[3].textContent = translations.header.accesorios;
            mobileNavLinks[4].textContent = translations.header.taller;
        }

        // Actualizar el contenido de las secciones
        document.querySelector('#inicio h1').textContent = translations.inicio.titulo;
        document.querySelector('#inicio p').innerHTML = translations.inicio.subtitulo; // Usa innerHTML para respetar los <br>

        document.querySelector('#nosotros h2').textContent = translations.nosotros.titulo;
        document.querySelector('#nosotros p').innerHTML = translations.nosotros.descripcion; // Usa innerHTML para respetar los <br>

        document.querySelectorAll('.descuento-content h2').forEach((element) => {
            element.textContent = translations.descuento.titulo;
        });
        document.querySelectorAll('.descuento-content p').forEach((element) => {
            element.textContent = translations.descuento.descripcion;
        });

        document.querySelector('#renta h2').textContent = translations.renta.titulo;
        document.querySelector('#renta h3').textContent = translations.renta.planes;

        const rentalPrices = document.querySelectorAll('.price-card');
        rentalPrices[0].querySelector('h3').textContent = translations.renta.scoopy.nombre;
        rentalPrices[0].querySelectorAll('p')[0].textContent = translations.renta.scoopy.dia;
        rentalPrices[0].querySelectorAll('p')[1].textContent = translations.renta.scoopy.semana;
        rentalPrices[0].querySelectorAll('p')[2].textContent = translations.renta.scoopy.mes;

        rentalPrices[1].querySelector('h3').textContent = translations.renta.click125.nombre;
        rentalPrices[1].querySelectorAll('p')[0].textContent = translations.renta.click125.dia;
        rentalPrices[1].querySelectorAll('p')[1].textContent = translations.renta.click125.semana;
        rentalPrices[1].querySelectorAll('p')[2].textContent = translations.renta.click125.mes;

        // Sección Taller
        document.querySelector('#taller h2').textContent = translations.taller.titulo;
        document.querySelector('#taller p').textContent = translations.taller.descripcion;

        // Sección Reseñas
        document.querySelector('.reviews h3').textContent = translations.reseñas.titulo;
        document.querySelector('.reviews p').textContent = translations.reseñas.rating;
        document.querySelector('.reviews p:nth-of-type(2)').textContent = translations.reseñas.total_reseñas;
        document.querySelector('.reviews h3:nth-of-type(2)').textContent = translations.reseñas.reseñas_usuarios;

        const reviews = document.querySelectorAll('.review');
        translations.reseñas.reseñas.forEach((review, index) => {
            if (reviews[index]) {
                reviews[index].querySelector('h4').innerHTML = `${review.nombre} <span>${review.rating}</span>`;
                reviews[index].querySelector('p').textContent = review.comentario;
            }
        });

        // Footer
        const footer = document.querySelector('footer');
        footer.querySelector('#privacy-policy').textContent = translations.footer.privacidad;
        footer.querySelector('#terms-conditions').textContent = translations.footer.terminos;
        footer.querySelector('#contact-info').textContent = translations.footer.contacto;
    }

    // Añade eventos de clic a los botones de banderas
    languageButtons.forEach(button => {
        button.addEventListener('click', function () {
            const selectedLanguage = this.getAttribute('data-lang');
            loadTranslations(selectedLanguage);
        });
    });

    // Cargar traducción inicial (por ejemplo, en español)
    loadTranslations('es');
});


/********************************************************************/
document.addEventListener('DOMContentLoaded', function () {
    let currentIndex = 0;
    const slides = document.querySelector('#inicio-slider .slides');
    const totalSlides = document.querySelectorAll('#inicio-slider .slide').length;

    function moveToNextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Cambia de imagen automáticamente cada 3 segundos
    setInterval(moveToNextSlide, 3000);
});

/************************************************************/

document.addEventListener('DOMContentLoaded', function () {
    const nosotrosSection = document.getElementById('nosotros');
    const slides = document.querySelectorAll('.nosotros-slider .slide');
    let currentIndex = 0;

    // Función para cambiar de imagen automáticamente
    function changeSlide() {
        slides[currentIndex].style.display = 'none'; // Oculta la imagen actual
        currentIndex = (currentIndex + 1) % slides.length; // Calcula el índice de la siguiente imagen
        slides[currentIndex].style.display = 'block'; // Muestra la siguiente imagen
    }

    // Configura el cambio automático de imágenes cada 3 segundos
    setInterval(changeSlide, 3000);

    // Inicializa la primera imagen visible
    slides.forEach((slide, index) => {
        slide.style.display = index === 0 ? 'block' : 'none';
    });

    function handleScroll() {
        const sectionTop = nosotrosSection.getBoundingClientRect().top;
        const triggerHeight = window.innerHeight / 1.3;

        if (sectionTop < triggerHeight) {
            nosotrosSection.style.opacity = '1';
            nosotrosSection.style.transform = 'translateX(0)';
            window.removeEventListener('scroll', handleScroll);
        }
    }

    window.addEventListener('scroll', handleScroll);
});
document.addEventListener('DOMContentLoaded', function () {
    const scrollTopButton = document.getElementById('scrollTopButton');

    // Mostrar el botón cuando el usuario hace scroll hacia abajo
    window.addEventListener('scroll', function () {
        if (window.scrollY > 200) { // Mostrar después de 200px de scroll
            scrollTopButton.style.display = 'flex';
        } else {
            scrollTopButton.style.display = 'none';
        }
    });

    // Añadir evento de clic para hacer scroll hacia arriba
    scrollTopButton.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
/****************************************************************/

document.addEventListener('DOMContentLoaded', function () {
    // Código existente

    // Función para ocultar el preloader después de 2 segundos
    window.onload = function () {
        setTimeout(function () {
            const preloader = document.getElementById('preloader');
            preloader.classList.add('fade-out'); // Añade la clase para desvanecer el preloader
        }, 2000); // Tiempo de espera de 2 segundos
    };
});


/************************************seguridad*****/
// Desactivar el clic derecho en la página
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

// Desactivar la selección de texto
document.addEventListener('selectstart', function (e) {
    e.preventDefault();
});

// Desactivar la combinación de teclas para descargar
document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && (e.key === 'u' || e.key === 's' || e.key === 'a')) {
        e.preventDefault();
    }
});

// Deshabilitar la función de impresión
window.onbeforeprint = function () {
    alert('La impresión de esta página está deshabilitada.');
    return false;
};
// Deshabilitar copiar, cortar y pegar
document.addEventListener('copy', function (e) {
    e.preventDefault();
    alert('Copiar contenido está deshabilitado en esta página.');
});

document.addEventListener('cut', function (e) {
    e.preventDefault();
    alert('Cortar contenido está deshabilitado en esta página.');
});

document.addEventListener('paste', function (e) {
    e.preventDefault();
    alert('Pegar contenido está deshabilitado en esta página.');
});
// Desactivar teclas F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, y Ctrl+S
document.addEventListener('keydown', function (e) {
    if (e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        (e.ctrlKey && (e.key === 'U' || e.key === 'S'))) {
        e.preventDefault();
        alert('La inspección de elementos está deshabilitada en esta página.');
    }
});


// Añadir texto al copiar contenido
document.addEventListener('copy', function (e) {
    const selectedText = window.getSelection().toString();
    const additionalText = '\n\nContenido copiado de Taopoon Motorbike Rental';
    e.clipboardData.setData('text/plain', selectedText + additionalText);
    e.preventDefault();
});
