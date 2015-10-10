var fs = require('fs'),
    path = require('path'),
    nameList = [];

module.exports = {
  selector: '.source.text.html.htmlbars',
  filterSuggestions: true,
  inclusionPriority: 100,

  getSuggestions: function(request) {
      var suggestion = {
        text: 'asdfdasfsad',
        displayText: 'fav'
      };

      return suggestion;
  },

  getNames: function() {
    console.log('asdf');
    return ['asdf', 'qwerty'];
  }
};
