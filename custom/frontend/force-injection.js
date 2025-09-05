// Force Character Injection for OpenWebUI
(function() {
    console.log('[SweekAI Force] Aggressive injection starting...');
    
    // Store original fetch if not already stored
    if (!window.originalFetch) {
        window.originalFetch = window.fetch;
    }
    
    // Override fetch completely
    window.fetch = async function(url, options = {}) {
        // Log ALL fetch calls for debugging
        console.log('[SweekAI Force] Fetch called:', url);
        
        // Check if this is a chat-related call
        if (typeof url === 'string' && 
            (url.includes('chat') || url.includes('completions') || url.includes('ollama'))) {
            
            console.log('[SweekAI Force] CHAT API DETECTED:', url);
            
            // Get current character
            const saved = localStorage.getItem('sweek-current-character');
            if (saved) {
                try {
                    const character = JSON.parse(saved);
                    console.log('[SweekAI Force] Character found:', character.name);
                    
                    if (options.body) {
                        let body = JSON.parse(options.body);
                        console.log('[SweekAI Force] Original messages:', body.messages);
                        
                        // Build character prompt
                        let characterPrompt = character.systemPrompt || `You are ${character.name}.`;
                        
                        // Add knowledge if available
                        if (character.knowledge) {
                            characterPrompt += '\n\nImportant facts about you:\n';
                            if (character.knowledge.birthDate) {
                                characterPrompt += `- You were born on ${character.knowledge.birthDate}\n`;
                            }
                            if (character.knowledge.birthPlace) {
                                characterPrompt += `- You were born in ${character.knowledge.birthPlace}\n`;
                            }
                            if (character.knowledge.identity) {
                                characterPrompt += `- You are ${character.knowledge.identity}\n`;
                            }
                            characterPrompt += '\nAlways respond as ' + character.name + ' in first person.';
                        }
                        
                        // Force inject at the beginning
                        if (body.messages && Array.isArray(body.messages)) {
                            // Remove any existing system messages
                            body.messages = body.messages.filter(m => m.role !== 'system');
                            
                            // Add our character prompt first
                            body.messages.unshift({
                                role: 'system',
                                content: characterPrompt
                            });
                            
                            console.log('[SweekAI Force] Injected prompt:', characterPrompt.substring(0, 100) + '...');
                            console.log('[SweekAI Force] Modified messages:', body.messages);
                        }
                        
                        options.body = JSON.stringify(body);
                    }
                } catch (e) {
                    console.error('[SweekAI Force] Injection error:', e);
                }
            } else {
                console.log('[SweekAI Force] No character selected');
            }
        }
        
        // Call original fetch
        return window.originalFetch(url, options);
    };
    
    console.log('[SweekAI Force] Injection complete. Fetch is now intercepted.');
    
    // Also override XMLHttpRequest just in case
    const originalOpen = XMLHttpRequest.prototype.open;
    const originalSend = XMLHttpRequest.prototype.send;
    
    XMLHttpRequest.prototype.open = function(method, url, ...rest) {
        this._url = url;
        return originalOpen.apply(this, [method, url, ...rest]);
    };
    
    XMLHttpRequest.prototype.send = function(body) {
        console.log('[SweekAI Force] XHR send to:', this._url);
        if (this._url && this._url.includes('chat')) {
            console.log('[SweekAI Force] Chat XHR detected');
        }
        return originalSend.apply(this, [body]);
    };
    
})();

// Test function
window.testInjection = function() {
    const char = JSON.parse(localStorage.getItem('sweek-current-character') || '{}');
    console.log('Current character:', char.name || 'None');
    console.log('Fetch overridden:', window.fetch !== window.originalFetch);
};