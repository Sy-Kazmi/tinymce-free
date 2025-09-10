# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on port 3000
- `npm run server` - Start file upload server on port 3001
- `npm run dev:all` - Start both servers simultaneously
- `npm run build` - Build for production 
- `npm run preview` - Preview production build

## Architecture Overview

This is a Vue 3 demo application showcasing self-hosted TinyMCE integration using the `@tinymce/tinymce-vue` component.

### Key Components

- **Header.vue**: Navigation header with menu for switching between editors
- **Editor1.vue**: TinyMCE editor using original `/vendor/tinymce/` files
- **Editor2.vue**: TinyMCE editor using copied `/vendor/tinymce2/` files  
- **FileBrowser.vue**: File manager modal for uploading and selecting images
- **router/index.js**: Vue Router configuration for navigation
- **server.js**: Express server handling file uploads and management

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

### File Upload System

- **Backend**: Express server on port 3001 with file upload API
- **Storage**: Files stored in `public/uploads/` directory
- **Security**: File type validation, 5MB size limit, unique naming
- **Features**: Upload via drag/drop, paste, or file picker dialog
- **API Endpoints**:
  - `POST /api/upload` - Upload files
  - `GET /api/files` - List uploaded files
  - `DELETE /api/files/:filename` - Delete files

### Dependencies

- Vue 3.x with Composition API and Vue Router
- TinyMCE 6.8.2 with Vue wrapper 5.1.1
- Express 5.x with Multer for file uploads
- jQuery 3.7.1 (exposed globally for compatibility)
- Vite 4.x for development and building