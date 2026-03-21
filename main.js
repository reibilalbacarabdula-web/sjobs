# Criar arquivo JavaScript principal - main.js
main_js = ''
'/* ============================================
SOJOB - JavaScript Principal ===
  === === === === === === === === === === === === === == * /

// Verificar se DOM está carregado
document.addEventListener('DOMContentLoaded', function() {
  initNavbar();
  initMobileMenu();
  initAnimations();
  initSmoothScroll();
});

// Navbar scroll effect
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
}

// Mobile menu toggle
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navbarNav = document.querySelector('.navbar-nav');
  
  if (!mobileMenuBtn || !navbarNav) return;
  
  mobileMenuBtn.addEventListener('click', () => {
    navbarNav.classList.toggle('mobile-open');
    mobileMenuBtn.classList.toggle('active');
  });
}

// Animações de entrada
function initAnimations() {
  const animatedElements = document.querySelectorAll('.job-card, .category-card, .company-card, .testimonial-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Smooth scroll para links internos
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Função para salvar vagas (favoritos)
function toggleSaveJob(button) {
  const icon = button.querySelector('i');
  button.classList.toggle('saved');
  
  if (button.classList.contains('saved')) {
    icon.classList.remove('far');
    icon.classList.add('fas');
    showNotification('Vaga salva com sucesso!', 'success');
  } else {
    icon.classList.remove('fas');
    icon.classList.add('far');
    showNotification('Vaga removida dos favoritos', 'info');
  }
}

// Função para aplicar a vaga
function applyToJob(jobTitle, company) {
  showNotification(`Candidatura iniciada para ${jobTitle} na ${company}`, 'success');
  
  // Simular redirecionamento ou abertura de modal
  setTimeout(() => {
    console.log(`Aplicando para: ${jobTitle} na ${company}`);
  }, 500);
}

// Sistema de notificações
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
  
  // Estilos inline para a notificação
  notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#003893'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-weight: 500;
        z-index: 9999;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
  
  document.body.appendChild(notification);
  
  // Animar entrada
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remover após 3 segundos
  setTimeout(() => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Form validation helper
function validateForm(formElement) {
  const inputs = formElement.querySelectorAll('input[required], select[required], textarea[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.style.borderColor = '#ef4444';
      
      // Shake animation
      input.style.transform = 'translateX(0)';
      setTimeout(() => input.style.transform = 'translateX(-10px)', 0);
      setTimeout(() => input.style.transform = 'translateX(10px)', 100);
      setTimeout(() => input.style.transform = 'translateX(0)', 200);
    } else {
      input.style.borderColor = '';
    }
  });
  
  return isValid;
}

// Debounce helper para buscas
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

// Exportar funções para uso global
window.SoJob = {
  toggleSaveJob,
  applyToJob,
  showNotification,
  validateForm,
  debounce
};
''
'

with open('/mnt/kimi/output/sojob/js/main.js', 'w', encoding = 'utf-8'