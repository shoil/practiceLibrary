// 后端目录
const path = require('path')
const resolve = file => path.resolve(__dirname, file)

const { getDir, getSide } = require('./tools')

const basePath = resolve('../backend')
const route = '/backend'

exports.nav = getDir(basePath, route)
exports.side = getSide(basePath, route)