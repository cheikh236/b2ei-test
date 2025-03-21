// Initialize Lucide icons
lucide.createIcons();

// Mobile menu functionality
const mobileMenu = document.querySelector('.mobile-menu');
const nav = document.querySelector('.nav');

mobileMenu.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    const spans = mobileMenu.querySelectorAll('span');
    spans[0].style.transform = nav.style.display === 'flex' ? 'rotate(45deg) translate(5px, 5px)' : 'none';
    spans[1].style.opacity = nav.style.display === 'flex' ? '0' : '1';
    spans[2].style.transform = nav.style.display === 'flex' ? 'rotate(-45deg) translate(5px, -5px)' : 'none';
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add fade-in animation to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-button');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Hide all content sections
        document.querySelectorAll('.content-section').forEach(section => {
          section.classList.add('hidden');
        });
        
        // Show selected content section
        const contentId = `content-${tab.dataset.tab}`;
        document.getElementById(contentId).classList.remove('hidden');
      });
    });
  });





  document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.querySelector('.mobile-menu-button3');
    const mobileMenu = document.querySelector('.mobile-menu3');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle3');
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        mobileMenu.classList.toggle('hidden');
        menuIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
    }

    mobileMenuButton.addEventListener('click', toggleMenu);

    // Gestion des dropdowns mobiles
    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            const dropdown = toggle.closest('.mobile-dropdown3');
            const dropdownMenu = dropdown.querySelector('.mobile-dropdown-menu3');
            
            // Ferme tous les autres dropdowns
            document.querySelectorAll('.mobile-dropdown3').forEach(d => {
                if (d !== dropdown) {
                    d.classList.remove('active');
                    d.querySelector('.mobile-dropdown-menu3').classList.add('hidden');
                }
            });

            // Toggle le dropdown actuel
            dropdown.classList.toggle('active');
            dropdownMenu.classList.toggle('hidden');
        });
    });

    // Fermer le menu si on clique en dehors
    document.addEventListener('click', (event) => {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnButton = mobileMenuButton.contains(event.target);

        if (isMenuOpen && !isClickInsideMenu && !isClickOnButton) {
            toggleMenu();
        }
    });

    // Fermer le menu mobile si la fenêtre est redimensionnée au-dessus de 991px
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 991 && isMenuOpen) {
            toggleMenu();
        }
    });
});



function toggleOtherService() {
    const otherServiceCheckbox = document.getElementById("autreService");
    const otherServiceInput = document.getElementById("otherServiceInput");

    // Si la case "Autres" est cochée, afficher le champ de saisie, sinon le cacher
    if (otherServiceCheckbox.checked) {
        otherServiceInput.style.display = "block";
    } else {
        otherServiceInput.style.display = "none";
        otherServiceInput.value = ""; // Réinitialise la saisie si décoché
    }
}

function toggleOtherService() {
    const otherServiceInput = document.getElementById("otherServiceInput");
    const otherServiceCheckbox = document.getElementById("autreService");
    otherServiceInput.style.display = otherServiceCheckbox.checked ? "block" : "none";
}

function sendWhatsAppMessage() {
    const phoneNumber = '221784840606';

    // Récupérer les valeurs du formulaire
    const name = document.getElementById("userName").value.trim() || "Non spécifié";
    const company = document.getElementById("companyName").value.trim() || "Non spécifié";
    const budget = document.getElementById("budget").value.trim() || "Non spécifié";

    // Récupérer les services sélectionnés
    let services = Array.from(document.querySelectorAll('.service:checked'))
                        .map(checkbox => checkbox.value);

    // Ajouter la saisie de l'utilisateur si "Autres" est coché
    const otherServiceCheckbox = document.getElementById("autreService");
    const otherServiceInput = document.getElementById("otherServiceInput").value.trim();

    if (otherServiceCheckbox.checked && otherServiceInput !== "") {
        services.push(otherServiceInput);
    }

    // Si aucun service n'est sélectionné
    const serviceText = services.length > 0 ? services.join(", ") : "Non spécifié";

    // Construire le message WhatsApp
    const message = encodeURIComponent(
        `Salut ! Je souhaite obtenir un devis.\n\n` +
        `Nom : ${name}\n` +
        `Entreprise : ${company}\n` +
        `Services souhaités : ${serviceText}\n` +
        `Budget : ${budget}\n`
    );

    // Ouvrir WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
}


class Slider {
    constructor() {
        this.currentSlide = 0;
        this.isAnimating = false;
        this.slides = document.querySelectorAll('.slide');
        this.indicatorsContainer = document.querySelector('.slide-indicators');
        
        this.init();
        this.startAutoSlide();
    }

    init() {
        // Create indicators
        this.slides.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = 'indicator';
            indicator.addEventListener('click', () => this.goToSlide(index));
            this.indicatorsContainer.appendChild(indicator);
        });

        // Show first slide
        this.updateSlide();
    }

    updateSlide() {
        // Update slides
        this.slides.forEach((slide, index) => {
            if (index === this.currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Update indicators
        const indicators = this.indicatorsContainer.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            if (index === this.currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    nextSlide() {
        if (!this.isAnimating) {
            this.isAnimating = true;
            this.currentSlide = (this.currentSlide + 1) % this.slides.length;
            this.updateSlide();
            setTimeout(() => {
                this.isAnimating = false;
            }, 500);
        }
    }

    goToSlide(index) {
        if (!this.isAnimating && index !== this.currentSlide) {
            this.isAnimating = true;
            this.currentSlide = index;
            this.updateSlide();
            setTimeout(() => {
                this.isAnimating = false;
            }, 500);
        }
    }

    startAutoSlide() {
        setInterval(() => {
            this.nextSlide();
        }, 4000);
    }
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Slider();
});

// Get the button
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
function topFunction() {
    let currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
    
    function smoothScroll() {
        if (currentPosition > 0) {
            currentPosition -= Math.max(10, currentPosition / 10); // Ralentit progressivement
            window.scrollTo(0, currentPosition);
            requestAnimationFrame(smoothScroll);
        }
    }
    smoothScroll();
}