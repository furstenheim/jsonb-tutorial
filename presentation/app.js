require('reveal.js/lib/js/head.min.js')
const Reveal = require('reveal.js')
window.Reveal = Reveal
const hljs = require('reveal.js/plugin/highlight/highlight-origin.js')
require('reveal.js/plugin/highlight/highlight.js')

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
  Reveal.slide(7)
  jsPlumb.ready(function () {
    var common = {
      connector: ["Straight"],
      anchor: ["Left", "Right"],
      endpoint:"Dot"
    }
    jsPlumb.connect({
      source:"item_left",
      target:"item_right",
      overlays:[ ["Arrow" , { width:12, length:12, location:0.67 }] ]
    }, common)
  })
})
