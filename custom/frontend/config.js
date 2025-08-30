// Sweek-AI Frontend Configuration
// This file customizes the Open WebUI interface

export const config = {
  // Branding
  branding: {
    appName: 'Sweek-AI',
    tagline: 'Chat with Character',
    logo: {
      light: '/assets/logos/sweek-ai-logo.svg',
      dark: '/assets/logos/sweek-ai-logo-dark.svg',
      favicon: '/assets/logos/favicon.ico',
      height: '40px',
      width: 'auto'
    }
  },

  // Theme customization
  theme: {
    colors: {
      primary: '#6366F1',     // Indigo
      secondary: '#8B5CF6',   // Purple
      accent: '#EC4899',      // Pink
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6'
    },
    fonts: {
      heading: 'Inter, system-ui, sans-serif',
      body: 'Inter, system-ui, sans-serif',
      mono: 'SF Mono, Monaco, monospace'
    }
  },

  // UI Components
  ui: {
    showLogo: true,
    showTagline: true,
    roundedCorners: 'lg',
    animationsEnabled: true,
    characterAvatarsEnabled: true,
    chatBubbleStyle: 'modern', // 'classic', 'modern', 'minimal'
  },

  // Features
  features: {
    characterSwitcher: {
      enabled: true,
      position: 'top', // 'top', 'sidebar'
      showSearch: true,
      showCategories: true,
      favoriteEnabled: true
    },
    voiceInput: {
      enabled: true,
      autoStart: false,
      language: 'en-US'
    },
    themes: {
      darkModeEnabled: true,
      defaultTheme: 'light', // 'light', 'dark', 'system'
    }
  },

  // Custom CSS override
  customCSS: `
    /* Sweek-AI Custom Styles */
    .app-header {
      background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%);
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .logo-container {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .character-avatar {
      border: 2px solid var(--primary-color);
      border-radius: 50%;
      transition: transform 0.2s;
    }
    
    .character-avatar:hover {
      transform: scale(1.1);
    }
    
    .chat-bubble {
      border-radius: 18px;
      padding: 12px 16px;
      max-width: 70%;
      word-wrap: break-word;
    }
    
    .user-message {
      background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
      color: white;
      margin-left: auto;
    }
    
    .ai-message {
      background: #F3F4F6;
      color: #1F2937;
    }
    
    @media (prefers-color-scheme: dark) {
      .ai-message {
        background: #374151;
        color: #F3F4F6;
      }
    }
  `
};