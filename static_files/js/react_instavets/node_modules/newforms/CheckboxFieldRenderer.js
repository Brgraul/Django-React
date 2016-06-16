'use strict';

var CheckboxChoiceInput = require('./CheckboxChoiceInput')
var ChoiceFieldRenderer = require('./ChoiceFieldRenderer')

var CheckboxFieldRenderer = ChoiceFieldRenderer.extend({
  constructor: function CheckboxFieldRenderer(name, value, attrs, controlled, choices) {
    if (!(this instanceof CheckboxFieldRenderer)) {
      return new CheckboxFieldRenderer(name, value, attrs, controlled, choices)
    }
    ChoiceFieldRenderer.apply(this, arguments)
  }
, choiceInputConstructor: CheckboxChoiceInput
})

module.exports = CheckboxFieldRenderer