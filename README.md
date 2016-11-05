#Ember Authoring Tools for CLI Projects

This package adds Ember-specific HTMLBars functionality for the Atom text editor, including:

- HTMLBars syntax highlights (Improvements based on https://atom.io/packages/language-ember-htmlbars)
- HTMLBars Ember 2.0 default helpers
- Autocomplete generated from `components` and `helpers` folders
- Misc Ember-flavored javascript snippets

###Snippet Guide

####HMTLBars

**See `snippets/language-ember-htmlbars.cson` for full syntax details**

| Prefix | Description          |
| ------------- | ----------- |
| if      | `{{#if}}...{{/if}}`|
| ife     | `{{#if}}...{{else}}..{/if}` |
| unless     | `{{#unless}}..{{/unless}}` |
| ema     | `{{action}}` |
| ifl | `{{if .. ...}}` |
| elsif | `{{else if .. ...}}` |
| lt  | `{{#link-to...}}` |
| each | `{{#each model as |param |}}` |
| input | `{{input type='vals'}}` |
| textarea | `{{textarea....}}` |
| em get | `{{get model...prop}}` |
| each-in | {{#each in model as param ....}} |


###Other Projects

Other Ember + Atom projects:

- [Ember Tabs](https://atom.io/packages/ember-tabs)
- [Ember CLI Helper](https://atom.io/packages/ember-cli-helper)
- [Ember ES6 Snipetts](https://atom.io/packages/ember-snippets)
