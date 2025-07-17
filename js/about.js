   // Hamburger menu functionality
        document.addEventListener('DOMContentLoaded', function() {
            const menuToggle = document.querySelector('#mobile-menu');
            const mainNav = document.getElementById('main-nav');
            const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
            
            // Toggle mobile menu
            menuToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                mainNav.classList.toggle('active');
                this.classList.toggle('active');
                
                // Toggle aria-expanded attribute
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded);
            });
            
            // Toggle dropdowns on mobile
            dropdownToggles.forEach(toggle => {
                toggle.addEventListener('click', function(e) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        const dropdown = this.parentElement;
                        dropdown.classList.toggle('active');
                        
                        // Close other dropdowns
                        document.querySelectorAll('.dropdown').forEach(otherDropdown => {
                            if (otherDropdown !== dropdown) {
                                otherDropdown.classList.remove('active');
                            }
                        });
                    }
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!mainNav.contains(e.target) && e.target !== menuToggle) {
                    mainNav.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    document.querySelectorAll('.dropdown').forEach(dropdown => {
                        dropdown.classList.remove('active');
                    });
                }
            });
            
            // Prevent closing when clicking inside nav
            mainNav.addEventListener('click', function(e) {
                e.stopPropagation();
            });
            
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    if (this.getAttribute('href') !== '#') {
                        e.preventDefault();
                        const target = document.querySelector(this.getAttribute('href'));
                        if (target) {
                            window.scrollTo({
                                top: target.offsetTop - 70,
                                behavior: 'smooth'
                            });
                            
                            // Close mobile menu if open
                            if (window.innerWidth <= 768) {
                                mainNav.classList.remove('active');
                                menuToggle.classList.remove('active');
                                menuToggle.setAttribute('aria-expanded', 'false');
                            }
                        }
                    }
                });
            });
            
            // Add animation class when elements come into view
            const animateOnScroll = function() {
                const elements = document.querySelectorAll('.about-image, .about-text, .section-title');
                
                elements.forEach(element => {
                    const elementPosition = element.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    
                    if (elementPosition < windowHeight - 100) {
                        element.classList.add('animated');
                    }
                });
            };
            
            // Run once on page load
            animateOnScroll();
            
            // Run on scroll
            window.addEventListener('scroll', animateOnScroll);
            
            // Accessibility improvements for dropdowns
            dropdownToggles.forEach(toggle => {
                toggle.setAttribute('aria-haspopup', 'true');
                toggle.setAttribute('aria-expanded', 'false');
                
                toggle.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.click();
                    }
                });
            });
        });
    