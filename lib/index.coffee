provider = require './provider'

module.exports =
  activate: -> provider.generateSnippets()

  provide: -> provider
