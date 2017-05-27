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

// 0.2
// Save system hardware info into local file
const ls = spawn('powershell.exe', ['d:\\node-vue-app\\getData.ps1'])

ls.on('exit', () => parseData())
ls.stdin.end()

// Stage 1
// Parsing
function parseData() {
  // 1.1
  // Prepare parser rules
  // parser.addRule(rExpCon.processId.regExp, (tag) => {
  //   return rExpCon.processId.result
  // })

  // Step 1.2
  // Parse file and modify it
  let readFile = fs.createReadStream('./static/local-hardware-stats.txt')
  let writeFile = fs.createWriteStream('./static/data.json')
  let lineCount = 0;

  readFile
    .pipe(es.split()) //split stream to break on newlines
    .pipe(es.map(function (data, callback) { //turn this async function into a stream
      // callback(null, parser.render(data))
      const line = parser.toTree(data).reduce((tag, node) => {
        let text = node.text.trim()

        console.log(text);

        // str.split(':') - делит строку на массив

        if (node.type === 'text') {
          if (text === '') {
            return lineCount < 5 ? '\n' : undefined
          } else {
            return text + '\n'
          }
        } else {
          return undefined
        }
      }, [])
      lineCount++
      callback(null, line)
    }))
    .pipe(writeFile)
}



//
// // Step 1
// // Take local hardware stats with Shell
// let mainStats = fs.createWriteStream('./static/local-hardware-stats.txt')
// // let sensorsStats = fs.createWriteStream('./static/local-sensors-stats.txt')
// let parserMainStatsResult = fs.createWriteStream('./static/ololo.json', 'utf8')
//
// // let readlineSensors = readline.createInterface({
// //   input: fs.createReadStream('./static/local-sensors-stats.json', 'utf8')
// // })
//
// const processHardware = exec('powershell.exe get-wmiobject -namespace "root/OpenHardwareMonitor" Hardware')
// // const processSensor = exec('powershell.exe get-wmiobject -namespace "root/OpenHardwareMonitor" Sensor')
//
// let timerId
// let timerWorked = false
//
// processHardware.stdout.on('data', (data) => {
//   mainStats.write(data, () => {
//     if (timerId) {
//       clearTimeout(timerId)
//     }
//
//     timerId = setTimeout(() => {
//       if (timerWorked) {
//         clearTimeout(timerId)
//       } else {
//         timerWorked = true
//         mainStats.end()
//       }
//     }, 1000)
//   })
// })
//
// mainStats.on('finish', function() {
//   console.log('finish');
//
//   // const readlineHardware = readline.createInterface({
//   //   input: fs.createReadStream('./static/local-hardware-stats.txt', 'utf8')
//   // })
//   //
//   // readlineHardware.on('close', () => {
//   //   console.log('goodbye!')
//   // })
//   //
//   // readlineHardware.on('line', (line) => {
//   //   // console.log(line);
//   //   parserMainStatsResult.write(parser.render(line))
//   //   // console.log(line)
//   //   // readline.clearLine(writeStrmHardware, dir)
//   //   // dir -1 - to the left from cursor
//   //   // dir 1 - to the right from cursor
//   //   // dir 0 - the entire line
//   //   // console.log(line);
//   // })
// })

module.exports = {
  getData: function() {}
}
