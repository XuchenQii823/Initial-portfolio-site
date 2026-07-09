import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const projectRoot = process.cwd()
const maxWidth = 2304
const webpQuality = 85

const targets = [
  { key: 'strata', directory: '01strata', extensions: ['.png'] },
  { key: 'dimension', directory: '02dimension', extensions: ['.png'] },
  { key: 'vitrum', directory: '03vitrum', extensions: ['.png'] },
  { key: 'photography', directory: 'Photography', extensions: ['.jpg', '.jpeg'] },
]

const requestedTargets = process.argv.slice(2)
const selectedTargets = requestedTargets.length
  ? targets.filter(
      (target) => requestedTargets.includes(target.key) || requestedTargets.includes(target.directory),
    )
  : targets

if (!selectedTargets.length) {
  throw new Error(`No matching image targets for: ${requestedTargets.join(', ')}`)
}

const formatBytes = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`
const getExtension = (fileName) => path.extname(fileName).toLowerCase()

let grandOriginalBytes = 0
let grandOptimizedBytes = 0
let grandFileCount = 0

for (const target of selectedTargets) {
  const sourceDir = path.join(projectRoot, 'public/assets/images', target.directory)
  const outputDir = path.join(sourceDir, 'optimized')

  await fs.mkdir(outputDir, { recursive: true })

  const entries = await fs.readdir(sourceDir, { withFileTypes: true })
  const imageFiles = entries
    .filter((entry) => entry.isFile() && target.extensions.includes(getExtension(entry.name)))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

  let targetOriginalBytes = 0
  let targetOptimizedBytes = 0

  for (const fileName of imageFiles) {
    const sourcePath = path.join(sourceDir, fileName)
    const outputName = `${fileName.slice(0, -path.extname(fileName).length)}.webp`
    const outputPath = path.join(outputDir, outputName)

    await sharp(sourcePath)
      .rotate()
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality: webpQuality, effort: 6 })
      .toFile(outputPath)

    const [sourceStats, outputStats] = await Promise.all([fs.stat(sourcePath), fs.stat(outputPath)])
    targetOriginalBytes += sourceStats.size
    targetOptimizedBytes += outputStats.size
    grandOriginalBytes += sourceStats.size
    grandOptimizedBytes += outputStats.size
    grandFileCount += 1

    const savedPercent = 100 - (outputStats.size / sourceStats.size) * 100
    console.log(
      `${target.directory}/${fileName} -> optimized/${outputName} (${formatBytes(sourceStats.size)} -> ${formatBytes(outputStats.size)}, ${savedPercent.toFixed(1)}% smaller)`,
    )
  }

  const targetSavedPercent = 100 - (targetOptimizedBytes / targetOriginalBytes) * 100
  console.log(
    `Optimized ${imageFiles.length} ${target.key} images: ${formatBytes(targetOriginalBytes)} -> ${formatBytes(targetOptimizedBytes)} (${targetSavedPercent.toFixed(1)}% smaller)`,
  )
}

const grandSavedPercent = 100 - (grandOptimizedBytes / grandOriginalBytes) * 100
console.log(
  `Optimized ${grandFileCount} total images: ${formatBytes(grandOriginalBytes)} -> ${formatBytes(grandOptimizedBytes)} (${grandSavedPercent.toFixed(1)}% smaller)`,
)
