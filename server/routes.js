var express = require('express'),
    router = express.Router();

var fs = require('fs'),
    path = require('path');

router.get('/', function(req, res) {
  res.render('index');
});

router.post('/trees', function(req, res) {
  var dir = req.body.dir.trim() ? req.body.dir : process.cwd() + '/';

  var html = ['<ul class="jqueryFileTree" style="display: none;">'];

  var dirHtml = [],
      fileHtml = [];

  try {
    var files = fs.readdirSync(dir);

    files.forEach(function (file) {
      var path = dir + file,
          stat = fs.statSync(path);

      if (stat.isDirectory()) { 
        dirHtml = dirHtml.concat([
          '<li class="directory collapsed">',
          '<a href="#" rel="', path, '/">', file, '</a>',
          '</li>'
        ]);
      } else {
        fileHtml = fileHtml.concat([
          '<li class="file ext_', file.split('.')[1], '">',
          '<a target="main" href="/files?path=', path, '">', file, '</a>',
          '</li>'
        ]);
      }
    });

    html = html.concat(dirHtml, fileHtml);
    html.push('</ul>');
  } catch(e) {
    html = html.concat(['Could not load directory: ', dir, '</ul>']);
  }

  res.send(html.join(''));
});

router.get('/files', function(req, res) {
  res.sendFile(req.query.path);
});

module.exports = router;