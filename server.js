import express from 'express'
import sirv from 'sirv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT

if (!PORT) {
  console.error('Missing process.env.PORT — the app must be started with a PORT environment variable.')
}

// Serve static build output
const assets = sirv(join(__dirname, 'dist'), { single: true, etag: true })
app.use(assets)

// Health check used by the platform
app.get('/_health', (req, res) => res.send('ok'))

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`BIT3UN running on port ${PORT}`)
})

// Graceful shutdown handlers
const shutdown = (signal) => {
  console.log(`Received ${signal}, closing server...`)
  server.close(() => {
    console.log('Server closed, exiting.')
    process.exit(0)
  })
  // Force exit if close doesn't complete in time
  setTimeout(() => {
    console.error('Failed to close server in time, forcing exit')
    process.exit(1)
  }, 10_000).unref()
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))

// Optional: surface unhandled rejections and exceptions before exit
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason)
})
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err)
  // after logging, attempt graceful shutdown
  shutdown('uncaughtException')
})
