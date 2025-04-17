document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Mobile menu toggle
  const navTrigger = document.querySelector('.nav-trigger');
  if (navTrigger) {
    navTrigger.addEventListener('change', function() {
      document.body.classList.toggle('nav-open', this.checked);
    });
  }

  // Code syntax highlighting (placeholder for integration with a library like Prism.js)
  if (typeof Prism !== 'undefined') {
    Prism.highlightAll();
  }

  // Newsletter subscription form handling
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      if (email) {
        // In a real implementation, this would send the email to a backend service
        alert('Thank you for subscribing! We\'ll send updates to ' + email);
        emailInput.value = '';
      }
    });
  }

  // Comment form handling
  const commentForm = document.querySelector('.comment-form form');
  if (commentForm) {
    commentForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const nameInput = this.querySelector('#name');
      const emailInput = this.querySelector('#email');
      const commentInput = this.querySelector('#comment');
      
      // In a real implementation, this would send the comment data to a backend service
      alert('Thanks for your comment! It will appear once approved.');
      nameInput.value = '';
      emailInput.value = '';
      commentInput.value = '';
    });
  }

  // Add current year to copyright notice
  const copyrightEl = document.querySelector('.copyright');
  if (copyrightEl) {
    const currentYear = new Date().getFullYear();
    const copyrightText = copyrightEl.innerHTML;
    copyrightEl.innerHTML = copyrightText.replace(/\d{4}/, currentYear);
  }
});