import express from 'express'
import sirv from 'sirv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000

// Serve static build output
const assets = sirv(join(__dirname, 'dist'), { single: true, etag: true })
app.use(assets)

app.listen(PORT, '0.0.0.0', () => {
  console.log(`BIT3UN running on port ${PORT}`)
})
