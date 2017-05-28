const Parser = require('simple-text-parser')
const parser = new Parser()
const rExpCon = require('../../config/regex-config')

// Prepare parser rules
parser.addRule('undefined', (tag) => {
  //TODO - need to put comma in the line end and put curly braces to object
  //and objects in objects
  return undefined
})

// How write example
// fs.createWriteStream('text.txt').write(parser.render(node.text))

module.exports = function() {
  return parser
}
