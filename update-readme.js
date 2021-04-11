console.time('更新用时')

const fs = require('fs')
const isDirectory = path => fs.statSync(path).isDirectory()

const loop = (dirPath, name) => {
  const files = fs.readdirSync(dirPath)
  if (files.includes('README.md')) {
    let res = `# ${name}`
    files.forEach(file => {
      if (!file.includes('README') && !/image/i.test(file)) {
        res += `\n- [${file.replace(/^[0-9]*/, '')}](./${file + (file.includes('.md') ? '' : '/')})`
      }
      const chldPath = dirPath + '/' + file
      if (isDirectory(chldPath)) {
        loop(chldPath, file)
      }
    })
    if (!name) return
    fs.writeFileSync(dirPath + '/' + 'README.md', res, { encoding: 'utf-8' })
    console.log('更新了', dirPath + '/' + 'README.md')
  }
}

const basePath = './docs'
loop(basePath)

console.timeEnd('更新用时')