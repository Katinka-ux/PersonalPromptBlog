document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuTrigger = document.querySelector('.nav-trigger');
  const menuIcon = document.querySelector('.menu-icon');
  
  if (menuTrigger && menuIcon) {
    menuIcon.addEventListener('click', function() {
      const expanded = menuTrigger.getAttribute('aria-expanded') === 'true' || false;
      menuTrigger.setAttribute('aria-expanded', !expanded);
    });
  }
  
  // Add copy button to code blocks
  const codeBlocks = document.querySelectorAll('pre code');
  if (codeBlocks.length > 0) {
    codeBlocks.forEach(function(codeBlock) {
      const pre = codeBlock.parentNode;
      const copyButton = document.createElement('button');
      copyButton.className = 'copy-code-button';
      copyButton.textContent = 'Copy';
      
      copyButton.addEventListener('click', function() {
        const code = codeBlock.textContent;
        navigator.clipboard.writeText(code).then(function() {
          copyButton.textContent = 'Copied!';
          setTimeout(function() {
            copyButton.textContent = 'Copy';
          }, 2000);
        }, function() {
          copyButton.textContent = 'Failed to copy';
        });
      });
      
      pre.insertBefore(copyButton, codeBlock);
    });
  }
  
  // Highlight current page in navigation
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(function(link) {
    const linkPath = link.getAttribute('href');
    if (currentPath === linkPath || (linkPath !== '/' && currentPath.startsWith(linkPath))) {
      link.classList.add('active');
    }
  });
});
