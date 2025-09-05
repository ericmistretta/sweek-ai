// Sweek-AI Branding Injector
// This script can be run in the browser console to immediately apply branding

(function() {
    // Change page title
    document.title = 'Sweek-AI - Chat with Character';
    
    // Replace favicon
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
        favicon.href = '/static/logos/favicon.ico';
    }
    
    // Replace all "Open WebUI" text
    function replaceText(element) {
        if (element.hasChildNodes()) {
            element.childNodes.forEach(child => replaceText(child));
        } else if (element.nodeType === Text.TEXT_NODE) {
            element.textContent = element.textContent.replace(/Open WebUI/g, 'Sweek-AI');
        }
    }
    replaceText(document.body);
    
    // Add custom CSS
    const style = document.createElement('style');
    style.textContent = `
        /* Hide default logos */
        img[alt="Open WebUI"],
        .app-logo img {
            display: none !important;
        }
        
        /* Add Sweek-AI logo */
        .app-logo::after {
            content: '';
            display: inline-block;
            width: 120px;
            height: 40px;
            background: url('/static/logos/sweek-ai-logo-dark.svg') no-repeat center;
            background-size: contain;
        }
        
        /* Force dark theme */
        html {
            color-scheme: dark !important;
        }
        
        /* Custom colors */
        :root {
            --primary: #8FFF00 !important;
        }
    `;
    document.head.appendChild(style);
    
    console.log('✅ Sweek-AI branding applied!');
})();