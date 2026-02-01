# Logino Web App

A modern, responsive web application built with Vite, Vanilla JavaScript, and Tailwind CSS.

## Features

- **Vite** - Fast development server and optimized builds
- **Vanilla JavaScript** - No framework dependencies
- **Tailwind CSS** - Utility-first CSS framework (installed locally)
- **Responsive Header** with:
  - Logo on the left
  - Navigation menu in the center (About, Solution, Community, Build)
  - Two black buttons on the right (Sign In, Get Started)
  - Mobile-responsive design with hamburger menu
- **Smooth scrolling** navigation
- **Modern UI** with smooth transitions and hover effects

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The app will open automatically at `http://localhost:3000`

### Build for Production

Create an optimized production build:
```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## Project Structure

```
logino/
├── src/
│   ├── main.js          # Main JavaScript entry point
│   └── style.css        # Tailwind CSS imports and custom styles
├── index.html           # Main HTML file
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── vite.config.js       # Vite configuration
└── README.md           # This file
```

## Customization

You can easily customize:
- **Logo and brand name** - Edit in `index.html`
- **Menu items** - Modify navigation links in `index.html`
- **Button text and actions** - Update in `index.html`
- **Color scheme** - Modify Tailwind classes or extend in `tailwind.config.js`
- **JavaScript behavior** - Add your code in `src/main.js`
- **Custom styles** - Add to `src/style.css`

## Technologies Used

- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - Automatic vendor prefixing

## Browser Support

Works in all modern browsers that support ES6 modules.
