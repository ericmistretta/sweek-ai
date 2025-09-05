// Add "More Characters" link to model dropdown - Enhanced Version
(function() {
    console.log('Add Characters Link v2 loaded');
    let addedLink = false;

    function addMoreCharactersLink() {
        if (addedLink) return;
        
        // Multiple strategies to find the dropdown
        const selectors = [
            '[role="listbox"]',
            '.dropdown-menu',
            '.menu',
            '[class*="menu"]',
            '[class*="dropdown"]',
            '[class*="select"]',
            'ul[class*="model"]',
            'div[class*="model"]',
            // OpenWebUI specific
            '.overflow-y-auto',
            '[class*="scrollbar"]',
            '.absolute.z-50',
            '.absolute.left-0.right-0',
            // Try to find by content
            'div:has(> div:contains("sweek"))',
            'div:has(> button:contains("sweek"))',
        ];
        
        let foundDropdown = null;
        
        for (const selector of selectors) {
            try {
                const elements = document.querySelectorAll(selector);
                for (const el of elements) {
                    // Check if this contains model names
                    const text = el.textContent || '';
                    if ((text.includes('einstein') || 
                         text.includes('steve-minecraft') ||
                         text.includes('sweek') ||
                         text.includes('llama') ||
                         text.includes('codellama')) &&
                        !text.includes('More Characters')) {
                        
                        console.log('Found potential model dropdown:', el);
                        foundDropdown = el;
                        break;
                    }
                }
                if (foundDropdown) break;
            } catch(e) {
                // Ignore selector errors
            }
        }
        
        if (foundDropdown && !foundDropdown.querySelector('.more-characters-link')) {
            console.log('Adding More Characters link to dropdown');
            
            // Create a container div
            const container = document.createElement('div');
            container.style.cssText = `
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                margin-top: 8px;
                padding-top: 8px;
            `;
            
            // Create the link
            const link = document.createElement('a');
            link.className = 'more-characters-link';
            link.href = '/backend/open_webui/static/custom/frontend/character-gallery/';
            link.target = '_blank';
            link.innerHTML = `
                <div style="
                    display: flex;
                    align-items: center;
                    padding: 8px 12px;
                    color: #96ff00;
                    font-weight: 500;
                    cursor: pointer;
                    border-radius: 6px;
                    transition: background 0.2s;
                    text-decoration: none;
                " onmouseover="this.style.background='rgba(150, 255, 0, 0.1)'" 
                   onmouseout="this.style.background='transparent'">
                    <span style="font-size: 20px; margin-right: 8px;">🎭</span>
                    <span>More Characters</span>
                    <span style="margin-left: auto; opacity: 0.7;">→</span>
                </div>
            `;
            
            link.onclick = function(e) {
                e.preventDefault();
                window.open('/backend/open_webui/static/custom/frontend/character-gallery/', '_blank');
            };
            
            container.appendChild(link);
            foundDropdown.appendChild(container);
            addedLink = true;
            
            console.log('More Characters link added successfully');
        }
    }

    // Try different timing strategies
    function init() {
        // Try immediately
        addMoreCharactersLink();
        
        // Try on clicks (when dropdown might open)
        document.addEventListener('click', function(e) {
            setTimeout(addMoreCharactersLink, 100);
            setTimeout(addMoreCharactersLink, 300);
            setTimeout(addMoreCharactersLink, 500);
        });
        
        // Try on any DOM changes
        const observer = new MutationObserver((mutations) => {
            // Check if any mutation added elements with model names
            for (const mutation of mutations) {
                for (const node of mutation.addedNodes) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const text = node.textContent || '';
                        if (text.includes('einstein') || 
                            text.includes('steve') ||
                            text.includes('sweek') ||
                            text.includes('llama')) {
                            setTimeout(addMoreCharactersLink, 100);
                            break;
                        }
                    }
                }
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        // Also try periodically for the first 10 seconds
        let attempts = 0;
        const interval = setInterval(() => {
            addMoreCharactersLink();
            attempts++;
            if (attempts > 20) {
                clearInterval(interval);
            }
        }, 500);
    }

    // Start when ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Also expose globally for debugging
    window.addMoreCharactersLink = addMoreCharactersLink;
})();