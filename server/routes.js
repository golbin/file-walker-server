var express = require('express'),
    router = express.Router();

var fs = require('fs'),
    path = require('path');

var rootDir = process.cwd(),
    rootDirLength = rootDir.length;

router.get('/', function(req, res) {
  res.render('index');
});

router.post('*', function(req, res) {
  var dir = req.body.dir.trim() ? rootDir + req.body.dir : rootDir + '/';

  var html = ['<ul class="jqueryFileTree" style="display: none;">'];

  var dirHtml = [],
      fileHtml = [];

  try {
    var files = fs.readdirSync(dir);

    files.forEach(function (file) {
      var path = dir + file,
          altPath = dir.slice(rootDirLength) + file,
          stat = fs.statSync(path);

      if (stat.isDirectory()) { 
        dirHtml = dirHtml.concat([
          '<li class="directory collapsed">',
          '<a href="#" rel="', altPath, '/">', file, '</a>',
          '</li>'
        ]);
      } else {
        fileHtml = fileHtml.concat([
          '<li class="file ext_', file.split('.')[1], '">',
          '<a target="main" href="', altPath, '">', file, '</a>',
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

router.get('*', function(req, res) {
  fullPath = rootDir + req.path;
  console.log(fullPath);
  res.sendFile(fullPath);
});

module.exports = router;