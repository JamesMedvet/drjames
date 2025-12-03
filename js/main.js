// Menu Mobile + Funcionalidades
document.addEventListener('DOMContentLoaded', function () {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.overlay');
  const body = document.body;

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = !body.classList.contains('menu-open');
      body.classList.toggle('menu-open', isOpen);
      mobileMenu.classList.toggle('active', isOpen);
      mobileMenuBtn.classList.toggle('active', isOpen);
      mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));

      if (overlay) {
        overlay.classList.toggle('active', isOpen);
      }

      if (isOpen) {
        const firstLink = mobileMenu.querySelector('a');
        if (firstLink) {
          firstLink.focus();
        }
      }
    });

    // Fechar ao clicar em um link do menu
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function () {
        body.classList.remove('menu-open');
        mobileMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        if (overlay) overlay.classList.remove('active');
      });
    });

    // Fechar ao clicar no overlay ou fora do menu
    const closeMenu = () => {
      body.classList.remove('menu-open');
      mobileMenu.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      if (overlay) overlay.classList.remove('active');
    };

    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }

    // Fechar com ESC
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && body.classList.contains('menu-open')) {
        closeMenu();
        mobileMenuBtn.focus();
      }
    });
  }

  // Animações ao scroll (fade up)
  const animateElements = document.querySelectorAll('.animate');
  if (animateElements.length > 0) {
    const checkVisibility = () => {
      animateElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 50) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });
    };

    // Executa na carga e no scroll
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);
  }

  // Botão WhatsApp Flutuante
  const whatsappFloat = document.querySelector('.whatsapp-float');
  if (whatsappFloat) {
    whatsappFloat.addEventListener('click', function (e) {
      e.preventDefault();
      const defaultMessage = `Olá Dr. James! Vim do seu site e gostaria de agendar uma consulta veterinária domiciliar. Pode me ajudar?`;
      const encodedMessage = encodeURIComponent(defaultMessage);
      window.open(`https://wa.me/5567999434907?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
    });
  }

  // Formulário de Contato → Enviar via WhatsApp
  const contactForm = document.getElementById('contact-form');
  const successMessage = document.getElementById('success-message');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const btn = contactForm.querySelector('.submit-btn');
      const name = document.getElementById('name')?.value || '';
      const email = document.getElementById('email')?.value || '';
      const phone = document.getElementById('phone')?.value || '';
      const pet = document.getElementById('pet')?.value || '';
      const message = document.getElementById('message')?.value || '';

      // Validação simples (já existe no HTML com `required`, mas reforçamos)
      if (!name || !email || !phone || !message) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }

      // Monta mensagem formatada
      let whatsappMessage = `*Nova Solicitação de Consulta Domiciliar*\n\n`;
      whatsappMessage += `*Nome:* ${name}\n`;
      whatsappMessage += `*E-mail:* ${email}\n`;
      whatsappMessage += `*Telefone:* ${phone}\n`;
      if (pet) whatsappMessage += `*Pet:* ${pet}\n`;
      whatsappMessage += `*Mensagem:* ${message}`;

      const encoded = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://wa.me/5567999434907?text=${encoded}`;

      // Estado de loading
      btn.classList.add('loading');
      btn.querySelector('span').textContent = 'Enviando...';

      // Simula envio e abre WhatsApp
      setTimeout(() => {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

        // Reset
        contactForm.reset();
        btn.classList.remove('loading');
        btn.querySelector('span').textContent = 'Enviar Mensagem';

        // Mensagem de sucesso
        if (successMessage) {
          successMessage.classList.add('show');
          setTimeout(() => {
            successMessage.classList.remove('show');
          }, 5000);
        }
      }, 1000);
    });
  }

  // Botão "Voltar ao Topo"
  const scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    const toggleScrollTop = () => {
      scrollTopBtn.style.display = window.pageYOffset > 400 ? 'block' : 'none';
    };

    window.addEventListener('scroll', toggleScrollTop);
    toggleScrollTop();

    scrollTopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});