const swiper = new Swiper('.slider-wrapper', {
    loop: true,
    grabCursor: true,
    spaceBetween: 50,
    centerSlider: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    // Let's Make it Autoplay
    autoplay:{
      delay: 3000,
      disableOnInteraction: false
    },
    // Responsive
    breakpoints: {
      0:{
        slidesPerView: 1
      },
      768:{
        slidesPerView: 2
      },
      1024:{
        slidesPerView: 3
      }
    }
    
  });

  document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuIcon = document.querySelector('.menu-icon');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        
        // Update menu icon
        if (mobileMenu.classList.contains('active')) {
            menuIcon.innerHTML = `
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            `;
        } else {
            menuIcon.innerHTML = `
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
            `;
        }
    });

    // Mobile dropdowns
    const mobileDropdownBtns = document.querySelectorAll('.mobile-dropdown-btn');

    mobileDropdownBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const dropdown = btn.nextElementSibling;
            const chevron = btn.querySelector('.chevron-down');
            
            // Close other dropdowns
            mobileDropdownBtns.forEach(otherBtn => {
                if (otherBtn !== btn) {
                    const otherDropdown = otherBtn.nextElementSibling;
                    const otherChevron = otherBtn.querySelector('.chevron-down');
                    otherDropdown.classList.remove('active');
                    otherChevron.style.transform = 'rotate(0deg)';
                }
            });

            // Toggle current dropdown
            dropdown.classList.toggle('active');
            chevron.style.transform = dropdown.classList.contains('active') 
                ? 'rotate(180deg)' 
                : 'rotate(0deg)';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.mobile-menu') && 
            !e.target.closest('.mobile-menu-btn') && 
            mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            menuIcon.innerHTML = `
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
            `;
        }
    });
});