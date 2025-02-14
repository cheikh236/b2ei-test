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


