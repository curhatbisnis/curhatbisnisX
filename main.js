/**
 * CURHAT BISNIS - Main JavaScript
 * Premium Platform for Private Business Feedback
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');
    
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Check on load

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // ACTIVE NAV LINK ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function setActiveNavLink() {
        const scrollPosition = window.scrollY + navbar.offsetHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);

    // ============================================
    // SCROLL ANIMATIONS (AOS-like)
    // ============================================
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => scrollObserver.observe(el));

    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    const backToTop = document.getElementById('backToTop');
    
    function toggleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    if (backToTop) {
        window.addEventListener('scroll', toggleBackToTop);
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // CURHAT OPTIONS HANDLING
    // ============================================
    const curhatOptions = document.getElementById('curhatOptions');
    const curhatForm = document.getElementById('curhatForm');
    const livechatInfo = document.getElementById('livechatInfo');
    const successMessageEmail = document.getElementById('successMessageEmail');
    
    const btnEmailMethod = document.getElementById('btnEmailMethod');
    const btnLiveChatMethod = document.getElementById('btnLiveChatMethod');
    const btnBackFromForm = document.getElementById('btnBackFromForm');
    const btnBackFromLiveChat = document.getElementById('btnBackFromLiveChat');
    const btnStartTawkto = document.getElementById('btnStartTawkto');
    const btnKirimLagiEmail = document.getElementById('btnKirimLagiEmail');
    
    // Show Email Form
    if (btnEmailMethod) {
        btnEmailMethod.addEventListener('click', function() {
            curhatOptions.style.display = 'none';
            curhatForm.style.display = 'block';
            curhatForm.classList.add('fade-in');
        });
    }
    
    // Show LiveChat Info
    if (btnLiveChatMethod) {
        btnLiveChatMethod.addEventListener('click', function() {
            curhatOptions.style.display = 'none';
            livechatInfo.style.display = 'block';
            livechatInfo.classList.add('fade-in');
        });
    }
    
    // Back from Email Form
    if (btnBackFromForm) {
        btnBackFromForm.addEventListener('click', function() {
            curhatForm.style.display = 'none';
            curhatOptions.style.display = 'block';
            curhatOptions.classList.add('fade-in');
        });
    }
    
    // Back from LiveChat Info
    if (btnBackFromLiveChat) {
        btnBackFromLiveChat.addEventListener('click', function() {
            livechatInfo.style.display = 'none';
            curhatOptions.style.display = 'block';
            curhatOptions.classList.add('fade-in');
        });
    }
    
    btnStartTawkto.addEventListener("click", function(e) {
   e.preventDefault(); // penting kalau tombolnya <a href="#">
   
   if (typeof Tawk_API !== "undefined") {
      Tawk_API.maximize(); // langsung buka widget chat
   }
});
    
    // Load Tawk.to function
    function loadTawkTo() {
        // Tawk.to will be loaded from the script in HTML
        // This is a fallback if user clicks before script loads
        showToast('Mohon tunggu, live chat sedang dimuat...');
    }
    
    // Kirim Lagi Email
    if (btnKirimLagiEmail) {
        btnKirimLagiEmail.addEventListener('click', function() {
            successMessageEmail.classList.remove('active');
            curhatOptions.style.display = 'block';
            curhatForm.reset();
        });
    }

    // ============================================
    // CURHAT FORM HANDLING - EMAIL
    // ============================================
    const btnSubmit = document.getElementById('btnSubmit');
    
    if (curhatForm) {
        curhatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('btnSubmit');
            submitBtn.classList.add('loading');
            
            const formData = {
                company: document.getElementById('company').value,
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                category: document.getElementById('category').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                anonymous: document.getElementById('anonymous').checked
            };
            
            // Simulate sending (2 seconds delay)
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                
                const randomTicket = 'CB-' + new Date().getFullYear() + '-' + 
                    Math.floor(100000 + Math.random() * 900000);
                
                // Send email to admin
                sendEmailToAdmin(formData, randomTicket);
                
                document.getElementById('ticketNumberEmail').textContent = randomTicket;
                curhatForm.style.display = 'none';
                successMessageEmail.classList.add('active');
                
                curhatForm.reset();
            }, 2000);
        });
    }
    
    function sendEmailToAdmin(data, ticket) {
        // Email configuration - will be sent to putriaurelia0932@gmail.com
        const emailData = {
            to: 'putriaurelia0932@gmail.com',
            subject: `[Curhat Bisnis] Keluhan Baru - ${ticket} - ${data.subject}`,
            body: `
Nomor Tiket: ${ticket}
Perusahaan: ${data.company}
Nama Pengirim: ${data.anonymous ? 'Anonim' : data.name}
Email: ${data.email}
Kategori: ${data.category}
Judul: ${data.subject}

Detail Keluhan:
${data.message}

---
Dikirim via Curhat Bisnis Platform
            `.trim()
        };
        
        // Log to console (in production, this would send actual email via backend)
        console.log('=================================');
        console.log('EMAIL KELUHAN BARU');
        console.log('=================================');
        console.log('To:', emailData.to);
        console.log('Subject:', emailData.subject);
        console.log('Body:', emailData.body);
        console.log('=================================');
        
        // Show toast notification
        showToast('Keluhan berhasil dikirim ke email admin!');
    }

    // ============================================
    // FORM INPUT ANIMATIONS
    // ============================================
    const formInputs = document.querySelectorAll('input, textarea, select');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // ============================================
    // COMPANY CARD HOVER EFFECT
    // ============================================
    const companyCards = document.querySelectorAll('.company-card');
    
    companyCards.forEach(card => {
        const btn = card.querySelector('.btn-company');
        
        card.addEventListener('mouseenter', function() {
            if (btn) {
                btn.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (btn) {
                btn.style.transform = 'scale(1)';
            }
        });
    });

    // ============================================
    // PARALLAX EFFECT FOR HERO BACKGROUND
    // ============================================
    const heroBg = document.querySelector('.hero-bg img');
    
    if (heroBg && !window.matchMedia('(pointer: coarse)').matches) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            heroBg.style.transform = `translateY(${rate}px)`;
        });
    }

    // ============================================
    // FEATURE CARDS 3D TILT EFFECT
    // ============================================
    const featureCards = document.querySelectorAll('.feature-card');
    
    if (!window.matchMedia('(pointer: coarse)').matches) {
        featureCards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }

    // ============================================
    // TOAST NOTIFICATION SYSTEM
    // ============================================
    function showToast(message) {
        // Remove existing toast
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) {
            existingToast.remove();
        }
        
        // Create new toast
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = `
            <i class="fas fa-info-circle"></i>
            <span>${message}</span>
        `;
        
        // Add toast styles
        toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: var(--gray-800);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.75rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 0.9375rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            opacity: 0;
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        // Animate in
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(0)';
        });
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(100px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ============================================
    // LAZY LOADING IMAGES
    // ============================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));

    // ============================================
    // PERFORMANCE: DEBOUNCE SCROLL EVENTS
    // ============================================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Apply debounce to scroll events
    window.addEventListener('scroll', debounce(handleNavbarScroll, 10));
    window.addEventListener('scroll', debounce(setActiveNavLink, 50));
    window.addEventListener('scroll', debounce(toggleBackToTop, 50));

    // ============================================
    // PRELOADER (Optional)
    // ============================================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // ============================================
    // KEYBOARD NAVIGATION SUPPORT
    // ============================================
    document.addEventListener('keydown', function(e) {
        // Escape key to close mobile menu
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ============================================
    // REDUCED MOTION SUPPORT
    // ============================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Disable animations
        document.documentElement.style.setProperty('--transition-fast', '0ms');
        document.documentElement.style.setProperty('--transition-base', '0ms');
        document.documentElement.style.setProperty('--transition-slow', '0ms');
    }

    console.log('🎯 Curhat Bisnis - Platform loaded successfully!');
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Format number with thousand separators
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Throttle function execution
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
