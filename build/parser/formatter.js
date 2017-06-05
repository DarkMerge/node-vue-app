const fs = require('fs')
const es = require('event-stream')
const parser = require('./parser')()


/**
 * formatter
 * @param  {[string]} readFile  [url path to local temp file from system settings]
 * @param  {[string]} writeFile [url path to local static file with parsed and formatted system data]
 * @return {[type]}           [description]
 */
module.exports = function(readFile, writeFile) {
  let lineIndex = 0

  const readFile = fs.createReadStream('./temp/local-hardware-stats.txt', 'utf8')
  const writeFile = fs.createWriteStream('./static/local-hardware-stats.json')

  readFile
  .pipe(es.split())
  .pipe(es.mapSync(function (data) {
    return parser.toTree(data).reduce((tag, node) => {
      if (node.type !== 'text') { return '' }

      let text = node.text.trim()
      let result = ''

      if (text === '') {
        result = mapObject('\n', lineIndex)
      } else {
        result = mapObject(mapProperty(text), lineIndex)
      }
      lineIndex++
      console.log('result: ', result);
      return result
    }, [])
  }))
  .pipe(writeFile)
}

function mapObject(line, lineIndex) {
  if (line == 'undefined') { return undefined }

  if (lineIndex === 0) {
    return `{ { ${line}`
  } else {
    return line
  }
}

function mapProperty(text) {
  let formattedLine = ''
  let arr = text.toString().split(':')
  const arrLength = arr.length

  arr.forEach((lineNode, index) => {
    lineNode = lineNode.toString().trim()

    if (index === 0) {
      formattedLine = `'${lineNode}' :`
    } else {
      if (arrLength === 1) {
        formattedLine += ` '',\n`
      } else if (arrLength === 2) {
        formattedLine += ` '${lineNode}'\n`
      } else {
        if (index === 1) {
          formattedLine += ` '${lineNode}`
        } else if (index + 1 === arrLength) {
          formattedLine += ` ${lineNode}'\n`
        } else {
          formattedLine += ` ${lineNode}`
        }
      }
    }
  })

  return formattedLine
}
