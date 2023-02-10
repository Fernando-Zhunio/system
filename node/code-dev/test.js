var data = require('./files.json');
var fs = require('fs');

var path = 'C:/laragon/www/novisolutionsV14/node/code-dev/test/file-test.js'
// Path: node\code-dev\test\file-test.js
fs.readFile(path, 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    var regex = /(\/\*\* start-dev \*\/)[\s\S]*?(\/\*\* end-dev \*\/)/gm;
    console.log(data.match(regex));
    var result = regex.test(data)

    

    console.log(result);
});
