import fs from 'node:fs'
import path from 'node:path'
import { defineEventHandler } from 'h3'

export default defineEventHandler((event) => {
  const pdfPath = path.resolve(__dirname, '../../public/guide.pdf')
  const pdfBuffer = fs.readFileSync(pdfPath)

  event.node.res.setHeader('Content-Type', 'application/pdf')
  event.node.res.end(pdfBuffer)
})
