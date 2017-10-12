require('reveal.js/lib/js/head.min.js')
const Reveal = require('reveal.js')
window.Reveal = Reveal
const hljs = require('reveal.js/plugin/highlight/highlight-origin.js')
require('reveal.js/plugin/highlight/highlight.js')

const drawDiagram = require('./draw-diagram')
const {jsPlumb} = require('jsplumb')
// http://www.freedevelopertutorials.com/jsplumb-tutorial/introduction/
// Reveal assumes this is global
window.hljs = hljs
Reveal.initialize({
  postMessage: true,
  dependencies: [
    { src: 'resources/lib/reveal.js/plugin/markdown/marked.js' },
    { src: 'resources/lib/reveal.js/plugin/markdown/markdown.js' },
    { src: 'resources/lib/reveal.js/plugin/notes/notes.js', async: true },
    {
      src: 'plugin/highlight/highlight.js',
      async: true,
      callback: function () {
        hljs.initHighlightingOnLoad()
      }
    }
  ]
})

Reveal.addEventListener('fragmentshown', function (event) {
  var jsonbDiagram = event.fragment.getAttribute('jsonb-diagram')
  if (jsonbDiagram) {
    document.documentElement.style.setProperty('--jsonb-diagram__push-jsonb-value', 0)
    document.documentElement.style.setProperty('--jsonb-diagram__jsonb-iterator-next', 0)
  }
  if (jsonbDiagram === 'connectJsonbJsonbIterator') {
    drawDiagram.connectJsonbJsonbIterator(Reveal, jsPlumb)
  }

  if (jsonbDiagram === 'connectJsonbIteratorNext') {
    document.documentElement.style.setProperty('--jsonb-diagram__jsonb-iterator-next', 1)
    drawDiagram.connectJsonbIteratorNext(Reveal, jsPlumb)
  }
  if (jsonbDiagram === 'connectJsonbValue2jsonb') {
    drawDiagram.connectJsonbValue2jsonb(Reveal, jsPlumb)
  }
  if (jsonbDiagram === 'pushJsonbValue') {
    document.documentElement.style.setProperty('--jsonb-diagram__push-jsonb-value', 1)
    drawDiagram.pushJsonbValue(Reveal, jsPlumb)
  }
  if (jsonbDiagram === 'drawAll') {
    document.documentElement.style.setProperty('--jsonb-diagram__push-jsonb-value', 1)
    document.documentElement.style.setProperty('--jsonb-diagram__jsonb-iterator-next', 1)
    drawDiagram.drawDiagram(Reveal, jsPlumb)
  }
})

Reveal.addEventListener('fragmenthidden', function (event) {
  var jsonbDiagram = event.fragment.getAttribute('jsonb-diagram')
  if (jsonbDiagram) {
    document.documentElement.style.setProperty('--jsonb-diagram__push-jsonb-value', 0)
    document.documentElement.style.setProperty('--jsonb-diagram__jsonb-iterator-next', 0)
  }
  if (jsonbDiagram === 'connectJsonbJsonbIterator') {
    drawDiagram.connectJsonbJsonbIterator(Reveal, jsPlumb)
  }

  if (jsonbDiagram === 'connectJsonbIteratorNext') {
    document.documentElement.style.setProperty('--jsonb-diagram__jsonb-iterator-next', 1)
    drawDiagram.connectJsonbIteratorNext(Reveal, jsPlumb)
  }
  if (jsonbDiagram === 'connectJsonbValue2jsonb') {
    drawDiagram.connectJsonbValue2jsonb(Reveal, jsPlumb)
  }
  if (jsonbDiagram === 'pushJsonbValue') {
    document.documentElement.style.setProperty('--jsonb-diagram__push-jsonb-value', 1)
    drawDiagram.pushJsonbValue(Reveal, jsPlumb)
  }
  if (jsonbDiagram === 'drawAll') {
    document.documentElement.style.setProperty('--jsonb-diagram__push-jsonb-value', 1)
    document.documentElement.style.setProperty('--jsonb-diagram__jsonb-iterator-next', 1)
    drawDiagram.drawDiagram(Reveal, jsPlumb)
  }
})

Reveal.addEventListener('slidechanged', function (event) {
  console.log(event)
  if (event.previousSlide.getAttribute('jsonb-diagram')) {
    drawDiagram.clean(Reveal, jsPlumb)
    document.documentElement.style.setProperty('--jsonb-diagram__push-jsonb-value', 0)
    document.documentElement.style.setProperty('--jsonb-diagram__jsonb-iterator-next', 0)
  }
})
