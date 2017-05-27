var events  = require('events')
var emitter = new events.EventEmitter()

emitter.on('knock', function() {
  console.log('Who\'s there?')
})

emitter.on('knock', function() {
  console.log('Go away!')
})

emitter.emit('knock')

// У эмиттеров есть и другие возможности:
// emitter.listeners(eventName): формирует список всех получателей для данного события.
// emitter.once(eventName, listener): прикрепляет одноразового получателя событий.
// emitter.removeListener(eventName, listener): удаляет получателя событий.
