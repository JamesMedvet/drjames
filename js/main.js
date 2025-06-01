// Função para controlar o menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
    }
    
    // Fechar o menu ao clicar em um link
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    });
    
    // Adicionar animações aos elementos
    const animateElements = document.querySelectorAll('.animate');
    
    // Verificar se os elementos estão visíveis na tela
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
    
    // Verificar visibilidade ao carregar a página
    checkVisibility();
    
    // Verificar visibilidade ao rolar a página
    window.addEventListener('scroll', checkVisibility);
});

// Formulário de contato com integração WhatsApp
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Capturar os dados do formulário
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        // Formatar a mensagem para WhatsApp
        const whatsappMessage = `*Nova mensagem do site Nome:* ${name}%0A*Email:* ${email}%0A*Telefone:* ${phone}%0A*Mensagem:* ${message}`;
        
        // Seu número de WhatsApp (com código do país, sem símbolos)
        // Substitua 5599999999999 pelo seu número real
        const whatsappNumber = "5567999434907";
        
        // Criar o link do WhatsApp
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
        
        // Mostrar mensagem de sucesso
        const formMessage = document.createElement('div' );
        formMessage.className = 'form-message success';
        formMessage.textContent = 'Redirecionando para o WhatsApp...';
        
        contactForm.appendChild(formMessage);
        contactForm.reset();
        
        // Redirecionar para o WhatsApp após um breve delay
        setTimeout(() => {
            window.open(whatsappLink, '_blank');
            formMessage.remove();
        }, 1500);
    });
}


// Botão de voltar ao topo
const scrollTopBtn = document.getElementById('scroll-top');
if (scrollTopBtn) {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
