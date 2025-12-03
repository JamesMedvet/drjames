// Menu Mobile + Funcionalidades
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const body = document.body;

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      const isOpen = !body.classList.contains('menu-open');
      body.classList.toggle('menu-open', isOpen);
      mobileMenu.classList.toggle('active', isOpen);
      mobileMenuBtn.classList.toggle('active', isOpen);
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);

      if (isOpen) {
        const firstLink = mobileMenu.querySelector('a');
        firstLink && firstLink.focus();
      }
    });

    // Fechar ao clicar em link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        body.classList.remove('menu-open');
        mobileMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Fechar ao clicar no overlay
    body.addEventListener('click', function(e) {
      if (body.classList.contains('menu-open') && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        body.classList.remove('menu-open');
        mobileMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Fechar com ESC
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && body.classList.contains('menu-open')) {
        body.classList.remove('menu-open');
        mobileMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.focus();
      }
    });
  }

  // Animações ao scroll
  const animateElements = document.querySelectorAll('.animate');
  function checkVisibility() {
    animateElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (elementTop < windowHeight - 50) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }
  checkVisibility();
  window.addEventListener('scroll', checkVisibility);

  // WhatsApp Float
  document.addEventListener('click', function (e) {
    const target = e.target.closest('.whatsapp-float');
    if (target) {
      e.preventDefault();
      const defaultMessage = `Olá! Vim do site (${document.title}) e gostaria de mais informações.`;
      const encoded = encodeURIComponent(defaultMessage);
      window.open(`https://wa.me/5567999434907?text=${encoded}`, '_blank', 'noopener,noreferrer');
    }
  });

  // Formulário Contato → WhatsApp
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const message = document.getElementById('message').value;
      const whatsappMessage = `*Nova mensagem do site*\n*Nome:* ${name}\n*Email:* ${email}\n*Telefone:* ${phone}\n*Mensagem:* ${message}`;
      const whatsappLink = `https://wa.me/5567999434907?text=${encodeURIComponent(whatsappMessage)}`;
      
      const formMessage = document.createElement('div');
      formMessage.style.cssText = 'color: green; margin-top: 10px; font-weight: bold;';
      formMessage.textContent = 'Redirecionando para o WhatsApp...';
      contactForm.appendChild(formMessage);
      contactForm.reset();
      
      setTimeout(() => {
        window.open(whatsappLink, '_blank');
        formMessage.remove();
      }, 1500);
    });
  }

  // Scroll Top
  const scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function() {
      scrollTopBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none';
    });
    scrollTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
