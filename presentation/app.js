require('reveal.js/lib/js/head.min.js')
const Reveal = require('reveal.js')
window.Reveal = Reveal
Reveal.initialize({
  dependencies: [
    { src: 'node_modules/reveal.js/plugin/markdown/marked.js' },
    { src: 'node_modules/reveal.js/plugin/markdown/markdown.js' },
    { src: 'node_modules/reveal.js/plugin/notes/notes.js', async: true }/*,
    {
      src: 'plugin/highlight/highlight.js',
      async: true,
      callback: function () {
        window.hljs.initHighlightingOnLoad()
      }
    }*/
  ]
})
