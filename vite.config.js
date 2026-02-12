import { defineConfig } from 'vite'

export default defineConfig({
  base: './', // Relative paths so build can be opened directly (file:// or double-click index.html)
  root: '.',
  publicDir: 'public',
  server: {
    port: 3000,
    open: true
  },
  preview: {
    port: 4173,
    open: true
  },
  build: {
    outDir: 'build-finals',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'esbuild',
    cssMinify: true,
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'about.html',
      },
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') ?? []
          const ext = info[info.length - 1]
          if (/css/i.test(ext)) return 'assets/[name]-[hash][extname]'
          if (/png|jpe?g|gif|svg|ico|webp/i.test(ext)) return 'assets/[name]-[hash][extname]'
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  }
})
