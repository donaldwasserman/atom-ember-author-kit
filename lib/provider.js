var fs = require('fs'),
    path = require('path'),
    nameList = [];

module.exports = {
  selector: '.text.html.htmlbars',
  filterSuggestions: true,
  inclusionPriority: 100,

  getSuggestions: function(request) {
    return new Promise(function(resolve, reject) {
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
  readTree: function(dir) {
    var self = this,
        tree = atom.project.rootDirectories[0].path + '/',
        folder = tree + dir;

    if (this.checkExistance(folder)) {
      fs.readdir(folder, function(err, files){
        files.forEach(function(f) {
          if (path.extname(f) === '.js') {
            nameList.push(path.basename(f, '.js'));
          } else if (self.checkExistance(f)) {
            self.readTree(dir + '/' + f);
          }
        });
      });
    }
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
      return false;
    }

  }
};
