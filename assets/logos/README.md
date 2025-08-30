# Sweek-AI Logo Assets

This directory contains all logo assets for the Sweek-AI application.

## Logo Files Structure

```
logos/
├── sweek-ai-logo.svg          # Primary logo (vector format)
├── sweek-ai-logo.png          # Primary logo (PNG format, 512x512)
├── sweek-ai-logo-dark.svg     # Dark mode version
├── sweek-ai-logo-dark.png     # Dark mode PNG
├── sweek-ai-icon.svg          # Square icon version
├── sweek-ai-icon.png          # Square icon (256x256)
├── favicon.ico                # Browser favicon
└── variants/
    ├── sweek-ai-logo-sm.png   # Small size (128x128)
    ├── sweek-ai-logo-md.png   # Medium size (256x256)
    └── sweek-ai-logo-lg.png   # Large size (1024x1024)
```

## Logo Specifications

### Primary Logo
- **Format**: SVG (preferred) and PNG
- **Dimensions**: 512x512px (PNG)
- **Colors**: 
  - Primary: #6366F1 (Indigo)
  - Secondary: #8B5CF6 (Purple)
  - Accent: #EC4899 (Pink)
- **Typography**: Inter or SF Pro Display

### Usage Guidelines

1. **Web Application**
   - Header: Use `sweek-ai-logo.svg` at 40px height
   - Loading screen: Use `sweek-ai-logo.png` at 128px
   - Favicon: Use `favicon.ico`

2. **Dark Mode**
   - Automatically switch to `sweek-ai-logo-dark.svg` when dark mode is active
   - Ensure sufficient contrast on dark backgrounds

3. **Mobile**
   - Use `sweek-ai-icon.png` for app icons
   - Minimum size: 32x32px

## Design Concept

The Sweek-AI logo represents:
- **AI/Brain**: Neural network pattern or brain silhouette
- **Characters**: Multiple overlapping speech bubbles or avatars
- **Playfulness**: Rounded, friendly design elements
- **Innovation**: Modern gradient effects

## File Requirements

When adding your custom logo:
1. Save primary logo as `sweek-ai-logo.svg` and `sweek-ai-logo.png`
2. Create dark mode variant if needed
3. Generate favicon.ico (use https://favicon.io or similar)
4. Ensure transparent backgrounds for PNG files
5. Optimize file sizes (use tools like SVGO for SVG, TinyPNG for PNG)

## Integration Points

The logo will be used in:
- `/custom/frontend/public/` - For Open WebUI customization
- `docker-compose.yml` - Environment variables for logo paths
- `nginx` configuration - Static asset serving
- PWA manifest - App icons