var fs = require('fs'),
    path = require('path'),
    nameList = [],
    Atom = require('atom');


module.exports = {
  selector: '.text.html.htmlbars',
  filterSuggestions: true,
  inclusionPriority: 100,

  getSuggestions: function(request) {
    var self = this;
    return new Promise(function(resolve, reject) {
      self.generateSnippets();
      var suggestions = [];
      nameList.forEach(function(n) {
        var suggest = {
          text: n,
          displayText: n,
          type: 'snippet'
        };

        suggestions.push(suggest);
      });
      resolve(suggestions);
    });
  },
  generateSnippets: function() {
    this.readTree('components');
    this.readTree('helpers');
  },
  readTree: function(type) {
    var self = this,
        projects = atom.project.getPaths();

      var ext, folder;
      if (type === 'components') {
        ext = '.hbs';
        folder = path.sep+'templates'+path.sep+'components';
      } else {
        ext = '.js';
        folder = path.sep+'helpers';
      }

    projects.forEach(function(p) {
      if (self.checkExistance(p + path.sep + 'app')) {
        self.parseFiles(p + path.sep + 'app'+folder, ext);
      }
    });
  },
  parseFiles: function(dir, ext) {
    var self = this;


    fs.readdir(dir, function(err, files) {
       if (err) {
         console.error(err);
         return false;
       }

      files.forEach(function(f) {
        var name = path.basename(f, ext),
            pathArr = dir.split(path.sep);

        if (path.extname(f) === ext && nameList.indexOf(name) === -1) {
          nameList.push(name);
        } else if (self.checkExistance(dir+path.sep+f)) {
          self.parseFiles(dir + path.sep + f, '.hbs');
        }
      });
    });

  },
  checkExistance: function(dir) {
    try {
      var stats = fs.statSync(dir);
      if (stats.isDirectory()) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }

  }
};
