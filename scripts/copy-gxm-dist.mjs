import fs from 'node:fs'
import path from 'node:path'

const projectRoot = process.cwd()
const sourceDir = path.join(projectRoot, 'subprojects', 'gxm', 'dist')
const targetDir = path.join(projectRoot, 'dist', 'projects', 'gxm')

if (!fs.existsSync(path.join(sourceDir, 'index.html'))) {
  throw new Error('GXM build output is missing. Run npm run build:gxm before copying it.')
}

fs.rmSync(targetDir, { recursive: true, force: true })
fs.mkdirSync(path.dirname(targetDir), { recursive: true })
fs.cpSync(sourceDir, targetDir, { recursive: true })

console.log(`Copied GXM build to ${path.relative(projectRoot, targetDir)}`)
