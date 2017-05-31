const fs = require('fs')
const es = require('event-stream')
const parser = require('./parser')()

const readFile = fs.createReadStream('./static/local-hardware-stats.txt', 'utf8')
const writeFile = fs.createWriteStream('./static/data.js')

module.exports = function() {
  let isFirstLine = true

  readFile
  .pipe(es.split())
  .pipe(es.mapSync(function (data) {
    return parser.toTree(data).reduce((tag, node) => {
      if (node.type !== 'text') { return '' }

      let text = node.text.trim()
      let result = ''

      if (text === '') {
        result = mapObject('\n', isFirstLine)
      } else {
        const TEXT_REACHED = true
        result = mapObject(mapProperty(text), isFirstLine, TEXT_REACHED)
      }
      isFirstLine = false

      return result
    }, [])
  }))
  .pipe(writeFile)
}

function mapObject(line, isFirstLine, TEXT_REACHED) {
  if (line == 'undefined') { return undefined }
  if (!TEXT_REACHED) {
    return isFirstLine ? `{ { ${line}` : line
  } else {
    return isFirstLine ? `{ { ${line}` : ``
  }
}

function mapProperty(text) {
  let formattedLine = ''
  let arr = text.toString().split(/:/i)
  const arrLength = arr.length

  arr.forEach((lineNode, index) => {
    lineNode = lineNode.toString().trim()

    if (index === 0) {
      formattedLine = `'${lineNode}' :`
    } else {
      if (arrLength === 1) {
        console.log('arrLength === 1')
        formattedLine += ` '',\n`
      } else if (arrLength === 2) {
        console.log('arrLength === 2')
        formattedLine += ` '${lineNode}'\n`
      } else {
        console.log('ELSEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE')
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
