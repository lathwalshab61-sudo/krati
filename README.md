# FORENSICA — Case & Evidence Intelligence System (LIMS)

A modern, responsive Forensic Case & Evidence Intelligence System built with **React 19**, **Vite**, and **Tailwind CSS**.

---

## ⚡ Quick Start

From the project root:

```bash
# 1. Start the development server
npm run dev

# 2. Build for production
npm run build

# 3. Preview production build
npm run preview

# 4. Code linting
npm run lint
```

---

## 📁 Project Architecture

- **`src/`**: Application source code
  - **`components/`**: UI components (Case management, DNA labs, modal dialogs, drawers, and tabs)
  - **`context/`**: React Context for global state (`CaseContext.jsx`)
  - **`data/`**: Sample forensic records and CODIS loci datasets (`mockData.js`)
  - **`styles/`**: Custom styling and theme overrides (`global.css`, `index.css`)
  - **`utils/`**: Utilities and audio helpers (`audio.js`)
- **`dist/`**: Pre-built production assets ready for deployment
- **`index.html`**: Application entrypoint
- **`vite.config.js`**: Vite configuration with Tailwind CSS plugin

---

## 🔧 Applied Fixes & Status

1. **Restored `node_modules`:** Fixed misplaced dependencies that were previously nested inside a folder named `.gitignore`.
2. **Standard `.gitignore`:** Configured proper exclusions for `node_modules/`, `dist/`, and editor cache.
3. **Build Verified:** Successfully tested with `npm run build` (1,938 modules compiled with 0 errors).
