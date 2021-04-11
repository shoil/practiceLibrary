const fs = require('fs')

const isDirectory = path => fs.statSync(path).isDirectory()

exports.getDir = (basePath, route) => {
  const files = fs.readdirSync(basePath, { encoding: 'utf-8' })
  return files.map(item => {
    if (isDirectory(basePath + '/' + item)) {
      if (/image/i.test(item)) {
        return
      }
      return {
        text: item.replace(/^[0-9]*/, ''),
        link: route + '/' + item + '/'
      }
    }
    return
  }).filter(item => item !== undefined)
}

exports.getFileTree = (basePath, route) => {
  const files = fs.readdirSync(basePath, { encoding: 'utf-8' })
  const mdReg = /\.md$/i
  return files.map(item => {
    if (isDirectory(basePath + '/' + item)) {
      // 文件夹
      if (/image/i.test(item)) {
        return
      }
      return {
        title: item.replace(/^[0-9]*/, ''),
        path: route + '/' + item + '/',
        collapsable: false,
        children: exports.getFileTree(basePath + '/' + item, route + '/' + item)
      }
    } else if (mdReg.test(item)) {
      const name = item.includes('README.') ? '' : item.replace(mdReg, '')
      return name ? [route + '/' + name, name.replace(/^[0-9]*/, '')] : undefined
    }
  }).filter(item => item !== undefined)
};

exports.getSide = (basePath, route) => {
  const sideList = exports.getFileTree(basePath, route);
  const side = {};
  sideList.forEach(item => {
    if (!item.title) return
    side[route + '/' + item.title + '/'] = [item]
  })
  return side
}