// main.js - Menu Mobile + Acessibilidade + WhatsApp + Scroll Top
document.addEventListener("DOMContentLoaded", function () {

  // MENU MOBILE - Versão Melhorada
  const btn = document.querySelector(".mobile-menu-btn");
  const menu = document.querySelector(".mobile-menu");
  const closeBtn = document.querySelector(".close-menu-btn");
  const body = document.body;
  const overlay = document.createElement("div");
  overlay.className = "menu-overlay";
  body.appendChild(overlay);

  let isMenuOpen = false;

  function openMenu() {
    if (!menu || isMenuOpen) return;
    
    menu.classList.add("active");
    btn.classList.add("active");
    body.classList.add("menu-open");
    overlay.style.display = "block";
    btn.setAttribute("aria-expanded", "true");
    btn.setAttribute("aria-label", "Fechar menu");
    isMenuOpen = true;
    
    // Focar no primeiro link após animação
    setTimeout(() => {
      const firstLink = menu.querySelector("a");
      if (firstLink) firstLink.focus();
    }, 300);
    
    // Prevenir scroll do body
    const scrollY = window.scrollY;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
  }

  function closeMenu() {
    if (!menu || !isMenuOpen) return;
    
    menu.classList.remove("active");
    btn.classList.remove("active");
    body.classList.remove("menu-open");
    overlay.style.display = "none";
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Abrir menu");
    isMenuOpen = false;
    
    // Restaurar scroll do body
    const scrollY = body.style.top;
    body.style.position = "";
    body.style.top = "";
    body.style.width = "";
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
    
    // Focar no botão
    btn.focus();
  }

  function toggleMenu() {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (btn && menu) {
    // Atributos de acessibilidade
    btn.setAttribute("aria-label", "Abrir menu");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", "mobile-menu");
    menu.setAttribute("id", "mobile-menu");
    menu.setAttribute("aria-label", "Menu de navegação");

    // Event listeners
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleMenu();
    });

    // Botão de fechar
    if (closeBtn) {
      closeBtn.setAttribute("aria-label", "Fechar menu");
      closeBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        closeMenu();
      });
    }

    // Fechar ao clicar em link
    const menuLinks = menu.querySelectorAll("a");
    menuLinks.forEach(link => {
      link.addEventListener("click", function () {
        setTimeout(closeMenu, 100); // Pequeno delay para melhor UX
      });
    });

    // Fechar ao clicar no overlay
    overlay.addEventListener("click", closeMenu);

    // Fechar ao clicar fora do menu (backup)
    document.addEventListener("click", function (e) {
      if (isMenuOpen &&
          !menu.contains(e.target) &&
          !btn.contains(e.target) &&
          !overlay.contains(e.target)) {
        closeMenu();
      }
    });

    // Fechar com ESC
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isMenuOpen) {
        closeMenu();
      }
    });

    // Prevenir que o menu abra em telas grandes (resize)
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768 && isMenuOpen) {
        closeMenu();
      }
    });

    // Touch events para melhor suporte mobile
    let touchStartX = 0;
    let touchEndX = 0;

    menu.addEventListener("touchstart", function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    menu.addEventListener("touchend", function (e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      
      // Swipe da direita para esquerda fecha o menu
      if (diff < -swipeThreshold && isMenuOpen) {
        closeMenu();
      }
    }
  }

  // WhatsApp flutuante
  document.querySelectorAll(".whatsapp-float").forEach(el => {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      const msg = encodeURIComponent(`Olá! Vim do site (${document.title}) e gostaria de agendar ou tirar uma dúvida.`);
      window.open(`https://wa.me/5567999434907?text=${msg}`, "_blank");
    });
  });

  // Formulário contato → WhatsApp
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const nome = form.name.value.trim();
      const email = form.email.value.trim();
      const tel = form.phone.value.trim();
      const msg = form.message.value.trim();

      const texto = `*Nova mensagem do site*%0A*Nome:* ${nome}%0A*E-mail:* ${email}%0A*Tel:* ${tel}%0A*Mensagem:* ${msg}`;
      window.open(`https://wa.me/5567999434907?text=${texto}`, "_blank");

      alert("Redirecionando para o WhatsApp...");
      form.reset();
    });
  }

  // Botão voltar ao topo
  const scrollBtn = document.getElementById("scroll-top");
  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      scrollBtn.style.display = window.scrollY > 400 ? "flex" : "none";
    });
    scrollBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Animações ao rolar (mantive seu efeito suave)
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".animate").forEach(el => observer.observe(el));
});