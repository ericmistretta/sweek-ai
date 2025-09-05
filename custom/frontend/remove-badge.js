// Remove any leftover character badge elements
(function() {
    function removeBadge() {
        // Remove ANY badge that shows AI Assistant or character info at the top
        const selectors = [
            '.sweek-character-badge',
            '#sweek-character-badge', 
            '[id*="sweek-character"]',
            '[class*="sweek-character-badge"]',
            // Look for the AI Assistant badge by its position and content
            'div[style*="position: fixed"][style*="top:"]',
            'div:has(> div:contains("AI Assistant"))',
            // Target by the green badge styling
            '[style*="background: linear-gradient"][style*="96ff00"]',
            '[style*="border: 2px solid"][style*="96ff00"]'
        ];
        
        selectors.forEach(selector => {
            try {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    // Check if it's the AI Assistant badge
                    if (el.textContent && (
                        el.textContent.includes('AI Assistant') || 
                        el.textContent.includes('Albert Einstein') ||
                        el.textContent.includes('Steve') ||
                        el.style.cssText && el.style.cssText.includes('fixed') && el.style.cssText.includes('top')
                    )) {
                        console.log('Removing badge element:', el);
                        el.remove();
                    }
                });
            } catch(e) {
                // Ignore selector errors
            }
        });
        
        // Remove the container
        const container = document.querySelector('.sweek-character-container, #sweek-character-container');
        if (container) {
            console.log('Removing character container:', container);
            container.remove();
        }
        
        // Remove any script tags trying to load old character scripts
        const scripts = document.querySelectorAll('script[src*="debug-character"], script[src*="force-injection"], script[src*="fix-character"], script[src*="inject-character"], script[src*="message-interceptor"]');
        scripts.forEach(script => {
            console.log('Removing old script tag:', script.src);
            script.remove();
        });
    }
    
    // Remove immediately
    removeBadge();
    
    // Remove on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', removeBadge);
    }
    
    // Keep checking for a few seconds in case it gets re-added
    let checkCount = 0;
    const checkInterval = setInterval(() => {
        removeBadge();
        checkCount++;
        if (checkCount > 20) {  // Check for 10 seconds
            clearInterval(checkInterval);
        }
    }, 500);
    
    // Also observe for any new additions
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    if (node.classList && (node.classList.contains('sweek-character-badge') || 
                        node.classList.contains('sweek-character-container'))) {
                        console.log('Removing newly added badge element');
                        node.remove();
                    }
                }
            });
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();