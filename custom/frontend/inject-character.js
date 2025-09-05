// SweekAI Minimal Character Tab Implementation
(function() {
    console.log('[SweekAI] Character tab integration loaded (minimal version)');
    
    let currentTab = 'all';
    
    // List of models to show in Characters tab
    const characterModels = [
        'einstein',
        'steve-minecraft',
        'sweek-2-lite',
        'sweek-3-pro',
        'sweek-4-super'
    ];
    
    // Function to rename Local tab to Characters
    function renameLocalTab() {
        const elements = document.querySelectorAll('button, div, span');
        
        elements.forEach(elem => {
            if (elem.textContent === 'Local' && !elem.hasAttribute('data-renamed')) {
                elem.textContent = 'Characters';
                elem.setAttribute('data-renamed', 'true');
                
                // Add click listener
                elem.addEventListener('click', () => {
                    currentTab = 'characters';
                    setTimeout(filterCharacterModels, 100);
                });
                
                // Find All tab and add listener
                const parent = elem.parentElement;
                if (parent) {
                    const allTab = Array.from(parent.children).find(child => 
                        child.textContent === 'All'
                    );
                    if (allTab && !allTab.hasAttribute('data-listener')) {
                        allTab.setAttribute('data-listener', 'true');
                        allTab.addEventListener('click', () => {
                            currentTab = 'all';
                            setTimeout(showAllModels, 100);
                        });
                    }
                }
            }
        });
    }
    
    // Function to filter models in Characters tab
    function filterCharacterModels() {
        if (currentTab !== 'characters') return;
        
        const modelItems = document.querySelectorAll('div');
        
        modelItems.forEach(item => {
            const text = item.textContent || '';
            
            // Check if this is a model item
            if ((text.includes(':latest') || text.includes('B')) && 
                (text.includes('sweek') || text.includes('llama') || 
                 text.includes('einstein') || text.includes('steve') || 
                 text.includes('codellama'))) {
                
                // Check if it's a character model
                let isCharacter = false;
                for (const charModel of characterModels) {
                    if (text.toLowerCase().includes(charModel)) {
                        isCharacter = true;
                        break;
                    }
                }
                
                // Show/hide based on filter
                if (!isCharacter) {
                    item.style.display = 'none';
                    item.setAttribute('data-hidden', 'true');
                } else {
                    item.style.display = '';
                    item.removeAttribute('data-hidden');
                    cleanupModelName(item);
                    
                    // Remove any green dots that might be incorrectly shown
                    // The actual selected model indicator should be managed by OpenWebUI
                    const dots = item.querySelectorAll('.animate-pulse, [style*="background"][style*="green"]');
                    dots.forEach(dot => {
                        // Hide dots that look like selection indicators but aren't the actual selection
                        if (dot.style.background && dot.style.background.includes('150, 255, 0')) {
                            dot.style.display = 'none';
                        }
                    });
                }
            }
        });
    }
    
    // Function to show all models
    function showAllModels() {
        const hiddenModels = document.querySelectorAll('[data-hidden]');
        hiddenModels.forEach(item => {
            item.style.display = '';
            item.removeAttribute('data-hidden');
            cleanupModelName(item);
        });
    }
    
    // Function to clean up model names
    function cleanupModelName(element) {
        if (element.hasAttribute('data-cleaned')) return;
        
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        let node;
        while (node = walker.nextNode()) {
            if (node.nodeValue && node.nodeValue.includes(':latest')) {
                let text = node.nodeValue.replace(':latest', '');
                
                // Format names properly
                text = text.replace(/einstein/i, 'Einstein');
                text = text.replace(/steve-minecraft/i, 'Steve (Minecraft)');
                text = text.replace(/sweek-2-lite/i, 'Sweek-2 Lite');
                text = text.replace(/sweek-3-pro/i, 'Sweek-3 Pro');
                text = text.replace(/sweek-4-super/i, 'Sweek-4 Super');
                text = text.replace(/codellama:13b/i, 'CodeLlama 13B');
                text = text.replace(/llama3\.1:8b/i, 'Llama 3.1 8B');
                
                node.nodeValue = text;
            }
        }
        
        element.setAttribute('data-cleaned', 'true');
    }
    
    // Function to check active tab
    function checkActiveTab() {
        const tabs = document.querySelectorAll('button, div');
        tabs.forEach(tab => {
            if (tab.textContent === 'Characters' || tab.textContent === 'All') {
                const isActive = 
                    tab.classList.toString().includes('active') ||
                    tab.classList.toString().includes('selected') ||
                    tab.getAttribute('aria-selected') === 'true';
                
                if (isActive) {
                    if (tab.textContent === 'Characters') {
                        currentTab = 'characters';
                        filterCharacterModels();
                    } else if (tab.textContent === 'All') {
                        currentTab = 'all';
                        showAllModels();
                    }
                }
            }
        });
    }
    
    // Initialize
    function init() {
        console.log('[SweekAI] Initializing character tab');
        
        renameLocalTab();
        checkActiveTab();
        
        // Listen for clicks
        document.addEventListener('click', () => {
            setTimeout(() => {
                renameLocalTab();
                checkActiveTab();
            }, 100);
        });
        
        // Initial checks for 5 seconds
        let checks = 0;
        const interval = setInterval(() => {
            renameLocalTab();
            checks++;
            if (checks > 10) clearInterval(interval);
        }, 500);
        
        // Watch for DOM changes
        const observer = new MutationObserver(() => {
            renameLocalTab();
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // Start
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();