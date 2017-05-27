const fs = require('fs')
const exec = require('child_process').exec;
const spawn = require('child_process').spawn
const readline = require('readline')
const stream = require('stream')
const rExpCon = require('../config/regex-config')

const Parser = require('simple-text-parser')
const parser = new Parser()

const es = require('event-stream')

// Stage 0
// Prepare normal json data via powershell scripts and local hardware data

// 0.1
// Write options to add ability to start powershell scripts on locall machine
spawn('powershell.exe', ['Set-ExecutionPolicy RemoteSigned'])
spawn('powershell.exe', ['Invoke-Item soft/*.exe -force'])
.on('close', function() {

  // 0.2
  // Save system hardware info into local file
  spawn('powershell.exe', ['scripts/getData.ps1'])
  .on('exit', () => parseData())
  .stdin.end()

  // Stage 1
  // Parsing
  function parseData() {
    // 1.1
    // Prepare parser rules
    parser.addRule(/^\w.+?:/, (tag) => {
      // TODO - need to put comma in the line end and put curly braces to object
      // and objects in objects
      return tag
    })

    // Step 1.2
    // Parse file and modify it
    let readFile = fs.createReadStream('./static/local-hardware-stats.txt', 'utf8')
    let writeFile = fs.createWriteStream('./static/data.json')
    let lineCount = 0;

    readFile
      .pipe(es.split()) //split stream to break on newlines
      .pipe(es.map(function (data, callback) { //turn this async function into a stream
        // callback(null, parser.render(data))
        const line = parser.toTree(data).reduce((tag, node) => {
          console.log('tag ', tag);
          console.log(node);
          let text = node.text.trim()
          lineCount++

          // console.log(text);
          // WriteStream.write(parser.render(node.text))

          if (node.type === 'text') {
            if (text === '') {
              return lineCount > 5 ? '\n' : undefined
            } else {
              return parser.render(text) + '\n'
            }
          } else {
            return undefined
          }
        }, [])
        callback(null, line)
      }))
      .pipe(writeFile)
  }

})

module.exports = {
  getData: function() {}
}
