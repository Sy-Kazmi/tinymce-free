# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production 
- `npm run preview` - Preview production build

## Architecture Overview

This is a Vue 3 demo application showcasing self-hosted TinyMCE integration using the `@tinymce/tinymce-vue` component.

### Key Components

- **App.vue**: Main component containing the TinyMCE editor with extensive plugin configuration
- **main.js**: Application entry point that mounts Vue app and exposes jQuery globally
- **index.html**: Entry point with TinyMCE skin CSS references

### Self-Hosted TinyMCE Setup

- TinyMCE is self-hosted in `public/tinymce/` directory (not CDN)
- Editor script loaded from `/vendor/tinymce/tinymce.min.js` 
- Skins and plugins referenced from local `/vendor/tinymce/` paths
- Configured with extensive plugin set: emoticons, table, advlist, codesample, autosave, autoresize, lists, link, image, textcolor, media, contextmenu, paste, mention

### Notable Configuration

- Custom mention functionality with user filtering
- Table styling options and appearance settings
- Code sample support for multiple languages
- Paste handling for images and rich content
- Emoticons database loaded from local path

### Dependencies

- Vue 3.x with Composition API
- TinyMCE 6.8.2 with Vue wrapper 5.1.1
- jQuery 3.7.1 (exposed globally for compatibility)
- Vite 4.x for development and building