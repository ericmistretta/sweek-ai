// Add "More Characters" link to model dropdown
(function() {
    let checkInterval = null;
    let lastProcessedDropdown = null;

    function addMoreCharactersLink() {
        // Find the model dropdown list
        const dropdowns = document.querySelectorAll('[role="listbox"], .model-list, .dropdown-content, [class*="dropdown"], [class*="select"]');
        
        dropdowns.forEach(dropdown => {
            // Skip if we already processed this dropdown
            if (dropdown === lastProcessedDropdown) return;
            
            // Check if this looks like a model list (contains model names)
            const hasModels = dropdown.textContent.includes('einstein') || 
                            dropdown.textContent.includes('steve-minecraft') ||
                            dropdown.textContent.includes('sweek') ||
                            dropdown.textContent.includes('llama');
            
            if (hasModels && !dropdown.querySelector('.more-characters-link')) {
                console.log('Found model dropdown, adding More Characters link');
                
                // Create the divider
                const divider = document.createElement('div');
                divider.style.cssText = `
                    height: 1px;
                    background: rgba(255, 255, 255, 0.1);
                    margin: 8px 0;
                `;
                
                // Create the "More Characters" link
                const moreCharactersLink = document.createElement('a');
                moreCharactersLink.className = 'more-characters-link';
                moreCharactersLink.href = '/static/custom/frontend/character-gallery/';
                moreCharactersLink.target = '_blank';
                moreCharactersLink.style.cssText = `
                    display: flex;
                    align-items: center;
                    padding: 12px 16px;
                    color: #96ff00;
                    text-decoration: none;
                    font-weight: 500;
                    transition: background 0.2s;
                    cursor: pointer;
                    border-radius: 8px;
                    margin: 4px;
                `;
                
                // Add hover effect
                moreCharactersLink.onmouseenter = function() {
                    this.style.background = 'rgba(150, 255, 0, 0.1)';
                };
                moreCharactersLink.onmouseleave = function() {
                    this.style.background = 'transparent';
                };
                
                // Add icon and text
                moreCharactersLink.innerHTML = `
                    <span style="margin-right: 8px; font-size: 20px;">🎭</span>
                    <span>More Characters</span>
                    <span style="margin-left: auto; opacity: 0.7; font-size: 12px;">→</span>
                `;
                
                // Add click tracking
                moreCharactersLink.onclick = function(e) {
                    console.log('Opening character gallery');
                };
                
                // Append to dropdown
                dropdown.appendChild(divider);
                dropdown.appendChild(moreCharactersLink);
                lastProcessedDropdown = dropdown;
            }
        });
    }

    // Wait for DOM to be ready
    function init() {
        // Try to add link immediately
        addMoreCharactersLink();
        
        // Watch for dropdown opening
        document.addEventListener('click', function(e) {
            setTimeout(addMoreCharactersLink, 100);
        });
        
        // Also watch for DOM changes (when dropdown appears)
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length > 0) {
                    setTimeout(addMoreCharactersLink, 100);
                }
            });
        });
        
        // Start observing
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();