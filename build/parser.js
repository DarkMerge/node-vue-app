const fs = require('fs')
const exec = require('child_process').exec;
const readline = require('readline')
const stream = require('stream')
const Parser = require('simple-text-parser')
const rExpCon = require('../config/regex-config')

// Step 0
// Prepare parser and rules for it
const parser = new Parser()

parser.addRule(rExpCon.processId.regExp, (tag) => {
    return rExpCon.processId.result
    // Return the tag minus the `#` and surrond with html tags
    // return "<span class=\"tag\">" + tag.substr(1) + "</span>";
})

// Step 1
// Take local hardware stats with Shell
let successDownloads = 0
let mainStats = fs.createWriteStream('./static/local-hardware-stats.json')
let sensorsStats = fs.createWriteStream('./static/local-sensors-stats.json')

// let readlineSensors = readline.createInterface({
//   input: fs.createReadStream('./static/local-sensors-stats.json', 'utf8')
// })

const processHardware = exec('powershell.exe get-wmiobject -namespace "root/OpenHardwareMonitor" Hardware')
// const processSensor = exec('powershell.exe get-wmiobject -namespace "root/OpenHardwareMonitor" Sensor')

let timerId
let timerWorked = false

processHardware.stdout.on('data', (data) => {
  mainStats.write(data, function() {
    if (timerId) {
      clearTimeout(timerId)
    }

    timerId = setTimeout(function() {
      if (timerWorked) {
        clearTimeout(timerId)
      } else {
        timerWorked = true
        mainStats.end()
      }
    }, 1000)
  })
})

processHardware.on('close', () => {
  successDownloads++
})

mainStats.on('finish', function() {

  let readlineHardware = readline.createInterface({
    input: fs.createReadStream('./static/local-hardware-stats.json', 'utf8')
  })

  readlineHardware.on('close', () => {
    console.log('goodbye!')
  })

  readlineHardware.on('line', (line) => {
    console.log(line)
    // readline.clearLine(writeStrmHardware, dir)
    // dir -1 - to the left from cursor
    // dir 1 - to the right from cursor
    // dir 0 - the entire line
    // console.log(line);
  })
})

module.exports = {
  getData: function() {}
}

// Example
// var z = zlib.createGzip()
// var r = fs.createReadStream('file.txt')
// var w = fs.createWriteStream('./local-hardware-stats.json')
// r.pipe(z).pipe(w)
