const spawn = require('child_process').spawn
const parser = require('./parser')()
const formatter = require('./formatter')
const config = require('./config/_main-config.js')

// Stage 1 - Prepare normal json data via powershell scripts and local hardware Data
// 1.1 - Write options to add ability to start powershell scripts on locall machine
spawn('powershell.exe', ['Set-ExecutionPolicy RemoteSigned'])
//spawn('powershell.exe', ['Invoke-Item soft/*.exe'])  // TODO uncomment for starting processes
.on('close', () => {

  // 1.2 - Save system hardware info into local file
  spawn('powershell.exe', ['scripts/getData.ps1'])  // Stage 2 - Get and save Data
  .on('exit', () => formatter(config.temp.hardware, config.temp.hardware))  // Stage 3 - Format Data
  .stdin.end()
})
.stdin.end()

const readFile = fs.createReadStream('./temp/local-hardware-stats.txt', 'utf8')
const writeFile = fs.createWriteStream('./static/local-hardware-stats.json')

module.exports = {
  getData: function() {}
}
