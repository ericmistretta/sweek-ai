// Sweek-AI Dynamic Branding
(function() {
  // Set dark mode as default
  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.add('dark');
  }
  
  // Update page title
  document.title = 'Sweek-AI - Chat with Character';
  
  // Replace Open WebUI text
  function replaceText(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.nodeValue.includes('Open WebUI')) {
        node.nodeValue = node.nodeValue.replace(/Open WebUI/g, 'Sweek-AI');
      }
    } else {
      for (let child of node.childNodes) {
        replaceText(child);
      }
    }
  }
  
  // Apply on load and observe changes
  document.addEventListener('DOMContentLoaded', () => {
    replaceText(document.body);
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            replaceText(node);
          }
        });
      });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
  });
})();
