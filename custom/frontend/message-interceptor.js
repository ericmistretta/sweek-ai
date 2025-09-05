// SweekAI Message Interceptor - Injects character personality into chat messages
(function() {
    'use strict';
    
    console.log('[SweekAI Message Interceptor] Initializing...');
    
    // Store original fetch
    const originalFetch = window.fetch;
    
    // Helper to get current character
    function getCurrentCharacter() {
        try {
            const saved = localStorage.getItem('sweek-current-character');
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (error) {
            console.error('[SweekAI] Failed to get current character:', error);
        }
        return null;
    }
    
    // Helper to build comprehensive character prompt with knowledge
    function buildCharacterPrompt(character) {
        let prompt = character.systemPrompt || '';
        
        // Add knowledge base if available
        if (character.knowledge) {
            prompt += '\n\nImportant facts about you:\n';
            
            Object.entries(character.knowledge).forEach(([key, value]) => {
                // Format key to be more readable
                const formattedKey = key.replace(/([A-Z])/g, ' $1').toLowerCase();
                
                if (Array.isArray(value)) {
                    prompt += `- Your ${formattedKey}: ${value.join(', ')}\n`;
                } else {
                    prompt += `- Your ${formattedKey}: ${value}\n`;
                }
            });
            
            prompt += '\nWhen asked about yourself, your history, or your knowledge, respond accurately using this information. Always speak in first person and stay in character.';
        }
        
        return prompt;
    }
    
    // Helper to inject character into messages
    function injectCharacterPrompt(messages, character) {
        if (!character || !character.systemPrompt) {
            return messages;
        }
        
        // Build comprehensive character prompt with knowledge
        const characterPrompt = buildCharacterPrompt(character);
        
        // Check if we already have a system message
        const hasSystemMessage = messages.some(msg => msg.role === 'system');
        
        if (!hasSystemMessage) {
            // Add character system prompt at the beginning
            messages.unshift({
                role: 'system',
                content: characterPrompt
            });
        } else {
            // Prepend to existing system message
            const systemMsg = messages.find(msg => msg.role === 'system');
            if (systemMsg) {
                systemMsg.content = characterPrompt + '\n\n' + systemMsg.content;
            }
        }
        
        console.log('[SweekAI] Character prompt injected with knowledge base');
        return messages;
    }
    
    // Override fetch to intercept API calls
    window.fetch = async function(...args) {
        const [url, options = {}] = args;
        
        // Check if this is a chat API call
        if (typeof url === 'string' && 
            (url.includes('/api/chat') || 
             url.includes('/v1/chat/completions') ||
             url.includes('/ollama/api/chat'))) {
            
            console.log('[SweekAI] Intercepting chat API call:', url);
            
            // Get current character
            const character = getCurrentCharacter();
            
            if (character && options.body) {
                try {
                    // Parse the request body
                    let body = JSON.parse(options.body);
                    
                    // Inject character prompt into messages
                    if (body.messages && Array.isArray(body.messages)) {
                        console.log('[SweekAI] Injecting character:', character.name);
                        console.log('[SweekAI] Character has knowledge:', !!character.knowledge);
                        body.messages = injectCharacterPrompt(body.messages, character);
                        
                        // Log first message for debugging
                        if (body.messages.length > 0 && body.messages[0].role === 'system') {
                            console.log('[SweekAI] System prompt preview:', body.messages[0].content.substring(0, 200) + '...');
                        }
                        
                        // Add character metadata
                        if (!body.metadata) {
                            body.metadata = {};
                        }
                        body.metadata.character = {
                            id: character.id,
                            name: character.name,
                            avatar: character.avatar
                        };
                    }
                    
                    // Update the request body
                    options.body = JSON.stringify(body);
                    
                } catch (error) {
                    console.error('[SweekAI] Failed to inject character:', error);
                }
            }
        }
        
        // Call original fetch
        return originalFetch.apply(this, [url, options]);
    };
    
    // Also override XMLHttpRequest for completeness
    const originalXHROpen = XMLHttpRequest.prototype.open;
    const originalXHRSend = XMLHttpRequest.prototype.send;
    
    XMLHttpRequest.prototype.open = function(method, url, ...rest) {
        this._url = url;
        this._method = method;
        return originalXHROpen.apply(this, [method, url, ...rest]);
    };
    
    XMLHttpRequest.prototype.send = function(body) {
        if (this._url && 
            (this._url.includes('/api/chat') || 
             this._url.includes('/v1/chat/completions') ||
             this._url.includes('/ollama/api/chat'))) {
            
            const character = getCurrentCharacter();
            
            if (character && body) {
                try {
                    let parsedBody = JSON.parse(body);
                    
                    if (parsedBody.messages && Array.isArray(parsedBody.messages)) {
                        console.log('[SweekAI XHR] Injecting character:', character.name);
                        parsedBody.messages = injectCharacterPrompt(parsedBody.messages, character);
                        
                        if (!parsedBody.metadata) {
                            parsedBody.metadata = {};
                        }
                        parsedBody.metadata.character = {
                            id: character.id,
                            name: character.name,
                            avatar: character.avatar
                        };
                        
                        body = JSON.stringify(parsedBody);
                    }
                } catch (error) {
                    console.error('[SweekAI XHR] Failed to inject character:', error);
                }
            }
        }
        
        return originalXHRSend.apply(this, [body]);
    };
    
    // Function to test character injection
    window.testCharacterInjection = function() {
        const character = getCurrentCharacter();
        if (character) {
            console.log('[SweekAI Test] Current character:', character.name);
            console.log('[SweekAI Test] System prompt:', character.systemPrompt);
            
            // Simulate a chat request
            const testMessages = [
                { role: 'user', content: 'Hello!' }
            ];
            
            const injected = injectCharacterPrompt([...testMessages], character);
            console.log('[SweekAI Test] Injected messages:', injected);
        } else {
            console.log('[SweekAI Test] No character selected');
        }
    };
    
    console.log('[SweekAI Message Interceptor] Ready! Character injection active.');
    console.log('[SweekAI] Run testCharacterInjection() to test the system');
    
})();