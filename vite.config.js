import { defineConfig } from 'vite'
import { cpSync, existsSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [
    {
      name: 'copy-pdf-to-build-finals',
      closeBundle() {
        const src = resolve(__dirname, 'pdf')
        const dest = resolve(__dirname, 'build-finals', 'pdf')
        if (existsSync(src)) {
          mkdirSync(resolve(__dirname, 'build-finals'), { recursive: true })
          cpSync(src, dest, { recursive: true })
        }
      },
    },
  ],
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
        whatIsMetamask: 'what-is-metamask.html',
        about: 'about/about.html',
        contactUs: 'about/contact-us.html',
        foundation: 'about/foundation.html',
        support: 'about/support.html',
        decentralizedAi: 'solutions/decentralized-ai.html',
        decentralizedFinanceDefi: 'solutions/decentralized-finance-defi.html',
        enterpriseConsumerApplications: 'solutions/enterprise-consumer-applications.html',
        privacyDataTransmission: 'solutions/privacy-data-transmission.html',
        realWorldAssets: 'solutions/real-world-assets.html',
        web3Infrastructure: 'solutions/web3-infrastructure.html',
        ecosystemBuilders: 'community/ecosystem-builders.html',
        unovaIncubationHub: 'community/unova-incubation-hub.html',
        unovaTestnet: 'build/unova-testnet.html',
        unovaNop: 'build/unova-nop.html',
        validatorNodes: 'build/validator-nodes.html',
        uonToken: 'build/uon-token.html',
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
