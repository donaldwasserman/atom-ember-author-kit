var fs = require('fs'),
    path = require('path'),
    nameList = [];

module.exports = {
  selector: '.text.html.htmlbars',
  filterSuggestions: true,
  inclusionPriority: 100,

  getSuggestions: function(request) {
    var self = this;
    console.log(nameList);
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
    this.readTree('app/components');
    this.readTree('app/helpers');
  },
  readTree: function(dir) {
    var self = this,
        tree = atom.project.rootDirectories[0].path + '/',
        folder = tree + dir;

    if (this.checkExistance(folder)) {
      fs.readdir(folder, function(err, files) {
        if (err) {
          console.error(err);
        }

        files.forEach(function(f) {
          var name = path.basename(f, '.js'),
              pathArr = folder.split(path.sep);

          if (path.extname(f) === '.js' && nameList.indexOf(name) < 0) {
            var start = pathArr.indexOf('components'),
                end = pathArr.length;

            if (start !== end) {
              var component = '';

              for (var i = start+1; i < pathArr.length; i++) {
                component += pathArr[i] + '/';
              }

              nameList.push(component + name);

            } else {
              nameList.push(name);
            }

          } else if (self.checkExistance(tree+dir + '/' + f)) {
            self.readTree(dir + '/'+ f);
          }
        });
      });
    } else {
      return;
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
      console.log(e);
      return false;
    }

  }
};
