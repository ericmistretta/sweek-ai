// Aggressively remove AI Assistant badge
(function() {
    console.log('Remove badge script loaded');
    
    function removeBadge() {
        // Find all fixed position elements that might be the badge
        const allElements = document.querySelectorAll('*');
        
        allElements.forEach(el => {
            // Check computed styles
            const styles = window.getComputedStyle(el);
            
            // Is it fixed position at the top?
            if (styles.position === 'fixed' && 
                (parseInt(styles.top) < 100 || styles.top === 'auto')) {
                
                // Does it contain AI/character text?
                const text = el.textContent || '';
                if (text.includes('AI Assistant') || 
                    text.includes('Albert Einstein') ||
                    text.includes('Steve') ||
                    text.includes('Character') ||
                    (el.querySelector && el.querySelector('img[alt*="AI"], img[alt*="Assistant"], svg'))) {
                    
                    console.log('Found and removing badge:', el, text);
                    el.style.display = 'none';
                    el.remove();
                }
            }
            
            // Also check for specific class patterns
            const className = el.className || '';
            if (typeof className === 'string' && 
                (className.includes('character') || 
                 className.includes('badge') ||
                 className.includes('assistant'))) {
                
                if (styles.position === 'fixed') {
                    console.log('Removing by class:', className);
                    el.remove();
                }
            }
        });
    }
    
    // Run immediately and repeatedly
    removeBadge();
    
    // Run after DOM ready
    if (document.readyState !== 'loading') {
        removeBadge();
    } else {
        document.addEventListener('DOMContentLoaded', removeBadge);
    }
    
    // Keep checking every 500ms for 10 seconds
    let count = 0;
    const interval = setInterval(() => {
        removeBadge();
        count++;
        if (count > 20) clearInterval(interval);
    }, 500);
    
    // Watch for new elements
    const observer = new MutationObserver(() => {
        removeBadge();
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
    });
})();