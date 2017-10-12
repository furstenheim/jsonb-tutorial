const ghPages = require('gh-pages')
ghPages.publish('./', {
  src: ['bundle.js', 'node_modules/reveal.js/**.*', 'node_modules/font-awesome/**.*', 'index.html', 'resources/**.*']
}, function (err, a) {
  console.log(err, a)
})
