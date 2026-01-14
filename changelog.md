
# Changelog

# V1.1
### Core
- **Platform Storage Integration**: Implemented unified storage SDK (`services/storage.ts`) to support persistent data across sessions when deployed on the platform, with seamless fallback to localStorage.
- **LLM Proxy Support**: Updated Gemini service to automatically route requests through the platform proxy when detected, removing the need for client-side API keys in production.

### UI/UX
- **New Template Library**: Completely redesigned the template browser.
    - Added **Sidebar Navigation** for filtering by category (Clinical, Education, Sales, etc.).
    - Added **Search Functionality** to find templates by name or description.
    - Implemented **Immersive Modal** layout with split-pane design.
    - Improved **Card Aesthetics** with larger thumbnails and clearer hover actions.
- **Editor Enhancements**:
    - **Undo/Redo**: Added full history support for content edits in the preview area.
    - **Color Palette**: Replaced simple color buttons with a dropdown palette including a "Reset" (Eraser) function to support theme adaptability (auto text color).
- **Enhanced Template Content**: 
    - Overhauled 10+ templates (Patient Centric, Sales, Corporate categories) to be "Long-Form" and high-fidelity.
    - Added simulated interactive elements (checklists, input fields) and complex Tailwind layouts (timelines, dashboards) to templates.

### Core
- **Editor Integration**: Templates can now be opened directly in code edit mode from the library.
- **Import/Export**: Added HTML import functionality to the library.

# V1.0
### Core
- Initial Release of Prism AI Agent.
- Gemini 1.5 Pro / Flash integration.
- Context-aware artifact generation.
- Chat interface with multi-turn history.

### Feature
- **Artifact Preview**: Real-time rendering of generated HTML.
- **Device Toggles**: Mobile, Tablet, Desktop view modes.
- **Theme Support**: Toggle between "Prism" (Dark) and "Novartis" (Light) themes.
- **Export**: Download artifacts as HTML or PNG.

### UI/UX
- Glassmorphism design system.
- Responsive layout.
- Animated transitions.
