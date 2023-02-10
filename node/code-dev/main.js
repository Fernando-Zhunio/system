"use strict";
exports.__esModule = true;
exports.CodeDev = void 0;
var environment = require("./files.json");
var fs = require("fs");
var CodeDev = /** @class */ (function () {
    function CodeDev() {
        this.files = environment.files;
        console.log(this.files);
    }
    CodeDev.prototype.removeCode = function (path, encoding) {
        var _this = this;
        fs.readFile(path, { encoding: encoding }, function (err, data) { _this.readFileCb(path, err, data); });
    };
    CodeDev.prototype.removeCodeFromFiles = function () {
        var _this = this;
        this.files.forEach(function (file) {
            _this.removeCode(file, CodeDev.encoding);
        });
    };
    CodeDev.prototype.readFileCb = function (path, err, data) {
        if (err) {
            console.log(err);
            throw err;
        }
        var extension = this.getExtensionFile(path);
        console.log(extension);
        if (extension === undefined) {
            throw new Error('Extension not found for file: ' + path);
        }
        if (!this.includeExtension(extension)) {
            throw new Error('Extension not included for file: ' + path);
        }
        var regex = this.getRegexForExtension(extension);
        console.log(regex);
        var replace = data.replaceAll(regex, '');
        fs.writeFile(path, replace, this.writeFileCb);
    };
    CodeDev.prototype.getExtensionFile = function (path) {
        return path.split('.').pop();
    };
    CodeDev.prototype.getRegexForExtension = function (extension) {
        switch (extension) {
            case 'html':
                return regexForExtensions.html;
            default:
                return regexForExtensions["default"];
        }
    };
    CodeDev.prototype.writeFileCb = function (err) {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log('File is created successfully.');
    };
    CodeDev.prototype.includeExtension = function (extension) {
        return extensions.includes(extension);
    };
    CodeDev.startLine = '/** start-dev */';
    CodeDev.endLine = '/** end-dev */';
    CodeDev.encoding = 'utf8';
    return CodeDev;
}());
exports.CodeDev = CodeDev;
var extensions = ['ts', 'html', 'scss', 'json', 'js', 'css', 'md', 'txt'];
var regexForExtensions = {
    "default": /(\/\*\* start-dev \*\/)[\s\S]*?(\/\*\* end-dev \*\/)/gm,
    'html': /(<!-- start-dev -->)[\s\S]*?(<!-- end-dev -->)/gm
};
var codeDev = new CodeDev();
codeDev.removeCodeFromFiles();
