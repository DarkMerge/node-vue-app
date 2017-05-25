var request = require('request')
var fs = require('fs')

request('http://our-way.name/data.json', function (error, response, body) {

  fs.writeFile('./static/data.json', body, function(err) {
    console.log('The file has been saved!');

    fs.readFile('./static/data.json', 'utf8', function (err, data) {
      console.log('The file has been readed!');
    })
  })
})
