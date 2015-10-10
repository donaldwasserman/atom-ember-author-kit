fs = require 'fs'
path = require 'path'

module.exports =
  selector: '.source.text.html.htmlbars'
  filterSuggestions: true
  inclusionPriority: 1

  getSuggestions: (request) ->
    new Promise(resolve) ->
      suggestion =
        text: 'asdf',
        displayText: 'my custom text',
        type: 'tag'

      resolve([suggestion])
