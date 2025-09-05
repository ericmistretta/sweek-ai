// SweekAI Character Selector Integration for Open WebUI
(function() {
    'use strict';
    
    console.log('[SweekAI] Character integration script loading...');
    
    // Configuration
    const CONFIG = {
        selectorPath: '/static/custom/character-selector/',
        checkInterval: 1000,
        maxAttempts: 30,
        debug: true
    };
    
    // Utility functions
    function log(...args) {
        if (CONFIG.debug) {
            console.log('[SweekAI Character]', ...args);
        }
    }
    
    function loadCSS(href) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
        log('CSS loaded:', href);
    }
    
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    }
    
    // Create character selector container
    function createCharacterContainer() {
        // Check if container already exists
        if (document.getElementById('sweek-character-container')) {
            return;
        }
        
        const container = document.createElement('div');
        container.id = 'sweek-character-container';
        container.innerHTML = `
            <!-- Character Badge (floating) -->
            <div id="sweek-character-badge" class="sweek-character-badge">
                <div class="badge-avatar">
                    <span id="badgeAvatar">🤖</span>
                </div>
                <div class="badge-name" id="badgeName">AI Assistant</div>
            </div>
            
            <!-- Character Selector Modal -->
            <div id="sweek-character-modal" class="sweek-character-modal" style="display: none;">
                <div class="modal-overlay"></div>
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Select Your AI Character</h2>
                        <button class="modal-close" id="modalClose">×</button>
                    </div>
                    <div class="modal-body">
                        <iframe 
                            id="characterSelectorFrame" 
                            src="${CONFIG.selectorPath}index.html"
                            style="width: 100%; height: 600px; border: none; border-radius: 8px;">
                        </iframe>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(container);
        log('Character container created');
    }
    
    // Add integration styles
    function addIntegrationStyles() {
        const styles = `
            /* Character Badge Styles */
            .sweek-character-badge {
                position: fixed;
                bottom: 20px;
                right: 20px;
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 8px 16px;
                background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
                border: 2px solid #96ff00;
                border-radius: 50px;
                cursor: pointer;
                z-index: 1000;
                transition: all 0.3s ease;
                box-shadow: 0 4px 12px rgba(150, 255, 0, 0.2);
            }
            
            .sweek-character-badge:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(150, 255, 0, 0.3);
                border-color: #00ff88;
            }
            
            .badge-avatar {
                width: 36px;
                height: 36px;
                background: linear-gradient(135deg, #96ff00, #00ff88);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
            }
            
            .badge-name {
                color: #96ff00;
                font-weight: 600;
                font-size: 14px;
            }
            
            /* Modal Styles */
            .sweek-character-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 10000;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
            }
            
            .modal-content {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 90%;
                max-width: 1200px;
                background: #0a0a0a;
                border: 2px solid #96ff00;
                border-radius: 16px;
                box-shadow: 0 20px 60px rgba(150, 255, 0, 0.3);
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px;
                border-bottom: 1px solid rgba(150, 255, 0, 0.2);
            }
            
            .modal-header h2 {
                color: #96ff00;
                font-size: 24px;
                margin: 0;
            }
            
            .modal-close {
                background: none;
                border: none;
                color: #96ff00;
                font-size: 32px;
                cursor: pointer;
                padding: 0;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.2s ease;
            }
            
            .modal-close:hover {
                background: rgba(150, 255, 0, 0.1);
                transform: rotate(90deg);
            }
            
            .modal-body {
                padding: 20px;
            }
            
            /* Chat Integration Styles */
            .sweek-character-indicator {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                padding: 4px 10px;
                background: rgba(150, 255, 0, 0.1);
                border: 1px solid rgba(150, 255, 0, 0.3);
                border-radius: 16px;
                font-size: 12px;
                color: #96ff00;
                margin-left: 8px;
            }
            
            .character-trait-pill {
                display: inline-block;
                padding: 2px 8px;
                background: rgba(150, 255, 0, 0.15);
                border-radius: 10px;
                font-size: 11px;
                color: #96ff00;
                margin: 0 2px;
            }
            
            /* Animation */
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .sweek-character-badge {
                animation: slideIn 0.5s ease;
            }
            
            /* Mobile Responsive */
            @media (max-width: 768px) {
                .sweek-character-badge {
                    bottom: 10px;
                    right: 10px;
                    padding: 6px 12px;
                }
                
                .badge-avatar {
                    width: 28px;
                    height: 28px;
                    font-size: 16px;
                }
                
                .badge-name {
                    font-size: 12px;
                }
                
                .modal-content {
                    width: 95%;
                    max-width: none;
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
        log('Integration styles added');
    }
    
    // Setup event listeners
    function setupEventListeners() {
        // Character badge click
        const badge = document.getElementById('sweek-character-badge');
        if (badge) {
            badge.addEventListener('click', () => {
                const modal = document.getElementById('sweek-character-modal');
                if (modal) {
                    modal.style.display = 'block';
                    log('Modal opened');
                }
            });
        }
        
        // Modal close button
        const closeBtn = document.getElementById('modalClose');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                const modal = document.getElementById('sweek-character-modal');
                if (modal) {
                    modal.style.display = 'none';
                    log('Modal closed');
                }
            });
        }
        
        // Modal overlay click
        const overlay = document.querySelector('.modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', () => {
                const modal = document.getElementById('sweek-character-modal');
                if (modal) {
                    modal.style.display = 'none';
                    log('Modal closed via overlay');
                }
            });
        }
        
        // Listen for character selection from iframe
        window.addEventListener('message', (event) => {
            if (event.data.type === 'character-selected') {
                const character = event.data.character;
                updateCharacterDisplay(character);
                
                // Close modal
                const modal = document.getElementById('sweek-character-modal');
                if (modal) {
                    modal.style.display = 'none';
                }
                
                // Store in localStorage
                localStorage.setItem('sweek-current-character', JSON.stringify(character));
                
                // Inject character into chat
                injectCharacterIntoChat(character);
                
                log('Character selected:', character.name);
            }
        });
    }
    
    // Update character display
    function updateCharacterDisplay(character) {
        const badgeAvatar = document.getElementById('badgeAvatar');
        const badgeName = document.getElementById('badgeName');
        
        if (badgeAvatar) {
            badgeAvatar.textContent = character.avatar;
        }
        
        if (badgeName) {
            badgeName.textContent = character.name;
        }
    }
    
    // Load saved character
    function loadSavedCharacter() {
        try {
            const saved = localStorage.getItem('sweek-current-character');
            if (saved) {
                const character = JSON.parse(saved);
                updateCharacterDisplay(character);
                log('Loaded saved character:', character.name);
                return character;
            }
        } catch (error) {
            console.error('Failed to load saved character:', error);
        }
        return null;
    }
    
    // Inject character context into chat interface
    function injectCharacterIntoChat(character) {
        // Find chat header or title area
        const chatHeader = document.querySelector('.chat-header, .conversation-header, h1, .title');
        
        if (chatHeader && !chatHeader.querySelector('.sweek-character-indicator')) {
            const indicator = document.createElement('span');
            indicator.className = 'sweek-character-indicator';
            indicator.innerHTML = `
                <span>${character.avatar}</span>
                <span>${character.name}</span>
            `;
            chatHeader.appendChild(indicator);
        }
        
        // Add character context to system prompt if possible
        injectSystemPrompt(character);
    }
    
    // Inject character personality into system prompt
    function injectSystemPrompt(character) {
        // This will be hooked into Open WebUI's message system
        // For now, we'll store it for later use
        window.sweekCharacterContext = {
            character: character,
            systemPrompt: generateSystemPrompt(character)
        };
        
        log('Character context prepared:', character.name);
    }
    
    // Generate system prompt from character
    function generateSystemPrompt(character) {
        // Use the pre-defined system prompt if available
        if (character.systemPrompt) {
            return character.systemPrompt;
        }
        
        // Fallback to generating from personality data
        let prompt = `You are ${character.name}. ${character.description}\n\n`;
        
        if (character.personality) {
            if (character.personality.quirks && character.personality.quirks.length > 0) {
                prompt += `Your personality quirks:\n`;
                character.personality.quirks.forEach(quirk => {
                    prompt += `- ${quirk}\n`;
                });
                prompt += '\n';
            }
            
            if (character.personality.catchphrases && character.personality.catchphrases.length > 0) {
                prompt += `You occasionally use these catchphrases naturally in conversation:\n`;
                character.personality.catchphrases.forEach(phrase => {
                    prompt += `- "${phrase}"\n`;
                });
                prompt += '\n';
            }
            
            if (character.personality.traits) {
                prompt += `Your personality traits:\n`;
                Object.entries(character.personality.traits).forEach(([trait, value]) => {
                    const level = value > 0.8 ? 'Very high' : 
                                 value > 0.6 ? 'High' : 
                                 value > 0.4 ? 'Moderate' : 'Low';
                    prompt += `- ${trait}: ${level}\n`;
                });
            }
        }
        
        prompt += '\nRespond in character, maintaining these personality traits throughout the conversation.';
        
        return prompt;
    }
    
    // Hook into Open WebUI's message sending
    function hookMessageSystem() {
        // Look for the send button or textarea
        const observer = new MutationObserver((mutations) => {
            const sendButton = document.querySelector('button[type="submit"], button[aria-label*="Send"], .send-button');
            const textarea = document.querySelector('textarea[placeholder*="message"], textarea[placeholder*="chat"], .chat-input');
            
            if (sendButton && !sendButton.hasAttribute('data-sweek-hooked')) {
                sendButton.setAttribute('data-sweek-hooked', 'true');
                
                const originalOnClick = sendButton.onclick;
                sendButton.onclick = function(e) {
                    // Inject character context before sending
                    if (window.sweekCharacterContext && textarea) {
                        const originalValue = textarea.value;
                        // Prepend system context (this may need adjustment based on Open WebUI's implementation)
                        log('Injecting character context into message');
                    }
                    
                    if (originalOnClick) {
                        return originalOnClick.call(this, e);
                    }
                };
                
                log('Message system hooked');
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // Load message interceptor script
    function loadMessageInterceptor() {
        const script = document.createElement('script');
        script.src = '/static/custom/message-interceptor.js';
        script.onload = () => {
            log('Message interceptor loaded successfully');
        };
        script.onerror = () => {
            console.error('[SweekAI] Failed to load message interceptor');
        };
        document.head.appendChild(script);
    }
    
    // Initialize character integration
    function initialize() {
        log('Initializing character integration...');
        
        // Add styles
        addIntegrationStyles();
        
        // Create container
        createCharacterContainer();
        
        // Setup listeners
        setupEventListeners();
        
        // Load saved character
        loadSavedCharacter();
        
        // Load message interceptor
        loadMessageInterceptor();
        
        // Hook into message system
        hookMessageSystem();
        
        log('Character integration initialized successfully');
    }
    
    // Wait for DOM to be ready
    function waitForDOM() {
        let attempts = 0;
        
        const checkDOM = setInterval(() => {
            attempts++;
            
            if (document.body && (document.readyState === 'complete' || document.readyState === 'interactive')) {
                clearInterval(checkDOM);
                initialize();
            } else if (attempts >= CONFIG.maxAttempts) {
                clearInterval(checkDOM);
                console.error('[SweekAI] Failed to initialize character integration - DOM not ready');
            }
        }, CONFIG.checkInterval);
    }
    
    // Start initialization
    waitForDOM();
    
    // Expose API for external use
    window.SweekCharacter = {
        selectCharacter: (character) => {
            updateCharacterDisplay(character);
            injectCharacterIntoChat(character);
        },
        getCurrentCharacter: () => {
            return window.sweekCharacterContext?.character || null;
        },
        openSelector: () => {
            const modal = document.getElementById('sweek-character-modal');
            if (modal) {
                modal.style.display = 'block';
            }
        },
        closeSelector: () => {
            const modal = document.getElementById('sweek-character-modal');
            if (modal) {
                modal.style.display = 'none';
            }
        }
    };
    
})();