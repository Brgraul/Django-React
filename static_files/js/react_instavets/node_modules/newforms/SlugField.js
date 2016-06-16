'use strict';

var validators = require('validators')

var CharField = require('./CharField')

var $__0=  require('./util'),strip=$__0.strip

/**
 * Validates that its input is a valid slug.
 * @constructor
 * @extends {CharField}
 * @param {Object=} kwargs
 */
var SlugField = CharField.extend({
  defaultValidators: [validators.validateSlug]
, constructor: function SlugField(kwargs) {
    if (!(this instanceof SlugField)) { return new SlugField(kwargs) }
    CharField.call(this, kwargs)
  }
})

SlugField.prototype.clean = function(value) {
  value = strip(this.toJavaScript(value))
  return CharField.prototype.clean.call(this, value)
}

module.exports = SlugField