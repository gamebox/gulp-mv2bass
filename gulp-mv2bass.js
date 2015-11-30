var htmlparser = require('htmlparser2');
var _ = require('lodash');
var PluginError = require('gulp-util').PluginError;
var through = require('through2');
var PLUGIN_NAME = 'gulp-mv2bass';

module.exports = function(rules) {
  function transform(file, enc, cb) {
    var newFileString = (function() {
      var builder = '';
      return {
	append: function(chunk) { builder += chunk; },
        contents: function() { return builder; }
      }
    })();

    var lookupClass = function(name) {
      try {
        return rules[name];
      } catch(e) {
        throw new Error('Rule for ' + name + ' not defined!');
      }
    };

    var Parser = new htmlparser.Parser({
      onopentag: function(name, attrs) {
        if(attrs['class'] && attrs['class'][0] === '@') {
          attrs['class'] = lookupClass(attrs['class'].slice(1));
        }
        var tagbuilder = '<' + name;
        _.forOwn(attrs, function(value, key) {
          tagbuilder += ' ' + key + '="' + value + '"';
        });
        tagbuilder += '>';
        newFileString.append(tagbuilder);
      },
      ontext: function(text) { newFileString.append(text) },
      onclosetag: function(name) {
        newFileString.append('</' + name + '>');
      },
      onerror: function(err) {
        return cb(new PluginError(PLUGIN_NAME, err));
      },
      onend: function() {
        file.contents = new Buffer(newFileString.contents());
        return cb(null, file);
      }
    }, {
      decodeEntities: true
    });

    Parser.write(file.contents.toString('utf8'));
    Parser.done();
  }

  return through.obj(transform);
};
