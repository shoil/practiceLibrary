// 前端目录
const path = require('path')
const resolve = file => path.resolve(__dirname, file)

const { getDir, getSide } = require('./tools')

const basePath = resolve('../frontend')
const route = '/frontend'

exports.nav = getDir(basePath, route)
exports.side = getSide(basePath, route)