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
    { src: 'node_modules/reveal.js/plugin/markdown/marked.js' },
    { src: 'node_modules/reveal.js/plugin/markdown/markdown.js' },
    { src: 'node_modules/reveal.js/plugin/notes/notes.js', async: true },
    {
      src: 'plugin/highlight/highlight.js',
      async: true,
      callback: function () {
        hljs.initHighlightingOnLoad()
      }
    }
  ]
})
Reveal.addEventListener('ready', function () {
  jsPlumb.ready(function () {
    Reveal.addEventListener('slidechanged', function (event) {
      if (event.indexh === 8) {
        drawDiagram(Reveal, jsPlumb)
      }
      console.log(event)
    })
  })
})
Reveal.addEventListener('ready', function () {
  Reveal.slide(0)
  jsPlumb.ready(function () {
    
  })
})
