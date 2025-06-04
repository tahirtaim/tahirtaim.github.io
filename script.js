// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader-wrapper');
        setTimeout(function() {
            loader.style.opacity = '0';
            setTimeout(function() {
                loader.style.display = 'none';
                // Start initial animations once preloader is gone
                startInitialAnimations();
            }, 500);
        }, 1000);
    });

    // Initial animations function
    function startInitialAnimations() {
        // Animate progress bars
        setTimeout(animateProgressBars, 1000);
        // Animate counters if about section is visible
        if (isInViewport(document.querySelector('.about-stats'))) {
            animateCounters();
        }
    }

    // Check if element is in viewport
    function isInViewport(element) {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Navigation scroll effect
    const nav = document.querySelector('nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle with animation
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('show');
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close mobile menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('show');
            const icon = menuToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });

    // Active link based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Project filtering with improved animations
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    // Set initial opacity and transform for all projects
    projects.forEach(project => {
        project.style.opacity = '1';
        project.style.transform = 'translateY(0)';
        project.style.transition = 'opacity 0.3s ease, transform 0.3s ease, display 0.3s ease';
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // First, fade out all projects
            projects.forEach(project => {
                project.style.opacity = '0';
                project.style.transform = 'translateY(20px)';
            });
            
            // After a short delay, show the filtered projects
            setTimeout(() => {
                projects.forEach(project => {
                    if (filter === 'all') {
                        project.style.display = 'block';
                        setTimeout(() => {
                            project.style.opacity = '1';
                            project.style.transform = 'translateY(0)';
                        }, 50);
                    } else if (project.getAttribute('data-category') === filter) {
                        project.style.display = 'block';
                        setTimeout(() => {
                            project.style.opacity = '1';
                            project.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        project.style.display = 'none';
                    }
                });
            }, 300);
        });
    });

    // Skill progress bars
    const progressBars = document.querySelectorAll('.progress-bar');
    
    function animateProgressBars() {
        progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    }

    // Number counter animation
    const counters = document.querySelectorAll('.count-up');
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 100;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 50);
            } else {
                counter.innerText = target;
            }
        });
    }

    // Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Since GitHub Pages doesn't process server-side code, 
            // for a real implementation, you'd want to use a form service
            // like FormSpree, Netlify Forms, or a custom backend
            console.log({name, email, subject, message});
            
            // Show success message
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Show a success message
                alert('Thank you for your message! I will get back to you soon.');
            }, 2000);
        });
    }

    // Improved Intersection Observer for animations
    const animateElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a small delay to stagger animations
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    
                    if (entry.target.classList.contains('slide-in-left')) {
                        entry.target.style.transform = 'translateX(0)';
                    } else if (entry.target.classList.contains('slide-in-right')) {
                        entry.target.style.transform = 'translateX(0)';
                    } else {
                        entry.target.style.transform = 'translateY(0)';
                    }
                    
                    // If this is a skill section, animate the progress bars
                    if (entry.target.closest('.skills')) {
                        animateProgressBars();
                    }
                    
                    // If this is the about section, animate the counters
                    if (entry.target.closest('.about-stats')) {
                        animateCounters();
                    }
                    
                    observer.unobserve(entry.target);
                }, Math.random() * 200); // Random delay up to 200ms for staggered effect
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Typed.js-like effect (custom implementation)
    const typeEffect = (element, text, speed = 100) => {
        let i = 0;
        const typing = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, speed);
    };

    // Custom cursor (for desktop only)
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    
    if (!isMobile) {
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', e => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });

        // Add hover effect to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('expanded');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('expanded');
            });
        });
    }

    // Initial animations
    setTimeout(animateProgressBars, 1500);
});
