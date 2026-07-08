import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const projectRoot = process.cwd()
const sourceDir = path.join(projectRoot, 'public/assets/images/01strata')
const outputDir = path.join(sourceDir, 'optimized')
const maxWidth = 2304
const webpQuality = 85

const formatBytes = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`

await fs.mkdir(outputDir, { recursive: true })

const entries = await fs.readdir(sourceDir, { withFileTypes: true })
const pngFiles = entries
  .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.png'))
  .map((entry) => entry.name)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

let totalOriginalBytes = 0
let totalOptimizedBytes = 0

for (const fileName of pngFiles) {
  const sourcePath = path.join(sourceDir, fileName)
  const outputName = fileName.replace(/\.png$/i, '.webp')
  const outputPath = path.join(outputDir, outputName)

  await sharp(sourcePath)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: webpQuality, effort: 6 })
    .toFile(outputPath)

  const [sourceStats, outputStats] = await Promise.all([fs.stat(sourcePath), fs.stat(outputPath)])
  totalOriginalBytes += sourceStats.size
  totalOptimizedBytes += outputStats.size

  const savedPercent = 100 - (outputStats.size / sourceStats.size) * 100
  console.log(`${fileName} -> optimized/${outputName} (${formatBytes(sourceStats.size)} -> ${formatBytes(outputStats.size)}, ${savedPercent.toFixed(1)}% smaller)`)
}

const totalSavedPercent = 100 - (totalOptimizedBytes / totalOriginalBytes) * 100
console.log(`Optimized ${pngFiles.length} Strata images: ${formatBytes(totalOriginalBytes)} -> ${formatBytes(totalOptimizedBytes)} (${totalSavedPercent.toFixed(1)}% smaller)`)
