/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var forms = __webpack_require__(1);
	__webpack_require__(130);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var validators = __webpack_require__(2)

	var locales = __webpack_require__(13)
	var util = __webpack_require__(15)

	module.exports = {
	  addLocale: locales.addLocale
	, allValid: util.allValid
	, BaseTemporalField: __webpack_require__(18)
	, BooleanField: __webpack_require__(62)
	, BoundField: __webpack_require__(64)
	, CharField: __webpack_require__(66)
	, CheckboxChoiceInput: __webpack_require__(69)
	, CheckboxFieldRenderer: __webpack_require__(71)
	, CheckboxInput: __webpack_require__(63)
	, CheckboxSelectMultiple: __webpack_require__(73)
	, ChoiceField: __webpack_require__(77)
	, ChoiceFieldRenderer: __webpack_require__(72)
	, ChoiceInput: __webpack_require__(70)
	, ClearableFileInput: __webpack_require__(78)
	, ComboField: __webpack_require__(80)
	, DateField: __webpack_require__(81)
	, DateInput: __webpack_require__(82)
	, DateTimeBaseInput: __webpack_require__(83)
	, DateTimeField: __webpack_require__(84)
	, DateTimeInput: __webpack_require__(85)
	, DecimalField: __webpack_require__(86)
	, EmailField: __webpack_require__(89)
	, EmailInput: __webpack_require__(90)
	, env: __webpack_require__(68)
	, ErrorList: __webpack_require__(91)
	, ErrorObject: __webpack_require__(92)
	, Field: __webpack_require__(20)
	, FileField: __webpack_require__(93)
	, FileInput: __webpack_require__(79)
	, FilePathField: __webpack_require__(94)
	, FloatField: __webpack_require__(95)
	, Form: __webpack_require__(96)
	, formats: __webpack_require__(19)
	, FormRow: __webpack_require__(101)
	, FormSet: __webpack_require__(103)
	, GenericIPAddressField: __webpack_require__(105)
	, getFormData: util.getFormData
	, HiddenInput: __webpack_require__(21)
	, ImageField: __webpack_require__(106)
	, Input: __webpack_require__(22)
	, IntegerField: __webpack_require__(87)
	, IPAddressField: __webpack_require__(107)
	, isFormAsync: __webpack_require__(104)
	, locales: locales
	, MultipleChoiceField: __webpack_require__(108)
	, MultipleFileField: __webpack_require__(100)
	, MultipleHiddenInput: __webpack_require__(109)
	, MultiValueField: __webpack_require__(110)
	, MultiWidget: __webpack_require__(111)
	, NullBooleanField: __webpack_require__(112)
	, NullBooleanSelect: __webpack_require__(113)
	, NumberInput: __webpack_require__(88)
	, PasswordInput: __webpack_require__(67)
	, RadioChoiceInput: __webpack_require__(114)
	, RadioFieldRenderer: __webpack_require__(115)
	, RadioSelect: __webpack_require__(116)
	, RegexField: __webpack_require__(117)
	, RendererMixin: __webpack_require__(74)
	, RenderForm: __webpack_require__(118)
	, RenderFormSet: __webpack_require__(119)
	, Select: __webpack_require__(76)
	, SelectMultiple: __webpack_require__(75)
	, setDefaultLocale: locales.setDefaultLocale
	, SlugField: __webpack_require__(120)
	, SplitDateTimeField: __webpack_require__(121)
	, SplitDateTimeWidget: __webpack_require__(122)
	, SplitHiddenDateTimeWidget: __webpack_require__(124)
	, SubWidget: __webpack_require__(60)
	, Textarea: __webpack_require__(65)
	, TextInput: __webpack_require__(61)
	, TimeField: __webpack_require__(125)
	, TimeInput: __webpack_require__(123)
	, TypedChoiceField: __webpack_require__(126)
	, TypedMultipleChoiceField: __webpack_require__(127)
	, URLField: __webpack_require__(128)
	, util: util
	, validateAll: util.validateAll
	, ValidationError: validators.ValidationError
	, validators: validators
	, Widget: __webpack_require__(59)
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// HACK: requiring './validators' here makes the circular import in ipv6.js work
	//       after browserification.
	module.exports = __webpack_require__(3)

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Concur = __webpack_require__(4)
	var is = __webpack_require__(5)
	var object = __webpack_require__(6)
	var punycode = __webpack_require__(7)
	var url = __webpack_require__(9)

	var errors = __webpack_require__(10)
	var ipv6 = __webpack_require__(12)

	var ValidationError = errors.ValidationError
	var isValidIPv6Address = ipv6.isValidIPv6Address

	var EMPTY_VALUES = [null, undefined, '']

	function String_rsplit(str, sep, maxsplit) {
	  var split = str.split(sep)
	  return maxsplit ? [split.slice(0, -maxsplit).join(sep)].concat(split.slice(-maxsplit)) : split
	}

	/**
	 * Validates that input matches a regular expression.
	 */
	var RegexValidator = Concur.extend({
	  constructor: function(kwargs) {
	    if (!(this instanceof RegexValidator)) { return new RegexValidator(kwargs) }
	    kwargs = object.extend({
	      regex: null, message: null, code: null, inverseMatch: null
	    }, kwargs)
	    if (kwargs.regex) {
	      this.regex = kwargs.regex
	    }
	    if (kwargs.message) {
	      this.message = kwargs.message
	    }
	    if (kwargs.code) {
	      this.code = kwargs.code
	    }
	    if (kwargs.inverseMatch) {
	      this.inverseMatch = kwargs.inverseMatch
	    }
	    // Compile the regex if it was not passed pre-compiled
	    if (is.String(this.regex)) {
	      this.regex = new RegExp(this.regex)
	    }
	    return this.__call__.bind(this)
	  }
	, regex: ''
	, message: 'Enter a valid value.'
	, code: 'invalid'
	, inverseMatch: false
	, __call__: function(value) {
	    if (this.inverseMatch === this.regex.test(''+value)) {
	      throw ValidationError(this.message, {code: this.code})
	    }
	  }
	})

	/**
	 * Validates that input looks like a valid URL.
	 */
	var URLValidator = RegexValidator.extend({
	  regex: new RegExp(
	    '^(?:[a-z0-9\\.\\-]*)://'                         // schema is validated separately
	  + '(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\\.)+(?:[A-Z]{2,6}\\.?|[A-Z0-9-]{2,}\\.?)|' // Domain...
	  + 'localhost|'                                      // localhost...
	  + '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|'      // ...or IPv4
	  + '\\[?[A-F0-9]*:[A-F0-9:]+\\]?)'                   // ...or IPv6
	  + '(?::\\d+)?'                                      // Optional port
	  + '(?:/?|[/?]\\S+)$'
	  , 'i'
	  )
	, message: 'Enter a valid URL.'
	, schemes: ['http', 'https', 'ftp', 'ftps']

	, constructor:function(kwargs) {
	    if (!(this instanceof URLValidator)) { return new URLValidator(kwargs) }
	    kwargs = object.extend({schemes: null}, kwargs)
	    RegexValidator.call(this, kwargs)
	    if (kwargs.schemes !== null) {
	      this.schemes = kwargs.schemes
	    }
	    return this.__call__.bind(this)
	  }

	, __call__: function(value) {
	    value = ''+value
	    // Check if the scheme is valid first
	    var scheme = value.split('://')[0].toLowerCase()
	    if (this.schemes.indexOf(scheme) === -1) {
	      throw ValidationError(this.message, {code: this.code})
	    }

	    // Check the full URL
	    try {
	      RegexValidator.prototype.__call__.call(this, value)
	    }
	    catch (e) {
	      if (!(e instanceof ValidationError)) { throw e }

	      // Trivial case failed - try for possible IDN domain
	      var urlFields = url.parseUri(value)
	      try {
	        urlFields.host = punycode.toASCII(urlFields.host)
	      }
	      catch (unicodeError) {
	        throw e
	      }
	      value = url.makeUri(urlFields)
	      RegexValidator.prototype.__call__.call(this, value)
	    }
	  }
	})

	/** Validates that input looks like a valid e-mail address. */
	var EmailValidator = Concur.extend({
	  message: 'Enter a valid email address.'
	, code: 'invalid'
	, userRegex: new RegExp(
	    "(^[-!#$%&'*+/=?^_`{}|~0-9A-Z]+(\\.[-!#$%&'*+/=?^_`{}|~0-9A-Z]+)*$"                                 // Dot-atom
	  + '|^"([\\001-\\010\\013\\014\\016-\\037!#-\\[\\]-\\177]|\\\\[\\001-\\011\\013\\014\\016-\\177])*"$)' // Quoted-string
	  , 'i')
	, domainRegex: new RegExp(
	    '^(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\\.)+(?:[A-Z]{2,6}|[A-Z0-9-]{2,})$'          // Domain
	  + '|^\\[(25[0-5]|2[0-4]\\d|[0-1]?\\d?\\d)(\\.(25[0-5]|2[0-4]\\d|[0-1]?\\d?\\d)){3}\\]$' // Literal form, ipv4 address (SMTP 4.1.3)
	  , 'i')
	, domainWhitelist: ['localhost']

	, constructor: function(kwargs) {
	    if (!(this instanceof EmailValidator)) { return new EmailValidator(kwargs) }
	    kwargs = object.extend({message: null, code: null, whitelist: null}, kwargs)
	    if (kwargs.message !== null) {
	      this.message = kwargs.message
	    }
	    if (kwargs.code !== null) {
	      this.code = kwargs.code
	    }
	    if (kwargs.whitelist !== null) {
	      this.domainWhitelist = kwargs.whitelist
	    }
	    return this.__call__.bind(this)
	  }

	, __call__ : function(value) {
	    value = ''+value

	    if (!value || value.indexOf('@') == -1) {
	      throw ValidationError(this.message, {code: this.code})
	    }

	    var parts = String_rsplit(value, '@', 1)
	    var userPart = parts[0]
	    var domainPart = parts[1]

	    if (!this.userRegex.test(userPart)) {
	      throw ValidationError(this.message, {code: this.code})
	    }

	    if (this.domainWhitelist.indexOf(domainPart) == -1 &&
	        !this.domainRegex.test(domainPart)) {
	      // Try for possible IDN domain-part
	      try {
	        domainPart = punycode.toASCII(domainPart)
	        if (this.domainRegex.test(domainPart)) {
	          return
	        }
	      }
	      catch (unicodeError) {
	        // Pass through to throw the ValidationError
	      }
	      throw ValidationError(this.message, {code: this.code})
	    }
	  }
	})

	var validateEmail = EmailValidator()

	var SLUG_RE = /^[-a-zA-Z0-9_]+$/
	/** Validates that input is a valid slug. */
	var validateSlug = RegexValidator({
	  regex: SLUG_RE
	, message: 'Enter a valid "slug" consisting of letters, numbers, underscores or hyphens.'
	, code: 'invalid'
	})

	var IPV4_RE = /^(25[0-5]|2[0-4]\d|[0-1]?\d?\d)(\.(25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}$/
	/** Validates that input is a valid IPv4 address. */
	var validateIPv4Address = RegexValidator({
	  regex: IPV4_RE
	, message: 'Enter a valid IPv4 address.'
	, code: 'invalid'
	})

	/** Validates that input is a valid IPv6 address. */
	function validateIPv6Address(value) {
	  if (!isValidIPv6Address(value)) {
	    throw ValidationError('Enter a valid IPv6 address.', {code: 'invalid'})
	  }
	}

	/** Validates that input is a valid IPv4 or IPv6 address. */
	function validateIPv46Address(value) {
	  try {
	    validateIPv4Address(value)
	  }
	  catch (e) {
	    if (!(e instanceof ValidationError)) { throw e }
	    try {
	      validateIPv6Address(value)
	    }
	    catch (e) {
	      if (!(e instanceof ValidationError)) { throw e }
	      throw ValidationError('Enter a valid IPv4 or IPv6 address.',
	                            {code: 'invalid'})
	    }
	  }
	}

	var ipAddressValidatorLookup = {
	  both: {validators: [validateIPv46Address], message: 'Enter a valid IPv4 or IPv6 address.'}
	, ipv4: {validators: [validateIPv4Address], message: 'Enter a valid IPv4 address.'}
	, ipv6: {validators: [validateIPv6Address], message: 'Enter a valid IPv6 address.'}
	}

	/**
	 * Depending on the given parameters returns the appropriate validators for
	 * a GenericIPAddressField.
	 */
	function ipAddressValidators(protocol, unpackIPv4) {
	  if (protocol != 'both' && unpackIPv4) {
	    throw new Error('You can only use unpackIPv4 if protocol is set to "both"')
	  }
	  protocol = protocol.toLowerCase()
	  if (typeof ipAddressValidatorLookup[protocol] == 'undefined') {
	    throw new Error('The protocol "' + protocol +'" is unknown')
	  }
	  return ipAddressValidatorLookup[protocol]
	}

	var COMMA_SEPARATED_INT_LIST_RE = /^[\d,]+$/
	/** Validates that input is a comma-separated list of integers. */
	var validateCommaSeparatedIntegerList = RegexValidator({
	  regex: COMMA_SEPARATED_INT_LIST_RE
	, message: 'Enter only digits separated by commas.'
	, code: 'invalid'
	})

	/**
	 * Base for validators which compare input against a given value.
	 */
	var BaseValidator = Concur.extend({
	  constructor: function(limitValue) {
	    if (!(this instanceof BaseValidator)) { return new BaseValidator(limitValue) }
	    this.limitValue = limitValue
	    return this.__call__.bind(this)
	  }
	, compare: function(a, b) { return a !== b }
	, clean: function(x) { return x }
	, message: 'Ensure this value is {limitValue} (it is {showValue}).'
	, code: 'limitValue'
	, __call__: function(value) {
	    var cleaned = this.clean(value)
	    var params = {limitValue: this.limitValue, showValue: cleaned}
	    if (this.compare(cleaned, this.limitValue)) {
	      throw ValidationError(this.message, {code: this.code, params: params})
	    }
	  }
	})

	/**
	 * Validates that input is less than or equal to a given value.
	 */
	var MaxValueValidator = BaseValidator.extend({
	  constructor: function(limitValue) {
	    if (!(this instanceof MaxValueValidator)) { return new MaxValueValidator(limitValue) }
	    return BaseValidator.call(this, limitValue)
	  }
	, compare: function(a, b) { return a > b }
	, message: 'Ensure this value is less than or equal to {limitValue}.'
	, code: 'maxValue'
	})

	/**
	 * Validates that input is greater than or equal to a given value.
	 */
	var MinValueValidator = BaseValidator.extend({
	  constructor: function(limitValue) {
	    if (!(this instanceof MinValueValidator)) { return new MinValueValidator(limitValue) }
	    return BaseValidator.call(this, limitValue)
	  }
	, compare: function(a, b) { return a < b }
	, message: 'Ensure this value is greater than or equal to {limitValue}.'
	, code: 'minValue'
	})

	/**
	 * Validates that input is at least a given length.
	 */
	var MinLengthValidator = BaseValidator.extend({
	  constructor: function(limitValue) {
	    if (!(this instanceof MinLengthValidator)) { return new MinLengthValidator(limitValue) }
	    return BaseValidator.call(this, limitValue)
	  }
	, compare: function(a, b) { return a < b }
	, clean: function(x) { return x.length }
	, message: 'Ensure this value has at least {limitValue} characters (it has {showValue}).'
	, code: 'minLength'
	})

	/**
	 * Validates that input is at most a given length.
	 */
	var MaxLengthValidator = BaseValidator.extend({
	  constructor: function(limitValue) {
	    if (!(this instanceof MaxLengthValidator)) { return new MaxLengthValidator(limitValue) }
	    return BaseValidator.call(this, limitValue)
	  }
	, compare: function(a, b) { return a > b }
	, clean: function(x) { return x.length }
	, message: 'Ensure this value has at most {limitValue} characters (it has {showValue}).'
	, code: 'maxLength'
	})

	module.exports = {
	  EMPTY_VALUES: EMPTY_VALUES
	, RegexValidator: RegexValidator
	, URLValidator: URLValidator
	, EmailValidator: EmailValidator
	, validateEmail: validateEmail
	, validateSlug: validateSlug
	, validateIPv4Address: validateIPv4Address
	, validateIPv6Address: validateIPv6Address
	, validateIPv46Address: validateIPv46Address
	, ipAddressValidators: ipAddressValidators
	, validateCommaSeparatedIntegerList: validateCommaSeparatedIntegerList
	, BaseValidator: BaseValidator
	, MaxValueValidator: MaxValueValidator
	, MinValueValidator: MinValueValidator
	, MaxLengthValidator: MaxLengthValidator
	, MinLengthValidator: MinLengthValidator
	, ValidationError: ValidationError
	, ipv6: ipv6
	}


/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	var hasOwn = Object.prototype.hasOwnProperty
	var toString = Object.prototype.toString

	function type(obj) {
	  return toString.call(obj).slice(8, -1).toLowerCase()
	}

	function inherits(childConstructor, parentConstructor) {
	  var F = function() {}
	  F.prototype = parentConstructor.prototype
	  childConstructor.prototype = new F()
	  childConstructor.prototype.constructor = childConstructor
	  return childConstructor
	}

	function extend(dest, src) {
	  for (var prop in src) {
	    if (hasOwn.call(src, prop)) {
	      dest[prop] = src[prop]
	    }
	  }
	  return dest
	}

	/**
	 * Mixes in properties from one object to another. If the source object is a
	 * Function, its prototype is mixed in instead.
	 */
	function mixin(dest, src) {
	  if (type(src) == 'function') {
	    extend(dest, src.prototype)
	  }
	  else {
	    extend(dest, src)
	  }
	}

	/**
	 * Applies mixins specified as a __mixins__ property on the given properties
	 * object, returning an object containing the mixed in properties.
	 */
	function applyMixins(properties) {
	  var mixins = properties.__mixins__
	  if (type(mixins) != 'array') {
	    mixins = [mixins]
	  }
	  var mixedProperties = {}
	  for (var i = 0, l = mixins.length; i < l; i++) {
	    mixin(mixedProperties, mixins[i])
	  }
	  delete properties.__mixins__
	  return extend(mixedProperties, properties)
	}

	/**
	 * Inherits another constructor's prototype and sets its prototype and
	 * constructor properties in one fell swoop.
	 *
	 * If a child constructor is not provided via prototypeProps.constructor,
	 * a new constructor will be created.
	 */
	function inheritFrom(parentConstructor, childConstructor, prototypeProps, constructorProps) {
	  // Create a child constructor if one wasn't given
	  if (childConstructor == null) {
	    childConstructor = function() {
	      parentConstructor.apply(this, arguments)
	    }
	  }

	  // Make sure the new prototype has the correct constructor set up
	  prototypeProps.constructor = childConstructor

	  // Base constructors should only have the properties they're defined with
	  if (parentConstructor !== Concur) {
	    // Inherit the parent's prototype
	    inherits(childConstructor, parentConstructor)
	    childConstructor.__super__ = parentConstructor.prototype
	  }

	  // Add prototype properties - this is why we took a copy of the child
	  // constructor reference in extend() - if a .constructor had been passed as a
	  // __mixins__ and overitten prototypeProps.constructor, these properties would
	  // be getting set on the mixed-in constructor's prototype.
	  extend(childConstructor.prototype, prototypeProps)

	  // Add constructor properties
	  extend(childConstructor, constructorProps)

	  return childConstructor
	}

	/**
	 * Namespace and dummy constructor for initial extension.
	 */
	var Concur = module.exports = function() {}

	/**
	 * Details of a constructor's inheritance chain - Concur just facilitates sugar
	 * so we don't include it in the initial chain. Arguably, Object.prototype could
	 * go here, but it's just not that interesting.
	 */
	Concur.__mro__ = []

	/**
	 * Creates or uses a child constructor to inherit from the the call
	 * context, which is expected to be a constructor.
	 */
	Concur.extend = function(prototypeProps, constructorProps) {
	  // Ensure we have prop objects to work with
	  prototypeProps = prototypeProps || {}
	  constructorProps = constructorProps || {}

	  // If the constructor being inherited from has a __meta__ function somewhere
	  // in its prototype chain, call it to customise prototype and constructor
	  // properties before they're used to set up the new constructor's prototype.
	  if (typeof this.prototype.__meta__ != 'undefined') {
	    this.prototype.__meta__(prototypeProps, constructorProps)
	  }

	  // Any child constructor passed in should take precedence - grab a reference
	  // to it befoer we apply any mixins.
	  var childConstructor = (hasOwn.call(prototypeProps, 'constructor')
	                          ? prototypeProps.constructor
	                          : null)

	  // If any mixins are specified, mix them into the property objects
	  if (hasOwn.call(prototypeProps, '__mixins__')) {
	    prototypeProps = applyMixins(prototypeProps)
	  }
	  if (hasOwn.call(constructorProps, '__mixins__')) {
	    constructorProps = applyMixins(constructorProps)
	  }

	  // Set up the new child constructor and its prototype
	  childConstructor = inheritFrom(this,
	                                 childConstructor,
	                                 prototypeProps,
	                                 constructorProps)

	  // Pass on the extend function for extension in turn
	  childConstructor.extend = this.extend

	  // Expose the inheritance chain for programmatic access
	  childConstructor.__mro__ = [childConstructor].concat(this.__mro__)

	  return childConstructor
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	var toString = Object.prototype.toString

	// Type checks

	function isArray(o) {
	  return toString.call(o) == '[object Array]'
	}

	function isBoolean(o) {
	  return toString.call(o) == '[object Boolean]'
	}

	function isDate(o) {
	  return toString.call(o) == '[object Date]'
	}

	function isError(o) {
	  return toString.call(o) == '[object Error]'
	}

	function isFunction(o) {
	  return toString.call(o) == '[object Function]'
	}

	function isNumber(o) {
	  return toString.call(o) == '[object Number]'
	}

	function isObject(o) {
	  return toString.call(o) == '[object Object]'
	}

	function isRegExp(o) {
	  return toString.call(o) == '[object RegExp]'
	}

	function isString(o) {
	  return toString.call(o) == '[object String]'
	}

	// Content checks

	function isEmpty(o) {
	  /* jshint ignore:start */
	  for (var prop in o) {
	    return false
	  }
	  /* jshint ignore:end */
	  return true
	}

	module.exports = {
	  Array: isArray
	, Boolean: isBoolean
	, Date: isDate
	, Empty: isEmpty
	, Error: isError
	, Function: isFunction
	, NaN: isNaN
	, Number: isNumber
	, Object: isObject
	, RegExp: isRegExp
	, String: isString
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Wraps Object.prototype.hasOwnProperty() so it can be called with an object
	 * and property name.
	 */
	var hasOwn = (function() {
	  var hasOwnProperty = Object.prototype.hasOwnProperty
	  return function(obj, prop) { return hasOwnProperty.call(obj, prop) }
	})()

	/**
	 * Returns the type of an object as a lowercase string.
	 */
	var type = (function() {
	  var toString = Object.prototype.toString
	  return function(obj) { return toString.call(obj).slice(8, -1).toLowerCase() }
	})()

	/**
	 * Copies own properties from any given objects to a destination object.
	 */
	function extend(dest) {
	  for (var i = 1, l = arguments.length, src; i < l; i++) {
	    src = arguments[i]
	    if (src) {
	      for (var prop in src) {
	        if (hasOwn(src, prop)) {
	          dest[prop] = src[prop]
	        }
	      }
	    }
	  }
	  return dest
	}

	/**
	 * Makes a constructor inherit another constructor's prototype without
	 * having to actually use the constructor.
	 */
	function inherits(childConstructor, parentConstructor) {
	  var F = function() {}
	  F.prototype = parentConstructor.prototype
	  childConstructor.prototype = new F()
	  childConstructor.prototype.constructor = childConstructor
	  return childConstructor
	}

	/**
	 * Creates an Array of [property, value] pairs from an Object.
	 */
	function items(obj) {
	  var items_ = []
	  for (var prop in obj) {
	    if (hasOwn(obj, prop)) {
	      items_.push([prop, obj[prop]])
	    }
	  }
	  return items_
	}

	/**
	 * Creates an Object from an Array of [property, value] pairs.
	 */
	function fromItems(items) {
	  var obj = {}
	  for (var i = 0, l = items.length, item; i < l; i++) {
	    item = items[i]
	    obj[item[0]] = item[1]
	  }
	  return obj
	}

	/**
	 * Creates a lookup Object from an Array, coercing each item to a String.
	 */
	function lookup(arr) {
	  var obj = {}
	  for (var i = 0, l = arr.length; i < l; i++) {
	    obj[''+arr[i]] = true
	  }
	  return obj
	}

	/**
	 * If the given object has the given property, returns its value, otherwise
	 * returns the given default value.
	 */
	function get(obj, prop, defaultValue) {
	  return (hasOwn(obj, prop) ? obj[prop] : defaultValue)
	}

	/**
	 * Deletes and returns an own property from an object, optionally returning a
	 * default value if the object didn't have theproperty.
	 * @throws if given an object which is null (or undefined), or if the property
	 *   doesn't exist and there was no defaultValue given.
	 */
	function pop(obj, prop, defaultValue) {
	  if (obj == null) {
	    throw new Error('pop was given ' + obj)
	  }
	  if (hasOwn(obj, prop)) {
	    var value = obj[prop]
	    delete obj[prop]
	    return value
	  }
	  else if (arguments.length == 2) {
	    throw new Error("pop was given an object which didn't have an own '" +
	                    prop + "' property, without a default value to return")
	  }
	  return defaultValue
	}

	/**
	 * If the prop is in the object, return its value. If not, set the prop to
	 * defaultValue and return defaultValue.
	 */
	function setDefault(obj, prop, defaultValue) {
	  if (obj == null) {
	    throw new Error('setDefault was given ' + obj)
	  }
	  defaultValue = defaultValue || null
	  if (hasOwn(obj, prop)) {
	    return obj[prop]
	  }
	  else {
	    obj[prop] = defaultValue
	    return defaultValue
	  }
	}

	module.exports = {
	  hasOwn: hasOwn
	, type: type
	, extend: extend
	, inherits: inherits
	, items: items
	, fromItems: fromItems
	, lookup: lookup
	, get: get
	, pop: pop
	, setDefault: setDefault
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! https://mths.be/punycode v1.4.1 by @mathias */
	;(function(root) {

		/** Detect free variables */
		var freeExports = typeof exports == 'object' && exports &&
			!exports.nodeType && exports;
		var freeModule = typeof module == 'object' && module &&
			!module.nodeType && module;
		var freeGlobal = typeof global == 'object' && global;
		if (
			freeGlobal.global === freeGlobal ||
			freeGlobal.window === freeGlobal ||
			freeGlobal.self === freeGlobal
		) {
			root = freeGlobal;
		}

		/**
		 * The `punycode` object.
		 * @name punycode
		 * @type Object
		 */
		var punycode,

		/** Highest positive signed 32-bit float value */
		maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

		/** Bootstring parameters */
		base = 36,
		tMin = 1,
		tMax = 26,
		skew = 38,
		damp = 700,
		initialBias = 72,
		initialN = 128, // 0x80
		delimiter = '-', // '\x2D'

		/** Regular expressions */
		regexPunycode = /^xn--/,
		regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
		regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

		/** Error messages */
		errors = {
			'overflow': 'Overflow: input needs wider integers to process',
			'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
			'invalid-input': 'Invalid input'
		},

		/** Convenience shortcuts */
		baseMinusTMin = base - tMin,
		floor = Math.floor,
		stringFromCharCode = String.fromCharCode,

		/** Temporary variable */
		key;

		/*--------------------------------------------------------------------------*/

		/**
		 * A generic error utility function.
		 * @private
		 * @param {String} type The error type.
		 * @returns {Error} Throws a `RangeError` with the applicable error message.
		 */
		function error(type) {
			throw new RangeError(errors[type]);
		}

		/**
		 * A generic `Array#map` utility function.
		 * @private
		 * @param {Array} array The array to iterate over.
		 * @param {Function} callback The function that gets called for every array
		 * item.
		 * @returns {Array} A new array of values returned by the callback function.
		 */
		function map(array, fn) {
			var length = array.length;
			var result = [];
			while (length--) {
				result[length] = fn(array[length]);
			}
			return result;
		}

		/**
		 * A simple `Array#map`-like wrapper to work with domain name strings or email
		 * addresses.
		 * @private
		 * @param {String} domain The domain name or email address.
		 * @param {Function} callback The function that gets called for every
		 * character.
		 * @returns {Array} A new string of characters returned by the callback
		 * function.
		 */
		function mapDomain(string, fn) {
			var parts = string.split('@');
			var result = '';
			if (parts.length > 1) {
				// In email addresses, only the domain name should be punycoded. Leave
				// the local part (i.e. everything up to `@`) intact.
				result = parts[0] + '@';
				string = parts[1];
			}
			// Avoid `split(regex)` for IE8 compatibility. See #17.
			string = string.replace(regexSeparators, '\x2E');
			var labels = string.split('.');
			var encoded = map(labels, fn).join('.');
			return result + encoded;
		}

		/**
		 * Creates an array containing the numeric code points of each Unicode
		 * character in the string. While JavaScript uses UCS-2 internally,
		 * this function will convert a pair of surrogate halves (each of which
		 * UCS-2 exposes as separate characters) into a single code point,
		 * matching UTF-16.
		 * @see `punycode.ucs2.encode`
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode.ucs2
		 * @name decode
		 * @param {String} string The Unicode input string (UCS-2).
		 * @returns {Array} The new array of code points.
		 */
		function ucs2decode(string) {
			var output = [],
			    counter = 0,
			    length = string.length,
			    value,
			    extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}

		/**
		 * Creates a string based on an array of numeric code points.
		 * @see `punycode.ucs2.decode`
		 * @memberOf punycode.ucs2
		 * @name encode
		 * @param {Array} codePoints The array of numeric code points.
		 * @returns {String} The new Unicode string (UCS-2).
		 */
		function ucs2encode(array) {
			return map(array, function(value) {
				var output = '';
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
				return output;
			}).join('');
		}

		/**
		 * Converts a basic code point into a digit/integer.
		 * @see `digitToBasic()`
		 * @private
		 * @param {Number} codePoint The basic numeric code point value.
		 * @returns {Number} The numeric value of a basic code point (for use in
		 * representing integers) in the range `0` to `base - 1`, or `base` if
		 * the code point does not represent a value.
		 */
		function basicToDigit(codePoint) {
			if (codePoint - 48 < 10) {
				return codePoint - 22;
			}
			if (codePoint - 65 < 26) {
				return codePoint - 65;
			}
			if (codePoint - 97 < 26) {
				return codePoint - 97;
			}
			return base;
		}

		/**
		 * Converts a digit/integer into a basic code point.
		 * @see `basicToDigit()`
		 * @private
		 * @param {Number} digit The numeric value of a basic code point.
		 * @returns {Number} The basic code point whose value (when used for
		 * representing integers) is `digit`, which needs to be in the range
		 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
		 * used; else, the lowercase form is used. The behavior is undefined
		 * if `flag` is non-zero and `digit` has no uppercase form.
		 */
		function digitToBasic(digit, flag) {
			//  0..25 map to ASCII a..z or A..Z
			// 26..35 map to ASCII 0..9
			return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
		}

		/**
		 * Bias adaptation function as per section 3.4 of RFC 3492.
		 * https://tools.ietf.org/html/rfc3492#section-3.4
		 * @private
		 */
		function adapt(delta, numPoints, firstTime) {
			var k = 0;
			delta = firstTime ? floor(delta / damp) : delta >> 1;
			delta += floor(delta / numPoints);
			for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
				delta = floor(delta / baseMinusTMin);
			}
			return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
		}

		/**
		 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
		 * symbols.
		 * @memberOf punycode
		 * @param {String} input The Punycode string of ASCII-only symbols.
		 * @returns {String} The resulting string of Unicode symbols.
		 */
		function decode(input) {
			// Don't use UCS-2
			var output = [],
			    inputLength = input.length,
			    out,
			    i = 0,
			    n = initialN,
			    bias = initialBias,
			    basic,
			    j,
			    index,
			    oldi,
			    w,
			    k,
			    digit,
			    t,
			    /** Cached calculation results */
			    baseMinusT;

			// Handle the basic code points: let `basic` be the number of input code
			// points before the last delimiter, or `0` if there is none, then copy
			// the first basic code points to the output.

			basic = input.lastIndexOf(delimiter);
			if (basic < 0) {
				basic = 0;
			}

			for (j = 0; j < basic; ++j) {
				// if it's not a basic code point
				if (input.charCodeAt(j) >= 0x80) {
					error('not-basic');
				}
				output.push(input.charCodeAt(j));
			}

			// Main decoding loop: start just after the last delimiter if any basic code
			// points were copied; start at the beginning otherwise.

			for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

				// `index` is the index of the next character to be consumed.
				// Decode a generalized variable-length integer into `delta`,
				// which gets added to `i`. The overflow checking is easier
				// if we increase `i` as we go, then subtract off its starting
				// value at the end to obtain `delta`.
				for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

					if (index >= inputLength) {
						error('invalid-input');
					}

					digit = basicToDigit(input.charCodeAt(index++));

					if (digit >= base || digit > floor((maxInt - i) / w)) {
						error('overflow');
					}

					i += digit * w;
					t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

					if (digit < t) {
						break;
					}

					baseMinusT = base - t;
					if (w > floor(maxInt / baseMinusT)) {
						error('overflow');
					}

					w *= baseMinusT;

				}

				out = output.length + 1;
				bias = adapt(i - oldi, out, oldi == 0);

				// `i` was supposed to wrap around from `out` to `0`,
				// incrementing `n` each time, so we'll fix that now:
				if (floor(i / out) > maxInt - n) {
					error('overflow');
				}

				n += floor(i / out);
				i %= out;

				// Insert `n` at position `i` of the output
				output.splice(i++, 0, n);

			}

			return ucs2encode(output);
		}

		/**
		 * Converts a string of Unicode symbols (e.g. a domain name label) to a
		 * Punycode string of ASCII-only symbols.
		 * @memberOf punycode
		 * @param {String} input The string of Unicode symbols.
		 * @returns {String} The resulting Punycode string of ASCII-only symbols.
		 */
		function encode(input) {
			var n,
			    delta,
			    handledCPCount,
			    basicLength,
			    bias,
			    j,
			    m,
			    q,
			    k,
			    t,
			    currentValue,
			    output = [],
			    /** `inputLength` will hold the number of code points in `input`. */
			    inputLength,
			    /** Cached calculation results */
			    handledCPCountPlusOne,
			    baseMinusT,
			    qMinusT;

			// Convert the input in UCS-2 to Unicode
			input = ucs2decode(input);

			// Cache the length
			inputLength = input.length;

			// Initialize the state
			n = initialN;
			delta = 0;
			bias = initialBias;

			// Handle the basic code points
			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue < 0x80) {
					output.push(stringFromCharCode(currentValue));
				}
			}

			handledCPCount = basicLength = output.length;

			// `handledCPCount` is the number of code points that have been handled;
			// `basicLength` is the number of basic code points.

			// Finish the basic string - if it is not empty - with a delimiter
			if (basicLength) {
				output.push(delimiter);
			}

			// Main encoding loop:
			while (handledCPCount < inputLength) {

				// All non-basic code points < n have been handled already. Find the next
				// larger one:
				for (m = maxInt, j = 0; j < inputLength; ++j) {
					currentValue = input[j];
					if (currentValue >= n && currentValue < m) {
						m = currentValue;
					}
				}

				// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
				// but guard against overflow
				handledCPCountPlusOne = handledCPCount + 1;
				if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
					error('overflow');
				}

				delta += (m - n) * handledCPCountPlusOne;
				n = m;

				for (j = 0; j < inputLength; ++j) {
					currentValue = input[j];

					if (currentValue < n && ++delta > maxInt) {
						error('overflow');
					}

					if (currentValue == n) {
						// Represent delta as a generalized variable-length integer
						for (q = delta, k = base; /* no condition */; k += base) {
							t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
							if (q < t) {
								break;
							}
							qMinusT = q - t;
							baseMinusT = base - t;
							output.push(
								stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
							);
							q = floor(qMinusT / baseMinusT);
						}

						output.push(stringFromCharCode(digitToBasic(q, 0)));
						bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
						delta = 0;
						++handledCPCount;
					}
				}

				++delta;
				++n;

			}
			return output.join('');
		}

		/**
		 * Converts a Punycode string representing a domain name or an email address
		 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
		 * it doesn't matter if you call it on a string that has already been
		 * converted to Unicode.
		 * @memberOf punycode
		 * @param {String} input The Punycoded domain name or email address to
		 * convert to Unicode.
		 * @returns {String} The Unicode representation of the given Punycode
		 * string.
		 */
		function toUnicode(input) {
			return mapDomain(input, function(string) {
				return regexPunycode.test(string)
					? decode(string.slice(4).toLowerCase())
					: string;
			});
		}

		/**
		 * Converts a Unicode string representing a domain name or an email address to
		 * Punycode. Only the non-ASCII parts of the domain name will be converted,
		 * i.e. it doesn't matter if you call it with a domain that's already in
		 * ASCII.
		 * @memberOf punycode
		 * @param {String} input The domain name or email address to convert, as a
		 * Unicode string.
		 * @returns {String} The Punycode representation of the given domain name or
		 * email address.
		 */
		function toASCII(input) {
			return mapDomain(input, function(string) {
				return regexNonASCII.test(string)
					? 'xn--' + encode(string)
					: string;
			});
		}

		/*--------------------------------------------------------------------------*/

		/** Define the public API */
		punycode = {
			/**
			 * A string representing the current Punycode.js version number.
			 * @memberOf punycode
			 * @type String
			 */
			'version': '1.4.1',
			/**
			 * An object of methods to convert from JavaScript's internal character
			 * representation (UCS-2) to Unicode code points, and back.
			 * @see <https://mathiasbynens.be/notes/javascript-encoding>
			 * @memberOf punycode
			 * @type Object
			 */
			'ucs2': {
				'decode': ucs2decode,
				'encode': ucs2encode
			},
			'decode': decode,
			'encode': encode,
			'toASCII': toASCII,
			'toUnicode': toUnicode
		};

		/** Expose `punycode` */
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return punycode;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (freeExports && freeModule) {
			if (module.exports == freeExports) {
				// in Node.js, io.js, or RingoJS v0.8.0+
				freeModule.exports = punycode;
			} else {
				// in Narwhal or RingoJS v0.7.0-
				for (key in punycode) {
					punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
				}
			}
		} else {
			// in Rhino or a web browser
			root.punycode = punycode;
		}

	}(this));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)(module), (function() { return this; }())))

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	// parseUri 1.2.2
	// (c) Steven Levithan <stevenlevithan.com>
	// MIT License
	function parseUri (str) {
	  var o = parseUri.options
	    , m = o.parser[o.strictMode ? "strict" : "loose"].exec(str)
	    , uri = {}
	    , i = 14

	  while (i--) { uri[o.key[i]] = m[i] || "" }

	  uri[o.q.name] = {};
	  uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
	    if ($1) { uri[o.q.name][$1] = $2 }
	  })

	  return uri
	}

	parseUri.options = {
	  strictMode: false
	, key: ['source','protocol','authority','userInfo','user','password','host','port','relative','path','directory','file','query','anchor']
	, q: {
	    name: 'queryKey'
	  , parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	  }
	, parser: {
	    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/
	  , loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	  }
	}

	// makeURI 1.2.2 - create a URI from an object specification; compatible with
	// parseURI (http://blog.stevenlevithan.com/archives/parseuri)
	// (c) Niall Smart <niallsmart.com>
	// MIT License
	function makeUri(u) {
	  var uri = ''
	  if (u.protocol) {
	    uri += u.protocol + '://'
	  }
	  if (u.user) {
	    uri += u.user
	  }
	  if (u.password) {
	    uri += ':' + u.password
	  }
	  if (u.user || u.password) {
	    uri += '@'
	  }
	  if (u.host) {
	    uri += u.host
	  }
	  if (u.port) {
	    uri += ':' + u.port
	  }
	  if (u.path) {
	    uri += u.path
	  }
	  var qk = u.queryKey
	  var qs = []
	  for (var k in qk) {
	    if (!qk.hasOwnProperty(k)) {
	      continue
	    }
	    var v = encodeURIComponent(qk[k])
	    k = encodeURIComponent(k)
	    if (v) {
	      qs.push(k + '=' + v)
	    }
	    else {
	      qs.push(k)
	    }
	  }
	  if (qs.length > 0) {
	    uri += '?' + qs.join('&')
	  }
	  if (u.anchor) {
	    uri += '#' + u.anchor
	  }
	  return uri
	}

	module.exports = {
	  parseUri: parseUri
	, makeUri: makeUri
	}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Concur = __webpack_require__(4)
	var format = __webpack_require__(11).formatObj
	var is = __webpack_require__(5)
	var object = __webpack_require__(6)

	var NON_FIELD_ERRORS = '__all__'

	/**
	 * A validation error, containing a list of messages. Single messages (e.g.
	 * those produced by validators) may have an associated error code and
	 * parameters to allow customisation by fields.
	 *
	 * The message argument can be a single error, a list of errors, or an object
	 * that maps field names to lists of errors. What we define as an "error" can
	 * be either a simple string or an instance of ValidationError with its message
	 * attribute set, and what we define as list or object can be an actual list or
	 * object or an instance of ValidationError with its errorList or errorObj
	 * property set.
	 */
	var ValidationError = Concur.extend({
	  constructor: function ValidationError(message, kwargs) {
	    if (!(this instanceof ValidationError)) { return new ValidationError(message, kwargs) }
	    kwargs = object.extend({code: null, params: null}, kwargs)

	    var code = kwargs.code
	    var params = kwargs.params

	    if (message instanceof ValidationError) {
	      if (object.hasOwn(message, 'errorObj')) {
	        message = message.errorObj
	      }
	      else if (object.hasOwn(message, 'message')) {
	        message = message.errorList
	      }
	      else {
	        code = message.code
	        params = message.params
	        message = message.message
	      }
	    }

	    if (is.Object(message)) {
	      this.errorObj = {}
	      Object.keys(message).forEach(function(field) {
	        var messages = message[field]
	        if (!(messages instanceof ValidationError)) {
	          messages = ValidationError(messages)
	        }
	        this.errorObj[field] = messages.errorList
	      }.bind(this))
	    }
	    else if (is.Array(message)) {
	      this.errorList = []
	      message.forEach(function(message) {
	        // Normalize strings to instances of ValidationError
	        if (!(message instanceof ValidationError)) {
	          message = ValidationError(message)
	        }
	        this.errorList.push.apply(this.errorList, message.errorList)
	      }.bind(this))
	    }
	    else {
	      this.message = message
	      this.code = code
	      this.params = params
	      this.errorList = [this]
	    }
	  }
	})

	/**
	 * Returns validation messages as an object with field names as properties.
	 * Throws an error if this validation error was not created with a field error
	 * object.
	 */
	ValidationError.prototype.messageObj = function() {
	  if (!object.hasOwn(this, 'errorObj')) {
	    throw new Error('ValidationError has no errorObj')
	  }
	  return this.__iter__()
	}

	/**
	 * Returns validation messages as a list.
	 */
	ValidationError.prototype.messages = function() {
	  if (object.hasOwn(this, 'errorObj')) {
	    var messages = []
	    Object.keys(this.errorObj).forEach(function(field) {
	      var errors = this.errorObj[field]
	      messages.push.apply(messages, ValidationError(errors).__iter__())
	    }.bind(this))
	    return messages
	  }
	  else {
	    return this.__iter__()
	  }
	}

	/**
	 * Generates an object of field error messags or a list of error messages
	 * depending on how this ValidationError has been constructed.
	 */
	ValidationError.prototype.__iter__ = function() {
	  if (object.hasOwn(this, 'errorObj')) {
	    var messageObj = {}
	    Object.keys(this.errorObj).forEach(function(field) {
	      var errors = this.errorObj[field]
	      messageObj[field] = ValidationError(errors).__iter__()
	    }.bind(this))
	    return messageObj
	  }
	  else {
	    return this.errorList.map(function(error) {
	      var message = error.message
	      if (error.params) {
	        message = format(message, error.params)
	      }
	      return message
	    })
	  }
	}

	/**
	 * Passes this error's messages on to the given error object, adding to a
	 * particular field's error messages if already present.
	 */
	ValidationError.prototype.updateErrorObj = function(errorObj) {
	  if (object.hasOwn(this, 'errorObj')) {
	    if (errorObj) {
	      Object.keys(this.errorObj).forEach(function(field) {
	        if (!object.hasOwn(errorObj, field)) {
	          errorObj[field] = []
	        }
	        var errors = errorObj[field]
	        errors.push.apply(errors, this.errorObj[field])
	      }.bind(this))
	    }
	    else {
	      errorObj = this.errorObj
	    }
	  }
	  else {
	    if (!object.hasOwn(errorObj, NON_FIELD_ERRORS)) {
	      errorObj[NON_FIELD_ERRORS] = []
	    }
	    var nonFieldErrors = errorObj[NON_FIELD_ERRORS]
	    nonFieldErrors.push.apply(nonFieldErrors, this.errorList)
	  }
	  return errorObj
	}

	ValidationError.prototype.toString = function() {
	  return ('ValidationError(' + JSON.stringify(this.__iter__()) + ')')
	}

	module.exports = {
	  ValidationError: ValidationError
	}


/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	var slice = Array.prototype.slice
	  , formatRegExp = /%[%s]/g
	  , formatObjRegExp = /({{?)(\w+)}/g

	/**
	 * Replaces %s placeholders in a string with positional arguments.
	 */
	function format(s) {
	  return formatArr(s, slice.call(arguments, 1))
	}

	/**
	 * Replaces %s placeholders in a string with array contents.
	 */
	function formatArr(s, a) {
	  var i = 0
	  return s.replace(formatRegExp, function(m) { return m == '%%' ? '%' : a[i++] })
	}

	/**
	 * Replaces {propertyName} placeholders in a string with object properties.
	 */
	function formatObj(s, o) {
	  return s.replace(formatObjRegExp, function(m, b, p) { return b.length == 2 ? m.slice(1) : o[p] })
	}

	var units = 'kMGTPEZY'
	  , stripDecimals = /\.00$|0$/

	/**
	 * Formats bytes as a file size with the appropriately scaled units.
	 */
	function fileSize(bytes, threshold) {
	  threshold = Math.min(threshold || 768, 1024)
	  var i = -1
	    , unit = 'bytes'
	    , size = bytes
	  while (size > threshold && i < units.length) {
	    size = size / 1024
	    i++
	  }
	  if (i > -1) {
	    unit = units.charAt(i) + 'B'
	  }
	  return size.toFixed(2).replace(stripDecimals, '') + ' ' + unit
	}

	module.exports = {
	  format: format
	, formatArr: formatArr
	, formatObj: formatObj
	, fileSize: fileSize
	}


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)

	var errors = __webpack_require__(10)

	var ValidationError = errors.ValidationError

	var hexRE = /^[0-9a-f]+$/

	/**
	 * Cleans a IPv6 address string.
	 *
	 * Validity is checked by calling isValidIPv6Address() - if an invalid address
	 * is passed, a ValidationError is thrown.
	 *
	 * Replaces the longest continious zero-sequence with '::' and removes leading
	 * zeroes and makes sure all hextets are lowercase.
	 */
	function cleanIPv6Address(ipStr, kwargs) {
	  kwargs = object.extend({
	    unpackIPv4: false, errorMessage: 'This is not a valid IPv6 address.'
	  }, kwargs)

	  var bestDoublecolonStart = -1
	  var bestDoublecolonLen = 0
	  var doublecolonStart = -1
	  var doublecolonLen = 0

	  if (!isValidIPv6Address(ipStr)) {
	    throw ValidationError(kwargs.errorMessage, {code: 'invalid'})
	  }

	  // This algorithm can only handle fully exploded IP strings
	  ipStr = _explodeShorthandIPstring(ipStr)
	  ipStr = _sanitiseIPv4Mapping(ipStr)

	  // If needed, unpack the IPv4 and return straight away
	  if (kwargs.unpackIPv4) {
	    var ipv4Unpacked = _unpackIPv4(ipStr)
	    if (ipv4Unpacked) {
	      return ipv4Unpacked
	    }
	  }

	  var hextets = ipStr.split(':')

	  for (var i = 0, l = hextets.length; i < l; i++) {
	    // Remove leading zeroes
	    hextets[i] = hextets[i].replace(/^0+/, '')
	    if (hextets[i] === '') {
	      hextets[i] = '0'
	    }

	    // Determine best hextet to compress
	    if (hextets[i] == '0') {
	      doublecolonLen += 1
	      if (doublecolonStart == -1) {
	        // Start a sequence of zeros
	        doublecolonStart = i
	      }
	      if (doublecolonLen > bestDoublecolonLen) {
	        // This is the longest sequence so far
	        bestDoublecolonLen = doublecolonLen
	        bestDoublecolonStart = doublecolonStart
	      }
	    }
	    else {
	      doublecolonLen = 0
	      doublecolonStart = -1
	    }
	  }

	  // Compress the most suitable hextet
	  if (bestDoublecolonLen > 1) {
	    var bestDoublecolonEnd = bestDoublecolonStart + bestDoublecolonLen
	    // For zeros at the end of the address
	    if (bestDoublecolonEnd == hextets.length) {
	      hextets.push('')
	    }
	    hextets.splice(bestDoublecolonStart, bestDoublecolonLen, '')
	    // For zeros at the beginning of the address
	    if (bestDoublecolonStart === 0) {
	      hextets.unshift('')
	    }
	  }

	  return hextets.join(':').toLowerCase()
	}

	/**
	 * Sanitises IPv4 mapping in a expanded IPv6 address.
	 *
	 * This converts ::ffff:0a0a:0a0a to ::ffff:10.10.10.10.
	 * If there is nothing to sanitise, returns an unchanged string.
	 */
	function _sanitiseIPv4Mapping(ipStr) {
	  if (ipStr.toLowerCase().indexOf('0000:0000:0000:0000:0000:ffff:') !== 0) {
	    // Not an ipv4 mapping
	    return ipStr
	  }

	  var hextets = ipStr.split(':')

	  if (hextets[hextets.length - 1].indexOf('.') != -1) {
	    // Already sanitized
	    return ipStr
	  }

	  var ipv4Address = [
	    parseInt(hextets[6].substring(0, 2), 16)
	  , parseInt(hextets[6].substring(2, 4), 16)
	  , parseInt(hextets[7].substring(0, 2), 16)
	  , parseInt(hextets[7].substring(2, 4), 16)
	  ].join('.')

	  return hextets.slice(0, 6).join(':') +  ':' + ipv4Address
	}

	/**
	 * Unpacks an IPv4 address that was mapped in a compressed IPv6 address.
	 *
	 * This converts 0000:0000:0000:0000:0000:ffff:10.10.10.10 to 10.10.10.10.
	 * If there is nothing to sanitize, returns null.
	 */
	function _unpackIPv4(ipStr) {
	  if (ipStr.toLowerCase().indexOf('0000:0000:0000:0000:0000:ffff:') !== 0) {
	    return null
	  }

	  var hextets = ipStr.split(':')
	  return hextets.pop()
	}

	/**
	 * Determines if we have a valid IPv6 address.
	 */
	function isValidIPv6Address(ipStr) {
	  var validateIPv4Address = __webpack_require__(3).validateIPv4Address

	  // We need to have at least one ':'
	  if (ipStr.indexOf(':') == -1) {
	    return false
	  }

	  // We can only have one '::' shortener
	  if (String_count(ipStr, '::') > 1) {
	    return false
	  }

	  // '::' should be encompassed by start, digits or end
	  if (ipStr.indexOf(':::') != -1) {
	    return false
	  }

	  // A single colon can neither start nor end an address
	  if ((ipStr.charAt(0) == ':' && ipStr.charAt(1) != ':') ||
	      (ipStr.charAt(ipStr.length - 1) == ':' &&
	       ipStr.charAt(ipStr.length - 2) != ':')) {
	    return false
	  }

	  // We can never have more than 7 ':' (1::2:3:4:5:6:7:8 is invalid)
	  if (String_count(ipStr, ':') > 7) {
	    return false
	  }

	  // If we have no concatenation, we need to have 8 fields with 7 ':'
	  if (ipStr.indexOf('::') == -1 && String_count(ipStr, ':') != 7) {
	    // We might have an IPv4 mapped address
	    if (String_count(ipStr, '.') != 3) {
	      return false
	    }
	  }

	  ipStr = _explodeShorthandIPstring(ipStr)

	  // Now that we have that all squared away, let's check that each of the
	  // hextets are between 0x0 and 0xFFFF.
	  var hextets = ipStr.split(':')
	  for (var i = 0, l = hextets.length, hextet; i < l; i++) {
	    hextet = hextets[i]
	    if (String_count(hextet, '.') == 3) {
	      // If we have an IPv4 mapped address, the IPv4 portion has to
	      // be at the end of the IPv6 portion.
	      if (ipStr.split(':').pop() != hextet) {
	        return false
	      }
	      try {
	        validateIPv4Address(hextet)
	      }
	      catch (e) {
	        if (!(e instanceof ValidationError)) {
	          throw e
	        }
	        return false
	      }
	    }
	    else {
	      if (!hexRE.test(hextet)) {
	        return false
	      }
	      var intValue = parseInt(hextet, 16)
	      if (isNaN(intValue) || intValue < 0x0 || intValue > 0xFFFF) {
	        return false
	      }
	    }
	  }

	  return true
	}

	/**
	 * Expands a shortened IPv6 address.
	 */
	function _explodeShorthandIPstring(ipStr) {
	  if (!_isShortHand(ipStr)) {
	    // We've already got a longhand ipStr
	    return ipStr
	  }

	  var newIp = []
	  var hextets = ipStr.split('::')

	  // If there is a ::, we need to expand it with zeroes to get to 8 hextets -
	  // unless there is a dot in the last hextet, meaning we're doing v4-mapping
	  var fillTo = (ipStr.split(':').pop().indexOf('.') != -1) ? 7 : 8

	  if (hextets.length > 1) {
	    var sep = hextets[0].split(':').length + hextets[1].split(':').length
	    newIp = hextets[0].split(':')
	    for (var i = 0, l = fillTo - sep; i < l; i++) {
	      newIp.push('0000')
	    }
	    newIp = newIp.concat(hextets[1].split(':'))
	  }
	  else {
	    newIp = ipStr.split(':')
	  }

	  // Now need to make sure every hextet is 4 lower case characters.
	  // If a hextet is < 4 characters, we've got missing leading 0's.
	  var retIp = []
	  for (i = 0, l = newIp.length; i < l; i++) {
	    retIp.push(zeroPadding(newIp[i], 4) + newIp[i].toLowerCase())
	  }
	  return retIp.join(':')
	}

	/**
	 * Determines if the address is shortened.
	 */
	function _isShortHand(ipStr) {
	  if (String_count(ipStr, '::') == 1) {
	    return true
	  }
	  var parts = ipStr.split(':')
	  for (var i = 0, l = parts.length; i < l; i++) {
	    if (parts[i].length < 4) {
	      return true
	    }
	  }
	  return false
	}

	// Utilities

	function zeroPadding(str, length) {
	  if (str.length >= length) {
	    return ''
	  }
	  return new Array(length - str.length + 1).join('0')
	}

	function String_count(str, subStr) {
	  return str.split(subStr).length - 1
	}

	module.exports = {
	  cleanIPv6Address: cleanIPv6Address
	, isValidIPv6Address: isValidIPv6Address
	}


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)
	var time = __webpack_require__(14)

	var defaultLocale = {lang: 'en'}

	var localeCache = {
	  en: {
	    DATE_INPUT_FORMATS: [
	      '%Y-%m-%d'                        // '2006-10-25'
	    , '%m/%d/%Y', '%m/%d/%y'            // '10/25/2006', '10/25/06'
	    , '%b %d %Y', '%b %d, %Y'           // 'Oct 25 2006', 'Oct 25, 2006'
	    , '%d %b %Y', '%d %b, %Y'           // '25 Oct 2006', '25 Oct, 2006'
	    , '%B %d %Y', '%B %d, %Y'           // 'October 25 2006', 'October 25, 2006'
	    , '%d %B %Y', '%d %B, %Y'           // '25 October 2006', '25 October, 2006'
	    ]
	  , DATETIME_INPUT_FORMATS: [
	      '%Y-%m-%d %H:%M:%S'               // '2006-10-25 14:30:59'
	    , '%Y-%m-%d %H:%M'                  // '2006-10-25 14:30'
	    , '%Y-%m-%d'                        // '2006-10-25'
	    , '%m/%d/%Y %H:%M:%S'               // '10/25/2006 14:30:59'
	    , '%m/%d/%Y %H:%M'                  // '10/25/2006 14:30'
	    , '%m/%d/%Y'                        // '10/25/2006'
	    , '%m/%d/%y %H:%M:%S'               // '10/25/06 14:30:59'
	    , '%m/%d/%y %H:%M'                  // '10/25/06 14:30'
	    , '%m/%d/%y'                        // '10/25/06'
	    ]
	  }
	, en_GB: {
	    DATE_INPUT_FORMATS: [
	      '%d/%m/%Y', '%d/%m/%y'            // '25/10/2006', '25/10/06'
	    , '%b %d %Y', '%b %d, %Y'           // 'Oct 25 2006', 'Oct 25, 2006'
	    , '%d %b %Y', '%d %b, %Y'           // '25 Oct 2006', '25 Oct, 2006'
	    , '%B %d %Y', '%B %d, %Y'           // 'October 25 2006', 'October 25, 2006'
	    , '%d %B %Y', '%d %B, %Y'           // '25 October 2006', '25 October, 2006'
	    ]
	  , DATETIME_INPUT_FORMATS: [
	      '%Y-%m-%d %H:%M:%S'               // '2006-10-25 14:30:59'
	    , '%Y-%m-%d %H:%M'                  // '2006-10-25 14:30'
	    , '%Y-%m-%d'                        // '2006-10-25'
	    , '%d/%m/%Y %H:%M:%S'               // '25/10/2006 14:30:59'
	    , '%d/%m/%Y %H:%M'                  // '25/10/2006 14:30'
	    , '%d/%m/%Y'                        // '25/10/2006'
	    , '%d/%m/%y %H:%M:%S'               // '25/10/06 14:30:59'
	    , '%d/%m/%y %H:%M'                  // '25/10/06 14:30'
	    , '%d/%m/%y'                        // '25/10/06'
	    ]
	  }
	}

	/**
	 * Adds a locale object to our own cache (for formats) and isomorph.time's cache
	 * (for time parsing/formatting).
	 * @param {string} lang
	 * @param {string=} locale
	 */
	function addLocale(lang, locale) {
	  localeCache[lang] = locale
	  time.locales[lang] = locale
	}

	/**
	 * Gets the most applicable locale, falling back to the language code if
	 * necessary and to the default locale if no matching locale was found.
	 * @param {string=} lang
	 */
	function getLocale(lang) {
	  if (lang) {
	    if (object.hasOwn(localeCache, lang)) {
	      return localeCache[lang]
	    }
	    if (lang.indexOf('_') != -1) {
	      lang = lang.split('_')[0]
	      if (object.hasOwn(localeCache, lang)) {
	        return localeCache[lang]
	      }
	    }
	  }
	  return localeCache[defaultLocale.lang]
	}

	/**
	 * Gets all applicable locales, with the most specific first, falling back to
	 * the default locale if necessary.
	 * @param {string=} lang
	 * @return {Array.<Object>}
	 */
	function getLocales(lang) {
	  if (lang) {
	    var locales = []
	    if (object.hasOwn(localeCache, lang)) {
	       locales.push(localeCache[lang])
	    }
	    if (lang.indexOf('_') != -1) {
	      lang = lang.split('_')[0]
	      if (object.hasOwn(localeCache, lang)) {
	        locales.push(localeCache[lang])
	      }
	    }
	    if (locales.length) {
	      return locales
	    }
	  }
	  return [localeCache[defaultLocale.lang]]
	}

	/**
	 * Sets the language code for the default locale.
	 * @param {string} lang
	 */
	function setDefaultLocale(lang) {
	  if (!object.hasOwn(localeCache, lang)) {
	    throw new Error('Unknown locale: ' + lang)
	  }
	  defaultLocale.lang = lang
	}

	/**
	 * @return {string} the language code for the default locale.
	 */
	function getDefaultLocale() {
	  return defaultLocale.lang
	}

	module.exports = {
	  addLocale: addLocale
	, getDefaultLocale: getDefaultLocale
	, getLocale: getLocale
	, getLocales: getLocales
	, setDefaultLocale: setDefaultLocale
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)

	/**
	 * Pads a number with a leading zero if necessary.
	 */
	function pad(number) {
	  return (number < 10 ? '0' + number : number)
	}

	/**
	 * Returns the index of item in list, or -1 if it's not in list.
	 */
	function indexOf(item, list) {
	  for (var i = 0, l = list.length; i < l; i++) {
	    if (item === list[i]) {
	      return i
	    }
	  }
	  return -1
	}

	/**
	 * Maps directive codes to regular expression patterns which will capture the
	 * data the directive corresponds to, or in the case of locale-dependent
	 * directives, a function which takes a locale and generates a regular
	 * expression pattern.
	 */
	var parserDirectives = {
	  // Locale's abbreviated month name
	  'b': function(l) { return '(' + l.b.join('|') + ')' }
	  // Locale's full month name
	, 'B': function(l) { return '(' + l.B.join('|') + ')' }
	  // Locale's equivalent of either AM or PM.
	, 'p': function(l) { return '(' + l.AM + '|' + l.PM + ')' }
	, 'd': '(\\d\\d?)' // Day of the month as a decimal number [01,31]
	, 'H': '(\\d\\d?)' // Hour (24-hour clock) as a decimal number [00,23]
	, 'I': '(\\d\\d?)' // Hour (12-hour clock) as a decimal number [01,12]
	, 'm': '(\\d\\d?)' // Month as a decimal number [01,12]
	, 'M': '(\\d\\d?)' // Minute as a decimal number [00,59]
	, 'S': '(\\d\\d?)' // Second as a decimal number [00,59]
	, 'y': '(\\d\\d?)' // Year without century as a decimal number [00,99]
	, 'Y': '(\\d{4})'  // Year with century as a decimal number
	, '%': '%'         // A literal '%' character
	}

	/**
	 * Maps directive codes to functions which take the date to be formatted and
	 * locale details (if required), returning an appropriate formatted value.
	 */
	var formatterDirectives = {
	  'a': function(d, l) { return l.a[d.getDay()] }
	, 'A': function(d, l) { return l.A[d.getDay()] }
	, 'b': function(d, l) { return l.b[d.getMonth()] }
	, 'B': function(d, l) { return l.B[d.getMonth()] }
	, 'd': function(d) { return pad(d.getDate(), 2) }
	, 'H': function(d) { return pad(d.getHours(), 2) }
	, 'M': function(d) { return pad(d.getMinutes(), 2) }
	, 'm': function(d) { return pad(d.getMonth() + 1, 2) }
	, 'S': function(d) { return pad(d.getSeconds(), 2) }
	, 'w': function(d) { return d.getDay() }
	, 'Y': function(d) { return d.getFullYear() }
	, '%': function(d) { return '%' }
	}

	/** Test for hanging percentage symbols. */
	var strftimeFormatCheck = /[^%]%$/

	/**
	 * A partial implementation of strptime which parses time details from a string,
	 * based on a format string.
	 * @param {String} format
	 * @param {Object} locale
	 */
	function TimeParser(format, locale) {
	  this.format = format
	  this.locale = locale
	  var cachedPattern = TimeParser._cache[locale.name + '|' + format]
	  if (cachedPattern !== undefined) {
	    this.re = cachedPattern[0]
	    this.matchOrder = cachedPattern[1]
	  }
	  else {
	    this.compilePattern()
	  }
	}

	/**
	 * Caches RegExps and match orders generated per locale/format string combo.
	 */
	TimeParser._cache = {}

	TimeParser.prototype.compilePattern = function() {
	  // Normalise whitespace before further processing
	  var format = this.format.split(/(?:\s|\t|\n)+/).join(' ')
	    , pattern = []
	    , matchOrder = []
	    , c
	    , directive

	  for (var i = 0, l = format.length; i < l; i++) {
	    c = format.charAt(i)
	    if (c != '%') {
	      if (c === ' ') {
	        pattern.push(' +')
	      }
	      else {
	        pattern.push(c)
	      }
	      continue
	    }

	    if (i == l - 1) {
	      throw new Error('strptime format ends with raw %')
	    }

	    c = format.charAt(++i)
	    directive = parserDirectives[c]
	    if (directive === undefined) {
	      throw new Error('strptime format contains an unknown directive: %' + c)
	    }
	    else if (is.Function(directive)) {
	      pattern.push(directive(this.locale))
	    }
	    else {
	      pattern.push(directive)
	    }

	    if (c != '%') {
	       matchOrder.push(c)
	    }
	  }

	  this.re = new RegExp('^' + pattern.join('') + '$')
	  this.matchOrder = matchOrder
	  TimeParser._cache[this.locale.name + '|' + this.format] = [this.re, matchOrder]
	}

	/**
	 * Attempts to extract date and time details from the given input.
	 * @param {string} input
	 * @return {Array.<number>}
	 */
	TimeParser.prototype.parse = function(input) {
	  var matches = this.re.exec(input)
	  if (matches === null) {
	    throw new Error('Time data did not match format: data=' + input +
	                    ', format=' + this.format)
	  }

	    // Default values for when more accurate values cannot be inferred
	  var time = [1900, 1, 1, 0, 0, 0]
	    // Matched time data, keyed by directive code
	    , data = {}

	  for (var i = 1, l = matches.length; i < l; i++) {
	    data[this.matchOrder[i - 1]] = matches[i]
	  }

	  // Extract year
	  if (data.hasOwnProperty('Y')) {
	    time[0] = parseInt(data.Y, 10)
	  }
	  else if (data.hasOwnProperty('y')) {
	    var year = parseInt(data.y, 10)
	    if (year < 68) {
	        year = 2000 + year
	    }
	    else if (year < 100) {
	        year = 1900 + year
	    }
	    time[0] = year
	  }

	  // Extract month
	  if (data.hasOwnProperty('m')) {
	    var month = parseInt(data.m, 10)
	    if (month < 1 || month > 12) {
	      throw new Error('Month is out of range: ' + month)
	    }
	    time[1] = month
	  }
	  else if (data.hasOwnProperty('B')) {
	    time[1] = indexOf(data.B, this.locale.B) + 1
	  }
	  else if (data.hasOwnProperty('b')) {
	    time[1] = indexOf(data.b, this.locale.b) + 1
	  }

	  // Extract day of month
	  if (data.hasOwnProperty('d')) {
	    var day = parseInt(data.d, 10)
	    if (day < 1 || day > 31) {
	      throw new Error('Day is out of range: ' + day)
	    }
	    time[2] = day
	  }

	  // Extract hour
	  var hour
	  if (data.hasOwnProperty('H')) {
	    hour = parseInt(data.H, 10)
	    if (hour > 23) {
	      throw new Error('Hour is out of range: ' + hour)
	    }
	    time[3] = hour
	  }
	  else if (data.hasOwnProperty('I')) {
	    hour = parseInt(data.I, 10)
	    if (hour < 1 || hour > 12) {
	      throw new Error('Hour is out of range: ' + hour)
	    }

	    // If we don't get any more information, we'll assume this time is
	    // a.m. - 12 a.m. is midnight.
	    if (hour == 12) {
	        hour = 0
	    }

	    time[3] = hour

	    if (data.hasOwnProperty('p')) {
	      if (data.p == this.locale.PM) {
	        // We've already handled the midnight special case, so it's
	        // safe to bump the time by 12 hours without further checks.
	        time[3] = time[3] + 12
	      }
	    }
	  }

	  // Extract minute
	  if (data.hasOwnProperty('M')) {
	    var minute = parseInt(data.M, 10)
	    if (minute > 59) {
	        throw new Error('Minute is out of range: ' + minute)
	    }
	    time[4] = minute
	  }

	  // Extract seconds
	  if (data.hasOwnProperty('S')) {
	    var second = parseInt(data.S, 10)
	    if (second > 59) {
	      throw new Error('Second is out of range: ' + second)
	    }
	    time[5] = second
	  }

	  // Validate day of month
	  day = time[2], month = time[1], year = time[0]
	  if (((month == 4 || month == 6 || month == 9 || month == 11) &&
	      day > 30) ||
	      (month == 2 && day > ((year % 4 === 0 && year % 100 !== 0 ||
	                             year % 400 === 0) ? 29 : 28))) {
	    throw new Error('Day is out of range: ' + day)
	  }

	  return time
	}

	var time  = {
	  /** Default locale name. */
	  defaultLocale: 'en'

	  /** Locale details. */
	, locales: {
	    en: {
	      name: 'en'
	    , a: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	    , A: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
	          'Friday', 'Saturday']
	    , AM: 'AM'
	    , b: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	          'Oct', 'Nov', 'Dec']
	    , B: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
	          'August', 'September', 'October', 'November', 'December']
	    , PM: 'PM'
	    }
	  }
	}

	/**
	 * Retrieves the locale with the given code.
	 * @param {string} code
	 * @return {Object}
	 */
	var getLocale = time.getLocale = function(code) {
	  if (code) {
	    if (time.locales.hasOwnProperty(code)) {
	      return time.locales[code]
	    }
	    else if (code.length > 2) {
	      // If we appear to have more than a language code, try the
	      // language code on its own.
	      var languageCode = code.substring(0, 2)
	      if (time.locales.hasOwnProperty(languageCode)) {
	        return time.locales[languageCode]
	      }
	    }
	  }
	  return time.locales[time.defaultLocale]
	}

	/**
	 * Parses time details from a string, based on a format string.
	 * @param {string} input
	 * @param {string} format
	 * @param {string=} locale
	 * @return {Array.<number>}
	 */
	var strptime = time.strptime = function(input, format, locale) {
	  return new TimeParser(format, getLocale(locale)).parse(input)
	}

	/**
	 * Convenience wrapper around time.strptime which returns a JavaScript Date.
	 * @param {string} input
	 * @param {string} format
	 * @param {string=} locale
	 * @return {date}
	 */
	time.strpdate = function(input, format, locale) {
	  var t = strptime(input, format, locale)
	  return new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5])
	}

	/**
	 * A partial implementation of <code>strftime</code>, which formats a date
	 * according to a format string. An Error will be thrown if an invalid
	 * format string is given.
	 * @param {date} date
	 * @param {string} format
	 * @param {string=} locale
	 * @return {string}
	 */
	time.strftime = function(date, format, locale) {
	  if (strftimeFormatCheck.test(format)) {
	    throw new Error('strftime format ends with raw %')
	  }
	  locale = getLocale(locale)
	  return format.replace(/(%.)/g, function(s, f) {
	    var code = f.charAt(1)
	    if (typeof formatterDirectives[code] == 'undefined') {
	      throw new Error('strftime format contains an unknown directive: ' + f)
	    }
	    return formatterDirectives[code](date, locale)
	  })
	}

	module.exports = time


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var getFormData = __webpack_require__(17)

	var is = __webpack_require__(5)
	var object = __webpack_require__(6)

	/**
	 * Replaces String {placeholders} with properties of a given object, but
	 * interpolates into and returns an Array instead of a String.
	 * By default, any resulting empty strings are stripped out of the Array. To
	 * disable this, pass an options object with a 'strip' property which is false.
	 */
	function formatToArray(str, obj, options) {
	  var parts = str.split(/\{(\w+)\}/g)
	  for (var i = 1, l = parts.length; i < l; i += 2) {
	    parts[i] = (object.hasOwn(obj, parts[i])
	                ? obj[parts[i]]
	                : '{' + parts[i] + '}')
	  }
	  if (!options || (options && options.strip !== false)) {
	    parts = parts.filter(function(p) { return p !== ''})
	  }
	  return parts
	}

	/**
	 * Get named properties from an object.
	 * @param src {Object}
	 * @param props {Array.<string>}
	 * @return {Object}
	 */
	function getProps(src, props) {
	  var result = {}
	  for (var i = 0, l = props.length; i < l ; i++) {
	    var prop = props[i]
	    if (object.hasOwn(src, prop)) {
	      result[prop] = src[prop]
	    }
	  }
	  return result
	}

	/**
	 * Get a named property from an object, calling it and returning its result if
	 * it's a function.
	 */
	function maybeCall(obj, prop) {
	  var value = obj[prop]
	  if (is.Function(value)) {
	    value = value.call(obj)
	  }
	  return value
	}

	/**
	 * Creates a list of choice pairs from a list of objects using the given named
	 * properties for the value and label.
	 */
	function makeChoices(list, valueProp, labelProp) {
	  return list.map(function(item) {
	    return [maybeCall(item, valueProp), maybeCall(item, labelProp)]
	  })
	}

	/**
	 * Validates choice input and normalises lazy, non-Array choices to be
	 * [value, label] pairs
	 * @return {Array} a normalised version of the given choices.
	 * @throws if an Array with length != 2 was found where a choice pair was expected.
	 */
	function normaliseChoices(choices) {
	  if (!choices.length) { return choices }

	  var normalisedChoices = []
	  for (var i = 0, l = choices.length, choice; i < l; i++) {
	    choice = choices[i]
	    if (!is.Array(choice)) {
	      // TODO In the development build, emit a warning about a choice being
	      //      automatically converted from 'blah' to ['blah', 'blah'] in case it
	      //      wasn't intentional
	      choice = [choice, choice]
	    }
	    if (choice.length != 2) {
	      throw new Error('Choices in a choice list must contain exactly 2 values, ' +
	                      'but got ' + JSON.stringify(choice))
	    }
	    if (is.Array(choice[1])) {
	      var normalisedOptgroupChoices = []
	      // This is an optgroup, so look inside the group for options
	      var optgroupChoices = choice[1]
	      for (var j = 0, m = optgroupChoices.length, optgroupChoice; j < m; j++) {
	        optgroupChoice = optgroupChoices[j]
	        if (!is.Array(optgroupChoice)) {
	          optgroupChoice = [optgroupChoice, optgroupChoice]
	        }
	        if (optgroupChoice.length != 2) {
	          throw new Error('Choices in an optgroup choice list must contain ' +
	                          'exactly 2 values, but got ' +
	                          JSON.stringify(optgroupChoice))
	        }
	        normalisedOptgroupChoices.push(optgroupChoice)
	      }
	      normalisedChoices.push([choice[0], normalisedOptgroupChoices])
	    }
	    else {
	      normalisedChoices.push(choice)
	    }
	  }
	  return normalisedChoices
	}

	/**
	 * @param {Array.<string>} events
	 */
	function normaliseValidationEvents(events) {
	  events = events.map(function(event) {
	    if (event.indexOf('on') === 0) { return event }
	    return 'on' + event.charAt(0).toUpperCase() + event.substr(1)
	  })
	  var onChangeIndex = events.indexOf('onChange')
	  if (onChangeIndex != -1) {
	    events.splice(onChangeIndex, 1)
	  }
	  return {events: events, onChange: (onChangeIndex != -1)}
	}

	/**
	 * @param {string} events
	 */
	function normaliseValidationString(events) {
	  return normaliseValidationEvents(strip(events).split(/ +/g))
	}

	/**
	 * @param {(string|Object)} validation
	 */
	function normaliseValidation(validation) {
	  if (!validation || validation === 'manual') {
	    return validation
	  }
	  else if (validation === 'auto') {
	    return {events: ['onBlur'], onChange: true, onChangeDelay: 369}
	  }
	  else if (is.String(validation)) {
	    return normaliseValidationString(validation)
	  }
	  else if (is.Object(validation)) {
	    var normalised
	    if (is.String(validation.on)) {
	      normalised = normaliseValidationString(validation.on)
	    }
	    else if (is.Array(validation.on)) {
	      normalised = normaliseValidationEvents(validation.on)
	    }
	    else {
	      throw new Error("Validation config Objects must have an 'on' String or Array")
	    }
	    normalised.onChangeDelay = object.get(validation, 'onChangeDelay', validation.delay)
	    return normalised
	  }
	  throw new Error('Unexpected validation config: ' + validation)
	}

	/**
	 * Converts 'firstName' and 'first_name' to 'First name', and
	 * 'SHOUTING_LIKE_THIS' to 'SHOUTING LIKE THIS'.
	 */
	var prettyName = (function() {
	  var capsRE = /([A-Z]+)/g
	  var splitRE = /[ _]+/
	  var allCapsRE = /^[A-Z][A-Z0-9]+$/

	  return function(name) {
	    // Prefix sequences of caps with spaces and split on all space
	    // characters.
	    var parts = name.replace(capsRE, ' $1').split(splitRE)

	    // If we had an initial cap...
	    if (parts[0] === '') {
	      parts.splice(0, 1)
	    }

	    // Give the first word an initial cap and all subsequent words an
	    // initial lowercase if not all caps.
	    for (var i = 0, l = parts.length; i < l; i++) {
	      if (i === 0) {
	        parts[0] = parts[0].charAt(0).toUpperCase() +
	                   parts[0].substr(1)
	      }
	      else if (!allCapsRE.test(parts[i])) {
	        parts[i] = parts[i].charAt(0).toLowerCase() +
	                   parts[i].substr(1)
	      }
	    }

	    return parts.join(' ')
	  }
	})()

	/**
	 * Coerces to string and strips leading and trailing spaces.
	 */
	var strip = function() {
	  var stripRE =/(^\s+|\s+$)/g
	  return function strip(s) {
	    return (''+s).replace(stripRE, '')
	  }
	}()

	/**
	 * From Underscore.js 1.5.2
	 * http://underscorejs.org
	 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Returns a function, that, as long as it continues to be invoked, will not
	 * be triggered. The function will be called after it stops being called for
	 * N milliseconds. If `immediate` is passed, trigger the function on the
	 * leading edge, instead of the trailing.
	 *
	 * Modified to give the returned function:
	 * - a .cancel() method which prevents the debounced function being called.
	 * - a .trigger() method which calls the debounced function immediately.
	 */
	function debounce(func, wait, immediate) {
	  var timeout, args, context, timestamp, result
	  var debounced = function() {
	    context = this
	    args = arguments
	    timestamp = new Date()
	    var later = function() {
	      var last = (new Date()) - timestamp
	      if (last < wait) {
	        timeout = setTimeout(later, wait - last)
	      } else {
	        timeout = null
	        if (!immediate) { result = func.apply(context, args) }
	      }
	    };
	    var callNow = immediate && !timeout
	    if (!timeout) {
	      timeout = setTimeout(later, wait)
	    }
	    if (callNow) { result = func.apply(context, args) }
	    return result
	  }

	  // Clear any pending timeout
	  debounced.cancel = function() {
	    if (timeout) {
	      clearTimeout(timeout)
	    }
	  }

	  // Clear any pending timeout and execute the function immediately
	  debounced.trigger = function() {
	    debounced.cancel()
	    return func.apply(context, args)
	  }

	  return debounced
	}

	/**
	 * Returns a function with a .cancel() function which can be used to prevent the
	 * given function from being called. If the given function has an onCancel(),
	 * it will be called when it's being cancelled.
	 *
	 * Use case: triggering an asynchronous function with new data while an existing
	 * function for the same task but with old data is still pending a callback, so
	 * the callback only gets called for the last one to run.
	 */
	function cancellable(func) {
	  var cancelled = false

	  var cancellabled = function() {
	    if (!cancelled) {
	      func.apply(null, arguments)
	    }
	  }

	  cancellabled.cancel = function() {
	    cancelled = true
	    if (is.Function(func.onCancel)) {
	      func.onCancel()
	    }
	  }

	  return cancellabled
	}

	/**
	 * Wrapper for getFormData which allows you to pass a React form ref.
	 * @param {HTMLFormElement|ReactElement} form a form element.
	 * @return {Object.<string,(string|Array.<string>)>} an object containing the
	 *    submittable value(s) held in each of the form's elements.
	 */
	function getMaybeReactFormData(form) {
	  if (typeof form.getDOMNode == 'function') {
	    form = form.getDOMNode()
	  }
	  return getFormData(form)
	}

	/**
	 * Extracts data from a <form> and validates it with a list of forms and/or
	 * formsets.
	 * @param form the <form> into which any given forms and formsets have been
	 *   rendered - this can be a React <form> component or a real <form> DOM node.
	 * @param {Array.<(Form|FormSet)>} formsAndFormsets a list of forms and/or
	 *   formsets to be used to validate the <form>'s input data.
	 * @return {boolean} true if the <form>'s input data are valid according to all
	 *   given forms and formsets.
	 */
	function validateAll(form, formsAndFormsets) {
	  var data = getMaybeReactFormData(form)
	  var isValid = true
	  for (var i = 0, l = formsAndFormsets.length; i < l; i++) {
	    if (!formsAndFormsets[i].setFormData(data)) {
	      isValid = false
	    }
	  }
	  return isValid
	}

	/**
	 * Returns true if every form/formset is valid.
	 */
	function allValid(formsOrFormsets) {
	  var valid = true
	  for (var i = 0, l = formsOrFormsets.length; i < l; i++) {
	    if (!formsOrFormsets[i].isValid()) {
	      valid = false
	    }
	  }
	  return valid
	}

	var info = function() {}
	var warning = function() {}

	if ('production' !== process.env.NODE_ENV) {
	  info = function(message) {
	    console.warn('[newforms] ' + message)
	  }
	  warning = function(message) {
	    console.warn('[newforms] Warning: ' + message)
	  }
	}

	function autoIdChecker(props, propName, componentName, location) {
	  var autoId = props.autoId
	  if (props.autoId && !(is.String(autoId) && autoId.indexOf('{name}') != -1)) {
	    return new Error(
	      'Invalid `autoId` ' + location + ' supplied to ' +
	      '`' + componentName + '`. Must be falsy or a String containing a ' +
	      '`{name}` placeholder'
	    )
	  }
	}

	module.exports = {
	  allValid: allValid
	, autoIdChecker: autoIdChecker
	, cancellable: cancellable
	, debounce: debounce
	, info: info
	, formatToArray: formatToArray
	, getFormData: getMaybeReactFormData
	, getProps: getProps
	, makeChoices: makeChoices
	, normaliseChoices: normaliseChoices
	, normaliseValidation: normaliseValidation
	, prettyName: prettyName
	, strip: strip
	, validateAll: validateAll
	, warning: warning
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 16 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	(function () {
	  try {
	    cachedSetTimeout = setTimeout;
	  } catch (e) {
	    cachedSetTimeout = function () {
	      throw new Error('setTimeout is not defined');
	    }
	  }
	  try {
	    cachedClearTimeout = clearTimeout;
	  } catch (e) {
	    cachedClearTimeout = function () {
	      throw new Error('clearTimeout is not defined');
	    }
	  }
	} ())
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = cachedSetTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    cachedClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        cachedSetTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var NODE_LIST_CLASSES = {
	  '[object HTMLCollection]': true,
	  '[object NodeList]': true,
	  '[object RadioNodeList]': true
	};

	// .type values for elements which can appear in .elements and should be ignored
	var IGNORED_ELEMENT_TYPES = {
	  'button': true,
	  'fieldset': true,
	  // 'keygen': true,
	  // 'output': true,
	  'reset': true,
	  'submit': true
	};

	var CHECKED_INPUT_TYPES = {
	  'checkbox': true,
	  'radio': true
	};

	var TRIM_RE = /^\s+|\s+$/g;

	var slice = Array.prototype.slice;
	var toString = Object.prototype.toString;

	/**
	 * @param {HTMLFormElement} form
	 * @param {Object} options
	 * @return {Object.<string,(string|Array.<string>)>} an object containing
	 *   submittable value(s) held in the form's .elements collection, with
	 *   properties named as per element names or ids.
	 */
	function getFormData(form) {
	  var options = arguments.length <= 1 || arguments[1] === undefined ? { trim: false } : arguments[1];

	  if (!form) {
	    throw new Error('A form is required by getFormData, was given form=' + form);
	  }

	  var data = {};
	  var elementName = undefined;
	  var elementNames = [];
	  var elementNameLookup = {};

	  // Get unique submittable element names for the form
	  for (var i = 0, l = form.elements.length; i < l; i++) {
	    var element = form.elements[i];
	    if (IGNORED_ELEMENT_TYPES[element.type] || element.disabled) {
	      continue;
	    }
	    elementName = element.name || element.id;
	    if (elementName && !elementNameLookup[elementName]) {
	      elementNames.push(elementName);
	      elementNameLookup[elementName] = true;
	    }
	  }

	  // Extract element data name-by-name for consistent handling of special cases
	  // around elements which contain multiple inputs.
	  for (var i = 0, l = elementNames.length; i < l; i++) {
	    elementName = elementNames[i];
	    var value = getNamedFormElementData(form, elementName, options);
	    if (value != null) {
	      data[elementName] = value;
	    }
	  }

	  return data;
	}

	/**
	 * @param {HTMLFormElement} form
	 * @param {string} elementName
	 * @param {Object} options
	 * @return {(string|Array.<string>)} submittable value(s) in the form for a
	 *   named element from its .elements collection, or null if there was no
	 *   element with that name or the element had no submittable value(s).
	 */
	function getNamedFormElementData(form, elementName) {
	  var options = arguments.length <= 2 || arguments[2] === undefined ? { trim: false } : arguments[2];

	  if (!form) {
	    throw new Error('A form is required by getNamedFormElementData, was given form=' + form);
	  }
	  if (!elementName && toString.call(elementName) !== '[object String]') {
	    throw new Error('A form element name is required by getNamedFormElementData, was given elementName=' + elementName);
	  }

	  var element = form.elements[elementName];
	  if (!element || element.disabled) {
	    return null;
	  }

	  if (!NODE_LIST_CLASSES[toString.call(element)]) {
	    return getFormElementValue(element, options.trim);
	  }

	  // Deal with multiple form controls which have the same name
	  var data = [];
	  var allRadios = true;
	  for (var i = 0, l = element.length; i < l; i++) {
	    if (element[i].disabled) {
	      continue;
	    }
	    if (allRadios && element[i].type !== 'radio') {
	      allRadios = false;
	    }
	    var value = getFormElementValue(element[i], options.trim);
	    if (value != null) {
	      data = data.concat(value);
	    }
	  }

	  // Special case for an element with multiple same-named inputs which were all
	  // radio buttons: if there was a selected value, only return the value.
	  if (allRadios && data.length === 1) {
	    return data[0];
	  }

	  return data.length > 0 ? data : null;
	}

	/**
	 * @param {HTMLElement} element a form element.
	 * @param {booleam} trim should values for text entry inputs be trimmed?
	 * @return {(string|Array.<string>|File|Array.<File>)} the element's submittable
	 *   value(s), or null if it had none.
	 */
	function getFormElementValue(element, trim) {
	  var value = null;
	  var type = element.type;

	  if (type === 'select-one') {
	    if (element.options.length) {
	      value = element.options[element.selectedIndex].value;
	    }
	    return value;
	  }

	  if (type === 'select-multiple') {
	    value = [];
	    for (var i = 0, l = element.options.length; i < l; i++) {
	      if (element.options[i].selected) {
	        value.push(element.options[i].value);
	      }
	    }
	    if (value.length === 0) {
	      value = null;
	    }
	    return value;
	  }

	  // If a file input doesn't have a files attribute, fall through to using its
	  // value attribute.
	  if (type === 'file' && 'files' in element) {
	    if (element.multiple) {
	      value = slice.call(element.files);
	      if (value.length === 0) {
	        value = null;
	      }
	    } else {
	      // Should be null if not present, according to the spec
	      value = element.files[0];
	    }
	    return value;
	  }

	  if (!CHECKED_INPUT_TYPES[type]) {
	    value = trim ? element.value.replace(TRIM_RE, '') : element.value;
	  } else if (element.checked) {
	    value = element.value;
	  }

	  return value;
	}

	getFormData.getNamedFormElementData = getNamedFormElementData;

	exports['default'] = getFormData;
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)
	var object = __webpack_require__(6)
	var time = __webpack_require__(14)

	var formats = __webpack_require__(19)
	var locales = __webpack_require__(13)

	var Field = __webpack_require__(20)

	var $__0=  __webpack_require__(2),ValidationError=$__0.ValidationError
	var $__1=  __webpack_require__(15),strip=$__1.strip

	/**
	 * Base field for fields which validate that their input is a date or time.
	 * @constructor
	 * @extends {Field}
	 * @param {Object=} kwargs
	 */
	var BaseTemporalField = Field.extend({
	  inputFormatType: ''
	, constructor: function BaseTemporalField(kwargs) {
	    kwargs = object.extend({inputFormats: null}, kwargs)
	    Field.call(this, kwargs)
	    this.inputFormats = kwargs.inputFormats
	  }
	})

	/**
	 * Validates that its input is a valid date or time.
	 * @param {(string|Date)} value user input.
	 * @return {Date}
	 * @throws {ValidationError} if the input is invalid.
	 */
	BaseTemporalField.prototype.toJavaScript = function(value) {
	  if (!is.Date(value)) {
	    value = strip(value)
	  }
	  if (is.String(value)) {
	    if (this.inputFormats === null) {
	      this.inputFormats = formats.getFormat(this.inputFormatType)
	    }
	    for (var i = 0, l = this.inputFormats.length; i < l; i++) {
	      try {
	        return this.strpdate(value, this.inputFormats[i])
	      }
	      catch (e) {
	        // pass
	      }
	    }
	  }
	  throw ValidationError(this.errorMessages.invalid, {code: 'invalid'})
	}

	/**
	 * Creates a Date from the given input if it's valid based on a format.
	 * @param {string} value
	 * @param {string} format
	 * @return {Date}
	 */
	BaseTemporalField.prototype.strpdate = function(value, format) {
	  return time.strpdate(value, format, locales.getDefaultLocale())
	}

	BaseTemporalField.prototype._hasChanged = function(initial, data) {
	  try {
	    data = this.toJavaScript(data)
	  }
	  catch (e) {
	    if (!(e instanceof ValidationError)) { throw e }
	    return true
	  }
	  initial = this.toJavaScript(initial)
	  if (!!initial && !!data) {
	    return initial.getTime() !== data.getTime()
	  }
	  else {
	    return initial !== data
	  }
	}


	module.exports = BaseTemporalField

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)

	var locales = __webpack_require__(13)

	/**
	 * Standard input formats which will always be accepted.
	 */
	var ISO_INPUT_FORMATS = {
	  'DATE_INPUT_FORMATS': ['%Y-%m-%d']
	, 'TIME_INPUT_FORMATS': ['%H:%M:%S', '%H:%M']
	, 'DATETIME_INPUT_FORMATS': [
	    '%Y-%m-%d %H:%M:%S'
	  , '%Y-%m-%d %H:%M'
	  , '%Y-%m-%d'
	  ]
	}

	var formatCache = {}

	/**
	 * Gets all acceptable formats of a certain type (e.g. DATE_INPUT_FORMATS) for a
	 * particular language code. All date/time formats will have the applicable ISO
	 * formats added as lowest-precedence.
	 * If an unknown language code is given, the default locale's formats will be
	 * used instead.
	 * If the locale doesn't have configuration for the format type, only the ISO
	 * formats will be returned.
	 * @param {string} formatType
	 * @param {string=} lang language code - if not given, the default locale's
	 *   formats will be returned.
	 * @return {Array.<string>} a list of formats
	 */
	function getFormat(formatType, lang) {
	  if (!lang) {
	    lang = locales.getDefaultLocale()
	  }
	  var cacheKey = formatType + ':' + lang
	  if (!object.hasOwn(formatCache, cacheKey)) {
	    var langLocales = locales.getLocales(lang)
	    var localeFormats = []
	    for (var i = 0, l = langLocales.length; i < l; i++) {
	      var locale = langLocales[i]
	      if (object.hasOwn(locale, formatType)) {
	        // Copy locale-specific formats, as we may be adding to them
	        localeFormats = locale[formatType].slice()
	        break
	      }
	    }
	    if (object.hasOwn(ISO_INPUT_FORMATS, formatType)) {
	      var isoFormats = ISO_INPUT_FORMATS[formatType]
	      for (var j = 0, m = isoFormats.length; j < m; j++) {
	        var isoFormat = isoFormats[j]
	        if (localeFormats.indexOf(isoFormat) == -1) {
	          localeFormats.push(isoFormat)
	        }
	      }
	    }
	    formatCache[cacheKey] = localeFormats
	  }
	  return formatCache[cacheKey]
	}

	module.exports = {
	  getFormat: getFormat
	}


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Concur = __webpack_require__(4)
	var is = __webpack_require__(5)
	var object = __webpack_require__(6)

	var HiddenInput = __webpack_require__(21)
	var Widget = __webpack_require__(59)
	var TextInput = __webpack_require__(61)

	var $__0=   __webpack_require__(2),EMPTY_VALUES=$__0.EMPTY_VALUES,ValidationError=$__0.ValidationError
	var $__1=  __webpack_require__(15),normaliseValidation=$__1.normaliseValidation

	/**
	 * An object that is responsible for doing validation and normalisation, or
	 * "cleaning", for example: an EmailField makes sure its data is a valid
	 * e-mail address and makes sure that acceptable "blank" values all have the
	 * same representation.
	 * @constructor
	 * @param {Object=} kwargs
	 */
	var Field = Concur.extend({
	  widget: TextInput         // Default widget to use when rendering this type of Field
	, hiddenWidget: HiddenInput // Default widget to use when rendering this as "hidden"
	, defaultValidators: []             // Default list of validators
	  // Add an 'invalid' entry to defaultErrorMessages if you want a specific
	  // field error message not raised by the field validators.
	, defaultErrorMessages: {
	    required: 'This field is required.'
	  }
	, emptyValues: EMPTY_VALUES.slice()
	, emptyValueArray: true // Should isEmptyValue check for empty Arrays?

	, constructor: function Field(kwargs) {
	    kwargs = object.extend({
	      required: true, widget: null, label: null, initial: null,
	      helpText: null, errorMessages: null, showHiddenInitial: false,
	      validators: [], cssClass: null, validation: null, controlled: null,
	      custom: null, widgetAttrs: {}
	    }, kwargs)
	    this.required = kwargs.required
	    this.label = kwargs.label
	    this.initial = kwargs.initial
	    this.showHiddenInitial = kwargs.showHiddenInitial
	    this.helpText = kwargs.helpText || ''
	    this.cssClass = kwargs.cssClass
	    this.validation = normaliseValidation(kwargs.validation)
	    this.controlled = kwargs.controlled
	    this.custom = kwargs.custom
	    this.widgetAttrs = kwargs.widgetAttrs

	    var widget = kwargs.widget || this.widget
	    if (!(widget instanceof Widget)) {
	      // We must have a Widget constructor, so construct with it
	      widget = new widget()
	    }
	    // Let the widget know whether it should display as required
	    widget.isRequired = this.required
	    // Hook into this.getWidgetAttrs() for any Field-specific HTML attributes
	    object.extend(widget.attrs, this.getWidgetAttrs(widget))
	    this.widget = widget

	    // Increment the creation counter and save our local copy
	    this.creationCounter = Field.creationCounter++

	    // Copy error messages for this instance into a new object and override
	    // with any provided error messages.
	    var messages = [{}]
	    for (var i = this.constructor.__mro__.length - 1; i >=0; i--) {
	      messages.push(object.get(this.constructor.__mro__[i].prototype,
	                               'defaultErrorMessages', null))
	    }
	    messages.push(kwargs.errorMessages)
	    this.errorMessages = object.extend.apply(object, messages)

	    this.validators = this.defaultValidators.concat(kwargs.validators)
	  }
	})

	/**
	 * Tracks each time a Field instance is created; used to retain order.
	 */
	Field.creationCounter = 0

	Field.prototype.prepareValue = function(value) {
	  return value
	}

	/**
	 * @param {*} value user input.
	 * @throws {ValidationError} if the input is invalid.
	 */
	Field.prototype.toJavaScript = function(value) {
	  return value
	}

	/**
	 * Checks for the given value being === one of the configured empty values, plus
	 * any additional checks required due to JavaScript's lack of a generic object
	 * equality checking mechanism.
	 */
	Field.prototype.isEmptyValue = function(value) {
	  if (this.emptyValues.indexOf(value) != -1) {
	    return true
	  }
	  return (this.emptyValueArray === true && is.Array(value) && value.length === 0)
	}

	Field.prototype.validate = function(value) {
	  if (this.required && this.isEmptyValue(value)) {
	    throw ValidationError(this.errorMessages.required, {code: 'required'})
	  }
	}

	Field.prototype.runValidators = function(value) {
	  if (this.isEmptyValue(value)) {
	    return
	  }
	  var errors = []
	  for (var i = 0, l = this.validators.length; i < l; i++) {
	    var validator = this.validators[i]
	    try {
	      validator(value)
	    }
	    catch (e) {
	      if (!(e instanceof ValidationError)) { throw e }
	      if (object.hasOwn(e, 'code') &&
	          object.hasOwn(this.errorMessages, e.code)) {
	        e.message = this.errorMessages[e.code]
	      }
	      errors.push.apply(errors, e.errorList)
	    }
	  }
	  if (errors.length > 0) {
	    throw ValidationError(errors)
	  }
	}

	/**
	 * Validates the given value and returns its "cleaned" value as an appropriate
	 * JavaScript object.
	 * @param {string} value user input.
	 * @throws {ValidationError} if the input is invalid.
	 */
	Field.prototype.clean = function(value) {
	  value = this.toJavaScript(value)
	  this.validate(value)
	  this.runValidators(value)
	  return value
	}

	/**
	 * Return the value that should be shown for this field on render of a bound
	 * form, given the submitted data for the field and the initial data, if any.
	 * For most fields, this will simply be data; FileFields need to handle it a bit
	 * differently.
	 */
	Field.prototype.boundData = function(data, initial) {
	  return data
	}

	/**
	 * Specifies HTML attributes which should be added to a given widget for this
	 * field.
	 * @param {Widget} widget a widget.
	 * @return {Object} an object specifying HTML attributes that should be added to
	 *   the given widget when rendered, based on this field.
	 */
	Field.prototype.getWidgetAttrs = function(widget) {
	  return object.extend({}, this.widgetAttrs)
	}

	/**
	 * @return {boolean} true if data differs from initial.
	 */
	Field.prototype._hasChanged = function(initial, data) {
	  // For purposes of seeing whether something has changed, null is the same
	  // as an empty string, if the data or initial value we get is null, replace
	  // it with ''.
	  var initialValue = (initial === null ? '' : initial)
	  try {
	    data = this.toJavaScript(data)
	    if (typeof this._coerce == 'function') {
	      data = this._coerce(data)
	    }
	  }
	  catch (e) {
	    if (!(e instanceof ValidationError)) { throw e }
	    return true
	  }
	  var dataValue = (data === null ? '' : data)
	  return (''+initialValue != ''+dataValue) // TODO is forcing to string necessary?
	}

	module.exports = Field

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Input = __webpack_require__(22)

	/**
	 * An HTML <input type="hidden"> widget.
	 * @constructor
	 * @extends {Input}
	 * @param {Object=} kwargs
	 */
	var HiddenInput = Input.extend({
	  constructor: function HiddenInput(kwargs) {
	    if (!(this instanceof HiddenInput)) { return new HiddenInput(kwargs) }
	    Input.call(this, kwargs)
	  }
	, inputType: 'hidden'
	, isHidden: true
	})

	module.exports = HiddenInput

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)
	var React = __webpack_require__(23)

	var Widget = __webpack_require__(59)

	/**
	 * An HTML <input> widget.
	 * @constructor
	 * @extends {Widget}
	 * @param {Object=} kwargs
	 */
	var Input = Widget.extend({
	  constructor: function Input(kwargs) {
	    if (!(this instanceof Input)) { return new Input(kwargs) }
	    Widget.call(this, kwargs)
	  }
	  /** The type attribute of this input - subclasses must define it. */
	, inputType: null
	})

	Input.prototype._formatValue = function(value) {
	  return value
	}

	Input.prototype.render = function(name, value, kwargs) {
	  kwargs = object.extend({attrs: null}, kwargs)
	  if (value === null) {
	    value = ''
	  }
	  var finalAttrs = this.buildAttrs(kwargs.attrs, {type: this.inputType,
	                                                  name: name})
	  // Hidden inputs can be made controlled inputs by default, as the user
	  // can't directly interact with them.
	  var valueAttr = (kwargs.controlled || this.isHidden ? 'value' : 'defaultValue')
	  if (!(valueAttr == 'defaultValue' && value === '')) {
	    finalAttrs[valueAttr] = (value !== '' ? ''+this._formatValue(value) : value)
	  }
	  return React.createElement('input', finalAttrs)
	}

	module.exports = Input

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(24);


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule React
	 */

	'use strict';

	var _assign = __webpack_require__(25);

	var ReactChildren = __webpack_require__(26);
	var ReactComponent = __webpack_require__(37);
	var ReactClass = __webpack_require__(48);
	var ReactDOMFactories = __webpack_require__(53);
	var ReactElement = __webpack_require__(29);
	var ReactElementValidator = __webpack_require__(54);
	var ReactPropTypes = __webpack_require__(56);
	var ReactVersion = __webpack_require__(57);

	var onlyChild = __webpack_require__(58);
	var warning = __webpack_require__(31);

	var createElement = ReactElement.createElement;
	var createFactory = ReactElement.createFactory;
	var cloneElement = ReactElement.cloneElement;

	if (process.env.NODE_ENV !== 'production') {
	  createElement = ReactElementValidator.createElement;
	  createFactory = ReactElementValidator.createFactory;
	  cloneElement = ReactElementValidator.cloneElement;
	}

	var __spread = _assign;

	if (process.env.NODE_ENV !== 'production') {
	  var warned = false;
	  __spread = function () {
	    process.env.NODE_ENV !== 'production' ? warning(warned, 'React.__spread is deprecated and should not be used. Use ' + 'Object.assign directly or another helper function with similar ' + 'semantics. You may be seeing this warning due to your compiler. ' + 'See https://fb.me/react-spread-deprecation for more details.') : void 0;
	    warned = true;
	    return _assign.apply(null, arguments);
	  };
	}

	var React = {

	  // Modern

	  Children: {
	    map: ReactChildren.map,
	    forEach: ReactChildren.forEach,
	    count: ReactChildren.count,
	    toArray: ReactChildren.toArray,
	    only: onlyChild
	  },

	  Component: ReactComponent,

	  createElement: createElement,
	  cloneElement: cloneElement,
	  isValidElement: ReactElement.isValidElement,

	  // Classic

	  PropTypes: ReactPropTypes,
	  createClass: ReactClass.createClass,
	  createFactory: createFactory,
	  createMixin: function (mixin) {
	    // Currently a noop. Will be used to validate and trace mixins.
	    return mixin;
	  },

	  // This looks DOM specific but these are actually isomorphic helpers
	  // since they are just generating DOM strings.
	  DOM: ReactDOMFactories,

	  version: ReactVersion,

	  // Deprecated hook for JSX spread, don't use this for anything.
	  __spread: __spread
	};

	module.exports = React;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';
	/* eslint-disable no-unused-vars */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (e) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactChildren
	 */

	'use strict';

	var PooledClass = __webpack_require__(27);
	var ReactElement = __webpack_require__(29);

	var emptyFunction = __webpack_require__(32);
	var traverseAllChildren = __webpack_require__(34);

	var twoArgumentPooler = PooledClass.twoArgumentPooler;
	var fourArgumentPooler = PooledClass.fourArgumentPooler;

	var userProvidedKeyEscapeRegex = /\/+/g;
	function escapeUserProvidedKey(text) {
	  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
	}

	/**
	 * PooledClass representing the bookkeeping associated with performing a child
	 * traversal. Allows avoiding binding callbacks.
	 *
	 * @constructor ForEachBookKeeping
	 * @param {!function} forEachFunction Function to perform traversal with.
	 * @param {?*} forEachContext Context to perform context with.
	 */
	function ForEachBookKeeping(forEachFunction, forEachContext) {
	  this.func = forEachFunction;
	  this.context = forEachContext;
	  this.count = 0;
	}
	ForEachBookKeeping.prototype.destructor = function () {
	  this.func = null;
	  this.context = null;
	  this.count = 0;
	};
	PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);

	function forEachSingleChild(bookKeeping, child, name) {
	  var func = bookKeeping.func;
	  var context = bookKeeping.context;

	  func.call(context, child, bookKeeping.count++);
	}

	/**
	 * Iterates through children that are typically specified as `props.children`.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.foreach
	 *
	 * The provided forEachFunc(child, index) will be called for each
	 * leaf child.
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} forEachFunc
	 * @param {*} forEachContext Context for forEachContext.
	 */
	function forEachChildren(children, forEachFunc, forEachContext) {
	  if (children == null) {
	    return children;
	  }
	  var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
	  traverseAllChildren(children, forEachSingleChild, traverseContext);
	  ForEachBookKeeping.release(traverseContext);
	}

	/**
	 * PooledClass representing the bookkeeping associated with performing a child
	 * mapping. Allows avoiding binding callbacks.
	 *
	 * @constructor MapBookKeeping
	 * @param {!*} mapResult Object containing the ordered map of results.
	 * @param {!function} mapFunction Function to perform mapping with.
	 * @param {?*} mapContext Context to perform mapping with.
	 */
	function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
	  this.result = mapResult;
	  this.keyPrefix = keyPrefix;
	  this.func = mapFunction;
	  this.context = mapContext;
	  this.count = 0;
	}
	MapBookKeeping.prototype.destructor = function () {
	  this.result = null;
	  this.keyPrefix = null;
	  this.func = null;
	  this.context = null;
	  this.count = 0;
	};
	PooledClass.addPoolingTo(MapBookKeeping, fourArgumentPooler);

	function mapSingleChildIntoContext(bookKeeping, child, childKey) {
	  var result = bookKeeping.result;
	  var keyPrefix = bookKeeping.keyPrefix;
	  var func = bookKeeping.func;
	  var context = bookKeeping.context;


	  var mappedChild = func.call(context, child, bookKeeping.count++);
	  if (Array.isArray(mappedChild)) {
	    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
	  } else if (mappedChild != null) {
	    if (ReactElement.isValidElement(mappedChild)) {
	      mappedChild = ReactElement.cloneAndReplaceKey(mappedChild,
	      // Keep both the (mapped) and old keys if they differ, just as
	      // traverseAllChildren used to do for objects as children
	      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
	    }
	    result.push(mappedChild);
	  }
	}

	function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
	  var escapedPrefix = '';
	  if (prefix != null) {
	    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
	  }
	  var traverseContext = MapBookKeeping.getPooled(array, escapedPrefix, func, context);
	  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
	  MapBookKeeping.release(traverseContext);
	}

	/**
	 * Maps children that are typically specified as `props.children`.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.map
	 *
	 * The provided mapFunction(child, key, index) will be called for each
	 * leaf child.
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} func The map function.
	 * @param {*} context Context for mapFunction.
	 * @return {object} Object containing the ordered map of results.
	 */
	function mapChildren(children, func, context) {
	  if (children == null) {
	    return children;
	  }
	  var result = [];
	  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
	  return result;
	}

	function forEachSingleChildDummy(traverseContext, child, name) {
	  return null;
	}

	/**
	 * Count the number of children that are typically specified as
	 * `props.children`.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.count
	 *
	 * @param {?*} children Children tree container.
	 * @return {number} The number of children.
	 */
	function countChildren(children, context) {
	  return traverseAllChildren(children, forEachSingleChildDummy, null);
	}

	/**
	 * Flatten a children object (typically specified as `props.children`) and
	 * return an array with appropriately re-keyed children.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.toarray
	 */
	function toArray(children) {
	  var result = [];
	  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
	  return result;
	}

	var ReactChildren = {
	  forEach: forEachChildren,
	  map: mapChildren,
	  mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
	  count: countChildren,
	  toArray: toArray
	};

	module.exports = ReactChildren;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule PooledClass
	 */

	'use strict';

	var invariant = __webpack_require__(28);

	/**
	 * Static poolers. Several custom versions for each potential number of
	 * arguments. A completely generic pooler is easy to implement, but would
	 * require accessing the `arguments` object. In each of these, `this` refers to
	 * the Class itself, not an instance. If any others are needed, simply add them
	 * here, or in their own files.
	 */
	var oneArgumentPooler = function (copyFieldsFrom) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, copyFieldsFrom);
	    return instance;
	  } else {
	    return new Klass(copyFieldsFrom);
	  }
	};

	var twoArgumentPooler = function (a1, a2) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2);
	    return instance;
	  } else {
	    return new Klass(a1, a2);
	  }
	};

	var threeArgumentPooler = function (a1, a2, a3) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3);
	  }
	};

	var fourArgumentPooler = function (a1, a2, a3, a4) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3, a4);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3, a4);
	  }
	};

	var fiveArgumentPooler = function (a1, a2, a3, a4, a5) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3, a4, a5);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3, a4, a5);
	  }
	};

	var standardReleaser = function (instance) {
	  var Klass = this;
	  !(instance instanceof Klass) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Trying to release an instance into a pool of a different type.') : invariant(false) : void 0;
	  instance.destructor();
	  if (Klass.instancePool.length < Klass.poolSize) {
	    Klass.instancePool.push(instance);
	  }
	};

	var DEFAULT_POOL_SIZE = 10;
	var DEFAULT_POOLER = oneArgumentPooler;

	/**
	 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
	 * itself (statically) not adding any prototypical fields. Any CopyConstructor
	 * you give this may have a `poolSize` property, and will look for a
	 * prototypical `destructor` on instances (optional).
	 *
	 * @param {Function} CopyConstructor Constructor that can be used to reset.
	 * @param {Function} pooler Customizable pooler.
	 */
	var addPoolingTo = function (CopyConstructor, pooler) {
	  var NewKlass = CopyConstructor;
	  NewKlass.instancePool = [];
	  NewKlass.getPooled = pooler || DEFAULT_POOLER;
	  if (!NewKlass.poolSize) {
	    NewKlass.poolSize = DEFAULT_POOL_SIZE;
	  }
	  NewKlass.release = standardReleaser;
	  return NewKlass;
	};

	var PooledClass = {
	  addPoolingTo: addPoolingTo,
	  oneArgumentPooler: oneArgumentPooler,
	  twoArgumentPooler: twoArgumentPooler,
	  threeArgumentPooler: threeArgumentPooler,
	  fourArgumentPooler: fourArgumentPooler,
	  fiveArgumentPooler: fiveArgumentPooler
	};

	module.exports = PooledClass;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	function invariant(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactElement
	 */

	'use strict';

	var _assign = __webpack_require__(25);

	var ReactCurrentOwner = __webpack_require__(30);

	var warning = __webpack_require__(31);
	var canDefineProperty = __webpack_require__(33);

	// The Symbol used to tag the ReactElement type. If there is no native Symbol
	// nor polyfill, then a plain number is used for performance.
	var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

	var RESERVED_PROPS = {
	  key: true,
	  ref: true,
	  __self: true,
	  __source: true
	};

	var specialPropKeyWarningShown, specialPropRefWarningShown;

	/**
	 * Factory method to create a new React element. This no longer adheres to
	 * the class pattern, so do not use new to call it. Also, no instanceof check
	 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
	 * if something is a React Element.
	 *
	 * @param {*} type
	 * @param {*} key
	 * @param {string|object} ref
	 * @param {*} self A *temporary* helper to detect places where `this` is
	 * different from the `owner` when React.createElement is called, so that we
	 * can warn. We want to get rid of owner and replace string `ref`s with arrow
	 * functions, and as long as `this` and owner are the same, there will be no
	 * change in behavior.
	 * @param {*} source An annotation object (added by a transpiler or otherwise)
	 * indicating filename, line number, and/or other information.
	 * @param {*} owner
	 * @param {*} props
	 * @internal
	 */
	var ReactElement = function (type, key, ref, self, source, owner, props) {
	  var element = {
	    // This tag allow us to uniquely identify this as a React Element
	    $$typeof: REACT_ELEMENT_TYPE,

	    // Built-in properties that belong on the element
	    type: type,
	    key: key,
	    ref: ref,
	    props: props,

	    // Record the component responsible for creating this element.
	    _owner: owner
	  };

	  if (process.env.NODE_ENV !== 'production') {
	    // The validation flag is currently mutative. We put it on
	    // an external backing store so that we can freeze the whole object.
	    // This can be replaced with a WeakMap once they are implemented in
	    // commonly used development environments.
	    element._store = {};

	    // To make comparing ReactElements easier for testing purposes, we make
	    // the validation flag non-enumerable (where possible, which should
	    // include every environment we run tests in), so the test framework
	    // ignores it.
	    if (canDefineProperty) {
	      Object.defineProperty(element._store, 'validated', {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: false
	      });
	      // self and source are DEV only properties.
	      Object.defineProperty(element, '_self', {
	        configurable: false,
	        enumerable: false,
	        writable: false,
	        value: self
	      });
	      // Two elements created in two different places should be considered
	      // equal for testing purposes and therefore we hide it from enumeration.
	      Object.defineProperty(element, '_source', {
	        configurable: false,
	        enumerable: false,
	        writable: false,
	        value: source
	      });
	    } else {
	      element._store.validated = false;
	      element._self = self;
	      element._source = source;
	    }
	    if (Object.freeze) {
	      Object.freeze(element.props);
	      Object.freeze(element);
	    }
	  }

	  return element;
	};

	/**
	 * Create and return a new ReactElement of the given type.
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.createelement
	 */
	ReactElement.createElement = function (type, config, children) {
	  var propName;

	  // Reserved names are extracted
	  var props = {};

	  var key = null;
	  var ref = null;
	  var self = null;
	  var source = null;

	  if (config != null) {
	    if (process.env.NODE_ENV !== 'production') {
	      process.env.NODE_ENV !== 'production' ? warning(
	      /* eslint-disable no-proto */
	      config.__proto__ == null || config.__proto__ === Object.prototype,
	      /* eslint-enable no-proto */
	      'React.createElement(...): Expected props argument to be a plain object. ' + 'Properties defined in its prototype chain will be ignored.') : void 0;
	      ref = !config.hasOwnProperty('ref') || Object.getOwnPropertyDescriptor(config, 'ref').get ? null : config.ref;
	      key = !config.hasOwnProperty('key') || Object.getOwnPropertyDescriptor(config, 'key').get ? null : '' + config.key;
	    } else {
	      ref = config.ref === undefined ? null : config.ref;
	      key = config.key === undefined ? null : '' + config.key;
	    }
	    self = config.__self === undefined ? null : config.__self;
	    source = config.__source === undefined ? null : config.__source;
	    // Remaining properties are added to a new props object
	    for (propName in config) {
	      if (config.hasOwnProperty(propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
	        props[propName] = config[propName];
	      }
	    }
	  }

	  // Children can be more than one argument, and those are transferred onto
	  // the newly allocated props object.
	  var childrenLength = arguments.length - 2;
	  if (childrenLength === 1) {
	    props.children = children;
	  } else if (childrenLength > 1) {
	    var childArray = Array(childrenLength);
	    for (var i = 0; i < childrenLength; i++) {
	      childArray[i] = arguments[i + 2];
	    }
	    props.children = childArray;
	  }

	  // Resolve default props
	  if (type && type.defaultProps) {
	    var defaultProps = type.defaultProps;
	    for (propName in defaultProps) {
	      if (props[propName] === undefined) {
	        props[propName] = defaultProps[propName];
	      }
	    }
	  }
	  if (process.env.NODE_ENV !== 'production') {
	    // Create dummy `key` and `ref` property to `props` to warn users
	    // against its use
	    if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
	      if (!props.hasOwnProperty('key')) {
	        Object.defineProperty(props, 'key', {
	          get: function () {
	            if (!specialPropKeyWarningShown) {
	              specialPropKeyWarningShown = true;
	              process.env.NODE_ENV !== 'production' ? warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', typeof type === 'function' && 'displayName' in type ? type.displayName : 'Element') : void 0;
	            }
	            return undefined;
	          },
	          configurable: true
	        });
	      }
	      if (!props.hasOwnProperty('ref')) {
	        Object.defineProperty(props, 'ref', {
	          get: function () {
	            if (!specialPropRefWarningShown) {
	              specialPropRefWarningShown = true;
	              process.env.NODE_ENV !== 'production' ? warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', typeof type === 'function' && 'displayName' in type ? type.displayName : 'Element') : void 0;
	            }
	            return undefined;
	          },
	          configurable: true
	        });
	      }
	    }
	  }
	  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
	};

	/**
	 * Return a function that produces ReactElements of a given type.
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.createfactory
	 */
	ReactElement.createFactory = function (type) {
	  var factory = ReactElement.createElement.bind(null, type);
	  // Expose the type on the factory and the prototype so that it can be
	  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
	  // This should not be named `constructor` since this may not be the function
	  // that created the element, and it may not even be a constructor.
	  // Legacy hook TODO: Warn if this is accessed
	  factory.type = type;
	  return factory;
	};

	ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
	  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

	  return newElement;
	};

	/**
	 * Clone and return a new ReactElement using element as the starting point.
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.cloneelement
	 */
	ReactElement.cloneElement = function (element, config, children) {
	  var propName;

	  // Original props are copied
	  var props = _assign({}, element.props);

	  // Reserved names are extracted
	  var key = element.key;
	  var ref = element.ref;
	  // Self is preserved since the owner is preserved.
	  var self = element._self;
	  // Source is preserved since cloneElement is unlikely to be targeted by a
	  // transpiler, and the original source is probably a better indicator of the
	  // true owner.
	  var source = element._source;

	  // Owner will be preserved, unless ref is overridden
	  var owner = element._owner;

	  if (config != null) {
	    if (process.env.NODE_ENV !== 'production') {
	      process.env.NODE_ENV !== 'production' ? warning(
	      /* eslint-disable no-proto */
	      config.__proto__ == null || config.__proto__ === Object.prototype,
	      /* eslint-enable no-proto */
	      'React.cloneElement(...): Expected props argument to be a plain object. ' + 'Properties defined in its prototype chain will be ignored.') : void 0;
	    }
	    if (config.ref !== undefined) {
	      // Silently steal the ref from the parent.
	      ref = config.ref;
	      owner = ReactCurrentOwner.current;
	    }
	    if (config.key !== undefined) {
	      key = '' + config.key;
	    }
	    // Remaining properties override existing props
	    var defaultProps;
	    if (element.type && element.type.defaultProps) {
	      defaultProps = element.type.defaultProps;
	    }
	    for (propName in config) {
	      if (config.hasOwnProperty(propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
	        if (config[propName] === undefined && defaultProps !== undefined) {
	          // Resolve default props
	          props[propName] = defaultProps[propName];
	        } else {
	          props[propName] = config[propName];
	        }
	      }
	    }
	  }

	  // Children can be more than one argument, and those are transferred onto
	  // the newly allocated props object.
	  var childrenLength = arguments.length - 2;
	  if (childrenLength === 1) {
	    props.children = children;
	  } else if (childrenLength > 1) {
	    var childArray = Array(childrenLength);
	    for (var i = 0; i < childrenLength; i++) {
	      childArray[i] = arguments[i + 2];
	    }
	    props.children = childArray;
	  }

	  return ReactElement(element.type, key, ref, self, source, owner, props);
	};

	/**
	 * Verifies the object is a ReactElement.
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.isvalidelement
	 * @param {?object} object
	 * @return {boolean} True if `object` is a valid component.
	 * @final
	 */
	ReactElement.isValidElement = function (object) {
	  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	};

	module.exports = ReactElement;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 30 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactCurrentOwner
	 */

	'use strict';

	/**
	 * Keeps track of the current owner.
	 *
	 * The current owner is the component who should own any components that are
	 * currently being constructed.
	 */

	var ReactCurrentOwner = {

	  /**
	   * @internal
	   * @type {ReactComponent}
	   */
	  current: null

	};

	module.exports = ReactCurrentOwner;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var emptyFunction = __webpack_require__(32);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if (process.env.NODE_ENV !== 'production') {
	  warning = function warning(condition, format) {
	    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	      args[_key - 2] = arguments[_key];
	    }

	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }

	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }

	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // --- Welcome to debugging React ---
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch (x) {}
	    }
	  };
	}

	module.exports = warning;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 32 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule canDefineProperty
	 */

	'use strict';

	var canDefineProperty = false;
	if (process.env.NODE_ENV !== 'production') {
	  try {
	    Object.defineProperty({}, 'x', { get: function () {} });
	    canDefineProperty = true;
	  } catch (x) {
	    // IE will fail on defineProperty
	  }
	}

	module.exports = canDefineProperty;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule traverseAllChildren
	 */

	'use strict';

	var ReactCurrentOwner = __webpack_require__(30);
	var ReactElement = __webpack_require__(29);

	var getIteratorFn = __webpack_require__(35);
	var invariant = __webpack_require__(28);
	var KeyEscapeUtils = __webpack_require__(36);
	var warning = __webpack_require__(31);

	var SEPARATOR = '.';
	var SUBSEPARATOR = ':';

	/**
	 * TODO: Test that a single child and an array with one item have the same key
	 * pattern.
	 */

	var didWarnAboutMaps = false;

	/**
	 * Generate a key string that identifies a component within a set.
	 *
	 * @param {*} component A component that could contain a manual key.
	 * @param {number} index Index that is used if a manual key is not provided.
	 * @return {string}
	 */
	function getComponentKey(component, index) {
	  // Do some typechecking here since we call this blindly. We want to ensure
	  // that we don't block potential future ES APIs.
	  if (component && typeof component === 'object' && component.key != null) {
	    // Explicit key
	    return KeyEscapeUtils.escape(component.key);
	  }
	  // Implicit key determined by the index in the set
	  return index.toString(36);
	}

	/**
	 * @param {?*} children Children tree container.
	 * @param {!string} nameSoFar Name of the key path so far.
	 * @param {!function} callback Callback to invoke with each child found.
	 * @param {?*} traverseContext Used to pass information throughout the traversal
	 * process.
	 * @return {!number} The number of children in this subtree.
	 */
	function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
	  var type = typeof children;

	  if (type === 'undefined' || type === 'boolean') {
	    // All of the above are perceived as null.
	    children = null;
	  }

	  if (children === null || type === 'string' || type === 'number' || ReactElement.isValidElement(children)) {
	    callback(traverseContext, children,
	    // If it's the only child, treat the name as if it was wrapped in an array
	    // so that it's consistent if the number of children grows.
	    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
	    return 1;
	  }

	  var child;
	  var nextName;
	  var subtreeCount = 0; // Count of children found in the current subtree.
	  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

	  if (Array.isArray(children)) {
	    for (var i = 0; i < children.length; i++) {
	      child = children[i];
	      nextName = nextNamePrefix + getComponentKey(child, i);
	      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	    }
	  } else {
	    var iteratorFn = getIteratorFn(children);
	    if (iteratorFn) {
	      var iterator = iteratorFn.call(children);
	      var step;
	      if (iteratorFn !== children.entries) {
	        var ii = 0;
	        while (!(step = iterator.next()).done) {
	          child = step.value;
	          nextName = nextNamePrefix + getComponentKey(child, ii++);
	          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	        }
	      } else {
	        if (process.env.NODE_ENV !== 'production') {
	          process.env.NODE_ENV !== 'production' ? warning(didWarnAboutMaps, 'Using Maps as children is not yet fully supported. It is an ' + 'experimental feature that might be removed. Convert it to a ' + 'sequence / iterable of keyed ReactElements instead.') : void 0;
	          didWarnAboutMaps = true;
	        }
	        // Iterator will provide entry [k,v] tuples rather than values.
	        while (!(step = iterator.next()).done) {
	          var entry = step.value;
	          if (entry) {
	            child = entry[1];
	            nextName = nextNamePrefix + KeyEscapeUtils.escape(entry[0]) + SUBSEPARATOR + getComponentKey(child, 0);
	            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	          }
	        }
	      }
	    } else if (type === 'object') {
	      var addendum = '';
	      if (process.env.NODE_ENV !== 'production') {
	        addendum = ' If you meant to render a collection of children, use an array ' + 'instead or wrap the object using createFragment(object) from the ' + 'React add-ons.';
	        if (children._isReactElement) {
	          addendum = ' It looks like you\'re using an element created by a different ' + 'version of React. Make sure to use only one copy of React.';
	        }
	        if (ReactCurrentOwner.current) {
	          var name = ReactCurrentOwner.current.getName();
	          if (name) {
	            addendum += ' Check the render method of `' + name + '`.';
	          }
	        }
	      }
	      var childrenString = String(children);
	       true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : invariant(false) : void 0;
	    }
	  }

	  return subtreeCount;
	}

	/**
	 * Traverses children that are typically specified as `props.children`, but
	 * might also be specified through attributes:
	 *
	 * - `traverseAllChildren(this.props.children, ...)`
	 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
	 *
	 * The `traverseContext` is an optional argument that is passed through the
	 * entire traversal. It can be used to store accumulations or anything else that
	 * the callback might find relevant.
	 *
	 * @param {?*} children Children tree object.
	 * @param {!function} callback To invoke upon traversing each child.
	 * @param {?*} traverseContext Context for traversal.
	 * @return {!number} The number of children in this subtree.
	 */
	function traverseAllChildren(children, callback, traverseContext) {
	  if (children == null) {
	    return 0;
	  }

	  return traverseAllChildrenImpl(children, '', callback, traverseContext);
	}

	module.exports = traverseAllChildren;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 35 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getIteratorFn
	 */

	'use strict';

	/* global Symbol */

	var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	/**
	 * Returns the iterator method function contained on the iterable object.
	 *
	 * Be sure to invoke the function with the iterable as context:
	 *
	 *     var iteratorFn = getIteratorFn(myIterable);
	 *     if (iteratorFn) {
	 *       var iterator = iteratorFn.call(myIterable);
	 *       ...
	 *     }
	 *
	 * @param {?object} maybeIterable
	 * @return {?function}
	 */
	function getIteratorFn(maybeIterable) {
	  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	  if (typeof iteratorFn === 'function') {
	    return iteratorFn;
	  }
	}

	module.exports = getIteratorFn;

/***/ },
/* 36 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule KeyEscapeUtils
	 */

	'use strict';

	/**
	 * Escape and wrap key so it is safe to use as a reactid
	 *
	 * @param {*} key to be escaped.
	 * @return {string} the escaped key.
	 */

	function escape(key) {
	  var escapeRegex = /[=:]/g;
	  var escaperLookup = {
	    '=': '=0',
	    ':': '=2'
	  };
	  var escapedString = ('' + key).replace(escapeRegex, function (match) {
	    return escaperLookup[match];
	  });

	  return '$' + escapedString;
	}

	/**
	 * Unescape and unwrap key for human-readable display
	 *
	 * @param {string} key to unescape.
	 * @return {string} the unescaped key.
	 */
	function unescape(key) {
	  var unescapeRegex = /(=0|=2)/g;
	  var unescaperLookup = {
	    '=0': '=',
	    '=2': ':'
	  };
	  var keySubstring = key[0] === '.' && key[1] === '$' ? key.substring(2) : key.substring(1);

	  return ('' + keySubstring).replace(unescapeRegex, function (match) {
	    return unescaperLookup[match];
	  });
	}

	var KeyEscapeUtils = {
	  escape: escape,
	  unescape: unescape
	};

	module.exports = KeyEscapeUtils;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactComponent
	 */

	'use strict';

	var ReactNoopUpdateQueue = __webpack_require__(38);
	var ReactInstrumentation = __webpack_require__(39);

	var canDefineProperty = __webpack_require__(33);
	var emptyObject = __webpack_require__(47);
	var invariant = __webpack_require__(28);
	var warning = __webpack_require__(31);

	/**
	 * Base class helpers for the updating state of a component.
	 */
	function ReactComponent(props, context, updater) {
	  this.props = props;
	  this.context = context;
	  this.refs = emptyObject;
	  // We initialize the default updater but the real one gets injected by the
	  // renderer.
	  this.updater = updater || ReactNoopUpdateQueue;
	}

	ReactComponent.prototype.isReactComponent = {};

	/**
	 * Sets a subset of the state. Always use this to mutate
	 * state. You should treat `this.state` as immutable.
	 *
	 * There is no guarantee that `this.state` will be immediately updated, so
	 * accessing `this.state` after calling this method may return the old value.
	 *
	 * There is no guarantee that calls to `setState` will run synchronously,
	 * as they may eventually be batched together.  You can provide an optional
	 * callback that will be executed when the call to setState is actually
	 * completed.
	 *
	 * When a function is provided to setState, it will be called at some point in
	 * the future (not synchronously). It will be called with the up to date
	 * component arguments (state, props, context). These values can be different
	 * from this.* because your function may be called after receiveProps but before
	 * shouldComponentUpdate, and this new state, props, and context will not yet be
	 * assigned to this.
	 *
	 * @param {object|function} partialState Next partial state or function to
	 *        produce next partial state to be merged with current state.
	 * @param {?function} callback Called after state is updated.
	 * @final
	 * @protected
	 */
	ReactComponent.prototype.setState = function (partialState, callback) {
	  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'setState(...): takes an object of state variables to update or a ' + 'function which returns an object of state variables.') : invariant(false) : void 0;
	  if (process.env.NODE_ENV !== 'production') {
	    ReactInstrumentation.debugTool.onSetState();
	    process.env.NODE_ENV !== 'production' ? warning(partialState != null, 'setState(...): You passed an undefined or null state object; ' + 'instead, use forceUpdate().') : void 0;
	  }
	  this.updater.enqueueSetState(this, partialState);
	  if (callback) {
	    this.updater.enqueueCallback(this, callback, 'setState');
	  }
	};

	/**
	 * Forces an update. This should only be invoked when it is known with
	 * certainty that we are **not** in a DOM transaction.
	 *
	 * You may want to call this when you know that some deeper aspect of the
	 * component's state has changed but `setState` was not called.
	 *
	 * This will not invoke `shouldComponentUpdate`, but it will invoke
	 * `componentWillUpdate` and `componentDidUpdate`.
	 *
	 * @param {?function} callback Called after update is complete.
	 * @final
	 * @protected
	 */
	ReactComponent.prototype.forceUpdate = function (callback) {
	  this.updater.enqueueForceUpdate(this);
	  if (callback) {
	    this.updater.enqueueCallback(this, callback, 'forceUpdate');
	  }
	};

	/**
	 * Deprecated APIs. These APIs used to exist on classic React classes but since
	 * we would like to deprecate them, we're not going to move them over to this
	 * modern base class. Instead, we define a getter that warns if it's accessed.
	 */
	if (process.env.NODE_ENV !== 'production') {
	  var deprecatedAPIs = {
	    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
	    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
	  };
	  var defineDeprecationWarning = function (methodName, info) {
	    if (canDefineProperty) {
	      Object.defineProperty(ReactComponent.prototype, methodName, {
	        get: function () {
	          process.env.NODE_ENV !== 'production' ? warning(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]) : void 0;
	          return undefined;
	        }
	      });
	    }
	  };
	  for (var fnName in deprecatedAPIs) {
	    if (deprecatedAPIs.hasOwnProperty(fnName)) {
	      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
	    }
	  }
	}

	module.exports = ReactComponent;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2015-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactNoopUpdateQueue
	 */

	'use strict';

	var warning = __webpack_require__(31);

	function warnTDZ(publicInstance, callerName) {
	  if (process.env.NODE_ENV !== 'production') {
	    process.env.NODE_ENV !== 'production' ? warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, publicInstance.constructor && publicInstance.constructor.displayName || '') : void 0;
	  }
	}

	/**
	 * This is the abstract API for an update queue.
	 */
	var ReactNoopUpdateQueue = {

	  /**
	   * Checks whether or not this composite component is mounted.
	   * @param {ReactClass} publicInstance The instance we want to test.
	   * @return {boolean} True if mounted, false otherwise.
	   * @protected
	   * @final
	   */
	  isMounted: function (publicInstance) {
	    return false;
	  },

	  /**
	   * Enqueue a callback that will be executed after all the pending updates
	   * have processed.
	   *
	   * @param {ReactClass} publicInstance The instance to use as `this` context.
	   * @param {?function} callback Called after state is updated.
	   * @internal
	   */
	  enqueueCallback: function (publicInstance, callback) {},

	  /**
	   * Forces an update. This should only be invoked when it is known with
	   * certainty that we are **not** in a DOM transaction.
	   *
	   * You may want to call this when you know that some deeper aspect of the
	   * component's state has changed but `setState` was not called.
	   *
	   * This will not invoke `shouldComponentUpdate`, but it will invoke
	   * `componentWillUpdate` and `componentDidUpdate`.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @internal
	   */
	  enqueueForceUpdate: function (publicInstance) {
	    warnTDZ(publicInstance, 'forceUpdate');
	  },

	  /**
	   * Replaces all of the state. Always use this or `setState` to mutate state.
	   * You should treat `this.state` as immutable.
	   *
	   * There is no guarantee that `this.state` will be immediately updated, so
	   * accessing `this.state` after calling this method may return the old value.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} completeState Next state.
	   * @internal
	   */
	  enqueueReplaceState: function (publicInstance, completeState) {
	    warnTDZ(publicInstance, 'replaceState');
	  },

	  /**
	   * Sets a subset of the state. This only exists because _pendingState is
	   * internal. This provides a merging strategy that is not available to deep
	   * properties which is confusing. TODO: Expose pendingState or don't use it
	   * during the merge.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} partialState Next partial state to be merged with state.
	   * @internal
	   */
	  enqueueSetState: function (publicInstance, partialState) {
	    warnTDZ(publicInstance, 'setState');
	  }
	};

	module.exports = ReactNoopUpdateQueue;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactInstrumentation
	 */

	'use strict';

	var ReactDebugTool = __webpack_require__(40);

	module.exports = { debugTool: ReactDebugTool };

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactDebugTool
	 */

	'use strict';

	var ExecutionEnvironment = __webpack_require__(41);

	var performanceNow = __webpack_require__(42);
	var warning = __webpack_require__(31);

	var eventHandlers = [];
	var handlerDoesThrowForEvent = {};

	function emitEvent(handlerFunctionName, arg1, arg2, arg3, arg4, arg5) {
	  if (process.env.NODE_ENV !== 'production') {
	    eventHandlers.forEach(function (handler) {
	      try {
	        if (handler[handlerFunctionName]) {
	          handler[handlerFunctionName](arg1, arg2, arg3, arg4, arg5);
	        }
	      } catch (e) {
	        process.env.NODE_ENV !== 'production' ? warning(!handlerDoesThrowForEvent[handlerFunctionName], 'exception thrown by devtool while handling %s: %s', handlerFunctionName, e.message) : void 0;
	        handlerDoesThrowForEvent[handlerFunctionName] = true;
	      }
	    });
	  }
	}

	var isProfiling = false;
	var flushHistory = [];
	var currentFlushNesting = 0;
	var currentFlushMeasurements = null;
	var currentFlushStartTime = null;
	var currentTimerDebugID = null;
	var currentTimerStartTime = null;
	var currentTimerType = null;

	function clearHistory() {
	  ReactComponentTreeDevtool.purgeUnmountedComponents();
	  ReactNativeOperationHistoryDevtool.clearHistory();
	}

	function getTreeSnapshot(registeredIDs) {
	  return registeredIDs.reduce(function (tree, id) {
	    var ownerID = ReactComponentTreeDevtool.getOwnerID(id);
	    var parentID = ReactComponentTreeDevtool.getParentID(id);
	    tree[id] = {
	      displayName: ReactComponentTreeDevtool.getDisplayName(id),
	      text: ReactComponentTreeDevtool.getText(id),
	      updateCount: ReactComponentTreeDevtool.getUpdateCount(id),
	      childIDs: ReactComponentTreeDevtool.getChildIDs(id),
	      // Text nodes don't have owners but this is close enough.
	      ownerID: ownerID || ReactComponentTreeDevtool.getOwnerID(parentID),
	      parentID: parentID
	    };
	    return tree;
	  }, {});
	}

	function resetMeasurements() {
	  if (process.env.NODE_ENV !== 'production') {
	    var previousStartTime = currentFlushStartTime;
	    var previousMeasurements = currentFlushMeasurements || [];
	    var previousOperations = ReactNativeOperationHistoryDevtool.getHistory();

	    if (!isProfiling || currentFlushNesting === 0) {
	      currentFlushStartTime = null;
	      currentFlushMeasurements = null;
	      clearHistory();
	      return;
	    }

	    if (previousMeasurements.length || previousOperations.length) {
	      var registeredIDs = ReactComponentTreeDevtool.getRegisteredIDs();
	      flushHistory.push({
	        duration: performanceNow() - previousStartTime,
	        measurements: previousMeasurements || [],
	        operations: previousOperations || [],
	        treeSnapshot: getTreeSnapshot(registeredIDs)
	      });
	    }

	    clearHistory();
	    currentFlushStartTime = performanceNow();
	    currentFlushMeasurements = [];
	  }
	}

	function checkDebugID(debugID) {
	  process.env.NODE_ENV !== 'production' ? warning(debugID, 'ReactDebugTool: debugID may not be empty.') : void 0;
	}

	var ReactDebugTool = {
	  addDevtool: function (devtool) {
	    eventHandlers.push(devtool);
	  },
	  removeDevtool: function (devtool) {
	    for (var i = 0; i < eventHandlers.length; i++) {
	      if (eventHandlers[i] === devtool) {
	        eventHandlers.splice(i, 1);
	        i--;
	      }
	    }
	  },
	  beginProfiling: function () {
	    if (process.env.NODE_ENV !== 'production') {
	      if (isProfiling) {
	        return;
	      }

	      isProfiling = true;
	      flushHistory.length = 0;
	      resetMeasurements();
	    }
	  },
	  endProfiling: function () {
	    if (process.env.NODE_ENV !== 'production') {
	      if (!isProfiling) {
	        return;
	      }

	      isProfiling = false;
	      resetMeasurements();
	    }
	  },
	  getFlushHistory: function () {
	    if (process.env.NODE_ENV !== 'production') {
	      return flushHistory;
	    }
	  },
	  onBeginFlush: function () {
	    if (process.env.NODE_ENV !== 'production') {
	      currentFlushNesting++;
	      resetMeasurements();
	    }
	    emitEvent('onBeginFlush');
	  },
	  onEndFlush: function () {
	    if (process.env.NODE_ENV !== 'production') {
	      resetMeasurements();
	      currentFlushNesting--;
	    }
	    emitEvent('onEndFlush');
	  },
	  onBeginLifeCycleTimer: function (debugID, timerType) {
	    checkDebugID(debugID);
	    emitEvent('onBeginLifeCycleTimer', debugID, timerType);
	    if (process.env.NODE_ENV !== 'production') {
	      if (isProfiling && currentFlushNesting > 0) {
	        process.env.NODE_ENV !== 'production' ? warning(!currentTimerType, 'There is an internal error in the React performance measurement code. ' + 'Did not expect %s timer to start while %s timer is still in ' + 'progress for %s instance.', timerType, currentTimerType || 'no', debugID === currentTimerDebugID ? 'the same' : 'another') : void 0;
	        currentTimerStartTime = performanceNow();
	        currentTimerDebugID = debugID;
	        currentTimerType = timerType;
	      }
	    }
	  },
	  onEndLifeCycleTimer: function (debugID, timerType) {
	    checkDebugID(debugID);
	    if (process.env.NODE_ENV !== 'production') {
	      if (isProfiling && currentFlushNesting > 0) {
	        process.env.NODE_ENV !== 'production' ? warning(currentTimerType === timerType, 'There is an internal error in the React performance measurement code. ' + 'We did not expect %s timer to stop while %s timer is still in ' + 'progress for %s instance. Please report this as a bug in React.', timerType, currentTimerType || 'no', debugID === currentTimerDebugID ? 'the same' : 'another') : void 0;
	        currentFlushMeasurements.push({
	          timerType: timerType,
	          instanceID: debugID,
	          duration: performanceNow() - currentTimerStartTime
	        });
	        currentTimerStartTime = null;
	        currentTimerDebugID = null;
	        currentTimerType = null;
	      }
	    }
	    emitEvent('onEndLifeCycleTimer', debugID, timerType);
	  },
	  onBeginReconcilerTimer: function (debugID, timerType) {
	    checkDebugID(debugID);
	    emitEvent('onBeginReconcilerTimer', debugID, timerType);
	  },
	  onEndReconcilerTimer: function (debugID, timerType) {
	    checkDebugID(debugID);
	    emitEvent('onEndReconcilerTimer', debugID, timerType);
	  },
	  onBeginProcessingChildContext: function () {
	    emitEvent('onBeginProcessingChildContext');
	  },
	  onEndProcessingChildContext: function () {
	    emitEvent('onEndProcessingChildContext');
	  },
	  onNativeOperation: function (debugID, type, payload) {
	    checkDebugID(debugID);
	    emitEvent('onNativeOperation', debugID, type, payload);
	  },
	  onSetState: function () {
	    emitEvent('onSetState');
	  },
	  onSetDisplayName: function (debugID, displayName) {
	    checkDebugID(debugID);
	    emitEvent('onSetDisplayName', debugID, displayName);
	  },
	  onSetChildren: function (debugID, childDebugIDs) {
	    checkDebugID(debugID);
	    emitEvent('onSetChildren', debugID, childDebugIDs);
	  },
	  onSetOwner: function (debugID, ownerDebugID) {
	    checkDebugID(debugID);
	    emitEvent('onSetOwner', debugID, ownerDebugID);
	  },
	  onSetText: function (debugID, text) {
	    checkDebugID(debugID);
	    emitEvent('onSetText', debugID, text);
	  },
	  onMountRootComponent: function (debugID) {
	    checkDebugID(debugID);
	    emitEvent('onMountRootComponent', debugID);
	  },
	  onMountComponent: function (debugID) {
	    checkDebugID(debugID);
	    emitEvent('onMountComponent', debugID);
	  },
	  onUpdateComponent: function (debugID) {
	    checkDebugID(debugID);
	    emitEvent('onUpdateComponent', debugID);
	  },
	  onUnmountComponent: function (debugID) {
	    checkDebugID(debugID);
	    emitEvent('onUnmountComponent', debugID);
	  }
	};

	if (process.env.NODE_ENV !== 'production') {
	  var ReactInvalidSetStateWarningDevTool = __webpack_require__(44);
	  var ReactNativeOperationHistoryDevtool = __webpack_require__(45);
	  var ReactComponentTreeDevtool = __webpack_require__(46);
	  ReactDebugTool.addDevtool(ReactInvalidSetStateWarningDevTool);
	  ReactDebugTool.addDevtool(ReactComponentTreeDevtool);
	  ReactDebugTool.addDevtool(ReactNativeOperationHistoryDevtool);
	  var url = ExecutionEnvironment.canUseDOM && window.location.href || '';
	  if (/[?&]react_perf\b/.test(url)) {
	    ReactDebugTool.beginProfiling();
	  }
	}

	module.exports = ReactDebugTool;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 41 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

	/**
	 * Simple, lightweight module assisting with the detection and context of
	 * Worker. Helps avoid circular dependencies and allows code to reason about
	 * whether or not they are in a Worker, even if they never include the main
	 * `ReactWorker` dependency.
	 */
	var ExecutionEnvironment = {

	  canUseDOM: canUseDOM,

	  canUseWorkers: typeof Worker !== 'undefined',

	  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

	  canUseViewport: canUseDOM && !!window.screen,

	  isInWorker: !canUseDOM // For now, this is true - might change in the future.

	};

	module.exports = ExecutionEnvironment;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */

	var performance = __webpack_require__(43);

	var performanceNow;

	/**
	 * Detect if we can use `window.performance.now()` and gracefully fallback to
	 * `Date.now()` if it doesn't exist. We need to support Firefox < 15 for now
	 * because of Facebook's testing infrastructure.
	 */
	if (performance.now) {
	  performanceNow = function performanceNow() {
	    return performance.now();
	  };
	} else {
	  performanceNow = function performanceNow() {
	    return Date.now();
	  };
	}

	module.exports = performanceNow;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */

	'use strict';

	var ExecutionEnvironment = __webpack_require__(41);

	var performance;

	if (ExecutionEnvironment.canUseDOM) {
	  performance = window.performance || window.msPerformance || window.webkitPerformance;
	}

	module.exports = performance || {};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactInvalidSetStateWarningDevTool
	 */

	'use strict';

	var warning = __webpack_require__(31);

	if (process.env.NODE_ENV !== 'production') {
	  var processingChildContext = false;

	  var warnInvalidSetState = function () {
	    process.env.NODE_ENV !== 'production' ? warning(!processingChildContext, 'setState(...): Cannot call setState() inside getChildContext()') : void 0;
	  };
	}

	var ReactInvalidSetStateWarningDevTool = {
	  onBeginProcessingChildContext: function () {
	    processingChildContext = true;
	  },
	  onEndProcessingChildContext: function () {
	    processingChildContext = false;
	  },
	  onSetState: function () {
	    warnInvalidSetState();
	  }
	};

	module.exports = ReactInvalidSetStateWarningDevTool;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 45 */
/***/ function(module, exports) {

	/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactNativeOperationHistoryDevtool
	 */

	'use strict';

	var history = [];

	var ReactNativeOperationHistoryDevtool = {
	  onNativeOperation: function (debugID, type, payload) {
	    history.push({
	      instanceID: debugID,
	      type: type,
	      payload: payload
	    });
	  },
	  clearHistory: function () {
	    if (ReactNativeOperationHistoryDevtool._preventClearing) {
	      // Should only be used for tests.
	      return;
	    }

	    history = [];
	  },
	  getHistory: function () {
	    return history;
	  }
	};

	module.exports = ReactNativeOperationHistoryDevtool;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactComponentTreeDevtool
	 */

	'use strict';

	var invariant = __webpack_require__(28);

	var tree = {};
	var rootIDs = [];

	function updateTree(id, update) {
	  if (!tree[id]) {
	    tree[id] = {
	      parentID: null,
	      ownerID: null,
	      text: null,
	      childIDs: [],
	      displayName: 'Unknown',
	      isMounted: false,
	      updateCount: 0
	    };
	  }
	  update(tree[id]);
	}

	function purgeDeep(id) {
	  var item = tree[id];
	  if (item) {
	    var childIDs = item.childIDs;

	    delete tree[id];
	    childIDs.forEach(purgeDeep);
	  }
	}

	var ReactComponentTreeDevtool = {
	  onSetDisplayName: function (id, displayName) {
	    updateTree(id, function (item) {
	      return item.displayName = displayName;
	    });
	  },
	  onSetChildren: function (id, nextChildIDs) {
	    updateTree(id, function (item) {
	      var prevChildIDs = item.childIDs;
	      item.childIDs = nextChildIDs;

	      nextChildIDs.forEach(function (nextChildID) {
	        var nextChild = tree[nextChildID];
	        !nextChild ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected devtool events to fire for the child ' + 'before its parent includes it in onSetChildren().') : invariant(false) : void 0;
	        !(nextChild.displayName != null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onSetDisplayName() to fire for the child ' + 'before its parent includes it in onSetChildren().') : invariant(false) : void 0;
	        !(nextChild.childIDs != null || nextChild.text != null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onSetChildren() or onSetText() to fire for the child ' + 'before its parent includes it in onSetChildren().') : invariant(false) : void 0;
	        !nextChild.isMounted ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onMountComponent() to fire for the child ' + 'before its parent includes it in onSetChildren().') : invariant(false) : void 0;

	        if (prevChildIDs.indexOf(nextChildID) === -1) {
	          nextChild.parentID = id;
	        }
	      });
	    });
	  },
	  onSetOwner: function (id, ownerID) {
	    updateTree(id, function (item) {
	      return item.ownerID = ownerID;
	    });
	  },
	  onSetText: function (id, text) {
	    updateTree(id, function (item) {
	      return item.text = text;
	    });
	  },
	  onMountComponent: function (id) {
	    updateTree(id, function (item) {
	      return item.isMounted = true;
	    });
	  },
	  onMountRootComponent: function (id) {
	    rootIDs.push(id);
	  },
	  onUpdateComponent: function (id) {
	    updateTree(id, function (item) {
	      return item.updateCount++;
	    });
	  },
	  onUnmountComponent: function (id) {
	    updateTree(id, function (item) {
	      return item.isMounted = false;
	    });
	    rootIDs = rootIDs.filter(function (rootID) {
	      return rootID !== id;
	    });
	  },
	  purgeUnmountedComponents: function () {
	    if (ReactComponentTreeDevtool._preventPurging) {
	      // Should only be used for testing.
	      return;
	    }

	    Object.keys(tree).filter(function (id) {
	      return !tree[id].isMounted;
	    }).forEach(purgeDeep);
	  },
	  isMounted: function (id) {
	    var item = tree[id];
	    return item ? item.isMounted : false;
	  },
	  getChildIDs: function (id) {
	    var item = tree[id];
	    return item ? item.childIDs : [];
	  },
	  getDisplayName: function (id) {
	    var item = tree[id];
	    return item ? item.displayName : 'Unknown';
	  },
	  getOwnerID: function (id) {
	    var item = tree[id];
	    return item ? item.ownerID : null;
	  },
	  getParentID: function (id) {
	    var item = tree[id];
	    return item ? item.parentID : null;
	  },
	  getText: function (id) {
	    var item = tree[id];
	    return item ? item.text : null;
	  },
	  getUpdateCount: function (id) {
	    var item = tree[id];
	    return item ? item.updateCount : 0;
	  },
	  getRootIDs: function () {
	    return rootIDs;
	  },
	  getRegisteredIDs: function () {
	    return Object.keys(tree);
	  }
	};

	module.exports = ReactComponentTreeDevtool;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var emptyObject = {};

	if (process.env.NODE_ENV !== 'production') {
	  Object.freeze(emptyObject);
	}

	module.exports = emptyObject;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactClass
	 */

	'use strict';

	var _assign = __webpack_require__(25);

	var ReactComponent = __webpack_require__(37);
	var ReactElement = __webpack_require__(29);
	var ReactPropTypeLocations = __webpack_require__(49);
	var ReactPropTypeLocationNames = __webpack_require__(51);
	var ReactNoopUpdateQueue = __webpack_require__(38);

	var emptyObject = __webpack_require__(47);
	var invariant = __webpack_require__(28);
	var keyMirror = __webpack_require__(50);
	var keyOf = __webpack_require__(52);
	var warning = __webpack_require__(31);

	var MIXINS_KEY = keyOf({ mixins: null });

	/**
	 * Policies that describe methods in `ReactClassInterface`.
	 */
	var SpecPolicy = keyMirror({
	  /**
	   * These methods may be defined only once by the class specification or mixin.
	   */
	  DEFINE_ONCE: null,
	  /**
	   * These methods may be defined by both the class specification and mixins.
	   * Subsequent definitions will be chained. These methods must return void.
	   */
	  DEFINE_MANY: null,
	  /**
	   * These methods are overriding the base class.
	   */
	  OVERRIDE_BASE: null,
	  /**
	   * These methods are similar to DEFINE_MANY, except we assume they return
	   * objects. We try to merge the keys of the return values of all the mixed in
	   * functions. If there is a key conflict we throw.
	   */
	  DEFINE_MANY_MERGED: null
	});

	var injectedMixins = [];

	/**
	 * Composite components are higher-level components that compose other composite
	 * or native components.
	 *
	 * To create a new type of `ReactClass`, pass a specification of
	 * your new class to `React.createClass`. The only requirement of your class
	 * specification is that you implement a `render` method.
	 *
	 *   var MyComponent = React.createClass({
	 *     render: function() {
	 *       return <div>Hello World</div>;
	 *     }
	 *   });
	 *
	 * The class specification supports a specific protocol of methods that have
	 * special meaning (e.g. `render`). See `ReactClassInterface` for
	 * more the comprehensive protocol. Any other properties and methods in the
	 * class specification will be available on the prototype.
	 *
	 * @interface ReactClassInterface
	 * @internal
	 */
	var ReactClassInterface = {

	  /**
	   * An array of Mixin objects to include when defining your component.
	   *
	   * @type {array}
	   * @optional
	   */
	  mixins: SpecPolicy.DEFINE_MANY,

	  /**
	   * An object containing properties and methods that should be defined on
	   * the component's constructor instead of its prototype (static methods).
	   *
	   * @type {object}
	   * @optional
	   */
	  statics: SpecPolicy.DEFINE_MANY,

	  /**
	   * Definition of prop types for this component.
	   *
	   * @type {object}
	   * @optional
	   */
	  propTypes: SpecPolicy.DEFINE_MANY,

	  /**
	   * Definition of context types for this component.
	   *
	   * @type {object}
	   * @optional
	   */
	  contextTypes: SpecPolicy.DEFINE_MANY,

	  /**
	   * Definition of context types this component sets for its children.
	   *
	   * @type {object}
	   * @optional
	   */
	  childContextTypes: SpecPolicy.DEFINE_MANY,

	  // ==== Definition methods ====

	  /**
	   * Invoked when the component is mounted. Values in the mapping will be set on
	   * `this.props` if that prop is not specified (i.e. using an `in` check).
	   *
	   * This method is invoked before `getInitialState` and therefore cannot rely
	   * on `this.state` or use `this.setState`.
	   *
	   * @return {object}
	   * @optional
	   */
	  getDefaultProps: SpecPolicy.DEFINE_MANY_MERGED,

	  /**
	   * Invoked once before the component is mounted. The return value will be used
	   * as the initial value of `this.state`.
	   *
	   *   getInitialState: function() {
	   *     return {
	   *       isOn: false,
	   *       fooBaz: new BazFoo()
	   *     }
	   *   }
	   *
	   * @return {object}
	   * @optional
	   */
	  getInitialState: SpecPolicy.DEFINE_MANY_MERGED,

	  /**
	   * @return {object}
	   * @optional
	   */
	  getChildContext: SpecPolicy.DEFINE_MANY_MERGED,

	  /**
	   * Uses props from `this.props` and state from `this.state` to render the
	   * structure of the component.
	   *
	   * No guarantees are made about when or how often this method is invoked, so
	   * it must not have side effects.
	   *
	   *   render: function() {
	   *     var name = this.props.name;
	   *     return <div>Hello, {name}!</div>;
	   *   }
	   *
	   * @return {ReactComponent}
	   * @nosideeffects
	   * @required
	   */
	  render: SpecPolicy.DEFINE_ONCE,

	  // ==== Delegate methods ====

	  /**
	   * Invoked when the component is initially created and about to be mounted.
	   * This may have side effects, but any external subscriptions or data created
	   * by this method must be cleaned up in `componentWillUnmount`.
	   *
	   * @optional
	   */
	  componentWillMount: SpecPolicy.DEFINE_MANY,

	  /**
	   * Invoked when the component has been mounted and has a DOM representation.
	   * However, there is no guarantee that the DOM node is in the document.
	   *
	   * Use this as an opportunity to operate on the DOM when the component has
	   * been mounted (initialized and rendered) for the first time.
	   *
	   * @param {DOMElement} rootNode DOM element representing the component.
	   * @optional
	   */
	  componentDidMount: SpecPolicy.DEFINE_MANY,

	  /**
	   * Invoked before the component receives new props.
	   *
	   * Use this as an opportunity to react to a prop transition by updating the
	   * state using `this.setState`. Current props are accessed via `this.props`.
	   *
	   *   componentWillReceiveProps: function(nextProps, nextContext) {
	   *     this.setState({
	   *       likesIncreasing: nextProps.likeCount > this.props.likeCount
	   *     });
	   *   }
	   *
	   * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
	   * transition may cause a state change, but the opposite is not true. If you
	   * need it, you are probably looking for `componentWillUpdate`.
	   *
	   * @param {object} nextProps
	   * @optional
	   */
	  componentWillReceiveProps: SpecPolicy.DEFINE_MANY,

	  /**
	   * Invoked while deciding if the component should be updated as a result of
	   * receiving new props, state and/or context.
	   *
	   * Use this as an opportunity to `return false` when you're certain that the
	   * transition to the new props/state/context will not require a component
	   * update.
	   *
	   *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
	   *     return !equal(nextProps, this.props) ||
	   *       !equal(nextState, this.state) ||
	   *       !equal(nextContext, this.context);
	   *   }
	   *
	   * @param {object} nextProps
	   * @param {?object} nextState
	   * @param {?object} nextContext
	   * @return {boolean} True if the component should update.
	   * @optional
	   */
	  shouldComponentUpdate: SpecPolicy.DEFINE_ONCE,

	  /**
	   * Invoked when the component is about to update due to a transition from
	   * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
	   * and `nextContext`.
	   *
	   * Use this as an opportunity to perform preparation before an update occurs.
	   *
	   * NOTE: You **cannot** use `this.setState()` in this method.
	   *
	   * @param {object} nextProps
	   * @param {?object} nextState
	   * @param {?object} nextContext
	   * @param {ReactReconcileTransaction} transaction
	   * @optional
	   */
	  componentWillUpdate: SpecPolicy.DEFINE_MANY,

	  /**
	   * Invoked when the component's DOM representation has been updated.
	   *
	   * Use this as an opportunity to operate on the DOM when the component has
	   * been updated.
	   *
	   * @param {object} prevProps
	   * @param {?object} prevState
	   * @param {?object} prevContext
	   * @param {DOMElement} rootNode DOM element representing the component.
	   * @optional
	   */
	  componentDidUpdate: SpecPolicy.DEFINE_MANY,

	  /**
	   * Invoked when the component is about to be removed from its parent and have
	   * its DOM representation destroyed.
	   *
	   * Use this as an opportunity to deallocate any external resources.
	   *
	   * NOTE: There is no `componentDidUnmount` since your component will have been
	   * destroyed by that point.
	   *
	   * @optional
	   */
	  componentWillUnmount: SpecPolicy.DEFINE_MANY,

	  // ==== Advanced methods ====

	  /**
	   * Updates the component's currently mounted DOM representation.
	   *
	   * By default, this implements React's rendering and reconciliation algorithm.
	   * Sophisticated clients may wish to override this.
	   *
	   * @param {ReactReconcileTransaction} transaction
	   * @internal
	   * @overridable
	   */
	  updateComponent: SpecPolicy.OVERRIDE_BASE

	};

	/**
	 * Mapping from class specification keys to special processing functions.
	 *
	 * Although these are declared like instance properties in the specification
	 * when defining classes using `React.createClass`, they are actually static
	 * and are accessible on the constructor instead of the prototype. Despite
	 * being static, they must be defined outside of the "statics" key under
	 * which all other static methods are defined.
	 */
	var RESERVED_SPEC_KEYS = {
	  displayName: function (Constructor, displayName) {
	    Constructor.displayName = displayName;
	  },
	  mixins: function (Constructor, mixins) {
	    if (mixins) {
	      for (var i = 0; i < mixins.length; i++) {
	        mixSpecIntoComponent(Constructor, mixins[i]);
	      }
	    }
	  },
	  childContextTypes: function (Constructor, childContextTypes) {
	    if (process.env.NODE_ENV !== 'production') {
	      validateTypeDef(Constructor, childContextTypes, ReactPropTypeLocations.childContext);
	    }
	    Constructor.childContextTypes = _assign({}, Constructor.childContextTypes, childContextTypes);
	  },
	  contextTypes: function (Constructor, contextTypes) {
	    if (process.env.NODE_ENV !== 'production') {
	      validateTypeDef(Constructor, contextTypes, ReactPropTypeLocations.context);
	    }
	    Constructor.contextTypes = _assign({}, Constructor.contextTypes, contextTypes);
	  },
	  /**
	   * Special case getDefaultProps which should move into statics but requires
	   * automatic merging.
	   */
	  getDefaultProps: function (Constructor, getDefaultProps) {
	    if (Constructor.getDefaultProps) {
	      Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
	    } else {
	      Constructor.getDefaultProps = getDefaultProps;
	    }
	  },
	  propTypes: function (Constructor, propTypes) {
	    if (process.env.NODE_ENV !== 'production') {
	      validateTypeDef(Constructor, propTypes, ReactPropTypeLocations.prop);
	    }
	    Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
	  },
	  statics: function (Constructor, statics) {
	    mixStaticSpecIntoComponent(Constructor, statics);
	  },
	  autobind: function () {} };

	// noop
	function validateTypeDef(Constructor, typeDef, location) {
	  for (var propName in typeDef) {
	    if (typeDef.hasOwnProperty(propName)) {
	      // use a warning instead of an invariant so components
	      // don't show up in prod but only in __DEV__
	      process.env.NODE_ENV !== 'production' ? warning(typeof typeDef[propName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', Constructor.displayName || 'ReactClass', ReactPropTypeLocationNames[location], propName) : void 0;
	    }
	  }
	}

	function validateMethodOverride(isAlreadyDefined, name) {
	  var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;

	  // Disallow overriding of base class methods unless explicitly allowed.
	  if (ReactClassMixin.hasOwnProperty(name)) {
	    !(specPolicy === SpecPolicy.OVERRIDE_BASE) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to override ' + '`%s` from your class specification. Ensure that your method names ' + 'do not overlap with React methods.', name) : invariant(false) : void 0;
	  }

	  // Disallow defining methods more than once unless explicitly allowed.
	  if (isAlreadyDefined) {
	    !(specPolicy === SpecPolicy.DEFINE_MANY || specPolicy === SpecPolicy.DEFINE_MANY_MERGED) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to define ' + '`%s` on your component more than once. This conflict may be due ' + 'to a mixin.', name) : invariant(false) : void 0;
	  }
	}

	/**
	 * Mixin helper which handles policy validation and reserved
	 * specification keys when building React classes.
	 */
	function mixSpecIntoComponent(Constructor, spec) {
	  if (!spec) {
	    return;
	  }

	  !(typeof spec !== 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to ' + 'use a component class or function as a mixin. Instead, just use a ' + 'regular object.') : invariant(false) : void 0;
	  !!ReactElement.isValidElement(spec) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to ' + 'use a component as a mixin. Instead, just use a regular object.') : invariant(false) : void 0;

	  var proto = Constructor.prototype;
	  var autoBindPairs = proto.__reactAutoBindPairs;

	  // By handling mixins before any other properties, we ensure the same
	  // chaining order is applied to methods with DEFINE_MANY policy, whether
	  // mixins are listed before or after these methods in the spec.
	  if (spec.hasOwnProperty(MIXINS_KEY)) {
	    RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
	  }

	  for (var name in spec) {
	    if (!spec.hasOwnProperty(name)) {
	      continue;
	    }

	    if (name === MIXINS_KEY) {
	      // We have already handled mixins in a special case above.
	      continue;
	    }

	    var property = spec[name];
	    var isAlreadyDefined = proto.hasOwnProperty(name);
	    validateMethodOverride(isAlreadyDefined, name);

	    if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
	      RESERVED_SPEC_KEYS[name](Constructor, property);
	    } else {
	      // Setup methods on prototype:
	      // The following member methods should not be automatically bound:
	      // 1. Expected ReactClass methods (in the "interface").
	      // 2. Overridden methods (that were mixed in).
	      var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
	      var isFunction = typeof property === 'function';
	      var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;

	      if (shouldAutoBind) {
	        autoBindPairs.push(name, property);
	        proto[name] = property;
	      } else {
	        if (isAlreadyDefined) {
	          var specPolicy = ReactClassInterface[name];

	          // These cases should already be caught by validateMethodOverride.
	          !(isReactClassMethod && (specPolicy === SpecPolicy.DEFINE_MANY_MERGED || specPolicy === SpecPolicy.DEFINE_MANY)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: Unexpected spec policy %s for key %s ' + 'when mixing in component specs.', specPolicy, name) : invariant(false) : void 0;

	          // For methods which are defined more than once, call the existing
	          // methods before calling the new property, merging if appropriate.
	          if (specPolicy === SpecPolicy.DEFINE_MANY_MERGED) {
	            proto[name] = createMergedResultFunction(proto[name], property);
	          } else if (specPolicy === SpecPolicy.DEFINE_MANY) {
	            proto[name] = createChainedFunction(proto[name], property);
	          }
	        } else {
	          proto[name] = property;
	          if (process.env.NODE_ENV !== 'production') {
	            // Add verbose displayName to the function, which helps when looking
	            // at profiling tools.
	            if (typeof property === 'function' && spec.displayName) {
	              proto[name].displayName = spec.displayName + '_' + name;
	            }
	          }
	        }
	      }
	    }
	  }
	}

	function mixStaticSpecIntoComponent(Constructor, statics) {
	  if (!statics) {
	    return;
	  }
	  for (var name in statics) {
	    var property = statics[name];
	    if (!statics.hasOwnProperty(name)) {
	      continue;
	    }

	    var isReserved = name in RESERVED_SPEC_KEYS;
	    !!isReserved ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You are attempting to define a reserved ' + 'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' + 'as an instance property instead; it will still be accessible on the ' + 'constructor.', name) : invariant(false) : void 0;

	    var isInherited = name in Constructor;
	    !!isInherited ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You are attempting to define ' + '`%s` on your component more than once. This conflict may be ' + 'due to a mixin.', name) : invariant(false) : void 0;
	    Constructor[name] = property;
	  }
	}

	/**
	 * Merge two objects, but throw if both contain the same key.
	 *
	 * @param {object} one The first object, which is mutated.
	 * @param {object} two The second object
	 * @return {object} one after it has been mutated to contain everything in two.
	 */
	function mergeIntoWithNoDuplicateKeys(one, two) {
	  !(one && two && typeof one === 'object' && typeof two === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.') : invariant(false) : void 0;

	  for (var key in two) {
	    if (two.hasOwnProperty(key)) {
	      !(one[key] === undefined) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): ' + 'Tried to merge two objects with the same key: `%s`. This conflict ' + 'may be due to a mixin; in particular, this may be caused by two ' + 'getInitialState() or getDefaultProps() methods returning objects ' + 'with clashing keys.', key) : invariant(false) : void 0;
	      one[key] = two[key];
	    }
	  }
	  return one;
	}

	/**
	 * Creates a function that invokes two functions and merges their return values.
	 *
	 * @param {function} one Function to invoke first.
	 * @param {function} two Function to invoke second.
	 * @return {function} Function that invokes the two argument functions.
	 * @private
	 */
	function createMergedResultFunction(one, two) {
	  return function mergedResult() {
	    var a = one.apply(this, arguments);
	    var b = two.apply(this, arguments);
	    if (a == null) {
	      return b;
	    } else if (b == null) {
	      return a;
	    }
	    var c = {};
	    mergeIntoWithNoDuplicateKeys(c, a);
	    mergeIntoWithNoDuplicateKeys(c, b);
	    return c;
	  };
	}

	/**
	 * Creates a function that invokes two functions and ignores their return vales.
	 *
	 * @param {function} one Function to invoke first.
	 * @param {function} two Function to invoke second.
	 * @return {function} Function that invokes the two argument functions.
	 * @private
	 */
	function createChainedFunction(one, two) {
	  return function chainedFunction() {
	    one.apply(this, arguments);
	    two.apply(this, arguments);
	  };
	}

	/**
	 * Binds a method to the component.
	 *
	 * @param {object} component Component whose method is going to be bound.
	 * @param {function} method Method to be bound.
	 * @return {function} The bound method.
	 */
	function bindAutoBindMethod(component, method) {
	  var boundMethod = method.bind(component);
	  if (process.env.NODE_ENV !== 'production') {
	    boundMethod.__reactBoundContext = component;
	    boundMethod.__reactBoundMethod = method;
	    boundMethod.__reactBoundArguments = null;
	    var componentName = component.constructor.displayName;
	    var _bind = boundMethod.bind;
	    boundMethod.bind = function (newThis) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      // User is trying to bind() an autobound method; we effectively will
	      // ignore the value of "this" that the user is trying to use, so
	      // let's warn.
	      if (newThis !== component && newThis !== null) {
	        process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): React component methods may only be bound to the ' + 'component instance. See %s', componentName) : void 0;
	      } else if (!args.length) {
	        process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See %s', componentName) : void 0;
	        return boundMethod;
	      }
	      var reboundMethod = _bind.apply(boundMethod, arguments);
	      reboundMethod.__reactBoundContext = component;
	      reboundMethod.__reactBoundMethod = method;
	      reboundMethod.__reactBoundArguments = args;
	      return reboundMethod;
	    };
	  }
	  return boundMethod;
	}

	/**
	 * Binds all auto-bound methods in a component.
	 *
	 * @param {object} component Component whose method is going to be bound.
	 */
	function bindAutoBindMethods(component) {
	  var pairs = component.__reactAutoBindPairs;
	  for (var i = 0; i < pairs.length; i += 2) {
	    var autoBindKey = pairs[i];
	    var method = pairs[i + 1];
	    component[autoBindKey] = bindAutoBindMethod(component, method);
	  }
	}

	/**
	 * Add more to the ReactClass base class. These are all legacy features and
	 * therefore not already part of the modern ReactComponent.
	 */
	var ReactClassMixin = {

	  /**
	   * TODO: This will be deprecated because state should always keep a consistent
	   * type signature and the only use case for this, is to avoid that.
	   */
	  replaceState: function (newState, callback) {
	    this.updater.enqueueReplaceState(this, newState);
	    if (callback) {
	      this.updater.enqueueCallback(this, callback, 'replaceState');
	    }
	  },

	  /**
	   * Checks whether or not this composite component is mounted.
	   * @return {boolean} True if mounted, false otherwise.
	   * @protected
	   * @final
	   */
	  isMounted: function () {
	    return this.updater.isMounted(this);
	  }
	};

	var ReactClassComponent = function () {};
	_assign(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);

	/**
	 * Module for creating composite components.
	 *
	 * @class ReactClass
	 */
	var ReactClass = {

	  /**
	   * Creates a composite component class given a class specification.
	   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
	   *
	   * @param {object} spec Class specification (which must define `render`).
	   * @return {function} Component constructor function.
	   * @public
	   */
	  createClass: function (spec) {
	    var Constructor = function (props, context, updater) {
	      // This constructor gets overridden by mocks. The argument is used
	      // by mocks to assert on what gets mounted.

	      if (process.env.NODE_ENV !== 'production') {
	        process.env.NODE_ENV !== 'production' ? warning(this instanceof Constructor, 'Something is calling a React component directly. Use a factory or ' + 'JSX instead. See: https://fb.me/react-legacyfactory') : void 0;
	      }

	      // Wire up auto-binding
	      if (this.__reactAutoBindPairs.length) {
	        bindAutoBindMethods(this);
	      }

	      this.props = props;
	      this.context = context;
	      this.refs = emptyObject;
	      this.updater = updater || ReactNoopUpdateQueue;

	      this.state = null;

	      // ReactClasses doesn't have constructors. Instead, they use the
	      // getInitialState and componentWillMount methods for initialization.

	      var initialState = this.getInitialState ? this.getInitialState() : null;
	      if (process.env.NODE_ENV !== 'production') {
	        // We allow auto-mocks to proceed as if they're returning null.
	        if (initialState === undefined && this.getInitialState._isMockFunction) {
	          // This is probably bad practice. Consider warning here and
	          // deprecating this convenience.
	          initialState = null;
	        }
	      }
	      !(typeof initialState === 'object' && !Array.isArray(initialState)) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent') : invariant(false) : void 0;

	      this.state = initialState;
	    };
	    Constructor.prototype = new ReactClassComponent();
	    Constructor.prototype.constructor = Constructor;
	    Constructor.prototype.__reactAutoBindPairs = [];

	    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

	    mixSpecIntoComponent(Constructor, spec);

	    // Initialize the defaultProps property after all mixins have been merged.
	    if (Constructor.getDefaultProps) {
	      Constructor.defaultProps = Constructor.getDefaultProps();
	    }

	    if (process.env.NODE_ENV !== 'production') {
	      // This is a tag to indicate that the use of these method names is ok,
	      // since it's used with createClass. If it's not, then it's likely a
	      // mistake so we'll warn you to use the static property, property
	      // initializer or constructor respectively.
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps.isReactClassApproved = {};
	      }
	      if (Constructor.prototype.getInitialState) {
	        Constructor.prototype.getInitialState.isReactClassApproved = {};
	      }
	    }

	    !Constructor.prototype.render ? process.env.NODE_ENV !== 'production' ? invariant(false, 'createClass(...): Class specification must implement a `render` method.') : invariant(false) : void 0;

	    if (process.env.NODE_ENV !== 'production') {
	      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', spec.displayName || 'A component') : void 0;
	      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', spec.displayName || 'A component') : void 0;
	    }

	    // Reduce time spent doing lookups by setting these on the prototype.
	    for (var methodName in ReactClassInterface) {
	      if (!Constructor.prototype[methodName]) {
	        Constructor.prototype[methodName] = null;
	      }
	    }

	    return Constructor;
	  },

	  injection: {
	    injectMixin: function (mixin) {
	      injectedMixins.push(mixin);
	    }
	  }

	};

	module.exports = ReactClass;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPropTypeLocations
	 */

	'use strict';

	var keyMirror = __webpack_require__(50);

	var ReactPropTypeLocations = keyMirror({
	  prop: null,
	  context: null,
	  childContext: null
	});

	module.exports = ReactPropTypeLocations;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks static-only
	 */

	'use strict';

	var invariant = __webpack_require__(28);

	/**
	 * Constructs an enumeration with keys equal to their value.
	 *
	 * For example:
	 *
	 *   var COLORS = keyMirror({blue: null, red: null});
	 *   var myColor = COLORS.blue;
	 *   var isColorValid = !!COLORS[myColor];
	 *
	 * The last line could not be performed if the values of the generated enum were
	 * not equal to their keys.
	 *
	 *   Input:  {key1: val1, key2: val2}
	 *   Output: {key1: key1, key2: key2}
	 *
	 * @param {object} obj
	 * @return {object}
	 */
	var keyMirror = function keyMirror(obj) {
	  var ret = {};
	  var key;
	  !(obj instanceof Object && !Array.isArray(obj)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'keyMirror(...): Argument must be an object.') : invariant(false) : void 0;
	  for (key in obj) {
	    if (!obj.hasOwnProperty(key)) {
	      continue;
	    }
	    ret[key] = key;
	  }
	  return ret;
	};

	module.exports = keyMirror;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPropTypeLocationNames
	 */

	'use strict';

	var ReactPropTypeLocationNames = {};

	if (process.env.NODE_ENV !== 'production') {
	  ReactPropTypeLocationNames = {
	    prop: 'prop',
	    context: 'context',
	    childContext: 'child context'
	  };
	}

	module.exports = ReactPropTypeLocationNames;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 52 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	/**
	 * Allows extraction of a minified key. Let's the build system minify keys
	 * without losing the ability to dynamically use key strings as values
	 * themselves. Pass in an object with a single key/val pair and it will return
	 * you the string key of that single record. Suppose you want to grab the
	 * value for a key 'className' inside of an object. Key/val minification may
	 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
	 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
	 * reuse those resolutions.
	 */
	var keyOf = function keyOf(oneKeyObj) {
	  var key;
	  for (key in oneKeyObj) {
	    if (!oneKeyObj.hasOwnProperty(key)) {
	      continue;
	    }
	    return key;
	  }
	  return null;
	};

	module.exports = keyOf;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactDOMFactories
	 */

	'use strict';

	var ReactElement = __webpack_require__(29);
	var ReactElementValidator = __webpack_require__(54);

	var mapObject = __webpack_require__(55);

	/**
	 * Create a factory that creates HTML tag elements.
	 *
	 * @param {string} tag Tag name (e.g. `div`).
	 * @private
	 */
	function createDOMFactory(tag) {
	  if (process.env.NODE_ENV !== 'production') {
	    return ReactElementValidator.createFactory(tag);
	  }
	  return ReactElement.createFactory(tag);
	}

	/**
	 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
	 * This is also accessible via `React.DOM`.
	 *
	 * @public
	 */
	var ReactDOMFactories = mapObject({
	  a: 'a',
	  abbr: 'abbr',
	  address: 'address',
	  area: 'area',
	  article: 'article',
	  aside: 'aside',
	  audio: 'audio',
	  b: 'b',
	  base: 'base',
	  bdi: 'bdi',
	  bdo: 'bdo',
	  big: 'big',
	  blockquote: 'blockquote',
	  body: 'body',
	  br: 'br',
	  button: 'button',
	  canvas: 'canvas',
	  caption: 'caption',
	  cite: 'cite',
	  code: 'code',
	  col: 'col',
	  colgroup: 'colgroup',
	  data: 'data',
	  datalist: 'datalist',
	  dd: 'dd',
	  del: 'del',
	  details: 'details',
	  dfn: 'dfn',
	  dialog: 'dialog',
	  div: 'div',
	  dl: 'dl',
	  dt: 'dt',
	  em: 'em',
	  embed: 'embed',
	  fieldset: 'fieldset',
	  figcaption: 'figcaption',
	  figure: 'figure',
	  footer: 'footer',
	  form: 'form',
	  h1: 'h1',
	  h2: 'h2',
	  h3: 'h3',
	  h4: 'h4',
	  h5: 'h5',
	  h6: 'h6',
	  head: 'head',
	  header: 'header',
	  hgroup: 'hgroup',
	  hr: 'hr',
	  html: 'html',
	  i: 'i',
	  iframe: 'iframe',
	  img: 'img',
	  input: 'input',
	  ins: 'ins',
	  kbd: 'kbd',
	  keygen: 'keygen',
	  label: 'label',
	  legend: 'legend',
	  li: 'li',
	  link: 'link',
	  main: 'main',
	  map: 'map',
	  mark: 'mark',
	  menu: 'menu',
	  menuitem: 'menuitem',
	  meta: 'meta',
	  meter: 'meter',
	  nav: 'nav',
	  noscript: 'noscript',
	  object: 'object',
	  ol: 'ol',
	  optgroup: 'optgroup',
	  option: 'option',
	  output: 'output',
	  p: 'p',
	  param: 'param',
	  picture: 'picture',
	  pre: 'pre',
	  progress: 'progress',
	  q: 'q',
	  rp: 'rp',
	  rt: 'rt',
	  ruby: 'ruby',
	  s: 's',
	  samp: 'samp',
	  script: 'script',
	  section: 'section',
	  select: 'select',
	  small: 'small',
	  source: 'source',
	  span: 'span',
	  strong: 'strong',
	  style: 'style',
	  sub: 'sub',
	  summary: 'summary',
	  sup: 'sup',
	  table: 'table',
	  tbody: 'tbody',
	  td: 'td',
	  textarea: 'textarea',
	  tfoot: 'tfoot',
	  th: 'th',
	  thead: 'thead',
	  time: 'time',
	  title: 'title',
	  tr: 'tr',
	  track: 'track',
	  u: 'u',
	  ul: 'ul',
	  'var': 'var',
	  video: 'video',
	  wbr: 'wbr',

	  // SVG
	  circle: 'circle',
	  clipPath: 'clipPath',
	  defs: 'defs',
	  ellipse: 'ellipse',
	  g: 'g',
	  image: 'image',
	  line: 'line',
	  linearGradient: 'linearGradient',
	  mask: 'mask',
	  path: 'path',
	  pattern: 'pattern',
	  polygon: 'polygon',
	  polyline: 'polyline',
	  radialGradient: 'radialGradient',
	  rect: 'rect',
	  stop: 'stop',
	  svg: 'svg',
	  text: 'text',
	  tspan: 'tspan'

	}, createDOMFactory);

	module.exports = ReactDOMFactories;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactElementValidator
	 */

	/**
	 * ReactElementValidator provides a wrapper around a element factory
	 * which validates the props passed to the element. This is intended to be
	 * used only in DEV and could be replaced by a static type checker for languages
	 * that support it.
	 */

	'use strict';

	var ReactElement = __webpack_require__(29);
	var ReactPropTypeLocations = __webpack_require__(49);
	var ReactPropTypeLocationNames = __webpack_require__(51);
	var ReactCurrentOwner = __webpack_require__(30);

	var canDefineProperty = __webpack_require__(33);
	var getIteratorFn = __webpack_require__(35);
	var invariant = __webpack_require__(28);
	var warning = __webpack_require__(31);

	function getDeclarationErrorAddendum() {
	  if (ReactCurrentOwner.current) {
	    var name = ReactCurrentOwner.current.getName();
	    if (name) {
	      return ' Check the render method of `' + name + '`.';
	    }
	  }
	  return '';
	}

	/**
	 * Warn if there's no key explicitly set on dynamic arrays of children or
	 * object keys are not valid. This allows us to keep track of children between
	 * updates.
	 */
	var ownerHasKeyUseWarning = {};

	var loggedTypeFailures = {};

	/**
	 * Warn if the element doesn't have an explicit key assigned to it.
	 * This element is in an array. The array could grow and shrink or be
	 * reordered. All children that haven't already been validated are required to
	 * have a "key" property assigned to it.
	 *
	 * @internal
	 * @param {ReactElement} element Element that requires a key.
	 * @param {*} parentType element's parent's type.
	 */
	function validateExplicitKey(element, parentType) {
	  if (!element._store || element._store.validated || element.key != null) {
	    return;
	  }
	  element._store.validated = true;

	  var addenda = getAddendaForKeyUse('uniqueKey', element, parentType);
	  if (addenda === null) {
	    // we already showed the warning
	    return;
	  }
	  process.env.NODE_ENV !== 'production' ? warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s%s', addenda.parentOrOwner || '', addenda.childOwner || '', addenda.url || '') : void 0;
	}

	/**
	 * Shared warning and monitoring code for the key warnings.
	 *
	 * @internal
	 * @param {string} messageType A key used for de-duping warnings.
	 * @param {ReactElement} element Component that requires a key.
	 * @param {*} parentType element's parent's type.
	 * @returns {?object} A set of addenda to use in the warning message, or null
	 * if the warning has already been shown before (and shouldn't be shown again).
	 */
	function getAddendaForKeyUse(messageType, element, parentType) {
	  var addendum = getDeclarationErrorAddendum();
	  if (!addendum) {
	    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
	    if (parentName) {
	      addendum = ' Check the top-level render call using <' + parentName + '>.';
	    }
	  }

	  var memoizer = ownerHasKeyUseWarning[messageType] || (ownerHasKeyUseWarning[messageType] = {});
	  if (memoizer[addendum]) {
	    return null;
	  }
	  memoizer[addendum] = true;

	  var addenda = {
	    parentOrOwner: addendum,
	    url: ' See https://fb.me/react-warning-keys for more information.',
	    childOwner: null
	  };

	  // Usually the current owner is the offender, but if it accepts children as a
	  // property, it may be the creator of the child that's responsible for
	  // assigning it a key.
	  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
	    // Give the component that originally created this child.
	    addenda.childOwner = ' It was passed a child from ' + element._owner.getName() + '.';
	  }

	  return addenda;
	}

	/**
	 * Ensure that every element either is passed in a static location, in an
	 * array with an explicit keys property defined, or in an object literal
	 * with valid key property.
	 *
	 * @internal
	 * @param {ReactNode} node Statically passed child of any type.
	 * @param {*} parentType node's parent's type.
	 */
	function validateChildKeys(node, parentType) {
	  if (typeof node !== 'object') {
	    return;
	  }
	  if (Array.isArray(node)) {
	    for (var i = 0; i < node.length; i++) {
	      var child = node[i];
	      if (ReactElement.isValidElement(child)) {
	        validateExplicitKey(child, parentType);
	      }
	    }
	  } else if (ReactElement.isValidElement(node)) {
	    // This element was passed in a valid location.
	    if (node._store) {
	      node._store.validated = true;
	    }
	  } else if (node) {
	    var iteratorFn = getIteratorFn(node);
	    // Entry iterators provide implicit keys.
	    if (iteratorFn) {
	      if (iteratorFn !== node.entries) {
	        var iterator = iteratorFn.call(node);
	        var step;
	        while (!(step = iterator.next()).done) {
	          if (ReactElement.isValidElement(step.value)) {
	            validateExplicitKey(step.value, parentType);
	          }
	        }
	      }
	    }
	  }
	}

	/**
	 * Assert that the props are valid
	 *
	 * @param {string} componentName Name of the component for error messages.
	 * @param {object} propTypes Map of prop name to a ReactPropType
	 * @param {object} props
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @private
	 */
	function checkPropTypes(componentName, propTypes, props, location) {
	  for (var propName in propTypes) {
	    if (propTypes.hasOwnProperty(propName)) {
	      var error;
	      // Prop type validation may throw. In case they do, we don't want to
	      // fail the render phase where it didn't fail before. So we log it.
	      // After these have been cleaned up, we'll let them throw.
	      try {
	        // This is intentionally an invariant that gets caught. It's the same
	        // behavior as without this statement except with a better message.
	        !(typeof propTypes[propName] === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], propName) : invariant(false) : void 0;
	        error = propTypes[propName](props, propName, componentName, location);
	      } catch (ex) {
	        error = ex;
	      }
	      process.env.NODE_ENV !== 'production' ? warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', ReactPropTypeLocationNames[location], propName, typeof error) : void 0;
	      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	        // Only monitor this failure once because there tends to be a lot of the
	        // same error.
	        loggedTypeFailures[error.message] = true;

	        var addendum = getDeclarationErrorAddendum();
	        process.env.NODE_ENV !== 'production' ? warning(false, 'Failed propType: %s%s', error.message, addendum) : void 0;
	      }
	    }
	  }
	}

	/**
	 * Given an element, validate that its props follow the propTypes definition,
	 * provided by the type.
	 *
	 * @param {ReactElement} element
	 */
	function validatePropTypes(element) {
	  var componentClass = element.type;
	  if (typeof componentClass !== 'function') {
	    return;
	  }
	  var name = componentClass.displayName || componentClass.name;
	  if (componentClass.propTypes) {
	    checkPropTypes(name, componentClass.propTypes, element.props, ReactPropTypeLocations.prop);
	  }
	  if (typeof componentClass.getDefaultProps === 'function') {
	    process.env.NODE_ENV !== 'production' ? warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
	  }
	}

	var ReactElementValidator = {

	  createElement: function (type, props, children) {
	    var validType = typeof type === 'string' || typeof type === 'function';
	    // We warn in this case but don't throw. We expect the element creation to
	    // succeed and there will likely be errors in render.
	    process.env.NODE_ENV !== 'production' ? warning(validType, 'React.createElement: type should not be null, undefined, boolean, or ' + 'number. It should be a string (for DOM elements) or a ReactClass ' + '(for composite components).%s', getDeclarationErrorAddendum()) : void 0;

	    var element = ReactElement.createElement.apply(this, arguments);

	    // The result can be nullish if a mock or a custom function is used.
	    // TODO: Drop this when these are no longer allowed as the type argument.
	    if (element == null) {
	      return element;
	    }

	    // Skip key warning if the type isn't valid since our key validation logic
	    // doesn't expect a non-string/function type and can throw confusing errors.
	    // We don't want exception behavior to differ between dev and prod.
	    // (Rendering will throw with a helpful message and as soon as the type is
	    // fixed, the key warnings will appear.)
	    if (validType) {
	      for (var i = 2; i < arguments.length; i++) {
	        validateChildKeys(arguments[i], type);
	      }
	    }

	    validatePropTypes(element);

	    return element;
	  },

	  createFactory: function (type) {
	    var validatedFactory = ReactElementValidator.createElement.bind(null, type);
	    // Legacy hook TODO: Warn if this is accessed
	    validatedFactory.type = type;

	    if (process.env.NODE_ENV !== 'production') {
	      if (canDefineProperty) {
	        Object.defineProperty(validatedFactory, 'type', {
	          enumerable: false,
	          get: function () {
	            process.env.NODE_ENV !== 'production' ? warning(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.') : void 0;
	            Object.defineProperty(this, 'type', {
	              value: type
	            });
	            return type;
	          }
	        });
	      }
	    }

	    return validatedFactory;
	  },

	  cloneElement: function (element, props, children) {
	    var newElement = ReactElement.cloneElement.apply(this, arguments);
	    for (var i = 2; i < arguments.length; i++) {
	      validateChildKeys(arguments[i], newElement.type);
	    }
	    validatePropTypes(newElement);
	    return newElement;
	  }

	};

	module.exports = ReactElementValidator;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 55 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	/**
	 * Executes the provided `callback` once for each enumerable own property in the
	 * object and constructs a new object from the results. The `callback` is
	 * invoked with three arguments:
	 *
	 *  - the property value
	 *  - the property name
	 *  - the object being traversed
	 *
	 * Properties that are added after the call to `mapObject` will not be visited
	 * by `callback`. If the values of existing properties are changed, the value
	 * passed to `callback` will be the value at the time `mapObject` visits them.
	 * Properties that are deleted before being visited are not visited.
	 *
	 * @grep function objectMap()
	 * @grep function objMap()
	 *
	 * @param {?object} object
	 * @param {function} callback
	 * @param {*} context
	 * @return {?object}
	 */
	function mapObject(object, callback, context) {
	  if (!object) {
	    return null;
	  }
	  var result = {};
	  for (var name in object) {
	    if (hasOwnProperty.call(object, name)) {
	      result[name] = callback.call(context, object[name], name, object);
	    }
	  }
	  return result;
	}

	module.exports = mapObject;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPropTypes
	 */

	'use strict';

	var ReactElement = __webpack_require__(29);
	var ReactPropTypeLocationNames = __webpack_require__(51);

	var emptyFunction = __webpack_require__(32);
	var getIteratorFn = __webpack_require__(35);

	/**
	 * Collection of methods that allow declaration and validation of props that are
	 * supplied to React components. Example usage:
	 *
	 *   var Props = require('ReactPropTypes');
	 *   var MyArticle = React.createClass({
	 *     propTypes: {
	 *       // An optional string prop named "description".
	 *       description: Props.string,
	 *
	 *       // A required enum prop named "category".
	 *       category: Props.oneOf(['News','Photos']).isRequired,
	 *
	 *       // A prop named "dialog" that requires an instance of Dialog.
	 *       dialog: Props.instanceOf(Dialog).isRequired
	 *     },
	 *     render: function() { ... }
	 *   });
	 *
	 * A more formal specification of how these methods are used:
	 *
	 *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	 *   decl := ReactPropTypes.{type}(.isRequired)?
	 *
	 * Each and every declaration produces a function with the same signature. This
	 * allows the creation of custom validation functions. For example:
	 *
	 *  var MyLink = React.createClass({
	 *    propTypes: {
	 *      // An optional string or URI prop named "href".
	 *      href: function(props, propName, componentName) {
	 *        var propValue = props[propName];
	 *        if (propValue != null && typeof propValue !== 'string' &&
	 *            !(propValue instanceof URI)) {
	 *          return new Error(
	 *            'Expected a string or an URI for ' + propName + ' in ' +
	 *            componentName
	 *          );
	 *        }
	 *      }
	 *    },
	 *    render: function() {...}
	 *  });
	 *
	 * @internal
	 */

	var ANONYMOUS = '<<anonymous>>';

	var ReactPropTypes = {
	  array: createPrimitiveTypeChecker('array'),
	  bool: createPrimitiveTypeChecker('boolean'),
	  func: createPrimitiveTypeChecker('function'),
	  number: createPrimitiveTypeChecker('number'),
	  object: createPrimitiveTypeChecker('object'),
	  string: createPrimitiveTypeChecker('string'),

	  any: createAnyTypeChecker(),
	  arrayOf: createArrayOfTypeChecker,
	  element: createElementTypeChecker(),
	  instanceOf: createInstanceTypeChecker,
	  node: createNodeChecker(),
	  objectOf: createObjectOfTypeChecker,
	  oneOf: createEnumTypeChecker,
	  oneOfType: createUnionTypeChecker,
	  shape: createShapeTypeChecker
	};

	/**
	 * inlined Object.is polyfill to avoid requiring consumers ship their own
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	 */
	/*eslint-disable no-self-compare*/
	function is(x, y) {
	  // SameValue algorithm
	  if (x === y) {
	    // Steps 1-5, 7-10
	    // Steps 6.b-6.e: +0 != -0
	    return x !== 0 || 1 / x === 1 / y;
	  } else {
	    // Step 6.a: NaN == NaN
	    return x !== x && y !== y;
	  }
	}
	/*eslint-enable no-self-compare*/

	function createChainableTypeChecker(validate) {
	  function checkType(isRequired, props, propName, componentName, location, propFullName) {
	    componentName = componentName || ANONYMOUS;
	    propFullName = propFullName || propName;
	    if (props[propName] == null) {
	      var locationName = ReactPropTypeLocationNames[location];
	      if (isRequired) {
	        return new Error('Required ' + locationName + ' `' + propFullName + '` was not specified in ' + ('`' + componentName + '`.'));
	      }
	      return null;
	    } else {
	      return validate(props, propName, componentName, location, propFullName);
	    }
	  }

	  var chainedCheckType = checkType.bind(null, false);
	  chainedCheckType.isRequired = checkType.bind(null, true);

	  return chainedCheckType;
	}

	function createPrimitiveTypeChecker(expectedType) {
	  function validate(props, propName, componentName, location, propFullName) {
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== expectedType) {
	      var locationName = ReactPropTypeLocationNames[location];
	      // `propValue` being instance of, say, date/regexp, pass the 'object'
	      // check, but we can offer a more precise error message here rather than
	      // 'of type `object`'.
	      var preciseType = getPreciseType(propValue);

	      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createAnyTypeChecker() {
	  return createChainableTypeChecker(emptyFunction.thatReturns(null));
	}

	function createArrayOfTypeChecker(typeChecker) {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (typeof typeChecker !== 'function') {
	      return new Error('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	    }
	    var propValue = props[propName];
	    if (!Array.isArray(propValue)) {
	      var locationName = ReactPropTypeLocationNames[location];
	      var propType = getPropType(propValue);
	      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	    }
	    for (var i = 0; i < propValue.length; i++) {
	      var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']');
	      if (error instanceof Error) {
	        return error;
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createElementTypeChecker() {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (!ReactElement.isValidElement(props[propName])) {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a single ReactElement.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createInstanceTypeChecker(expectedClass) {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (!(props[propName] instanceof expectedClass)) {
	      var locationName = ReactPropTypeLocationNames[location];
	      var expectedClassName = expectedClass.name || ANONYMOUS;
	      var actualClassName = getClassName(props[propName]);
	      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createEnumTypeChecker(expectedValues) {
	  if (!Array.isArray(expectedValues)) {
	    return createChainableTypeChecker(function () {
	      return new Error('Invalid argument supplied to oneOf, expected an instance of array.');
	    });
	  }

	  function validate(props, propName, componentName, location, propFullName) {
	    var propValue = props[propName];
	    for (var i = 0; i < expectedValues.length; i++) {
	      if (is(propValue, expectedValues[i])) {
	        return null;
	      }
	    }

	    var locationName = ReactPropTypeLocationNames[location];
	    var valuesString = JSON.stringify(expectedValues);
	    return new Error('Invalid ' + locationName + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	  }
	  return createChainableTypeChecker(validate);
	}

	function createObjectOfTypeChecker(typeChecker) {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (typeof typeChecker !== 'function') {
	      return new Error('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	    }
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== 'object') {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	    }
	    for (var key in propValue) {
	      if (propValue.hasOwnProperty(key)) {
	        var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createUnionTypeChecker(arrayOfTypeCheckers) {
	  if (!Array.isArray(arrayOfTypeCheckers)) {
	    return createChainableTypeChecker(function () {
	      return new Error('Invalid argument supplied to oneOfType, expected an instance of array.');
	    });
	  }

	  function validate(props, propName, componentName, location, propFullName) {
	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (checker(props, propName, componentName, location, propFullName) == null) {
	        return null;
	      }
	    }

	    var locationName = ReactPropTypeLocationNames[location];
	    return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	  }
	  return createChainableTypeChecker(validate);
	}

	function createNodeChecker() {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (!isNode(props[propName])) {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createShapeTypeChecker(shapeTypes) {
	  function validate(props, propName, componentName, location, propFullName) {
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== 'object') {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	    }
	    for (var key in shapeTypes) {
	      var checker = shapeTypes[key];
	      if (!checker) {
	        continue;
	      }
	      var error = checker(propValue, key, componentName, location, propFullName + '.' + key);
	      if (error) {
	        return error;
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function isNode(propValue) {
	  switch (typeof propValue) {
	    case 'number':
	    case 'string':
	    case 'undefined':
	      return true;
	    case 'boolean':
	      return !propValue;
	    case 'object':
	      if (Array.isArray(propValue)) {
	        return propValue.every(isNode);
	      }
	      if (propValue === null || ReactElement.isValidElement(propValue)) {
	        return true;
	      }

	      var iteratorFn = getIteratorFn(propValue);
	      if (iteratorFn) {
	        var iterator = iteratorFn.call(propValue);
	        var step;
	        if (iteratorFn !== propValue.entries) {
	          while (!(step = iterator.next()).done) {
	            if (!isNode(step.value)) {
	              return false;
	            }
	          }
	        } else {
	          // Iterator will provide entry [k,v] tuples rather than values.
	          while (!(step = iterator.next()).done) {
	            var entry = step.value;
	            if (entry) {
	              if (!isNode(entry[1])) {
	                return false;
	              }
	            }
	          }
	        }
	      } else {
	        return false;
	      }

	      return true;
	    default:
	      return false;
	  }
	}

	// Equivalent of `typeof` but with special handling for array and regexp.
	function getPropType(propValue) {
	  var propType = typeof propValue;
	  if (Array.isArray(propValue)) {
	    return 'array';
	  }
	  if (propValue instanceof RegExp) {
	    // Old webkits (at least until Android 4.0) return 'function' rather than
	    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	    // passes PropTypes.object.
	    return 'object';
	  }
	  return propType;
	}

	// This handles more types than `getPropType`. Only used for error messages.
	// See `createPrimitiveTypeChecker`.
	function getPreciseType(propValue) {
	  var propType = getPropType(propValue);
	  if (propType === 'object') {
	    if (propValue instanceof Date) {
	      return 'date';
	    } else if (propValue instanceof RegExp) {
	      return 'regexp';
	    }
	  }
	  return propType;
	}

	// Returns class name of the object, if any.
	function getClassName(propValue) {
	  if (!propValue.constructor || !propValue.constructor.name) {
	    return ANONYMOUS;
	  }
	  return propValue.constructor.name;
	}

	module.exports = ReactPropTypes;

/***/ },
/* 57 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactVersion
	 */

	'use strict';

	module.exports = '15.1.0';

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule onlyChild
	 */
	'use strict';

	var ReactElement = __webpack_require__(29);

	var invariant = __webpack_require__(28);

	/**
	 * Returns the first child in a collection of children and verifies that there
	 * is only one child in the collection.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.only
	 *
	 * The current implementation of this function assumes that a single child gets
	 * passed without a wrapper, but the purpose of this helper function is to
	 * abstract away the particular structure of children.
	 *
	 * @param {?object} children Child collection structure.
	 * @return {ReactElement} The first and only `ReactElement` contained in the
	 * structure.
	 */
	function onlyChild(children) {
	  !ReactElement.isValidElement(children) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'onlyChild must be passed a children with exactly one child.') : invariant(false) : void 0;
	  return children;
	}

	module.exports = onlyChild;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Concur = __webpack_require__(4)
	var object = __webpack_require__(6)
	var SubWidget = __webpack_require__(60)

	/**
	 * An HTML form widget.
	 * @constructor
	 * @param {Object=} kwargs
	 */
	var Widget = Concur.extend({
	  constructor: function Widget(kwargs) {
	    kwargs = object.extend({attrs: null}, kwargs)
	    this.attrs = object.extend({}, kwargs.attrs)
	  }
	  /** Determines whether this corresponds to an <input type="hidden">. */
	, isHidden: false
	  /** Determines whether this widget needs a multipart-encoded form. */
	, needsMultipartForm: false
	  /** Determines whether this widget is for a required field. */
	, isRequired: false
	  /** Override for active validation config a particular widget needs to use. */
	, validation: null
	  /** Determines whether this widget's render logic always needs to use the initial value. */
	, needsInitialValue: false
	  /** Determines whether this widget's value can be set. */
	, isValueSettable: true
	})

	/**
	 * Yields all "subwidgets" of this widget. Used only by RadioSelect to
	 * allow access to individual <input type="radio"> buttons.
	 * Arguments are the same as for render().
	 * @return {Array.<SubWidget>}
	 */
	Widget.prototype.subWidgets = function(name, value, kwargs) {
	  return [SubWidget(this, name, value, kwargs)]
	}

	/**
	 * Returns this Widget rendered as HTML.
	 * The value given is not guaranteed to be valid input, so subclass
	 * implementations should program defensively.
	 * @abstract
	 */
	Widget.prototype.render = function(name, value, kwargs) {
	  throw new Error('Constructors extending Widget must implement a render() method.')
	}

	/**
	 * Helper function for building an HTML attributes object.
	 */
	Widget.prototype.buildAttrs = function(kwargAttrs, renderAttrs) {
	  return object.extend({}, this.attrs, renderAttrs, kwargAttrs)
	}

	/**
	 * Retrieves a value for this widget from the given data.
	 * @param {Object} data form data.
	 * @param {Object} files file data.
	 * @param {string} name the field name to be used to retrieve data.
	 * @return a value for this widget, or null if no value was provided.
	 */
	Widget.prototype.valueFromData = function(data, files, name) {
	  return object.get(data, name, null)
	}

	/**
	 * Determines the HTML id attribute of this Widget for use by a
	 * <label>, given the id of the field.
	 * This hook is necessary because some widgets have multiple HTML elements and,
	 * thus, multiple ids. In that case, this method should return an ID value that
	 * corresponds to the first id in the widget's tags.
	 * @param {string} id a field id.
	 * @return {string} the id which should be used by a <label> for this Widget.
	 */
	Widget.prototype.idForLabel = function(id) {
	  return id
	}

	module.exports = Widget

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Concur = __webpack_require__(4)
	var object = __webpack_require__(6)

	/**
	 * Some widgets are made of multiple HTML elements -- namely, RadioSelect.
	 * This represents the "inner" HTML element of a widget.
	 * @constructor
	 */
	var SubWidget = Concur.extend({
	  constructor: function SubWidget(parentWidget, name, value, kwargs) {
	    if (!(this instanceof SubWidget)) {
	      return new SubWidget(parentWidget, name, value, kwargs)
	    }
	    this.parentWidget = parentWidget
	    this.name = name
	    this.value = value
	    kwargs = object.extend({attrs: null, choices: []}, kwargs)
	    this.attrs = kwargs.attrs
	    this.choices = kwargs.choices
	  }
	})

	SubWidget.prototype.render = function() {
	  var kwargs = {attrs: this.attrs}
	  if (this.choices.length) {
	    kwargs.choices = this.choices
	  }
	  return this.parentWidget.render(this.name, this.value, kwargs)
	}

	module.exports = SubWidget

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)

	var Input = __webpack_require__(22)

	/**
	 * An HTML <input type="text"> widget.
	 * @constructor
	 * @extends {Input}
	 * @param {Object=} kwargs
	 */
	var TextInput = Input.extend({
	  constructor: function TextInput(kwargs) {
	    if (!(this instanceof TextInput)) { return new TextInput(kwargs) }
	    kwargs = object.extend({attrs: null}, kwargs)
	    if (kwargs.attrs != null) {
	      this.inputType = object.pop(kwargs.attrs, 'type', this.inputType)
	    }
	    Input.call(this, kwargs)
	  }
	, inputType: 'text'
	})

	module.exports = TextInput

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)

	var CheckboxInput = __webpack_require__(63)
	var Field = __webpack_require__(20)

	var $__0=  __webpack_require__(2),ValidationError=$__0.ValidationError

	/**
	 * Normalises its input to a Boolean primitive.
	 * @constructor
	 * @extends {Field}
	 * @param {Object=} kwargs
	 */
	var BooleanField = Field.extend({
	  widget: CheckboxInput

	, constructor: function BooleanField(kwargs) {
	    if (!(this instanceof BooleanField)) { return new BooleanField(kwargs) }
	    Field.call(this, kwargs)
	  }
	})

	BooleanField.prototype.toJavaScript = function(value) {
	  // Explicitly check for a 'false' string, which is what a hidden field will
	  // submit for false. Also check for '0', since this is what RadioSelect will
	  // provide. Because Boolean('anything') == true, we don't need to handle that
	  // explicitly.
	  if (is.String(value) && (value.toLowerCase() == 'false' || value == '0')) {
	    value = false
	  }
	  else {
	    value = Boolean(value)
	  }
	  value = Field.prototype.toJavaScript.call(this, value)
	  if (!value && this.required) {
	    throw ValidationError(this.errorMessages.required, {code: 'required'})
	  }
	  return value
	}

	BooleanField.prototype._hasChanged = function(initial, data) {
	  // Sometimes data or initial could be null or '' which should be the same
	  // thing as false.
	  if (initial === 'false') {
	    // showHiddenInitial may have transformed false to 'false'
	    initial = false
	  }
	  return (Boolean(initial) != Boolean(data))
	}

	module.exports = BooleanField

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)
	var object = __webpack_require__(6)
	var React = __webpack_require__(23)

	var Widget = __webpack_require__(59)

	function defaultCheckTest(value) {
	  return (value !== false && value != null && value !== '')
	}

	/**
	 * An HTML <input type="checkbox"> widget.
	 * @constructor
	 * @extends {Widget}
	 * @param {Object=} kwargs
	 */
	var CheckboxInput = Widget.extend({
	  constructor: function CheckboxInput(kwargs) {
	    if (!(this instanceof Widget)) { return new CheckboxInput(kwargs) }
	    kwargs = object.extend({checkTest: defaultCheckTest}, kwargs)
	    Widget.call(this, kwargs)
	    this.checkTest = kwargs.checkTest
	  }
	, validation: {onChange: true}
	})

	CheckboxInput.prototype.render = function(name, value, kwargs) {
	  kwargs = object.extend({}, kwargs)
	  var finalAttrs = this.buildAttrs(kwargs.attrs, {type: 'checkbox',
	                                                  name: name})
	  if (value !== '' && value !== true && value !== false && value !== null &&
	      value !== undefined) {
	    // Only add the value attribute if value is non-empty
	    finalAttrs.value = value
	  }
	  var checkedAttr = (kwargs.controlled ? 'checked' : 'defaultChecked')
	  finalAttrs[checkedAttr] = this.checkTest(value)
	  return React.createElement('input', finalAttrs)
	}

	CheckboxInput.prototype.valueFromData = function(data, files, name) {
	  if (typeof data[name] == 'undefined') {
	    //  A missing value means False because HTML form submission does not
	    // send results for unselected checkboxes.
	    return false
	  }
	  var value = data[name]
	  var values = {'true': true, 'false': false}
	  // Translate true and false strings to boolean values
	  if (is.String(value)) {
	    value = object.get(values, value.toLowerCase(), value)
	  }
	  return !!value
	}

	module.exports = CheckboxInput

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Concur = __webpack_require__(4)
	var is = __webpack_require__(5)
	var format = __webpack_require__(11).formatObj
	var object = __webpack_require__(6)
	var React = __webpack_require__(23)

	var TextInput = __webpack_require__(61)
	var Textarea = __webpack_require__(65)

	var $__0=  __webpack_require__(15),prettyName=$__0.prettyName

	var SUFFIX_CHARS = ':?.!'

	/**
	 * A helper for rendering a field.
	 * @param {Form} form the form instance which the field is a part of.
	 * @param {Field} field the field to be rendered.
	 * @param {string} name the name associated with the field in the form.
	 * @constructor
	 */
	var BoundField = Concur.extend({
	  constructor: function BoundField(form, field, name) {
	    if (!(this instanceof BoundField)) { return new BoundField(form, field, name) }
	    this.form = form
	    this.field = field
	    this.name = name
	    this.htmlName = form.addPrefix(name)
	    this.htmlInitialName = form.addInitialPrefix(name)
	    this.htmlInitialId = form.addInitialPrefix(this.autoId())
	    this.label = this.field.label !== null ? this.field.label : prettyName(name)
	    this.helpText = field.helpText || ''
	  }
	})

	// ================================================================== Status ===

	/**
	 * @return {boolean} true if the value which will be displayed in the field's
	 *   widget is empty.
	 */
	BoundField.prototype.isEmpty = function() {
	  return this.field.isEmptyValue(this.value())
	}

	/**
	 * @return {boolean} true if the field has a pending async validation.
	 */
	BoundField.prototype.isPending = function() {
	  return typeof this.form._pendingAsyncValidation[this.name] != 'undefined'
	}

	/**
	 * @return {boolean} true if the field has some data in its form's cleanedData.
	 */
	BoundField.prototype.isCleaned = function() {
	  return typeof this.form.cleanedData[this.name] != 'undefined'
	}

	/**
	 * @return {boolean} true if the field's widget will render hidden field(s).
	 */
	BoundField.prototype.isHidden = function() {
	  return this.field.widget.isHidden
	}

	/**
	 * Determines the field's curent status in the form. Statuses are determined in
	 * the following order:
	 * * 'pending' - the field has a pending async validation.
	 * * 'error' - the field has a validation error.
	 * * 'valid' - the field has a value in form.cleanedData.
	 * * 'default' - the field meets none of the above criteria, e.g. it's been
	 *   rendered but hasn't been interacted with or validated yet.
	 * @return {string}
	 */
	BoundField.prototype.status = function() {
	  if (this.isPending()) { return 'pending' }
	  if (this.errors().isPopulated()) { return 'error' }
	  if (this.isCleaned()) { return 'valid' }
	  return 'default'
	}

	// ============================================================== Field Data ===

	/**
	 * Calculates and returns the id attribute for this BoundField if the associated
	 * form has an autoId. Returns an empty string otherwise.
	 */
	BoundField.prototype.autoId = function() {
	  var autoId = this.form.autoId
	  if (autoId) {
	    autoId = ''+autoId
	    if (autoId.indexOf('{name}') != -1) {
	      return format(autoId, {name: this.htmlName})
	    }
	    return this.htmlName
	  }
	  return ''
	}

	/**
	 * @return {*} user input data for the field, or null if none has been given.
	 */
	BoundField.prototype.data = function() {
	  return this.field.widget.valueFromData(this.form.data,
	                                         this.form.files,
	                                         this.htmlName)
	}

	/**
	 * @return {ErrorObject} errors for the field, which may be empty.
	 */
	BoundField.prototype.errors = function() {
	  return this.form.errors(this.name) || new this.form.errorConstructor()
	}

	/**
	 * @return {string=} the first error message for the field, or undefined if
	 *   there were none.
	 */
	BoundField.prototype.errorMessage = function() {
	  return this.errors().first()
	}

	/**
	 * @return {Array.<string>} all error messages for the field, will be empty if
	 *   there were none.
	 */
	BoundField.prototype.errorMessages = function() {
	  return this.errors().messages()
	}

	/**
	 * Gets or generates an id for the field's <label>.
	 * @return {string}
	 */
	BoundField.prototype.idForLabel = function() {
	  var widget = this.field.widget
	  var id = object.get(widget.attrs, 'id', this.autoId())
	  return widget.idForLabel(id)
	}

	/**
	 * @return {*} the value to be displayed in the field's widget.
	 */
	BoundField.prototype.value = function() {
	  var data
	  if (this.form.isInitialRender) {
	    data = this.initialValue()
	  }
	  else {
	    data = this.field.boundData(this.data(),
	                                object.get(this.form.initial,
	                                           this.name,
	                                           this.field.initial))
	  }
	  return this.field.prepareValue(data)
	}

	/**
	 * @return {*} the initial value for the field, will be null if none was
	 *   configured on the field or given to the form.
	 */
	BoundField.prototype.initialValue = function() {
	  var value = object.get(this.form.initial, this.name, this.field.initial)
	  if (is.Function(value)) {
	    value = value()
	  }
	  return value
	}

	// =============================================================== Rendering ===

	/**
	 * Renders a widget for the field.
	 * @param {Object=} kwargs widgets options.
	 * @param {Widget} kwargs.widget an override for the widget used to render the
	 *   field - if not provided, the field's configured widget will be used.
	 * @param {Object} kwargs.attrs additional attributes to be added to the field's
	 *   widget.
	 * @return {ReactElement}
	 */
	BoundField.prototype.asWidget = function(kwargs) {
	  kwargs = object.extend({
	    widget: null, attrs: null, onlyInitial: false
	  }, kwargs)
	  var widget = (kwargs.widget !== null ? kwargs.widget : this.field.widget)
	  var attrs = (kwargs.attrs !== null ? kwargs.attrs : {})
	  var autoId = this.autoId()
	  var name = !kwargs.onlyInitial ? this.htmlName : this.htmlInitialName
	  if (autoId &&
	      typeof attrs.id == 'undefined' &&
	      typeof widget.attrs.id == 'undefined') {
	    attrs.id = (!kwargs.onlyInitial ? autoId : this.htmlInitialId)
	  }
	  if (typeof attrs.key == 'undefined') {
	    attrs.key = name
	  }

	  var validation = this._getValidation(widget)

	  // Always Add an onChange event handler to update form.data when the field is
	  // changed.
	  attrs.onChange = this.form._handleFieldEvent.bind(this.form, {
	    event: 'onChange'
	  , validate: !!validation.onChange
	  , delay: validation.onChangeDelay
	  })

	  // If validation should happen on events other than onChange, also add event
	  // handlers for them.
	  if (validation != 'manual' && validation.events) {
	    for (var i = 0, l = validation.events.length; i < l; i++) {
	      var eventName = validation.events[i]
	      attrs[eventName] =
	        this.form._handleFieldEvent.bind(this.form, {event: eventName})
	    }
	  }

	  var renderKwargs = {attrs:attrs, controlled: this._isControlled(widget)}
	  if (widget.needsInitialValue) {
	    renderKwargs.initialValue = this.initialValue()
	  }
	  return widget.render(name, this.value(), renderKwargs)
	}

	/**
	 * Renders the field as a hidden field.
	 * @param {Object=} kwargs widget options.
	 * @return {ReactElement}
	 */
	BoundField.prototype.asHidden = function(kwargs) {
	  kwargs = object.extend({}, kwargs, {widget: new this.field.hiddenWidget()})
	  return this.asWidget(kwargs)
	}

	/**
	 * Renders the field as a text input.
	 * @param {Object=} kwargs widget options.
	 * @return {ReactElement}
	 */
	BoundField.prototype.asText = function(kwargs) {
	  kwargs = object.extend({}, kwargs, {widget: TextInput()})
	  return this.asWidget(kwargs)
	}

	/**
	 * Renders the field as a textarea.
	 * @param {Object=} kwargs widget options.
	 * @return {ReactElement}
	 */
	BoundField.prototype.asTextarea = function(kwargs) {
	  kwargs = object.extend({}, kwargs, {widget: Textarea()})
	  return this.asWidget(kwargs)
	}

	/**
	 * Determines CSS classes for this field based on what's configured in the field
	 * and form, and the field's current status.
	 * @param {string=} extraCssClasses additional CSS classes for the field.
	 * @return {string} space-separated CSS classes for this field.
	 */
	BoundField.prototype.cssClasses = function(extraCssClasses) {
	  var cssClasses = (extraCssClasses ? [extraCssClasses] : [])

	  // Field/row classes
	  if (this.field.cssClass !== null) {
	    cssClasses.push(this.field.cssClass)
	  }
	  if (typeof this.form.rowCssClass != 'undefined') {
	    cssClasses.push(this.form.rowCssClass)
	  }

	  // Status class
	  var status = this.status()
	  if (typeof this.form[status + 'CssClass'] != 'undefined') {
	    cssClasses.push(this.form[status + 'CssClass'])
	  }

	  // Required-ness classes
	  if (this.field.required) {
	    if (typeof this.form.requiredCssClass != 'undefined') {
	      cssClasses.push(this.form.requiredCssClass)
	    }
	  }
	  else if (typeof this.form.optionalCssClass != 'undefined') {
	    cssClasses.push(this.form.optionalCssClass)
	  }

	  return cssClasses.join(' ')
	}

	/**
	 * Renders a tag containing help text for the field.
	 * @param {Object=} kwargs configuration options.
	 * @param {string} kwargs.tagName allows overriding the type of tag - defaults
	 *   to 'span'.
	 * @param {string} kwargs.contents help text contents - if not provided,
	 *   contents will be taken from the field itself. To render raw HTML in help
	 *   text, it should be specified using the React convention for raw HTML,
	 *   which is to provide an object with a __html property.
	 * @param {Object} kwargs.attrs additional attributes to be added to the tag -
	 *   by default it will get a className of 'helpText'
	 * @return {ReactElement}
	 */
	BoundField.prototype.helpTextTag = function(kwargs) {
	  kwargs = object.extend({
	    tagName: 'span', attrs: null, contents: this.helpText
	  }, kwargs)
	  if (kwargs.contents) {
	    var attrs = object.extend({className: 'helpText'}, kwargs.attrs)
	    var contents = kwargs.contents
	    if (is.Object(contents) && object.hasOwn(contents, '__html')) {
	      attrs.dangerouslySetInnerHTML = contents
	      return React.createElement(kwargs.tagName, attrs)
	    }
	    return React.createElement(kwargs.tagName, attrs, contents)
	  }
	}

	/**
	 * Wraps the given contents in a <label> if the field has an id attribute. If
	 * contents aren't given, uses the field's label.
	 * If attrs are given, they're used as HTML attributes on the <label> tag.
	 * @param {Object=} kwargs configuration options.
	 * @param {string} kwargs.contents contents for the label - if not provided,
	 *   label contents will be generated from the field itself.
	 * @param {Object} kwargs.attrs additional attributes to be added to the label.
	 * @param {string} kwargs.labelSuffix allows overriding the form's labelSuffix.
	 * @return {ReactElement}
	 */
	BoundField.prototype.labelTag = function(kwargs) {
	  kwargs = object.extend({
	    contents: this.label, attrs: null, labelSuffix: this.form.labelSuffix
	  }, kwargs)
	  var contents = this._addLabelSuffix(kwargs.contents, kwargs.labelSuffix)
	  var widget = this.field.widget
	  var id = object.get(widget.attrs, 'id', this.autoId())
	  if (id) {
	    var attrs = object.extend(kwargs.attrs || {}, {htmlFor: widget.idForLabel(id)})
	    contents = React.createElement('label', attrs, contents)
	  }
	  return contents
	}

	/**
	 * @return {ReactElement}
	 */
	BoundField.prototype.render = function(kwargs) {
	  if (this.field.showHiddenInitial) {
	    return React.createElement('div', null, this.asWidget(kwargs),
	                               this.asHidden({onlyInitial: true}))
	  }
	  return this.asWidget(kwargs)
	}

	/**
	 * Returns a list of SubWidgets that comprise all widgets in this BoundField.
	 * This really is only useful for RadioSelect and CheckboxSelectMultiple
	 * widgets, so that you can iterate over individual inputs when rendering.
	 * @return {Array.<SubWidget>}
	 */
	BoundField.prototype.subWidgets = function() {
	  var id = this.field.widget.attrs.id || this.autoId()
	  var kwargs = {attrs: {}}
	  if (id) {
	    kwargs.attrs.id = id
	  }
	  return this.field.widget.subWidgets(this.htmlName, this.value(), kwargs)
	}

	/**
	 * @return {string}
	 */
	BoundField.prototype._addLabelSuffix = function(label, labelSuffix) {
	  // Only add the suffix if the label does not end in punctuation
	  if (labelSuffix && SUFFIX_CHARS.indexOf(label.charAt(label.length - 1)) == -1) {
	    return label + labelSuffix
	  }
	  return label
	}

	/**
	 * Determines if the widget should be a controlled or uncontrolled React
	 * component.
	 * @return {boolean}
	 */
	BoundField.prototype._isControlled = function(widget) {
	  if (arguments.length === 0) {
	    widget = this.field.widget
	  }
	  var controlled = false
	  if (widget.isValueSettable) {
	    // If the field has any controlled config set, it should take precedence,
	    // otherwise use the form's as it has a default.
	    controlled = (this.field.controlled !== null
	                  ? this.field.controlled
	                  : this.form.controlled)
	  }
	  return controlled
	}

	/**
	 * Gets the configured validation for the field or form, allowing the widget
	 * which is going to be rendered to override it if necessary.
	 * @param {Widget=} widget
	 * @return {?(Object|string)}
	 */
	BoundField.prototype._getValidation = function(widget) {
	  // If the field has any validation config set, it should take precedence,
	  // otherwise use the form's as it has a default.
	  var validation = this.field.validation || this.form.validation

	  // Allow widgets to override the type of validation that's used for them -
	  // primarily for inputs which can only be changed by click/selection.
	  if (validation !== 'manual' && widget.validation !== null) {
	    validation = widget.validation
	  }

	  return validation
	}

	module.exports = BoundField

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)
	var React = __webpack_require__(23)

	var Widget = __webpack_require__(59)

	/**
	 * An HTML <textarea> widget.
	 * @param {Object} [kwargs] configuration options
	 * @config {object} [attrs] HTML attributes for the rendered widget. Default
	 *   rows and cols attributes will be used if not provided.
	 * @constructor
	 * @extends {Widget}
	 * @param {Object=} kwargs
	 */
	var Textarea = Widget.extend({
	  constructor: function Textarea(kwargs) {
	    if (!(this instanceof Textarea)) { return new Textarea(kwargs) }
	    // Ensure we have something in attrs
	    kwargs = object.extend({attrs: null}, kwargs)
	    // Provide default 'cols' and 'rows' attributes
	    kwargs.attrs = object.extend({rows: '3', cols: '40'}, kwargs.attrs)
	    Widget.call(this, kwargs)
	  }
	})

	Textarea.prototype.render = function(name, value, kwargs) {
	  kwargs = object.extend({}, kwargs)
	  if (value === null) {
	    value = ''
	  }
	  var finalAttrs = this.buildAttrs(kwargs.attrs, {name: name})
	  var valueAttr = (kwargs.controlled ? 'value' : 'defaultValue')
	  finalAttrs[valueAttr] = value
	  return React.createElement('textarea', finalAttrs)
	}

	module.exports = Textarea

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)

	var Field = __webpack_require__(20)
	var PasswordInput = __webpack_require__(67)
	var TextInput = __webpack_require__(61)

	var $__0=   __webpack_require__(2),MinLengthValidator=$__0.MinLengthValidator,MaxLengthValidator=$__0.MaxLengthValidator

	/**
	 * Validates that its input is a valid String.
	 * @constructor
	 * @extends {Field}
	 * @param {Object=} kwargs
	 */
	var CharField = Field.extend({
	  constructor: function CharField(kwargs) {
	    if (!(this instanceof CharField)) { return new CharField(kwargs) }
	    kwargs = object.extend({maxLength: null, minLength: null}, kwargs)
	    this.maxLength = kwargs.maxLength
	    this.minLength = kwargs.minLength
	    Field.call(this, kwargs)
	    if (this.minLength !== null) {
	      this.validators.push(MinLengthValidator(this.minLength))
	    }
	    if (this.maxLength !== null) {
	      this.validators.push(MaxLengthValidator(this.maxLength))
	    }
	  }
	})

	/**
	 * @return {string}
	 */
	CharField.prototype.toJavaScript = function(value) {
	  if (this.isEmptyValue(value)) {
	    return ''
	  }
	  return ''+value
	}

	/**
	 * If this field is configured to enforce a maximum length, adds a suitable
	 * maxLength attribute to text input fields.
	 * @param {Widget} widget the widget being used to render this field's value.
	 * @return {Object} additional attributes which should be added to the widget.
	 */
	CharField.prototype.getWidgetAttrs = function(widget) {
	  var attrs = Field.prototype.getWidgetAttrs.call(this, widget)
	  if (this.maxLength !== null && (widget instanceof TextInput ||
	                                  widget instanceof PasswordInput)) {
	    attrs.maxLength = ''+this.maxLength
	  }
	  return attrs
	}

	module.exports = CharField

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)

	var env = __webpack_require__(68)
	var TextInput = __webpack_require__(61)

	/**
	 * An HTML <input type="password"> widget.
	 * @constructor
	 * @extends {TextInput}
	 * @param {Object=} kwargs
	 */
	var PasswordInput = TextInput.extend({
	  constructor: function PasswordInput(kwargs) {
	    if (!(this instanceof PasswordInput)) { return new PasswordInput(kwargs) }
	    kwargs = object.extend({renderValue: false}, kwargs)
	    TextInput.call(this, kwargs)
	    this.renderValue = kwargs.renderValue
	  }
	, inputType: 'password'
	})

	PasswordInput.prototype.render = function(name, value, kwargs) {
	  if (!env.browser && !this.renderValue) {
	    value = ''
	  }
	  return TextInput.prototype.render.call(this, name, value, kwargs)
	}

	module.exports = PasswordInput

/***/ },
/* 68 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  browser: typeof window != 'undefined'
	}

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)

	var ChoiceInput = __webpack_require__(70)

	var CheckboxChoiceInput = ChoiceInput.extend({
	  constructor: function CheckboxChoiceInput(name, value, attrs, controlled, choice, index) {
	    if (!(this instanceof CheckboxChoiceInput)) {
	      return new CheckboxChoiceInput(name, value, attrs, controlled, choice, index)
	    }
	    if (!is.Array(value)) {
	      value = [value]
	    }
	    ChoiceInput.call(this, name, value, attrs, controlled, choice, index)
	    for (var i = 0, l = this.value.length; i < l; i++) {
	      this.value[i] = ''+this.value[i]
	    }
	  }
	, inputType: 'checkbox'
	})

	CheckboxChoiceInput.prototype.isChecked = function() {
	  return this.value.indexOf(this.choiceValue) !== -1
	}

	module.exports = CheckboxChoiceInput

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)
	var React = __webpack_require__(23)

	var SubWidget = __webpack_require__(60)
	var Widget = __webpack_require__(59)

	/**
	 * An object used by ChoiceFieldRenderer that represents a single
	 * <input>.
	 */
	var ChoiceInput = SubWidget.extend({
	  constructor: function ChoiceInput(name, value, attrs, controlled, choice, index) {
	    this.name = name
	    this.value = value
	    this.attrs = attrs
	    this.controlled = controlled
	    this.choiceValue = ''+choice[0]
	    this.choiceLabel = ''+choice[1]
	    this.index = index
	    if (typeof this.attrs.id != 'undefined') {
	      this.attrs.id += '_' + this.index
	    }
	    if (typeof this.attrs.key != 'undefined') {
	      this.attrs.key += '_' + this.index
	    }
	  }
	, inputType: null // Subclasses must define this
	})

	/**
	 * Renders a <label> enclosing the widget and its label text.
	 */
	ChoiceInput.prototype.render = function() {
	  var labelAttrs = {}
	  if (this.idForLabel()) {
	    labelAttrs.htmlFor = this.idForLabel()
	  }
	  return React.createElement('label', labelAttrs, this.tag(), ' ', this.choiceLabel)
	}

	ChoiceInput.prototype.isChecked = function() {
	  return this.value === this.choiceValue
	}

	/**
	 * Renders the <input> portion of the widget.
	 */
	ChoiceInput.prototype.tag = function() {
	  var finalAttrs = Widget.prototype.buildAttrs.call(this, {}, {
	    type: this.inputType, name: this.name, value: this.choiceValue
	  })
	  var checkedAttr = (this.controlled ? 'checked' : 'defaultChecked')
	  finalAttrs[checkedAttr] = this.isChecked()
	  return React.createElement('input', finalAttrs)
	}

	ChoiceInput.prototype.idForLabel = function() {
	  return object.get(this.attrs, 'id', '')
	}

	module.exports = ChoiceInput

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var CheckboxChoiceInput = __webpack_require__(69)
	var ChoiceFieldRenderer = __webpack_require__(72)

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

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Concur = __webpack_require__(4)
	var is = __webpack_require__(5)
	var object = __webpack_require__(6)
	var React = __webpack_require__(23)

	/**
	 * An object used by choice Selects to enable customisation of choice widgets.
	 * @constructor
	 * @param {string} name
	 * @param {string} value
	 * @param {Object} attrs
	 * @param {boolean} controlled
	 * @param {Array} choices
	 */
	var ChoiceFieldRenderer = Concur.extend({
	  constructor: function ChoiceFieldRenderer(name, value, attrs, controlled, choices) {
	    if (!(this instanceof ChoiceFieldRenderer)) {
	      return new ChoiceFieldRenderer(name, value, attrs, controlled, choices)
	    }
	    this.name = name
	    this.value = value
	    this.attrs = attrs
	    this.controlled = controlled
	    this.choices = choices
	  }
	, choiceInputConstructor: null
	})

	ChoiceFieldRenderer.prototype.choiceInputs = function() {
	  var inputs = []
	  for (var i = 0, l = this.choices.length; i < l; i++) {
	    inputs.push(this.choiceInputConstructor(this.name, this.value,
	                                            object.extend({}, this.attrs),
	                                            this.controlled,
	                                            this.choices[i], i))
	  }
	  return inputs
	}

	ChoiceFieldRenderer.prototype.choiceInput = function(i) {
	  if (i >= this.choices.length) {
	    throw new Error('Index out of bounds: ' + i)
	  }
	  return this.choiceInputConstructor(this.name, this.value,
	                                     object.extend({}, this.attrs),
	                                     this.controlled,
	                                     this.choices[i], i)
	  }

	/**
	 * Outputs a <ul> for this set of choice fields.
	 * If an id was given to the field, it is applied to the <ul> (each item in the
	 * list will get an id of `$id_$i`).
	 */
	ChoiceFieldRenderer.prototype.render = function() {
	  var id = object.get(this.attrs, 'id', null)
	  var key = object.pop(this.attrs, 'key', null)
	  var items = []
	  for (var i = 0, l = this.choices.length; i < l; i++) {
	    var choice = this.choices[i]
	    var choiceValue = choice[0]
	    var choiceLabel = choice[1]
	    if (is.Array(choiceLabel)) {
	      var attrsPlus = object.extend({}, this.attrs)
	      if (id) {
	        attrsPlus.id +='_' + i
	      }
	      if (key) {
	        attrsPlus.key += '_' + i
	      }
	      var subRenderer = ChoiceFieldRenderer(this.name, this.value,
	                                            attrsPlus,
	                                            this.controlled,
	                                            choiceLabel)
	      subRenderer.choiceInputConstructor = this.choiceInputConstructor
	      items.push(React.createElement('li', null, choiceValue, subRenderer.render()))
	    }
	    else {
	      var w = this.choiceInputConstructor(this.name, this.value,
	                                          object.extend({}, this.attrs),
	                                          this.controlled,
	                                          choice, i)
	      items.push(React.createElement('li', null, w.render()))
	    }
	  }
	  var listAttrs = {}
	  if (id) {
	    listAttrs.id = id
	  }
	  return React.createElement('ul', listAttrs, items)
	}

	module.exports = ChoiceFieldRenderer

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var CheckboxFieldRenderer = __webpack_require__(71)
	var RendererMixin = __webpack_require__(74)
	var SelectMultiple = __webpack_require__(75)

	/**
	 * Multiple selections represented as a list of <input type="checkbox"> widgets.
	 * @constructor
	 * @extends {SelectMultiple}
	 * @param {Object=} kwargs
	 */
	var CheckboxSelectMultiple = SelectMultiple.extend({
	  __mixins__: [RendererMixin]
	, constructor: function(kwargs) {
	    if (!(this instanceof CheckboxSelectMultiple)) { return new CheckboxSelectMultiple(kwargs) }
	    RendererMixin.call(this, kwargs)
	    SelectMultiple.call(this, kwargs)
	  }
	, renderer: CheckboxFieldRenderer
	, _emptyValue: []
	})

	module.exports = CheckboxSelectMultiple

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Concur = __webpack_require__(4)
	var object = __webpack_require__(6)

	var RendererMixin = Concur.extend({
	  constructor: function RendererMixin(kwargs) {
	    kwargs = object.extend({renderer: null}, kwargs)
	    // Override the default renderer if we were passed one
	    if (kwargs.renderer !== null) {
	      this.renderer = kwargs.renderer
	    }
	  }
	, _emptyValue: null
	, validation: {onChange: true}
	})

	RendererMixin.prototype.subWidgets = function(name, value, kwargs) {
	  return this.getRenderer(name, value, kwargs).choiceInputs()
	}

	/**
	 * @return an instance of the renderer to be used to render this widget.
	 */
	RendererMixin.prototype.getRenderer = function(name, value, kwargs) {
	  kwargs = object.extend({choices: [], controlled: false}, kwargs)
	  if (value === null) {
	    value = this._emptyValue
	  }
	  var finalAttrs = this.buildAttrs(kwargs.attrs)
	  var choices = this.choices.concat(kwargs.choices)
	  return new this.renderer(name, value, finalAttrs, kwargs.controlled, choices)
	}

	RendererMixin.prototype.render = function(name, value, kwargs) {
	  return this.getRenderer(name, value, kwargs).render()
	}

	/**
	 * Widgets using this RendererMixin are made of a collection of subwidgets, each
	 * with their own <label>, and distinct ID.
	 * The IDs are made distinct by y "_X" suffix, where X is the zero-based index
	 * of the choice field. Thus, the label for the main widget should reference the
	 * first subwidget, hence the "_0" suffix.
	 */
	RendererMixin.prototype.idForLabel = function(id) {
	  if (id) {
	    id += '_0'
	  }
	  return id
	}

	module.exports = RendererMixin

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)
	var object = __webpack_require__(6)
	var React = __webpack_require__(23)

	var Select = __webpack_require__(76)

	/**
	 * An HTML <select> widget which allows multiple selections.
	 * @constructor
	 * @extends {Select}
	 * @param {Object=} kwargs
	 */
	var SelectMultiple = Select.extend({
	  constructor: function SelectMultiple(kwargs) {
	    if (!(this instanceof SelectMultiple)) { return new SelectMultiple(kwargs) }
	    Select.call(this, kwargs)
	  }
	, allowMultipleSelected: true
	, validation: {onChange: true}
	})

	/**
	 * Renders the widget.
	 * @param {string} name the field name.
	 * @param {Array} selectedValues the values of options which should be marked as
	 *   selected, or null if no values are selected - these will be normalised to
	 *   Strings for comparison with choice values.
	 * @param {Object} [kwargs] additional rendering options.
	 * @return a <select> element which allows multiple selections.
	 */
	SelectMultiple.prototype.render = function(name, selectedValues, kwargs) {
	  kwargs = object.extend({choices: []}, kwargs)
	  if (selectedValues === null) {
	    selectedValues = []
	  }
	  if (!is.Array(selectedValues)) {
	    selectedValues = [selectedValues]
	  }
	  var finalAttrs = this.buildAttrs(kwargs.attrs, {name: name,
	                                                  multiple: 'multiple'})
	  var options = this.renderOptions(kwargs.choices)
	  var valueAttr = (kwargs.controlled ? 'value' : 'defaultValue')
	  finalAttrs[valueAttr] = selectedValues
	  return React.createElement('select', finalAttrs, options)
	}

	/**
	 * Retrieves values for this widget from the given data.
	 * @param {Object} data form data.
	 * @param {Object} files file data.
	 * @param {string} name the field name to be used to retrieve data.
	 * @return {Array} values for this widget, or null if no values were provided.
	 */
	SelectMultiple.prototype.valueFromData = function(data, files, name) {
	  if (object.hasOwn(data, name) && data[name] != null) {
	    return [].concat(data[name])
	  }
	  return null
	}

	module.exports = SelectMultiple


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)
	var object = __webpack_require__(6)
	var React = __webpack_require__(23)

	var Widget = __webpack_require__(59)

	var $__0=  __webpack_require__(15),normaliseChoices=$__0.normaliseChoices

	/**
	 * An HTML <select> widget.
	 * @constructor
	 * @extends {Widget}
	 * @param {Object=} kwargs
	 */
	var Select = Widget.extend({
	  constructor: function Select(kwargs) {
	    if (!(this instanceof Select)) { return new Select(kwargs) }
	    kwargs = object.extend({choices: []}, kwargs)
	    Widget.call(this, kwargs)
	    this.choices = normaliseChoices(kwargs.choices)
	  }
	, allowMultipleSelected: false
	, validation: {onChange: true}
	})

	/**
	 * Renders the widget.
	 * @param {string} name the field name.
	 * @param {*} selectedValue the value of an option which should be marked as
	 *   selected, or null if no value is selected -- will be normalised to a String
	 *   for comparison with choice values.
	 * @param {Object=} kwargs rendering options
	 * @param {Object=} kwargs.attrs additional HTML attributes for the rendered widget.
	 * @param {Array=} kwargs.choices choices to be used when rendering the widget, in
	 *   addition to those already held by the widget itself.
	 * @return a <select> element.
	 */
	Select.prototype.render = function(name, selectedValue, kwargs) {
	  kwargs = object.extend({choices: []}, kwargs)
	  if (selectedValue === null) {
	    selectedValue = ''
	  }
	  var finalAttrs = this.buildAttrs(kwargs.attrs, {name: name})
	  var options = this.renderOptions(kwargs.choices)
	  var valueAttr = (kwargs.controlled ? 'value' : 'defaultValue')
	  finalAttrs[valueAttr] = selectedValue
	  return React.createElement('select', finalAttrs, options)
	}

	Select.prototype.renderOptions = function(additionalChoices) {
	  var options = []
	  var choices = this.choices.concat(normaliseChoices(additionalChoices))
	  for (var i = 0, l = choices.length, choice; i < l; i++) {
	    choice = choices[i]
	    if (is.Array(choice[1])) {
	      var optgroupOptions = []
	      var optgroupChoices = choice[1]
	      for (var j = 0, m = optgroupChoices.length; j < m; j++) {
	        optgroupOptions.push(this.renderOption(optgroupChoices[j][0],
	                                               optgroupChoices[j][1]))
	      }
	      options.push(React.createElement('optgroup', {label: choice[0], key: choice[9]}, optgroupOptions))
	    }
	    else {
	      options.push(this.renderOption(choice[0],
	                                     choice[1]))
	    }
	  }
	  return options
	}

	Select.prototype.renderOption = function(optValue, optLabel) {
	  optValue = ''+optValue
	  var attrs = {value: optValue, key: optValue + optLabel}
	  return React.createElement('option', attrs, optLabel)
	}

	module.exports = Select


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)
	var object = __webpack_require__(6)

	var Field = __webpack_require__(20)
	var Select = __webpack_require__(76)

	var $__0=  __webpack_require__(2),ValidationError=$__0.ValidationError
	var $__1=  __webpack_require__(15),normaliseChoices=$__1.normaliseChoices

	/**
	 * Validates that its input is one of a valid list of choices.
	 * @constructor
	 * @extends {Field}
	 * @param {Object=} kwargs
	 */
	var ChoiceField = Field.extend({
	  widget: Select
	, defaultErrorMessages: {
	    invalidChoice: 'Select a valid choice. {value} is not one of the available choices.'
	  }

	, constructor: function ChoiceField(kwargs) {
	    if (!(this instanceof ChoiceField)) { return new ChoiceField(kwargs) }
	    kwargs = object.extend({choices: []}, kwargs)
	    Field.call(this, kwargs)
	    this.setChoices(kwargs.choices)
	  }
	})

	ChoiceField.prototype.choices = function() { return this._choices }
	ChoiceField.prototype.setChoices = function(choices) {
	  // Setting choices also sets the choices on the widget
	  this._choices = this.widget.choices = normaliseChoices(choices)
	}

	ChoiceField.prototype.toJavaScript = function(value) {
	  if (this.isEmptyValue(value)) {
	    return ''
	  }
	  return ''+value
	}

	/**
	 * Validates that the given value is in this field's choices.
	 */
	ChoiceField.prototype.validate = function(value) {
	  Field.prototype.validate.call(this, value)
	  if (value && !this.validValue(value)) {
	    throw ValidationError(this.errorMessages.invalidChoice, {
	      code: 'invalidChoice'
	    , params: {value: value}
	    })
	  }
	}

	/**
	 * Checks to see if the provided value is a valid choice.
	 * @param {string} value the value to be validated.
	 */
	ChoiceField.prototype.validValue = function(value) {
	  var choices = this.choices()
	  for (var i = 0, l = choices.length; i < l; i++) {
	    if (is.Array(choices[i][1])) {
	      // This is an optgroup, so look inside the group for options
	      var optgroupChoices = choices[i][1]
	      for (var j = 0, m = optgroupChoices.length; j < m; j++) {
	        if (value === ''+optgroupChoices[j][0]) {
	          return true
	        }
	      }
	    }
	    else if (value === ''+choices[i][0]) {
	      return true
	    }
	  }
	  return false
	}

	module.exports = ChoiceField

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)
	var React = __webpack_require__(23)

	var CheckboxInput = __webpack_require__(63)
	var FileInput = __webpack_require__(79)

	var $__0=  __webpack_require__(15),formatToArray=$__0.formatToArray

	var FILE_INPUT_CONTRADICTION = {}

	/**
	 * @constructor
	 * @extends {FileInput}
	 * @param {Object=} kwargs
	 */
	var ClearableFileInput = FileInput.extend({
	  needsInitialValue: true
	, isValueSettable: false
	, constructor: function ClearableFileInput(kwargs) {
	    if (!(this instanceof ClearableFileInput)) { return new ClearableFileInput(kwargs) }
	    FileInput.call(this, kwargs)
	  }
	, initialText: 'Currently'
	, inputText: 'Change'
	, clearCheckboxLabel: 'Clear'
	, templateWithInitial: function(params) {
	    return formatToArray(
	      '{initialText}: {initial} {clearTemplate}{br}{inputText}: {input}'
	    , object.extend(params, {br: React.createElement('br', null)})
	    )
	  }
	, templateWithClear: function(params) {
	    return formatToArray(
	      '{checkbox} {label}'
	    , object.extend(params, {
	        label: React.createElement('label', {htmlFor: params.checkboxId}, params.label)
	      })
	    )
	  }
	, urlMarkupTemplate: function(href, name) {
	    return React.createElement('a', {href: href}, name)
	  }
	})

	ClearableFileInput.FILE_INPUT_CONTRADICTION = FILE_INPUT_CONTRADICTION

	/**
	 * Given the name of the file input, return the name of the clear checkbox
	 * input.
	 */
	ClearableFileInput.prototype.clearCheckboxName = function(name) {
	  return name + '-clear'
	}

	/**
	 * Given the name of the clear checkbox input, return the HTML id for it.
	 */
	ClearableFileInput.prototype.clearCheckboxId = function(name) {
	  return name + '_id'
	}

	ClearableFileInput.prototype.render = function(name, value, kwargs) {
	  kwargs = object.extend({attrs: {}}, kwargs)
	  kwargs.attrs.key = 'input'
	  var input = FileInput.prototype.render.call(this, name, value, kwargs)
	  var initialValue = kwargs.initialValue
	  if (!initialValue && value && typeof value.url != 'undefined') {
	    initialValue = value
	  }
	  if (initialValue && typeof initialValue.url != 'undefined') {
	    var clearTemplate
	    if (!this.isRequired) {
	      var clearCheckboxName = this.clearCheckboxName(name)
	      var clearCheckboxId = this.clearCheckboxId(clearCheckboxName)
	      clearTemplate = this.templateWithClear({
	        checkbox: CheckboxInput().render(clearCheckboxName, false, {attrs: {'id': clearCheckboxId}})
	      , checkboxId: clearCheckboxId
	      , label: this.clearCheckboxLabel
	      })
	    }
	    var contents = this.templateWithInitial({
	      initialText: this.initialText
	    , initial: this.urlMarkupTemplate(initialValue.url, ''+initialValue)
	    , clearTemplate: clearTemplate
	    , inputText: this.inputText
	    , input: input
	    })
	    return React.createElement('span', null, contents)
	  }
	  else {
	    return React.createElement('span', null, input)
	  }
	}

	ClearableFileInput.prototype.valueFromData = function(data, files, name) {
	  var upload = FileInput.prototype.valueFromData(data, files, name)
	  if (!this.isRequired &&
	      CheckboxInput.prototype.valueFromData.call(this, data, files,
	                                                 this.clearCheckboxName(name))) {
	    if (upload) {
	      // If the user contradicts themselves (uploads a new file AND
	      // checks the "clear" checkbox), we return a unique marker
	      // object that FileField will turn into a ValidationError.
	      return FILE_INPUT_CONTRADICTION
	    }
	    // false signals to clear any existing value, as opposed to just null
	    return false
	  }
	  return upload
	}

	module.exports = ClearableFileInput

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)

	var Input = __webpack_require__(22)

	var env =__webpack_require__(68)

	/**
	 * An HTML <input type="file"> widget.
	 * @constructor
	 * @extends {Input}
	 * @param {Object=} kwargs
	 */
	var FileInput = Input.extend({
	  constructor: function FileInput(kwargs) {
	    if (!(this instanceof FileInput)) { return new FileInput(kwargs) }
	    Input.call(this, kwargs)
	  }
	, inputType: 'file'
	, needsMultipartForm: true
	, validation: {onChange: true}
	, isValueSettable: false
	})

	FileInput.prototype.render = function(name, value, kwargs) {
	  return Input.prototype.render.call(this, name, null, kwargs)
	}

	/**
	 * On the client, files will be populated with File objects from the input's
	 * FileList when supported, otherwise its value will be in data as a fallback.
	 */
	FileInput.prototype.valueFromData = function(data, files, name) {
	  var dataSource = files
	  if (env.browser && !(name in files)) {
	    dataSource = data
	  }
	  return object.get(dataSource, name, null)
	}

	module.exports = FileInput

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)

	var Field = __webpack_require__(20)

	/**
	 * A Field whose clean() method calls multiple Field clean() methods.
	 * @constructor
	 * @extends {Field}
	 * @param {Object=} kwargs
	 */
	var ComboField = Field.extend({
	  constructor: function ComboField(kwargs) {
	    if (!(this instanceof ComboField)) { return new ComboField(kwargs) }
	    kwargs = object.extend({fields: []}, kwargs)
	    Field.call(this, kwargs)
	    // Set required to False on the individual fields, because the required
	    // validation will be handled by ComboField, not by those individual fields.
	    for (var i = 0, l = kwargs.fields.length; i < l; i++) {
	      kwargs.fields[i].required = false
	    }
	    this.fields = kwargs.fields
	  }
	})

	ComboField.prototype.clean = function(value) {
	  Field.prototype.clean.call(this, value)
	  for (var i = 0, l = this.fields.length; i < l; i++) {
	    value = this.fields[i].clean(value)
	  }
	  return value
	}

	module.exports = ComboField

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BaseTemporalField = __webpack_require__(18)
	var DateInput = __webpack_require__(82)

	/**
	 * Validates that its input is a date.
	 * @constructor
	 * @extends {BaseTemporalField}
	 * @param {Object=} kwargs
	 */
	var DateField = BaseTemporalField.extend({
	  widget: DateInput
	, inputFormatType: 'DATE_INPUT_FORMATS'
	, defaultErrorMessages: {
	    invalid: 'Enter a valid date.'
	  }

	, constructor: function DateField(kwargs) {
	    if (!(this instanceof DateField)) { return new DateField(kwargs) }
	    BaseTemporalField.call(this, kwargs)
	  }
	})

	/**
	 * Validates that the input can be converted to a date.
	 * @param {?(string|Date)} value user input.
	 * @return {?Date} a with its year, month and day attributes set, or null for
	 *   empty values when they are allowed.
	 * @throws {ValidationError} if the input is invalid.
	 */
	DateField.prototype.toJavaScript = function(value) {
	  if (this.isEmptyValue(value)) {
	    return null
	  }
	  if (value instanceof Date) {
	    return new Date(value.getFullYear(), value.getMonth(), value.getDate())
	  }
	  return BaseTemporalField.prototype.toJavaScript.call(this, value)
	}

	module.exports = DateField

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var DateTimeBaseInput = __webpack_require__(83)

	/**
	 * @constructor
	 * @extends {DateTimeBaseInput}
	 * @param {Object=} kwargs
	 */
	var DateInput = DateTimeBaseInput.extend({
	  formatType: 'DATE_INPUT_FORMATS'
	, constructor: function DateInput(kwargs) {
	    if (!(this instanceof DateInput)) { return new DateInput(kwargs) }
	    DateTimeBaseInput.call(this, kwargs)
	  }
	})

	module.exports = DateInput

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)
	var object = __webpack_require__(6)
	var time = __webpack_require__(14)

	var formats = __webpack_require__(19)
	var locales = __webpack_require__(13)
	var TextInput = __webpack_require__(61)

	/**
	 * A <input type="text"> which, if given a Date object to display, formats it as
	 * an appropriate date/time String.
	 * @constructor
	 * @extends {TextInput}
	 * @param {Object=} kwargs
	 */
	var DateTimeBaseInput = TextInput.extend({
	  formatType: ''
	, constructor: function DateTimeBaseInput(kwargs) {
	    kwargs = object.extend({format: null}, kwargs)
	    TextInput.call(this, kwargs)
	    this.format = kwargs.format
	  }
	})

	DateTimeBaseInput.prototype._formatValue = function(value) {
	  if (is.Date(value)) {
	    if (this.format === null) {
	      this.format = formats.getFormat(this.formatType)[0]
	    }
	    return time.strftime(value, this.format, locales.getDefaultLocale())
	  }
	  return value
	}

	module.exports = DateTimeBaseInput

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)

	var BaseTemporalField = __webpack_require__(18)
	var DateTimeInput = __webpack_require__(85)

	var $__0=  __webpack_require__(2),ValidationError=$__0.ValidationError

	/**
	 * Validates that its input is a date/time.
	 * @constructor
	 * @extends {BaseTemporalField}
	 * @param {Object=} kwargs
	 */
	var DateTimeField = BaseTemporalField.extend({
	  widget: DateTimeInput
	, inputFormatType: 'DATETIME_INPUT_FORMATS'
	, defaultErrorMessages: {
	    invalid: 'Enter a valid date/time.'
	  }

	, constructor: function DateTimeField(kwargs) {
	    if (!(this instanceof DateTimeField)) { return new DateTimeField(kwargs) }
	    BaseTemporalField.call(this, kwargs)
	  }
	})

	/**
	 * @param {?(string|Date|Array.<string>)} value user input.
	 * @return {?Date}
	 * @throws {ValidationError} if the input is invalid.
	 */
	DateTimeField.prototype.toJavaScript = function(value) {
	  if (this.isEmptyValue(value)) {
	    return null
	  }
	  if (value instanceof Date) {
	    return value
	  }
	  if (is.Array(value)) {
	    // Input comes from a SplitDateTimeWidget, for example, so it's two
	    // components: date and time.
	    if (value.length != 2) {
	      throw ValidationError(this.errorMessages.invalid, {code: 'invalid'})
	    }
	    if (this.isEmptyValue(value[0]) && this.isEmptyValue(value[1])) {
	      return null
	    }
	    value = value.join(' ')
	  }
	  return BaseTemporalField.prototype.toJavaScript.call(this, value)
	}


	module.exports = DateTimeField

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var DateTimeBaseInput = __webpack_require__(83)

	/**
	 * @constructor
	 * @extends {DateTimeBaseInput}
	 * @param {Object=} kwargs
	 */
	var DateTimeInput = DateTimeBaseInput.extend({
	  formatType: 'DATETIME_INPUT_FORMATS'
	, constructor: function DateTimeInput(kwargs) {
	    if (!(this instanceof DateTimeInput)) { return new DateTimeInput(kwargs) }
	    DateTimeBaseInput.call(this, kwargs)
	  }
	})

	module.exports = DateTimeInput

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)

	var Field = __webpack_require__(20)
	var IntegerField = __webpack_require__(87)

	var $__0=  __webpack_require__(2),ValidationError=$__0.ValidationError
	var $__1=  __webpack_require__(15),strip=$__1.strip

	/**
	 * Validates that its input is a decimal number.
	 * @constructor
	 * @extends {Field}
	 * @param {Object=} kwargs
	 */
	var DecimalField = IntegerField.extend({
	  defaultErrorMessages: {
	    invalid: 'Enter a number.'
	  , maxDigits: 'Ensure that there are no more than {max} digits in total.'
	  , maxDecimalPlaces: 'Ensure that there are no more than {max} decimal places.'
	  , maxWholeDigits: 'Ensure that there are no more than {max} digits before the decimal point.'
	  }

	, constructor: function DecimalField(kwargs) {
	    if (!(this instanceof DecimalField)) { return new DecimalField(kwargs) }
	    kwargs = object.extend({maxDigits: null, decimalPlaces: null}, kwargs)
	    this.maxDigits = kwargs.maxDigits
	    this.decimalPlaces = kwargs.decimalPlaces
	    IntegerField.call(this, kwargs)
	  }
	})

	/** Decimal validation regular expression, in lieu of a Decimal type. */
	DecimalField.DECIMAL_REGEXP = /^[-+]?(?:\d+(?:\.\d*)?|(?:\d+)?\.\d+)$/

	/**
	 * DecimalField overrides the clean() method as it performs its own validation
	 * against a different value than that given to any defined validators, due to
	 * JavaScript lacking a built-in Decimal type. Decimal format and component size
	 * checks will be performed against a normalised string representation of the
	 * input, whereas Validators will be passed a float version of the value for
	 * min/max checking.
	 * @param {string|Number} value
	 * @return {string} a normalised version of the input.
	 */
	DecimalField.prototype.clean = function(value) {
	  // Take care of empty, required validation
	  Field.prototype.validate.call(this, value)
	  if (this.isEmptyValue(value)) {
	    return null
	  }

	  // Coerce to string and validate that it looks Decimal-like
	  value = strip(''+value)
	  if (!DecimalField.DECIMAL_REGEXP.test(value)) {
	    throw ValidationError(this.errorMessages.invalid, {code: 'invalid'})
	  }

	  // In lieu of a Decimal type, DecimalField validates against a string
	  // representation of a Decimal, in which:
	  // * Any leading sign has been stripped
	  var negative = false
	  if (value.charAt(0) == '+' || value.charAt(0) == '-') {
	    negative = (value.charAt(0) == '-')
	    value = value.substr(1)
	  }
	  // * Leading zeros have been stripped from digits before the decimal point,
	  //   but trailing digits are retained after the decimal point.
	  value = value.replace(/^0+/, '')
	  // Reset to zero if we just wiped out all the digits in the input
	  if (value === '' || value == '.') {
	    value = '0'
	  }
	  // * If the input ended with a '.', it is stripped
	  if (value.indexOf('.') == value.length - 1) {
	    value = value.substring(0, value.length - 1)
	  }

	  // Perform own validation
	  var pieces = value.split('.')
	  var wholeDigits = pieces[0].length
	  var decimals = (pieces.length == 2 ? pieces[1].length : 0)
	  var digits = wholeDigits + decimals
	  if (this.maxDigits !== null && digits > this.maxDigits) {
	    throw ValidationError(this.errorMessages.maxDigits, {
	      code: 'maxDigits'
	    , params: {max: this.maxDigits}
	    })
	  }
	  if (this.decimalPlaces !== null && decimals > this.decimalPlaces) {
	    throw ValidationError(this.errorMessages.maxDecimalPlaces, {
	      code: 'maxDecimalPlaces'
	    , params: {max: this.decimalPlaces}
	    })
	  }
	  if (this.maxDigits !== null &&
	      this.decimalPlaces !== null &&
	      wholeDigits > (this.maxDigits - this.decimalPlaces)) {
	    throw ValidationError(this.errorMessages.maxWholeDigits, {
	      code: 'maxWholeDigits'
	    , params: {max: (this.maxDigits - this.decimalPlaces)}
	    })
	  }

	  // * Values which did not have a leading zero gain a single leading zero
	  if (value.charAt(0) == '.') {
	    value = '0' + value
	  }
	  // Restore sign if necessary
	  if (negative) {
	    value = '-' + value
	  }

	  // Validate against a float value - best we can do in the meantime
	  this.runValidators(parseFloat(value))

	  // Return the normalised String representation
	  return value
	}

	DecimalField.prototype.getWidgetAttrs = function(widget) {
	  var attrs = IntegerField.prototype.getWidgetAttrs.call(this, widget)
	   if (!object.hasOwn(widget.attrs, 'step')) {
	    var step = 'any'
	    if (this.decimalPlaces !== null) {
	      // Use exponential notation for small values since they might
	      // be parsed as 0 otherwise.
	      if (this.decimalPlaces === 0) {
	        step = '1'
	      }
	      else if (this.decimalPlaces < 7) {
	        step = '0.' + '000001'.slice(-this.decimalPlaces)
	      }
	      else {
	        step = '1e-' + this.decimalPlaces
	      }
	    }
	    object.setDefault(attrs, 'step', step)
	  }
	  return attrs
	}

	module.exports = DecimalField

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)
	var Field = __webpack_require__(20)
	var NumberInput = __webpack_require__(88)

	var $__0=    __webpack_require__(2),MaxValueValidator=$__0.MaxValueValidator,MinValueValidator=$__0.MinValueValidator,ValidationError=$__0.ValidationError

	/**
	 * Validates that its input is a valid integer.
	 * @constructor
	 * @extends {Field}
	 * @param {Object=} kwargs
	 */
	var IntegerField = Field.extend({
	  widget: NumberInput
	, defaultErrorMessages: {
	    invalid: 'Enter a whole number.'
	  }

	, constructor: function IntegerField(kwargs) {
	    if (!(this instanceof IntegerField)) { return new IntegerField(kwargs) }
	    kwargs = object.extend({maxValue: null, minValue: null}, kwargs)
	    this.maxValue = kwargs.maxValue
	    this.minValue = kwargs.minValue
	    Field.call(this, kwargs)

	    if (this.minValue !== null) {
	      this.validators.push(MinValueValidator(this.minValue))
	    }
	    if (this.maxValue !== null) {
	      this.validators.push(MaxValueValidator(this.maxValue))
	    }
	  }
	})

	/**
	 * Validates that Number() can be called on the input with a result that isn't
	 * NaN and doesn't contain any decimal points.
	 * @param {*} value user input.
	 * @return {?number} the result of Number(), or null for empty values.
	 * @throws {ValidationError} if the input is invalid.
	 */
	IntegerField.prototype.toJavaScript = function(value) {
	  value = Field.prototype.toJavaScript.call(this, value)
	  if (this.isEmptyValue(value)) {
	    return null
	  }
	  value = Number(value)
	  if (isNaN(value) || value.toString().indexOf('.') != -1) {
	    throw ValidationError(this.errorMessages.invalid, {code: 'invalid'})
	  }
	  return value
	}

	IntegerField.prototype.getWidgetAttrs = function(widget) {
	  var attrs = Field.prototype.getWidgetAttrs.call(this, widget)
	  if (this.minValue !== null && !object.hasOwn(widget.attrs, 'min')) {
	    object.setDefault(attrs, 'min', this.minValue)
	  }
	  if (this.maxValue !== null && !object.hasOwn(widget.attrs, 'max')) {
	    object.setDefault(attrs, 'max', this.maxValue)
	  }
	  return attrs
	}

	module.exports = IntegerField

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var TextInput = __webpack_require__(61)

	/**
	 * An HTML <input type="number"> widget.
	 * @constructor
	 * @extends {TextInput}
	 * @param {Object=} kwargs
	 */
	var NumberInput = TextInput.extend({
	  constructor: function NumberInput(kwargs) {
	    if (!(this instanceof NumberInput)) { return new NumberInput(kwargs) }
	    TextInput.call(this, kwargs)
	  }
	, inputType: 'number'
	})

	module.exports = NumberInput

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(15)

	var CharField = __webpack_require__(66)
	var EmailInput = __webpack_require__(90)

	var $__0=  __webpack_require__(2),validateEmail=$__0.validateEmail

	/**
	 * Validates that its input appears to be a valid e-mail address.
	 * @constructor
	 * @extends {CharField}
	 * @param {Object=} kwargs
	 */
	var EmailField = CharField.extend({
	  widget: EmailInput
	, defaultValidators: [validateEmail]

	, constructor: function EmailField(kwargs) {
	    if (!(this instanceof EmailField)) { return new EmailField(kwargs) }
	    CharField.call(this, kwargs)
	  }
	})

	EmailField.prototype.clean = function(value) {
	  value = util.strip(this.toJavaScript(value))
	  return CharField.prototype.clean.call(this, value)
	}


	module.exports = EmailField

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var TextInput = __webpack_require__(61)

	/**
	 * An HTML <input type="email"> widget.
	 * @constructor
	 * @extends {TextInput}
	 * @param {Object=} kwargs
	 */
	var EmailInput = TextInput.extend({
	  constructor: function EmailInput(kwargs) {
	    if (!(this instanceof EmailInput)) { return new EmailInput(kwargs) }
	    TextInput.call(this, kwargs)
	  }
	, inputType: 'email'
	})

	module.exports = EmailInput

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Concur = __webpack_require__(4)
	var object = __webpack_require__(6)
	var React = __webpack_require__(23)

	var $__0=  __webpack_require__(2),ValidationError=$__0.ValidationError

	/**
	 * A list of errors which knows how to display itself in various formats.
	 * @param {Array=} list a list of errors.
	 * @constructor
	 */
	var ErrorList = Concur.extend({
	  constructor: function ErrorList(list) {
	    if (!(this instanceof ErrorList)) { return new ErrorList(list) }
	    this.data = list || []
	  }
	})

	/**
	 * @param {Array.<Object>} list
	 * @return {ErrorList}
	 */
	ErrorList.fromJSON = function(list) {
	  var result = new ErrorList()
	  result.fromJSON(list)
	  return result
	}

	/**
	 * Adds more errors.
	 * @param {Array} errorList a list of errors.
	 */
	ErrorList.prototype.extend = function(errorList) {
	  this.data.push.apply(this.data, errorList)
	}

	/**
	 * @return {number} the number of errors.
	 */
	ErrorList.prototype.length = function() {
	  return this.data.length
	}

	/**
	 * @return {boolean} true if any errors are present.
	 */
	ErrorList.prototype.isPopulated = function() {
	  return (this.length() > 0)
	}

	/**
	 * @return {string} the first message held in this ErrorList.
	 */
	ErrorList.prototype.first = function() {
	  if (this.data.length > 0) {
	    var error = this.data[0]
	    if (error instanceof ValidationError) {
	      error = error.messages()[0]
	    }
	    return error
	  }
	}

	/**
	 * @return {Array.<string>} the list of messages held in this ErrorList.
	 */
	ErrorList.prototype.messages = function() {
	  var messages = []
	  for (var i = 0, l = this.data.length; i < l; i++) {
	    var error = this.data[i]
	    if (error instanceof ValidationError) {
	      error = error.messages()[0]
	    }
	    messages.push(error)
	  }
	  return messages
	}

	/**
	 * Default display is as a list.
	 * @return {ReactElement}
	 */
	ErrorList.prototype.render = function(kwargs) {
	  return this.asUl(kwargs)
	}

	/**
	 * Displays errors as a list.
	 * @return {ReactElement}
	 */
	ErrorList.prototype.asUl = function(kwargs) {
	  if (!this.isPopulated()) {
	    return
	  }
	  kwargs = object.extend({className: 'errorlist'}, kwargs)
	  return React.createElement('ul', {className: kwargs.className},
	    this.messages().map(function(error) {
	      return React.createElement('li', null, error)
	    })
	  )
	}

	/**
	 * Displays errors as text.
	 * @return {string}
	 */
	ErrorList.prototype.asText = ErrorList.prototype.toString =function() {
	  return this.messages().map(function(error) {
	    return '* ' + error
	  }).join('\n')
	}

	/**
	 * @return {Array}
	 */
	ErrorList.prototype.asData = function() {
	  return this.data
	}

	/**
	 * @return {Object}
	 */
	ErrorList.prototype.toJSON = function() {
	  return new ValidationError(this.data).errorList.map(function(error) {
	    return {
	      message: error.messages()[0]
	    , code: error.code || ''
	    }
	  })
	}

	/**
	 * @param {Array.<Object>} list
	 */
	ErrorList.prototype.fromJSON = function(list) {
	  this.data = list.map(function(err) {
	    return new ValidationError(err.message, {code: err.code})
	  })
	}

	module.exports = ErrorList


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Concur = __webpack_require__(4)
	var object = __webpack_require__(6)
	var React = __webpack_require__(23)

	var ErrorList = __webpack_require__(91)

	/**
	 * A collection of field errors that knows how to display itself in various
	 * formats. This object's .error properties are the field names and
	 * corresponding values are the errors.
	 * @constructor
	 */
	var ErrorObject = Concur.extend({
	  constructor: function ErrorObject() {
	    if (!(this instanceof ErrorObject)) { return new ErrorObject() }
	    this.errors = {}
	  }
	})

	/**
	 * @param {Object} jsonObj
	 * @param {function=} errorConstructor
	 * @return {ErrorObject}
	 */
	ErrorObject.fromJSON = function(jsonObj, errorConstructor) {
	  var result = new ErrorObject()
	  result.fromJSON(jsonObj, errorConstructor)
	  return result
	}

	/**
	 * Sets a field's errors.
	 * @param {string} fieldName
	 * @param {ErrorList} errors
	 */
	ErrorObject.prototype.set = function(fieldName, errors) {
	  this.errors[fieldName] = errors
	}

	/**
	 * Gets a field's errors.
	 * @param {string} fieldName
	 * @return {ErrorList}
	 */
	ErrorObject.prototype.get = function(fieldName) {
	  return this.errors[fieldName]
	}

	/**
	 * Removes errors for a field.
	 * @param {string} fieldName
	 * @return {boolean} true if there were errors for the field.
	 */
	ErrorObject.prototype.remove = function(fieldName) {
	  return delete this.errors[fieldName]
	}

	/**
	 * Removes errors for multiple fields.
	 * @param {Array.<string>} fieldNames
	 */
	ErrorObject.prototype.removeAll = function(fieldNames) {
	  for (var i = 0, l = fieldNames.length; i < l; i++) {
	    delete this.errors[fieldNames[i]]
	  }
	}

	/**
	 * @return {boolean} true if the field has errors.
	 */
	ErrorObject.prototype.hasField = function(fieldName) {
	  return object.hasOwn(this.errors, fieldName)
	}

	/**
	 * @return {number}
	 */
	ErrorObject.prototype.length = function() {
	  return Object.keys(this.errors).length
	}

	/**
	 * @return {boolean} true if any errors are present.
	 */
	ErrorObject.prototype.isPopulated = function() {
	  return (this.length() > 0)
	}

	/**
	 * Default display is as a list.
	 * @return {ReactElement}
	 */
	ErrorObject.prototype.render = function(kwargs) {
	  return this.asUl(kwargs)
	}

	/**
	 * Displays error details as a list.
	 * @return {ReactElement}
	 */
	ErrorObject.prototype.asUl = function(kwargs) {
	  kwargs = object.extend({className: 'errorlist'}, kwargs)
	  var items = Object.keys(this.errors).map(function(fieldName) {
	    return React.createElement('li', null, fieldName, this.errors[fieldName].asUl())
	  }.bind(this))
	  if (items.length === 0) { return }
	  return React.createElement('ul', {className: kwargs.className}, items)
	}

	/**
	 * Displays error details as text.
	 * @return {string}
	 */
	ErrorObject.prototype.asText = ErrorObject.prototype.toString = function() {
	  return Object.keys(this.errors).map(function(fieldName) {
	    var messages = this.errors[fieldName].messages()
	    return ['* ' + fieldName].concat(messages.map(function(message) {
	      return ('  * ' + message)
	    })).join('\n')
	  }.bind(this)).join('\n')
	}

	/**
	 * @return {Object}
	 */
	ErrorObject.prototype.asData = function() {
	  var data = {}
	  Object.keys(this.errors).map(function(fieldName) {
	    data[fieldName] = this.errors[fieldName].asData()
	  }.bind(this))
	  return data
	}

	/**
	 * @return {Object}
	 */
	ErrorObject.prototype.toJSON = function() {
	  var jsonObj = {}
	  Object.keys(this.errors).map(function(fieldName) {
	    jsonObj[fieldName] = this.errors[fieldName].toJSON()
	  }.bind(this))
	  return jsonObj
	}

	/**
	 * @param {Object} jsonObj
	 * @param {function=} errorConstructor
	 */
	ErrorObject.prototype.fromJSON = function(jsonObj, errorConstructor) {
	  errorConstructor = errorConstructor || ErrorList
	  this.errors = {}
	  var fieldNames = Object.keys(jsonObj)
	  for (var i = 0, l = fieldNames.length; i < l ; i++) {
	    var fieldName = fieldNames[i]
	    this.errors[fieldName] = errorConstructor.fromJSON(jsonObj[fieldName])
	  }
	}

	module.exports = ErrorObject


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)
	var object = __webpack_require__(6)

	var env = __webpack_require__(68)

	var ClearableFileInput = __webpack_require__(78)
	var Field = __webpack_require__(20)

	var $__0=  __webpack_require__(2),ValidationError=$__0.ValidationError

	/**
	 * Validates that its input is a valid uploaded file.
	 * @constructor
	 * @extends {Field}
	 * @param {Object=} kwargs
	 */
	var FileField = Field.extend({
	  widget: ClearableFileInput
	, defaultErrorMessages: {
	    invalid: 'No file was submitted. Check the encoding type on the form.'
	  , missing: 'No file was submitted.'
	  , empty: 'The submitted file is empty.'
	  , maxLength: 'Ensure this filename has at most {max} characters (it has {length}).'
	  , contradiction: 'Please either submit a file or check the clear checkbox, not both.'
	  }

	, constructor: function FileField(kwargs) {
	    if (!(this instanceof FileField)) { return new FileField(kwargs) }
	    kwargs = object.extend({maxLength: null, allowEmptyFile: false}, kwargs)
	    this.maxLength = kwargs.maxLength
	    this.allowEmptyFile = kwargs.allowEmptyFile
	    delete kwargs.maxLength
	    Field.call(this, kwargs)
	  }
	})

	FileField.prototype.toJavaScript = function(data, initial) {
	  if (this.isEmptyValue(data)) {
	    return null
	  }

	  // If the browser doesn't support File objects, we can't do anything more
	  if (env.browser && is.String(data)) {
	    return data
	  }

	  // File objects should have name and size attributes
	  if (typeof data.name == 'undefined' || typeof data.size == 'undefined') {
	    throw ValidationError(this.errorMessages.invalid, {code: 'invalid'})
	  }

	  var name = data.name
	  var suze = Number(data.size)

	  if (this.maxLength !== null && name.length > this.maxLength) {
	    throw ValidationError(this.errorMessages.maxLength, {
	      code: 'maxLength'
	    , params: {max: this.maxLength, length: name.length}
	    })
	  }
	  if (!name) {
	    throw ValidationError(this.errorMessages.invalid, {code: 'invalid'})
	  }
	  if (!this.allowEmptyFile && suze === 0) {
	    throw ValidationError(this.errorMessages.empty, {code: 'empty'})
	  }

	  return data
	}

	FileField.prototype.clean = function(data, initial) {
	  // If the widget got contradictory inputs, we raise a validation error
	  if (data === ClearableFileInput.FILE_INPUT_CONTRADICTION) {
	    throw ValidationError(this.errorMessages.contradiction,
	                          {code: 'contradiction'})
	  }
	  // false means the field value should be cleared; further validation is
	  // not needed.
	  if (data === false) {
	    if (!this.required) {
	      return false
	    }
	    // If the field is required, clearing is not possible (the widget
	    // shouldn't return false data in that case anyway). false is not
	    // in EMPTY_VALUES; if a false value makes it this far it should be
	    // validated from here on out as null (so it will be caught by the
	    // required check).
	    data = null
	  }
	  if (!data && initial) {
	    return initial
	  }
	  return Field.prototype.clean.call(this, data)
	}

	FileField.prototype.boundData = function(data, initial) {
	  if (data === null || data === ClearableFileInput.FILE_INPUT_CONTRADICTION) {
	    return initial
	  }
	  return data
	}

	FileField.prototype._hasChanged = function(initial, data) {
	  return (data !== null)
	}

	module.exports = FileField

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)

	var ChoiceField = __webpack_require__(77)

	/**
	 * Allows choosing from files inside a certain directory.
	 * @constructor
	 * @extends {ChoiceField}
	 * @param {string} path
	 * @param {Object=} kwargs
	 */
	var FilePathField = ChoiceField.extend({
	  constructor: function FilePathField(path, kwargs) {
	    if (!(this instanceof FilePathField)) { return new FilePathField(path, kwargs) }
	    kwargs = object.extend({
	      match: null, recursive: false, required: true, widget: null,
	      label: null, initial: null, helpText: null,
	      allowFiles: true, allowFolders: false
	    }, kwargs)

	    this.path = path
	    this.match = object.pop(kwargs, 'match')
	    this.recursive = object.pop(kwargs, 'recursive')
	    this.allowFiles = object.pop(kwargs, 'allowFiles')
	    this.allowFolders = object.pop(kwargs, 'allowFolders')
	    delete kwargs.match
	    delete kwargs.recursive

	    kwargs.choices = []
	    ChoiceField.call(this, kwargs)

	    if (this.required) {
	      this.setChoices([])
	    }
	    else {
	      this.setChoices([['', '---------']])
	    }

	    if (this.match !== null) {
	      this.matchRE = new RegExp(this.match)
	    }

	    // TODO Plug in file paths when running on the server

	    this.widget.choices = this.choices()
	  }
	})

	module.exports = FilePathField

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)

	var Field = __webpack_require__(20)
	var IntegerField = __webpack_require__(87)

	var $__0=  __webpack_require__(2),ValidationError=$__0.ValidationError
	var $__1=  __webpack_require__(15),strip=$__1.strip

	/**
	 * Validates that its input is a valid float.
	 * @constructor
	 * @extends {IntegerField}
	 * @param {Object=} kwargs
	 */
	var FloatField = IntegerField.extend({
	  defaultErrorMessages: {
	    invalid: 'Enter a number.'
	  }

	, constructor: function FloatField(kwargs) {
	    if (!(this instanceof FloatField)) { return new FloatField(kwargs) }
	    IntegerField.call(this, kwargs)
	  }
	})

	/** Float validation regular expression, as parseFloat() is too forgiving. */
	FloatField.FLOAT_REGEXP = /^[-+]?(?:\d+(?:\.\d*)?|(?:\d+)?\.\d+)$/

	/**
	 * Validates that the input looks like valid input for parseFloat() and the
	 * result of calling it isn't NaN.
	 * @param {*} value user input.
	 * @return a Number obtained from parseFloat(), or null for empty values.
	 * @throws {ValidationError} if the input is invalid.
	 */
	FloatField.prototype.toJavaScript = function(value) {
	  value = Field.prototype.toJavaScript.call(this, value)
	  if (this.isEmptyValue(value)) {
	    return null
	  }
	  value = strip(value)
	  if (!FloatField.FLOAT_REGEXP.test(value)) {
	    throw ValidationError(this.errorMessages.invalid, {code: 'invalid'})
	  }
	  value = parseFloat(value)
	  if (isNaN(value)) {
	    throw ValidationError(this.errorMessages.invalid, {code: 'invalid'})
	  }
	  return value
	}

	/**
	 * Determines if data has changed from initial. In JavaScript, trailing zeroes
	 * in floats are dropped when a float is coerced to a String, so e.g., an
	 * initial value of 1.0 would not match a data value of '1.0' if we were to use
	 * the Widget object's _hasChanged, which checks coerced String values.
	 * @return {boolean} true if data has changed from initial.
	 */
	FloatField.prototype._hasChanged = function(initial, data) {
	  // For purposes of seeing whether something has changed, null is the same
	  // as an empty string, if the data or initial value we get is null, replace
	  // it with ''.
	  var dataValue = (data === null ? '' : data)
	  var initialValue = (initial === null ? '' : initial)
	  if (initialValue === dataValue) {
	    return false
	  }
	  else if (initialValue === '' || dataValue === '') {
	    return true
	  }
	  return (parseFloat(''+initialValue) != parseFloat(''+dataValue))
	}

	FloatField.prototype.getWidgetAttrs = function(widget) {
	  var attrs = IntegerField.prototype.getWidgetAttrs.call(this, widget)
	  if (!object.hasOwn(widget.attrs, 'step')) {
	    object.setDefault(attrs, 'step', 'any')
	  }
	  return attrs
	}

	module.exports = FloatField

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var Concur = __webpack_require__(4)
	var getFormData = __webpack_require__(17)
	var copy = __webpack_require__(97)
	var $__0=  __webpack_require__(11),formatObj=$__0.formatObj
	var is = __webpack_require__(5)
	var object = __webpack_require__(6)

	var constants = __webpack_require__(98)

	var BoundField = __webpack_require__(64)
	var DeclarativeFieldsMeta = __webpack_require__(99)
	var ErrorList = __webpack_require__(91)
	var ErrorObject = __webpack_require__(92)
	var FileField = __webpack_require__(93)
	var MultipleFileField = __webpack_require__(100)

	var $__1=  __webpack_require__(2),ValidationError=$__1.ValidationError
	var $__2=      __webpack_require__(15),cancellable=$__2.cancellable,debounce=$__2.debounce,info=$__2.info,warning=$__2.warning,normaliseValidation=$__2.normaliseValidation

	function noop() {}
	var sentinel = {}

	var NON_FIELD_ERRORS = constants.NON_FIELD_ERRORS

	/**
	 * Checks if a field's view of raw input data (via its Widget) has changed.
	 */
	function fieldDataHasChanged(previous, current) {
	  if (is.Array(previous) && is.Array(current)) {
	    if (previous.length != current.length) { return true }
	    for (var i = 0, l = previous.length; i < l; i++) {
	      if (previous[i] != current[i]) { return true }
	    }
	    return false
	  }
	  return previous != current
	}

	if ('production' !== process.env.NODE_ENV) {
	  var warnedOnImpliedValidateAuto = false
	}

	/**
	 * A collection of Fields that knows how to validate and display itself.
	 * @constructor
	 * @param {Object.<string, *>} kwargs form options.
	 */
	var Form = Concur.extend({
	  __meta__: DeclarativeFieldsMeta,

	  prefixFormat: '{prefix}-{name}',

	  constructor: function Form(kwargs) {
	    // TODO Perform PropType checks on kwargs in development mode
	    kwargs = object.extend({
	      data: null, files: null, autoId: 'id_{name}', prefix: null,
	      initial: null, errorConstructor: ErrorList, labelSuffix: ':',
	      emptyPermitted: false, validation: null, controlled: false,
	      onChange: null, errors: null
	    }, kwargs)
	    this.isInitialRender = (kwargs.data == null && kwargs.files == null)
	    this.data = kwargs.data || {}
	    this.files = kwargs.files || {}
	    this.autoId = kwargs.autoId
	    this.prefix = kwargs.prefix
	    this.initial = kwargs.initial || {}
	    this.cleanedData = {}
	    this.errorConstructor = kwargs.errorConstructor
	    this.labelSuffix = kwargs.labelSuffix
	    this.emptyPermitted = kwargs.emptyPermitted
	    this.controlled = kwargs.controlled
	    this.onChange = kwargs.onChange

	    // Auto validation is implied when onChange is passed
	    if (is.Function(kwargs.onChange)) {
	      if ('production' !== process.env.NODE_ENV) {
	        if (!warnedOnImpliedValidateAuto && kwargs.validation === 'auto') {
	          info('Passing onChange to a Form or FormSet constructor also ' +
	               "implies validation: 'auto' by default - you don't have " +
	               'to set it manually.')
	          warnedOnImpliedValidateAuto = true
	        }
	      }
	      if (kwargs.validation == null) {
	        kwargs.validation = 'auto'
	      }
	    }
	    this.validation = normaliseValidation(kwargs.validation || 'manual')

	    this._errors = kwargs.errors

	    // Cancellable debounced functions for delayed event validation
	    this._pendingEventValidation = {}
	    // Input data as it was last time validation was performed on a field
	    this._lastValidatedData = {}
	    // Cached result of the last call to hasChanged()
	    this._lastHasChanged = null

	    // Lookup for names of fields pending validation
	    this._pendingValidation = {}
	    // Cancellable callbacks for pending async validation
	    this._pendingAsyncValidation = {}
	    // Lookup for names of fields pending validation which clean() depends on
	    this._runCleanAfter = {}
	    // Callback to be run the next time validation finishes
	    this._onValidate = null

	    // The baseFields attribute is the *prototype-wide* definition of fields.
	    // Because a particular *instance* might want to alter this.fields, we
	    // create this.fields here by deep copying baseFields. Instances should
	    // always modify this.fields; they should not modify baseFields.
	    this.fields = copy.deepCopy(this.baseFields)

	    if ('production' !== process.env.NODE_ENV) {
	      // Now that form.fields exists, we can check if there's any configuration
	      // which *needs* onChange on the form or its fields.
	      if (!is.Function(kwargs.onChange) && this._needsOnChange()) {
	        warning("You didn't provide an onChange callback for a " +
	                this._formName() + ' which has controlled fields. This ' +
	                'will result in read-only fields.')
	      }
	    }

	    // Copy initial values to the data object, as it represents form input -
	    // literally so in the case of controlled components once we start taking
	    // some data and isInitialRender flips to false.
	    if (this.isInitialRender) {
	      this._copyInitialToData()
	    }
	  }
	})

	// XXX Don't alter form extension arguments - fix this in Concur
	var _extend = Form.extend
	Form.extend = function(prototypeProps, constructorProps) {
	  return _extend.call(this, object.extend({}, prototypeProps), constructorProps)
	}

	/**
	 * Calls the onChange function if it's been provided. This method will be called
	 * every time the form makes a change to its state which requires redisplay.
	 */
	Form.prototype._stateChanged = function() {
	  if (typeof this.onChange == 'function') {
	    this.onChange()
	  }
	}

	/**
	 * Copies initial data to the input data object, as it represents form input -
	 * when using controlled components once we start taking some data,
	 * isInitialRender flips to false and this.data is used for rendering widgets.
	 */
	Form.prototype._copyInitialToData = function() {
	  var initialData = object.extend(this._fieldInitialData(), this.initial)
	  var initialFieldNames = Object.keys(initialData)
	  for (var i = 0, l = initialFieldNames.length; i < l; i++) {
	    var fieldName = initialFieldNames[i]
	    if (typeof this.fields[fieldName] == 'undefined') { continue }
	    // Don't copy initial to input data for fields which can't have the
	    // initial data set as their current value.
	    if (!this.fields[fieldName].widget.isValueSettable) { continue }
	    this.data[this.addPrefix(fieldName)] = initialData[fieldName]
	  }
	}

	/**
	 * Gets initial data configured in this form's fields.
	 * @return {Object.<string,*>}
	 */
	Form.prototype._fieldInitialData = function() {
	  var fieldInitial = {}
	  var fieldNames = Object.keys(this.fields)
	  for (var i = 0, l = fieldNames.length; i < l; i++) {
	    var fieldName = fieldNames[i]
	    var initial = this.fields[fieldName].initial
	    if (initial !== null) {
	      fieldInitial[fieldName] = initial
	    }
	  }
	  return fieldInitial
	}

	/**
	 * Tries to construct a display name for the form for display in messages.
	 * @return {string}
	 */
	Form.prototype._formName = function() {
	  var name = this.displayName || this.constructor.name
	  return (name ? "'" + name + "'" : 'Form')
	}

	/**
	 * @return {boolean} true if the form or any of its fields are configured to
	 *   generate controlled components.
	 */
	Form.prototype._needsOnChange = function() {
	  if (this.controlled === true) {
	    return true
	  }
	  var names = Object.keys(this.fields)
	  for (var i = 0, l = names.length; i < l; i++) {
	    if (this.fields[names[i]].controlled === true) {
	      return true
	    }
	  }
	  return false
	}

	// ============================================================== Validation ===

	/**
	 * Validates the form from scratch. If a <form> is given, data from it will be
	 * set on this form first. Otherwise, validation will be done with this form's
	 * current input data.
	 * @param {(ReactElement|HTMLFormElement)=} form the <form> containing this
	 * form's rendered widgets - this can be a React <form> component or a real
	 * <form> DOM node.
	 * @param {function(err, isValid, cleanedData)=} cb callback for asynchronous
	 *   validation.
	 * @return {boolean|undefined} true if the form only has synchronous validation
	 *   and is valid.
	 * @throws if the form has asynchronous validation and a callback is not
	 *   provided.
	 */
	Form.prototype.validate = function(form, cb) {
	  this._cancelPendingOperations()
	  if (is.Function(form)) {
	    cb = form
	    form = null
	  }
	  if (form) {
	    if (typeof form.getDOMNode == 'function') {
	      form = form.getDOMNode()
	    }
	    this.data = getFormData(form)
	  }
	  return (this.isAsync() ? this._validateAsync(cb) : this._validateSync())
	}

	Form.prototype._validateAsync = function(cb) {
	  if (!is.Function(cb)) {
	    throw new Error(
	      'You must provide a callback to validate() when a form has ' +
	      'asynchronous validation.'
	    )
	  }
	  if (this.isInitialRender) {
	    this.isInitialRender = false
	  }
	  this._onValidate = cb
	  this.fullClean()
	  // Display async progress indicators
	  this._stateChanged()
	}

	Form.prototype._validateSync = function() {
	  if (this.isInitialRender) {
	    this.isInitialRender = false
	  }
	  this.fullClean()
	  // Display changes to valid/invalid state
	  this._stateChanged()
	  return this.isValid()
	}

	/**
	 * Cleans data for all fields and triggers cross-form cleaning.
	 */
	Form.prototype.fullClean = function() {
	  this._errors = new ErrorObject()
	  if (this.isInitialRender) {
	    return // Stop further processing
	  }

	  this.cleanedData = {}

	  // If the form is permitted to be empty, and none of the form data has
	  // changed from the initial data, short circuit any validation.
	  if (this.emptyPermitted && !this.hasChanged()) {
	    this._finishedValidation(null)
	    return
	  }

	  this._cleanFields()
	}

	/**
	 * Cleans data for the given field names and triggers cross-form cleaning in
	 * case any cleanedData it uses has changed.
	 * @param {Array.<string>} fields field names.
	 */
	Form.prototype.partialClean = function(fields) {
	  this._removeErrors(fields)

	  // If the form is permitted to be empty, and none of the form data has
	  // changed from the initial data, short circuit any validation.
	  if (this.emptyPermitted && !this.hasChanged()) {
	    if (this._errors.isPopulated()) {
	      this._errors = ErrorObject()
	    }
	    return
	  }

	  this._preCleanFields(fields)
	  for (var i = 0, l = fields.length; i < l; i++) {
	    this._cleanField(fields[i])
	  }
	}

	/**
	 * Validates and cleans every field in the form.
	 */
	Form.prototype._cleanFields = function() {
	  var fieldNames = Object.keys(this.fields)
	  this._preCleanFields(fieldNames)
	  for (var i = 0, l = fieldNames.length; i < l ; i++) {
	    this._cleanField(fieldNames[i])
	  }
	}

	/**
	 * Sets up pending validation state prior to cleaning fields and configures
	 * cross-field cleaning to run after its dependent fields have been cleaned, or
	 * after all fields have been cleaned if dependencies have not been configured.
	 * @param {Array.<string>} fieldNames fields which are about to be cleaned.
	 */
	Form.prototype._preCleanFields = function(fieldNames) {
	  // Add all field names to those pending validation
	  object.extend(this._pendingValidation, object.lookup(fieldNames))

	  // Add appropriate field names to determine when to run cross-field cleaning
	  var i, l
	  if (typeof this.clean.fields != 'undefined') {
	    for (i = 0, l = fieldNames.length; i < l; i++) {
	      if (this.clean.fields[fieldNames[i]]) {
	        this._runCleanAfter[fieldNames[i]] = true
	      }
	    }
	  }
	  else {
	    // Ignore any invalid field names given
	    for (i = 0, l = fieldNames.length; i < l; i++) {
	      if (this.fields[fieldNames[i]]) {
	        this._runCleanAfter[fieldNames[i]] = true
	      }
	    }
	  }
	}

	/**
	 * Validates and cleans the named field and runs any custom validation function
	 * that's been provided for it.
	 * @param {string} name the name of a form field.
	 */
	Form.prototype._cleanField = function(name) {
	  if (!object.hasOwn(this.fields, name)) {
	    throw new Error(this._formName() + " has no field named '" + name + "'")
	  }

	  var field = this.fields[name]
	  // valueFromData() gets the data from the data objects.
	  // Each widget type knows how to retrieve its own data, because some widgets
	  // split data over several HTML fields.
	  var value = field.widget.valueFromData(this.data, this.files,
	                                         this.addPrefix(name))
	  var async = false
	  var error = null

	  try {
	    if (field instanceof FileField) {
	      var initial = object.get(this.initial, name, field.initial)
	      value = field.clean(value, initial)
	    }
	    else {
	      value = field.clean(value)
	    }
	    this.cleanedData[name] = value
	    var customClean = this._getCustomClean(name)
	    if (is.Function(customClean)) {
	      async = this._runCustomClean(name, customClean)
	    }
	  }
	  catch (e) {
	    if (e instanceof ValidationError) {
	      this.addError(name, e)
	    }
	    else {
	      error = e
	    }
	  }

	  if (!async) {
	    this._fieldCleaned(name, error)
	  }
	}

	/**
	 * Gets the custom cleaning method for a field. These can be named clean<Name>
	 * or clean_<name>.
	 * @param {string} fieldName
	 * @return {function|undefined}
	 */
	Form.prototype._getCustomClean = function(fieldName) {
	  return (this['clean' + fieldName.charAt(0).toUpperCase() + fieldName.substr(1)] ||
	          this['clean_' + fieldName])
	}

	/**
	 * Calls a custom cleaning method, expecting synchronous or asynchronous
	 * behaviour, depending on its arity.
	 * @param {string} fieldName a field name.
	 * @param {(function()|function(function(Error, string, string|ValidationError)))} customClean
	 *   the custom cleaning method for the field.
	 * @return {boolean} true if cleaning is running asynchronously, false if it just
	 *   ran synchronously.
	 */
	Form.prototype._runCustomClean = function(fieldName, customClean) {
	  // Check arity to see if we have a callback in the function signature
	  if (customClean.length === 0) {
	    // Synchronous processing only expected
	    customClean.call(this)
	    return false
	  }

	  // If custom validation is async and there's one pending, prevent its
	  // callback from doing anything.
	  if (typeof this._pendingAsyncValidation[fieldName] != 'undefined') {
	    object.pop(this._pendingAsyncValidation, fieldName).cancel()
	  }
	  // Set up callback for async processing - the argument for addError()
	  // should be passed via the callback as calling it directly prevents us
	  // from completely ignoring the callback if validation fires again.
	  var callback = function(err, validationError) {
	    if (validationError) {
	      this.addError(fieldName == NON_FIELD_ERRORS ? null : fieldName, validationError)
	    }
	    this._fieldCleaned(fieldName, err)
	    this._stateChanged()
	  }.bind(this)
	  var cancellableCallback = cancellable(callback)

	  // An explicit return value of false indicates that async processing is
	  // being skipped (e.g. because sync checks in the method failed first)
	  var returnValue = customClean.call(this, cancellableCallback)
	  if (returnValue !== false) {
	    // Async processing is happening! Make the callback cancellable and
	    // hook up any custom onCancel handling provided.
	    if (returnValue && typeof returnValue.onCancel == 'function') {
	      callback.onCancel = returnValue.onCancel
	    }
	    this._pendingAsyncValidation[fieldName] = cancellableCallback
	    return true
	  }
	}

	/**
	 * Callback for completion of field cleaning. Triggers further field cleaning or
	 * signals the end of validation, as necessary.
	 * @param {string} fieldName
	 * @param {Error=} err an error caught while cleaning the field.
	 */
	Form.prototype._fieldCleaned = function(fieldName, err) {
	  var wasPending = delete this._pendingValidation[fieldName]
	  if (this._pendingAsyncValidation[fieldName]) {
	    delete this._pendingAsyncValidation[fieldName]
	  }

	  if (err) {
	    if ("production" !== process.env.NODE_ENV) {
	      console.error('Error cleaning ' + this._formName() + '.' + fieldName +
	                    ':' + err.message)
	    }
	    // Stop tracking validation progress on error, and don't call clean()
	    this._pendingValidation = {}
	    this._runCleanAfter = {}
	    this._finishedValidation(err)
	    return
	  }

	  // Run clean() if this was the last field it was waiting for
	  if (this._runCleanAfter[fieldName]) {
	    delete this._runCleanAfter[fieldName]
	    if (is.Empty(this._runCleanAfter)) {
	      this._cleanForm()
	      return
	    }
	  }

	  // Signal the end of validation if this was the last field we were waiting for
	  if (wasPending && is.Empty(this._pendingValidation)) {
	    this._finishedValidation(null)
	  }
	}

	/**
	 * Hook for doing any extra form-wide cleaning after each Field has been cleaned.
	 * Any ValidationError thrown by synchronous validation in this method will not
	 * be associated with a particular field; it will have a special-case association
	 * with the field named '__all__'.
	 * @param {function(Error, string, string|ValidationError)=} cb a callback to signal the
	 *   end of asynchronous validation.
	 */
	Form.prototype.clean = noop

	/**
	 * Calls the clean() hook.
	 */
	Form.prototype._cleanForm = function() {
	  var async = false
	  var error = null
	  try {
	    if (this.clean !== noop) {
	      async = this._runCustomClean(NON_FIELD_ERRORS, this.clean)
	    }
	  }
	  catch (e) {
	    if (e instanceof ValidationError) {
	      this.addError(null, e)
	    }
	    else {
	      error = e
	    }
	  }

	  if (!async) {
	    this._fieldCleaned(NON_FIELD_ERRORS, error)
	  }
	}

	Form.prototype._finishedValidation = function(err) {
	  if (!this.isAsync()) {
	    if (err) {
	      throw err
	    }
	    // Synchronous form validation results will be returned via the original
	    // call which triggered validation.
	    return
	  }
	  if (is.Function(this._onValidate)) {
	    var callback = this._onValidate
	    this._onValidate = null
	    if (err) {
	      return callback(err)
	    }
	    var isValid = this.isValid()
	    callback(null, isValid, isValid ? this.cleanedData : null)
	  }
	}

	/**
	 * Cancels any pending field validations and async validations.
	 */
	Form.prototype._cancelPendingOperations = function() {
	  Object.keys(this._pendingEventValidation).forEach(function(field) {
	    object.pop(this._pendingEventValidation, field).cancel()
	  }.bind(this))
	  Object.keys(this._pendingAsyncValidation).forEach(function(field) {
	    object.pop(this._pendingAsyncValidation, field).cancel()
	  }.bind(this))
	}

	// ========================================================== Event Handling ===

	/**
	 * Handles validating the field which is the target of the given event based
	 * on its validation config. This will be hooked up to the appropriate event
	 * as per the field's validation config.
	 * @param {Object} validation the field's validation config for the event.
	 * @param {SyntheticEvent} e the event being handled.
	 */
	Form.prototype._handleFieldEvent = function(validation, e) {
	  // Update form.data with the current value of the field which is the target of
	  // the event.
	  var htmlName = e.target.name
	  var fieldName = this.removePrefix(e.target.getAttribute('data-newforms-field') || htmlName)
	  var field = this.fields[fieldName]
	  var targetData = getFormData.getNamedFormElementData(e.target.form, htmlName)
	  this.data[htmlName] = targetData
	  if (field instanceof FileField && 'files' in e.target) {
	    var files = e.target.files
	    this.files[htmlName] = (field instanceof MultipleFileField
	                            ? Array.prototype.slice.call(files)
	                            : files[0])
	  }
	  if (this.isInitialRender) {
	    this.isInitialRender = false
	  }
	  if (this.controlled || field.controlled) {
	    this._stateChanged()
	  }

	  // Bail out early if the event is only being handled to update the field's data
	  if (validation.validate === false) { return }

	  var validate = false

	  // Special cases for onBlur, as it ends a user's interaction with a text input
	  if (validation.event == 'onBlur') {
	    // If there is any pending validation, trigger it immediately
	    if (typeof this._pendingEventValidation[fieldName] != 'undefined') {
	      this._pendingEventValidation[fieldName].trigger()
	      return
	    }
	    // Always validate if the field is required and the input which was blurred
	    // was empty (some fields have multiple inputs).
	    validate = (field.required && field.isEmptyValue(targetData))
	  }

	  // Always validate if this is the first time the field has been interacted
	  // with.
	  if (!validate) {
	    var lastValidatedData = object.get(this._lastValidatedData, fieldName, sentinel)
	    validate = (lastValidatedData === sentinel)
	  }

	  // Otherwise, validate if data has changed since validation was last performed
	  // - this prevents displayed validation errors being cleared unnecessarily.
	  if (!validate) {
	    var fieldData = field.widget.valueFromData(this.data, this.files, this.addPrefix(fieldName))
	    validate = fieldDataHasChanged(lastValidatedData, fieldData)
	  }

	  // Cancel any pending validation as it's no longer needed - this can happen
	  // if the user edits a field with debounced validation and it ends up back
	  // at its original value before validation is triggered.
	  if (!validate && typeof this._pendingEventValidation[fieldName] != 'undefined') {
	    object.pop(this._pendingEventValidation, fieldName).cancel()
	  }

	  // If we don't need to validate, we're done handling the event
	  if (!validate) { return }

	  if (validation.delay) {
	    this._delayedFieldValidation(fieldName, validation.delay)
	  }
	  else {
	    this._immediateFieldValidation(fieldName)
	  }
	}

	/**
	 * Sets up delayed validation of a field with a debounced function and calls it,
	 * or just calls the function again if it already exists, to reset the delay.
	 * @param {string} fieldName
	 * @param {number} delay delay time in ms.
	 */
	Form.prototype._delayedFieldValidation = function(fieldName, delay) {
	  if (typeof this._pendingEventValidation[fieldName] == 'undefined') {
	    this._pendingEventValidation[fieldName] = debounce(function() {
	      delete this._pendingEventValidation[fieldName]
	      this._immediateFieldValidation(fieldName)
	    }.bind(this), delay)
	  }
	  this._pendingEventValidation[fieldName]()
	}

	/**
	 * Validates a field and notifies the React component that state has changed.
	 * @param {string} fieldName
	 */
	Form.prototype._immediateFieldValidation = function(fieldName) {
	  // Remove and cancel any pending validation for the field to avoid doubling up
	  // when both delayed and immediate validation are configured.
	  if (typeof this._pendingEventValidation[fieldName] != 'undefined') {
	    object.pop(this._pendingEventValidation, fieldName).cancel()
	  }
	  this._lastValidatedData[fieldName] =
	      this.fields[fieldName].widget.valueFromData(this.data, this.files,
	                                                  this.addPrefix(fieldName))
	  this.partialClean([fieldName])
	  this._stateChanged()
	}

	// ============================================================== Mutability ===

	/**
	 * Resets a form data back to its initial state, optionally providing new initial
	 * data.
	 * @param {Object.<string, *>=} newInitial new initial data for the form.
	 */
	Form.prototype.reset = function(newInitial) {
	  this._cancelPendingOperations()

	  if (typeof newInitial != 'undefined') {
	    this.initial = newInitial
	  }

	  this.data = {}
	  this.cleanedData = {}
	  this.isInitialRender = true

	  this._errors = null
	  this._lastHasChanged = null
	  this._pendingValidation = {}
	  this._runCleanAfter = {}
	  this._lastValidatedData = {}
	  this._onValidate = null

	  this._copyInitialToData()
	  this._stateChanged()
	}

	/**
	 * Sets the form's entire input data, also triggering validation by default.
	 * @param {object.<string,*>} data new input data for the form.
	 * @param {object.<string,boolean>} kwargs data setting options.
	 * @return {boolean|undefined} if data setting options indicate the new data
	 *   should be validated and the form does not have asynchronous validation
	 *   configured: true if the new data is valid.
	 */
	Form.prototype.setData = function(data, kwargs) {
	  kwargs = object.extend({
	    prefixed: false, validate: true, _triggerStateChange: true
	  }, kwargs)

	  this.data = (kwargs.prefixed ? data : this._prefixData(data))

	  if (this.isInitialRender) {
	    this.isInitialRender = false
	  }
	  if (kwargs.validate) {
	    this._errors = null
	    // This call ultimately triggers a fullClean() because _errors is null
	    var isValid = this.isValid()
	  }
	  else {
	    // Prevent validation being triggered if errors() is accessed during render
	    this._errors = new ErrorObject()
	  }

	  if (kwargs._triggerStateChange) {
	    this._stateChanged()
	  }

	  if (kwargs.validate && !this.isAsync()) {
	    return isValid
	  }
	}

	/**
	 * Sets the form's entire input data wth data extracted from a <form>, which
	 * will be prefixed, if prefixes are being used.
	 * @param {Object.<strong, *>} formData
	 * @param {Object.<string, boolean>} kwargs setData options.
	 */
	Form.prototype.setFormData = function(formData, kwargs) {
	  return this.setData(formData, object.extend(kwargs || {}, {prefixed: true}))
	}

	/**
	 * Updates some of the form's input data, optionally triggering validation of
	 * updated fields and form-wide cleaning, or clears existing errors from the
	 * updated fields.
	 * @param {Object.<string, *>} data updated input data for the form.
	 * @param {Object.<string, boolean>} kwargs update options.
	 */
	Form.prototype.updateData = function(data, kwargs) {
	  kwargs = object.extend({
	    prefixed: false, validate: true, clearValidation: true
	  }, kwargs)

	  object.extend(this.data, (kwargs.prefixed ? data : this._prefixData(data)))
	  if (this.isInitialRender) {
	    this.isInitialRender = false
	  }

	  var fields = Object.keys(data)
	  if (kwargs.prefixed) {
	    fields = fields.map(this.removePrefix.bind(this))
	  }

	  if (kwargs.validate) {
	    this.partialClean(fields)
	  }
	  else if (kwargs.clearValidation) {
	    this._removeErrors(fields)
	    this._removeCleanedData(fields)
	    this._cleanForm()
	  }

	  this._stateChanged()
	}

	/**
	 * Removes any cleanedData present for the given form fields.
	 * @param {Array.<string>} fields field names.
	 */
	Form.prototype._removeCleanedData = function(fields) {
	  for (var i = 0, l = fields.length; i < l; i++) {
	    delete this.cleanedData[fields[i]]
	  }
	}

	// ============================================================= BoundFields ===

	/**
	 * Creates a BoundField for the field with the given name.
	 * @param {string} name a field name.
	 * @return {BoundField} a BoundField for the field.
	 */
	Form.prototype.boundField = function(name) {
	  if (!object.hasOwn(this.fields, name)) {
	    throw new Error(this._formName() + " does not have a '" + name + "' field.")
	  }
	  return new BoundField(this, this.fields[name], name)
	}

	/**
	 * Creates a BoundField for each field in the form, in the order in which the
	 * fields were created.
	 * @param {function(Field, string)=} test if provided, this function will be
	 *   called with field and name arguments - BoundFields will only be generated
	 *   for fields for which true is returned.
	 * @return {Array.<BoundField>} a list of BoundField objects.
	 */
	Form.prototype.boundFields = function(test) {
	  var bfs = []
	  var fieldNames = Object.keys(this.fields)
	  for (var i = 0, l = fieldNames.length; i < l ; i++) {
	    var fieldName = fieldNames[i]
	    if (!test || test(this.fields[fieldName], fieldName)) {
	      bfs.push(new BoundField(this, this.fields[fieldName], fieldName))
	    }
	  }
	  return bfs
	}

	/**
	 * Like boundFields(), but returns a name -> BoundField object instead.
	 * @return {Object.<string, BoundField>}
	 */
	Form.prototype.boundFieldsObj = function() {
	  var bfs = {}
	  var fieldNames = Object.keys(this.fields)
	  for (var i = 0, l = fieldNames.length; i < l ; i++) {
	    var fieldName = fieldNames[i]
	    bfs[fieldName] = new BoundField(this, this.fields[fieldName], fieldName)
	  }
	  return bfs
	}

	/**
	 * Returns a list of all the BoundField objects that correspond to hidden
	 * fields. Useful for manual form layout.
	 * @return {Array.<BoundField>}
	 */
	Form.prototype.hiddenFields = function() {
	  return this.boundFields(function(field) {
	    return field.widget.isHidden
	  })
	}

	/**
	 * Returns a list of BoundField objects that do not correspond to hidden fields.
	 * The opposite of the hiddenFields() method.
	 * @return {Array.<BoundField>}
	 */
	Form.prototype.visibleFields = function() {
	  return this.boundFields(function(field) {
	    return !field.widget.isHidden
	  })
	}

	// ================================================================== Errors ===

	/**
	 * Updates the content of this._errors.
	 * The field argument is the name of the field to which the errors should be
	 * added. If its value is null the errors will be treated as NON_FIELD_ERRORS.
	 * The error argument can be a single error, a list of errors, or an object that
	 * maps field names to lists of errors. What we define as an "error" can be
	 * either a simple string or an instance of ValidationError with its message
	 * attribute set and what we define as list or object can be an actual list or
	 * object or an instance of ValidationError with its errorList or errorObj
	 * property set.
	 * If error is an object, the field argument *must* be null and errors will be
	 * added to the fields that correspond to the properties of the object.
	 * @param {?string} field the name of a form field.
	 * @param {(string|ValidationError|Array.<(string|ValidationError)>|Object<string,(string|ValidationError|Array.<(string|ValidationError)>))} error
	 */
	Form.prototype.addError = function(field, error) {
	  if (!(error instanceof ValidationError)) {
	    // Normalise to ValidationError and let its constructor do the hard work of
	    // making sense of the input.
	    error = ValidationError(error)
	  }

	  if (object.hasOwn(error, 'errorObj')) {
	    if (field !== null) {
	      throw new Error("The 'field' argument to form.addError() must be null when " +
	                      "the 'error' argument contains errors for multiple fields.")
	    }
	    error = error.errorObj
	  }
	  else {
	    var errorList = error.errorList
	    error = {}
	    error[field || NON_FIELD_ERRORS] = errorList
	  }

	  var fields = Object.keys(error)
	  for (var i = 0, l = fields.length; i < l; i++) {
	    field = fields[i]
	    errorList = error[field]
	    if (!this._errors.hasField(field)) {
	      if (field !== NON_FIELD_ERRORS && !object.hasOwn(this.fields, field)) {
	        throw new Error(this._formName() + " has no field named '" + field + "'")
	      }
	      this._errors.set(field, new this.errorConstructor())
	    }
	    else {
	      // Filter out any error messages which are duplicates of existing
	      // messages. This can happen if onChange validation which uses addError()
	      // is fired repeatedly and is adding an error message to a field other
	      // then the one being changed.
	      var messageLookup = object.lookup(this._errors.get(field).messages())
	      var newMessages = ErrorList(errorList).messages()
	      for (var j = errorList.length - 1; j >= 0; j--) {
	        if (messageLookup[newMessages[j]]) {
	          errorList.splice(j, 1)
	        }
	      }
	    }

	    if (errorList.length > 0) {
	      this._errors.get(field).extend(errorList)
	    }

	    if (object.hasOwn(this.cleanedData, field)) {
	      delete this.cleanedData[field]
	    }
	  }
	}

	/**
	 * Getter for errors, which first cleans the form if there are no errors
	 * defined yet.
	 * @param {string=} name if given, errors for this field name will be returned
	 *   instead of the full error object.
	 * @return {ErrorObject|ErrorList} form or field errors
	 */
	Form.prototype.errors = function(name) {
	  if (this._errors == null) {
	    this.fullClean()
	  }
	  if (name) {
	    return this._errors.get(name)
	  }
	  return this._errors
	}

	/**
	 * @return {ErrorObject} errors that aren't associated with a particular field -
	 *   i.e., errors generated by clean(). Will be empty if there are none.
	 */
	Form.prototype.nonFieldErrors = function() {
	  return (this.errors(NON_FIELD_ERRORS) || new this.errorConstructor())
	}

	/**
	 * @param {ErrorObject} errors
	 */
	Form.prototype.setErrors = function(errors) {
	  this._errors = errors
	  this._stateChanged()
	}

	/**
	 * Removes any validation errors present for the given form fields. If validation
	 * has not been performed yet, initialises the errors object.
	 * @param {Array.<string>} fields field names.
	 */
	Form.prototype._removeErrors = function(fields) {
	  if (this._errors == null) {
	    this._errors = ErrorObject()
	  }
	  else {
	    // TODO use clean.fields if available
	    this._errors.remove(NON_FIELD_ERRORS)
	    this._errors.removeAll(fields)
	  }
	}

	// ================================================================= Changes ===

	/**
	 * Determines which fields have changed from initial form data.
	 * @param {boolean=} _hasChangedCheck if true, the method is only being run to
	 *   determine if any fields have changed, not to get the list of fields.
	 * @return {Array.<string>|boolean} a list of changed field names or true if
	 *   only checking for changes and one is found.
	 */
	Form.prototype.changedData = function(_hasChangedCheck) {
	  var changedData = []
	  var initialValue
	  // XXX: For now we're asking the individual fields whether or not
	  // the data has changed. It would probably be more efficient to hash
	  // the initial data, store it in a hidden field, and compare a hash
	  // of the submitted data, but we'd need a way to easily get the
	  // string value for a given field. Right now, that logic is embedded
	  // in the render method of each field's widget.
	  var fieldNames = Object.keys(this.fields)
	  for (var i = 0, l = fieldNames.length; i < l ; i++) {
	    var name = fieldNames[i]
	    var field = this.fields[name]
	    var prefixedName = this.addPrefix(name)
	    var dataValue = field.widget.valueFromData(this.data, this.files, prefixedName)
	    if (!field.showHiddenInitial) {
	      initialValue = object.get(this.initial, name, field.initial)
	      if (is.Function(initialValue)) {
	        initialValue = initialValue()
	      }
	    }
	    else {
	      var initialPrefixedName = this.addInitialPrefix(name)
	      var hiddenWidget = new field.hiddenWidget()
	      try {
	        initialValue = hiddenWidget.valueFromData(
	                this.data, this.files, initialPrefixedName)
	      }
	      catch (e) {
	        if (!(e instanceof ValidationError)) { throw e }
	        // Always assume data has changed if validation fails
	        if (_hasChangedCheck) {
	          return true
	        }
	        changedData.push(name)
	        continue
	      }
	    }
	    if (field._hasChanged(initialValue, dataValue)) {
	      if (_hasChangedCheck) {
	        return true
	      }
	      changedData.push(name)
	    }
	  }
	  if (_hasChangedCheck) {
	    return false
	  }
	  return changedData
	}

	/**
	 * @return {boolean} true if input data differs from initial data.
	 */
	Form.prototype.hasChanged = function() {
	  this._lastHasChanged = this.changedData(true)
	  return this._lastHasChanged
	}

	// ================================================================== Status ===

	/**
	 * @return {boolean} true if the form needs a callback argument for final
	 *   validation.
	 */
	Form.prototype.isAsync = function() {
	  if (this.clean.length == 1) { return true }
	  var fieldNames = Object.keys(this.fields)
	  for (var i = 0, l = fieldNames.length; i < l ; i++) {
	    var customClean = this._getCustomClean(fieldNames[i])
	    if (is.Function(customClean) && customClean.length == 1) {
	      return true
	    }
	  }
	  return false
	}

	/**
	 * @return {boolean} true if all required fields have been completed.
	 */
	Form.prototype.isComplete = function() {
	  if (!this.isValid() || this.isPending()) {
	    return false
	  }
	  var fieldNames = Object.keys(this.fields)
	  for (var i = 0, l = fieldNames.length; i < l; i++) {
	    var fieldName = fieldNames[i]
	    if (this.fields[fieldName].required &&
	        typeof this.cleanedData[fieldName] == 'undefined') {
	      return false
	    }
	  }
	  return true
	}

	/**
	 * @return {boolean} true if the form needs to be multipart-encoded, in other
	 *   words, if it has a FileField.
	 */
	Form.prototype.isMultipart = function() {
	  var fieldNames = Object.keys(this.fields)
	  for (var i = 0, l = fieldNames.length; i < l ; i++) {
	    if (this.fields[fieldNames[i]].widget.needsMultipartForm) {
	      return true
	    }
	  }
	  return false
	}

	/**
	 * @return {boolean} true if the form is waiting for async validation to
	 *   complete.
	 */
	Form.prototype.isPending = function() {
	  return !is.Empty(this._pendingAsyncValidation)
	}

	/**
	 * @return {boolean} true if the form doesn't have any errors.
	 */
	Form.prototype.isValid = function() {
	  if (this.isInitialRender) {
	    return false
	  }
	  return !this.errors().isPopulated()
	}

	/**
	 * @return {boolean} true if the form is waiting for async validation of its
	 *   clean() method to complete.
	 */
	Form.prototype.nonFieldPending = function() {
	  return typeof this._pendingAsyncValidation[NON_FIELD_ERRORS] != 'undefined'
	}

	/**
	 * @return {boolean} true if this form is allowed to be empty and if input data
	 *   differs from initial data. This can be used to determine when required
	 *   fields in an extra FormSet form become truly required.
	 */
	Form.prototype.notEmpty = function() {
	  return (this.emptyPermitted && this._lastHasChanged === true)
	}

	// ================================================================ Prefixes ===

	/**
	 * Adds an initial prefix for checking dynamic initial values.
	 * @param {string} fieldName a field name.
	 * @return {string}
	 */
	Form.prototype.addInitialPrefix = function(fieldName) {
	  return 'initial-' + this.addPrefix(fieldName)
	}

	/**
	 * Prepends a prefix to a field name if this form has one set.
	 * @param {string} fieldName a form field name.
	 * @return {string} the field name with a prefix prepended if this form has a
	 *   prefix set, otherwise the field name as-is.
	 * @return {string}
	 */
	Form.prototype.addPrefix = function(fieldName) {
	  if (this.prefix !== null) {
	    return formatObj(this.prefixFormat, {prefix: this.prefix, name: fieldName})
	  }
	  return fieldName
	}

	/**
	 * Extracts a form field name from the name attribute of a rendered form input.
	 * @param {string} htmlName a name attribute from a rendered form input.
	 * @return {string}
	 */
	Form.prototype.removePrefix = function(htmlName) {
	  if (this.prefix !== null) {
	    var partialPrefix = this.prefixFormat.replace('{prefix}', this.prefix)
	    var startIndex = partialPrefix.indexOf('{name}')
	    var lengthDiff = htmlName.length - partialPrefix.length
	    return htmlName.substr(startIndex, /* length of {name} */ 6 + lengthDiff)
	  }
	  return htmlName
	}

	/**
	 * Creates a version of the given data object with prefixes removed from the
	 * property names if this form has a prefix, otherwise returns the object
	 * itself.
	 * @param {object.<string,*>} data
	 * @return {Object.<string,*>}
	 */
	Form.prototype._deprefixData = function(data) {
	  if (this.prefix == null) { return data }
	  var prefixedData = {}
	  var fieldNames = Object.keys(data)
	  for (var i = 0, l = fieldNames.length; i < l; i++) {
	    prefixedData[this.removePrefix(fieldNames[i])] = data[fieldNames[i]]
	  }
	  return prefixedData
	}

	/**
	 * Creates a version of the given data object with prefixes added to the
	 * property names if this form has a prefix, otherwise returns the object
	 * itself.
	 * @param {object.<string,*>} data
	 * @return {Object.<string,*>}
	 */
	Form.prototype._prefixData = function(data) {
	  if (this.prefix == null) { return data }
	  var prefixedData = {}
	  var fieldNames = Object.keys(data)
	  for (var i = 0, l = fieldNames.length; i < l; i++) {
	    prefixedData[this.addPrefix(fieldNames[i])] = data[fieldNames[i]]
	  }
	  return prefixedData
	}

	module.exports = Form
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 97 */
/***/ function(module, exports) {

	'use strict';

	var hasOwn = Object.prototype.hasOwnProperty
	var toString = Object.prototype.toString
	var type = function(obj) { return toString.call(obj).slice(8, -1).toLowerCase() }

	var primitiveWrapperTypes = {
	  boolean: true
	, number: true
	, string: true
	}

	var stringPropsRE = /^(?:\d+|length)$/

	/* This file is part of OWL JavaScript Utilities.

	OWL JavaScript Utilities is free software: you can redistribute it and/or
	modify it under the terms of the GNU Lesser General Public License
	as published by the Free Software Foundation, either version 3 of
	the License, or (at your option) any later version.

	OWL JavaScript Utilities is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.

	You should have received a copy of the GNU Lesser General Public
	License along with OWL JavaScript Utilities.  If not, see
	<http://www.gnu.org/licenses/>.
	*/

	// Re-usable constructor function used by clone()
	function Clone() {}

	// Clone objects, skip other types
	function clone(target) {
	  if (typeof target == 'object') {
	    Clone.prototype = target
	    return new Clone()
	  }
	  else {
	    return target
	  }
	}

	// Shallow Copy
	function copy(target) {
	  var c, property
	  if (typeof target != 'object') {
	    // Non-objects have value semantics, so target is already a copy
	    return target
	  }
	  else {
	    var value = target.valueOf()
	    if (target == value) {
	      // The object is a standard object wrapper for a native type, say String.
	      // we can make a copy by instantiating a new object around the value.
	      c = new target.constructor(value)
	      var notString = type(target) != 'string'

	      // Wrappers can have properties added to them
	      for (property in target) {
	        if (hasOwn.call(target, property) && (notString || !stringPropsRE.test(property))) {
	          c[property] = target[property]
	        }
	      }

	      return c
	    }
	    else {
	      // We have a normal object. If possible, we'll clone the original's
	      // prototype (not the original) to get an empty object with the same
	      // prototype chain as the original. If just copy the instance properties.
	      // Otherwise, we have to copy the whole thing, property-by-property.
	      if (target instanceof target.constructor && target.constructor !== Object) {
	        c = clone(target.constructor.prototype)

	        // Give the copy all the instance properties of target. It has the same
	        // prototype as target, so inherited properties are already there.
	        for (property in target) {
	          if (hasOwn.call(target, property)) {
	            c[property] = target[property]
	          }
	        }
	      }
	      else {
	        c = {}
	        for (property in target) {
	          c[property] = target[property]
	        }
	      }

	      return c
	    }
	  }
	}

	// Deep Copy
	var deepCopiers = []

	function DeepCopier(config) {
	  for (var key in config) {
	    this[key] = config[key]
	  }
	}

	DeepCopier.prototype = {
	  constructor: DeepCopier

	  // Determines if this DeepCopier can handle the given object.
	, canCopy: function(source) { return false }

	  // Starts the deep copying process by creating the copy object. You can
	  // initialize any properties you want, but you can't call recursively into the
	  // DeepCopyAlgorithm.
	, create: function(source) {}

	  // Completes the deep copy of the source object by populating any properties
	  // that need to be recursively deep copied. You can do this by using the
	  // provided deepCopyAlgorithm instance's deepCopy() method. This will handle
	  // cyclic references for objects already deepCopied, including the source
	  // object itself. The "result" passed in is the object returned from create().
	, populate: function(deepCopyAlgorithm, source, result) {}
	}

	function DeepCopyAlgorithm() {
	  // copiedObjects keeps track of objects already copied by this deepCopy
	  // operation, so we can correctly handle cyclic references.
	  this.copiedObjects = []
	  var thisPass = this
	  this.recursiveDeepCopy = function(source) {
	    return thisPass.deepCopy(source)
	  }
	  this.depth = 0
	}
	DeepCopyAlgorithm.prototype = {
	  constructor: DeepCopyAlgorithm

	, maxDepth: 256

	  // Add an object to the cache.  No attempt is made to filter duplicates; we
	  // always check getCachedResult() before calling it.
	, cacheResult: function(source, result) {
	    this.copiedObjects.push([source, result])
	  }

	  // Returns the cached copy of a given object, or undefined if it's an object
	  // we haven't seen before.
	, getCachedResult: function(source) {
	    var copiedObjects = this.copiedObjects
	    var length = copiedObjects.length
	    for ( var i=0; i<length; i++ ) {
	      if ( copiedObjects[i][0] === source ) {
	        return copiedObjects[i][1]
	      }
	    }
	    return undefined
	  }

	  // deepCopy handles the simple cases itself: non-objects and object's we've
	  // seen before. For complex cases, it first identifies an appropriate
	  // DeepCopier, then calls applyDeepCopier() to delegate the details of copying
	  // the object to that DeepCopier.
	, deepCopy: function(source) {
	    // null is a special case: it's the only value of type 'object' without
	    // properties.
	    if (source === null) { return null }

	    // All non-objects use value semantics and don't need explict copying
	    if (typeof source != 'object') { return source }

	    var cachedResult = this.getCachedResult(source)

	    // We've already seen this object during this deep copy operation so can
	    // immediately return the result. This preserves the cyclic reference
	    // structure and protects us from infinite recursion.
	    if (cachedResult) { return cachedResult }

	    // Objects may need special handling depending on their class. There is a
	    // class of handlers call "DeepCopiers" that know how to copy certain
	    // objects. There is also a final, generic deep copier that can handle any
	    // object.
	    for (var i=0; i<deepCopiers.length; i++) {
	      var deepCopier = deepCopiers[i]
	      if (deepCopier.canCopy(source)) {
	        return this.applyDeepCopier(deepCopier, source)
	      }
	    }
	    // The generic copier can handle anything, so we should never reach this
	    // line.
	    throw new Error('no DeepCopier is able to copy ' + source)
	  }

	  // Once we've identified which DeepCopier to use, we need to call it in a
	  // very particular order: create, cache, populate.This is the key to detecting
	  // cycles. We also keep track of recursion depth when calling the potentially
	  // recursive populate(): this is a fail-fast to prevent an infinite loop from
	  // consuming all available memory and crashing or slowing down the browser.
	, applyDeepCopier: function(deepCopier, source) {
	    // Start by creating a stub object that represents the copy.
	    var result = deepCopier.create(source)

	    // We now know the deep copy of source should always be result, so if we
	    // encounter source again during this deep copy we can immediately use
	    // result instead of descending into it recursively.
	    this.cacheResult(source, result)

	    // Only DeepCopier.populate() can recursively deep copy. So, to keep track
	    // of recursion depth, we increment this shared counter before calling it,
	    // and decrement it afterwards.
	    this.depth++
	    if (this.depth > this.maxDepth) {
	      throw new Error("Exceeded max recursion depth in deep copy.")
	    }

	    // It's now safe to let the deepCopier recursively deep copy its properties
	    deepCopier.populate(this.recursiveDeepCopy, source, result)

	    this.depth--

	    return result
	  }
	}

	// Entry point for deep copy.
	//   source is the object to be deep copied.
	//   maxDepth is an optional recursion limit. Defaults to 256.
	function deepCopy(source, maxDepth) {
	  var deepCopyAlgorithm = new DeepCopyAlgorithm()
	  if (maxDepth) {
	    deepCopyAlgorithm.maxDepth = maxDepth
	  }
	  return deepCopyAlgorithm.deepCopy(source)
	}

	// Publicly expose the DeepCopier class
	deepCopy.DeepCopier = DeepCopier

	// Publicly expose the list of deepCopiers
	deepCopy.deepCopiers = deepCopiers

	// Make deepCopy() extensible by allowing others to register their own custom
	// DeepCopiers.
	deepCopy.register = function(deepCopier) {
	  if (!(deepCopier instanceof DeepCopier)) {
	    deepCopier = new DeepCopier(deepCopier)
	  }
	  deepCopiers.unshift(deepCopier)
	}

	// Generic Object copier
	// The ultimate fallback DeepCopier, which tries to handle the generic case.
	// This should work for base Objects and many user-defined classes.
	deepCopy.register({
	  canCopy: function(source) { return true }

	, create: function(source) {
	    if (source instanceof source.constructor) {
	      return clone(source.constructor.prototype)
	    }
	    else {
	      return {}
	    }
	  }

	, populate: function(deepCopy, source, result) {
	    for (var key in source) {
	      if (hasOwn.call(source, key)) {
	        result[key] = deepCopy(source[key])
	      }
	    }
	    return result
	  }
	})

	// Standard primitive wrapper copier
	deepCopy.register({
	  canCopy: function(source) {
	    return primitiveWrapperTypes[type(source)]
	  }

	, create: function(source) {
	    return new source.constructor(source.valueOf())
	  }

	, populate: function(deepCopy, source, result) {
	    var notString = type(source) != 'string'
	    for (var key in source) {
	      if (hasOwn.call(source, key) && (notString || !stringPropsRE.test(key))) {
	        result[key] = deepCopy(source[key])
	      }
	    }
	    return result
	  }
	})

	// RegExp copier
	deepCopy.register({
	  canCopy: function(source) {
	    return type(source) == 'regexp'
	  }

	, create: function(source) {
	    return source
	  }


	})

	// Date copier
	deepCopy.register({
	  canCopy: function(source) {
	    return type(source) == 'date'
	  }

	, create: function(source) {
	    return new Date(source)
	  }
	})

	// Array copier
	deepCopy.register({
	  canCopy: function(source) {
	    return type(source) == 'array'
	  }

	, create: function(source) {
	    return new source.constructor()
	  }

	, populate: function(deepCopy, source, result) {
	    for (var i = 0; i < source.length; i++) {
	      result.push(deepCopy(source[i]))
	    }
	    return result
	  }
	})

	module.exports = {
	  DeepCopyAlgorithm: DeepCopyAlgorithm
	, copy: copy
	, clone: clone
	, deepCopy: deepCopy
	}


/***/ },
/* 98 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  /** Default maximum number of forms in a formset, to prevent memory exhaustion. */
	  FORMSET_DEFAULT_MAX_NUM: 1000
	  /** Default minimum number of forms in a formset. */
	, FORMSET_DEFAULT_MIN_NUM: 0
	  /** Property under which non-field-specific errors are stored. */
	, NON_FIELD_ERRORS: '__all__'
	}

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)
	var object = __webpack_require__(6)

	var Field = __webpack_require__(20)

	// TODO Support declaring propTypes when extending forms - merge them in here

	/**
	 * Meta function for handling declarative fields and inheriting fields from
	 * forms further up the inheritance chain or being explicitly mixed-in, which
	 * sets up baseFields and declaredFields on a new Form constructor's prototype.
	 * @param {Object.<string,*>} prototypeProps
	 */
	function DeclarativeFieldsMeta(prototypeProps) {
	  // Pop Fields instances from prototypeProps to build up the new form's own
	  // declaredFields.
	  var fields = []
	  Object.keys(prototypeProps).forEach(function(name) {
	    if (prototypeProps[name] instanceof Field) {
	      fields.push([name, prototypeProps[name]])
	      delete prototypeProps[name]
	    }
	  })
	  fields.sort(function(a, b) {
	    return a[1].creationCounter - b[1].creationCounter
	  })
	  prototypeProps.declaredFields = object.fromItems(fields)

	  // Build up final declaredFields from the form being extended, forms being
	  // mixed in and the new form's own declaredFields, in that order of
	  // precedence.
	  var declaredFields = {}

	  // If we're extending another form, we don't need to check for shadowed
	  // fields, as it's at the bottom of the pile for inheriting declaredFields.
	  if (object.hasOwn(this, 'declaredFields')) {
	    object.extend(declaredFields, this.declaredFields)
	  }

	  // If any mixins which look like Form constructors were given, inherit their
	  // declaredFields and check for shadowed fields.
	  if (object.hasOwn(prototypeProps, '__mixins__')) {
	    var mixins = prototypeProps.__mixins__
	    if (!is.Array(mixins)) { mixins = [mixins] }
	    // Process mixins from left-to-right, the same precedence they'll get for
	    // having their prototype properties mixed in.
	    for (var i = 0, l = mixins.length; i < l; i++) {
	      var mixin = mixins[i]
	      if (is.Function(mixin) && object.hasOwn(mixin.prototype, 'declaredFields')) {
	        // Extend mixed-in declaredFields over the top of what's already there,
	        // then delete any fields which have been shadowed by a non-Field
	        // property in its prototype.
	        object.extend(declaredFields, mixin.prototype.declaredFields)
	        Object.keys(mixin.prototype).forEach(function(name) {
	          if (object.hasOwn(declaredFields, name)) {
	            delete declaredFields[name]
	          }
	        })
	        // To avoid overwriting the new form's baseFields, declaredFields or
	        // constructor when the rest of the mixin's prototype is mixed-in by
	        // Concur, replace the mixin with an object containing only its other
	        // prototype properties.
	        var mixinPrototype = object.extend({}, mixin.prototype)
	        delete mixinPrototype.baseFields
	        delete mixinPrototype.declaredFields
	        delete mixinPrototype.constructor
	        mixins[i] = mixinPrototype
	      }
	    }
	    // We may have wrapped a single mixin in an Array - assign it back to the
	    // new form's prototype for processing by Concur.
	    prototypeProps.__mixins__ = mixins
	  }

	  // Finally - extend the new form's own declaredFields over the top of
	  // declaredFields being inherited, then delete any fields which have been
	  // shadowed by a non-Field property in its prototype.
	  object.extend(declaredFields, prototypeProps.declaredFields)
	  Object.keys(prototypeProps).forEach(function(name) {
	    if (object.hasOwn(declaredFields, name)) {
	      delete declaredFields[name]
	    }
	  })

	  prototypeProps.baseFields = declaredFields
	  prototypeProps.declaredFields = declaredFields

	  // If a clean method is specified as [field1, field2, ..., cleanFunction],
	  // replace it with the clean function and attach the field names to the
	  // function.
	  if (object.hasOwn(prototypeProps, 'clean') && is.Array(prototypeProps.clean)) {
	    var clean = prototypeProps.clean.pop()
	    clean.fields = object.lookup(prototypeProps.clean)
	    prototypeProps.clean = clean
	  }
	}

	module.exports = DeclarativeFieldsMeta

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)

	var env = __webpack_require__(68)

	var Field = __webpack_require__(20)
	var FileInput = __webpack_require__(79)
	var FileField = __webpack_require__(93)

	var $__0=  __webpack_require__(2),ValidationError=$__0.ValidationError

	/**
	 * Validates that its input is a list of valid files.
	 * @constructor
	 * @extends {FileField}
	 * @param {Object=} kwargs
	 */
	var MultipleFileField = FileField.extend({
	  widget: FileInput,

	  defaultErrorMessages: {
	    invalid: 'No files were submitted. Check the encoding type on the form.',
	    missing: 'No files were submitted.',
	    empty: '{name} is empty.',
	    maxLength: 'Ensure filenames have at most {max} characters ({name} has {length}).'
	  },

	  constructor: function MultipleFileField(kwargs) {
	    if (!(this instanceof MultipleFileField)) { return new MultipleFileField(kwargs) }
	    FileField.call(this, kwargs)
	  }
	})

	MultipleFileField.prototype.getWidgetAttrs = function(widget) {
	  var attrs = FileField.prototype.getWidgetAttrs.call(this, widget)
	  attrs.multiple = true
	  return attrs
	}

	MultipleFileField.prototype.toJavaScript = function(data, initial) {
	  if (this.isEmptyValue(data)) {
	    return []
	  }

	  // If the browser doesn't support File objects, we can't do anything more
	  if (env.browser && is.String(data)) {
	    return data
	  }

	  for (var i = 0, l = data.length; i < l; i++) {
	    var file = data[i]

	    // File objects should have name and size attributes
	    if (typeof file.name == 'undefined' || typeof file.size == 'undefined') {
	      throw ValidationError(this.errorMessages.invalid, {code: 'invalid'})
	    }

	    var name = file.name
	    var size = Number(file.size)

	    if (this.maxLength !== null && name.length > this.maxLength) {
	      throw ValidationError(this.errorMessages.maxLength, {
	        code: 'maxLength',
	        params: {max: this.maxLength, name:name, length: name.length}
	      })
	    }
	    if (!name) {
	      throw ValidationError(this.errorMessages.invalid, {code: 'invalid'})
	    }
	    if (!this.allowEmptyFile && size === 0) {
	      throw ValidationError(this.errorMessages.empty, {
	        code: 'empty',
	        params: {name:name}
	      })
	    }
	  }

	  return data
	}

	MultipleFileField.prototype.clean = function(data, initial) {
	  if (this.isEmptyValue(data) && !this.isEmptyValue(initial)) {
	    return initial
	  }
	  return Field.prototype.clean.call(this, data)
	}

	MultipleFileField.prototype.validate = function(value) {
	  if (this.required && !value.length) {
	    throw ValidationError(this.errorMessages.required, {code: 'required'})
	  }
	}

	MultipleFileField.prototype._hasChanged = function(initial, data) {
	  return !this.isEmptyValue(data)
	}

	module.exports = MultipleFileField

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(23)

	var BoundField = __webpack_require__(64)
	var ProgressMixin = __webpack_require__(102)

	/**
	 * Renders a "row" in a form. This can contain manually provided contents, or
	 * if a BoundField is given, it will be used to display a field's label, widget,
	 * error message(s), help text and async pending indicator.
	 */
	var FormRow = React.createClass({displayName: "FormRow",
	  mixins: [ProgressMixin],
	  propTypes: {
	    bf: React.PropTypes.instanceOf(BoundField)
	  , className: React.PropTypes.string
	  , component: React.PropTypes.any
	  , content: React.PropTypes.any
	  , hidden: React.PropTypes.bool
	  , __all__:function(props) {
	      if (!props.bf && !props.content) {
	        return new Error(
	          'Invalid props supplied to `FormRow`, either `bf` or `content` ' +
	          'must be specified.'
	        )
	      }
	      if (props.bf && props.content) {
	        return new Error(
	          'Both `bf` and `content` props were passed to `FormRow` - `bf` ' +
	          'will be ignored.'
	        )
	      }
	    }
	  },

	  getDefaultProps:function() {
	    return {
	      component: 'div'
	    }
	  },

	  render:function() {
	    var attrs = {}
	    if (this.props.className) {
	      attrs.className = this.props.className
	    }
	    if (this.props.hidden) {
	      attrs.style = {display: 'none'}
	    }
	    // If content was given, use it
	    if (this.props.content) {
	      return React.createElement(this.props.component, React.__spread({},  attrs), this.props.content)
	    }
	    // Otherwise render a BoundField
	    var bf = this.props.bf
	    var isPending = bf.isPending()
	    return React.createElement(this.props.component, React.__spread({},  attrs), 
	      bf.label && bf.labelTag(), " ", bf.render(), 
	      isPending && ' ', 
	      isPending && this.renderProgress(), 
	      bf.errors().render(), 
	      bf.helpText && ' ', 
	      bf.helpTextTag()
	    )
	  }
	})

	module.exports = FormRow

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)
	var React = __webpack_require__(23)

	var ProgressMixin = {
	  propTypes: {
	    progress: React.PropTypes.any // Component or function to render async progress
	  },

	  renderProgress:function() {
	    if (!this.props.progress) {
	      return React.createElement("progress", null, "Validating...")
	    }
	    if (is.Function(this.props.progress)) {
	      return this.props.progress()
	    }
	    return React.createElement(this.props.progress, null)
	  }
	}

	module.exports = ProgressMixin

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var Concur = __webpack_require__(4)
	var getFormData = __webpack_require__(17)
	var is = __webpack_require__(5)
	var $__0=  __webpack_require__(11),formatObj=$__0.formatObj
	var object = __webpack_require__(6)

	var constants = __webpack_require__(98)
	var env = __webpack_require__(68)

	var BooleanField = __webpack_require__(62)
	var ErrorList = __webpack_require__(91)
	var Form = __webpack_require__(96)
	var HiddenInput = __webpack_require__(21)
	var IntegerField = __webpack_require__(87)
	var isFormAsync = __webpack_require__(104)

	var $__1=  __webpack_require__(2),ValidationError=$__1.ValidationError
	var $__2=  __webpack_require__(15),cancellable=$__2.cancellable

	function noop() {}

	// Name associated with clean() validation
	var CLEAN_VALIDATION = 'clean'

	// Special field names
	var DELETION_FIELD_NAME = 'DELETE'
	var INITIAL_FORM_COUNT = 'INITIAL_FORMS'
	var MAX_NUM_FORM_COUNT = 'MAX_NUM_FORMS'
	var MIN_NUM_FORM_COUNT = 'MIN_NUM_FORMS'
	var ORDERING_FIELD_NAME = 'ORDER'
	var TOTAL_FORM_COUNT = 'TOTAL_FORMS'

	// Default minimum number of forms in a formset
	var DEFAULT_MIN_NUM = constants.FORMSET_DEFAULT_MIN_NUM

	// Default maximum number of forms in a formset, to prevent memory exhaustion
	var DEFAULT_MAX_NUM = constants.FORMSET_DEFAULT_MAX_NUM

	/**
	 * ManagementForm is used to keep track of how many form instances are displayed
	 * on the page. If adding new forms via JavaScript, you should increment the
	 * count field of this form as well.
	 * @constructor
	 */
	var ManagementForm = (function() {
	  var fields = {}
	  fields[TOTAL_FORM_COUNT] = IntegerField({widget: HiddenInput})
	  fields[INITIAL_FORM_COUNT] = IntegerField({widget: HiddenInput})
	  // MIN_NUM_FORM_COUNT and MAX_NUM_FORM_COUNT are output with the rest of
	  // the management form, but only for the convenience of client-side
	  // code. The POST value of them returned from the client is not checked.
	  fields[MIN_NUM_FORM_COUNT] = IntegerField({required: false, widget: HiddenInput})
	  fields[MAX_NUM_FORM_COUNT] = IntegerField({required: false, widget: HiddenInput})
	  return Form.extend(fields)
	})()

	/**
	 * A collection of instances of the same Form.
	 * @constructor
	 * @param {Object=} kwargs
	 */
	var FormSet = Concur.extend({
	  prefixFormat: '{prefix}-{index}',

	  constructor: function FormSet(kwargs) {
	    // TODO Perform PropType checks on kwargs in development mode
	    kwargs = object.extend({
	      // Formset options
	      form: this.form || null, extra: is.Number(this.extra) ? this.extra : 1,
	      canOrder: this.canOrder || false, canDelete: this.canDelete || false,
	      maxNum: is.Number(this.maxNum) ? this.maxNum : DEFAULT_MAX_NUM,
	      validateMax: this.validateMax || false,
	      minNum: is.Number(this.minNum) ? this.minNum : DEFAULT_MIN_NUM,
	      validateMin: this.validateMin || false,
	      managementFormCssClass: this.magagementFormCssClass || null,
	      // Form options
	      data: null, files: null, autoId: 'id_{name}', prefix: null,
	      initial: null, errorConstructor: ErrorList, validation: null,
	      controlled: false, onChange: null
	    }, kwargs)

	    if (!is.Function(kwargs.form)) {
	      throw new Error(
	        'A FormSet must be given a Form constructor to use, either via its ' +
	        'constructor\'s `form` option or via its prototype, passing a `form` ' +
	        'property to `FormSet.extend()`.'
	      )
	    }

	    this.form = kwargs.form
	    this.extra = kwargs.extra + kwargs.minNum
	    this.canOrder = kwargs.canOrder
	    this.canDelete = kwargs.canDelete
	    this.maxNum = kwargs.maxNum
	    this.validateMax = kwargs.validateMax
	    this.minNum = kwargs.minNum
	    this.validateMin = kwargs.validateMin
	    // Hard limit on forms instantiated, to prevent memory-exhaustion attacks
	    // limit is simply maxNum + DEFAULT_MAX_NUM (which is 2 * DEFAULT_MAX_NUM
	    // if maxNum is not provided in the first place)
	    this.absoluteMax = kwargs.maxNum + DEFAULT_MAX_NUM

	    this.isInitialRender = (kwargs.data === null && kwargs.files === null)
	    this.prefix = kwargs.prefix || this.getDefaultPrefix()
	    this.autoId = kwargs.autoId
	    this.data = kwargs.data || {}
	    this.files = kwargs.files || {}
	    this.initial = kwargs.initial
	    this.errorConstructor = kwargs.errorConstructor
	    this.managementFormCssClass = kwargs.managementFormCssClass
	    this.validation = kwargs.validation
	    this.controlled = kwargs.controlled
	    this.onChange = kwargs.onChange

	    this._forms = null
	    this._errors = null
	    this._nonFormErrors = null

	    // Lookup for pending validation
	    this._pendingValidation = {}
	    // Cancellable callbacks for pending async validation
	    this._pendingAsyncValidation = {}
	    // Lookup for pending validation which formset cleaning depends on
	    this._cleanFormsetAfter = {}
	    // Callback to be run the next time validation finishes
	    this._onValidate = null
	  }
	})

	/**
	 * Tries to construct a display name for the formset for display in messages.
	 * @return {string}
	 */
	FormSet.prototype._formsetName = function() {
	  var name = this.displayName || this.constructor.name
	  return (name ? "'" + name + "'" : 'FormSet')
	}

	/**
	 * Calls the onChange function if it's been provided. This method will be called
	 * every time the formset makes a change to its state which requires redisplay.
	 */
	FormSet.prototype._stateChanged = function() {
	  if (typeof this.onChange == 'function') {
	    this.onChange()
	  }
	}

	// ============================================================== Validation ===

	/**
	 * Forces the formset to revalidate from scratch. If a <form> is given, data
	 * from it will be set on this formset's forms first. Otherwise, validation will
	 * be done with current input data.
	 * @param {(ReactElement|HTMLFormElement)=} form the <form> containing this
	 *   formset's rendered widgets - this can be a React <form> component or a real
	 *   <form> DOM node.
	 * @param {function(err, isValid, cleanedData)=} cb callback for asynchronous
	 *   validation.
	 * @return {boolean|undefined} true if the form only has synchronous validation
	 *   and is valid.
	 * @throws if the formset or its form has asynchronous validation and a callback
	 *   is not provided.
	 */
	FormSet.prototype.validate = function(form, cb) {
	  this._cancelPendingOperations()
	  if (is.Function(form)) {
	    cb = form
	    form = null
	  }
	  if (form) {
	    if (typeof form.getDOMNode == 'function') {
	      form = form.getDOMNode()
	    }
	    this.setData(getFormData(form), {
	      validate: false
	    , _triggerStateChange: false
	    })
	  }
	  return (this.isAsync() ? this._validateAsync(cb) : this._validateSync())
	}

	FormSet.prototype._validateAsync = function(cb) {
	  if (!is.Function(cb)) {
	    throw new Error(
	      'You must provide a callback to validate() when a formset or its form ' +
	      'has asynchronous validation.'
	    )
	  }
	  if (this.isInitialRender) {
	    this.isInitialRender = false
	  }
	  this._onValidate = cb
	  this.fullClean()
	  // Update state to display async progress indicators
	  this._stateChanged()
	}

	FormSet.prototype._validateSync = function() {
	  if (this.isInitialRender) {
	    this.isInitialRender = false
	  }
	  this.fullClean()
	  // Display changes to valid/invalid state
	  this._stateChanged()
	  return this.isValid()
	}

	/**
	 * Cleans all of this.data and populates this._errors and this._nonFormErrors.
	 */
	FormSet.prototype.fullClean = function() {
	  this._errors = []
	  this._nonFormErrors = new this.errorConstructor()

	  if (this.isInitialRender) {
	    return // Stop further processing
	  }

	  this._cleanForms()
	}

	/**
	 * Validates and cleans every form in the formset.
	 */
	FormSet.prototype._cleanForms = function() {
	  var forms = this.forms()
	  var formIndexLookup = object.lookup(Object.keys(forms))
	  object.extend(this._pendingValidation, formIndexLookup)
	  object.extend(this._cleanFormsetAfter, formIndexLookup)
	  for (var i = 0, l = forms.length; i < l; i++) {
	    this._cleanForm(i, forms[i])
	  }
	  // Make sure clean gets called even if the formset is empty
	  if (forms.length === 0) {
	    this._cleanFormsetAfter.empty = true
	    this._formCleaned('empty', null)
	  }
	}

	/**
	 * Validates and cleans the form at the given index.
	 * @param {number} index the index of the form in the formset.
	 * @param {Form} form
	 */
	FormSet.prototype._cleanForm = function(index, form) {
	  if (!form.isAsync()) {
	    form.validate()
	    this._errors[index] = form.errors()
	    this._formCleaned(index, null)
	    return
	  }

	  // If the form is async and there's one pending, prevent its callback from
	  // doing anything.
	  if (typeof this._pendingAsyncValidation[index] != 'undefined') {
	    object.pop(this._pendingAsyncValidation, index).cancel()
	  }
	  // Set up callback for async processing
	  var callback = function(err) {
	    if (!err) {
	      this._errors[index] = form.errors()
	    }
	    this._formCleaned(index, err)
	    this._stateChanged()
	  }.bind(this)
	  callback.onCancel = function() {
	    form._cancelPendingOperations()
	  }
	  this._pendingAsyncValidation[index] = cancellable(callback)
	  form.validate(callback)
	}

	/**
	 * Callback for completion of form cleaning. Triggers formset cleaning or
	 * signals the end of validation, as necessary.
	 * @param {number|string} name the name associated with the cleaning that's completed.
	 * @param {Error=} err an error caught while cleaning.
	 */
	FormSet.prototype._formCleaned = function(name, err) {
	  delete this._pendingValidation[name]
	  if (this._pendingAsyncValidation[name]) {
	    delete this._pendingAsyncValidation[name]
	  }

	  if (err) {
	    if ("production" !== process.env.NODE_ENV) {
	      console.error('Error cleaning formset[' + name + ']:' + err.message)
	    }
	    // Stop tracking validation progress on error, and don't call clean()
	    this._pendingValidation = {}
	    this._cleanFormsetAfter = {}
	    this._finishedValidation(err)
	    return
	  }

	  // Run clean() if this this was the last field it was waiting for
	  if (this._cleanFormsetAfter[name]) {
	    delete this._cleanFormsetAfter[name]
	    if (is.Empty(this._cleanFormsetAfter)) {
	      this._cleanFormset()
	      return
	    }
	  }

	  // Signal the end of validation if this was the last field we were waiting for
	  if (name == CLEAN_VALIDATION) {
	    this._finishedValidation(null)
	  }
	}

	/**
	 * Hook for doing any extra formset-wide cleaning after Form.clean() has been
	 * called on every form. Any ValidationError raised by this method will not be
	 * associated with a particular form; it will be accessible via
	 * formset.nonFormErrors()
	 */
	FormSet.prototype.clean = noop

	/**
	 * Validates the number of forms and calls the clean() hook.
	 */
	FormSet.prototype._cleanFormset = function() {
	  var async = false
	  var error = null
	  try {
	    var totalFormCount = this.totalFormCount()
	    var deletedFormCount = this.deletedForms().length
	    if ((this.validateMax && totalFormCount - deletedFormCount > this.maxNum) ||
	        (!env.browser && this.managementForm().cleanedData[TOTAL_FORM_COUNT] > this.absoluteMax)) {
	      throw ValidationError('Please submit ' + this.maxNum + ' or fewer forms.',
	                            {code: 'tooManyForms'})
	    }
	    if (this.validateMin && totalFormCount - deletedFormCount < this.minNum) {
	      throw ValidationError('Please submit ' + this.minNum + ' or more forms.',
	                            {code: 'tooFewForms'})
	    }
	    // Give this.clean() a chance to do cross-form validation.
	    if (this.clean !== noop) {
	      async = this._runCustomClean(CLEAN_VALIDATION, this.clean)
	    }
	  }
	  catch (e) {
	    if (e instanceof ValidationError) {
	      this._nonFormErrors = new this.errorConstructor(e.messages())
	    }
	    else {
	      error = e
	    }
	  }

	  if (!async) {
	    this._formCleaned(CLEAN_VALIDATION, error)
	  }
	}

	/**
	 * Calls a custom cleaning method, expecting synchronous or asynchronous
	 * behaviour, depending on its arity.
	 * @param {string} name a name to associate with the cleaning method.
	 * @param {function} customClean
	 * @return {boolean} true if cleaning is running asynchronously, false if it just
	 *   ran synchronously.
	 */
	FormSet.prototype._runCustomClean = function(name, customClean) {
	  // Check arity to see if we have a callback in the function signature
	  if (customClean.length === 0) {
	    // Synchronous processing only expected
	    customClean.call(this)
	    return false
	  }

	  // If custom validation is async and there's one pending, prevent its
	  // callback from doing anything.
	  if (typeof this._pendingAsyncValidation[name] != 'undefined') {
	    object.pop(this._pendingAsyncValidation, name).cancel()
	  }
	  // Set up callback for async processing - arguments for addError()
	  // should be passed via the callback as calling it directly prevents us
	  // from completely ignoring the callback if validation fires again.
	  var callback = function(err, validationError) {
	    if (typeof validationError != 'undefined') {
	      this.addError(validationError)
	    }
	    this._formCleaned(name, err)
	    this._stateChanged()
	  }.bind(this)

	  // An explicit return value of false indicates that async processing is
	  // being skipped (e.g. because sync checks in the method failed first)
	  var returnValue = customClean.call(this, callback)
	  if (returnValue !== false) {
	    // Async processing is happening! Make the callback cancellable and
	    // hook up any custom onCancel handling provided.
	    if (returnValue && typeof returnValue.onCancel == 'function') {
	      callback.onCancel = returnValue.onCancel
	    }
	    this._pendingAsyncValidation[name] = cancellable(callback)
	    return true
	  }
	}

	FormSet.prototype._finishedValidation = function(err) {
	  if (!this.isAsync()) {
	    if (err) {
	      throw err
	    }
	    // Synchronous formset validation results will be returned via the original
	    // call which triggered validation.
	    return
	  }
	  if (is.Function(this._onValidate)) {
	    var callback = this._onValidate
	    this._onValidate = null
	    if (err) {
	      return callback(err)
	    }
	    var isValid = this.isValid()
	    callback(null, isValid, isValid ? this.cleanedData() : null)
	  }
	}

	/**
	 * Cancels any pending async validations.
	 */
	FormSet.prototype._cancelPendingOperations = function() {
	  Object.keys(this._pendingAsyncValidation).forEach(function(field) {
	    object.pop(this._pendingAsyncValidation, field).cancel()
	  }.bind(this))
	}

	/**
	 * Returns a list of form.cleanedData objects for every form in this.forms().
	 */
	FormSet.prototype.cleanedData = function() {
	  var forms = this.initialForms()
	  // Don't include empty or incomplete extra forms
	  forms.push.apply(forms, this.extraForms().filter(function(form) {
	    return form.hasChanged() && form.isComplete()
	  }))
	  return forms.map(function(form) { return form.cleanedData })
	}


	// ============================================================== Mutability ===

	/**
	 * Sets the formset's entire input data, also triggering validation by default.
	 * @param {Object.<string,*>} data new input data for forms, which must be
	 *   prefixed for uniqueness.
	 * @param {Object.<string,boolean>} kwargs data setting options.
	 * @return {boolean} if date setting options indicate the new data should be
	 *   validated, true if the new data is valid.
	 */
	FormSet.prototype.setData = function(data, kwargs) {
	  kwargs = object.extend({validate: true, _triggerStateChange: true}, kwargs)

	  this.data = data
	  var formDataSettingOptions = {
	    prefixed: true, validate: kwargs.validate, _triggerStateChange: false
	  }
	  this.forms().forEach(function(form) {
	    form.setData(data, formDataSettingOptions)
	  })

	  if (this.isInitialRender) {
	    this.isInitialRender = false
	  }
	  if (kwargs.validate) {
	    this._errors = null
	    // This call ultimately triggers a fullClean() because _errors is null
	    var isValid = this.isValid()
	  }
	  else {
	    // Prevent validation being triggered if errors() is accessed during render
	    this._errors = []
	    this._nonFormErrors = new this.errorConstructor()
	  }

	  if (kwargs._triggerStateChange) {
	    this._stateChanged()
	  }

	  if (kwargs.validate) {
	    return isValid
	  }
	}

	/**
	 * Alias to keep the FormSet data setting API the same as Form's.
	 */
	FormSet.prototype.setFormData = FormSet.prototype.setData

	// =================================================================== Forms ===

	/**
	 * Returns the ManagementForm instance for this FormSet.
	 * @browser the form is unbound and uses initial data from this FormSet.
	 * @server the form is bound to submitted data.
	 */
	FormSet.prototype.managementForm = function() {
	  var form
	  if (!env.browser && !this.isInitialRender) {
	    form = new ManagementForm({data: this.data, autoId: this.autoId,
	                               prefix: this.prefix})
	    if (!form.isValid()) {
	      throw ValidationError('ManagementForm data is missing or has been tampered with',
	                            {code: 'missing_management_form'})
	    }
	  }
	  else {
	    var initial = {}
	    initial[TOTAL_FORM_COUNT] = this.totalFormCount()
	    initial[INITIAL_FORM_COUNT] = this.initialFormCount()
	    initial[MIN_NUM_FORM_COUNT] = this.minNum
	    initial[MAX_NUM_FORM_COUNT] = this.maxNum
	    form = new ManagementForm({autoId: this.autoId,
	                               prefix: this.prefix,
	                               initial: initial})
	  }
	  if (this.managementFormCssClass !== null) {
	    form.hiddenFieldRowCssClass = this.managementFormCssClass
	  }
	  return form
	}

	/**
	 * Determines the number of form instances this formset contains, based on
	 * either submitted management data or initial configuration, as appropriate.
	 */
	FormSet.prototype.totalFormCount = function() {
	  if (!env.browser && !this.isInitialRender) {
	    // Return absoluteMax if it is lower than the actual total form count in
	    // the data; this is DoS protection to prevent clients  from forcing the
	    // server to instantiate arbitrary numbers of forms.
	    return Math.min(this.managementForm().cleanedData[TOTAL_FORM_COUNT], this.absoluteMax)
	  }
	  else {
	    var initialForms = this.initialFormCount()
	    var totalForms = this.initialFormCount() + this.extra
	    // Allow all existing related objects/inlines to be displayed, but don't
	    // allow extra beyond max_num.
	    if (this.maxNum !== null &&
	        initialForms > this.maxNum &&
	        this.maxNum >= 0) {
	      totalForms = initialForms
	    }
	    if (this.maxNum !== null &&
	        totalForms > this.maxNum &&
	        this.maxNum >= 0) {
	      totalForms = this.maxNum
	    }
	    return totalForms
	  }
	}

	/**
	 * Determines the number of initial form instances this formset contains, based
	 * on either submitted management data or initial configuration, as appropriate.
	 */
	FormSet.prototype.initialFormCount = function() {
	  if (!env.browser && !this.isInitialRender) {
	    return this.managementForm().cleanedData[INITIAL_FORM_COUNT]
	  }
	  else {
	    // Use the length of the initial data if it's there, 0 otherwise.
	    return (this.initial !== null && this.initial.length > 0
	            ? this.initial.length
	            : 0)
	  }
	}

	/**
	 * Instantiates forms when first accessed.
	 */
	FormSet.prototype.forms = function() {
	  if (this._forms !== null) { return this._forms }
	  var forms = []
	  var totalFormCount = this.totalFormCount()
	  for (var i = 0; i < totalFormCount; i++) {
	    forms.push(this._constructForm(i))
	  }
	  this._forms = forms
	  return forms
	}

	/**
	 * Adds another form and increments extra.
	 */
	FormSet.prototype.addAnother = function() {
	  var currentFormCount = this.totalFormCount()
	  this.extra++
	  if (this._forms !== null) {
	    this._forms[currentFormCount] = this._constructForm(currentFormCount)
	  }
	 this._stateChanged()
	}

	// Assumption - the UI will only let the user remove extra forms
	FormSet.prototype.removeForm = function(index) {
	  if (this.extra === 0) {
	    throw new Error("Can't remove a form when there are no extra forms")
	  }
	  this.extra--
	  if (this._forms !== null) {
	    this._forms.splice(index, 1)
	  }
	  if (this._errors !== null) {
	    this._errors.splice(index, 1)
	  }
	 this._stateChanged()
	}

	/**
	 * Instantiates and returns the ith form instance in the formset.
	 */
	FormSet.prototype._constructForm = function(i) {
	  var defaults = {
	    autoId: this.autoId
	  , prefix: this.addPrefix(i)
	  , errorConstructor: this.errorConstructor
	  , validation: this.validation
	  , controlled: this.controlled
	  , onChange: this.onChange
	  }
	  if (!this.isInitialRender) {
	    defaults.data = this.data
	    defaults.files = this.files
	  }
	  if (this.initial !== null && this.initial.length > 0) {
	    if (typeof this.initial[i] != 'undefined') {
	      defaults.initial = this.initial[i]
	    }
	  }
	  // Allow extra forms to be empty
	  if (i >= this.initialFormCount()) {
	    defaults.emptyPermitted = true
	  }

	  var form = new this.form(defaults)
	  this.addFields(form, i)
	  return form
	}

	/**
	 * Returns a list of all the initial forms in this formset.
	 */
	FormSet.prototype.initialForms = function() {
	  return this.forms().slice(0, this.initialFormCount())
	}

	/**
	 * Returns a list of all the extra forms in this formset.
	 */
	FormSet.prototype.extraForms = function() {
	  return this.forms().slice(this.initialFormCount())
	}

	FormSet.prototype.emptyForm = function() {
	  var kwargs = {
	    autoId: this.autoId,
	    prefix: this.addPrefix('__prefix__'),
	    emptyPermitted: true
	  }
	  var form = new this.form(kwargs)
	  this.addFields(form, null)
	  return form
	}

	/**
	 * Returns a list of forms that have been marked for deletion.
	 */
	FormSet.prototype.deletedForms = function() {
	  if (!this.isValid() || !this.canDelete) { return [] }

	  var forms = this.forms()

	  // Construct _deletedFormIndexes, which is just a list of form indexes
	  // that have had their deletion widget set to true.
	  if (typeof this._deletedFormIndexes == 'undefined') {
	    this._deletedFormIndexes = []
	    for (var i = 0, l = forms.length; i < l; i++) {
	      var form = forms[i]
	      // If this is an extra form and hasn't changed, ignore it
	      if (i >= this.initialFormCount() && !form.hasChanged()) {
	        continue
	      }
	      if (this._shouldDeleteForm(form)) {
	        this._deletedFormIndexes.push(i)
	      }
	    }
	  }

	  return this._deletedFormIndexes.map(function(i) { return forms[i] })
	}

	/**
	 * Returns a list of forms in the order specified by the incoming data.
	 * Throws an Error if ordering is not allowed.
	 */
	FormSet.prototype.orderedForms = function() {
	  if (!this.isValid() || !this.canOrder) {
	    throw new Error(this.constructor.name +
	                    " object has no attribute 'orderedForms'")
	  }

	  var forms = this.forms()

	  // Construct _ordering, which is a list of [form index, orderFieldValue]
	  // pairs. After constructing this list, we'll sort it by orderFieldValue
	  // so we have a way to get to the form indexes in the order specified by
	  // the form data.
	  if (typeof this._ordering == 'undefined') {
	    this._ordering = []
	    for (var i = 0, l = forms.length; i < l; i++) {
	      var form = forms[i]
	      // If this is an extra form and hasn't changed, ignore it
	      if (i >= this.initialFormCount() && !form.hasChanged()) {
	        continue
	      }
	      // Don't add data marked for deletion
	      if (this.canDelete && this._shouldDeleteForm(form)) {
	        continue
	      }
	      this._ordering.push([i, form.cleanedData[ORDERING_FIELD_NAME]])
	    }

	    // Null should be sorted below anything else. Allowing null as a
	    // comparison value makes it so we can leave ordering fields blank.
	    this._ordering.sort(function(x, y) {
	      if (x[1] === null && y[1] === null) {
	        // Sort by form index if both order field values are null
	        return x[0] - y[0]
	      }
	      if (x[1] === null) {
	        return 1
	      }
	      if (y[1] === null) {
	        return -1
	      }
	      return x[1] - y[1]
	    })
	  }

	  return this._ordering.map(function(ordering) { return forms[ordering[0]]})
	}

	/**
	 * A hook for adding extra fields on to each form instance.
	 * @param {Form} form the form fields are to be added to.
	 * @param {Number} index the index of the given form in the formset.
	 */
	FormSet.prototype.addFields = function(form, index) {
	  if (this.canOrder) {
	    // Only pre-fill the ordering field for initial forms
	    if (index != null && index < this.initialFormCount()) {
	      form.fields[ORDERING_FIELD_NAME] =
	          IntegerField({label: 'Order', initial: index + 1,
	                        required: false})
	    }
	    else {
	      form.fields[ORDERING_FIELD_NAME] =
	          IntegerField({label: 'Order', required: false})
	    }
	  }
	  if (this.canDelete) {
	    form.fields[DELETION_FIELD_NAME] =
	        BooleanField({label: 'Delete', required: false})
	  }
	}

	/**
	 * Returns whether or not the form was marked for deletion.
	 */
	FormSet.prototype._shouldDeleteForm = function(form) {
	  return object.get(form.cleanedData, DELETION_FIELD_NAME, false)
	}

	// ================================================================== Errors ===

	FormSet.prototype.addError = function(error) {
	  if (!(error instanceof ValidationError)) {
	    // Normalise to ValidationError and let its constructor do the hard work of
	    // making sense of the input.
	    error = ValidationError(error)
	  }

	  this._nonFormErrors.extend(error.errorList)
	}

	/**
	 * Returns a list of form.errors for every form in this.forms.
	 */
	FormSet.prototype.errors = function() {
	  if (this._errors === null) {
	    this.fullClean()
	  }
	  return this._errors
	}

	/**
	 * Returns an ErrorList of errors that aren't associated with a particular
	 * form -- i.e., from formset.clean(). Returns an empty ErrorList if there are
	 * none.
	 */
	FormSet.prototype.nonFormErrors = function() {
	  if (this._nonFormErrors === null) {
	    this.fullClean()
	  }
	  return this._nonFormErrors
	}

	/**
	 * Returns the number of errors across all forms in the formset.
	 */
	FormSet.prototype.totalErrorCount = function() {
	  return (this.nonFormErrors().length() +
	          this.errors().reduce(function(sum, formErrors) {
	            return sum + formErrors.length()
	          }, 0))
	}

	// ================================================================== Status ===

	/**
	 * Returns true if any form differs from initial.
	 */
	FormSet.prototype.hasChanged = function() {
	  var forms = this.forms()
	  for (var i = 0, l = forms.length; i < l; i++) {
	    if (forms[i].hasChanged()) {
	      return true
	    }
	  }
	  return false
	}

	/**
	 * @return {boolean} true if the formset needs a callback argument for final
	 *   validation.
	 */
	FormSet.prototype.isAsync = function() {
	  return (this.clean.length == 1 || isFormAsync(this.form))
	}

	/**
	 * @return {boolean} true if the formset needs to be multipart-encoded, i.e. it
	 * has a FileInput. Otherwise, false.
	 */
	FormSet.prototype.isMultipart = function() {
	  return (this.forms().length > 0 && this.forms()[0].isMultipart())
	}

	/**
	 * @return {boolean} true if the formset is waiting for async validation to
	 *   complete.
	 */
	FormSet.prototype.isPending = function() {
	  return !is.Empty(this._pendingAsyncValidation)
	}

	/**
	 * Returns true if every form in this.forms() is valid and there are no non-form
	 * errors.
	 */
	FormSet.prototype.isValid = function() {
	  if (this.isInitialRender) {
	    return false
	  }
	  // Triggers a full clean
	  var errors = this.errors()
	  var forms = this.forms()
	  for (var i = 0, l = errors.length; i < l ; i++) {
	    if (errors[i].isPopulated()) {
	      if (this.canDelete && this._shouldDeleteForm(forms[i])) {
	        // This form is going to be deleted so any of its errors should
	        // not cause the entire formset to be invalid.
	        continue
	      }
	      return false
	    }
	  }
	  return !this.nonFormErrors().isPopulated()
	}

	/**
	 * @return {boolean} true if the formset is waiting for async validation of its
	 *   clean() method to complete.
	 */
	FormSet.prototype.nonFormPending = function() {
	  return typeof this._pendingAsyncValidation[CLEAN_VALIDATION] != 'undefined'
	}

	// ================================================================ Prefixes ===

	/**
	 * Returns the formset prefix with the form index appended.
	 * @param {Number} index the index of a form in the formset.
	 */
	FormSet.prototype.addPrefix = function(index) {
	  return formatObj(this.prefixFormat, {prefix: this.prefix, index: index})
	}

	FormSet.prototype.getDefaultPrefix = function() {
	  return 'form'
	}

	module.exports = FormSet
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)

	function isFormAsync(constructor) {
	  var proto = constructor.prototype
	  if (proto.clean.length == 1) { return true }
	  var fieldNames = Object.keys(proto.baseFields)
	  for (var i = 0, l = fieldNames.length; i < l ; i++) {
	    var customClean = proto._getCustomClean(fieldNames[i])
	    if (is.Function(customClean) && customClean.length == 1) {
	      return true
	    }
	  }
	  return false
	}

	module.exports = isFormAsync

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)
	var validators = __webpack_require__(2)

	var CharField = __webpack_require__(66)

	var cleanIPv6Address = validators.ipv6.cleanIPv6Address

	var GenericIPAddressField = CharField.extend({
	  constructor: function GenericIPAddressField(kwargs) {
	    if (!(this instanceof GenericIPAddressField)) { return new GenericIPAddressField(kwargs) }
	    kwargs = object.extend({protocol: 'both', unpackIPv4: false}, kwargs)
	    this.unpackIPv4 = kwargs.unpackIPv4
	    this.defaultValidators =
	      validators.ipAddressValidators(kwargs.protocol, kwargs.unpackIPv4).validators
	    CharField.call(this, kwargs)
	  }
	})

	GenericIPAddressField.prototype.toJavaScript = function(value) {
	  if (!value) {
	    return ''
	  }
	  if (value && value.indexOf(':') != -1) {
	    return cleanIPv6Address(value, {unpackIPv4: this.unpackIPv4})
	  }
	  return value
	}


	module.exports = GenericIPAddressField

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var FileField = __webpack_require__(93)

	/**
	 * Validates that its input is a valid uploaded image.
	 * @constructor
	 * @extends {Field}
	 * @param {Object=} kwargs
	 */
	var ImageField = FileField.extend({
	  defaultErrorMessages: {
	    invalidImage: 'Upload a valid image. The file you uploaded was either not an image or a corrupted image.'
	  }

	, constructor: function ImageField(kwargs) {
	    if (!(this instanceof ImageField)) { return new ImageField(kwargs) }
	    FileField.call(this, kwargs)
	  }
	})

	/**
	 * Checks that the file-upload field data contains a valid image.
	 */
	ImageField.prototype.toJavaScript = function(data, initial) {
	  var f = FileField.prototype.toJavaScript.call(this, data, initial)
	  if (f === null) {
	    return null
	  }

	  // TODO Plug in image processing code when running on the server

	  return f
	}

	ImageField.prototype.getWidgetAttrs = function(widget) {
	  var attrs = FileField.prototype.getWidgetAttrs.call(this, widget)
	  attrs.accept = 'image/*'
	  return attrs
	}


	module.exports = ImageField

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var CharField = __webpack_require__(66)

	var $__0=  __webpack_require__(2),validateIPv4Address=$__0.validateIPv4Address

	/**
	 * Validates that its input is a valid IPv4 address.
	 * @constructor
	 * @extends {CharField}
	 * @param {Object=} kwargs
	 * @deprecated in favour of GenericIPAddressField
	 */
	var IPAddressField = CharField.extend({
	  defaultValidators: [validateIPv4Address]

	, constructor: function IPAddressField(kwargs) {
	    if (!(this instanceof IPAddressField)) { return new IPAddressField(kwargs) }
	    CharField.call(this, kwargs)
	  }
	})

	module.exports = IPAddressField

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)
	var object = __webpack_require__(6)

	var ChoiceField = __webpack_require__(77)
	var MultipleHiddenInput = __webpack_require__(109)
	var SelectMultiple = __webpack_require__(75)

	var $__0=  __webpack_require__(2),ValidationError=$__0.ValidationError

	/**
	 * Validates that its input is one or more of a valid list of choices.
	 * @constructor
	 * @extends {ChoiceField}
	 * @param {Object=} kwargs
	 */
	var MultipleChoiceField = ChoiceField.extend({
	  hiddenWidget: MultipleHiddenInput
	, widget: SelectMultiple
	, defaultErrorMessages: {
	    invalidChoice: 'Select a valid choice. {value} is not one of the available choices.'
	  , invalidList: 'Enter a list of values.'
	  }

	, constructor: function MultipleChoiceField(kwargs) {
	    if (!(this instanceof MultipleChoiceField)) { return new MultipleChoiceField(kwargs) }
	    ChoiceField.call(this, kwargs)
	  }
	})

	MultipleChoiceField.prototype.toJavaScript = function(value) {
	  if (this.isEmptyValue(value)) {
	    return []
	  }
	  else if (!is.Array(value)) {
	    throw ValidationError(this.errorMessages.invalidList, {code: 'invalidList'})
	  }
	  var stringValues = []
	  for (var i = 0, l = value.length; i < l; i++) {
	    stringValues.push(''+value[i])
	  }
	  return stringValues
	}

	/**
	 * Validates that the input is a list and that each item is in this field's
	 * choices.
	 * @param {Array.<string>} value user input.
	 * @throws {ValidationError} if the input is invalid.
	 */
	MultipleChoiceField.prototype.validate = function(value) {
	  if (this.required && !value.length) {
	    throw ValidationError(this.errorMessages.required, {code: 'required'})
	  }
	  for (var i = 0, l = value.length; i < l; i++) {
	    if (!this.validValue(value[i])) {
	      throw ValidationError(this.errorMessages.invalidChoice, {
	        code: 'invalidChoice'
	      , params: {value: value[i]}
	      })
	    }
	  }
	}

	MultipleChoiceField.prototype._hasChanged = function(initial, data) {
	  if (initial === null) {
	    initial = []
	  }
	  if (data === null) {
	    data = []
	  }
	  if (initial.length != data.length) {
	    return true
	  }
	  var dataLookup = object.lookup(data)
	  for (var i = 0, l = initial.length; i < l; i++) {
	    if (typeof dataLookup[''+initial[i]] == 'undefined') {
	      return true
	    }
	  }
	  return false
	}

	module.exports = MultipleChoiceField

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)
	var React = __webpack_require__(23)

	var HiddenInput = __webpack_require__(21)

	/**
	 * A widget that handles <input type="hidden"> for fields that have a list of
	 * values.
	 * @constructor
	 * @extends {HiddenInput}
	 * @param {Object=} kwargs
	 */
	var MultipleHiddenInput = HiddenInput.extend({
	  constructor: function MultipleHiddenInput(kwargs) {
	    if (!(this instanceof MultipleHiddenInput)) { return new MultipleHiddenInput(kwargs) }
	    HiddenInput.call(this, kwargs)
	  }
	})

	MultipleHiddenInput.prototype.render = function(name, value, kwargs) {
	  kwargs = object.extend({attrs: null}, kwargs)
	  if (value === null) {
	    value = []
	  }
	  var finalAttrs = this.buildAttrs(kwargs.attrs, {type: this.inputType,
	                                                  name: name})
	  var id = object.get(finalAttrs, 'id', null)
	  var key = object.get(finalAttrs, 'key', null)
	  var inputs = []
	  for (var i = 0, l = value.length; i < l; i++) {
	    var inputAttrs = object.extend({}, finalAttrs, {value: value[i]})
	    // Add numeric index suffixes to attributes which should be unique
	    if (id) {
	      inputAttrs.id = id + '_' + i
	    }
	    if (key) {
	      inputAttrs.key = id + '_' + i
	    }
	    inputs.push(React.createElement('input', inputAttrs))
	  }
	  return React.createElement('div', null, inputs)
	}

	MultipleHiddenInput.prototype.valueFromData = function(data, files, name) {
	  if (typeof data[name] != 'undefined') {
	    return [].concat(data[name])
	  }
	  return null
	}

	module.exports = MultipleHiddenInput

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)
	var object = __webpack_require__(6)

	var Field = __webpack_require__(20)

	var $__0=  __webpack_require__(2),ValidationError=$__0.ValidationError

	/**
	 * A Field that aggregates the logic of multiple Fields.
	 * Its clean() method takes a "decompressed" list of values, which are then
	 * cleaned into a single value according to this.fields. Each value in this
	 * list is cleaned by the corresponding field -- the first value is cleaned by
	 * the first field, the second value is cleaned by the second field, etc. Once
	 * all fields are cleaned, the list of clean values is "compressed" into a
	 * single value.
	 * Subclasses should not have to implement clean(). Instead, they must
	 * implement compress(), which takes a list of valid values and returns a
	 * "compressed" version of those values -- a single value.
	 * You'll probably want to use this with MultiWidget.
	 * @constructor
	 * @extends {Field}
	 * @param {Object=} kwargs
	 */
	var MultiValueField = Field.extend({
	  defaultErrorMessages: {
	    invalid: 'Enter a list of values.'
	  , incomplete: 'Enter a complete value.'
	  }

	, constructor: function MultiValueField(kwargs) {
	    if (!(this instanceof Field)) { return new MultiValueField(kwargs) }
	    kwargs = object.extend({fields: []}, kwargs)
	    this.requireAllFields = object.pop(kwargs, 'requireAllFields', true)
	    Field.call(this, kwargs)

	    for (var i = 0, l = kwargs.fields.length; i < l; i++) {
	      var f = kwargs.fields[i]
	      object.setDefault(f.errorMessages, 'incomplete',
	                        this.errorMessages.incomplete)
	      if (this.requireAllFields) {
	        // Set required to false on the individual fields, because the required
	        // validation will be handled by MultiValueField, not by those
	        // individual fields.
	        f.required = false
	      }
	    }
	    this.fields = kwargs.fields
	  }
	})

	MultiValueField.prototype.validate = function() {}

	/**
	 * Validates every value in the given list. A value is validated against the
	 * corresponding Field in this.fields.
	 * For example, if this MultiValueField was instantiated with
	 * {fields: [forms.DateField(), forms.TimeField()]}, clean() would call
	 * DateField.clean(value[0]) and TimeField.clean(value[1]).
	 * @param {Array} value user input for each field.
	 * @return the result of calling compress() on the cleaned input.
	 * @throws {ValidationError} if the input is invalid.
	 */
	MultiValueField.prototype.clean = function(value) {
	  var cleanData = []
	  var errors = []

	  if (!value || is.Array(value)) {
	    var allValuesEmpty = true
	    if (is.Array(value)) {
	      for (var i = 0, l = value.length; i < l; i++) {
	        if (value[i]) {
	          allValuesEmpty = false
	          break
	        }
	      }
	    }

	    if (!value || allValuesEmpty) {
	      if (this.required) {
	        throw ValidationError(this.errorMessages.required, {code: 'required'})
	      }
	      else {
	        return this.compress([])
	      }
	    }
	  }
	  else {
	    throw ValidationError(this.errorMessages.invalid, {code: 'invalid'})
	  }

	  for (i = 0, l = this.fields.length; i < l; i++) {
	    var field = this.fields[i]
	    var fieldValue = value[i]
	    if (fieldValue === undefined) {
	      fieldValue = null
	    }
	    if (this.isEmptyValue(fieldValue)) {
	      if (this.requireAllFields) {
	        // Throw a 'required' error if the MultiValueField is required and any
	        // field is empty.
	        if (this.required) {
	          throw ValidationError(this.errorMessages.required, {code: 'required'})
	        }
	      }
	      else if (field.required) {
	        // Otherwise, add an 'incomplete' error to the list of collected errors
	        // and skip field cleaning, if a required field is empty.
	        if (errors.indexOf(field.errorMessages.incomplete) == -1) {
	          errors.push(field.errorMessages.incomplete)
	        }
	        continue
	      }
	    }

	    try {
	      cleanData.push(field.clean(fieldValue))
	    }
	    catch (e) {
	      if (!(e instanceof ValidationError)) { throw e }
	      // Collect all validation errors in a single list, which we'll throw at
	      // the end of clean(), rather than throwing a single exception for the
	      // first error we encounter. Skip duplicates.
	      errors = errors.concat(e.messages().filter(function(m) {
	        return errors.indexOf(m) == -1
	      }))
	    }
	  }

	  if (errors.length !== 0) {
	    throw ValidationError(errors)
	  }

	  var out = this.compress(cleanData)
	  this.validate(out)
	  this.runValidators(out)
	  return out
	}

	/**
	 * Returns a single value for the given list of values. The values can be
	 * assumed to be valid.
	 * For example, if this MultiValueField was instantiated with
	 * {fields: [forms.DateField(), forms.TimeField()]}, this might return a Date
	 * object created by combining the date and time in dataList.
	 * @param {Array} dataList
	 * @abstract
	 */
	MultiValueField.prototype.compress = function(dataList) {
	  throw new Error('Subclasses must implement this method.')
	}

	MultiValueField.prototype._hasChanged = function(initial, data) {
	  if (initial === null) {
	    initial = []
	    for (var i = 0, l = data.length; i < l; i++) {
	      initial.push('')
	    }
	  }
	  else if (!(is.Array(initial))) {
	    initial = this.widget.decompress(initial)
	  }

	  for (i = 0, l = this.fields.length; i < l; i++) {
	    if (this.fields[i]._hasChanged(initial[i], data[i])) {
	      return true
	    }
	  }
	  return false
	}

	module.exports = MultiValueField

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)
	var object = __webpack_require__(6)
	var React = __webpack_require__(23)

	var Widget = __webpack_require__(59)

	/**
	 * A widget that is composed of multiple widgets.
	 * @constructor
	 * @extends {Widget}
	 * @param {Object=} kwargs
	 */
	var MultiWidget = Widget.extend({
	  constructor: function MultiWidget(widgets, kwargs) {
	    if (!(this instanceof MultiWidget)) { return new MultiWidget(widgets, kwargs) }
	    this.widgets = []
	    var needsMultipartForm = false
	    for (var i = 0, l = widgets.length; i < l; i++) {
	      var widget = widgets[i] instanceof Widget ? widgets[i] : new widgets[i]()
	      if (widget.needsMultipartForm) {
	        needsMultipartForm = true
	      }
	      this.widgets.push(widget)
	    }
	    this.needsMultipartForm = needsMultipartForm
	    Widget.call(this, kwargs)
	  }
	})

	/**
	 * This method is different than other widgets', because it has to figure out
	 * how to split a single value for display in multiple widgets.
	 *
	 * If the given value is NOT a list, it will first be "decompressed" into a list
	 * before it is rendered by calling the  MultiWidget#decompress function.
	 *
	 * Each value in the list is rendered  with the corresponding widget -- the
	 * first value is rendered in the first widget, the second value is rendered in
	 * the second widget, and so on.
	 *
	 * @param {string} name the field name.
	 * @param {(array.<*>|*)} value a list of values, or a normal value (e.g., a String that has
	 *   been "compressed" from a list of values).
	 * @param {Object=} kwargs rendering options.
	 * @return a rendered collection of widgets.
	 */
	MultiWidget.prototype.render = function(name, value, kwargs) {
	  kwargs = object.extend({}, kwargs)
	  if (!(is.Array(value))) {
	    value = this.decompress(value)
	  }
	  var finalAttrs = this.buildAttrs(kwargs.attrs, {'data-newforms-field': name})
	  var id = object.get(finalAttrs, 'id', null)
	  var key = object.get(finalAttrs, 'key', null)
	  var renderedWidgets = []
	  for (var i = 0, l = this.widgets.length; i < l; i++) {
	    var widget = this.widgets[i]
	    var widgetValue = null
	    if (typeof value[i] != 'undefined') {
	      widgetValue = value[i]
	    }
	    if (id) {
	      finalAttrs.id = id + '_' + i
	    }
	    if (key) {
	      finalAttrs.key = key + '_' + i
	    }
	    renderedWidgets.push(
	        widget.render(name + '_' + i, widgetValue, {attrs: finalAttrs,
	                                                    controlled: kwargs.controlled}))
	  }
	  return this.formatOutput(renderedWidgets)
	}

	MultiWidget.prototype.idForLabel = function(id) {
	  if (id) {
	    id += '_0'
	  }
	  return id
	}

	MultiWidget.prototype.valueFromData = function(data, files, name) {
	  var values = []
	  for (var i = 0, l = this.widgets.length; i < l; i++) {
	    values[i] = this.widgets[i].valueFromData(data, files, name + '_' + i)
	  }
	  return values
	}

	/**
	 * Creates an element containing a given list of rendered widgets.
	 *
	 * This hook allows you to format the HTML design of the widgets, if needed.
	 *
	 * @param {Array} renderedWidgets a list of rendered widgets.
	 * @return a <div> containing the rendered widgets.
	 */
	MultiWidget.prototype.formatOutput = function(renderedWidgets) {
	  return React.createElement('div', null, renderedWidgets)
	}

	/**
	 * Creates a list of decompressed values for the given compressed value.
	 * @abstract
	 * @param value a compressed value, which can be assumed to be valid, but not
	 *   necessarily non-empty.
	 * @return a list of decompressed values for the given compressed value.
	 */
	MultiWidget.prototype.decompress = function(value) {
	  throw new Error('MultiWidget subclasses must implement a decompress() method.')
	}

	module.exports = MultiWidget

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BooleanField = __webpack_require__(62)
	var NullBooleanSelect = __webpack_require__(113)

	/**
	 * A field whose valid values are null, true and false.
	 * Invalid values are cleaned to null.
	 * @constructor
	 * @extends {BooleanField}
	 * @param {Object=} kwargs
	 */
	var NullBooleanField = BooleanField.extend({
	  widget: NullBooleanSelect

	, constructor: function NullBooleanField(kwargs) {
	    if (!(this instanceof NullBooleanField)) { return new NullBooleanField(kwargs) }
	    BooleanField.call(this, kwargs)
	  }
	})

	NullBooleanField.prototype.toJavaScript = function(value) {
	  // Explicitly checks for the string 'True' and 'False', which is what a
	  // hidden field will submit for true and false, and for '1' and '0', which
	  // is what a RadioField will submit. Unlike the BooleanField we also need
	  // to check for true, because we are not using Boolean() function.
	  if (value === true || value == 'True' || value == 'true' || value == '1') {
	    return true
	  }
	  else if (value === false || value == 'False' || value == 'false' || value == '0') {
	    return false
	  }
	  return null
	}

	NullBooleanField.prototype.validate = function(value) {}

	NullBooleanField.prototype._hasChanged = function(initial, data) {
	  // null (unknown) and false (No) are not the same
	  if (initial !== null) {
	      initial = Boolean(initial)
	  }
	  if (data !== null) {
	      data = Boolean(data)
	  }
	  return initial != data
	}

	module.exports = NullBooleanField

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Select = __webpack_require__(76)

	/**
	 * A <select> widget intended to be used with NullBooleanField.
	 * @constructor
	 * @extends {Select}
	 * @param {Object=} kwargs
	 */
	var NullBooleanSelect = Select.extend({
	  constructor: function NullBooleanSelect(kwargs) {
	    if (!(this instanceof NullBooleanSelect)) { return new NullBooleanSelect(kwargs) }
	    kwargs = kwargs || {}
	    // Set or override choices
	    kwargs.choices = [['1', 'Unknown'], ['2', 'Yes'], ['3', 'No']]
	    Select.call(this, kwargs)
	  }
	})

	NullBooleanSelect.prototype.render = function(name, value, kwargs) {
	  if (value === true || value == '2') {
	    value = '2'
	  }
	  else if (value === false || value == '3') {
	    value = '3'
	  }
	  else {
	    value = '1'
	  }
	  return Select.prototype.render.call(this, name, value, kwargs)
	}

	NullBooleanSelect.prototype.valueFromData = function(data, files, name) {
	  var value = null
	  if (typeof data[name] != 'undefined') {
	    var dataValue = data[name]
	    if (dataValue === true || dataValue == 'True' || dataValue == 'true' ||
	        dataValue == '2') {
	      value = true
	    }
	    else if (dataValue === false || dataValue == 'False' ||
	             dataValue == 'false' || dataValue == '3') {
	      value = false
	    }
	  }
	  return value
	}

	module.exports = NullBooleanSelect

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ChoiceInput = __webpack_require__(70)

	var RadioChoiceInput = ChoiceInput.extend({
	  constructor: function RadioChoiceInput(name, value, attrs, controlled, choice, index) {
	    if (!(this instanceof RadioChoiceInput)) {
	      return new RadioChoiceInput(name, value, attrs, controlled, choice, index)
	    }
	    ChoiceInput.call(this, name, value, attrs, controlled, choice, index)
	    this.value = ''+this.value
	  }
	, inputType: 'radio'
	})

	module.exports = RadioChoiceInput

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ChoiceFieldRenderer = __webpack_require__(72)
	var RadioChoiceInput = __webpack_require__(114)

	var RadioFieldRenderer = ChoiceFieldRenderer.extend({
	  constructor: function RadioFieldRenderer(name, value, attrs, controlled, choices) {
	    if (!(this instanceof RadioFieldRenderer)) {
	      return new RadioFieldRenderer(name, value, attrs, controlled, choices)
	    }
	    ChoiceFieldRenderer.apply(this, arguments)
	  }
	, choiceInputConstructor: RadioChoiceInput
	})

	module.exports = RadioFieldRenderer

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var RadioFieldRenderer = __webpack_require__(115)
	var RendererMixin = __webpack_require__(74)
	var Select = __webpack_require__(76)

	/**
	 * Renders a single select as a list of <input type="radio"> elements.
	 * @constructor
	 * @extends {Select}
	 * @param {Object=} kwargs
	 */
	var RadioSelect = Select.extend({
	  __mixins__: [RendererMixin]
	, constructor: function(kwargs) {
	    if (!(this instanceof RadioSelect)) { return new RadioSelect(kwargs) }
	    RendererMixin.call(this, kwargs)
	    Select.call(this, kwargs)
	  }
	, renderer: RadioFieldRenderer
	, _emptyValue: ''
	})

	module.exports = RadioSelect

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)

	var CharField = __webpack_require__(66)

	var $__0=  __webpack_require__(2),RegexValidator=$__0.RegexValidator

	/**
	 * Validates that its input matches a given regular expression.
	 * @constructor
	 * @extends {CharField}
	 * @param {(RegExp|string)} regex
	 * @param {Object=} kwargs
	 */
	var RegexField = CharField.extend({
	  constructor: function RegexField(regex, kwargs) {
	    if (!(this instanceof RegexField)) { return new RegexField(regex, kwargs) }
	    CharField.call(this, kwargs)
	    if (is.String(regex)) {
	      regex = new RegExp(regex)
	    }
	    this.regex = regex
	    this.validators.push(RegexValidator({regex: this.regex}))
	  }
	})

	module.exports = RegexField

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)
	var React = __webpack_require__(23)

	var ErrorObject = __webpack_require__(92)
	var Form = __webpack_require__(96)
	var FormRow = __webpack_require__(101)
	var ProgressMixin = __webpack_require__(102)

	var $__0=  __webpack_require__(98),NON_FIELD_ERRORS=$__0.NON_FIELD_ERRORS
	var $__1=   __webpack_require__(15),autoIdChecker=$__1.autoIdChecker,getProps=$__1.getProps

	var formProps = {
	  autoId: autoIdChecker
	, controlled: React.PropTypes.bool
	, data: React.PropTypes.object
	, emptyPermitted: React.PropTypes.bool
	, errorConstructor: React.PropTypes.func
	, errors: React.PropTypes.instanceOf(ErrorObject)
	, files: React.PropTypes.object
	, initial: React.PropTypes.object
	, labelSuffix: React.PropTypes.string
	, onChange: React.PropTypes.func
	, prefix: React.PropTypes.string
	, validation: React.PropTypes.oneOfType([
	    React.PropTypes.string
	  , React.PropTypes.object
	  ])
	}

	/**
	 * Renders a Form. A form instance or constructor can be given. If a constructor
	 * is given, an instance will be created when the component is mounted, and any
	 * additional props will be passed to the constructor as options.
	 */
	var RenderForm = React.createClass({displayName: "RenderForm",
	  mixins: [ProgressMixin],
	  propTypes: object.extend({}, formProps, {
	    className: React.PropTypes.string      // Class for the component wrapping all rows
	  , component: React.PropTypes.any         // Component to wrap all rows
	  , form: React.PropTypes.oneOfType([      // Form instance or constructor
	      React.PropTypes.func,
	      React.PropTypes.instanceOf(Form)
	    ]).isRequired
	  , row: React.PropTypes.any               // Component to render form rows
	  , rowComponent: React.PropTypes.any      // Component to wrap each row
	  }),

	  childContextTypes: {
	    form: React.PropTypes.instanceOf(Form)
	  },

	  getChildContext:function() {
	    return {form: this.form}
	  },

	  getDefaultProps:function() {
	    return {
	      component: 'div'
	    , row: FormRow
	    , rowComponent: 'div'
	    }
	  },

	  componentWillMount:function() {
	    if (this.props.form instanceof Form) {
	      this.form = this.props.form
	    }
	    else {
	      this.form = new this.props.form(object.extend({
	        onChange: this.forceUpdate.bind(this)
	      }, getProps(this.props, Object.keys(formProps))))
	    }
	  },

	  getForm:function() {
	    return this.form
	  },

	  render:function() {
	    // Allow a single child to be passed for custom rendering - passing any more
	    // will throw an error.
	    if (React.Children.count(this.props.children) !== 0) {
	      // Pass a form prop to the child, which will also be available via context
	      return React.cloneElement(React.Children.only(this.props.children), {form: this.form})
	    }

	    // Default rendering
	    var $__0=   this,form=$__0.form,props=$__0.props
	    var attrs = {}
	    if (this.props.className) {
	      attrs.className = props.className
	    }
	    var topErrors = form.nonFieldErrors()
	    var hiddenFields = form.hiddenFields().map(function(bf)  {
	      var errors = bf.errors()
	      if (errors.isPopulated) {
	        topErrors.extend(errors.messages().map(function(error)  {
	          return '(Hidden field ' + bf.name + ') ' + error
	        }))
	      }
	      return bf.render()
	    })

	    return React.createElement(props.component, React.__spread({},  attrs), 
	      topErrors.isPopulated() && React.createElement(props.row, {
	        className: form.errorCssClass, 
	        component: props.rowComponent, 
	        content: topErrors.render(), 
	        key: form.addPrefix(NON_FIELD_ERRORS)}
	      ), 
	      form.visibleFields().map(function(bf)  {return React.createElement(props.row, {
	        bf: bf, 
	        className: bf.cssClasses(), 
	        component: props.rowComponent, 
	        key: bf.htmlName, 
	        progress: props.progress}
	      );}), 
	      form.nonFieldPending() && React.createElement(props.row, {
	        className: form.pendingRowCssClass, 
	        component: props.rowComponent, 
	        content: this.renderProgress(), 
	        key: form.addPrefix('__pending__')}
	      ), 
	      hiddenFields.length > 0 && React.createElement(props.row, {
	        className: form.hiddenFieldRowCssClass, 
	        component: props.rowComponent, 
	        content: hiddenFields, 
	        hidden: true, 
	        key: form.addPrefix('__hidden__')}
	      )
	    )
	  }
	})

	module.exports = RenderForm


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)
	var React = __webpack_require__(23)

	var FormRow = __webpack_require__(101)
	var FormSet = __webpack_require__(103)
	var ProgressMixin = __webpack_require__(102)
	var RenderForm = __webpack_require__(118)

	var $__0=  __webpack_require__(98),NON_FIELD_ERRORS=$__0.NON_FIELD_ERRORS
	var $__1=   __webpack_require__(15),autoIdChecker=$__1.autoIdChecker,getProps=$__1.getProps

	var formsetProps = {
	  canDelete: React.PropTypes.bool
	, canOrder: React.PropTypes.bool
	, extra: React.PropTypes.number
	, form: React.PropTypes.func
	, maxNum: React.PropTypes.number
	, minNum: React.PropTypes.number
	, validateMax: React.PropTypes.bool
	, validateMin: React.PropTypes.bool

	, autoId: autoIdChecker
	, controlled: React.PropTypes.bool
	, data: React.PropTypes.object
	, errorConstructor: React.PropTypes.func
	, files: React.PropTypes.object
	, initial: React.PropTypes.object
	, onChange: React.PropTypes.func
	, prefix: React.PropTypes.string
	, validation: React.PropTypes.oneOfType([
	    React.PropTypes.string
	  , React.PropTypes.object
	  ])
	}

	/**
	 * Renders a Formset. A formset instance or constructor can be given. If a
	 * constructor is given, an instance will be created when the component is
	 * mounted, and any additional props will be passed to the constructor as
	 * options.
	 */
	var RenderFormSet = React.createClass({displayName: "RenderFormSet",
	  mixins: [ProgressMixin],
	  propTypes: object.extend({}, formsetProps, {
	    className: React.PropTypes.string         // Class for the component wrapping all forms
	  , component: React.PropTypes.any            // Component to wrap all forms
	  , formComponent: React.PropTypes.any        // Component to wrap each form
	  , formset: React.PropTypes.oneOfType([      // Formset instance or constructor
	      React.PropTypes.func,
	      React.PropTypes.instanceOf(FormSet)
	    ])
	  , row: React.PropTypes.any                  // Component to render form rows
	  , rowComponent: React.PropTypes.any         // Component to wrap each form row
	  , useManagementForm: React.PropTypes.bool   // Should ManagementForm hidden fields be rendered?
	  , __all__:function(props) {
	      if (!props.form && !props.formset) {
	        return new Error(
	          'Invalid props supplied to `RenderFormSet`, either `form` or ' +
	          '`formset` must be specified.'
	        )
	      }
	    }
	  }),

	  getDefaultProps:function() {
	    return {
	      component: 'div'
	    , formComponent: 'div'
	    , formset: FormSet
	    , row: FormRow
	    , rowComponent: 'div'
	    , useManagementForm: false
	    }
	  },

	  componentWillMount:function() {
	    if (this.props.formset instanceof FormSet) {
	      this.formset = this.props.formset
	    }
	    else {
	      this.formset = new this.props.formset(object.extend({
	        onChange: this.forceUpdate.bind(this)
	      }, getProps(this.props, Object.keys(formsetProps))))
	    }
	  },

	  getFormset:function() {
	    return this.formset
	  },

	  render:function() {
	    var $__0=   this,formset=$__0.formset,props=$__0.props
	    var attrs = {}
	    if (this.props.className) {
	      attrs.className = props.className
	    }
	    var topErrors = formset.nonFormErrors()

	    return React.createElement(props.component, React.__spread({},  attrs), 
	      topErrors.isPopulated() && React.createElement(props.row, {
	        className: formset.errorCssClass, 
	        content: topErrors.render(), 
	        key: formset.addPrefix(NON_FIELD_ERRORS), 
	        rowComponent: props.rowComponent}
	      ), 
	      formset.forms().map(function(form)  {return React.createElement(RenderForm, {
	        form: form, 
	        formComponent: props.formComponent, 
	        progress: props.progress, 
	        row: props.row, 
	        rowComponent: props.rowComponent}
	      );}), 
	      formset.nonFormPending() && React.createElement(props.row, {
	        className: formset.pendingRowCssClass, 
	        content: this.renderProgress(), 
	        key: formset.addPrefix('__pending__'), 
	        rowComponent: props.rowComponent}
	      ), 
	      props.useManagementForm && React.createElement(RenderForm, {
	        form: formset.managementForm(), 
	        formComponent: props.formComponent, 
	        row: props.row, 
	        rowComponent: props.rowComponent}
	      )
	    )
	  }
	})

	module.exports = RenderFormSet

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var validators = __webpack_require__(2)

	var CharField = __webpack_require__(66)

	var $__0=  __webpack_require__(15),strip=$__0.strip

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

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)
	var object = __webpack_require__(6)

	var DateField = __webpack_require__(81)
	var MultiValueField = __webpack_require__(110)
	var SplitDateTimeWidget = __webpack_require__(122)
	var SplitHiddenDateTimeWidget = __webpack_require__(124)
	var TimeField = __webpack_require__(125)

	var $__0=  __webpack_require__(2),ValidationError=$__0.ValidationError

	/**
	 * A MultiValueField consisting of a DateField and a TimeField.
	 * @constructor
	 * @extends {MultiValueField}
	 * @param {Object=} kwargs
	 */
	var SplitDateTimeField = MultiValueField.extend({
	  hiddenWidget: SplitHiddenDateTimeWidget
	, widget: SplitDateTimeWidget
	, defaultErrorMessages: {
	    invalidDate: 'Enter a valid date.'
	  , invalidTime: 'Enter a valid time.'
	  }

	, constructor: function SplitDateTimeField(kwargs) {
	    if (!(this instanceof SplitDateTimeField)) { return new SplitDateTimeField(kwargs) }
	    kwargs = object.extend({
	      inputDateFormats: null, inputTimeFormats: null
	    }, kwargs)
	    var errors = object.extend({}, this.defaultErrorMessages)
	    if (typeof kwargs.errorMessages != 'undefined') {
	      object.extend(errors, kwargs.errorMessages)
	    }
	    kwargs.fields = [
	      DateField({inputFormats: kwargs.inputDateFormats,
	                 errorMessages: {invalid: errors.invalidDate}})
	    , TimeField({inputFormats: kwargs.inputTimeFormats,
	                 errorMessages: {invalid: errors.invalidTime}})
	    ]
	    MultiValueField.call(this, kwargs)
	  }
	})

	/**
	 * Validates that, if given, its input does not contain empty values.
	 * @param {?Array.<Date>} dataList a two-item list consisting of two Date
	 *   objects, the first of which represents a date, the second a time.
	 * @return {?Date} a Dare representing the given date and time, or null for
	 *   empty values.
	 */
	SplitDateTimeField.prototype.compress = function(dataList) {
	  if (is.Array(dataList) && dataList.length > 0) {
	    var d = dataList[0]
	    var t = dataList[1]
	    // Raise a validation error if date or time is empty (possible if
	    // SplitDateTimeField has required == false).
	    if (this.isEmptyValue(d)) {
	      throw ValidationError(this.errorMessages.invalidDate, {code: 'invalidDate'})
	    }
	    if (this.isEmptyValue(t)) {
	      throw ValidationError(this.errorMessages.invalidTime, {code: 'invalidTime'})
	    }
	    return new Date(d.getFullYear(), d.getMonth(), d.getDate(),
	                    t.getHours(), t.getMinutes(), t.getSeconds())
	  }
	  return null
	}

	module.exports = SplitDateTimeField

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)

	var DateInput = __webpack_require__(82)
	var MultiWidget = __webpack_require__(111)
	var TimeInput = __webpack_require__(123)

	/**
	 * Splits Date input into two <input type="text"> elements.
	 * @constructor
	 * @extends {MultiWidget}
	 * @param {Object=} kwargs
	 */
	var SplitDateTimeWidget = MultiWidget.extend({
	  constructor: function SplitDateTimeWidget(kwargs) {
	    if (!(this instanceof SplitDateTimeWidget)) { return new SplitDateTimeWidget(kwargs) }
	    kwargs = object.extend({dateFormat: null, timeFormat: null}, kwargs)
	    var widgets = [
	      DateInput({attrs: kwargs.attrs, format: kwargs.dateFormat})
	    , TimeInput({attrs: kwargs.attrs, format: kwargs.timeFormat})
	    ]
	    MultiWidget.call(this, widgets, kwargs.attrs)
	  }
	})

	SplitDateTimeWidget.prototype.decompress = function(value) {
	  if (value) {
	    return [
	      new Date(value.getFullYear(), value.getMonth(), value.getDate())
	    , new Date(1900, 0, 1, value.getHours(), value.getMinutes(), value.getSeconds())
	    ]
	  }
	  return [null, null]
	}

	module.exports = SplitDateTimeWidget

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var DateTimeBaseInput = __webpack_require__(83)

	/**
	 * @constructor
	 * @extends {DateTimeBaseInput}
	 * @param {Object=} kwargs
	 */
	var TimeInput = DateTimeBaseInput.extend({
	  formatType: 'TIME_INPUT_FORMATS'
	, constructor: function TimeInput(kwargs) {
	    if (!(this instanceof TimeInput)) { return new TimeInput(kwargs) }
	    DateTimeBaseInput.call(this, kwargs)
	  }
	})

	module.exports = TimeInput

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var SplitDateTimeWidget = __webpack_require__(122)

	/**
	 * Splits Date input into two <input type="hidden"> elements.
	 * @constructor
	 * @extends {SplitDateTimeWidget}
	 * @param {Object=} kwargs
	 */
	var SplitHiddenDateTimeWidget = SplitDateTimeWidget.extend({
	  constructor: function SplitHiddenDateTimeWidget(kwargs) {
	    if (!(this instanceof SplitHiddenDateTimeWidget)) { return new SplitHiddenDateTimeWidget(kwargs) }
	    SplitDateTimeWidget.call(this, kwargs)
	    for (var i = 0, l = this.widgets.length; i < l; i++) {
	      this.widgets[i].inputType = 'hidden'
	      this.widgets[i].isHidden = true
	    }
	  }
	, isHidden: true
	})

	module.exports = SplitHiddenDateTimeWidget

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var time = __webpack_require__(14)

	var locales = __webpack_require__(13)

	var BaseTemporalField = __webpack_require__(18)
	var TimeInput = __webpack_require__(123)

	/**
	 * Validates that its input is a time.
	 * @constructor
	 * @extends {BaseTemporalField}
	 * @param {Object=} kwargs
	 */
	var TimeField = BaseTemporalField.extend({
	  widget: TimeInput
	, inputFormatType: 'TIME_INPUT_FORMATS'
	, defaultErrorMessages: {
	    invalid: 'Enter a valid time.'
	  }

	, constructor: function TimeField(kwargs) {
	    if (!(this instanceof TimeField)) { return new TimeField(kwargs) }
	    BaseTemporalField.call(this, kwargs)
	  }
	})

	/**
	 * Validates that the input can be converted to a time.
	 * @param {?(string|Date)} value user input.
	 * @return {?Date} a Date with its hour, minute and second attributes set, or
	 *   null for empty values when they are allowed.
	 * @throws {ValidationError} if the input is invalid.
	 */
	TimeField.prototype.toJavaScript = function(value) {
	  if (this.isEmptyValue(value)) {
	    return null
	  }
	  if (value instanceof Date) {
	    return new Date(1900, 0, 1, value.getHours(), value.getMinutes(), value.getSeconds())
	  }
	  return BaseTemporalField.prototype.toJavaScript.call(this, value)
	}

	/**
	 * Creates a Date representing a time from the given input if it's valid based
	 * on the format.
	 * @param {string} value
	 * @param {string} format
	 * @return {Date}
	 */
	TimeField.prototype.strpdate = function(value, format) {
	  var t = time.strptime(value, format, locales.getDefaultLocale())
	  return new Date(1900, 0, 1, t[3], t[4], t[5])
	}

	module.exports = TimeField

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)

	var ChoiceField = __webpack_require__(77)

	var $__0=  __webpack_require__(2),ValidationError=$__0.ValidationError

	/**
	 * A ChoiceField which returns a value coerced by some provided function.
	 * @constructor
	 * @extends {ChoiceField}
	 * @param {Object=} kwargs
	 */
	var TypedChoiceField = ChoiceField.extend({
	  constructor: function TypedChoiceField(kwargs) {
	    if (!(this instanceof TypedChoiceField)) { return new TypedChoiceField(kwargs) }
	    kwargs = object.extend({
	      coerce: function(val) { return val }, emptyValue: ''
	    }, kwargs)
	    this.coerce = object.pop(kwargs, 'coerce')
	    this.emptyValue = object.pop(kwargs, 'emptyValue')
	    ChoiceField.call(this, kwargs)
	  }
	})

	/**
	 * Validate that the value can be coerced to the right type (if not empty).
	 */
	TypedChoiceField.prototype._coerce = function(value) {
	  if (value === this.emptyValue || this.isEmptyValue(value)) {
	    return this.emptyValue
	  }
	  try {
	    value = this.coerce(value)
	  }
	  catch (e) {
	    throw ValidationError(this.errorMessages.invalidChoice, {
	      code: 'invalidChoice'
	    , params: {value: value}
	    })
	  }
	  return value
	}

	TypedChoiceField.prototype.clean = function(value) {
	  value = ChoiceField.prototype.clean.call(this, value)
	  return this._coerce(value)
	}


	module.exports = TypedChoiceField

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)
	var object = __webpack_require__(6)
	var MultipleChoiceField = __webpack_require__(108)

	var $__0=  __webpack_require__(2),ValidationError=$__0.ValidationError

	/**
	 * A MultipleChoiceField which returns values coerced by some provided function.
	 * @constructor
	 * @extends {MultipleChoiceField}
	 * @param {Object=} kwargs
	 */
	var TypedMultipleChoiceField = MultipleChoiceField.extend({
	  constructor: function TypedMultipleChoiceField(kwargs) {
	    if (!(this instanceof TypedMultipleChoiceField)) { return new TypedMultipleChoiceField(kwargs) }
	    kwargs = object.extend({
	      coerce: function(val) { return val }, emptyValue: []
	    }, kwargs)
	    this.coerce = object.pop(kwargs, 'coerce')
	    this.emptyValue = object.pop(kwargs, 'emptyValue')
	    MultipleChoiceField.call(this, kwargs)
	  }
	})

	TypedMultipleChoiceField.prototype._coerce = function(value) {
	  if (value === this.emptyValue || this.isEmptyValue(value) ||
	      (is.Array(value) && !value.length)) {
	    return this.emptyValue
	  }
	  var newValue = []
	  for (var i = 0, l = value.length; i < l; i++) {
	    try {
	      newValue.push(this.coerce(value[i]))
	    }
	    catch (e) {
	      throw ValidationError(this.errorMessages.invalidChoice, {
	        code: 'invalidChoice'
	      , params: {value: value[i]}
	      })
	    }
	  }
	  return newValue
	}

	TypedMultipleChoiceField.prototype.clean = function(value) {
	  value = MultipleChoiceField.prototype.clean.call(this, value)
	  return this._coerce(value)
	}

	TypedMultipleChoiceField.prototype.validate = function(value) {
	  if (value !== this.emptyValue || (is.Array(value) && value.length)) {
	    MultipleChoiceField.prototype.validate.call(this, value)
	  }
	  else if (this.required) {
	    throw ValidationError(this.errorMessages.required, {code: 'required'})
	  }
	}

	module.exports = TypedMultipleChoiceField

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var url = __webpack_require__(9)

	var CharField = __webpack_require__(66)
	var URLInput = __webpack_require__(129)

	var $__0=  __webpack_require__(2),URLValidator=$__0.URLValidator
	var $__1=  __webpack_require__(15),strip=$__1.strip

	/**
	 * Validates that its input appears to be a valid URL.
	 * @constructor
	 * @extends {CharField}
	 * @param {Object=} kwargs
	 */
	var URLField = CharField.extend({
	  widget: URLInput
	, defaultErrorMessages: {
	    invalid: 'Enter a valid URL.'
	  }
	, defaultValidators: [URLValidator()]

	, constructor: function URLField(kwargs) {
	    if (!(this instanceof URLField)) { return new URLField(kwargs) }
	    CharField.call(this, kwargs)
	  }
	})

	URLField.prototype.toJavaScript = function(value) {
	  if (value) {
	    var urlFields = url.parseUri(value)
	    if (!urlFields.protocol) {
	      // If no URL protocol given, assume http://
	      urlFields.protocol = 'http'
	    }
	    if (!urlFields.path) {
	      // The path portion may need to be added before query params
	      urlFields.path = '/'
	    }
	    value = url.makeUri(urlFields)
	  }
	  return CharField.prototype.toJavaScript.call(this, value)
	}

	URLField.prototype.clean = function(value) {
	  value = strip(this.toJavaScript(value))
	  return CharField.prototype.clean.call(this, value)
	}

	module.exports = URLField

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var TextInput = __webpack_require__(61)

	/**
	 * An HTML <input type="url"> widget.
	 * @constructor
	 * @extends {TextInput}
	 * @param {Object=} kwargs
	 */
	var URLInput = TextInput.extend({
	  constructor: function URLInput(kwargs) {
	    if (!(this instanceof URLInput)) { return new URLInput(kwargs) }
	    TextInput.call(this, kwargs)
	  }
	, inputType: 'url'
	})

	module.exports = URLInput

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	var forms = __webpack_require__(1);
	var moment = __webpack_require__(131);
	var BootstrapForm = __webpack_require__(233);

	/* Forms Locale*/
	forms.addLocale('es', {
	  b: 'ene._feb._mar_abr._may_jun_jul._ago_sept._oct._nov._dec.'.split('_'),
	  B: 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
	  D: 'lunes_martes_miercoles_juesves_viernes_sabado_domingo'.split('_'),
	  DATE_INPUT_FORMATS: ['%d/%m/%Y', '%d/%m/%y', '%d %b %Y', '%d %b %y', '%d %B %Y', '%d %B %y',, '%m/%d/%Y'],
	  DATETIME_INPUT_FORMATS: ['%d/%m/%Y %H:%M:%S', '%d/%m/%Y %H:%M', '%D, %B %d , %H', '%d/%m/%Y', '%m/%d/%Y', '%Y/%m/%d', '%H:%M']
	});

	forms.setDefaultLocale('es');

	/* We are selecting the step of the process by means of the id, and in the case of the 3rd step
	we took advantage of the id_nesting */

	var Header = React.createClass({
	  displayName: 'Header',

	  render: function () {
	    return React.createElement(
	      'div',
	      { className: 'header-booking' },
	      React.createElement(
	        'div',
	        { className: 'container' },
	        React.createElement(
	          'div',
	          { className: 'row' },
	          React.createElement(
	            'div',
	            { className: 'col-md-3' },
	            React.createElement('img', { className: 'img-responsive checkout-logo', alt: 'File logo', src: '/static/images/index/logo-y-nombre.png' })
	          ),
	          React.createElement(
	            'div',
	            { className: 'col-md-5 col-md-offset-2' },
	            React.createElement(
	              'div',
	              { className: 'checkout-col' },
	              React.createElement('i', { className: 'fa fa-user fa-2x checkout-icon', 'aria-hidden': 'true' }),
	              React.createElement(
	                'p',
	                { className: 'checkout-text' },
	                '1.Contacto'
	              )
	            ),
	            React.createElement(
	              'div',
	              { className: 'checkout-col' },
	              React.createElement('i', { className: 'fa fa-long-arrow-right fa-2x checkout-icon arrow', 'aria-hidden': 'true', id: this.props.stepid })
	            ),
	            React.createElement(
	              'div',
	              { className: 'checkout-col' },
	              React.createElement('i', { className: 'fa fa-paw fa-2x checkout-icon', 'aria-hidden': 'true', id: this.props.stepid }),
	              React.createElement(
	                'p',
	                { className: 'checkout-text', id: this.props.stepid },
	                '2.Mascota'
	              )
	            ),
	            React.createElement(
	              'div',
	              { className: 'checkout-col select' },
	              React.createElement('i', { className: 'fa fa-long-arrow-right fa-2x checkout-icon arrow', 'aria-hidden': 'true', id: this.props.stepid })
	            ),
	            React.createElement(
	              'div',
	              { className: 'checkout-col select' },
	              React.createElement('i', { className: 'fa fa-credit-card fa-2x checkout-icon', 'aria-hidden': 'true', id: this.props.stepid }),
	              React.createElement(
	                'p',
	                { className: 'checkout-text', id: this.props.stepid },
	                '3.Pago'
	              )
	            )
	          )
	        )
	      )
	    );
	  }
	});

	var PaymentForm = forms.Form.extend({
	  card_name: forms.CharField({ label: 'Nombre del titular:', required: true }),
	  card_number: forms.CharField({ label: 'Número Tarjeta:', required: true }),
	  exp_date: forms.DateTimeField({ label: 'Fecha Caducidad:', required: true, widget: forms.DateInput({ format: '%M/%Y' }) }),
	  csv: forms.CharField({ label: 'CSV:', required: true })

	});

	var BookingForm = forms.Form.extend({
	  booking_date: forms.DateTimeField({ label: 'Fecha de la cita:', requiered: true, custom: 'readonly', requiered: true, errorMessages: { required: 'Rellena este campo porfavor.' }, format: '%m/%d/%Y' }),
	  booking_hour: forms.DateTimeField({ label: 'Hora de la cita:', custom: 'readonly', requiered: true, errorMessages: { required: 'Rellena éste campo porfavor.' } }),
	  phone_number: forms.CharField({ label: 'Número de teléfono:', requiered: true, errorMessages: { required: 'Rellena éste campo porfavor.' } }),
	  email: forms.EmailField({ label: 'Email:', requiered: true, errorMessages: { invalid: 'Porfavor introduce un email válido.', required: 'Rellena éste campo porfavor.' } }),
	  first_name: forms.CharField({ label: 'Nombre:', requiered: true, errorMessages: { required: 'Rellena éste campo porfavor.' } }),
	  second_name: forms.CharField({ label: 'Apellido:', requiered: true, errorMessages: { required: 'Rellena éste campo porfavor.' } }),
	  adress: forms.CharField({ label: 'Dirección:', requiered: true, errorMessages: { required: 'Rellena éste campo porfavor.' } }),
	  city: forms.CharField({ label: 'Ciudad:', requiered: true, errorMessages: { required: 'Rellena éste campo porfavor.' } }),
	  acceptTerms: forms.BooleanField({ label: 'Acepto los términos de usuario:', required: true, errorMessages: { required: 'Es necesario aceptar los términos de usuario para seguir con el proceso.' } })

	});

	var SPECIES = [['cat', 'Gato'], ['dog', 'Perro'], ['other', 'Otro']];
	var GENDER = [['hembra_normal', 'Hembra Normal'], ['hembra_esterilizada', 'Hembra Esterilizada'], ['macho_normal', 'Macho Normal'], ['macho_esterilizado', 'Macho Esterilizado']];

	var NewPetForm = forms.Form.extend({
	  pet_name: forms.CharField({ label: 'Nombre de la mascota:', required: true, errorMessages: { required: 'Rellena éste campo porfavor.' } }),
	  pet_birthday: forms.CharField({ label: 'Edad (Años):', required: true, errorMessages: { required: 'Rellena éste campo porfavor.' } }),
	  pet_species: forms.ChoiceField({ required: true, label: 'Especie:', choices: SPECIES, errorMessages: { required: 'Rellena éste campo porfavor.' } }),
	  pet_gender: forms.ChoiceField({ required: true, choices: GENDER, label: 'Sexo de la mascota:', errorMessages: { required: 'Selecciona una de las opciones porfavor.' } }),
	  pet_breed: forms.CharField({ label: 'Raza:', required: true, errorMessages: { required: 'Selecciona una de las opciones porfavor.' } })
	});

	var Payment = React.createClass({
	  displayName: 'Payment',

	  render: function () {
	    return React.createElement(
	      'div',
	      { className: 'col-md-5 col-md-offset-1 checkout-form-container' },
	      React.createElement(
	        'p',
	        { className: 'form-title' },
	        'Datos de pago'
	      ),
	      React.createElement(
	        'p',
	        { className: 'form-sub' },
	        'Estás a punto de completar el pago'
	      ),
	      React.createElement(
	        forms.RenderForm,
	        { form: PaymentForm, ref: 'paymentForm' },
	        React.createElement(BootstrapForm, null)
	      ),
	      React.createElement(
	        'button',
	        { className: 'btn-cta-green' },
	        'Pagar'
	      )
	    );
	  },
	  //Esta funcion que hace?
	  onSignup: function (cleanedData) {
	    console.log('on isgnup');
	    //Handle payment right here with the tpv
	    $.ajax({
	      url: "http://localhost:8000/checkout/", // the endpoint
	      type: "POST", // http method
	      data: { data: form.cleanedData }, // data sent with the post request

	      // handle a successful response
	      success: function (json) {
	        $('#post-text').val(''); // remove the value from the input
	        //   console.log(json); // log the returned json to the console
	        console.log("success on post"); // another sanity check
	        window.location.href("http://localhost:8000/payment/");
	      },

	      // handle a non-successful response
	      error: function (xhr, errmsg, err) {
	        $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: " + errmsg + " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
	        console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
	      }
	    });
	  },
	  _onSubmit: function (e) {
	    e.preventDefault();
	    var form = this.refs.paymentForm.getForm();
	    //console.log(form.cleanedData)

	    var isValid = form.validate();
	    if (isValid) {
	      console.log('Submitting pet form');

	      //this.props.nextStep()
	    }
	  }
	});

	//Loads the booking form
	var Booking = React.createClass({
	  displayName: 'Booking',

	  render: function () {
	    return React.createElement(
	      'div',
	      { className: 'col-md-7 checkout-form-container' },
	      React.createElement(
	        'p',
	        { className: 'form-title' },
	        'Reserve su cita'
	      ),
	      React.createElement(
	        'p',
	        { className: 'form-sub' },
	        'Facilítenos alguna información básica porfavor'
	      ),
	      React.createElement(
	        'form',
	        { onSubmit: this._onSubmit },
	        React.createElement(
	          forms.RenderForm,
	          { form: BookingForm, component: 'ul',
	            rowComponent: 'li',
	            ref: 'bookingForm' },
	          React.createElement(BootstrapForm, null)
	        ),
	        React.createElement(
	          'button',
	          { className: 'btn-cta-green' },
	          'Guardar y continuar'
	        )
	      )
	    );
	  },
	  renderDateSelectWidget: function () {
	    $.datetimepicker.setLocale('es');
	    $('#booking_date').datetimepicker({
	      timepicker: false,
	      //  minDate:'-1970/01/0', //yesterday is minimum date(for today use 0 or -1970/01/01)
	      format: 'm/d/Y',
	      lang: 'es'
	    });
	    $('#booking_hour').datetimepicker({
	      datepicker: false,
	      format: 'H:i',
	      lang: 'es',
	      allowTimes: ['08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30', '9:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45']
	    });
	  },
	  componentDidMount: function () {
	    this.renderDateSelectWidget();
	  },
	  onSignup: function (cleanedData) {
	    console.log('on isgnup');
	  },
	  propTypes: {
	    onSignup: React.PropTypes.func.isRequired
	  },
	  /*
	  onFormChange: function(){
	    var form = this.refs.bookingForm.getForm()
	    this.props.updateContactFormParams(form.cleanedData);
	  },*/
	  _onSubmit: function (e) {
	    e.preventDefault();
	    var form = this.refs.bookingForm.getForm();
	    var booking_date_django = this.props.dateDjangoDefault(form.cleanedData.booking_date, form.cleanedData.booking_hour);
	    console.log(booking_date_django);
	    $.ajax({
	      url: "http://localhost:8000/checkout/",
	      type: "POST",
	      data: { step: this.props.step, data: form.cleanedData, booking_date_django: booking_date_django }, // data sent with the post request
	      success: function (json) {},
	      error: function (xhr, errmsg, err) {
	        //NEDD TO HANDLE ERROR AND SUCCESS CHANGES
	        $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: " + errmsg + " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
	        console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
	      }
	    });
	    var isValid = form.validate();
	    if (isValid) {
	      this.onSignup(form.cleanedData);
	      this.props.updateContactFormParams(form.cleanedData);
	      this.props.nextStep();
	    }
	  }
	});

	/* Renders the pet form */
	var NewPet = React.createClass({
	  displayName: 'NewPet',

	  render: function () {
	    return React.createElement(
	      'div',
	      { className: 'col-md-7 checkout-form-container' },
	      React.createElement(
	        'p',
	        { className: 'form-title' },
	        'Registre a su mascota'
	      ),
	      React.createElement(
	        'p',
	        { className: 'form-sub' },
	        'Nos preocupamos por su amigo peludo'
	      ),
	      React.createElement(
	        'form',
	        { onSubmit: this._onSubmit, onChange: this.onFormChange },
	        React.createElement(
	          forms.RenderForm,
	          { form: NewPetForm, ref: 'newPetForm' },
	          React.createElement(BootstrapForm, null)
	        ),
	        React.createElement(
	          'button',
	          { className: 'btn-cta-green' },
	          'Guardar y continuar'
	        )
	      )
	    );
	  },
	  onSignup: function (cleanedData) {
	    console.log('on isgnup');
	  },
	  propTypes: {
	    onSignup: React.PropTypes.func.isRequired
	  },
	  _onSubmit: function (e) {
	    e.preventDefault();
	    var form = this.refs.newPetForm.getForm();
	    console.log(form);
	    $.ajax({
	      url: "http://localhost:8000/checkout/", // the endpoint
	      type: "POST", // http method
	      data: { data: form.cleanedData }, // data sent with the post request

	      // handle a successful response
	      success: function (json) {
	        $('#post-text').val(''); // remove the value from the input
	        window.location.replace('http://localhost:8000/payment/');
	        //   console.log(json); // log the returned json to the console
	        console.log("success"); // another sanity check
	      },

	      // handle a non-successful response
	      error: function (xhr, errmsg, err) {
	        $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: " + errmsg + " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
	        console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
	      }
	    });
	    var isValid = form.validate();
	    if (isValid) {
	      this.onSignup(form.cleanedData);
	      this.props.updatePetFormParams(form.cleanedData);
	      //this.props.nextStep()
	    }
	  }
	});

	/* Shows the status of the payment process */
	var ProgressColumn = React.createClass({
	  displayName: 'ProgressColumn',

	  render: function () {
	    return React.createElement(
	      'div',
	      { className: 'col-md-3 col-progress col-md-offset-1' },
	      React.createElement(
	        'h3',
	        null,
	        'Resumen:'
	      ),
	      React.createElement(
	        'h4',
	        { className: 'title' },
	        'Datos de la cita'
	      ),
	      React.createElement(
	        'h4',
	        null,
	        this.props.date
	      ),
	      React.createElement(
	        'h4',
	        null,
	        this.props.city
	      ),
	      React.createElement(
	        'h4',
	        { className: 'title' },
	        'Contacto'
	      ),
	      React.createElement(
	        'h4',
	        null,
	        this.props.email
	      ),
	      React.createElement(
	        'h4',
	        null,
	        this.props.phone_number
	      ),
	      React.createElement(
	        'h4',
	        { className: 'title' },
	        'Mascota'
	      ),
	      React.createElement(
	        'h4',
	        null,
	        this.props.pet_name
	      ),
	      React.createElement(
	        'h4',
	        null,
	        this.props.pet_breed
	      ),
	      React.createElement(
	        'h4',
	        { className: 'title' },
	        'Pago'
	      ),
	      React.createElement(
	        'h4',
	        null,
	        this.props.payment_status
	      )
	    );
	  }
	});

	/* PARENT TO ALL THE ELEMENTS OF THE APP*/
	var CheckoutContainer = React.createClass({
	  displayName: 'CheckoutContainer',

	  getInitialState: function () {
	    return {
	      step: 1,
	      step_id: 'step1',
	      //Step 1
	      city: ' ',
	      acceptTerms: 'False',
	      booking_date: 'Incompleto',
	      phone_number: 'Incompleto',
	      email: '',
	      first_name: 'Nombre',
	      second_name: 'Apellidos',
	      adress: 'Dirección',
	      //Step 2
	      pet_name: 'Incompleto',
	      pet_birthday: 'Fecha nacimiento mascota',
	      pet_species: 'Gato',
	      pet_gender: 'Hembra normal',
	      pet_breed: '',
	      payment_status: 'Incompleto'
	    };
	  },

	  //    booking_form: new BookingForm,
	  dateStringFormat: function (date, hour) {
	    //Getting Time
	    var minutes = hour.getMinutes();
	    var hours = hour.getHours();
	    var month = date.getUTCMonth();
	    var year = date.getFullYear();
	    //day of the week(0-6)
	    var day = date.getUTCDay();
	    //day of the moth(0-30)
	    var month_day = date.getUTCDate();
	    //Building the String
	    var days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
	    var months = ['Ene', 'Feb', 'Marzo', 'Abr', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Sept', 'Oct', 'Nov', 'Dic'];
	    var date_string = days[day] + ', ' + month_day + ' de ' + months[month] + ' a las ' + hours + ':' + minutes;

	    return date_string;
	  },

	  //Converts UNIX timestamp to date format for progress bar
	  //Problem ... it gets it with two hour delay ...dont know why ..
	  dateDjangoDefault: function (date, hour) {
	    //Getting Time
	    var minutes = hour.getMinutes();
	    var hours = hour.getHours();
	    var month = date.getUTCMonth();
	    var year = date.getFullYear();
	    var day = date.getUTCDate();
	    var seconds = 0;
	    var milliseconds = 0;
	    var date_django = new Date(year, month, day, hours, minutes, seconds, milliseconds);
	    var date_django = date_django.toUTCString();
	    return date_django;
	  },

	  // Updates Contact Form Parameters
	  updateContactFormParams: function (form_params) {
	    var date_string = this.dateStringFormat(form_params.booking_date, form_params.booking_hour);
	    this.setState({
	      city: form_params.city,
	      acceptTerms: form_params.acceptTerms,
	      booking_date: date_string,
	      phone_number: form_params.phone_number,
	      email: form_params.email,
	      first_name: form_params.first_name,
	      second_name: form_params.second_name,
	      adress: form_params.adress
	    });
	  },

	  // Updates Pet Form Parameters
	  updatePetFormParams: function (form_params) {
	    this.setState({
	      pet_name: form_params.pet_name,
	      pet_birthday: form_params.pet_birthday,
	      pet_species: form_params.pet_species,
	      pet_gender: form_params.pet_gender,
	      pet_breed: form_params.pet_breed
	    });
	  },

	  // Increases the state counter in 1
	  nextStep: function () {
	    this.setState({
	      step: this.state.step + 1,
	      step_id: 'step' + this.state.step
	    });
	  },

	  //Decreases the state counter in 1
	  previousStep: function () {
	    this.setState({
	      step: this.state.step - 1
	    });
	  },

	  render: function () {
	    switch (this.state.step) {
	      case 1:
	        return React.createElement(
	          'div',
	          { className: 'container' },
	          React.createElement(Header, { stepid: this.state.step_id }),
	          React.createElement(
	            'div',
	            { className: 'container' },
	            React.createElement(
	              'div',
	              { className: 'row' },
	              React.createElement(Booking, {
	                nextStep: this.nextStep,
	                updateContactFormParams: this.updateContactFormParams,
	                step: this.state.step,
	                dateDjangoDefault: this.dateDjangoDefault
	                //   booking_form={this.state.booking_form}
	              }),
	              React.createElement(ProgressColumn, {
	                city: this.state.city,
	                adress: this.state.adress,
	                date: this.state.booking_date,
	                payment_status: this.state.payment_status,
	                email: this.state.email,
	                phone_number: this.state.phone_number,
	                pet_name: this.state.pet_name,
	                pet_breed: this.state.pet_breed
	              })
	            )
	          )
	        );

	      case 2:
	        return React.createElement(
	          'div',
	          { className: 'container' },
	          React.createElement(Header, { stepid: this.state.step_id, step: this.state.step }),
	          React.createElement(
	            'div',
	            { className: 'row' },
	            React.createElement(NewPet, {
	              nextStep: this.nextStep,
	              updatePetFormParams: this.updatePetFormParams,
	              step: this.state.step
	            }),
	            React.createElement(ProgressColumn, {
	              city: this.state.city,
	              date: this.state.booking_date,
	              payment_status: this.state.payment_status,
	              email: this.state.email,
	              phone_number: this.state.phone_number,
	              pet_name: this.state.pet_name,
	              pet_breed: this.state.pet_breed
	            })
	          )
	        );
	      case 3:
	        return React.createElement(
	          'div',
	          { className: 'container' },
	          React.createElement(Header, null),
	          React.createElement(
	            'div',
	            { className: 'row' },
	            React.createElement(Payment, { nextStep: this.nextStep
	            }),
	            React.createElement(ProgressColumn, {
	              city: this.state.city,
	              date: this.state.booking_date,
	              payment_status: this.state.payment_status,
	              email: this.state.email,
	              phone_number: this.state.phone_number,
	              pet_name: this.state.pet_name,
	              pet_breed: this.state.pet_breed
	            })
	          )
	        );
	    }
	  }
	});

	ReactDOM.render(React.createElement(CheckoutContainer, null), document.getElementById('container-checkout'));

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {//! moment.js
	//! version : 2.13.0
	//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
	//! license : MIT
	//! momentjs.com

	;(function (global, factory) {
	     true ? module.exports = factory() :
	    typeof define === 'function' && define.amd ? define(factory) :
	    global.moment = factory()
	}(this, function () { 'use strict';

	    var hookCallback;

	    function utils_hooks__hooks () {
	        return hookCallback.apply(null, arguments);
	    }

	    // This is done to register the method called with moment()
	    // without creating circular dependencies.
	    function setHookCallback (callback) {
	        hookCallback = callback;
	    }

	    function isArray(input) {
	        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
	    }

	    function isDate(input) {
	        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
	    }

	    function map(arr, fn) {
	        var res = [], i;
	        for (i = 0; i < arr.length; ++i) {
	            res.push(fn(arr[i], i));
	        }
	        return res;
	    }

	    function hasOwnProp(a, b) {
	        return Object.prototype.hasOwnProperty.call(a, b);
	    }

	    function extend(a, b) {
	        for (var i in b) {
	            if (hasOwnProp(b, i)) {
	                a[i] = b[i];
	            }
	        }

	        if (hasOwnProp(b, 'toString')) {
	            a.toString = b.toString;
	        }

	        if (hasOwnProp(b, 'valueOf')) {
	            a.valueOf = b.valueOf;
	        }

	        return a;
	    }

	    function create_utc__createUTC (input, format, locale, strict) {
	        return createLocalOrUTC(input, format, locale, strict, true).utc();
	    }

	    function defaultParsingFlags() {
	        // We need to deep clone this object.
	        return {
	            empty           : false,
	            unusedTokens    : [],
	            unusedInput     : [],
	            overflow        : -2,
	            charsLeftOver   : 0,
	            nullInput       : false,
	            invalidMonth    : null,
	            invalidFormat   : false,
	            userInvalidated : false,
	            iso             : false,
	            parsedDateParts : [],
	            meridiem        : null
	        };
	    }

	    function getParsingFlags(m) {
	        if (m._pf == null) {
	            m._pf = defaultParsingFlags();
	        }
	        return m._pf;
	    }

	    var some;
	    if (Array.prototype.some) {
	        some = Array.prototype.some;
	    } else {
	        some = function (fun) {
	            var t = Object(this);
	            var len = t.length >>> 0;

	            for (var i = 0; i < len; i++) {
	                if (i in t && fun.call(this, t[i], i, t)) {
	                    return true;
	                }
	            }

	            return false;
	        };
	    }

	    function valid__isValid(m) {
	        if (m._isValid == null) {
	            var flags = getParsingFlags(m);
	            var parsedParts = some.call(flags.parsedDateParts, function (i) {
	                return i != null;
	            });
	            m._isValid = !isNaN(m._d.getTime()) &&
	                flags.overflow < 0 &&
	                !flags.empty &&
	                !flags.invalidMonth &&
	                !flags.invalidWeekday &&
	                !flags.nullInput &&
	                !flags.invalidFormat &&
	                !flags.userInvalidated &&
	                (!flags.meridiem || (flags.meridiem && parsedParts));

	            if (m._strict) {
	                m._isValid = m._isValid &&
	                    flags.charsLeftOver === 0 &&
	                    flags.unusedTokens.length === 0 &&
	                    flags.bigHour === undefined;
	            }
	        }
	        return m._isValid;
	    }

	    function valid__createInvalid (flags) {
	        var m = create_utc__createUTC(NaN);
	        if (flags != null) {
	            extend(getParsingFlags(m), flags);
	        }
	        else {
	            getParsingFlags(m).userInvalidated = true;
	        }

	        return m;
	    }

	    function isUndefined(input) {
	        return input === void 0;
	    }

	    // Plugins that add properties should also add the key here (null value),
	    // so we can properly clone ourselves.
	    var momentProperties = utils_hooks__hooks.momentProperties = [];

	    function copyConfig(to, from) {
	        var i, prop, val;

	        if (!isUndefined(from._isAMomentObject)) {
	            to._isAMomentObject = from._isAMomentObject;
	        }
	        if (!isUndefined(from._i)) {
	            to._i = from._i;
	        }
	        if (!isUndefined(from._f)) {
	            to._f = from._f;
	        }
	        if (!isUndefined(from._l)) {
	            to._l = from._l;
	        }
	        if (!isUndefined(from._strict)) {
	            to._strict = from._strict;
	        }
	        if (!isUndefined(from._tzm)) {
	            to._tzm = from._tzm;
	        }
	        if (!isUndefined(from._isUTC)) {
	            to._isUTC = from._isUTC;
	        }
	        if (!isUndefined(from._offset)) {
	            to._offset = from._offset;
	        }
	        if (!isUndefined(from._pf)) {
	            to._pf = getParsingFlags(from);
	        }
	        if (!isUndefined(from._locale)) {
	            to._locale = from._locale;
	        }

	        if (momentProperties.length > 0) {
	            for (i in momentProperties) {
	                prop = momentProperties[i];
	                val = from[prop];
	                if (!isUndefined(val)) {
	                    to[prop] = val;
	                }
	            }
	        }

	        return to;
	    }

	    var updateInProgress = false;

	    // Moment prototype object
	    function Moment(config) {
	        copyConfig(this, config);
	        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
	        // Prevent infinite loop in case updateOffset creates new moment
	        // objects.
	        if (updateInProgress === false) {
	            updateInProgress = true;
	            utils_hooks__hooks.updateOffset(this);
	            updateInProgress = false;
	        }
	    }

	    function isMoment (obj) {
	        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
	    }

	    function absFloor (number) {
	        if (number < 0) {
	            return Math.ceil(number);
	        } else {
	            return Math.floor(number);
	        }
	    }

	    function toInt(argumentForCoercion) {
	        var coercedNumber = +argumentForCoercion,
	            value = 0;

	        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
	            value = absFloor(coercedNumber);
	        }

	        return value;
	    }

	    // compare two arrays, return the number of differences
	    function compareArrays(array1, array2, dontConvert) {
	        var len = Math.min(array1.length, array2.length),
	            lengthDiff = Math.abs(array1.length - array2.length),
	            diffs = 0,
	            i;
	        for (i = 0; i < len; i++) {
	            if ((dontConvert && array1[i] !== array2[i]) ||
	                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
	                diffs++;
	            }
	        }
	        return diffs + lengthDiff;
	    }

	    function warn(msg) {
	        if (utils_hooks__hooks.suppressDeprecationWarnings === false &&
	                (typeof console !==  'undefined') && console.warn) {
	            console.warn('Deprecation warning: ' + msg);
	        }
	    }

	    function deprecate(msg, fn) {
	        var firstTime = true;

	        return extend(function () {
	            if (utils_hooks__hooks.deprecationHandler != null) {
	                utils_hooks__hooks.deprecationHandler(null, msg);
	            }
	            if (firstTime) {
	                warn(msg + '\nArguments: ' + Array.prototype.slice.call(arguments).join(', ') + '\n' + (new Error()).stack);
	                firstTime = false;
	            }
	            return fn.apply(this, arguments);
	        }, fn);
	    }

	    var deprecations = {};

	    function deprecateSimple(name, msg) {
	        if (utils_hooks__hooks.deprecationHandler != null) {
	            utils_hooks__hooks.deprecationHandler(name, msg);
	        }
	        if (!deprecations[name]) {
	            warn(msg);
	            deprecations[name] = true;
	        }
	    }

	    utils_hooks__hooks.suppressDeprecationWarnings = false;
	    utils_hooks__hooks.deprecationHandler = null;

	    function isFunction(input) {
	        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
	    }

	    function isObject(input) {
	        return Object.prototype.toString.call(input) === '[object Object]';
	    }

	    function locale_set__set (config) {
	        var prop, i;
	        for (i in config) {
	            prop = config[i];
	            if (isFunction(prop)) {
	                this[i] = prop;
	            } else {
	                this['_' + i] = prop;
	            }
	        }
	        this._config = config;
	        // Lenient ordinal parsing accepts just a number in addition to
	        // number + (possibly) stuff coming from _ordinalParseLenient.
	        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);
	    }

	    function mergeConfigs(parentConfig, childConfig) {
	        var res = extend({}, parentConfig), prop;
	        for (prop in childConfig) {
	            if (hasOwnProp(childConfig, prop)) {
	                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
	                    res[prop] = {};
	                    extend(res[prop], parentConfig[prop]);
	                    extend(res[prop], childConfig[prop]);
	                } else if (childConfig[prop] != null) {
	                    res[prop] = childConfig[prop];
	                } else {
	                    delete res[prop];
	                }
	            }
	        }
	        return res;
	    }

	    function Locale(config) {
	        if (config != null) {
	            this.set(config);
	        }
	    }

	    var keys;

	    if (Object.keys) {
	        keys = Object.keys;
	    } else {
	        keys = function (obj) {
	            var i, res = [];
	            for (i in obj) {
	                if (hasOwnProp(obj, i)) {
	                    res.push(i);
	                }
	            }
	            return res;
	        };
	    }

	    // internal storage for locale config files
	    var locales = {};
	    var globalLocale;

	    function normalizeLocale(key) {
	        return key ? key.toLowerCase().replace('_', '-') : key;
	    }

	    // pick the locale from the array
	    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
	    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
	    function chooseLocale(names) {
	        var i = 0, j, next, locale, split;

	        while (i < names.length) {
	            split = normalizeLocale(names[i]).split('-');
	            j = split.length;
	            next = normalizeLocale(names[i + 1]);
	            next = next ? next.split('-') : null;
	            while (j > 0) {
	                locale = loadLocale(split.slice(0, j).join('-'));
	                if (locale) {
	                    return locale;
	                }
	                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
	                    //the next array item is better than a shallower substring of this one
	                    break;
	                }
	                j--;
	            }
	            i++;
	        }
	        return null;
	    }

	    function loadLocale(name) {
	        var oldLocale = null;
	        // TODO: Find a better way to register and load all the locales in Node
	        if (!locales[name] && (typeof module !== 'undefined') &&
	                module && module.exports) {
	            try {
	                oldLocale = globalLocale._abbr;
	                __webpack_require__(132)("./" + name);
	                // because defineLocale currently also sets the global locale, we
	                // want to undo that for lazy loaded locales
	                locale_locales__getSetGlobalLocale(oldLocale);
	            } catch (e) { }
	        }
	        return locales[name];
	    }

	    // This function will load locale and then set the global locale.  If
	    // no arguments are passed in, it will simply return the current global
	    // locale key.
	    function locale_locales__getSetGlobalLocale (key, values) {
	        var data;
	        if (key) {
	            if (isUndefined(values)) {
	                data = locale_locales__getLocale(key);
	            }
	            else {
	                data = defineLocale(key, values);
	            }

	            if (data) {
	                // moment.duration._locale = moment._locale = data;
	                globalLocale = data;
	            }
	        }

	        return globalLocale._abbr;
	    }

	    function defineLocale (name, config) {
	        if (config !== null) {
	            config.abbr = name;
	            if (locales[name] != null) {
	                deprecateSimple('defineLocaleOverride',
	                        'use moment.updateLocale(localeName, config) to change ' +
	                        'an existing locale. moment.defineLocale(localeName, ' +
	                        'config) should only be used for creating a new locale');
	                config = mergeConfigs(locales[name]._config, config);
	            } else if (config.parentLocale != null) {
	                if (locales[config.parentLocale] != null) {
	                    config = mergeConfigs(locales[config.parentLocale]._config, config);
	                } else {
	                    // treat as if there is no base config
	                    deprecateSimple('parentLocaleUndefined',
	                            'specified parentLocale is not defined yet');
	                }
	            }
	            locales[name] = new Locale(config);

	            // backwards compat for now: also set the locale
	            locale_locales__getSetGlobalLocale(name);

	            return locales[name];
	        } else {
	            // useful for testing
	            delete locales[name];
	            return null;
	        }
	    }

	    function updateLocale(name, config) {
	        if (config != null) {
	            var locale;
	            if (locales[name] != null) {
	                config = mergeConfigs(locales[name]._config, config);
	            }
	            locale = new Locale(config);
	            locale.parentLocale = locales[name];
	            locales[name] = locale;

	            // backwards compat for now: also set the locale
	            locale_locales__getSetGlobalLocale(name);
	        } else {
	            // pass null for config to unupdate, useful for tests
	            if (locales[name] != null) {
	                if (locales[name].parentLocale != null) {
	                    locales[name] = locales[name].parentLocale;
	                } else if (locales[name] != null) {
	                    delete locales[name];
	                }
	            }
	        }
	        return locales[name];
	    }

	    // returns locale data
	    function locale_locales__getLocale (key) {
	        var locale;

	        if (key && key._locale && key._locale._abbr) {
	            key = key._locale._abbr;
	        }

	        if (!key) {
	            return globalLocale;
	        }

	        if (!isArray(key)) {
	            //short-circuit everything else
	            locale = loadLocale(key);
	            if (locale) {
	                return locale;
	            }
	            key = [key];
	        }

	        return chooseLocale(key);
	    }

	    function locale_locales__listLocales() {
	        return keys(locales);
	    }

	    var aliases = {};

	    function addUnitAlias (unit, shorthand) {
	        var lowerCase = unit.toLowerCase();
	        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
	    }

	    function normalizeUnits(units) {
	        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
	    }

	    function normalizeObjectUnits(inputObject) {
	        var normalizedInput = {},
	            normalizedProp,
	            prop;

	        for (prop in inputObject) {
	            if (hasOwnProp(inputObject, prop)) {
	                normalizedProp = normalizeUnits(prop);
	                if (normalizedProp) {
	                    normalizedInput[normalizedProp] = inputObject[prop];
	                }
	            }
	        }

	        return normalizedInput;
	    }

	    function makeGetSet (unit, keepTime) {
	        return function (value) {
	            if (value != null) {
	                get_set__set(this, unit, value);
	                utils_hooks__hooks.updateOffset(this, keepTime);
	                return this;
	            } else {
	                return get_set__get(this, unit);
	            }
	        };
	    }

	    function get_set__get (mom, unit) {
	        return mom.isValid() ?
	            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
	    }

	    function get_set__set (mom, unit, value) {
	        if (mom.isValid()) {
	            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
	        }
	    }

	    // MOMENTS

	    function getSet (units, value) {
	        var unit;
	        if (typeof units === 'object') {
	            for (unit in units) {
	                this.set(unit, units[unit]);
	            }
	        } else {
	            units = normalizeUnits(units);
	            if (isFunction(this[units])) {
	                return this[units](value);
	            }
	        }
	        return this;
	    }

	    function zeroFill(number, targetLength, forceSign) {
	        var absNumber = '' + Math.abs(number),
	            zerosToFill = targetLength - absNumber.length,
	            sign = number >= 0;
	        return (sign ? (forceSign ? '+' : '') : '-') +
	            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
	    }

	    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

	    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

	    var formatFunctions = {};

	    var formatTokenFunctions = {};

	    // token:    'M'
	    // padded:   ['MM', 2]
	    // ordinal:  'Mo'
	    // callback: function () { this.month() + 1 }
	    function addFormatToken (token, padded, ordinal, callback) {
	        var func = callback;
	        if (typeof callback === 'string') {
	            func = function () {
	                return this[callback]();
	            };
	        }
	        if (token) {
	            formatTokenFunctions[token] = func;
	        }
	        if (padded) {
	            formatTokenFunctions[padded[0]] = function () {
	                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
	            };
	        }
	        if (ordinal) {
	            formatTokenFunctions[ordinal] = function () {
	                return this.localeData().ordinal(func.apply(this, arguments), token);
	            };
	        }
	    }

	    function removeFormattingTokens(input) {
	        if (input.match(/\[[\s\S]/)) {
	            return input.replace(/^\[|\]$/g, '');
	        }
	        return input.replace(/\\/g, '');
	    }

	    function makeFormatFunction(format) {
	        var array = format.match(formattingTokens), i, length;

	        for (i = 0, length = array.length; i < length; i++) {
	            if (formatTokenFunctions[array[i]]) {
	                array[i] = formatTokenFunctions[array[i]];
	            } else {
	                array[i] = removeFormattingTokens(array[i]);
	            }
	        }

	        return function (mom) {
	            var output = '', i;
	            for (i = 0; i < length; i++) {
	                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
	            }
	            return output;
	        };
	    }

	    // format date using native date object
	    function formatMoment(m, format) {
	        if (!m.isValid()) {
	            return m.localeData().invalidDate();
	        }

	        format = expandFormat(format, m.localeData());
	        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

	        return formatFunctions[format](m);
	    }

	    function expandFormat(format, locale) {
	        var i = 5;

	        function replaceLongDateFormatTokens(input) {
	            return locale.longDateFormat(input) || input;
	        }

	        localFormattingTokens.lastIndex = 0;
	        while (i >= 0 && localFormattingTokens.test(format)) {
	            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
	            localFormattingTokens.lastIndex = 0;
	            i -= 1;
	        }

	        return format;
	    }

	    var match1         = /\d/;            //       0 - 9
	    var match2         = /\d\d/;          //      00 - 99
	    var match3         = /\d{3}/;         //     000 - 999
	    var match4         = /\d{4}/;         //    0000 - 9999
	    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
	    var match1to2      = /\d\d?/;         //       0 - 99
	    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
	    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
	    var match1to3      = /\d{1,3}/;       //       0 - 999
	    var match1to4      = /\d{1,4}/;       //       0 - 9999
	    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

	    var matchUnsigned  = /\d+/;           //       0 - inf
	    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

	    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
	    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

	    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

	    // any word (or two) characters or numbers including two/three word month in arabic.
	    // includes scottish gaelic two word and hyphenated months
	    var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;


	    var regexes = {};

	    function addRegexToken (token, regex, strictRegex) {
	        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
	            return (isStrict && strictRegex) ? strictRegex : regex;
	        };
	    }

	    function getParseRegexForToken (token, config) {
	        if (!hasOwnProp(regexes, token)) {
	            return new RegExp(unescapeFormat(token));
	        }

	        return regexes[token](config._strict, config._locale);
	    }

	    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
	    function unescapeFormat(s) {
	        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
	            return p1 || p2 || p3 || p4;
	        }));
	    }

	    function regexEscape(s) {
	        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	    }

	    var tokens = {};

	    function addParseToken (token, callback) {
	        var i, func = callback;
	        if (typeof token === 'string') {
	            token = [token];
	        }
	        if (typeof callback === 'number') {
	            func = function (input, array) {
	                array[callback] = toInt(input);
	            };
	        }
	        for (i = 0; i < token.length; i++) {
	            tokens[token[i]] = func;
	        }
	    }

	    function addWeekParseToken (token, callback) {
	        addParseToken(token, function (input, array, config, token) {
	            config._w = config._w || {};
	            callback(input, config._w, config, token);
	        });
	    }

	    function addTimeToArrayFromToken(token, input, config) {
	        if (input != null && hasOwnProp(tokens, token)) {
	            tokens[token](input, config._a, config, token);
	        }
	    }

	    var YEAR = 0;
	    var MONTH = 1;
	    var DATE = 2;
	    var HOUR = 3;
	    var MINUTE = 4;
	    var SECOND = 5;
	    var MILLISECOND = 6;
	    var WEEK = 7;
	    var WEEKDAY = 8;

	    var indexOf;

	    if (Array.prototype.indexOf) {
	        indexOf = Array.prototype.indexOf;
	    } else {
	        indexOf = function (o) {
	            // I know
	            var i;
	            for (i = 0; i < this.length; ++i) {
	                if (this[i] === o) {
	                    return i;
	                }
	            }
	            return -1;
	        };
	    }

	    function daysInMonth(year, month) {
	        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
	    }

	    // FORMATTING

	    addFormatToken('M', ['MM', 2], 'Mo', function () {
	        return this.month() + 1;
	    });

	    addFormatToken('MMM', 0, 0, function (format) {
	        return this.localeData().monthsShort(this, format);
	    });

	    addFormatToken('MMMM', 0, 0, function (format) {
	        return this.localeData().months(this, format);
	    });

	    // ALIASES

	    addUnitAlias('month', 'M');

	    // PARSING

	    addRegexToken('M',    match1to2);
	    addRegexToken('MM',   match1to2, match2);
	    addRegexToken('MMM',  function (isStrict, locale) {
	        return locale.monthsShortRegex(isStrict);
	    });
	    addRegexToken('MMMM', function (isStrict, locale) {
	        return locale.monthsRegex(isStrict);
	    });

	    addParseToken(['M', 'MM'], function (input, array) {
	        array[MONTH] = toInt(input) - 1;
	    });

	    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
	        var month = config._locale.monthsParse(input, token, config._strict);
	        // if we didn't find a month name, mark the date as invalid.
	        if (month != null) {
	            array[MONTH] = month;
	        } else {
	            getParsingFlags(config).invalidMonth = input;
	        }
	    });

	    // LOCALES

	    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/;
	    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
	    function localeMonths (m, format) {
	        return isArray(this._months) ? this._months[m.month()] :
	            this._months[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
	    }

	    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
	    function localeMonthsShort (m, format) {
	        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
	            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
	    }

	    function units_month__handleStrictParse(monthName, format, strict) {
	        var i, ii, mom, llc = monthName.toLocaleLowerCase();
	        if (!this._monthsParse) {
	            // this is not used
	            this._monthsParse = [];
	            this._longMonthsParse = [];
	            this._shortMonthsParse = [];
	            for (i = 0; i < 12; ++i) {
	                mom = create_utc__createUTC([2000, i]);
	                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
	                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
	            }
	        }

	        if (strict) {
	            if (format === 'MMM') {
	                ii = indexOf.call(this._shortMonthsParse, llc);
	                return ii !== -1 ? ii : null;
	            } else {
	                ii = indexOf.call(this._longMonthsParse, llc);
	                return ii !== -1 ? ii : null;
	            }
	        } else {
	            if (format === 'MMM') {
	                ii = indexOf.call(this._shortMonthsParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._longMonthsParse, llc);
	                return ii !== -1 ? ii : null;
	            } else {
	                ii = indexOf.call(this._longMonthsParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._shortMonthsParse, llc);
	                return ii !== -1 ? ii : null;
	            }
	        }
	    }

	    function localeMonthsParse (monthName, format, strict) {
	        var i, mom, regex;

	        if (this._monthsParseExact) {
	            return units_month__handleStrictParse.call(this, monthName, format, strict);
	        }

	        if (!this._monthsParse) {
	            this._monthsParse = [];
	            this._longMonthsParse = [];
	            this._shortMonthsParse = [];
	        }

	        // TODO: add sorting
	        // Sorting makes sure if one month (or abbr) is a prefix of another
	        // see sorting in computeMonthsParse
	        for (i = 0; i < 12; i++) {
	            // make the regex if we don't have it already
	            mom = create_utc__createUTC([2000, i]);
	            if (strict && !this._longMonthsParse[i]) {
	                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
	                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
	            }
	            if (!strict && !this._monthsParse[i]) {
	                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
	                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
	            }
	            // test the regex
	            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
	                return i;
	            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
	                return i;
	            } else if (!strict && this._monthsParse[i].test(monthName)) {
	                return i;
	            }
	        }
	    }

	    // MOMENTS

	    function setMonth (mom, value) {
	        var dayOfMonth;

	        if (!mom.isValid()) {
	            // No op
	            return mom;
	        }

	        if (typeof value === 'string') {
	            if (/^\d+$/.test(value)) {
	                value = toInt(value);
	            } else {
	                value = mom.localeData().monthsParse(value);
	                // TODO: Another silent failure?
	                if (typeof value !== 'number') {
	                    return mom;
	                }
	            }
	        }

	        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
	        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
	        return mom;
	    }

	    function getSetMonth (value) {
	        if (value != null) {
	            setMonth(this, value);
	            utils_hooks__hooks.updateOffset(this, true);
	            return this;
	        } else {
	            return get_set__get(this, 'Month');
	        }
	    }

	    function getDaysInMonth () {
	        return daysInMonth(this.year(), this.month());
	    }

	    var defaultMonthsShortRegex = matchWord;
	    function monthsShortRegex (isStrict) {
	        if (this._monthsParseExact) {
	            if (!hasOwnProp(this, '_monthsRegex')) {
	                computeMonthsParse.call(this);
	            }
	            if (isStrict) {
	                return this._monthsShortStrictRegex;
	            } else {
	                return this._monthsShortRegex;
	            }
	        } else {
	            return this._monthsShortStrictRegex && isStrict ?
	                this._monthsShortStrictRegex : this._monthsShortRegex;
	        }
	    }

	    var defaultMonthsRegex = matchWord;
	    function monthsRegex (isStrict) {
	        if (this._monthsParseExact) {
	            if (!hasOwnProp(this, '_monthsRegex')) {
	                computeMonthsParse.call(this);
	            }
	            if (isStrict) {
	                return this._monthsStrictRegex;
	            } else {
	                return this._monthsRegex;
	            }
	        } else {
	            return this._monthsStrictRegex && isStrict ?
	                this._monthsStrictRegex : this._monthsRegex;
	        }
	    }

	    function computeMonthsParse () {
	        function cmpLenRev(a, b) {
	            return b.length - a.length;
	        }

	        var shortPieces = [], longPieces = [], mixedPieces = [],
	            i, mom;
	        for (i = 0; i < 12; i++) {
	            // make the regex if we don't have it already
	            mom = create_utc__createUTC([2000, i]);
	            shortPieces.push(this.monthsShort(mom, ''));
	            longPieces.push(this.months(mom, ''));
	            mixedPieces.push(this.months(mom, ''));
	            mixedPieces.push(this.monthsShort(mom, ''));
	        }
	        // Sorting makes sure if one month (or abbr) is a prefix of another it
	        // will match the longer piece.
	        shortPieces.sort(cmpLenRev);
	        longPieces.sort(cmpLenRev);
	        mixedPieces.sort(cmpLenRev);
	        for (i = 0; i < 12; i++) {
	            shortPieces[i] = regexEscape(shortPieces[i]);
	            longPieces[i] = regexEscape(longPieces[i]);
	            mixedPieces[i] = regexEscape(mixedPieces[i]);
	        }

	        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
	        this._monthsShortRegex = this._monthsRegex;
	        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
	        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
	    }

	    function checkOverflow (m) {
	        var overflow;
	        var a = m._a;

	        if (a && getParsingFlags(m).overflow === -2) {
	            overflow =
	                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
	                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
	                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
	                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
	                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
	                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
	                -1;

	            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
	                overflow = DATE;
	            }
	            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
	                overflow = WEEK;
	            }
	            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
	                overflow = WEEKDAY;
	            }

	            getParsingFlags(m).overflow = overflow;
	        }

	        return m;
	    }

	    // iso 8601 regex
	    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
	    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
	    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;

	    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

	    var isoDates = [
	        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
	        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
	        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
	        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
	        ['YYYY-DDD', /\d{4}-\d{3}/],
	        ['YYYY-MM', /\d{4}-\d\d/, false],
	        ['YYYYYYMMDD', /[+-]\d{10}/],
	        ['YYYYMMDD', /\d{8}/],
	        // YYYYMM is NOT allowed by the standard
	        ['GGGG[W]WWE', /\d{4}W\d{3}/],
	        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
	        ['YYYYDDD', /\d{7}/]
	    ];

	    // iso time formats and regexes
	    var isoTimes = [
	        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
	        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
	        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
	        ['HH:mm', /\d\d:\d\d/],
	        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
	        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
	        ['HHmmss', /\d\d\d\d\d\d/],
	        ['HHmm', /\d\d\d\d/],
	        ['HH', /\d\d/]
	    ];

	    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

	    // date from iso format
	    function configFromISO(config) {
	        var i, l,
	            string = config._i,
	            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
	            allowTime, dateFormat, timeFormat, tzFormat;

	        if (match) {
	            getParsingFlags(config).iso = true;

	            for (i = 0, l = isoDates.length; i < l; i++) {
	                if (isoDates[i][1].exec(match[1])) {
	                    dateFormat = isoDates[i][0];
	                    allowTime = isoDates[i][2] !== false;
	                    break;
	                }
	            }
	            if (dateFormat == null) {
	                config._isValid = false;
	                return;
	            }
	            if (match[3]) {
	                for (i = 0, l = isoTimes.length; i < l; i++) {
	                    if (isoTimes[i][1].exec(match[3])) {
	                        // match[2] should be 'T' or space
	                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
	                        break;
	                    }
	                }
	                if (timeFormat == null) {
	                    config._isValid = false;
	                    return;
	                }
	            }
	            if (!allowTime && timeFormat != null) {
	                config._isValid = false;
	                return;
	            }
	            if (match[4]) {
	                if (tzRegex.exec(match[4])) {
	                    tzFormat = 'Z';
	                } else {
	                    config._isValid = false;
	                    return;
	                }
	            }
	            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
	            configFromStringAndFormat(config);
	        } else {
	            config._isValid = false;
	        }
	    }

	    // date from iso format or fallback
	    function configFromString(config) {
	        var matched = aspNetJsonRegex.exec(config._i);

	        if (matched !== null) {
	            config._d = new Date(+matched[1]);
	            return;
	        }

	        configFromISO(config);
	        if (config._isValid === false) {
	            delete config._isValid;
	            utils_hooks__hooks.createFromInputFallback(config);
	        }
	    }

	    utils_hooks__hooks.createFromInputFallback = deprecate(
	        'moment construction falls back to js Date. This is ' +
	        'discouraged and will be removed in upcoming major ' +
	        'release. Please refer to ' +
	        'https://github.com/moment/moment/issues/1407 for more info.',
	        function (config) {
	            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
	        }
	    );

	    function createDate (y, m, d, h, M, s, ms) {
	        //can't just apply() to create a date:
	        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
	        var date = new Date(y, m, d, h, M, s, ms);

	        //the date constructor remaps years 0-99 to 1900-1999
	        if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
	            date.setFullYear(y);
	        }
	        return date;
	    }

	    function createUTCDate (y) {
	        var date = new Date(Date.UTC.apply(null, arguments));

	        //the Date.UTC function remaps years 0-99 to 1900-1999
	        if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
	            date.setUTCFullYear(y);
	        }
	        return date;
	    }

	    // FORMATTING

	    addFormatToken('Y', 0, 0, function () {
	        var y = this.year();
	        return y <= 9999 ? '' + y : '+' + y;
	    });

	    addFormatToken(0, ['YY', 2], 0, function () {
	        return this.year() % 100;
	    });

	    addFormatToken(0, ['YYYY',   4],       0, 'year');
	    addFormatToken(0, ['YYYYY',  5],       0, 'year');
	    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

	    // ALIASES

	    addUnitAlias('year', 'y');

	    // PARSING

	    addRegexToken('Y',      matchSigned);
	    addRegexToken('YY',     match1to2, match2);
	    addRegexToken('YYYY',   match1to4, match4);
	    addRegexToken('YYYYY',  match1to6, match6);
	    addRegexToken('YYYYYY', match1to6, match6);

	    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
	    addParseToken('YYYY', function (input, array) {
	        array[YEAR] = input.length === 2 ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input);
	    });
	    addParseToken('YY', function (input, array) {
	        array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);
	    });
	    addParseToken('Y', function (input, array) {
	        array[YEAR] = parseInt(input, 10);
	    });

	    // HELPERS

	    function daysInYear(year) {
	        return isLeapYear(year) ? 366 : 365;
	    }

	    function isLeapYear(year) {
	        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	    }

	    // HOOKS

	    utils_hooks__hooks.parseTwoDigitYear = function (input) {
	        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
	    };

	    // MOMENTS

	    var getSetYear = makeGetSet('FullYear', true);

	    function getIsLeapYear () {
	        return isLeapYear(this.year());
	    }

	    // start-of-first-week - start-of-year
	    function firstWeekOffset(year, dow, doy) {
	        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
	            fwd = 7 + dow - doy,
	            // first-week day local weekday -- which local weekday is fwd
	            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

	        return -fwdlw + fwd - 1;
	    }

	    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
	    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
	        var localWeekday = (7 + weekday - dow) % 7,
	            weekOffset = firstWeekOffset(year, dow, doy),
	            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
	            resYear, resDayOfYear;

	        if (dayOfYear <= 0) {
	            resYear = year - 1;
	            resDayOfYear = daysInYear(resYear) + dayOfYear;
	        } else if (dayOfYear > daysInYear(year)) {
	            resYear = year + 1;
	            resDayOfYear = dayOfYear - daysInYear(year);
	        } else {
	            resYear = year;
	            resDayOfYear = dayOfYear;
	        }

	        return {
	            year: resYear,
	            dayOfYear: resDayOfYear
	        };
	    }

	    function weekOfYear(mom, dow, doy) {
	        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
	            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
	            resWeek, resYear;

	        if (week < 1) {
	            resYear = mom.year() - 1;
	            resWeek = week + weeksInYear(resYear, dow, doy);
	        } else if (week > weeksInYear(mom.year(), dow, doy)) {
	            resWeek = week - weeksInYear(mom.year(), dow, doy);
	            resYear = mom.year() + 1;
	        } else {
	            resYear = mom.year();
	            resWeek = week;
	        }

	        return {
	            week: resWeek,
	            year: resYear
	        };
	    }

	    function weeksInYear(year, dow, doy) {
	        var weekOffset = firstWeekOffset(year, dow, doy),
	            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
	        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
	    }

	    // Pick the first defined of two or three arguments.
	    function defaults(a, b, c) {
	        if (a != null) {
	            return a;
	        }
	        if (b != null) {
	            return b;
	        }
	        return c;
	    }

	    function currentDateArray(config) {
	        // hooks is actually the exported moment object
	        var nowValue = new Date(utils_hooks__hooks.now());
	        if (config._useUTC) {
	            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
	        }
	        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
	    }

	    // convert an array to a date.
	    // the array should mirror the parameters below
	    // note: all values past the year are optional and will default to the lowest possible value.
	    // [year, month, day , hour, minute, second, millisecond]
	    function configFromArray (config) {
	        var i, date, input = [], currentDate, yearToUse;

	        if (config._d) {
	            return;
	        }

	        currentDate = currentDateArray(config);

	        //compute day of the year from weeks and weekdays
	        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
	            dayOfYearFromWeekInfo(config);
	        }

	        //if the day of the year is set, figure out what it is
	        if (config._dayOfYear) {
	            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

	            if (config._dayOfYear > daysInYear(yearToUse)) {
	                getParsingFlags(config)._overflowDayOfYear = true;
	            }

	            date = createUTCDate(yearToUse, 0, config._dayOfYear);
	            config._a[MONTH] = date.getUTCMonth();
	            config._a[DATE] = date.getUTCDate();
	        }

	        // Default to current date.
	        // * if no year, month, day of month are given, default to today
	        // * if day of month is given, default month and year
	        // * if month is given, default only year
	        // * if year is given, don't default anything
	        for (i = 0; i < 3 && config._a[i] == null; ++i) {
	            config._a[i] = input[i] = currentDate[i];
	        }

	        // Zero out whatever was not defaulted, including time
	        for (; i < 7; i++) {
	            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
	        }

	        // Check for 24:00:00.000
	        if (config._a[HOUR] === 24 &&
	                config._a[MINUTE] === 0 &&
	                config._a[SECOND] === 0 &&
	                config._a[MILLISECOND] === 0) {
	            config._nextDay = true;
	            config._a[HOUR] = 0;
	        }

	        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
	        // Apply timezone offset from input. The actual utcOffset can be changed
	        // with parseZone.
	        if (config._tzm != null) {
	            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
	        }

	        if (config._nextDay) {
	            config._a[HOUR] = 24;
	        }
	    }

	    function dayOfYearFromWeekInfo(config) {
	        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

	        w = config._w;
	        if (w.GG != null || w.W != null || w.E != null) {
	            dow = 1;
	            doy = 4;

	            // TODO: We need to take the current isoWeekYear, but that depends on
	            // how we interpret now (local, utc, fixed offset). So create
	            // a now version of current config (take local/utc/offset flags, and
	            // create now).
	            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year);
	            week = defaults(w.W, 1);
	            weekday = defaults(w.E, 1);
	            if (weekday < 1 || weekday > 7) {
	                weekdayOverflow = true;
	            }
	        } else {
	            dow = config._locale._week.dow;
	            doy = config._locale._week.doy;

	            weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year);
	            week = defaults(w.w, 1);

	            if (w.d != null) {
	                // weekday -- low day numbers are considered next week
	                weekday = w.d;
	                if (weekday < 0 || weekday > 6) {
	                    weekdayOverflow = true;
	                }
	            } else if (w.e != null) {
	                // local weekday -- counting starts from begining of week
	                weekday = w.e + dow;
	                if (w.e < 0 || w.e > 6) {
	                    weekdayOverflow = true;
	                }
	            } else {
	                // default to begining of week
	                weekday = dow;
	            }
	        }
	        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
	            getParsingFlags(config)._overflowWeeks = true;
	        } else if (weekdayOverflow != null) {
	            getParsingFlags(config)._overflowWeekday = true;
	        } else {
	            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
	            config._a[YEAR] = temp.year;
	            config._dayOfYear = temp.dayOfYear;
	        }
	    }

	    // constant that refers to the ISO standard
	    utils_hooks__hooks.ISO_8601 = function () {};

	    // date from string and format string
	    function configFromStringAndFormat(config) {
	        // TODO: Move this to another part of the creation flow to prevent circular deps
	        if (config._f === utils_hooks__hooks.ISO_8601) {
	            configFromISO(config);
	            return;
	        }

	        config._a = [];
	        getParsingFlags(config).empty = true;

	        // This array is used to make a Date, either with `new Date` or `Date.UTC`
	        var string = '' + config._i,
	            i, parsedInput, tokens, token, skipped,
	            stringLength = string.length,
	            totalParsedInputLength = 0;

	        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

	        for (i = 0; i < tokens.length; i++) {
	            token = tokens[i];
	            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
	            // console.log('token', token, 'parsedInput', parsedInput,
	            //         'regex', getParseRegexForToken(token, config));
	            if (parsedInput) {
	                skipped = string.substr(0, string.indexOf(parsedInput));
	                if (skipped.length > 0) {
	                    getParsingFlags(config).unusedInput.push(skipped);
	                }
	                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
	                totalParsedInputLength += parsedInput.length;
	            }
	            // don't parse if it's not a known token
	            if (formatTokenFunctions[token]) {
	                if (parsedInput) {
	                    getParsingFlags(config).empty = false;
	                }
	                else {
	                    getParsingFlags(config).unusedTokens.push(token);
	                }
	                addTimeToArrayFromToken(token, parsedInput, config);
	            }
	            else if (config._strict && !parsedInput) {
	                getParsingFlags(config).unusedTokens.push(token);
	            }
	        }

	        // add remaining unparsed input length to the string
	        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
	        if (string.length > 0) {
	            getParsingFlags(config).unusedInput.push(string);
	        }

	        // clear _12h flag if hour is <= 12
	        if (getParsingFlags(config).bigHour === true &&
	                config._a[HOUR] <= 12 &&
	                config._a[HOUR] > 0) {
	            getParsingFlags(config).bigHour = undefined;
	        }

	        getParsingFlags(config).parsedDateParts = config._a.slice(0);
	        getParsingFlags(config).meridiem = config._meridiem;
	        // handle meridiem
	        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

	        configFromArray(config);
	        checkOverflow(config);
	    }


	    function meridiemFixWrap (locale, hour, meridiem) {
	        var isPm;

	        if (meridiem == null) {
	            // nothing to do
	            return hour;
	        }
	        if (locale.meridiemHour != null) {
	            return locale.meridiemHour(hour, meridiem);
	        } else if (locale.isPM != null) {
	            // Fallback
	            isPm = locale.isPM(meridiem);
	            if (isPm && hour < 12) {
	                hour += 12;
	            }
	            if (!isPm && hour === 12) {
	                hour = 0;
	            }
	            return hour;
	        } else {
	            // this is not supposed to happen
	            return hour;
	        }
	    }

	    // date from string and array of format strings
	    function configFromStringAndArray(config) {
	        var tempConfig,
	            bestMoment,

	            scoreToBeat,
	            i,
	            currentScore;

	        if (config._f.length === 0) {
	            getParsingFlags(config).invalidFormat = true;
	            config._d = new Date(NaN);
	            return;
	        }

	        for (i = 0; i < config._f.length; i++) {
	            currentScore = 0;
	            tempConfig = copyConfig({}, config);
	            if (config._useUTC != null) {
	                tempConfig._useUTC = config._useUTC;
	            }
	            tempConfig._f = config._f[i];
	            configFromStringAndFormat(tempConfig);

	            if (!valid__isValid(tempConfig)) {
	                continue;
	            }

	            // if there is any input that was not parsed add a penalty for that format
	            currentScore += getParsingFlags(tempConfig).charsLeftOver;

	            //or tokens
	            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

	            getParsingFlags(tempConfig).score = currentScore;

	            if (scoreToBeat == null || currentScore < scoreToBeat) {
	                scoreToBeat = currentScore;
	                bestMoment = tempConfig;
	            }
	        }

	        extend(config, bestMoment || tempConfig);
	    }

	    function configFromObject(config) {
	        if (config._d) {
	            return;
	        }

	        var i = normalizeObjectUnits(config._i);
	        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
	            return obj && parseInt(obj, 10);
	        });

	        configFromArray(config);
	    }

	    function createFromConfig (config) {
	        var res = new Moment(checkOverflow(prepareConfig(config)));
	        if (res._nextDay) {
	            // Adding is smart enough around DST
	            res.add(1, 'd');
	            res._nextDay = undefined;
	        }

	        return res;
	    }

	    function prepareConfig (config) {
	        var input = config._i,
	            format = config._f;

	        config._locale = config._locale || locale_locales__getLocale(config._l);

	        if (input === null || (format === undefined && input === '')) {
	            return valid__createInvalid({nullInput: true});
	        }

	        if (typeof input === 'string') {
	            config._i = input = config._locale.preparse(input);
	        }

	        if (isMoment(input)) {
	            return new Moment(checkOverflow(input));
	        } else if (isArray(format)) {
	            configFromStringAndArray(config);
	        } else if (format) {
	            configFromStringAndFormat(config);
	        } else if (isDate(input)) {
	            config._d = input;
	        } else {
	            configFromInput(config);
	        }

	        if (!valid__isValid(config)) {
	            config._d = null;
	        }

	        return config;
	    }

	    function configFromInput(config) {
	        var input = config._i;
	        if (input === undefined) {
	            config._d = new Date(utils_hooks__hooks.now());
	        } else if (isDate(input)) {
	            config._d = new Date(input.valueOf());
	        } else if (typeof input === 'string') {
	            configFromString(config);
	        } else if (isArray(input)) {
	            config._a = map(input.slice(0), function (obj) {
	                return parseInt(obj, 10);
	            });
	            configFromArray(config);
	        } else if (typeof(input) === 'object') {
	            configFromObject(config);
	        } else if (typeof(input) === 'number') {
	            // from milliseconds
	            config._d = new Date(input);
	        } else {
	            utils_hooks__hooks.createFromInputFallback(config);
	        }
	    }

	    function createLocalOrUTC (input, format, locale, strict, isUTC) {
	        var c = {};

	        if (typeof(locale) === 'boolean') {
	            strict = locale;
	            locale = undefined;
	        }
	        // object construction must be done this way.
	        // https://github.com/moment/moment/issues/1423
	        c._isAMomentObject = true;
	        c._useUTC = c._isUTC = isUTC;
	        c._l = locale;
	        c._i = input;
	        c._f = format;
	        c._strict = strict;

	        return createFromConfig(c);
	    }

	    function local__createLocal (input, format, locale, strict) {
	        return createLocalOrUTC(input, format, locale, strict, false);
	    }

	    var prototypeMin = deprecate(
	         'moment().min is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
	         function () {
	             var other = local__createLocal.apply(null, arguments);
	             if (this.isValid() && other.isValid()) {
	                 return other < this ? this : other;
	             } else {
	                 return valid__createInvalid();
	             }
	         }
	     );

	    var prototypeMax = deprecate(
	        'moment().max is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
	        function () {
	            var other = local__createLocal.apply(null, arguments);
	            if (this.isValid() && other.isValid()) {
	                return other > this ? this : other;
	            } else {
	                return valid__createInvalid();
	            }
	        }
	    );

	    // Pick a moment m from moments so that m[fn](other) is true for all
	    // other. This relies on the function fn to be transitive.
	    //
	    // moments should either be an array of moment objects or an array, whose
	    // first element is an array of moment objects.
	    function pickBy(fn, moments) {
	        var res, i;
	        if (moments.length === 1 && isArray(moments[0])) {
	            moments = moments[0];
	        }
	        if (!moments.length) {
	            return local__createLocal();
	        }
	        res = moments[0];
	        for (i = 1; i < moments.length; ++i) {
	            if (!moments[i].isValid() || moments[i][fn](res)) {
	                res = moments[i];
	            }
	        }
	        return res;
	    }

	    // TODO: Use [].sort instead?
	    function min () {
	        var args = [].slice.call(arguments, 0);

	        return pickBy('isBefore', args);
	    }

	    function max () {
	        var args = [].slice.call(arguments, 0);

	        return pickBy('isAfter', args);
	    }

	    var now = function () {
	        return Date.now ? Date.now() : +(new Date());
	    };

	    function Duration (duration) {
	        var normalizedInput = normalizeObjectUnits(duration),
	            years = normalizedInput.year || 0,
	            quarters = normalizedInput.quarter || 0,
	            months = normalizedInput.month || 0,
	            weeks = normalizedInput.week || 0,
	            days = normalizedInput.day || 0,
	            hours = normalizedInput.hour || 0,
	            minutes = normalizedInput.minute || 0,
	            seconds = normalizedInput.second || 0,
	            milliseconds = normalizedInput.millisecond || 0;

	        // representation for dateAddRemove
	        this._milliseconds = +milliseconds +
	            seconds * 1e3 + // 1000
	            minutes * 6e4 + // 1000 * 60
	            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
	        // Because of dateAddRemove treats 24 hours as different from a
	        // day when working around DST, we need to store them separately
	        this._days = +days +
	            weeks * 7;
	        // It is impossible translate months into days without knowing
	        // which months you are are talking about, so we have to store
	        // it separately.
	        this._months = +months +
	            quarters * 3 +
	            years * 12;

	        this._data = {};

	        this._locale = locale_locales__getLocale();

	        this._bubble();
	    }

	    function isDuration (obj) {
	        return obj instanceof Duration;
	    }

	    // FORMATTING

	    function offset (token, separator) {
	        addFormatToken(token, 0, 0, function () {
	            var offset = this.utcOffset();
	            var sign = '+';
	            if (offset < 0) {
	                offset = -offset;
	                sign = '-';
	            }
	            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
	        });
	    }

	    offset('Z', ':');
	    offset('ZZ', '');

	    // PARSING

	    addRegexToken('Z',  matchShortOffset);
	    addRegexToken('ZZ', matchShortOffset);
	    addParseToken(['Z', 'ZZ'], function (input, array, config) {
	        config._useUTC = true;
	        config._tzm = offsetFromString(matchShortOffset, input);
	    });

	    // HELPERS

	    // timezone chunker
	    // '+10:00' > ['10',  '00']
	    // '-1530'  > ['-15', '30']
	    var chunkOffset = /([\+\-]|\d\d)/gi;

	    function offsetFromString(matcher, string) {
	        var matches = ((string || '').match(matcher) || []);
	        var chunk   = matches[matches.length - 1] || [];
	        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
	        var minutes = +(parts[1] * 60) + toInt(parts[2]);

	        return parts[0] === '+' ? minutes : -minutes;
	    }

	    // Return a moment from input, that is local/utc/zone equivalent to model.
	    function cloneWithOffset(input, model) {
	        var res, diff;
	        if (model._isUTC) {
	            res = model.clone();
	            diff = (isMoment(input) || isDate(input) ? input.valueOf() : local__createLocal(input).valueOf()) - res.valueOf();
	            // Use low-level api, because this fn is low-level api.
	            res._d.setTime(res._d.valueOf() + diff);
	            utils_hooks__hooks.updateOffset(res, false);
	            return res;
	        } else {
	            return local__createLocal(input).local();
	        }
	    }

	    function getDateOffset (m) {
	        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
	        // https://github.com/moment/moment/pull/1871
	        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
	    }

	    // HOOKS

	    // This function will be called whenever a moment is mutated.
	    // It is intended to keep the offset in sync with the timezone.
	    utils_hooks__hooks.updateOffset = function () {};

	    // MOMENTS

	    // keepLocalTime = true means only change the timezone, without
	    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
	    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
	    // +0200, so we adjust the time as needed, to be valid.
	    //
	    // Keeping the time actually adds/subtracts (one hour)
	    // from the actual represented time. That is why we call updateOffset
	    // a second time. In case it wants us to change the offset again
	    // _changeInProgress == true case, then we have to adjust, because
	    // there is no such time in the given timezone.
	    function getSetOffset (input, keepLocalTime) {
	        var offset = this._offset || 0,
	            localAdjust;
	        if (!this.isValid()) {
	            return input != null ? this : NaN;
	        }
	        if (input != null) {
	            if (typeof input === 'string') {
	                input = offsetFromString(matchShortOffset, input);
	            } else if (Math.abs(input) < 16) {
	                input = input * 60;
	            }
	            if (!this._isUTC && keepLocalTime) {
	                localAdjust = getDateOffset(this);
	            }
	            this._offset = input;
	            this._isUTC = true;
	            if (localAdjust != null) {
	                this.add(localAdjust, 'm');
	            }
	            if (offset !== input) {
	                if (!keepLocalTime || this._changeInProgress) {
	                    add_subtract__addSubtract(this, create__createDuration(input - offset, 'm'), 1, false);
	                } else if (!this._changeInProgress) {
	                    this._changeInProgress = true;
	                    utils_hooks__hooks.updateOffset(this, true);
	                    this._changeInProgress = null;
	                }
	            }
	            return this;
	        } else {
	            return this._isUTC ? offset : getDateOffset(this);
	        }
	    }

	    function getSetZone (input, keepLocalTime) {
	        if (input != null) {
	            if (typeof input !== 'string') {
	                input = -input;
	            }

	            this.utcOffset(input, keepLocalTime);

	            return this;
	        } else {
	            return -this.utcOffset();
	        }
	    }

	    function setOffsetToUTC (keepLocalTime) {
	        return this.utcOffset(0, keepLocalTime);
	    }

	    function setOffsetToLocal (keepLocalTime) {
	        if (this._isUTC) {
	            this.utcOffset(0, keepLocalTime);
	            this._isUTC = false;

	            if (keepLocalTime) {
	                this.subtract(getDateOffset(this), 'm');
	            }
	        }
	        return this;
	    }

	    function setOffsetToParsedOffset () {
	        if (this._tzm) {
	            this.utcOffset(this._tzm);
	        } else if (typeof this._i === 'string') {
	            this.utcOffset(offsetFromString(matchOffset, this._i));
	        }
	        return this;
	    }

	    function hasAlignedHourOffset (input) {
	        if (!this.isValid()) {
	            return false;
	        }
	        input = input ? local__createLocal(input).utcOffset() : 0;

	        return (this.utcOffset() - input) % 60 === 0;
	    }

	    function isDaylightSavingTime () {
	        return (
	            this.utcOffset() > this.clone().month(0).utcOffset() ||
	            this.utcOffset() > this.clone().month(5).utcOffset()
	        );
	    }

	    function isDaylightSavingTimeShifted () {
	        if (!isUndefined(this._isDSTShifted)) {
	            return this._isDSTShifted;
	        }

	        var c = {};

	        copyConfig(c, this);
	        c = prepareConfig(c);

	        if (c._a) {
	            var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);
	            this._isDSTShifted = this.isValid() &&
	                compareArrays(c._a, other.toArray()) > 0;
	        } else {
	            this._isDSTShifted = false;
	        }

	        return this._isDSTShifted;
	    }

	    function isLocal () {
	        return this.isValid() ? !this._isUTC : false;
	    }

	    function isUtcOffset () {
	        return this.isValid() ? this._isUTC : false;
	    }

	    function isUtc () {
	        return this.isValid() ? this._isUTC && this._offset === 0 : false;
	    }

	    // ASP.NET json date format regex
	    var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/;

	    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
	    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
	    // and further modified to allow for strings containing both week and day
	    var isoRegex = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;

	    function create__createDuration (input, key) {
	        var duration = input,
	            // matching against regexp is expensive, do it on demand
	            match = null,
	            sign,
	            ret,
	            diffRes;

	        if (isDuration(input)) {
	            duration = {
	                ms : input._milliseconds,
	                d  : input._days,
	                M  : input._months
	            };
	        } else if (typeof input === 'number') {
	            duration = {};
	            if (key) {
	                duration[key] = input;
	            } else {
	                duration.milliseconds = input;
	            }
	        } else if (!!(match = aspNetRegex.exec(input))) {
	            sign = (match[1] === '-') ? -1 : 1;
	            duration = {
	                y  : 0,
	                d  : toInt(match[DATE])        * sign,
	                h  : toInt(match[HOUR])        * sign,
	                m  : toInt(match[MINUTE])      * sign,
	                s  : toInt(match[SECOND])      * sign,
	                ms : toInt(match[MILLISECOND]) * sign
	            };
	        } else if (!!(match = isoRegex.exec(input))) {
	            sign = (match[1] === '-') ? -1 : 1;
	            duration = {
	                y : parseIso(match[2], sign),
	                M : parseIso(match[3], sign),
	                w : parseIso(match[4], sign),
	                d : parseIso(match[5], sign),
	                h : parseIso(match[6], sign),
	                m : parseIso(match[7], sign),
	                s : parseIso(match[8], sign)
	            };
	        } else if (duration == null) {// checks for null or undefined
	            duration = {};
	        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
	            diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to));

	            duration = {};
	            duration.ms = diffRes.milliseconds;
	            duration.M = diffRes.months;
	        }

	        ret = new Duration(duration);

	        if (isDuration(input) && hasOwnProp(input, '_locale')) {
	            ret._locale = input._locale;
	        }

	        return ret;
	    }

	    create__createDuration.fn = Duration.prototype;

	    function parseIso (inp, sign) {
	        // We'd normally use ~~inp for this, but unfortunately it also
	        // converts floats to ints.
	        // inp may be undefined, so careful calling replace on it.
	        var res = inp && parseFloat(inp.replace(',', '.'));
	        // apply sign while we're at it
	        return (isNaN(res) ? 0 : res) * sign;
	    }

	    function positiveMomentsDifference(base, other) {
	        var res = {milliseconds: 0, months: 0};

	        res.months = other.month() - base.month() +
	            (other.year() - base.year()) * 12;
	        if (base.clone().add(res.months, 'M').isAfter(other)) {
	            --res.months;
	        }

	        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

	        return res;
	    }

	    function momentsDifference(base, other) {
	        var res;
	        if (!(base.isValid() && other.isValid())) {
	            return {milliseconds: 0, months: 0};
	        }

	        other = cloneWithOffset(other, base);
	        if (base.isBefore(other)) {
	            res = positiveMomentsDifference(base, other);
	        } else {
	            res = positiveMomentsDifference(other, base);
	            res.milliseconds = -res.milliseconds;
	            res.months = -res.months;
	        }

	        return res;
	    }

	    function absRound (number) {
	        if (number < 0) {
	            return Math.round(-1 * number) * -1;
	        } else {
	            return Math.round(number);
	        }
	    }

	    // TODO: remove 'name' arg after deprecation is removed
	    function createAdder(direction, name) {
	        return function (val, period) {
	            var dur, tmp;
	            //invert the arguments, but complain about it
	            if (period !== null && !isNaN(+period)) {
	                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
	                tmp = val; val = period; period = tmp;
	            }

	            val = typeof val === 'string' ? +val : val;
	            dur = create__createDuration(val, period);
	            add_subtract__addSubtract(this, dur, direction);
	            return this;
	        };
	    }

	    function add_subtract__addSubtract (mom, duration, isAdding, updateOffset) {
	        var milliseconds = duration._milliseconds,
	            days = absRound(duration._days),
	            months = absRound(duration._months);

	        if (!mom.isValid()) {
	            // No op
	            return;
	        }

	        updateOffset = updateOffset == null ? true : updateOffset;

	        if (milliseconds) {
	            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
	        }
	        if (days) {
	            get_set__set(mom, 'Date', get_set__get(mom, 'Date') + days * isAdding);
	        }
	        if (months) {
	            setMonth(mom, get_set__get(mom, 'Month') + months * isAdding);
	        }
	        if (updateOffset) {
	            utils_hooks__hooks.updateOffset(mom, days || months);
	        }
	    }

	    var add_subtract__add      = createAdder(1, 'add');
	    var add_subtract__subtract = createAdder(-1, 'subtract');

	    function moment_calendar__calendar (time, formats) {
	        // We want to compare the start of today, vs this.
	        // Getting start-of-today depends on whether we're local/utc/offset or not.
	        var now = time || local__createLocal(),
	            sod = cloneWithOffset(now, this).startOf('day'),
	            diff = this.diff(sod, 'days', true),
	            format = diff < -6 ? 'sameElse' :
	                diff < -1 ? 'lastWeek' :
	                diff < 0 ? 'lastDay' :
	                diff < 1 ? 'sameDay' :
	                diff < 2 ? 'nextDay' :
	                diff < 7 ? 'nextWeek' : 'sameElse';

	        var output = formats && (isFunction(formats[format]) ? formats[format]() : formats[format]);

	        return this.format(output || this.localeData().calendar(format, this, local__createLocal(now)));
	    }

	    function clone () {
	        return new Moment(this);
	    }

	    function isAfter (input, units) {
	        var localInput = isMoment(input) ? input : local__createLocal(input);
	        if (!(this.isValid() && localInput.isValid())) {
	            return false;
	        }
	        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
	        if (units === 'millisecond') {
	            return this.valueOf() > localInput.valueOf();
	        } else {
	            return localInput.valueOf() < this.clone().startOf(units).valueOf();
	        }
	    }

	    function isBefore (input, units) {
	        var localInput = isMoment(input) ? input : local__createLocal(input);
	        if (!(this.isValid() && localInput.isValid())) {
	            return false;
	        }
	        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
	        if (units === 'millisecond') {
	            return this.valueOf() < localInput.valueOf();
	        } else {
	            return this.clone().endOf(units).valueOf() < localInput.valueOf();
	        }
	    }

	    function isBetween (from, to, units, inclusivity) {
	        inclusivity = inclusivity || '()';
	        return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
	            (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
	    }

	    function isSame (input, units) {
	        var localInput = isMoment(input) ? input : local__createLocal(input),
	            inputMs;
	        if (!(this.isValid() && localInput.isValid())) {
	            return false;
	        }
	        units = normalizeUnits(units || 'millisecond');
	        if (units === 'millisecond') {
	            return this.valueOf() === localInput.valueOf();
	        } else {
	            inputMs = localInput.valueOf();
	            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
	        }
	    }

	    function isSameOrAfter (input, units) {
	        return this.isSame(input, units) || this.isAfter(input,units);
	    }

	    function isSameOrBefore (input, units) {
	        return this.isSame(input, units) || this.isBefore(input,units);
	    }

	    function diff (input, units, asFloat) {
	        var that,
	            zoneDelta,
	            delta, output;

	        if (!this.isValid()) {
	            return NaN;
	        }

	        that = cloneWithOffset(input, this);

	        if (!that.isValid()) {
	            return NaN;
	        }

	        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

	        units = normalizeUnits(units);

	        if (units === 'year' || units === 'month' || units === 'quarter') {
	            output = monthDiff(this, that);
	            if (units === 'quarter') {
	                output = output / 3;
	            } else if (units === 'year') {
	                output = output / 12;
	            }
	        } else {
	            delta = this - that;
	            output = units === 'second' ? delta / 1e3 : // 1000
	                units === 'minute' ? delta / 6e4 : // 1000 * 60
	                units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
	                units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
	                units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
	                delta;
	        }
	        return asFloat ? output : absFloor(output);
	    }

	    function monthDiff (a, b) {
	        // difference in months
	        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
	            // b is in (anchor - 1 month, anchor + 1 month)
	            anchor = a.clone().add(wholeMonthDiff, 'months'),
	            anchor2, adjust;

	        if (b - anchor < 0) {
	            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
	            // linear across the month
	            adjust = (b - anchor) / (anchor - anchor2);
	        } else {
	            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
	            // linear across the month
	            adjust = (b - anchor) / (anchor2 - anchor);
	        }

	        //check for negative zero, return zero if negative zero
	        return -(wholeMonthDiff + adjust) || 0;
	    }

	    utils_hooks__hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
	    utils_hooks__hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

	    function toString () {
	        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
	    }

	    function moment_format__toISOString () {
	        var m = this.clone().utc();
	        if (0 < m.year() && m.year() <= 9999) {
	            if (isFunction(Date.prototype.toISOString)) {
	                // native implementation is ~50x faster, use it when we can
	                return this.toDate().toISOString();
	            } else {
	                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
	            }
	        } else {
	            return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
	        }
	    }

	    function format (inputString) {
	        if (!inputString) {
	            inputString = this.isUtc() ? utils_hooks__hooks.defaultFormatUtc : utils_hooks__hooks.defaultFormat;
	        }
	        var output = formatMoment(this, inputString);
	        return this.localeData().postformat(output);
	    }

	    function from (time, withoutSuffix) {
	        if (this.isValid() &&
	                ((isMoment(time) && time.isValid()) ||
	                 local__createLocal(time).isValid())) {
	            return create__createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
	        } else {
	            return this.localeData().invalidDate();
	        }
	    }

	    function fromNow (withoutSuffix) {
	        return this.from(local__createLocal(), withoutSuffix);
	    }

	    function to (time, withoutSuffix) {
	        if (this.isValid() &&
	                ((isMoment(time) && time.isValid()) ||
	                 local__createLocal(time).isValid())) {
	            return create__createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
	        } else {
	            return this.localeData().invalidDate();
	        }
	    }

	    function toNow (withoutSuffix) {
	        return this.to(local__createLocal(), withoutSuffix);
	    }

	    // If passed a locale key, it will set the locale for this
	    // instance.  Otherwise, it will return the locale configuration
	    // variables for this instance.
	    function locale (key) {
	        var newLocaleData;

	        if (key === undefined) {
	            return this._locale._abbr;
	        } else {
	            newLocaleData = locale_locales__getLocale(key);
	            if (newLocaleData != null) {
	                this._locale = newLocaleData;
	            }
	            return this;
	        }
	    }

	    var lang = deprecate(
	        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
	        function (key) {
	            if (key === undefined) {
	                return this.localeData();
	            } else {
	                return this.locale(key);
	            }
	        }
	    );

	    function localeData () {
	        return this._locale;
	    }

	    function startOf (units) {
	        units = normalizeUnits(units);
	        // the following switch intentionally omits break keywords
	        // to utilize falling through the cases.
	        switch (units) {
	        case 'year':
	            this.month(0);
	            /* falls through */
	        case 'quarter':
	        case 'month':
	            this.date(1);
	            /* falls through */
	        case 'week':
	        case 'isoWeek':
	        case 'day':
	        case 'date':
	            this.hours(0);
	            /* falls through */
	        case 'hour':
	            this.minutes(0);
	            /* falls through */
	        case 'minute':
	            this.seconds(0);
	            /* falls through */
	        case 'second':
	            this.milliseconds(0);
	        }

	        // weeks are a special case
	        if (units === 'week') {
	            this.weekday(0);
	        }
	        if (units === 'isoWeek') {
	            this.isoWeekday(1);
	        }

	        // quarters are also special
	        if (units === 'quarter') {
	            this.month(Math.floor(this.month() / 3) * 3);
	        }

	        return this;
	    }

	    function endOf (units) {
	        units = normalizeUnits(units);
	        if (units === undefined || units === 'millisecond') {
	            return this;
	        }

	        // 'date' is an alias for 'day', so it should be considered as such.
	        if (units === 'date') {
	            units = 'day';
	        }

	        return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
	    }

	    function to_type__valueOf () {
	        return this._d.valueOf() - ((this._offset || 0) * 60000);
	    }

	    function unix () {
	        return Math.floor(this.valueOf() / 1000);
	    }

	    function toDate () {
	        return this._offset ? new Date(this.valueOf()) : this._d;
	    }

	    function toArray () {
	        var m = this;
	        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
	    }

	    function toObject () {
	        var m = this;
	        return {
	            years: m.year(),
	            months: m.month(),
	            date: m.date(),
	            hours: m.hours(),
	            minutes: m.minutes(),
	            seconds: m.seconds(),
	            milliseconds: m.milliseconds()
	        };
	    }

	    function toJSON () {
	        // new Date(NaN).toJSON() === null
	        return this.isValid() ? this.toISOString() : null;
	    }

	    function moment_valid__isValid () {
	        return valid__isValid(this);
	    }

	    function parsingFlags () {
	        return extend({}, getParsingFlags(this));
	    }

	    function invalidAt () {
	        return getParsingFlags(this).overflow;
	    }

	    function creationData() {
	        return {
	            input: this._i,
	            format: this._f,
	            locale: this._locale,
	            isUTC: this._isUTC,
	            strict: this._strict
	        };
	    }

	    // FORMATTING

	    addFormatToken(0, ['gg', 2], 0, function () {
	        return this.weekYear() % 100;
	    });

	    addFormatToken(0, ['GG', 2], 0, function () {
	        return this.isoWeekYear() % 100;
	    });

	    function addWeekYearFormatToken (token, getter) {
	        addFormatToken(0, [token, token.length], 0, getter);
	    }

	    addWeekYearFormatToken('gggg',     'weekYear');
	    addWeekYearFormatToken('ggggg',    'weekYear');
	    addWeekYearFormatToken('GGGG',  'isoWeekYear');
	    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

	    // ALIASES

	    addUnitAlias('weekYear', 'gg');
	    addUnitAlias('isoWeekYear', 'GG');

	    // PARSING

	    addRegexToken('G',      matchSigned);
	    addRegexToken('g',      matchSigned);
	    addRegexToken('GG',     match1to2, match2);
	    addRegexToken('gg',     match1to2, match2);
	    addRegexToken('GGGG',   match1to4, match4);
	    addRegexToken('gggg',   match1to4, match4);
	    addRegexToken('GGGGG',  match1to6, match6);
	    addRegexToken('ggggg',  match1to6, match6);

	    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
	        week[token.substr(0, 2)] = toInt(input);
	    });

	    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
	        week[token] = utils_hooks__hooks.parseTwoDigitYear(input);
	    });

	    // MOMENTS

	    function getSetWeekYear (input) {
	        return getSetWeekYearHelper.call(this,
	                input,
	                this.week(),
	                this.weekday(),
	                this.localeData()._week.dow,
	                this.localeData()._week.doy);
	    }

	    function getSetISOWeekYear (input) {
	        return getSetWeekYearHelper.call(this,
	                input, this.isoWeek(), this.isoWeekday(), 1, 4);
	    }

	    function getISOWeeksInYear () {
	        return weeksInYear(this.year(), 1, 4);
	    }

	    function getWeeksInYear () {
	        var weekInfo = this.localeData()._week;
	        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
	    }

	    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
	        var weeksTarget;
	        if (input == null) {
	            return weekOfYear(this, dow, doy).year;
	        } else {
	            weeksTarget = weeksInYear(input, dow, doy);
	            if (week > weeksTarget) {
	                week = weeksTarget;
	            }
	            return setWeekAll.call(this, input, week, weekday, dow, doy);
	        }
	    }

	    function setWeekAll(weekYear, week, weekday, dow, doy) {
	        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
	            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

	        this.year(date.getUTCFullYear());
	        this.month(date.getUTCMonth());
	        this.date(date.getUTCDate());
	        return this;
	    }

	    // FORMATTING

	    addFormatToken('Q', 0, 'Qo', 'quarter');

	    // ALIASES

	    addUnitAlias('quarter', 'Q');

	    // PARSING

	    addRegexToken('Q', match1);
	    addParseToken('Q', function (input, array) {
	        array[MONTH] = (toInt(input) - 1) * 3;
	    });

	    // MOMENTS

	    function getSetQuarter (input) {
	        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
	    }

	    // FORMATTING

	    addFormatToken('w', ['ww', 2], 'wo', 'week');
	    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

	    // ALIASES

	    addUnitAlias('week', 'w');
	    addUnitAlias('isoWeek', 'W');

	    // PARSING

	    addRegexToken('w',  match1to2);
	    addRegexToken('ww', match1to2, match2);
	    addRegexToken('W',  match1to2);
	    addRegexToken('WW', match1to2, match2);

	    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
	        week[token.substr(0, 1)] = toInt(input);
	    });

	    // HELPERS

	    // LOCALES

	    function localeWeek (mom) {
	        return weekOfYear(mom, this._week.dow, this._week.doy).week;
	    }

	    var defaultLocaleWeek = {
	        dow : 0, // Sunday is the first day of the week.
	        doy : 6  // The week that contains Jan 1st is the first week of the year.
	    };

	    function localeFirstDayOfWeek () {
	        return this._week.dow;
	    }

	    function localeFirstDayOfYear () {
	        return this._week.doy;
	    }

	    // MOMENTS

	    function getSetWeek (input) {
	        var week = this.localeData().week(this);
	        return input == null ? week : this.add((input - week) * 7, 'd');
	    }

	    function getSetISOWeek (input) {
	        var week = weekOfYear(this, 1, 4).week;
	        return input == null ? week : this.add((input - week) * 7, 'd');
	    }

	    // FORMATTING

	    addFormatToken('D', ['DD', 2], 'Do', 'date');

	    // ALIASES

	    addUnitAlias('date', 'D');

	    // PARSING

	    addRegexToken('D',  match1to2);
	    addRegexToken('DD', match1to2, match2);
	    addRegexToken('Do', function (isStrict, locale) {
	        return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
	    });

	    addParseToken(['D', 'DD'], DATE);
	    addParseToken('Do', function (input, array) {
	        array[DATE] = toInt(input.match(match1to2)[0], 10);
	    });

	    // MOMENTS

	    var getSetDayOfMonth = makeGetSet('Date', true);

	    // FORMATTING

	    addFormatToken('d', 0, 'do', 'day');

	    addFormatToken('dd', 0, 0, function (format) {
	        return this.localeData().weekdaysMin(this, format);
	    });

	    addFormatToken('ddd', 0, 0, function (format) {
	        return this.localeData().weekdaysShort(this, format);
	    });

	    addFormatToken('dddd', 0, 0, function (format) {
	        return this.localeData().weekdays(this, format);
	    });

	    addFormatToken('e', 0, 0, 'weekday');
	    addFormatToken('E', 0, 0, 'isoWeekday');

	    // ALIASES

	    addUnitAlias('day', 'd');
	    addUnitAlias('weekday', 'e');
	    addUnitAlias('isoWeekday', 'E');

	    // PARSING

	    addRegexToken('d',    match1to2);
	    addRegexToken('e',    match1to2);
	    addRegexToken('E',    match1to2);
	    addRegexToken('dd',   function (isStrict, locale) {
	        return locale.weekdaysMinRegex(isStrict);
	    });
	    addRegexToken('ddd',   function (isStrict, locale) {
	        return locale.weekdaysShortRegex(isStrict);
	    });
	    addRegexToken('dddd',   function (isStrict, locale) {
	        return locale.weekdaysRegex(isStrict);
	    });

	    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
	        var weekday = config._locale.weekdaysParse(input, token, config._strict);
	        // if we didn't get a weekday name, mark the date as invalid
	        if (weekday != null) {
	            week.d = weekday;
	        } else {
	            getParsingFlags(config).invalidWeekday = input;
	        }
	    });

	    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
	        week[token] = toInt(input);
	    });

	    // HELPERS

	    function parseWeekday(input, locale) {
	        if (typeof input !== 'string') {
	            return input;
	        }

	        if (!isNaN(input)) {
	            return parseInt(input, 10);
	        }

	        input = locale.weekdaysParse(input);
	        if (typeof input === 'number') {
	            return input;
	        }

	        return null;
	    }

	    // LOCALES

	    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
	    function localeWeekdays (m, format) {
	        return isArray(this._weekdays) ? this._weekdays[m.day()] :
	            this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
	    }

	    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
	    function localeWeekdaysShort (m) {
	        return this._weekdaysShort[m.day()];
	    }

	    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
	    function localeWeekdaysMin (m) {
	        return this._weekdaysMin[m.day()];
	    }

	    function day_of_week__handleStrictParse(weekdayName, format, strict) {
	        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
	        if (!this._weekdaysParse) {
	            this._weekdaysParse = [];
	            this._shortWeekdaysParse = [];
	            this._minWeekdaysParse = [];

	            for (i = 0; i < 7; ++i) {
	                mom = create_utc__createUTC([2000, 1]).day(i);
	                this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
	                this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
	                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
	            }
	        }

	        if (strict) {
	            if (format === 'dddd') {
	                ii = indexOf.call(this._weekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            } else if (format === 'ddd') {
	                ii = indexOf.call(this._shortWeekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            } else {
	                ii = indexOf.call(this._minWeekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            }
	        } else {
	            if (format === 'dddd') {
	                ii = indexOf.call(this._weekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._shortWeekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._minWeekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            } else if (format === 'ddd') {
	                ii = indexOf.call(this._shortWeekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._weekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._minWeekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            } else {
	                ii = indexOf.call(this._minWeekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._weekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._shortWeekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            }
	        }
	    }

	    function localeWeekdaysParse (weekdayName, format, strict) {
	        var i, mom, regex;

	        if (this._weekdaysParseExact) {
	            return day_of_week__handleStrictParse.call(this, weekdayName, format, strict);
	        }

	        if (!this._weekdaysParse) {
	            this._weekdaysParse = [];
	            this._minWeekdaysParse = [];
	            this._shortWeekdaysParse = [];
	            this._fullWeekdaysParse = [];
	        }

	        for (i = 0; i < 7; i++) {
	            // make the regex if we don't have it already

	            mom = create_utc__createUTC([2000, 1]).day(i);
	            if (strict && !this._fullWeekdaysParse[i]) {
	                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
	                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
	                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
	            }
	            if (!this._weekdaysParse[i]) {
	                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
	                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
	            }
	            // test the regex
	            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
	                return i;
	            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
	                return i;
	            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
	                return i;
	            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
	                return i;
	            }
	        }
	    }

	    // MOMENTS

	    function getSetDayOfWeek (input) {
	        if (!this.isValid()) {
	            return input != null ? this : NaN;
	        }
	        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
	        if (input != null) {
	            input = parseWeekday(input, this.localeData());
	            return this.add(input - day, 'd');
	        } else {
	            return day;
	        }
	    }

	    function getSetLocaleDayOfWeek (input) {
	        if (!this.isValid()) {
	            return input != null ? this : NaN;
	        }
	        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
	        return input == null ? weekday : this.add(input - weekday, 'd');
	    }

	    function getSetISODayOfWeek (input) {
	        if (!this.isValid()) {
	            return input != null ? this : NaN;
	        }
	        // behaves the same as moment#day except
	        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
	        // as a setter, sunday should belong to the previous week.
	        return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
	    }

	    var defaultWeekdaysRegex = matchWord;
	    function weekdaysRegex (isStrict) {
	        if (this._weekdaysParseExact) {
	            if (!hasOwnProp(this, '_weekdaysRegex')) {
	                computeWeekdaysParse.call(this);
	            }
	            if (isStrict) {
	                return this._weekdaysStrictRegex;
	            } else {
	                return this._weekdaysRegex;
	            }
	        } else {
	            return this._weekdaysStrictRegex && isStrict ?
	                this._weekdaysStrictRegex : this._weekdaysRegex;
	        }
	    }

	    var defaultWeekdaysShortRegex = matchWord;
	    function weekdaysShortRegex (isStrict) {
	        if (this._weekdaysParseExact) {
	            if (!hasOwnProp(this, '_weekdaysRegex')) {
	                computeWeekdaysParse.call(this);
	            }
	            if (isStrict) {
	                return this._weekdaysShortStrictRegex;
	            } else {
	                return this._weekdaysShortRegex;
	            }
	        } else {
	            return this._weekdaysShortStrictRegex && isStrict ?
	                this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
	        }
	    }

	    var defaultWeekdaysMinRegex = matchWord;
	    function weekdaysMinRegex (isStrict) {
	        if (this._weekdaysParseExact) {
	            if (!hasOwnProp(this, '_weekdaysRegex')) {
	                computeWeekdaysParse.call(this);
	            }
	            if (isStrict) {
	                return this._weekdaysMinStrictRegex;
	            } else {
	                return this._weekdaysMinRegex;
	            }
	        } else {
	            return this._weekdaysMinStrictRegex && isStrict ?
	                this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
	        }
	    }


	    function computeWeekdaysParse () {
	        function cmpLenRev(a, b) {
	            return b.length - a.length;
	        }

	        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
	            i, mom, minp, shortp, longp;
	        for (i = 0; i < 7; i++) {
	            // make the regex if we don't have it already
	            mom = create_utc__createUTC([2000, 1]).day(i);
	            minp = this.weekdaysMin(mom, '');
	            shortp = this.weekdaysShort(mom, '');
	            longp = this.weekdays(mom, '');
	            minPieces.push(minp);
	            shortPieces.push(shortp);
	            longPieces.push(longp);
	            mixedPieces.push(minp);
	            mixedPieces.push(shortp);
	            mixedPieces.push(longp);
	        }
	        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
	        // will match the longer piece.
	        minPieces.sort(cmpLenRev);
	        shortPieces.sort(cmpLenRev);
	        longPieces.sort(cmpLenRev);
	        mixedPieces.sort(cmpLenRev);
	        for (i = 0; i < 7; i++) {
	            shortPieces[i] = regexEscape(shortPieces[i]);
	            longPieces[i] = regexEscape(longPieces[i]);
	            mixedPieces[i] = regexEscape(mixedPieces[i]);
	        }

	        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
	        this._weekdaysShortRegex = this._weekdaysRegex;
	        this._weekdaysMinRegex = this._weekdaysRegex;

	        this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
	        this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
	        this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
	    }

	    // FORMATTING

	    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

	    // ALIASES

	    addUnitAlias('dayOfYear', 'DDD');

	    // PARSING

	    addRegexToken('DDD',  match1to3);
	    addRegexToken('DDDD', match3);
	    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
	        config._dayOfYear = toInt(input);
	    });

	    // HELPERS

	    // MOMENTS

	    function getSetDayOfYear (input) {
	        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
	        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
	    }

	    // FORMATTING

	    function hFormat() {
	        return this.hours() % 12 || 12;
	    }

	    function kFormat() {
	        return this.hours() || 24;
	    }

	    addFormatToken('H', ['HH', 2], 0, 'hour');
	    addFormatToken('h', ['hh', 2], 0, hFormat);
	    addFormatToken('k', ['kk', 2], 0, kFormat);

	    addFormatToken('hmm', 0, 0, function () {
	        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
	    });

	    addFormatToken('hmmss', 0, 0, function () {
	        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
	            zeroFill(this.seconds(), 2);
	    });

	    addFormatToken('Hmm', 0, 0, function () {
	        return '' + this.hours() + zeroFill(this.minutes(), 2);
	    });

	    addFormatToken('Hmmss', 0, 0, function () {
	        return '' + this.hours() + zeroFill(this.minutes(), 2) +
	            zeroFill(this.seconds(), 2);
	    });

	    function meridiem (token, lowercase) {
	        addFormatToken(token, 0, 0, function () {
	            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
	        });
	    }

	    meridiem('a', true);
	    meridiem('A', false);

	    // ALIASES

	    addUnitAlias('hour', 'h');

	    // PARSING

	    function matchMeridiem (isStrict, locale) {
	        return locale._meridiemParse;
	    }

	    addRegexToken('a',  matchMeridiem);
	    addRegexToken('A',  matchMeridiem);
	    addRegexToken('H',  match1to2);
	    addRegexToken('h',  match1to2);
	    addRegexToken('HH', match1to2, match2);
	    addRegexToken('hh', match1to2, match2);

	    addRegexToken('hmm', match3to4);
	    addRegexToken('hmmss', match5to6);
	    addRegexToken('Hmm', match3to4);
	    addRegexToken('Hmmss', match5to6);

	    addParseToken(['H', 'HH'], HOUR);
	    addParseToken(['a', 'A'], function (input, array, config) {
	        config._isPm = config._locale.isPM(input);
	        config._meridiem = input;
	    });
	    addParseToken(['h', 'hh'], function (input, array, config) {
	        array[HOUR] = toInt(input);
	        getParsingFlags(config).bigHour = true;
	    });
	    addParseToken('hmm', function (input, array, config) {
	        var pos = input.length - 2;
	        array[HOUR] = toInt(input.substr(0, pos));
	        array[MINUTE] = toInt(input.substr(pos));
	        getParsingFlags(config).bigHour = true;
	    });
	    addParseToken('hmmss', function (input, array, config) {
	        var pos1 = input.length - 4;
	        var pos2 = input.length - 2;
	        array[HOUR] = toInt(input.substr(0, pos1));
	        array[MINUTE] = toInt(input.substr(pos1, 2));
	        array[SECOND] = toInt(input.substr(pos2));
	        getParsingFlags(config).bigHour = true;
	    });
	    addParseToken('Hmm', function (input, array, config) {
	        var pos = input.length - 2;
	        array[HOUR] = toInt(input.substr(0, pos));
	        array[MINUTE] = toInt(input.substr(pos));
	    });
	    addParseToken('Hmmss', function (input, array, config) {
	        var pos1 = input.length - 4;
	        var pos2 = input.length - 2;
	        array[HOUR] = toInt(input.substr(0, pos1));
	        array[MINUTE] = toInt(input.substr(pos1, 2));
	        array[SECOND] = toInt(input.substr(pos2));
	    });

	    // LOCALES

	    function localeIsPM (input) {
	        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
	        // Using charAt should be more compatible.
	        return ((input + '').toLowerCase().charAt(0) === 'p');
	    }

	    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
	    function localeMeridiem (hours, minutes, isLower) {
	        if (hours > 11) {
	            return isLower ? 'pm' : 'PM';
	        } else {
	            return isLower ? 'am' : 'AM';
	        }
	    }


	    // MOMENTS

	    // Setting the hour should keep the time, because the user explicitly
	    // specified which hour he wants. So trying to maintain the same hour (in
	    // a new timezone) makes sense. Adding/subtracting hours does not follow
	    // this rule.
	    var getSetHour = makeGetSet('Hours', true);

	    // FORMATTING

	    addFormatToken('m', ['mm', 2], 0, 'minute');

	    // ALIASES

	    addUnitAlias('minute', 'm');

	    // PARSING

	    addRegexToken('m',  match1to2);
	    addRegexToken('mm', match1to2, match2);
	    addParseToken(['m', 'mm'], MINUTE);

	    // MOMENTS

	    var getSetMinute = makeGetSet('Minutes', false);

	    // FORMATTING

	    addFormatToken('s', ['ss', 2], 0, 'second');

	    // ALIASES

	    addUnitAlias('second', 's');

	    // PARSING

	    addRegexToken('s',  match1to2);
	    addRegexToken('ss', match1to2, match2);
	    addParseToken(['s', 'ss'], SECOND);

	    // MOMENTS

	    var getSetSecond = makeGetSet('Seconds', false);

	    // FORMATTING

	    addFormatToken('S', 0, 0, function () {
	        return ~~(this.millisecond() / 100);
	    });

	    addFormatToken(0, ['SS', 2], 0, function () {
	        return ~~(this.millisecond() / 10);
	    });

	    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
	    addFormatToken(0, ['SSSS', 4], 0, function () {
	        return this.millisecond() * 10;
	    });
	    addFormatToken(0, ['SSSSS', 5], 0, function () {
	        return this.millisecond() * 100;
	    });
	    addFormatToken(0, ['SSSSSS', 6], 0, function () {
	        return this.millisecond() * 1000;
	    });
	    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
	        return this.millisecond() * 10000;
	    });
	    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
	        return this.millisecond() * 100000;
	    });
	    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
	        return this.millisecond() * 1000000;
	    });


	    // ALIASES

	    addUnitAlias('millisecond', 'ms');

	    // PARSING

	    addRegexToken('S',    match1to3, match1);
	    addRegexToken('SS',   match1to3, match2);
	    addRegexToken('SSS',  match1to3, match3);

	    var token;
	    for (token = 'SSSS'; token.length <= 9; token += 'S') {
	        addRegexToken(token, matchUnsigned);
	    }

	    function parseMs(input, array) {
	        array[MILLISECOND] = toInt(('0.' + input) * 1000);
	    }

	    for (token = 'S'; token.length <= 9; token += 'S') {
	        addParseToken(token, parseMs);
	    }
	    // MOMENTS

	    var getSetMillisecond = makeGetSet('Milliseconds', false);

	    // FORMATTING

	    addFormatToken('z',  0, 0, 'zoneAbbr');
	    addFormatToken('zz', 0, 0, 'zoneName');

	    // MOMENTS

	    function getZoneAbbr () {
	        return this._isUTC ? 'UTC' : '';
	    }

	    function getZoneName () {
	        return this._isUTC ? 'Coordinated Universal Time' : '';
	    }

	    var momentPrototype__proto = Moment.prototype;

	    momentPrototype__proto.add               = add_subtract__add;
	    momentPrototype__proto.calendar          = moment_calendar__calendar;
	    momentPrototype__proto.clone             = clone;
	    momentPrototype__proto.diff              = diff;
	    momentPrototype__proto.endOf             = endOf;
	    momentPrototype__proto.format            = format;
	    momentPrototype__proto.from              = from;
	    momentPrototype__proto.fromNow           = fromNow;
	    momentPrototype__proto.to                = to;
	    momentPrototype__proto.toNow             = toNow;
	    momentPrototype__proto.get               = getSet;
	    momentPrototype__proto.invalidAt         = invalidAt;
	    momentPrototype__proto.isAfter           = isAfter;
	    momentPrototype__proto.isBefore          = isBefore;
	    momentPrototype__proto.isBetween         = isBetween;
	    momentPrototype__proto.isSame            = isSame;
	    momentPrototype__proto.isSameOrAfter     = isSameOrAfter;
	    momentPrototype__proto.isSameOrBefore    = isSameOrBefore;
	    momentPrototype__proto.isValid           = moment_valid__isValid;
	    momentPrototype__proto.lang              = lang;
	    momentPrototype__proto.locale            = locale;
	    momentPrototype__proto.localeData        = localeData;
	    momentPrototype__proto.max               = prototypeMax;
	    momentPrototype__proto.min               = prototypeMin;
	    momentPrototype__proto.parsingFlags      = parsingFlags;
	    momentPrototype__proto.set               = getSet;
	    momentPrototype__proto.startOf           = startOf;
	    momentPrototype__proto.subtract          = add_subtract__subtract;
	    momentPrototype__proto.toArray           = toArray;
	    momentPrototype__proto.toObject          = toObject;
	    momentPrototype__proto.toDate            = toDate;
	    momentPrototype__proto.toISOString       = moment_format__toISOString;
	    momentPrototype__proto.toJSON            = toJSON;
	    momentPrototype__proto.toString          = toString;
	    momentPrototype__proto.unix              = unix;
	    momentPrototype__proto.valueOf           = to_type__valueOf;
	    momentPrototype__proto.creationData      = creationData;

	    // Year
	    momentPrototype__proto.year       = getSetYear;
	    momentPrototype__proto.isLeapYear = getIsLeapYear;

	    // Week Year
	    momentPrototype__proto.weekYear    = getSetWeekYear;
	    momentPrototype__proto.isoWeekYear = getSetISOWeekYear;

	    // Quarter
	    momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter;

	    // Month
	    momentPrototype__proto.month       = getSetMonth;
	    momentPrototype__proto.daysInMonth = getDaysInMonth;

	    // Week
	    momentPrototype__proto.week           = momentPrototype__proto.weeks        = getSetWeek;
	    momentPrototype__proto.isoWeek        = momentPrototype__proto.isoWeeks     = getSetISOWeek;
	    momentPrototype__proto.weeksInYear    = getWeeksInYear;
	    momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear;

	    // Day
	    momentPrototype__proto.date       = getSetDayOfMonth;
	    momentPrototype__proto.day        = momentPrototype__proto.days             = getSetDayOfWeek;
	    momentPrototype__proto.weekday    = getSetLocaleDayOfWeek;
	    momentPrototype__proto.isoWeekday = getSetISODayOfWeek;
	    momentPrototype__proto.dayOfYear  = getSetDayOfYear;

	    // Hour
	    momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour;

	    // Minute
	    momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute;

	    // Second
	    momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond;

	    // Millisecond
	    momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond;

	    // Offset
	    momentPrototype__proto.utcOffset            = getSetOffset;
	    momentPrototype__proto.utc                  = setOffsetToUTC;
	    momentPrototype__proto.local                = setOffsetToLocal;
	    momentPrototype__proto.parseZone            = setOffsetToParsedOffset;
	    momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset;
	    momentPrototype__proto.isDST                = isDaylightSavingTime;
	    momentPrototype__proto.isDSTShifted         = isDaylightSavingTimeShifted;
	    momentPrototype__proto.isLocal              = isLocal;
	    momentPrototype__proto.isUtcOffset          = isUtcOffset;
	    momentPrototype__proto.isUtc                = isUtc;
	    momentPrototype__proto.isUTC                = isUtc;

	    // Timezone
	    momentPrototype__proto.zoneAbbr = getZoneAbbr;
	    momentPrototype__proto.zoneName = getZoneName;

	    // Deprecations
	    momentPrototype__proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
	    momentPrototype__proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
	    momentPrototype__proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
	    momentPrototype__proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779', getSetZone);

	    var momentPrototype = momentPrototype__proto;

	    function moment__createUnix (input) {
	        return local__createLocal(input * 1000);
	    }

	    function moment__createInZone () {
	        return local__createLocal.apply(null, arguments).parseZone();
	    }

	    var defaultCalendar = {
	        sameDay : '[Today at] LT',
	        nextDay : '[Tomorrow at] LT',
	        nextWeek : 'dddd [at] LT',
	        lastDay : '[Yesterday at] LT',
	        lastWeek : '[Last] dddd [at] LT',
	        sameElse : 'L'
	    };

	    function locale_calendar__calendar (key, mom, now) {
	        var output = this._calendar[key];
	        return isFunction(output) ? output.call(mom, now) : output;
	    }

	    var defaultLongDateFormat = {
	        LTS  : 'h:mm:ss A',
	        LT   : 'h:mm A',
	        L    : 'MM/DD/YYYY',
	        LL   : 'MMMM D, YYYY',
	        LLL  : 'MMMM D, YYYY h:mm A',
	        LLLL : 'dddd, MMMM D, YYYY h:mm A'
	    };

	    function longDateFormat (key) {
	        var format = this._longDateFormat[key],
	            formatUpper = this._longDateFormat[key.toUpperCase()];

	        if (format || !formatUpper) {
	            return format;
	        }

	        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
	            return val.slice(1);
	        });

	        return this._longDateFormat[key];
	    }

	    var defaultInvalidDate = 'Invalid date';

	    function invalidDate () {
	        return this._invalidDate;
	    }

	    var defaultOrdinal = '%d';
	    var defaultOrdinalParse = /\d{1,2}/;

	    function ordinal (number) {
	        return this._ordinal.replace('%d', number);
	    }

	    function preParsePostFormat (string) {
	        return string;
	    }

	    var defaultRelativeTime = {
	        future : 'in %s',
	        past   : '%s ago',
	        s  : 'a few seconds',
	        m  : 'a minute',
	        mm : '%d minutes',
	        h  : 'an hour',
	        hh : '%d hours',
	        d  : 'a day',
	        dd : '%d days',
	        M  : 'a month',
	        MM : '%d months',
	        y  : 'a year',
	        yy : '%d years'
	    };

	    function relative__relativeTime (number, withoutSuffix, string, isFuture) {
	        var output = this._relativeTime[string];
	        return (isFunction(output)) ?
	            output(number, withoutSuffix, string, isFuture) :
	            output.replace(/%d/i, number);
	    }

	    function pastFuture (diff, output) {
	        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
	        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
	    }

	    var prototype__proto = Locale.prototype;

	    prototype__proto._calendar       = defaultCalendar;
	    prototype__proto.calendar        = locale_calendar__calendar;
	    prototype__proto._longDateFormat = defaultLongDateFormat;
	    prototype__proto.longDateFormat  = longDateFormat;
	    prototype__proto._invalidDate    = defaultInvalidDate;
	    prototype__proto.invalidDate     = invalidDate;
	    prototype__proto._ordinal        = defaultOrdinal;
	    prototype__proto.ordinal         = ordinal;
	    prototype__proto._ordinalParse   = defaultOrdinalParse;
	    prototype__proto.preparse        = preParsePostFormat;
	    prototype__proto.postformat      = preParsePostFormat;
	    prototype__proto._relativeTime   = defaultRelativeTime;
	    prototype__proto.relativeTime    = relative__relativeTime;
	    prototype__proto.pastFuture      = pastFuture;
	    prototype__proto.set             = locale_set__set;

	    // Month
	    prototype__proto.months            =        localeMonths;
	    prototype__proto._months           = defaultLocaleMonths;
	    prototype__proto.monthsShort       =        localeMonthsShort;
	    prototype__proto._monthsShort      = defaultLocaleMonthsShort;
	    prototype__proto.monthsParse       =        localeMonthsParse;
	    prototype__proto._monthsRegex      = defaultMonthsRegex;
	    prototype__proto.monthsRegex       = monthsRegex;
	    prototype__proto._monthsShortRegex = defaultMonthsShortRegex;
	    prototype__proto.monthsShortRegex  = monthsShortRegex;

	    // Week
	    prototype__proto.week = localeWeek;
	    prototype__proto._week = defaultLocaleWeek;
	    prototype__proto.firstDayOfYear = localeFirstDayOfYear;
	    prototype__proto.firstDayOfWeek = localeFirstDayOfWeek;

	    // Day of Week
	    prototype__proto.weekdays       =        localeWeekdays;
	    prototype__proto._weekdays      = defaultLocaleWeekdays;
	    prototype__proto.weekdaysMin    =        localeWeekdaysMin;
	    prototype__proto._weekdaysMin   = defaultLocaleWeekdaysMin;
	    prototype__proto.weekdaysShort  =        localeWeekdaysShort;
	    prototype__proto._weekdaysShort = defaultLocaleWeekdaysShort;
	    prototype__proto.weekdaysParse  =        localeWeekdaysParse;

	    prototype__proto._weekdaysRegex      = defaultWeekdaysRegex;
	    prototype__proto.weekdaysRegex       =        weekdaysRegex;
	    prototype__proto._weekdaysShortRegex = defaultWeekdaysShortRegex;
	    prototype__proto.weekdaysShortRegex  =        weekdaysShortRegex;
	    prototype__proto._weekdaysMinRegex   = defaultWeekdaysMinRegex;
	    prototype__proto.weekdaysMinRegex    =        weekdaysMinRegex;

	    // Hours
	    prototype__proto.isPM = localeIsPM;
	    prototype__proto._meridiemParse = defaultLocaleMeridiemParse;
	    prototype__proto.meridiem = localeMeridiem;

	    function lists__get (format, index, field, setter) {
	        var locale = locale_locales__getLocale();
	        var utc = create_utc__createUTC().set(setter, index);
	        return locale[field](utc, format);
	    }

	    function listMonthsImpl (format, index, field) {
	        if (typeof format === 'number') {
	            index = format;
	            format = undefined;
	        }

	        format = format || '';

	        if (index != null) {
	            return lists__get(format, index, field, 'month');
	        }

	        var i;
	        var out = [];
	        for (i = 0; i < 12; i++) {
	            out[i] = lists__get(format, i, field, 'month');
	        }
	        return out;
	    }

	    // ()
	    // (5)
	    // (fmt, 5)
	    // (fmt)
	    // (true)
	    // (true, 5)
	    // (true, fmt, 5)
	    // (true, fmt)
	    function listWeekdaysImpl (localeSorted, format, index, field) {
	        if (typeof localeSorted === 'boolean') {
	            if (typeof format === 'number') {
	                index = format;
	                format = undefined;
	            }

	            format = format || '';
	        } else {
	            format = localeSorted;
	            index = format;
	            localeSorted = false;

	            if (typeof format === 'number') {
	                index = format;
	                format = undefined;
	            }

	            format = format || '';
	        }

	        var locale = locale_locales__getLocale(),
	            shift = localeSorted ? locale._week.dow : 0;

	        if (index != null) {
	            return lists__get(format, (index + shift) % 7, field, 'day');
	        }

	        var i;
	        var out = [];
	        for (i = 0; i < 7; i++) {
	            out[i] = lists__get(format, (i + shift) % 7, field, 'day');
	        }
	        return out;
	    }

	    function lists__listMonths (format, index) {
	        return listMonthsImpl(format, index, 'months');
	    }

	    function lists__listMonthsShort (format, index) {
	        return listMonthsImpl(format, index, 'monthsShort');
	    }

	    function lists__listWeekdays (localeSorted, format, index) {
	        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
	    }

	    function lists__listWeekdaysShort (localeSorted, format, index) {
	        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
	    }

	    function lists__listWeekdaysMin (localeSorted, format, index) {
	        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
	    }

	    locale_locales__getSetGlobalLocale('en', {
	        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (toInt(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        }
	    });

	    // Side effect imports
	    utils_hooks__hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', locale_locales__getSetGlobalLocale);
	    utils_hooks__hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', locale_locales__getLocale);

	    var mathAbs = Math.abs;

	    function duration_abs__abs () {
	        var data           = this._data;

	        this._milliseconds = mathAbs(this._milliseconds);
	        this._days         = mathAbs(this._days);
	        this._months       = mathAbs(this._months);

	        data.milliseconds  = mathAbs(data.milliseconds);
	        data.seconds       = mathAbs(data.seconds);
	        data.minutes       = mathAbs(data.minutes);
	        data.hours         = mathAbs(data.hours);
	        data.months        = mathAbs(data.months);
	        data.years         = mathAbs(data.years);

	        return this;
	    }

	    function duration_add_subtract__addSubtract (duration, input, value, direction) {
	        var other = create__createDuration(input, value);

	        duration._milliseconds += direction * other._milliseconds;
	        duration._days         += direction * other._days;
	        duration._months       += direction * other._months;

	        return duration._bubble();
	    }

	    // supports only 2.0-style add(1, 's') or add(duration)
	    function duration_add_subtract__add (input, value) {
	        return duration_add_subtract__addSubtract(this, input, value, 1);
	    }

	    // supports only 2.0-style subtract(1, 's') or subtract(duration)
	    function duration_add_subtract__subtract (input, value) {
	        return duration_add_subtract__addSubtract(this, input, value, -1);
	    }

	    function absCeil (number) {
	        if (number < 0) {
	            return Math.floor(number);
	        } else {
	            return Math.ceil(number);
	        }
	    }

	    function bubble () {
	        var milliseconds = this._milliseconds;
	        var days         = this._days;
	        var months       = this._months;
	        var data         = this._data;
	        var seconds, minutes, hours, years, monthsFromDays;

	        // if we have a mix of positive and negative values, bubble down first
	        // check: https://github.com/moment/moment/issues/2166
	        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
	                (milliseconds <= 0 && days <= 0 && months <= 0))) {
	            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
	            days = 0;
	            months = 0;
	        }

	        // The following code bubbles up values, see the tests for
	        // examples of what that means.
	        data.milliseconds = milliseconds % 1000;

	        seconds           = absFloor(milliseconds / 1000);
	        data.seconds      = seconds % 60;

	        minutes           = absFloor(seconds / 60);
	        data.minutes      = minutes % 60;

	        hours             = absFloor(minutes / 60);
	        data.hours        = hours % 24;

	        days += absFloor(hours / 24);

	        // convert days to months
	        monthsFromDays = absFloor(daysToMonths(days));
	        months += monthsFromDays;
	        days -= absCeil(monthsToDays(monthsFromDays));

	        // 12 months -> 1 year
	        years = absFloor(months / 12);
	        months %= 12;

	        data.days   = days;
	        data.months = months;
	        data.years  = years;

	        return this;
	    }

	    function daysToMonths (days) {
	        // 400 years have 146097 days (taking into account leap year rules)
	        // 400 years have 12 months === 4800
	        return days * 4800 / 146097;
	    }

	    function monthsToDays (months) {
	        // the reverse of daysToMonths
	        return months * 146097 / 4800;
	    }

	    function as (units) {
	        var days;
	        var months;
	        var milliseconds = this._milliseconds;

	        units = normalizeUnits(units);

	        if (units === 'month' || units === 'year') {
	            days   = this._days   + milliseconds / 864e5;
	            months = this._months + daysToMonths(days);
	            return units === 'month' ? months : months / 12;
	        } else {
	            // handle milliseconds separately because of floating point math errors (issue #1867)
	            days = this._days + Math.round(monthsToDays(this._months));
	            switch (units) {
	                case 'week'   : return days / 7     + milliseconds / 6048e5;
	                case 'day'    : return days         + milliseconds / 864e5;
	                case 'hour'   : return days * 24    + milliseconds / 36e5;
	                case 'minute' : return days * 1440  + milliseconds / 6e4;
	                case 'second' : return days * 86400 + milliseconds / 1000;
	                // Math.floor prevents floating point math errors here
	                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
	                default: throw new Error('Unknown unit ' + units);
	            }
	        }
	    }

	    // TODO: Use this.as('ms')?
	    function duration_as__valueOf () {
	        return (
	            this._milliseconds +
	            this._days * 864e5 +
	            (this._months % 12) * 2592e6 +
	            toInt(this._months / 12) * 31536e6
	        );
	    }

	    function makeAs (alias) {
	        return function () {
	            return this.as(alias);
	        };
	    }

	    var asMilliseconds = makeAs('ms');
	    var asSeconds      = makeAs('s');
	    var asMinutes      = makeAs('m');
	    var asHours        = makeAs('h');
	    var asDays         = makeAs('d');
	    var asWeeks        = makeAs('w');
	    var asMonths       = makeAs('M');
	    var asYears        = makeAs('y');

	    function duration_get__get (units) {
	        units = normalizeUnits(units);
	        return this[units + 's']();
	    }

	    function makeGetter(name) {
	        return function () {
	            return this._data[name];
	        };
	    }

	    var milliseconds = makeGetter('milliseconds');
	    var seconds      = makeGetter('seconds');
	    var minutes      = makeGetter('minutes');
	    var hours        = makeGetter('hours');
	    var days         = makeGetter('days');
	    var months       = makeGetter('months');
	    var years        = makeGetter('years');

	    function weeks () {
	        return absFloor(this.days() / 7);
	    }

	    var round = Math.round;
	    var thresholds = {
	        s: 45,  // seconds to minute
	        m: 45,  // minutes to hour
	        h: 22,  // hours to day
	        d: 26,  // days to month
	        M: 11   // months to year
	    };

	    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
	    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
	        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
	    }

	    function duration_humanize__relativeTime (posNegDuration, withoutSuffix, locale) {
	        var duration = create__createDuration(posNegDuration).abs();
	        var seconds  = round(duration.as('s'));
	        var minutes  = round(duration.as('m'));
	        var hours    = round(duration.as('h'));
	        var days     = round(duration.as('d'));
	        var months   = round(duration.as('M'));
	        var years    = round(duration.as('y'));

	        var a = seconds < thresholds.s && ['s', seconds]  ||
	                minutes <= 1           && ['m']           ||
	                minutes < thresholds.m && ['mm', minutes] ||
	                hours   <= 1           && ['h']           ||
	                hours   < thresholds.h && ['hh', hours]   ||
	                days    <= 1           && ['d']           ||
	                days    < thresholds.d && ['dd', days]    ||
	                months  <= 1           && ['M']           ||
	                months  < thresholds.M && ['MM', months]  ||
	                years   <= 1           && ['y']           || ['yy', years];

	        a[2] = withoutSuffix;
	        a[3] = +posNegDuration > 0;
	        a[4] = locale;
	        return substituteTimeAgo.apply(null, a);
	    }

	    // This function allows you to set a threshold for relative time strings
	    function duration_humanize__getSetRelativeTimeThreshold (threshold, limit) {
	        if (thresholds[threshold] === undefined) {
	            return false;
	        }
	        if (limit === undefined) {
	            return thresholds[threshold];
	        }
	        thresholds[threshold] = limit;
	        return true;
	    }

	    function humanize (withSuffix) {
	        var locale = this.localeData();
	        var output = duration_humanize__relativeTime(this, !withSuffix, locale);

	        if (withSuffix) {
	            output = locale.pastFuture(+this, output);
	        }

	        return locale.postformat(output);
	    }

	    var iso_string__abs = Math.abs;

	    function iso_string__toISOString() {
	        // for ISO strings we do not use the normal bubbling rules:
	        //  * milliseconds bubble up until they become hours
	        //  * days do not bubble at all
	        //  * months bubble up until they become years
	        // This is because there is no context-free conversion between hours and days
	        // (think of clock changes)
	        // and also not between days and months (28-31 days per month)
	        var seconds = iso_string__abs(this._milliseconds) / 1000;
	        var days         = iso_string__abs(this._days);
	        var months       = iso_string__abs(this._months);
	        var minutes, hours, years;

	        // 3600 seconds -> 60 minutes -> 1 hour
	        minutes           = absFloor(seconds / 60);
	        hours             = absFloor(minutes / 60);
	        seconds %= 60;
	        minutes %= 60;

	        // 12 months -> 1 year
	        years  = absFloor(months / 12);
	        months %= 12;


	        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
	        var Y = years;
	        var M = months;
	        var D = days;
	        var h = hours;
	        var m = minutes;
	        var s = seconds;
	        var total = this.asSeconds();

	        if (!total) {
	            // this is the same as C#'s (Noda) and python (isodate)...
	            // but not other JS (goog.date)
	            return 'P0D';
	        }

	        return (total < 0 ? '-' : '') +
	            'P' +
	            (Y ? Y + 'Y' : '') +
	            (M ? M + 'M' : '') +
	            (D ? D + 'D' : '') +
	            ((h || m || s) ? 'T' : '') +
	            (h ? h + 'H' : '') +
	            (m ? m + 'M' : '') +
	            (s ? s + 'S' : '');
	    }

	    var duration_prototype__proto = Duration.prototype;

	    duration_prototype__proto.abs            = duration_abs__abs;
	    duration_prototype__proto.add            = duration_add_subtract__add;
	    duration_prototype__proto.subtract       = duration_add_subtract__subtract;
	    duration_prototype__proto.as             = as;
	    duration_prototype__proto.asMilliseconds = asMilliseconds;
	    duration_prototype__proto.asSeconds      = asSeconds;
	    duration_prototype__proto.asMinutes      = asMinutes;
	    duration_prototype__proto.asHours        = asHours;
	    duration_prototype__proto.asDays         = asDays;
	    duration_prototype__proto.asWeeks        = asWeeks;
	    duration_prototype__proto.asMonths       = asMonths;
	    duration_prototype__proto.asYears        = asYears;
	    duration_prototype__proto.valueOf        = duration_as__valueOf;
	    duration_prototype__proto._bubble        = bubble;
	    duration_prototype__proto.get            = duration_get__get;
	    duration_prototype__proto.milliseconds   = milliseconds;
	    duration_prototype__proto.seconds        = seconds;
	    duration_prototype__proto.minutes        = minutes;
	    duration_prototype__proto.hours          = hours;
	    duration_prototype__proto.days           = days;
	    duration_prototype__proto.weeks          = weeks;
	    duration_prototype__proto.months         = months;
	    duration_prototype__proto.years          = years;
	    duration_prototype__proto.humanize       = humanize;
	    duration_prototype__proto.toISOString    = iso_string__toISOString;
	    duration_prototype__proto.toString       = iso_string__toISOString;
	    duration_prototype__proto.toJSON         = iso_string__toISOString;
	    duration_prototype__proto.locale         = locale;
	    duration_prototype__proto.localeData     = localeData;

	    // Deprecations
	    duration_prototype__proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', iso_string__toISOString);
	    duration_prototype__proto.lang = lang;

	    // Side effect imports

	    // FORMATTING

	    addFormatToken('X', 0, 0, 'unix');
	    addFormatToken('x', 0, 0, 'valueOf');

	    // PARSING

	    addRegexToken('x', matchSigned);
	    addRegexToken('X', matchTimestamp);
	    addParseToken('X', function (input, array, config) {
	        config._d = new Date(parseFloat(input, 10) * 1000);
	    });
	    addParseToken('x', function (input, array, config) {
	        config._d = new Date(toInt(input));
	    });

	    // Side effect imports


	    utils_hooks__hooks.version = '2.13.0';

	    setHookCallback(local__createLocal);

	    utils_hooks__hooks.fn                    = momentPrototype;
	    utils_hooks__hooks.min                   = min;
	    utils_hooks__hooks.max                   = max;
	    utils_hooks__hooks.now                   = now;
	    utils_hooks__hooks.utc                   = create_utc__createUTC;
	    utils_hooks__hooks.unix                  = moment__createUnix;
	    utils_hooks__hooks.months                = lists__listMonths;
	    utils_hooks__hooks.isDate                = isDate;
	    utils_hooks__hooks.locale                = locale_locales__getSetGlobalLocale;
	    utils_hooks__hooks.invalid               = valid__createInvalid;
	    utils_hooks__hooks.duration              = create__createDuration;
	    utils_hooks__hooks.isMoment              = isMoment;
	    utils_hooks__hooks.weekdays              = lists__listWeekdays;
	    utils_hooks__hooks.parseZone             = moment__createInZone;
	    utils_hooks__hooks.localeData            = locale_locales__getLocale;
	    utils_hooks__hooks.isDuration            = isDuration;
	    utils_hooks__hooks.monthsShort           = lists__listMonthsShort;
	    utils_hooks__hooks.weekdaysMin           = lists__listWeekdaysMin;
	    utils_hooks__hooks.defineLocale          = defineLocale;
	    utils_hooks__hooks.updateLocale          = updateLocale;
	    utils_hooks__hooks.locales               = locale_locales__listLocales;
	    utils_hooks__hooks.weekdaysShort         = lists__listWeekdaysShort;
	    utils_hooks__hooks.normalizeUnits        = normalizeUnits;
	    utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;
	    utils_hooks__hooks.prototype             = momentPrototype;

	    var _moment = utils_hooks__hooks;

	    return _moment;

	}));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)(module)))

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./af": 133,
		"./af.js": 133,
		"./ar": 134,
		"./ar-ma": 135,
		"./ar-ma.js": 135,
		"./ar-sa": 136,
		"./ar-sa.js": 136,
		"./ar-tn": 137,
		"./ar-tn.js": 137,
		"./ar.js": 134,
		"./az": 138,
		"./az.js": 138,
		"./be": 139,
		"./be.js": 139,
		"./bg": 140,
		"./bg.js": 140,
		"./bn": 141,
		"./bn.js": 141,
		"./bo": 142,
		"./bo.js": 142,
		"./br": 143,
		"./br.js": 143,
		"./bs": 144,
		"./bs.js": 144,
		"./ca": 145,
		"./ca.js": 145,
		"./cs": 146,
		"./cs.js": 146,
		"./cv": 147,
		"./cv.js": 147,
		"./cy": 148,
		"./cy.js": 148,
		"./da": 149,
		"./da.js": 149,
		"./de": 150,
		"./de-at": 151,
		"./de-at.js": 151,
		"./de.js": 150,
		"./dv": 152,
		"./dv.js": 152,
		"./el": 153,
		"./el.js": 153,
		"./en-au": 154,
		"./en-au.js": 154,
		"./en-ca": 155,
		"./en-ca.js": 155,
		"./en-gb": 156,
		"./en-gb.js": 156,
		"./en-ie": 157,
		"./en-ie.js": 157,
		"./en-nz": 158,
		"./en-nz.js": 158,
		"./eo": 159,
		"./eo.js": 159,
		"./es": 160,
		"./es.js": 160,
		"./et": 161,
		"./et.js": 161,
		"./eu": 162,
		"./eu.js": 162,
		"./fa": 163,
		"./fa.js": 163,
		"./fi": 164,
		"./fi.js": 164,
		"./fo": 165,
		"./fo.js": 165,
		"./fr": 166,
		"./fr-ca": 167,
		"./fr-ca.js": 167,
		"./fr-ch": 168,
		"./fr-ch.js": 168,
		"./fr.js": 166,
		"./fy": 169,
		"./fy.js": 169,
		"./gd": 170,
		"./gd.js": 170,
		"./gl": 171,
		"./gl.js": 171,
		"./he": 172,
		"./he.js": 172,
		"./hi": 173,
		"./hi.js": 173,
		"./hr": 174,
		"./hr.js": 174,
		"./hu": 175,
		"./hu.js": 175,
		"./hy-am": 176,
		"./hy-am.js": 176,
		"./id": 177,
		"./id.js": 177,
		"./is": 178,
		"./is.js": 178,
		"./it": 179,
		"./it.js": 179,
		"./ja": 180,
		"./ja.js": 180,
		"./jv": 181,
		"./jv.js": 181,
		"./ka": 182,
		"./ka.js": 182,
		"./kk": 183,
		"./kk.js": 183,
		"./km": 184,
		"./km.js": 184,
		"./ko": 185,
		"./ko.js": 185,
		"./ky": 186,
		"./ky.js": 186,
		"./lb": 187,
		"./lb.js": 187,
		"./lo": 188,
		"./lo.js": 188,
		"./lt": 189,
		"./lt.js": 189,
		"./lv": 190,
		"./lv.js": 190,
		"./me": 191,
		"./me.js": 191,
		"./mk": 192,
		"./mk.js": 192,
		"./ml": 193,
		"./ml.js": 193,
		"./mr": 194,
		"./mr.js": 194,
		"./ms": 195,
		"./ms-my": 196,
		"./ms-my.js": 196,
		"./ms.js": 195,
		"./my": 197,
		"./my.js": 197,
		"./nb": 198,
		"./nb.js": 198,
		"./ne": 199,
		"./ne.js": 199,
		"./nl": 200,
		"./nl.js": 200,
		"./nn": 201,
		"./nn.js": 201,
		"./pa-in": 202,
		"./pa-in.js": 202,
		"./pl": 203,
		"./pl.js": 203,
		"./pt": 204,
		"./pt-br": 205,
		"./pt-br.js": 205,
		"./pt.js": 204,
		"./ro": 206,
		"./ro.js": 206,
		"./ru": 207,
		"./ru.js": 207,
		"./se": 208,
		"./se.js": 208,
		"./si": 209,
		"./si.js": 209,
		"./sk": 210,
		"./sk.js": 210,
		"./sl": 211,
		"./sl.js": 211,
		"./sq": 212,
		"./sq.js": 212,
		"./sr": 213,
		"./sr-cyrl": 214,
		"./sr-cyrl.js": 214,
		"./sr.js": 213,
		"./ss": 215,
		"./ss.js": 215,
		"./sv": 216,
		"./sv.js": 216,
		"./sw": 217,
		"./sw.js": 217,
		"./ta": 218,
		"./ta.js": 218,
		"./te": 219,
		"./te.js": 219,
		"./th": 220,
		"./th.js": 220,
		"./tl-ph": 221,
		"./tl-ph.js": 221,
		"./tlh": 222,
		"./tlh.js": 222,
		"./tr": 223,
		"./tr.js": 223,
		"./tzl": 224,
		"./tzl.js": 224,
		"./tzm": 225,
		"./tzm-latn": 226,
		"./tzm-latn.js": 226,
		"./tzm.js": 225,
		"./uk": 227,
		"./uk.js": 227,
		"./uz": 228,
		"./uz.js": 228,
		"./vi": 229,
		"./vi.js": 229,
		"./x-pseudo": 230,
		"./x-pseudo.js": 230,
		"./zh-cn": 231,
		"./zh-cn.js": 231,
		"./zh-tw": 232,
		"./zh-tw.js": 232
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 132;


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : afrikaans (af)
	//! author : Werner Mollentze : https://github.com/wernerm

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var af = moment.defineLocale('af', {
	        months : 'Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des'.split('_'),
	        weekdays : 'Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag'.split('_'),
	        weekdaysShort : 'Son_Maa_Din_Woe_Don_Vry_Sat'.split('_'),
	        weekdaysMin : 'So_Ma_Di_Wo_Do_Vr_Sa'.split('_'),
	        meridiemParse: /vm|nm/i,
	        isPM : function (input) {
	            return /^nm$/i.test(input);
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours < 12) {
	                return isLower ? 'vm' : 'VM';
	            } else {
	                return isLower ? 'nm' : 'NM';
	            }
	        },
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[Vandag om] LT',
	            nextDay : '[Môre om] LT',
	            nextWeek : 'dddd [om] LT',
	            lastDay : '[Gister om] LT',
	            lastWeek : '[Laas] dddd [om] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'oor %s',
	            past : '%s gelede',
	            s : '\'n paar sekondes',
	            m : '\'n minuut',
	            mm : '%d minute',
	            h : '\'n uur',
	            hh : '%d ure',
	            d : '\'n dag',
	            dd : '%d dae',
	            M : '\'n maand',
	            MM : '%d maande',
	            y : '\'n jaar',
	            yy : '%d jaar'
	        },
	        ordinalParse: /\d{1,2}(ste|de)/,
	        ordinal : function (number) {
	            return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de'); // Thanks to Joris Röling : https://github.com/jjupiter
	        },
	        week : {
	            dow : 1, // Maandag is die eerste dag van die week.
	            doy : 4  // Die week wat die 4de Januarie bevat is die eerste week van die jaar.
	        }
	    });

	    return af;

	}));

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! Locale: Arabic (ar)
	//! Author: Abdel Said: https://github.com/abdelsaid
	//! Changes in months, weekdays: Ahmed Elkhatib
	//! Native plural forms: forabi https://github.com/forabi

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var symbolMap = {
	        '1': '١',
	        '2': '٢',
	        '3': '٣',
	        '4': '٤',
	        '5': '٥',
	        '6': '٦',
	        '7': '٧',
	        '8': '٨',
	        '9': '٩',
	        '0': '٠'
	    }, numberMap = {
	        '١': '1',
	        '٢': '2',
	        '٣': '3',
	        '٤': '4',
	        '٥': '5',
	        '٦': '6',
	        '٧': '7',
	        '٨': '8',
	        '٩': '9',
	        '٠': '0'
	    }, pluralForm = function (n) {
	        return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
	    }, plurals = {
	        s : ['أقل من ثانية', 'ثانية واحدة', ['ثانيتان', 'ثانيتين'], '%d ثوان', '%d ثانية', '%d ثانية'],
	        m : ['أقل من دقيقة', 'دقيقة واحدة', ['دقيقتان', 'دقيقتين'], '%d دقائق', '%d دقيقة', '%d دقيقة'],
	        h : ['أقل من ساعة', 'ساعة واحدة', ['ساعتان', 'ساعتين'], '%d ساعات', '%d ساعة', '%d ساعة'],
	        d : ['أقل من يوم', 'يوم واحد', ['يومان', 'يومين'], '%d أيام', '%d يومًا', '%d يوم'],
	        M : ['أقل من شهر', 'شهر واحد', ['شهران', 'شهرين'], '%d أشهر', '%d شهرا', '%d شهر'],
	        y : ['أقل من عام', 'عام واحد', ['عامان', 'عامين'], '%d أعوام', '%d عامًا', '%d عام']
	    }, pluralize = function (u) {
	        return function (number, withoutSuffix, string, isFuture) {
	            var f = pluralForm(number),
	                str = plurals[u][pluralForm(number)];
	            if (f === 2) {
	                str = str[withoutSuffix ? 0 : 1];
	            }
	            return str.replace(/%d/i, number);
	        };
	    }, months = [
	        'كانون الثاني يناير',
	        'شباط فبراير',
	        'آذار مارس',
	        'نيسان أبريل',
	        'أيار مايو',
	        'حزيران يونيو',
	        'تموز يوليو',
	        'آب أغسطس',
	        'أيلول سبتمبر',
	        'تشرين الأول أكتوبر',
	        'تشرين الثاني نوفمبر',
	        'كانون الأول ديسمبر'
	    ];

	    var ar = moment.defineLocale('ar', {
	        months : months,
	        monthsShort : months,
	        weekdays : 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
	        weekdaysShort : 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
	        weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'D/\u200FM/\u200FYYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        meridiemParse: /ص|م/,
	        isPM : function (input) {
	            return 'م' === input;
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 12) {
	                return 'ص';
	            } else {
	                return 'م';
	            }
	        },
	        calendar : {
	            sameDay: '[اليوم عند الساعة] LT',
	            nextDay: '[غدًا عند الساعة] LT',
	            nextWeek: 'dddd [عند الساعة] LT',
	            lastDay: '[أمس عند الساعة] LT',
	            lastWeek: 'dddd [عند الساعة] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'بعد %s',
	            past : 'منذ %s',
	            s : pluralize('s'),
	            m : pluralize('m'),
	            mm : pluralize('m'),
	            h : pluralize('h'),
	            hh : pluralize('h'),
	            d : pluralize('d'),
	            dd : pluralize('d'),
	            M : pluralize('M'),
	            MM : pluralize('M'),
	            y : pluralize('y'),
	            yy : pluralize('y')
	        },
	        preparse: function (string) {
	            return string.replace(/\u200f/g, '').replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
	                return numberMap[match];
	            }).replace(/،/g, ',');
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            }).replace(/,/g, '،');
	        },
	        week : {
	            dow : 6, // Saturday is the first day of the week.
	            doy : 12  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ar;

	}));

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Moroccan Arabic (ar-ma)
	//! author : ElFadili Yassine : https://github.com/ElFadiliY
	//! author : Abdel Said : https://github.com/abdelsaid

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var ar_ma = moment.defineLocale('ar-ma', {
	        months : 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
	        monthsShort : 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
	        weekdays : 'الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
	        weekdaysShort : 'احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت'.split('_'),
	        weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[اليوم على الساعة] LT',
	            nextDay: '[غدا على الساعة] LT',
	            nextWeek: 'dddd [على الساعة] LT',
	            lastDay: '[أمس على الساعة] LT',
	            lastWeek: 'dddd [على الساعة] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'في %s',
	            past : 'منذ %s',
	            s : 'ثوان',
	            m : 'دقيقة',
	            mm : '%d دقائق',
	            h : 'ساعة',
	            hh : '%d ساعات',
	            d : 'يوم',
	            dd : '%d أيام',
	            M : 'شهر',
	            MM : '%d أشهر',
	            y : 'سنة',
	            yy : '%d سنوات'
	        },
	        week : {
	            dow : 6, // Saturday is the first day of the week.
	            doy : 12  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ar_ma;

	}));

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Arabic Saudi Arabia (ar-sa)
	//! author : Suhail Alkowaileet : https://github.com/xsoh

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var symbolMap = {
	        '1': '١',
	        '2': '٢',
	        '3': '٣',
	        '4': '٤',
	        '5': '٥',
	        '6': '٦',
	        '7': '٧',
	        '8': '٨',
	        '9': '٩',
	        '0': '٠'
	    }, numberMap = {
	        '١': '1',
	        '٢': '2',
	        '٣': '3',
	        '٤': '4',
	        '٥': '5',
	        '٦': '6',
	        '٧': '7',
	        '٨': '8',
	        '٩': '9',
	        '٠': '0'
	    };

	    var ar_sa = moment.defineLocale('ar-sa', {
	        months : 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
	        monthsShort : 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
	        weekdays : 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
	        weekdaysShort : 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
	        weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        meridiemParse: /ص|م/,
	        isPM : function (input) {
	            return 'م' === input;
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 12) {
	                return 'ص';
	            } else {
	                return 'م';
	            }
	        },
	        calendar : {
	            sameDay: '[اليوم على الساعة] LT',
	            nextDay: '[غدا على الساعة] LT',
	            nextWeek: 'dddd [على الساعة] LT',
	            lastDay: '[أمس على الساعة] LT',
	            lastWeek: 'dddd [على الساعة] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'في %s',
	            past : 'منذ %s',
	            s : 'ثوان',
	            m : 'دقيقة',
	            mm : '%d دقائق',
	            h : 'ساعة',
	            hh : '%d ساعات',
	            d : 'يوم',
	            dd : '%d أيام',
	            M : 'شهر',
	            MM : '%d أشهر',
	            y : 'سنة',
	            yy : '%d سنوات'
	        },
	        preparse: function (string) {
	            return string.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
	                return numberMap[match];
	            }).replace(/،/g, ',');
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            }).replace(/,/g, '،');
	        },
	        week : {
	            dow : 6, // Saturday is the first day of the week.
	            doy : 12  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ar_sa;

	}));

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale  : Tunisian Arabic (ar-tn)

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var ar_tn = moment.defineLocale('ar-tn', {
	        months: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
	        monthsShort: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
	        weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
	        weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
	        weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[اليوم على الساعة] LT',
	            nextDay: '[غدا على الساعة] LT',
	            nextWeek: 'dddd [على الساعة] LT',
	            lastDay: '[أمس على الساعة] LT',
	            lastWeek: 'dddd [على الساعة] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'في %s',
	            past: 'منذ %s',
	            s: 'ثوان',
	            m: 'دقيقة',
	            mm: '%d دقائق',
	            h: 'ساعة',
	            hh: '%d ساعات',
	            d: 'يوم',
	            dd: '%d أيام',
	            M: 'شهر',
	            MM: '%d أشهر',
	            y: 'سنة',
	            yy: '%d سنوات'
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return ar_tn;

	}));

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : azerbaijani (az)
	//! author : topchiyev : https://github.com/topchiyev

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var suffixes = {
	        1: '-inci',
	        5: '-inci',
	        8: '-inci',
	        70: '-inci',
	        80: '-inci',
	        2: '-nci',
	        7: '-nci',
	        20: '-nci',
	        50: '-nci',
	        3: '-üncü',
	        4: '-üncü',
	        100: '-üncü',
	        6: '-ncı',
	        9: '-uncu',
	        10: '-uncu',
	        30: '-uncu',
	        60: '-ıncı',
	        90: '-ıncı'
	    };

	    var az = moment.defineLocale('az', {
	        months : 'yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr'.split('_'),
	        monthsShort : 'yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek'.split('_'),
	        weekdays : 'Bazar_Bazar ertəsi_Çərşənbə axşamı_Çərşənbə_Cümə axşamı_Cümə_Şənbə'.split('_'),
	        weekdaysShort : 'Baz_BzE_ÇAx_Çər_CAx_Cüm_Şən'.split('_'),
	        weekdaysMin : 'Bz_BE_ÇA_Çə_CA_Cü_Şə'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[bugün saat] LT',
	            nextDay : '[sabah saat] LT',
	            nextWeek : '[gələn həftə] dddd [saat] LT',
	            lastDay : '[dünən] LT',
	            lastWeek : '[keçən həftə] dddd [saat] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s sonra',
	            past : '%s əvvəl',
	            s : 'birneçə saniyyə',
	            m : 'bir dəqiqə',
	            mm : '%d dəqiqə',
	            h : 'bir saat',
	            hh : '%d saat',
	            d : 'bir gün',
	            dd : '%d gün',
	            M : 'bir ay',
	            MM : '%d ay',
	            y : 'bir il',
	            yy : '%d il'
	        },
	        meridiemParse: /gecə|səhər|gündüz|axşam/,
	        isPM : function (input) {
	            return /^(gündüz|axşam)$/.test(input);
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'gecə';
	            } else if (hour < 12) {
	                return 'səhər';
	            } else if (hour < 17) {
	                return 'gündüz';
	            } else {
	                return 'axşam';
	            }
	        },
	        ordinalParse: /\d{1,2}-(ıncı|inci|nci|üncü|ncı|uncu)/,
	        ordinal : function (number) {
	            if (number === 0) {  // special case for zero
	                return number + '-ıncı';
	            }
	            var a = number % 10,
	                b = number % 100 - a,
	                c = number >= 100 ? 100 : null;
	            return number + (suffixes[a] || suffixes[b] || suffixes[c]);
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return az;

	}));

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : belarusian (be)
	//! author : Dmitry Demidov : https://github.com/demidov91
	//! author: Praleska: http://praleska.pro/
	//! Author : Menelion Elensúle : https://github.com/Oire

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function plural(word, num) {
	        var forms = word.split('_');
	        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
	    }
	    function relativeTimeWithPlural(number, withoutSuffix, key) {
	        var format = {
	            'mm': withoutSuffix ? 'хвіліна_хвіліны_хвілін' : 'хвіліну_хвіліны_хвілін',
	            'hh': withoutSuffix ? 'гадзіна_гадзіны_гадзін' : 'гадзіну_гадзіны_гадзін',
	            'dd': 'дзень_дні_дзён',
	            'MM': 'месяц_месяцы_месяцаў',
	            'yy': 'год_гады_гадоў'
	        };
	        if (key === 'm') {
	            return withoutSuffix ? 'хвіліна' : 'хвіліну';
	        }
	        else if (key === 'h') {
	            return withoutSuffix ? 'гадзіна' : 'гадзіну';
	        }
	        else {
	            return number + ' ' + plural(format[key], +number);
	        }
	    }

	    var be = moment.defineLocale('be', {
	        months : {
	            format: 'студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня'.split('_'),
	            standalone: 'студзень_люты_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань'.split('_')
	        },
	        monthsShort : 'студ_лют_сак_крас_трав_чэрв_ліп_жнів_вер_каст_ліст_снеж'.split('_'),
	        weekdays : {
	            format: 'нядзелю_панядзелак_аўторак_сераду_чацвер_пятніцу_суботу'.split('_'),
	            standalone: 'нядзеля_панядзелак_аўторак_серада_чацвер_пятніца_субота'.split('_'),
	            isFormat: /\[ ?[Вв] ?(?:мінулую|наступную)? ?\] ?dddd/
	        },
	        weekdaysShort : 'нд_пн_ат_ср_чц_пт_сб'.split('_'),
	        weekdaysMin : 'нд_пн_ат_ср_чц_пт_сб'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY г.',
	            LLL : 'D MMMM YYYY г., HH:mm',
	            LLLL : 'dddd, D MMMM YYYY г., HH:mm'
	        },
	        calendar : {
	            sameDay: '[Сёння ў] LT',
	            nextDay: '[Заўтра ў] LT',
	            lastDay: '[Учора ў] LT',
	            nextWeek: function () {
	                return '[У] dddd [ў] LT';
	            },
	            lastWeek: function () {
	                switch (this.day()) {
	                case 0:
	                case 3:
	                case 5:
	                case 6:
	                    return '[У мінулую] dddd [ў] LT';
	                case 1:
	                case 2:
	                case 4:
	                    return '[У мінулы] dddd [ў] LT';
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'праз %s',
	            past : '%s таму',
	            s : 'некалькі секунд',
	            m : relativeTimeWithPlural,
	            mm : relativeTimeWithPlural,
	            h : relativeTimeWithPlural,
	            hh : relativeTimeWithPlural,
	            d : 'дзень',
	            dd : relativeTimeWithPlural,
	            M : 'месяц',
	            MM : relativeTimeWithPlural,
	            y : 'год',
	            yy : relativeTimeWithPlural
	        },
	        meridiemParse: /ночы|раніцы|дня|вечара/,
	        isPM : function (input) {
	            return /^(дня|вечара)$/.test(input);
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'ночы';
	            } else if (hour < 12) {
	                return 'раніцы';
	            } else if (hour < 17) {
	                return 'дня';
	            } else {
	                return 'вечара';
	            }
	        },
	        ordinalParse: /\d{1,2}-(і|ы|га)/,
	        ordinal: function (number, period) {
	            switch (period) {
	            case 'M':
	            case 'd':
	            case 'DDD':
	            case 'w':
	            case 'W':
	                return (number % 10 === 2 || number % 10 === 3) && (number % 100 !== 12 && number % 100 !== 13) ? number + '-і' : number + '-ы';
	            case 'D':
	                return number + '-га';
	            default:
	                return number;
	            }
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return be;

	}));

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : bulgarian (bg)
	//! author : Krasen Borisov : https://github.com/kraz

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var bg = moment.defineLocale('bg', {
	        months : 'януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември'.split('_'),
	        monthsShort : 'янр_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек'.split('_'),
	        weekdays : 'неделя_понеделник_вторник_сряда_четвъртък_петък_събота'.split('_'),
	        weekdaysShort : 'нед_пон_вто_сря_чет_пет_съб'.split('_'),
	        weekdaysMin : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'D.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY H:mm',
	            LLLL : 'dddd, D MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay : '[Днес в] LT',
	            nextDay : '[Утре в] LT',
	            nextWeek : 'dddd [в] LT',
	            lastDay : '[Вчера в] LT',
	            lastWeek : function () {
	                switch (this.day()) {
	                case 0:
	                case 3:
	                case 6:
	                    return '[В изминалата] dddd [в] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[В изминалия] dddd [в] LT';
	                }
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'след %s',
	            past : 'преди %s',
	            s : 'няколко секунди',
	            m : 'минута',
	            mm : '%d минути',
	            h : 'час',
	            hh : '%d часа',
	            d : 'ден',
	            dd : '%d дни',
	            M : 'месец',
	            MM : '%d месеца',
	            y : 'година',
	            yy : '%d години'
	        },
	        ordinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
	        ordinal : function (number) {
	            var lastDigit = number % 10,
	                last2Digits = number % 100;
	            if (number === 0) {
	                return number + '-ев';
	            } else if (last2Digits === 0) {
	                return number + '-ен';
	            } else if (last2Digits > 10 && last2Digits < 20) {
	                return number + '-ти';
	            } else if (lastDigit === 1) {
	                return number + '-ви';
	            } else if (lastDigit === 2) {
	                return number + '-ри';
	            } else if (lastDigit === 7 || lastDigit === 8) {
	                return number + '-ми';
	            } else {
	                return number + '-ти';
	            }
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return bg;

	}));

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Bengali (bn)
	//! author : Kaushik Gandhi : https://github.com/kaushikgandhi

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var symbolMap = {
	        '1': '১',
	        '2': '২',
	        '3': '৩',
	        '4': '৪',
	        '5': '৫',
	        '6': '৬',
	        '7': '৭',
	        '8': '৮',
	        '9': '৯',
	        '0': '০'
	    },
	    numberMap = {
	        '১': '1',
	        '২': '2',
	        '৩': '3',
	        '৪': '4',
	        '৫': '5',
	        '৬': '6',
	        '৭': '7',
	        '৮': '8',
	        '৯': '9',
	        '০': '0'
	    };

	    var bn = moment.defineLocale('bn', {
	        months : 'জানুয়ারী_ফেবুয়ারী_মার্চ_এপ্রিল_মে_জুন_জুলাই_অগাস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর'.split('_'),
	        monthsShort : 'জানু_ফেব_মার্চ_এপর_মে_জুন_জুল_অগ_সেপ্ট_অক্টো_নভ_ডিসেম্'.split('_'),
	        weekdays : 'রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পত্তিবার_শুক্রবার_শনিবার'.split('_'),
	        weekdaysShort : 'রবি_সোম_মঙ্গল_বুধ_বৃহস্পত্তি_শুক্র_শনি'.split('_'),
	        weekdaysMin : 'রব_সম_মঙ্গ_বু_ব্রিহ_শু_শনি'.split('_'),
	        longDateFormat : {
	            LT : 'A h:mm সময়',
	            LTS : 'A h:mm:ss সময়',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, A h:mm সময়',
	            LLLL : 'dddd, D MMMM YYYY, A h:mm সময়'
	        },
	        calendar : {
	            sameDay : '[আজ] LT',
	            nextDay : '[আগামীকাল] LT',
	            nextWeek : 'dddd, LT',
	            lastDay : '[গতকাল] LT',
	            lastWeek : '[গত] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s পরে',
	            past : '%s আগে',
	            s : 'কয়েক সেকেন্ড',
	            m : 'এক মিনিট',
	            mm : '%d মিনিট',
	            h : 'এক ঘন্টা',
	            hh : '%d ঘন্টা',
	            d : 'এক দিন',
	            dd : '%d দিন',
	            M : 'এক মাস',
	            MM : '%d মাস',
	            y : 'এক বছর',
	            yy : '%d বছর'
	        },
	        preparse: function (string) {
	            return string.replace(/[১২৩৪৫৬৭৮৯০]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        meridiemParse: /রাত|সকাল|দুপুর|বিকাল|রাত/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if ((meridiem === 'রাত' && hour >= 4) ||
	                    (meridiem === 'দুপুর' && hour < 5) ||
	                    meridiem === 'বিকাল') {
	                return hour + 12;
	            } else {
	                return hour;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'রাত';
	            } else if (hour < 10) {
	                return 'সকাল';
	            } else if (hour < 17) {
	                return 'দুপুর';
	            } else if (hour < 20) {
	                return 'বিকাল';
	            } else {
	                return 'রাত';
	            }
	        },
	        week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return bn;

	}));

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : tibetan (bo)
	//! author : Thupten N. Chakrishar : https://github.com/vajradog

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var symbolMap = {
	        '1': '༡',
	        '2': '༢',
	        '3': '༣',
	        '4': '༤',
	        '5': '༥',
	        '6': '༦',
	        '7': '༧',
	        '8': '༨',
	        '9': '༩',
	        '0': '༠'
	    },
	    numberMap = {
	        '༡': '1',
	        '༢': '2',
	        '༣': '3',
	        '༤': '4',
	        '༥': '5',
	        '༦': '6',
	        '༧': '7',
	        '༨': '8',
	        '༩': '9',
	        '༠': '0'
	    };

	    var bo = moment.defineLocale('bo', {
	        months : 'ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ'.split('_'),
	        monthsShort : 'ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ'.split('_'),
	        weekdays : 'གཟའ་ཉི་མ་_གཟའ་ཟླ་བ་_གཟའ་མིག་དམར་_གཟའ་ལྷག་པ་_གཟའ་ཕུར་བུ_གཟའ་པ་སངས་_གཟའ་སྤེན་པ་'.split('_'),
	        weekdaysShort : 'ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་'.split('_'),
	        weekdaysMin : 'ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་'.split('_'),
	        longDateFormat : {
	            LT : 'A h:mm',
	            LTS : 'A h:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, A h:mm',
	            LLLL : 'dddd, D MMMM YYYY, A h:mm'
	        },
	        calendar : {
	            sameDay : '[དི་རིང] LT',
	            nextDay : '[སང་ཉིན] LT',
	            nextWeek : '[བདུན་ཕྲག་རྗེས་མ], LT',
	            lastDay : '[ཁ་སང] LT',
	            lastWeek : '[བདུན་ཕྲག་མཐའ་མ] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s ལ་',
	            past : '%s སྔན་ལ',
	            s : 'ལམ་སང',
	            m : 'སྐར་མ་གཅིག',
	            mm : '%d སྐར་མ',
	            h : 'ཆུ་ཚོད་གཅིག',
	            hh : '%d ཆུ་ཚོད',
	            d : 'ཉིན་གཅིག',
	            dd : '%d ཉིན་',
	            M : 'ཟླ་བ་གཅིག',
	            MM : '%d ཟླ་བ',
	            y : 'ལོ་གཅིག',
	            yy : '%d ལོ'
	        },
	        preparse: function (string) {
	            return string.replace(/[༡༢༣༤༥༦༧༨༩༠]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        meridiemParse: /མཚན་མོ|ཞོགས་ཀས|ཉིན་གུང|དགོང་དག|མཚན་མོ/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if ((meridiem === 'མཚན་མོ' && hour >= 4) ||
	                    (meridiem === 'ཉིན་གུང' && hour < 5) ||
	                    meridiem === 'དགོང་དག') {
	                return hour + 12;
	            } else {
	                return hour;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'མཚན་མོ';
	            } else if (hour < 10) {
	                return 'ཞོགས་ཀས';
	            } else if (hour < 17) {
	                return 'ཉིན་གུང';
	            } else if (hour < 20) {
	                return 'དགོང་དག';
	            } else {
	                return 'མཚན་མོ';
	            }
	        },
	        week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return bo;

	}));

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : breton (br)
	//! author : Jean-Baptiste Le Duigou : https://github.com/jbleduigou

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function relativeTimeWithMutation(number, withoutSuffix, key) {
	        var format = {
	            'mm': 'munutenn',
	            'MM': 'miz',
	            'dd': 'devezh'
	        };
	        return number + ' ' + mutation(format[key], number);
	    }
	    function specialMutationForYears(number) {
	        switch (lastNumber(number)) {
	        case 1:
	        case 3:
	        case 4:
	        case 5:
	        case 9:
	            return number + ' bloaz';
	        default:
	            return number + ' vloaz';
	        }
	    }
	    function lastNumber(number) {
	        if (number > 9) {
	            return lastNumber(number % 10);
	        }
	        return number;
	    }
	    function mutation(text, number) {
	        if (number === 2) {
	            return softMutation(text);
	        }
	        return text;
	    }
	    function softMutation(text) {
	        var mutationTable = {
	            'm': 'v',
	            'b': 'v',
	            'd': 'z'
	        };
	        if (mutationTable[text.charAt(0)] === undefined) {
	            return text;
	        }
	        return mutationTable[text.charAt(0)] + text.substring(1);
	    }

	    var br = moment.defineLocale('br', {
	        months : 'Genver_C\'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu'.split('_'),
	        monthsShort : 'Gen_C\'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker'.split('_'),
	        weekdays : 'Sul_Lun_Meurzh_Merc\'her_Yaou_Gwener_Sadorn'.split('_'),
	        weekdaysShort : 'Sul_Lun_Meu_Mer_Yao_Gwe_Sad'.split('_'),
	        weekdaysMin : 'Su_Lu_Me_Mer_Ya_Gw_Sa'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'h[e]mm A',
	            LTS : 'h[e]mm:ss A',
	            L : 'DD/MM/YYYY',
	            LL : 'D [a viz] MMMM YYYY',
	            LLL : 'D [a viz] MMMM YYYY h[e]mm A',
	            LLLL : 'dddd, D [a viz] MMMM YYYY h[e]mm A'
	        },
	        calendar : {
	            sameDay : '[Hiziv da] LT',
	            nextDay : '[Warc\'hoazh da] LT',
	            nextWeek : 'dddd [da] LT',
	            lastDay : '[Dec\'h da] LT',
	            lastWeek : 'dddd [paset da] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'a-benn %s',
	            past : '%s \'zo',
	            s : 'un nebeud segondennoù',
	            m : 'ur vunutenn',
	            mm : relativeTimeWithMutation,
	            h : 'un eur',
	            hh : '%d eur',
	            d : 'un devezh',
	            dd : relativeTimeWithMutation,
	            M : 'ur miz',
	            MM : relativeTimeWithMutation,
	            y : 'ur bloaz',
	            yy : specialMutationForYears
	        },
	        ordinalParse: /\d{1,2}(añ|vet)/,
	        ordinal : function (number) {
	            var output = (number === 1) ? 'añ' : 'vet';
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return br;

	}));

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : bosnian (bs)
	//! author : Nedim Cholich : https://github.com/frontyard
	//! based on (hr) translation by Bojan Marković

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function translate(number, withoutSuffix, key) {
	        var result = number + ' ';
	        switch (key) {
	        case 'm':
	            return withoutSuffix ? 'jedna minuta' : 'jedne minute';
	        case 'mm':
	            if (number === 1) {
	                result += 'minuta';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'minute';
	            } else {
	                result += 'minuta';
	            }
	            return result;
	        case 'h':
	            return withoutSuffix ? 'jedan sat' : 'jednog sata';
	        case 'hh':
	            if (number === 1) {
	                result += 'sat';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'sata';
	            } else {
	                result += 'sati';
	            }
	            return result;
	        case 'dd':
	            if (number === 1) {
	                result += 'dan';
	            } else {
	                result += 'dana';
	            }
	            return result;
	        case 'MM':
	            if (number === 1) {
	                result += 'mjesec';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'mjeseca';
	            } else {
	                result += 'mjeseci';
	            }
	            return result;
	        case 'yy':
	            if (number === 1) {
	                result += 'godina';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'godine';
	            } else {
	                result += 'godina';
	            }
	            return result;
	        }
	    }

	    var bs = moment.defineLocale('bs', {
	        months : 'januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar'.split('_'),
	        monthsShort : 'jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.'.split('_'),
	        monthsParseExact: true,
	        weekdays : 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
	        weekdaysShort : 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
	        weekdaysMin : 'ne_po_ut_sr_če_pe_su'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD. MM. YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY H:mm',
	            LLLL : 'dddd, D. MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay  : '[danas u] LT',
	            nextDay  : '[sutra u] LT',
	            nextWeek : function () {
	                switch (this.day()) {
	                case 0:
	                    return '[u] [nedjelju] [u] LT';
	                case 3:
	                    return '[u] [srijedu] [u] LT';
	                case 6:
	                    return '[u] [subotu] [u] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[u] dddd [u] LT';
	                }
	            },
	            lastDay  : '[jučer u] LT',
	            lastWeek : function () {
	                switch (this.day()) {
	                case 0:
	                case 3:
	                    return '[prošlu] dddd [u] LT';
	                case 6:
	                    return '[prošle] [subote] [u] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[prošli] dddd [u] LT';
	                }
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'za %s',
	            past   : 'prije %s',
	            s      : 'par sekundi',
	            m      : translate,
	            mm     : translate,
	            h      : translate,
	            hh     : translate,
	            d      : 'dan',
	            dd     : translate,
	            M      : 'mjesec',
	            MM     : translate,
	            y      : 'godinu',
	            yy     : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return bs;

	}));

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : catalan (ca)
	//! author : Juan G. Hurtado : https://github.com/juanghurtado

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var ca = moment.defineLocale('ca', {
	        months : 'gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre'.split('_'),
	        monthsShort : 'gen._febr._mar._abr._mai._jun._jul._ag._set._oct._nov._des.'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte'.split('_'),
	        weekdaysShort : 'dg._dl._dt._dc._dj._dv._ds.'.split('_'),
	        weekdaysMin : 'Dg_Dl_Dt_Dc_Dj_Dv_Ds'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY H:mm',
	            LLLL : 'dddd D MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay : function () {
	                return '[avui a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
	            },
	            nextDay : function () {
	                return '[demà a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
	            },
	            nextWeek : function () {
	                return 'dddd [a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
	            },
	            lastDay : function () {
	                return '[ahir a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
	            },
	            lastWeek : function () {
	                return '[el] dddd [passat a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'en %s',
	            past : 'fa %s',
	            s : 'uns segons',
	            m : 'un minut',
	            mm : '%d minuts',
	            h : 'una hora',
	            hh : '%d hores',
	            d : 'un dia',
	            dd : '%d dies',
	            M : 'un mes',
	            MM : '%d mesos',
	            y : 'un any',
	            yy : '%d anys'
	        },
	        ordinalParse: /\d{1,2}(r|n|t|è|a)/,
	        ordinal : function (number, period) {
	            var output = (number === 1) ? 'r' :
	                (number === 2) ? 'n' :
	                (number === 3) ? 'r' :
	                (number === 4) ? 't' : 'è';
	            if (period === 'w' || period === 'W') {
	                output = 'a';
	            }
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return ca;

	}));

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : czech (cs)
	//! author : petrbela : https://github.com/petrbela

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var months = 'leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec'.split('_'),
	        monthsShort = 'led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro'.split('_');
	    function plural(n) {
	        return (n > 1) && (n < 5) && (~~(n / 10) !== 1);
	    }
	    function translate(number, withoutSuffix, key, isFuture) {
	        var result = number + ' ';
	        switch (key) {
	        case 's':  // a few seconds / in a few seconds / a few seconds ago
	            return (withoutSuffix || isFuture) ? 'pár sekund' : 'pár sekundami';
	        case 'm':  // a minute / in a minute / a minute ago
	            return withoutSuffix ? 'minuta' : (isFuture ? 'minutu' : 'minutou');
	        case 'mm': // 9 minutes / in 9 minutes / 9 minutes ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'minuty' : 'minut');
	            } else {
	                return result + 'minutami';
	            }
	            break;
	        case 'h':  // an hour / in an hour / an hour ago
	            return withoutSuffix ? 'hodina' : (isFuture ? 'hodinu' : 'hodinou');
	        case 'hh': // 9 hours / in 9 hours / 9 hours ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'hodiny' : 'hodin');
	            } else {
	                return result + 'hodinami';
	            }
	            break;
	        case 'd':  // a day / in a day / a day ago
	            return (withoutSuffix || isFuture) ? 'den' : 'dnem';
	        case 'dd': // 9 days / in 9 days / 9 days ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'dny' : 'dní');
	            } else {
	                return result + 'dny';
	            }
	            break;
	        case 'M':  // a month / in a month / a month ago
	            return (withoutSuffix || isFuture) ? 'měsíc' : 'měsícem';
	        case 'MM': // 9 months / in 9 months / 9 months ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'měsíce' : 'měsíců');
	            } else {
	                return result + 'měsíci';
	            }
	            break;
	        case 'y':  // a year / in a year / a year ago
	            return (withoutSuffix || isFuture) ? 'rok' : 'rokem';
	        case 'yy': // 9 years / in 9 years / 9 years ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'roky' : 'let');
	            } else {
	                return result + 'lety';
	            }
	            break;
	        }
	    }

	    var cs = moment.defineLocale('cs', {
	        months : months,
	        monthsShort : monthsShort,
	        monthsParse : (function (months, monthsShort) {
	            var i, _monthsParse = [];
	            for (i = 0; i < 12; i++) {
	                // use custom parser to solve problem with July (červenec)
	                _monthsParse[i] = new RegExp('^' + months[i] + '$|^' + monthsShort[i] + '$', 'i');
	            }
	            return _monthsParse;
	        }(months, monthsShort)),
	        shortMonthsParse : (function (monthsShort) {
	            var i, _shortMonthsParse = [];
	            for (i = 0; i < 12; i++) {
	                _shortMonthsParse[i] = new RegExp('^' + monthsShort[i] + '$', 'i');
	            }
	            return _shortMonthsParse;
	        }(monthsShort)),
	        longMonthsParse : (function (months) {
	            var i, _longMonthsParse = [];
	            for (i = 0; i < 12; i++) {
	                _longMonthsParse[i] = new RegExp('^' + months[i] + '$', 'i');
	            }
	            return _longMonthsParse;
	        }(months)),
	        weekdays : 'neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota'.split('_'),
	        weekdaysShort : 'ne_po_út_st_čt_pá_so'.split('_'),
	        weekdaysMin : 'ne_po_út_st_čt_pá_so'.split('_'),
	        longDateFormat : {
	            LT: 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY H:mm',
	            LLLL : 'dddd D. MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay: '[dnes v] LT',
	            nextDay: '[zítra v] LT',
	            nextWeek: function () {
	                switch (this.day()) {
	                case 0:
	                    return '[v neděli v] LT';
	                case 1:
	                case 2:
	                    return '[v] dddd [v] LT';
	                case 3:
	                    return '[ve středu v] LT';
	                case 4:
	                    return '[ve čtvrtek v] LT';
	                case 5:
	                    return '[v pátek v] LT';
	                case 6:
	                    return '[v sobotu v] LT';
	                }
	            },
	            lastDay: '[včera v] LT',
	            lastWeek: function () {
	                switch (this.day()) {
	                case 0:
	                    return '[minulou neděli v] LT';
	                case 1:
	                case 2:
	                    return '[minulé] dddd [v] LT';
	                case 3:
	                    return '[minulou středu v] LT';
	                case 4:
	                case 5:
	                    return '[minulý] dddd [v] LT';
	                case 6:
	                    return '[minulou sobotu v] LT';
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'za %s',
	            past : 'před %s',
	            s : translate,
	            m : translate,
	            mm : translate,
	            h : translate,
	            hh : translate,
	            d : translate,
	            dd : translate,
	            M : translate,
	            MM : translate,
	            y : translate,
	            yy : translate
	        },
	        ordinalParse : /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return cs;

	}));

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : chuvash (cv)
	//! author : Anatoly Mironov : https://github.com/mirontoli

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var cv = moment.defineLocale('cv', {
	        months : 'кӑрлач_нарӑс_пуш_ака_май_ҫӗртме_утӑ_ҫурла_авӑн_юпа_чӳк_раштав'.split('_'),
	        monthsShort : 'кӑр_нар_пуш_ака_май_ҫӗр_утӑ_ҫур_авн_юпа_чӳк_раш'.split('_'),
	        weekdays : 'вырсарникун_тунтикун_ытларикун_юнкун_кӗҫнерникун_эрнекун_шӑматкун'.split('_'),
	        weekdaysShort : 'выр_тун_ытл_юн_кӗҫ_эрн_шӑм'.split('_'),
	        weekdaysMin : 'вр_тн_ыт_юн_кҫ_эр_шм'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD-MM-YYYY',
	            LL : 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ]',
	            LLL : 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm',
	            LLLL : 'dddd, YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm'
	        },
	        calendar : {
	            sameDay: '[Паян] LT [сехетре]',
	            nextDay: '[Ыран] LT [сехетре]',
	            lastDay: '[Ӗнер] LT [сехетре]',
	            nextWeek: '[Ҫитес] dddd LT [сехетре]',
	            lastWeek: '[Иртнӗ] dddd LT [сехетре]',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : function (output) {
	                var affix = /сехет$/i.exec(output) ? 'рен' : /ҫул$/i.exec(output) ? 'тан' : 'ран';
	                return output + affix;
	            },
	            past : '%s каялла',
	            s : 'пӗр-ик ҫеккунт',
	            m : 'пӗр минут',
	            mm : '%d минут',
	            h : 'пӗр сехет',
	            hh : '%d сехет',
	            d : 'пӗр кун',
	            dd : '%d кун',
	            M : 'пӗр уйӑх',
	            MM : '%d уйӑх',
	            y : 'пӗр ҫул',
	            yy : '%d ҫул'
	        },
	        ordinalParse: /\d{1,2}-мӗш/,
	        ordinal : '%d-мӗш',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return cv;

	}));

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Welsh (cy)
	//! author : Robert Allen

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var cy = moment.defineLocale('cy', {
	        months: 'Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr'.split('_'),
	        monthsShort: 'Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag'.split('_'),
	        weekdays: 'Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn'.split('_'),
	        weekdaysShort: 'Sul_Llun_Maw_Mer_Iau_Gwe_Sad'.split('_'),
	        weekdaysMin: 'Su_Ll_Ma_Me_Ia_Gw_Sa'.split('_'),
	        weekdaysParseExact : true,
	        // time formats are the same as en-gb
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[Heddiw am] LT',
	            nextDay: '[Yfory am] LT',
	            nextWeek: 'dddd [am] LT',
	            lastDay: '[Ddoe am] LT',
	            lastWeek: 'dddd [diwethaf am] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'mewn %s',
	            past: '%s yn ôl',
	            s: 'ychydig eiliadau',
	            m: 'munud',
	            mm: '%d munud',
	            h: 'awr',
	            hh: '%d awr',
	            d: 'diwrnod',
	            dd: '%d diwrnod',
	            M: 'mis',
	            MM: '%d mis',
	            y: 'blwyddyn',
	            yy: '%d flynedd'
	        },
	        ordinalParse: /\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,
	        // traditional ordinal numbers above 31 are not commonly used in colloquial Welsh
	        ordinal: function (number) {
	            var b = number,
	                output = '',
	                lookup = [
	                    '', 'af', 'il', 'ydd', 'ydd', 'ed', 'ed', 'ed', 'fed', 'fed', 'fed', // 1af to 10fed
	                    'eg', 'fed', 'eg', 'eg', 'fed', 'eg', 'eg', 'fed', 'eg', 'fed' // 11eg to 20fed
	                ];
	            if (b > 20) {
	                if (b === 40 || b === 50 || b === 60 || b === 80 || b === 100) {
	                    output = 'fed'; // not 30ain, 70ain or 90ain
	                } else {
	                    output = 'ain';
	                }
	            } else if (b > 0) {
	                output = lookup[b];
	            }
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return cy;

	}));

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : danish (da)
	//! author : Ulrik Nielsen : https://github.com/mrbase

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var da = moment.defineLocale('da', {
	        months : 'januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december'.split('_'),
	        monthsShort : 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
	        weekdays : 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
	        weekdaysShort : 'søn_man_tir_ons_tor_fre_lør'.split('_'),
	        weekdaysMin : 'sø_ma_ti_on_to_fr_lø'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY HH:mm',
	            LLLL : 'dddd [d.] D. MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[I dag kl.] LT',
	            nextDay : '[I morgen kl.] LT',
	            nextWeek : 'dddd [kl.] LT',
	            lastDay : '[I går kl.] LT',
	            lastWeek : '[sidste] dddd [kl] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'om %s',
	            past : '%s siden',
	            s : 'få sekunder',
	            m : 'et minut',
	            mm : '%d minutter',
	            h : 'en time',
	            hh : '%d timer',
	            d : 'en dag',
	            dd : '%d dage',
	            M : 'en måned',
	            MM : '%d måneder',
	            y : 'et år',
	            yy : '%d år'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return da;

	}));

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : german (de)
	//! author : lluchs : https://github.com/lluchs
	//! author: Menelion Elensúle: https://github.com/Oire
	//! author : Mikolaj Dadela : https://github.com/mik01aj

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function processRelativeTime(number, withoutSuffix, key, isFuture) {
	        var format = {
	            'm': ['eine Minute', 'einer Minute'],
	            'h': ['eine Stunde', 'einer Stunde'],
	            'd': ['ein Tag', 'einem Tag'],
	            'dd': [number + ' Tage', number + ' Tagen'],
	            'M': ['ein Monat', 'einem Monat'],
	            'MM': [number + ' Monate', number + ' Monaten'],
	            'y': ['ein Jahr', 'einem Jahr'],
	            'yy': [number + ' Jahre', number + ' Jahren']
	        };
	        return withoutSuffix ? format[key][0] : format[key][1];
	    }

	    var de = moment.defineLocale('de', {
	        months : 'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
	        monthsShort : 'Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
	        weekdaysShort : 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
	        weekdaysMin : 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY HH:mm',
	            LLLL : 'dddd, D. MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[heute um] LT [Uhr]',
	            sameElse: 'L',
	            nextDay: '[morgen um] LT [Uhr]',
	            nextWeek: 'dddd [um] LT [Uhr]',
	            lastDay: '[gestern um] LT [Uhr]',
	            lastWeek: '[letzten] dddd [um] LT [Uhr]'
	        },
	        relativeTime : {
	            future : 'in %s',
	            past : 'vor %s',
	            s : 'ein paar Sekunden',
	            m : processRelativeTime,
	            mm : '%d Minuten',
	            h : processRelativeTime,
	            hh : '%d Stunden',
	            d : processRelativeTime,
	            dd : processRelativeTime,
	            M : processRelativeTime,
	            MM : processRelativeTime,
	            y : processRelativeTime,
	            yy : processRelativeTime
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return de;

	}));

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : austrian german (de-at)
	//! author : lluchs : https://github.com/lluchs
	//! author: Menelion Elensúle: https://github.com/Oire
	//! author : Martin Groller : https://github.com/MadMG
	//! author : Mikolaj Dadela : https://github.com/mik01aj

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function processRelativeTime(number, withoutSuffix, key, isFuture) {
	        var format = {
	            'm': ['eine Minute', 'einer Minute'],
	            'h': ['eine Stunde', 'einer Stunde'],
	            'd': ['ein Tag', 'einem Tag'],
	            'dd': [number + ' Tage', number + ' Tagen'],
	            'M': ['ein Monat', 'einem Monat'],
	            'MM': [number + ' Monate', number + ' Monaten'],
	            'y': ['ein Jahr', 'einem Jahr'],
	            'yy': [number + ' Jahre', number + ' Jahren']
	        };
	        return withoutSuffix ? format[key][0] : format[key][1];
	    }

	    var de_at = moment.defineLocale('de-at', {
	        months : 'Jänner_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
	        monthsShort : 'Jän._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
	        weekdaysShort : 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
	        weekdaysMin : 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY HH:mm',
	            LLLL : 'dddd, D. MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[heute um] LT [Uhr]',
	            sameElse: 'L',
	            nextDay: '[morgen um] LT [Uhr]',
	            nextWeek: 'dddd [um] LT [Uhr]',
	            lastDay: '[gestern um] LT [Uhr]',
	            lastWeek: '[letzten] dddd [um] LT [Uhr]'
	        },
	        relativeTime : {
	            future : 'in %s',
	            past : 'vor %s',
	            s : 'ein paar Sekunden',
	            m : processRelativeTime,
	            mm : '%d Minuten',
	            h : processRelativeTime,
	            hh : '%d Stunden',
	            d : processRelativeTime,
	            dd : processRelativeTime,
	            M : processRelativeTime,
	            MM : processRelativeTime,
	            y : processRelativeTime,
	            yy : processRelativeTime
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return de_at;

	}));

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : dhivehi (dv)
	//! author : Jawish Hameed : https://github.com/jawish

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var months = [
	        'ޖެނުއަރީ',
	        'ފެބްރުއަރީ',
	        'މާރިޗު',
	        'އޭޕްރީލު',
	        'މޭ',
	        'ޖޫން',
	        'ޖުލައި',
	        'އޯގަސްޓު',
	        'ސެޕްޓެމްބަރު',
	        'އޮކްޓޯބަރު',
	        'ނޮވެމްބަރު',
	        'ޑިސެމްބަރު'
	    ], weekdays = [
	        'އާދިއްތަ',
	        'ހޯމަ',
	        'އަންގާރަ',
	        'ބުދަ',
	        'ބުރާސްފަތި',
	        'ހުކުރު',
	        'ހޮނިހިރު'
	    ];

	    var dv = moment.defineLocale('dv', {
	        months : months,
	        monthsShort : months,
	        weekdays : weekdays,
	        weekdaysShort : weekdays,
	        weekdaysMin : 'އާދި_ހޯމަ_އަން_ބުދަ_ބުރާ_ހުކު_ހޮނި'.split('_'),
	        longDateFormat : {

	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'D/M/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        meridiemParse: /މކ|މފ/,
	        isPM : function (input) {
	            return 'މފ' === input;
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 12) {
	                return 'މކ';
	            } else {
	                return 'މފ';
	            }
	        },
	        calendar : {
	            sameDay : '[މިއަދު] LT',
	            nextDay : '[މާދަމާ] LT',
	            nextWeek : 'dddd LT',
	            lastDay : '[އިއްޔެ] LT',
	            lastWeek : '[ފާއިތުވި] dddd LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'ތެރޭގައި %s',
	            past : 'ކުރިން %s',
	            s : 'ސިކުންތުކޮޅެއް',
	            m : 'މިނިޓެއް',
	            mm : 'މިނިޓު %d',
	            h : 'ގަޑިއިރެއް',
	            hh : 'ގަޑިއިރު %d',
	            d : 'ދުވަހެއް',
	            dd : 'ދުވަސް %d',
	            M : 'މަހެއް',
	            MM : 'މަސް %d',
	            y : 'އަހަރެއް',
	            yy : 'އަހަރު %d'
	        },
	        preparse: function (string) {
	            return string.replace(/،/g, ',');
	        },
	        postformat: function (string) {
	            return string.replace(/,/g, '،');
	        },
	        week : {
	            dow : 7,  // Sunday is the first day of the week.
	            doy : 12  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return dv;

	}));

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : modern greek (el)
	//! author : Aggelos Karalias : https://github.com/mehiel

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';

	    function isFunction(input) {
	        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
	    }


	    var el = moment.defineLocale('el', {
	        monthsNominativeEl : 'Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος'.split('_'),
	        monthsGenitiveEl : 'Ιανουαρίου_Φεβρουαρίου_Μαρτίου_Απριλίου_Μαΐου_Ιουνίου_Ιουλίου_Αυγούστου_Σεπτεμβρίου_Οκτωβρίου_Νοεμβρίου_Δεκεμβρίου'.split('_'),
	        months : function (momentToFormat, format) {
	            if (/D/.test(format.substring(0, format.indexOf('MMMM')))) { // if there is a day number before 'MMMM'
	                return this._monthsGenitiveEl[momentToFormat.month()];
	            } else {
	                return this._monthsNominativeEl[momentToFormat.month()];
	            }
	        },
	        monthsShort : 'Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ'.split('_'),
	        weekdays : 'Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο'.split('_'),
	        weekdaysShort : 'Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ'.split('_'),
	        weekdaysMin : 'Κυ_Δε_Τρ_Τε_Πε_Πα_Σα'.split('_'),
	        meridiem : function (hours, minutes, isLower) {
	            if (hours > 11) {
	                return isLower ? 'μμ' : 'ΜΜ';
	            } else {
	                return isLower ? 'πμ' : 'ΠΜ';
	            }
	        },
	        isPM : function (input) {
	            return ((input + '').toLowerCase()[0] === 'μ');
	        },
	        meridiemParse : /[ΠΜ]\.?Μ?\.?/i,
	        longDateFormat : {
	            LT : 'h:mm A',
	            LTS : 'h:mm:ss A',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY h:mm A',
	            LLLL : 'dddd, D MMMM YYYY h:mm A'
	        },
	        calendarEl : {
	            sameDay : '[Σήμερα {}] LT',
	            nextDay : '[Αύριο {}] LT',
	            nextWeek : 'dddd [{}] LT',
	            lastDay : '[Χθες {}] LT',
	            lastWeek : function () {
	                switch (this.day()) {
	                    case 6:
	                        return '[το προηγούμενο] dddd [{}] LT';
	                    default:
	                        return '[την προηγούμενη] dddd [{}] LT';
	                }
	            },
	            sameElse : 'L'
	        },
	        calendar : function (key, mom) {
	            var output = this._calendarEl[key],
	                hours = mom && mom.hours();
	            if (isFunction(output)) {
	                output = output.apply(mom);
	            }
	            return output.replace('{}', (hours % 12 === 1 ? 'στη' : 'στις'));
	        },
	        relativeTime : {
	            future : 'σε %s',
	            past : '%s πριν',
	            s : 'λίγα δευτερόλεπτα',
	            m : 'ένα λεπτό',
	            mm : '%d λεπτά',
	            h : 'μία ώρα',
	            hh : '%d ώρες',
	            d : 'μία μέρα',
	            dd : '%d μέρες',
	            M : 'ένας μήνας',
	            MM : '%d μήνες',
	            y : 'ένας χρόνος',
	            yy : '%d χρόνια'
	        },
	        ordinalParse: /\d{1,2}η/,
	        ordinal: '%dη',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4st is the first week of the year.
	        }
	    });

	    return el;

	}));

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : australian english (en-au)

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var en_au = moment.defineLocale('en-au', {
	        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'h:mm A',
	            LTS : 'h:mm:ss A',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY h:mm A',
	            LLLL : 'dddd, D MMMM YYYY h:mm A'
	        },
	        calendar : {
	            sameDay : '[Today at] LT',
	            nextDay : '[Tomorrow at] LT',
	            nextWeek : 'dddd [at] LT',
	            lastDay : '[Yesterday at] LT',
	            lastWeek : '[Last] dddd [at] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'in %s',
	            past : '%s ago',
	            s : 'a few seconds',
	            m : 'a minute',
	            mm : '%d minutes',
	            h : 'an hour',
	            hh : '%d hours',
	            d : 'a day',
	            dd : '%d days',
	            M : 'a month',
	            MM : '%d months',
	            y : 'a year',
	            yy : '%d years'
	        },
	        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (~~(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return en_au;

	}));

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : canadian english (en-ca)
	//! author : Jonathan Abourbih : https://github.com/jonbca

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var en_ca = moment.defineLocale('en-ca', {
	        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'h:mm A',
	            LTS : 'h:mm:ss A',
	            L : 'YYYY-MM-DD',
	            LL : 'MMMM D, YYYY',
	            LLL : 'MMMM D, YYYY h:mm A',
	            LLLL : 'dddd, MMMM D, YYYY h:mm A'
	        },
	        calendar : {
	            sameDay : '[Today at] LT',
	            nextDay : '[Tomorrow at] LT',
	            nextWeek : 'dddd [at] LT',
	            lastDay : '[Yesterday at] LT',
	            lastWeek : '[Last] dddd [at] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'in %s',
	            past : '%s ago',
	            s : 'a few seconds',
	            m : 'a minute',
	            mm : '%d minutes',
	            h : 'an hour',
	            hh : '%d hours',
	            d : 'a day',
	            dd : '%d days',
	            M : 'a month',
	            MM : '%d months',
	            y : 'a year',
	            yy : '%d years'
	        },
	        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (~~(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        }
	    });

	    return en_ca;

	}));

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : great britain english (en-gb)
	//! author : Chris Gedrim : https://github.com/chrisgedrim

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var en_gb = moment.defineLocale('en-gb', {
	        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[Today at] LT',
	            nextDay : '[Tomorrow at] LT',
	            nextWeek : 'dddd [at] LT',
	            lastDay : '[Yesterday at] LT',
	            lastWeek : '[Last] dddd [at] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'in %s',
	            past : '%s ago',
	            s : 'a few seconds',
	            m : 'a minute',
	            mm : '%d minutes',
	            h : 'an hour',
	            hh : '%d hours',
	            d : 'a day',
	            dd : '%d days',
	            M : 'a month',
	            MM : '%d months',
	            y : 'a year',
	            yy : '%d years'
	        },
	        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (~~(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return en_gb;

	}));

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Irish english (en-ie)
	//! author : Chris Cartlidge : https://github.com/chriscartlidge

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var en_ie = moment.defineLocale('en-ie', {
	        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD-MM-YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[Today at] LT',
	            nextDay : '[Tomorrow at] LT',
	            nextWeek : 'dddd [at] LT',
	            lastDay : '[Yesterday at] LT',
	            lastWeek : '[Last] dddd [at] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'in %s',
	            past : '%s ago',
	            s : 'a few seconds',
	            m : 'a minute',
	            mm : '%d minutes',
	            h : 'an hour',
	            hh : '%d hours',
	            d : 'a day',
	            dd : '%d days',
	            M : 'a month',
	            MM : '%d months',
	            y : 'a year',
	            yy : '%d years'
	        },
	        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (~~(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return en_ie;

	}));

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : New Zealand english (en-nz)

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var en_nz = moment.defineLocale('en-nz', {
	        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'h:mm A',
	            LTS : 'h:mm:ss A',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY h:mm A',
	            LLLL : 'dddd, D MMMM YYYY h:mm A'
	        },
	        calendar : {
	            sameDay : '[Today at] LT',
	            nextDay : '[Tomorrow at] LT',
	            nextWeek : 'dddd [at] LT',
	            lastDay : '[Yesterday at] LT',
	            lastWeek : '[Last] dddd [at] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'in %s',
	            past : '%s ago',
	            s : 'a few seconds',
	            m : 'a minute',
	            mm : '%d minutes',
	            h : 'an hour',
	            hh : '%d hours',
	            d : 'a day',
	            dd : '%d days',
	            M : 'a month',
	            MM : '%d months',
	            y : 'a year',
	            yy : '%d years'
	        },
	        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (~~(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return en_nz;

	}));

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : esperanto (eo)
	//! author : Colin Dean : https://github.com/colindean
	//! komento: Mi estas malcerta se mi korekte traktis akuzativojn en tiu traduko.
	//!          Se ne, bonvolu korekti kaj avizi min por ke mi povas lerni!

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var eo = moment.defineLocale('eo', {
	        months : 'januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro'.split('_'),
	        monthsShort : 'jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec'.split('_'),
	        weekdays : 'Dimanĉo_Lundo_Mardo_Merkredo_Ĵaŭdo_Vendredo_Sabato'.split('_'),
	        weekdaysShort : 'Dim_Lun_Mard_Merk_Ĵaŭ_Ven_Sab'.split('_'),
	        weekdaysMin : 'Di_Lu_Ma_Me_Ĵa_Ve_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'YYYY-MM-DD',
	            LL : 'D[-an de] MMMM, YYYY',
	            LLL : 'D[-an de] MMMM, YYYY HH:mm',
	            LLLL : 'dddd, [la] D[-an de] MMMM, YYYY HH:mm'
	        },
	        meridiemParse: /[ap]\.t\.m/i,
	        isPM: function (input) {
	            return input.charAt(0).toLowerCase() === 'p';
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours > 11) {
	                return isLower ? 'p.t.m.' : 'P.T.M.';
	            } else {
	                return isLower ? 'a.t.m.' : 'A.T.M.';
	            }
	        },
	        calendar : {
	            sameDay : '[Hodiaŭ je] LT',
	            nextDay : '[Morgaŭ je] LT',
	            nextWeek : 'dddd [je] LT',
	            lastDay : '[Hieraŭ je] LT',
	            lastWeek : '[pasinta] dddd [je] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'je %s',
	            past : 'antaŭ %s',
	            s : 'sekundoj',
	            m : 'minuto',
	            mm : '%d minutoj',
	            h : 'horo',
	            hh : '%d horoj',
	            d : 'tago',//ne 'diurno', ĉar estas uzita por proksimumo
	            dd : '%d tagoj',
	            M : 'monato',
	            MM : '%d monatoj',
	            y : 'jaro',
	            yy : '%d jaroj'
	        },
	        ordinalParse: /\d{1,2}a/,
	        ordinal : '%da',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return eo;

	}));

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : spanish (es)
	//! author : Julio Napurí : https://github.com/julionc

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var monthsShortDot = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_'),
	        monthsShort = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');

	    var es = moment.defineLocale('es', {
	        months : 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
	        monthsShort : function (m, format) {
	            if (/-MMM-/.test(format)) {
	                return monthsShort[m.month()];
	            } else {
	                return monthsShortDot[m.month()];
	            }
	        },
	        monthsParseExact : true,
	        weekdays : 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
	        weekdaysShort : 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
	        weekdaysMin : 'do_lu_ma_mi_ju_vi_sá'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D [de] MMMM [de] YYYY',
	            LLL : 'D [de] MMMM [de] YYYY H:mm',
	            LLLL : 'dddd, D [de] MMMM [de] YYYY H:mm'
	        },
	        calendar : {
	            sameDay : function () {
	                return '[hoy a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	            },
	            nextDay : function () {
	                return '[mañana a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	            },
	            nextWeek : function () {
	                return 'dddd [a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	            },
	            lastDay : function () {
	                return '[ayer a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	            },
	            lastWeek : function () {
	                return '[el] dddd [pasado a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'en %s',
	            past : 'hace %s',
	            s : 'unos segundos',
	            m : 'un minuto',
	            mm : '%d minutos',
	            h : 'una hora',
	            hh : '%d horas',
	            d : 'un día',
	            dd : '%d días',
	            M : 'un mes',
	            MM : '%d meses',
	            y : 'un año',
	            yy : '%d años'
	        },
	        ordinalParse : /\d{1,2}º/,
	        ordinal : '%dº',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return es;

	}));

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : estonian (et)
	//! author : Henry Kehlmann : https://github.com/madhenry
	//! improvements : Illimar Tambek : https://github.com/ragulka

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function processRelativeTime(number, withoutSuffix, key, isFuture) {
	        var format = {
	            's' : ['mõne sekundi', 'mõni sekund', 'paar sekundit'],
	            'm' : ['ühe minuti', 'üks minut'],
	            'mm': [number + ' minuti', number + ' minutit'],
	            'h' : ['ühe tunni', 'tund aega', 'üks tund'],
	            'hh': [number + ' tunni', number + ' tundi'],
	            'd' : ['ühe päeva', 'üks päev'],
	            'M' : ['kuu aja', 'kuu aega', 'üks kuu'],
	            'MM': [number + ' kuu', number + ' kuud'],
	            'y' : ['ühe aasta', 'aasta', 'üks aasta'],
	            'yy': [number + ' aasta', number + ' aastat']
	        };
	        if (withoutSuffix) {
	            return format[key][2] ? format[key][2] : format[key][1];
	        }
	        return isFuture ? format[key][0] : format[key][1];
	    }

	    var et = moment.defineLocale('et', {
	        months        : 'jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember'.split('_'),
	        monthsShort   : 'jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets'.split('_'),
	        weekdays      : 'pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev'.split('_'),
	        weekdaysShort : 'P_E_T_K_N_R_L'.split('_'),
	        weekdaysMin   : 'P_E_T_K_N_R_L'.split('_'),
	        longDateFormat : {
	            LT   : 'H:mm',
	            LTS : 'H:mm:ss',
	            L    : 'DD.MM.YYYY',
	            LL   : 'D. MMMM YYYY',
	            LLL  : 'D. MMMM YYYY H:mm',
	            LLLL : 'dddd, D. MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay  : '[Täna,] LT',
	            nextDay  : '[Homme,] LT',
	            nextWeek : '[Järgmine] dddd LT',
	            lastDay  : '[Eile,] LT',
	            lastWeek : '[Eelmine] dddd LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s pärast',
	            past   : '%s tagasi',
	            s      : processRelativeTime,
	            m      : processRelativeTime,
	            mm     : processRelativeTime,
	            h      : processRelativeTime,
	            hh     : processRelativeTime,
	            d      : processRelativeTime,
	            dd     : '%d päeva',
	            M      : processRelativeTime,
	            MM     : processRelativeTime,
	            y      : processRelativeTime,
	            yy     : processRelativeTime
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return et;

	}));

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : euskara (eu)
	//! author : Eneko Illarramendi : https://github.com/eillarra

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var eu = moment.defineLocale('eu', {
	        months : 'urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua'.split('_'),
	        monthsShort : 'urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata'.split('_'),
	        weekdaysShort : 'ig._al._ar._az._og._ol._lr.'.split('_'),
	        weekdaysMin : 'ig_al_ar_az_og_ol_lr'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'YYYY-MM-DD',
	            LL : 'YYYY[ko] MMMM[ren] D[a]',
	            LLL : 'YYYY[ko] MMMM[ren] D[a] HH:mm',
	            LLLL : 'dddd, YYYY[ko] MMMM[ren] D[a] HH:mm',
	            l : 'YYYY-M-D',
	            ll : 'YYYY[ko] MMM D[a]',
	            lll : 'YYYY[ko] MMM D[a] HH:mm',
	            llll : 'ddd, YYYY[ko] MMM D[a] HH:mm'
	        },
	        calendar : {
	            sameDay : '[gaur] LT[etan]',
	            nextDay : '[bihar] LT[etan]',
	            nextWeek : 'dddd LT[etan]',
	            lastDay : '[atzo] LT[etan]',
	            lastWeek : '[aurreko] dddd LT[etan]',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s barru',
	            past : 'duela %s',
	            s : 'segundo batzuk',
	            m : 'minutu bat',
	            mm : '%d minutu',
	            h : 'ordu bat',
	            hh : '%d ordu',
	            d : 'egun bat',
	            dd : '%d egun',
	            M : 'hilabete bat',
	            MM : '%d hilabete',
	            y : 'urte bat',
	            yy : '%d urte'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return eu;

	}));

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Persian (fa)
	//! author : Ebrahim Byagowi : https://github.com/ebraminio

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var symbolMap = {
	        '1': '۱',
	        '2': '۲',
	        '3': '۳',
	        '4': '۴',
	        '5': '۵',
	        '6': '۶',
	        '7': '۷',
	        '8': '۸',
	        '9': '۹',
	        '0': '۰'
	    }, numberMap = {
	        '۱': '1',
	        '۲': '2',
	        '۳': '3',
	        '۴': '4',
	        '۵': '5',
	        '۶': '6',
	        '۷': '7',
	        '۸': '8',
	        '۹': '9',
	        '۰': '0'
	    };

	    var fa = moment.defineLocale('fa', {
	        months : 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
	        monthsShort : 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
	        weekdays : 'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_جمعه_شنبه'.split('_'),
	        weekdaysShort : 'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_جمعه_شنبه'.split('_'),
	        weekdaysMin : 'ی_د_س_چ_پ_ج_ش'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        meridiemParse: /قبل از ظهر|بعد از ظهر/,
	        isPM: function (input) {
	            return /بعد از ظهر/.test(input);
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 12) {
	                return 'قبل از ظهر';
	            } else {
	                return 'بعد از ظهر';
	            }
	        },
	        calendar : {
	            sameDay : '[امروز ساعت] LT',
	            nextDay : '[فردا ساعت] LT',
	            nextWeek : 'dddd [ساعت] LT',
	            lastDay : '[دیروز ساعت] LT',
	            lastWeek : 'dddd [پیش] [ساعت] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'در %s',
	            past : '%s پیش',
	            s : 'چندین ثانیه',
	            m : 'یک دقیقه',
	            mm : '%d دقیقه',
	            h : 'یک ساعت',
	            hh : '%d ساعت',
	            d : 'یک روز',
	            dd : '%d روز',
	            M : 'یک ماه',
	            MM : '%d ماه',
	            y : 'یک سال',
	            yy : '%d سال'
	        },
	        preparse: function (string) {
	            return string.replace(/[۰-۹]/g, function (match) {
	                return numberMap[match];
	            }).replace(/،/g, ',');
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            }).replace(/,/g, '،');
	        },
	        ordinalParse: /\d{1,2}م/,
	        ordinal : '%dم',
	        week : {
	            dow : 6, // Saturday is the first day of the week.
	            doy : 12 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return fa;

	}));

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : finnish (fi)
	//! author : Tarmo Aidantausta : https://github.com/bleadof

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var numbersPast = 'nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän'.split(' '),
	        numbersFuture = [
	            'nolla', 'yhden', 'kahden', 'kolmen', 'neljän', 'viiden', 'kuuden',
	            numbersPast[7], numbersPast[8], numbersPast[9]
	        ];
	    function translate(number, withoutSuffix, key, isFuture) {
	        var result = '';
	        switch (key) {
	        case 's':
	            return isFuture ? 'muutaman sekunnin' : 'muutama sekunti';
	        case 'm':
	            return isFuture ? 'minuutin' : 'minuutti';
	        case 'mm':
	            result = isFuture ? 'minuutin' : 'minuuttia';
	            break;
	        case 'h':
	            return isFuture ? 'tunnin' : 'tunti';
	        case 'hh':
	            result = isFuture ? 'tunnin' : 'tuntia';
	            break;
	        case 'd':
	            return isFuture ? 'päivän' : 'päivä';
	        case 'dd':
	            result = isFuture ? 'päivän' : 'päivää';
	            break;
	        case 'M':
	            return isFuture ? 'kuukauden' : 'kuukausi';
	        case 'MM':
	            result = isFuture ? 'kuukauden' : 'kuukautta';
	            break;
	        case 'y':
	            return isFuture ? 'vuoden' : 'vuosi';
	        case 'yy':
	            result = isFuture ? 'vuoden' : 'vuotta';
	            break;
	        }
	        result = verbalNumber(number, isFuture) + ' ' + result;
	        return result;
	    }
	    function verbalNumber(number, isFuture) {
	        return number < 10 ? (isFuture ? numbersFuture[number] : numbersPast[number]) : number;
	    }

	    var fi = moment.defineLocale('fi', {
	        months : 'tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu'.split('_'),
	        monthsShort : 'tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu'.split('_'),
	        weekdays : 'sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai'.split('_'),
	        weekdaysShort : 'su_ma_ti_ke_to_pe_la'.split('_'),
	        weekdaysMin : 'su_ma_ti_ke_to_pe_la'.split('_'),
	        longDateFormat : {
	            LT : 'HH.mm',
	            LTS : 'HH.mm.ss',
	            L : 'DD.MM.YYYY',
	            LL : 'Do MMMM[ta] YYYY',
	            LLL : 'Do MMMM[ta] YYYY, [klo] HH.mm',
	            LLLL : 'dddd, Do MMMM[ta] YYYY, [klo] HH.mm',
	            l : 'D.M.YYYY',
	            ll : 'Do MMM YYYY',
	            lll : 'Do MMM YYYY, [klo] HH.mm',
	            llll : 'ddd, Do MMM YYYY, [klo] HH.mm'
	        },
	        calendar : {
	            sameDay : '[tänään] [klo] LT',
	            nextDay : '[huomenna] [klo] LT',
	            nextWeek : 'dddd [klo] LT',
	            lastDay : '[eilen] [klo] LT',
	            lastWeek : '[viime] dddd[na] [klo] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s päästä',
	            past : '%s sitten',
	            s : translate,
	            m : translate,
	            mm : translate,
	            h : translate,
	            hh : translate,
	            d : translate,
	            dd : translate,
	            M : translate,
	            MM : translate,
	            y : translate,
	            yy : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return fi;

	}));

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : faroese (fo)
	//! author : Ragnar Johannesen : https://github.com/ragnar123

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var fo = moment.defineLocale('fo', {
	        months : 'januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
	        monthsShort : 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
	        weekdays : 'sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur'.split('_'),
	        weekdaysShort : 'sun_mán_týs_mik_hós_frí_ley'.split('_'),
	        weekdaysMin : 'su_má_tý_mi_hó_fr_le'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D. MMMM, YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[Í dag kl.] LT',
	            nextDay : '[Í morgin kl.] LT',
	            nextWeek : 'dddd [kl.] LT',
	            lastDay : '[Í gjár kl.] LT',
	            lastWeek : '[síðstu] dddd [kl] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'um %s',
	            past : '%s síðani',
	            s : 'fá sekund',
	            m : 'ein minutt',
	            mm : '%d minuttir',
	            h : 'ein tími',
	            hh : '%d tímar',
	            d : 'ein dagur',
	            dd : '%d dagar',
	            M : 'ein mánaði',
	            MM : '%d mánaðir',
	            y : 'eitt ár',
	            yy : '%d ár'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return fo;

	}));

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : french (fr)
	//! author : John Fischer : https://github.com/jfroffice

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var fr = moment.defineLocale('fr', {
	        months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
	        monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
	        weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
	        weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[Aujourd\'hui à] LT',
	            nextDay: '[Demain à] LT',
	            nextWeek: 'dddd [à] LT',
	            lastDay: '[Hier à] LT',
	            lastWeek: 'dddd [dernier à] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'dans %s',
	            past : 'il y a %s',
	            s : 'quelques secondes',
	            m : 'une minute',
	            mm : '%d minutes',
	            h : 'une heure',
	            hh : '%d heures',
	            d : 'un jour',
	            dd : '%d jours',
	            M : 'un mois',
	            MM : '%d mois',
	            y : 'un an',
	            yy : '%d ans'
	        },
	        ordinalParse: /\d{1,2}(er|)/,
	        ordinal : function (number) {
	            return number + (number === 1 ? 'er' : '');
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return fr;

	}));

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : canadian french (fr-ca)
	//! author : Jonathan Abourbih : https://github.com/jonbca

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var fr_ca = moment.defineLocale('fr-ca', {
	        months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
	        monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
	        weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
	        weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'YYYY-MM-DD',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[Aujourd\'hui à] LT',
	            nextDay: '[Demain à] LT',
	            nextWeek: 'dddd [à] LT',
	            lastDay: '[Hier à] LT',
	            lastWeek: 'dddd [dernier à] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'dans %s',
	            past : 'il y a %s',
	            s : 'quelques secondes',
	            m : 'une minute',
	            mm : '%d minutes',
	            h : 'une heure',
	            hh : '%d heures',
	            d : 'un jour',
	            dd : '%d jours',
	            M : 'un mois',
	            MM : '%d mois',
	            y : 'un an',
	            yy : '%d ans'
	        },
	        ordinalParse: /\d{1,2}(er|e)/,
	        ordinal : function (number) {
	            return number + (number === 1 ? 'er' : 'e');
	        }
	    });

	    return fr_ca;

	}));

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : swiss french (fr)
	//! author : Gaspard Bucher : https://github.com/gaspard

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var fr_ch = moment.defineLocale('fr-ch', {
	        months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
	        monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
	        weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
	        weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[Aujourd\'hui à] LT',
	            nextDay: '[Demain à] LT',
	            nextWeek: 'dddd [à] LT',
	            lastDay: '[Hier à] LT',
	            lastWeek: 'dddd [dernier à] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'dans %s',
	            past : 'il y a %s',
	            s : 'quelques secondes',
	            m : 'une minute',
	            mm : '%d minutes',
	            h : 'une heure',
	            hh : '%d heures',
	            d : 'un jour',
	            dd : '%d jours',
	            M : 'un mois',
	            MM : '%d mois',
	            y : 'un an',
	            yy : '%d ans'
	        },
	        ordinalParse: /\d{1,2}(er|e)/,
	        ordinal : function (number) {
	            return number + (number === 1 ? 'er' : 'e');
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return fr_ch;

	}));

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : frisian (fy)
	//! author : Robin van der Vliet : https://github.com/robin0van0der0v

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var monthsShortWithDots = 'jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.'.split('_'),
	        monthsShortWithoutDots = 'jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_');

	    var fy = moment.defineLocale('fy', {
	        months : 'jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber'.split('_'),
	        monthsShort : function (m, format) {
	            if (/-MMM-/.test(format)) {
	                return monthsShortWithoutDots[m.month()];
	            } else {
	                return monthsShortWithDots[m.month()];
	            }
	        },
	        monthsParseExact : true,
	        weekdays : 'snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon'.split('_'),
	        weekdaysShort : 'si._mo._ti._wo._to._fr._so.'.split('_'),
	        weekdaysMin : 'Si_Mo_Ti_Wo_To_Fr_So'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD-MM-YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[hjoed om] LT',
	            nextDay: '[moarn om] LT',
	            nextWeek: 'dddd [om] LT',
	            lastDay: '[juster om] LT',
	            lastWeek: '[ôfrûne] dddd [om] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'oer %s',
	            past : '%s lyn',
	            s : 'in pear sekonden',
	            m : 'ien minút',
	            mm : '%d minuten',
	            h : 'ien oere',
	            hh : '%d oeren',
	            d : 'ien dei',
	            dd : '%d dagen',
	            M : 'ien moanne',
	            MM : '%d moannen',
	            y : 'ien jier',
	            yy : '%d jierren'
	        },
	        ordinalParse: /\d{1,2}(ste|de)/,
	        ordinal : function (number) {
	            return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de');
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return fy;

	}));

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : great britain scottish gealic (gd)
	//! author : Jon Ashdown : https://github.com/jonashdown

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var months = [
	        'Am Faoilleach', 'An Gearran', 'Am Màrt', 'An Giblean', 'An Cèitean', 'An t-Ògmhios', 'An t-Iuchar', 'An Lùnastal', 'An t-Sultain', 'An Dàmhair', 'An t-Samhain', 'An Dùbhlachd'
	    ];

	    var monthsShort = ['Faoi', 'Gear', 'Màrt', 'Gibl', 'Cèit', 'Ògmh', 'Iuch', 'Lùn', 'Sult', 'Dàmh', 'Samh', 'Dùbh'];

	    var weekdays = ['Didòmhnaich', 'Diluain', 'Dimàirt', 'Diciadain', 'Diardaoin', 'Dihaoine', 'Disathairne'];

	    var weekdaysShort = ['Did', 'Dil', 'Dim', 'Dic', 'Dia', 'Dih', 'Dis'];

	    var weekdaysMin = ['Dò', 'Lu', 'Mà', 'Ci', 'Ar', 'Ha', 'Sa'];

	    var gd = moment.defineLocale('gd', {
	        months : months,
	        monthsShort : monthsShort,
	        monthsParseExact : true,
	        weekdays : weekdays,
	        weekdaysShort : weekdaysShort,
	        weekdaysMin : weekdaysMin,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[An-diugh aig] LT',
	            nextDay : '[A-màireach aig] LT',
	            nextWeek : 'dddd [aig] LT',
	            lastDay : '[An-dè aig] LT',
	            lastWeek : 'dddd [seo chaidh] [aig] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'ann an %s',
	            past : 'bho chionn %s',
	            s : 'beagan diogan',
	            m : 'mionaid',
	            mm : '%d mionaidean',
	            h : 'uair',
	            hh : '%d uairean',
	            d : 'latha',
	            dd : '%d latha',
	            M : 'mìos',
	            MM : '%d mìosan',
	            y : 'bliadhna',
	            yy : '%d bliadhna'
	        },
	        ordinalParse : /\d{1,2}(d|na|mh)/,
	        ordinal : function (number) {
	            var output = number === 1 ? 'd' : number % 10 === 2 ? 'na' : 'mh';
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return gd;

	}));

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : galician (gl)
	//! author : Juan G. Hurtado : https://github.com/juanghurtado

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var gl = moment.defineLocale('gl', {
	        months : 'Xaneiro_Febreiro_Marzo_Abril_Maio_Xuño_Xullo_Agosto_Setembro_Outubro_Novembro_Decembro'.split('_'),
	        monthsShort : 'Xan._Feb._Mar._Abr._Mai._Xuñ._Xul._Ago._Set._Out._Nov._Dec.'.split('_'),
	        monthsParseExact: true,
	        weekdays : 'Domingo_Luns_Martes_Mércores_Xoves_Venres_Sábado'.split('_'),
	        weekdaysShort : 'Dom._Lun._Mar._Mér._Xov._Ven._Sáb.'.split('_'),
	        weekdaysMin : 'Do_Lu_Ma_Mé_Xo_Ve_Sá'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY H:mm',
	            LLLL : 'dddd D MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay : function () {
	                return '[hoxe ' + ((this.hours() !== 1) ? 'ás' : 'á') + '] LT';
	            },
	            nextDay : function () {
	                return '[mañá ' + ((this.hours() !== 1) ? 'ás' : 'á') + '] LT';
	            },
	            nextWeek : function () {
	                return 'dddd [' + ((this.hours() !== 1) ? 'ás' : 'a') + '] LT';
	            },
	            lastDay : function () {
	                return '[onte ' + ((this.hours() !== 1) ? 'á' : 'a') + '] LT';
	            },
	            lastWeek : function () {
	                return '[o] dddd [pasado ' + ((this.hours() !== 1) ? 'ás' : 'a') + '] LT';
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : function (str) {
	                if (str === 'uns segundos') {
	                    return 'nuns segundos';
	                }
	                return 'en ' + str;
	            },
	            past : 'hai %s',
	            s : 'uns segundos',
	            m : 'un minuto',
	            mm : '%d minutos',
	            h : 'unha hora',
	            hh : '%d horas',
	            d : 'un día',
	            dd : '%d días',
	            M : 'un mes',
	            MM : '%d meses',
	            y : 'un ano',
	            yy : '%d anos'
	        },
	        ordinalParse : /\d{1,2}º/,
	        ordinal : '%dº',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return gl;

	}));

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Hebrew (he)
	//! author : Tomer Cohen : https://github.com/tomer
	//! author : Moshe Simantov : https://github.com/DevelopmentIL
	//! author : Tal Ater : https://github.com/TalAter

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var he = moment.defineLocale('he', {
	        months : 'ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר'.split('_'),
	        monthsShort : 'ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳'.split('_'),
	        weekdays : 'ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת'.split('_'),
	        weekdaysShort : 'א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳'.split('_'),
	        weekdaysMin : 'א_ב_ג_ד_ה_ו_ש'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D [ב]MMMM YYYY',
	            LLL : 'D [ב]MMMM YYYY HH:mm',
	            LLLL : 'dddd, D [ב]MMMM YYYY HH:mm',
	            l : 'D/M/YYYY',
	            ll : 'D MMM YYYY',
	            lll : 'D MMM YYYY HH:mm',
	            llll : 'ddd, D MMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[היום ב־]LT',
	            nextDay : '[מחר ב־]LT',
	            nextWeek : 'dddd [בשעה] LT',
	            lastDay : '[אתמול ב־]LT',
	            lastWeek : '[ביום] dddd [האחרון בשעה] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'בעוד %s',
	            past : 'לפני %s',
	            s : 'מספר שניות',
	            m : 'דקה',
	            mm : '%d דקות',
	            h : 'שעה',
	            hh : function (number) {
	                if (number === 2) {
	                    return 'שעתיים';
	                }
	                return number + ' שעות';
	            },
	            d : 'יום',
	            dd : function (number) {
	                if (number === 2) {
	                    return 'יומיים';
	                }
	                return number + ' ימים';
	            },
	            M : 'חודש',
	            MM : function (number) {
	                if (number === 2) {
	                    return 'חודשיים';
	                }
	                return number + ' חודשים';
	            },
	            y : 'שנה',
	            yy : function (number) {
	                if (number === 2) {
	                    return 'שנתיים';
	                } else if (number % 10 === 0 && number !== 10) {
	                    return number + ' שנה';
	                }
	                return number + ' שנים';
	            }
	        },
	        meridiemParse: /אחה"צ|לפנה"צ|אחרי הצהריים|לפני הצהריים|לפנות בוקר|בבוקר|בערב/i,
	        isPM : function (input) {
	            return /^(אחה"צ|אחרי הצהריים|בערב)$/.test(input);
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 5) {
	                return 'לפנות בוקר';
	            } else if (hour < 10) {
	                return 'בבוקר';
	            } else if (hour < 12) {
	                return isLower ? 'לפנה"צ' : 'לפני הצהריים';
	            } else if (hour < 18) {
	                return isLower ? 'אחה"צ' : 'אחרי הצהריים';
	            } else {
	                return 'בערב';
	            }
	        }
	    });

	    return he;

	}));

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : hindi (hi)
	//! author : Mayank Singhal : https://github.com/mayanksinghal

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var symbolMap = {
	        '1': '१',
	        '2': '२',
	        '3': '३',
	        '4': '४',
	        '5': '५',
	        '6': '६',
	        '7': '७',
	        '8': '८',
	        '9': '९',
	        '0': '०'
	    },
	    numberMap = {
	        '१': '1',
	        '२': '2',
	        '३': '3',
	        '४': '4',
	        '५': '5',
	        '६': '6',
	        '७': '7',
	        '८': '8',
	        '९': '9',
	        '०': '0'
	    };

	    var hi = moment.defineLocale('hi', {
	        months : 'जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर'.split('_'),
	        monthsShort : 'जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.'.split('_'),
	        monthsParseExact: true,
	        weekdays : 'रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
	        weekdaysShort : 'रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि'.split('_'),
	        weekdaysMin : 'र_सो_मं_बु_गु_शु_श'.split('_'),
	        longDateFormat : {
	            LT : 'A h:mm बजे',
	            LTS : 'A h:mm:ss बजे',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, A h:mm बजे',
	            LLLL : 'dddd, D MMMM YYYY, A h:mm बजे'
	        },
	        calendar : {
	            sameDay : '[आज] LT',
	            nextDay : '[कल] LT',
	            nextWeek : 'dddd, LT',
	            lastDay : '[कल] LT',
	            lastWeek : '[पिछले] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s में',
	            past : '%s पहले',
	            s : 'कुछ ही क्षण',
	            m : 'एक मिनट',
	            mm : '%d मिनट',
	            h : 'एक घंटा',
	            hh : '%d घंटे',
	            d : 'एक दिन',
	            dd : '%d दिन',
	            M : 'एक महीने',
	            MM : '%d महीने',
	            y : 'एक वर्ष',
	            yy : '%d वर्ष'
	        },
	        preparse: function (string) {
	            return string.replace(/[१२३४५६७८९०]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        // Hindi notation for meridiems are quite fuzzy in practice. While there exists
	        // a rigid notion of a 'Pahar' it is not used as rigidly in modern Hindi.
	        meridiemParse: /रात|सुबह|दोपहर|शाम/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'रात') {
	                return hour < 4 ? hour : hour + 12;
	            } else if (meridiem === 'सुबह') {
	                return hour;
	            } else if (meridiem === 'दोपहर') {
	                return hour >= 10 ? hour : hour + 12;
	            } else if (meridiem === 'शाम') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'रात';
	            } else if (hour < 10) {
	                return 'सुबह';
	            } else if (hour < 17) {
	                return 'दोपहर';
	            } else if (hour < 20) {
	                return 'शाम';
	            } else {
	                return 'रात';
	            }
	        },
	        week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return hi;

	}));

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : hrvatski (hr)
	//! author : Bojan Marković : https://github.com/bmarkovic

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function translate(number, withoutSuffix, key) {
	        var result = number + ' ';
	        switch (key) {
	        case 'm':
	            return withoutSuffix ? 'jedna minuta' : 'jedne minute';
	        case 'mm':
	            if (number === 1) {
	                result += 'minuta';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'minute';
	            } else {
	                result += 'minuta';
	            }
	            return result;
	        case 'h':
	            return withoutSuffix ? 'jedan sat' : 'jednog sata';
	        case 'hh':
	            if (number === 1) {
	                result += 'sat';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'sata';
	            } else {
	                result += 'sati';
	            }
	            return result;
	        case 'dd':
	            if (number === 1) {
	                result += 'dan';
	            } else {
	                result += 'dana';
	            }
	            return result;
	        case 'MM':
	            if (number === 1) {
	                result += 'mjesec';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'mjeseca';
	            } else {
	                result += 'mjeseci';
	            }
	            return result;
	        case 'yy':
	            if (number === 1) {
	                result += 'godina';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'godine';
	            } else {
	                result += 'godina';
	            }
	            return result;
	        }
	    }

	    var hr = moment.defineLocale('hr', {
	        months : {
	            format: 'siječnja_veljače_ožujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca'.split('_'),
	            standalone: 'siječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac'.split('_')
	        },
	        monthsShort : 'sij._velj._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.'.split('_'),
	        monthsParseExact: true,
	        weekdays : 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
	        weekdaysShort : 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
	        weekdaysMin : 'ne_po_ut_sr_če_pe_su'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD. MM. YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY H:mm',
	            LLLL : 'dddd, D. MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay  : '[danas u] LT',
	            nextDay  : '[sutra u] LT',
	            nextWeek : function () {
	                switch (this.day()) {
	                case 0:
	                    return '[u] [nedjelju] [u] LT';
	                case 3:
	                    return '[u] [srijedu] [u] LT';
	                case 6:
	                    return '[u] [subotu] [u] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[u] dddd [u] LT';
	                }
	            },
	            lastDay  : '[jučer u] LT',
	            lastWeek : function () {
	                switch (this.day()) {
	                case 0:
	                case 3:
	                    return '[prošlu] dddd [u] LT';
	                case 6:
	                    return '[prošle] [subote] [u] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[prošli] dddd [u] LT';
	                }
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'za %s',
	            past   : 'prije %s',
	            s      : 'par sekundi',
	            m      : translate,
	            mm     : translate,
	            h      : translate,
	            hh     : translate,
	            d      : 'dan',
	            dd     : translate,
	            M      : 'mjesec',
	            MM     : translate,
	            y      : 'godinu',
	            yy     : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return hr;

	}));

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : hungarian (hu)
	//! author : Adam Brunner : https://github.com/adambrunner

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var weekEndings = 'vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton'.split(' ');
	    function translate(number, withoutSuffix, key, isFuture) {
	        var num = number,
	            suffix;
	        switch (key) {
	        case 's':
	            return (isFuture || withoutSuffix) ? 'néhány másodperc' : 'néhány másodperce';
	        case 'm':
	            return 'egy' + (isFuture || withoutSuffix ? ' perc' : ' perce');
	        case 'mm':
	            return num + (isFuture || withoutSuffix ? ' perc' : ' perce');
	        case 'h':
	            return 'egy' + (isFuture || withoutSuffix ? ' óra' : ' órája');
	        case 'hh':
	            return num + (isFuture || withoutSuffix ? ' óra' : ' órája');
	        case 'd':
	            return 'egy' + (isFuture || withoutSuffix ? ' nap' : ' napja');
	        case 'dd':
	            return num + (isFuture || withoutSuffix ? ' nap' : ' napja');
	        case 'M':
	            return 'egy' + (isFuture || withoutSuffix ? ' hónap' : ' hónapja');
	        case 'MM':
	            return num + (isFuture || withoutSuffix ? ' hónap' : ' hónapja');
	        case 'y':
	            return 'egy' + (isFuture || withoutSuffix ? ' év' : ' éve');
	        case 'yy':
	            return num + (isFuture || withoutSuffix ? ' év' : ' éve');
	        }
	        return '';
	    }
	    function week(isFuture) {
	        return (isFuture ? '' : '[múlt] ') + '[' + weekEndings[this.day()] + '] LT[-kor]';
	    }

	    var hu = moment.defineLocale('hu', {
	        months : 'január_február_március_április_május_június_július_augusztus_szeptember_október_november_december'.split('_'),
	        monthsShort : 'jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec'.split('_'),
	        weekdays : 'vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat'.split('_'),
	        weekdaysShort : 'vas_hét_kedd_sze_csüt_pén_szo'.split('_'),
	        weekdaysMin : 'v_h_k_sze_cs_p_szo'.split('_'),
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'YYYY.MM.DD.',
	            LL : 'YYYY. MMMM D.',
	            LLL : 'YYYY. MMMM D. H:mm',
	            LLLL : 'YYYY. MMMM D., dddd H:mm'
	        },
	        meridiemParse: /de|du/i,
	        isPM: function (input) {
	            return input.charAt(1).toLowerCase() === 'u';
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours < 12) {
	                return isLower === true ? 'de' : 'DE';
	            } else {
	                return isLower === true ? 'du' : 'DU';
	            }
	        },
	        calendar : {
	            sameDay : '[ma] LT[-kor]',
	            nextDay : '[holnap] LT[-kor]',
	            nextWeek : function () {
	                return week.call(this, true);
	            },
	            lastDay : '[tegnap] LT[-kor]',
	            lastWeek : function () {
	                return week.call(this, false);
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s múlva',
	            past : '%s',
	            s : translate,
	            m : translate,
	            mm : translate,
	            h : translate,
	            hh : translate,
	            d : translate,
	            dd : translate,
	            M : translate,
	            MM : translate,
	            y : translate,
	            yy : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return hu;

	}));

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Armenian (hy-am)
	//! author : Armendarabyan : https://github.com/armendarabyan

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var hy_am = moment.defineLocale('hy-am', {
	        months : {
	            format: 'հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի'.split('_'),
	            standalone: 'հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր'.split('_')
	        },
	        monthsShort : 'հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ'.split('_'),
	        weekdays : 'կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ'.split('_'),
	        weekdaysShort : 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
	        weekdaysMin : 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY թ.',
	            LLL : 'D MMMM YYYY թ., HH:mm',
	            LLLL : 'dddd, D MMMM YYYY թ., HH:mm'
	        },
	        calendar : {
	            sameDay: '[այսօր] LT',
	            nextDay: '[վաղը] LT',
	            lastDay: '[երեկ] LT',
	            nextWeek: function () {
	                return 'dddd [օրը ժամը] LT';
	            },
	            lastWeek: function () {
	                return '[անցած] dddd [օրը ժամը] LT';
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : '%s հետո',
	            past : '%s առաջ',
	            s : 'մի քանի վայրկյան',
	            m : 'րոպե',
	            mm : '%d րոպե',
	            h : 'ժամ',
	            hh : '%d ժամ',
	            d : 'օր',
	            dd : '%d օր',
	            M : 'ամիս',
	            MM : '%d ամիս',
	            y : 'տարի',
	            yy : '%d տարի'
	        },
	        meridiemParse: /գիշերվա|առավոտվա|ցերեկվա|երեկոյան/,
	        isPM: function (input) {
	            return /^(ցերեկվա|երեկոյան)$/.test(input);
	        },
	        meridiem : function (hour) {
	            if (hour < 4) {
	                return 'գիշերվա';
	            } else if (hour < 12) {
	                return 'առավոտվա';
	            } else if (hour < 17) {
	                return 'ցերեկվա';
	            } else {
	                return 'երեկոյան';
	            }
	        },
	        ordinalParse: /\d{1,2}|\d{1,2}-(ին|րդ)/,
	        ordinal: function (number, period) {
	            switch (period) {
	            case 'DDD':
	            case 'w':
	            case 'W':
	            case 'DDDo':
	                if (number === 1) {
	                    return number + '-ին';
	                }
	                return number + '-րդ';
	            default:
	                return number;
	            }
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return hy_am;

	}));

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Bahasa Indonesia (id)
	//! author : Mohammad Satrio Utomo : https://github.com/tyok
	//! reference: http://id.wikisource.org/wiki/Pedoman_Umum_Ejaan_Bahasa_Indonesia_yang_Disempurnakan

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var id = moment.defineLocale('id', {
	        months : 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des'.split('_'),
	        weekdays : 'Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu'.split('_'),
	        weekdaysShort : 'Min_Sen_Sel_Rab_Kam_Jum_Sab'.split('_'),
	        weekdaysMin : 'Mg_Sn_Sl_Rb_Km_Jm_Sb'.split('_'),
	        longDateFormat : {
	            LT : 'HH.mm',
	            LTS : 'HH.mm.ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY [pukul] HH.mm',
	            LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
	        },
	        meridiemParse: /pagi|siang|sore|malam/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'pagi') {
	                return hour;
	            } else if (meridiem === 'siang') {
	                return hour >= 11 ? hour : hour + 12;
	            } else if (meridiem === 'sore' || meridiem === 'malam') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours < 11) {
	                return 'pagi';
	            } else if (hours < 15) {
	                return 'siang';
	            } else if (hours < 19) {
	                return 'sore';
	            } else {
	                return 'malam';
	            }
	        },
	        calendar : {
	            sameDay : '[Hari ini pukul] LT',
	            nextDay : '[Besok pukul] LT',
	            nextWeek : 'dddd [pukul] LT',
	            lastDay : '[Kemarin pukul] LT',
	            lastWeek : 'dddd [lalu pukul] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'dalam %s',
	            past : '%s yang lalu',
	            s : 'beberapa detik',
	            m : 'semenit',
	            mm : '%d menit',
	            h : 'sejam',
	            hh : '%d jam',
	            d : 'sehari',
	            dd : '%d hari',
	            M : 'sebulan',
	            MM : '%d bulan',
	            y : 'setahun',
	            yy : '%d tahun'
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return id;

	}));

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : icelandic (is)
	//! author : Hinrik Örn Sigurðsson : https://github.com/hinrik

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function plural(n) {
	        if (n % 100 === 11) {
	            return true;
	        } else if (n % 10 === 1) {
	            return false;
	        }
	        return true;
	    }
	    function translate(number, withoutSuffix, key, isFuture) {
	        var result = number + ' ';
	        switch (key) {
	        case 's':
	            return withoutSuffix || isFuture ? 'nokkrar sekúndur' : 'nokkrum sekúndum';
	        case 'm':
	            return withoutSuffix ? 'mínúta' : 'mínútu';
	        case 'mm':
	            if (plural(number)) {
	                return result + (withoutSuffix || isFuture ? 'mínútur' : 'mínútum');
	            } else if (withoutSuffix) {
	                return result + 'mínúta';
	            }
	            return result + 'mínútu';
	        case 'hh':
	            if (plural(number)) {
	                return result + (withoutSuffix || isFuture ? 'klukkustundir' : 'klukkustundum');
	            }
	            return result + 'klukkustund';
	        case 'd':
	            if (withoutSuffix) {
	                return 'dagur';
	            }
	            return isFuture ? 'dag' : 'degi';
	        case 'dd':
	            if (plural(number)) {
	                if (withoutSuffix) {
	                    return result + 'dagar';
	                }
	                return result + (isFuture ? 'daga' : 'dögum');
	            } else if (withoutSuffix) {
	                return result + 'dagur';
	            }
	            return result + (isFuture ? 'dag' : 'degi');
	        case 'M':
	            if (withoutSuffix) {
	                return 'mánuður';
	            }
	            return isFuture ? 'mánuð' : 'mánuði';
	        case 'MM':
	            if (plural(number)) {
	                if (withoutSuffix) {
	                    return result + 'mánuðir';
	                }
	                return result + (isFuture ? 'mánuði' : 'mánuðum');
	            } else if (withoutSuffix) {
	                return result + 'mánuður';
	            }
	            return result + (isFuture ? 'mánuð' : 'mánuði');
	        case 'y':
	            return withoutSuffix || isFuture ? 'ár' : 'ári';
	        case 'yy':
	            if (plural(number)) {
	                return result + (withoutSuffix || isFuture ? 'ár' : 'árum');
	            }
	            return result + (withoutSuffix || isFuture ? 'ár' : 'ári');
	        }
	    }

	    var is = moment.defineLocale('is', {
	        months : 'janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember'.split('_'),
	        monthsShort : 'jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des'.split('_'),
	        weekdays : 'sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur'.split('_'),
	        weekdaysShort : 'sun_mán_þri_mið_fim_fös_lau'.split('_'),
	        weekdaysMin : 'Su_Má_Þr_Mi_Fi_Fö_La'.split('_'),
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY [kl.] H:mm',
	            LLLL : 'dddd, D. MMMM YYYY [kl.] H:mm'
	        },
	        calendar : {
	            sameDay : '[í dag kl.] LT',
	            nextDay : '[á morgun kl.] LT',
	            nextWeek : 'dddd [kl.] LT',
	            lastDay : '[í gær kl.] LT',
	            lastWeek : '[síðasta] dddd [kl.] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'eftir %s',
	            past : 'fyrir %s síðan',
	            s : translate,
	            m : translate,
	            mm : translate,
	            h : 'klukkustund',
	            hh : translate,
	            d : translate,
	            dd : translate,
	            M : translate,
	            MM : translate,
	            y : translate,
	            yy : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return is;

	}));

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : italian (it)
	//! author : Lorenzo : https://github.com/aliem
	//! author: Mattia Larentis: https://github.com/nostalgiaz

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var it = moment.defineLocale('it', {
	        months : 'gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre'.split('_'),
	        monthsShort : 'gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic'.split('_'),
	        weekdays : 'Domenica_Lunedì_Martedì_Mercoledì_Giovedì_Venerdì_Sabato'.split('_'),
	        weekdaysShort : 'Dom_Lun_Mar_Mer_Gio_Ven_Sab'.split('_'),
	        weekdaysMin : 'Do_Lu_Ma_Me_Gi_Ve_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[Oggi alle] LT',
	            nextDay: '[Domani alle] LT',
	            nextWeek: 'dddd [alle] LT',
	            lastDay: '[Ieri alle] LT',
	            lastWeek: function () {
	                switch (this.day()) {
	                    case 0:
	                        return '[la scorsa] dddd [alle] LT';
	                    default:
	                        return '[lo scorso] dddd [alle] LT';
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : function (s) {
	                return ((/^[0-9].+$/).test(s) ? 'tra' : 'in') + ' ' + s;
	            },
	            past : '%s fa',
	            s : 'alcuni secondi',
	            m : 'un minuto',
	            mm : '%d minuti',
	            h : 'un\'ora',
	            hh : '%d ore',
	            d : 'un giorno',
	            dd : '%d giorni',
	            M : 'un mese',
	            MM : '%d mesi',
	            y : 'un anno',
	            yy : '%d anni'
	        },
	        ordinalParse : /\d{1,2}º/,
	        ordinal: '%dº',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return it;

	}));

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : japanese (ja)
	//! author : LI Long : https://github.com/baryon

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var ja = moment.defineLocale('ja', {
	        months : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	        monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	        weekdays : '日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日'.split('_'),
	        weekdaysShort : '日_月_火_水_木_金_土'.split('_'),
	        weekdaysMin : '日_月_火_水_木_金_土'.split('_'),
	        longDateFormat : {
	            LT : 'Ah時m分',
	            LTS : 'Ah時m分s秒',
	            L : 'YYYY/MM/DD',
	            LL : 'YYYY年M月D日',
	            LLL : 'YYYY年M月D日Ah時m分',
	            LLLL : 'YYYY年M月D日Ah時m分 dddd'
	        },
	        meridiemParse: /午前|午後/i,
	        isPM : function (input) {
	            return input === '午後';
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 12) {
	                return '午前';
	            } else {
	                return '午後';
	            }
	        },
	        calendar : {
	            sameDay : '[今日] LT',
	            nextDay : '[明日] LT',
	            nextWeek : '[来週]dddd LT',
	            lastDay : '[昨日] LT',
	            lastWeek : '[前週]dddd LT',
	            sameElse : 'L'
	        },
	        ordinalParse : /\d{1,2}日/,
	        ordinal : function (number, period) {
	            switch (period) {
	            case 'd':
	            case 'D':
	            case 'DDD':
	                return number + '日';
	            default:
	                return number;
	            }
	        },
	        relativeTime : {
	            future : '%s後',
	            past : '%s前',
	            s : '数秒',
	            m : '1分',
	            mm : '%d分',
	            h : '1時間',
	            hh : '%d時間',
	            d : '1日',
	            dd : '%d日',
	            M : '1ヶ月',
	            MM : '%dヶ月',
	            y : '1年',
	            yy : '%d年'
	        }
	    });

	    return ja;

	}));

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Boso Jowo (jv)
	//! author : Rony Lantip : https://github.com/lantip
	//! reference: http://jv.wikipedia.org/wiki/Basa_Jawa

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var jv = moment.defineLocale('jv', {
	        months : 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des'.split('_'),
	        weekdays : 'Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu'.split('_'),
	        weekdaysShort : 'Min_Sen_Sel_Reb_Kem_Jem_Sep'.split('_'),
	        weekdaysMin : 'Mg_Sn_Sl_Rb_Km_Jm_Sp'.split('_'),
	        longDateFormat : {
	            LT : 'HH.mm',
	            LTS : 'HH.mm.ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY [pukul] HH.mm',
	            LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
	        },
	        meridiemParse: /enjing|siyang|sonten|ndalu/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'enjing') {
	                return hour;
	            } else if (meridiem === 'siyang') {
	                return hour >= 11 ? hour : hour + 12;
	            } else if (meridiem === 'sonten' || meridiem === 'ndalu') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours < 11) {
	                return 'enjing';
	            } else if (hours < 15) {
	                return 'siyang';
	            } else if (hours < 19) {
	                return 'sonten';
	            } else {
	                return 'ndalu';
	            }
	        },
	        calendar : {
	            sameDay : '[Dinten puniko pukul] LT',
	            nextDay : '[Mbenjang pukul] LT',
	            nextWeek : 'dddd [pukul] LT',
	            lastDay : '[Kala wingi pukul] LT',
	            lastWeek : 'dddd [kepengker pukul] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'wonten ing %s',
	            past : '%s ingkang kepengker',
	            s : 'sawetawis detik',
	            m : 'setunggal menit',
	            mm : '%d menit',
	            h : 'setunggal jam',
	            hh : '%d jam',
	            d : 'sedinten',
	            dd : '%d dinten',
	            M : 'sewulan',
	            MM : '%d wulan',
	            y : 'setaun',
	            yy : '%d taun'
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return jv;

	}));

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Georgian (ka)
	//! author : Irakli Janiashvili : https://github.com/irakli-janiashvili

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var ka = moment.defineLocale('ka', {
	        months : {
	            standalone: 'იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი'.split('_'),
	            format: 'იანვარს_თებერვალს_მარტს_აპრილის_მაისს_ივნისს_ივლისს_აგვისტს_სექტემბერს_ოქტომბერს_ნოემბერს_დეკემბერს'.split('_')
	        },
	        monthsShort : 'იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ'.split('_'),
	        weekdays : {
	            standalone: 'კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი'.split('_'),
	            format: 'კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს'.split('_'),
	            isFormat: /(წინა|შემდეგ)/
	        },
	        weekdaysShort : 'კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ'.split('_'),
	        weekdaysMin : 'კვ_ორ_სა_ოთ_ხუ_პა_შა'.split('_'),
	        longDateFormat : {
	            LT : 'h:mm A',
	            LTS : 'h:mm:ss A',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY h:mm A',
	            LLLL : 'dddd, D MMMM YYYY h:mm A'
	        },
	        calendar : {
	            sameDay : '[დღეს] LT[-ზე]',
	            nextDay : '[ხვალ] LT[-ზე]',
	            lastDay : '[გუშინ] LT[-ზე]',
	            nextWeek : '[შემდეგ] dddd LT[-ზე]',
	            lastWeek : '[წინა] dddd LT-ზე',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : function (s) {
	                return (/(წამი|წუთი|საათი|წელი)/).test(s) ?
	                    s.replace(/ი$/, 'ში') :
	                    s + 'ში';
	            },
	            past : function (s) {
	                if ((/(წამი|წუთი|საათი|დღე|თვე)/).test(s)) {
	                    return s.replace(/(ი|ე)$/, 'ის წინ');
	                }
	                if ((/წელი/).test(s)) {
	                    return s.replace(/წელი$/, 'წლის წინ');
	                }
	            },
	            s : 'რამდენიმე წამი',
	            m : 'წუთი',
	            mm : '%d წუთი',
	            h : 'საათი',
	            hh : '%d საათი',
	            d : 'დღე',
	            dd : '%d დღე',
	            M : 'თვე',
	            MM : '%d თვე',
	            y : 'წელი',
	            yy : '%d წელი'
	        },
	        ordinalParse: /0|1-ლი|მე-\d{1,2}|\d{1,2}-ე/,
	        ordinal : function (number) {
	            if (number === 0) {
	                return number;
	            }
	            if (number === 1) {
	                return number + '-ლი';
	            }
	            if ((number < 20) || (number <= 100 && (number % 20 === 0)) || (number % 100 === 0)) {
	                return 'მე-' + number;
	            }
	            return number + '-ე';
	        },
	        week : {
	            dow : 1,
	            doy : 7
	        }
	    });

	    return ka;

	}));

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : kazakh (kk)
	//! authors : Nurlan Rakhimzhanov : https://github.com/nurlan

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var suffixes = {
	        0: '-ші',
	        1: '-ші',
	        2: '-ші',
	        3: '-ші',
	        4: '-ші',
	        5: '-ші',
	        6: '-шы',
	        7: '-ші',
	        8: '-ші',
	        9: '-шы',
	        10: '-шы',
	        20: '-шы',
	        30: '-шы',
	        40: '-шы',
	        50: '-ші',
	        60: '-шы',
	        70: '-ші',
	        80: '-ші',
	        90: '-шы',
	        100: '-ші'
	    };

	    var kk = moment.defineLocale('kk', {
	        months : 'қаңтар_ақпан_наурыз_сәуір_мамыр_маусым_шілде_тамыз_қыркүйек_қазан_қараша_желтоқсан'.split('_'),
	        monthsShort : 'қаң_ақп_нау_сәу_мам_мау_шіл_там_қыр_қаз_қар_жел'.split('_'),
	        weekdays : 'жексенбі_дүйсенбі_сейсенбі_сәрсенбі_бейсенбі_жұма_сенбі'.split('_'),
	        weekdaysShort : 'жек_дүй_сей_сәр_бей_жұм_сен'.split('_'),
	        weekdaysMin : 'жк_дй_сй_ср_бй_жм_сн'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[Бүгін сағат] LT',
	            nextDay : '[Ертең сағат] LT',
	            nextWeek : 'dddd [сағат] LT',
	            lastDay : '[Кеше сағат] LT',
	            lastWeek : '[Өткен аптаның] dddd [сағат] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s ішінде',
	            past : '%s бұрын',
	            s : 'бірнеше секунд',
	            m : 'бір минут',
	            mm : '%d минут',
	            h : 'бір сағат',
	            hh : '%d сағат',
	            d : 'бір күн',
	            dd : '%d күн',
	            M : 'бір ай',
	            MM : '%d ай',
	            y : 'бір жыл',
	            yy : '%d жыл'
	        },
	        ordinalParse: /\d{1,2}-(ші|шы)/,
	        ordinal : function (number) {
	            var a = number % 10,
	                b = number >= 100 ? 100 : null;
	            return number + (suffixes[number] || suffixes[a] || suffixes[b]);
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return kk;

	}));

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : khmer (km)
	//! author : Kruy Vanna : https://github.com/kruyvanna

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var km = moment.defineLocale('km', {
	        months: 'មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split('_'),
	        monthsShort: 'មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split('_'),
	        weekdays: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
	        weekdaysShort: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
	        weekdaysMin: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[ថ្ងៃនេះ ម៉ោង] LT',
	            nextDay: '[ស្អែក ម៉ោង] LT',
	            nextWeek: 'dddd [ម៉ោង] LT',
	            lastDay: '[ម្សិលមិញ ម៉ោង] LT',
	            lastWeek: 'dddd [សប្តាហ៍មុន] [ម៉ោង] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: '%sទៀត',
	            past: '%sមុន',
	            s: 'ប៉ុន្មានវិនាទី',
	            m: 'មួយនាទី',
	            mm: '%d នាទី',
	            h: 'មួយម៉ោង',
	            hh: '%d ម៉ោង',
	            d: 'មួយថ្ងៃ',
	            dd: '%d ថ្ងៃ',
	            M: 'មួយខែ',
	            MM: '%d ខែ',
	            y: 'មួយឆ្នាំ',
	            yy: '%d ឆ្នាំ'
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return km;

	}));

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : korean (ko)
	//!
	//! authors
	//!
	//! - Kyungwook, Park : https://github.com/kyungw00k
	//! - Jeeeyul Lee <jeeeyul@gmail.com>

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var ko = moment.defineLocale('ko', {
	        months : '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
	        monthsShort : '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
	        weekdays : '일요일_월요일_화요일_수요일_목요일_금요일_토요일'.split('_'),
	        weekdaysShort : '일_월_화_수_목_금_토'.split('_'),
	        weekdaysMin : '일_월_화_수_목_금_토'.split('_'),
	        longDateFormat : {
	            LT : 'A h시 m분',
	            LTS : 'A h시 m분 s초',
	            L : 'YYYY.MM.DD',
	            LL : 'YYYY년 MMMM D일',
	            LLL : 'YYYY년 MMMM D일 A h시 m분',
	            LLLL : 'YYYY년 MMMM D일 dddd A h시 m분'
	        },
	        calendar : {
	            sameDay : '오늘 LT',
	            nextDay : '내일 LT',
	            nextWeek : 'dddd LT',
	            lastDay : '어제 LT',
	            lastWeek : '지난주 dddd LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s 후',
	            past : '%s 전',
	            s : '몇 초',
	            ss : '%d초',
	            m : '일분',
	            mm : '%d분',
	            h : '한 시간',
	            hh : '%d시간',
	            d : '하루',
	            dd : '%d일',
	            M : '한 달',
	            MM : '%d달',
	            y : '일 년',
	            yy : '%d년'
	        },
	        ordinalParse : /\d{1,2}일/,
	        ordinal : '%d일',
	        meridiemParse : /오전|오후/,
	        isPM : function (token) {
	            return token === '오후';
	        },
	        meridiem : function (hour, minute, isUpper) {
	            return hour < 12 ? '오전' : '오후';
	        }
	    });

	    return ko;

	}));

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : kyrgyz (ky)
	//! author : Chyngyz Arystan uulu : https://github.com/chyngyz

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';



	    var suffixes = {
	        0: '-чү',
	        1: '-чи',
	        2: '-чи',
	        3: '-чү',
	        4: '-чү',
	        5: '-чи',
	        6: '-чы',
	        7: '-чи',
	        8: '-чи',
	        9: '-чу',
	        10: '-чу',
	        20: '-чы',
	        30: '-чу',
	        40: '-чы',
	        50: '-чү',
	        60: '-чы',
	        70: '-чи',
	        80: '-чи',
	        90: '-чу',
	        100: '-чү'
	    };

	    var ky = moment.defineLocale('ky', {
	        months : 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_'),
	        monthsShort : 'янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек'.split('_'),
	        weekdays : 'Жекшемби_Дүйшөмбү_Шейшемби_Шаршемби_Бейшемби_Жума_Ишемби'.split('_'),
	        weekdaysShort : 'Жек_Дүй_Шей_Шар_Бей_Жум_Ише'.split('_'),
	        weekdaysMin : 'Жк_Дй_Шй_Шр_Бй_Жм_Иш'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[Бүгүн саат] LT',
	            nextDay : '[Эртең саат] LT',
	            nextWeek : 'dddd [саат] LT',
	            lastDay : '[Кече саат] LT',
	            lastWeek : '[Өткен аптанын] dddd [күнү] [саат] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s ичинде',
	            past : '%s мурун',
	            s : 'бирнече секунд',
	            m : 'бир мүнөт',
	            mm : '%d мүнөт',
	            h : 'бир саат',
	            hh : '%d саат',
	            d : 'бир күн',
	            dd : '%d күн',
	            M : 'бир ай',
	            MM : '%d ай',
	            y : 'бир жыл',
	            yy : '%d жыл'
	        },
	        ordinalParse: /\d{1,2}-(чи|чы|чү|чу)/,
	        ordinal : function (number) {
	            var a = number % 10,
	                b = number >= 100 ? 100 : null;
	            return number + (suffixes[number] || suffixes[a] || suffixes[b]);
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ky;

	}));

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Luxembourgish (lb)
	//! author : mweimerskirch : https://github.com/mweimerskirch, David Raison : https://github.com/kwisatz

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function processRelativeTime(number, withoutSuffix, key, isFuture) {
	        var format = {
	            'm': ['eng Minutt', 'enger Minutt'],
	            'h': ['eng Stonn', 'enger Stonn'],
	            'd': ['een Dag', 'engem Dag'],
	            'M': ['ee Mount', 'engem Mount'],
	            'y': ['ee Joer', 'engem Joer']
	        };
	        return withoutSuffix ? format[key][0] : format[key][1];
	    }
	    function processFutureTime(string) {
	        var number = string.substr(0, string.indexOf(' '));
	        if (eifelerRegelAppliesToNumber(number)) {
	            return 'a ' + string;
	        }
	        return 'an ' + string;
	    }
	    function processPastTime(string) {
	        var number = string.substr(0, string.indexOf(' '));
	        if (eifelerRegelAppliesToNumber(number)) {
	            return 'viru ' + string;
	        }
	        return 'virun ' + string;
	    }
	    /**
	     * Returns true if the word before the given number loses the '-n' ending.
	     * e.g. 'an 10 Deeg' but 'a 5 Deeg'
	     *
	     * @param number {integer}
	     * @returns {boolean}
	     */
	    function eifelerRegelAppliesToNumber(number) {
	        number = parseInt(number, 10);
	        if (isNaN(number)) {
	            return false;
	        }
	        if (number < 0) {
	            // Negative Number --> always true
	            return true;
	        } else if (number < 10) {
	            // Only 1 digit
	            if (4 <= number && number <= 7) {
	                return true;
	            }
	            return false;
	        } else if (number < 100) {
	            // 2 digits
	            var lastDigit = number % 10, firstDigit = number / 10;
	            if (lastDigit === 0) {
	                return eifelerRegelAppliesToNumber(firstDigit);
	            }
	            return eifelerRegelAppliesToNumber(lastDigit);
	        } else if (number < 10000) {
	            // 3 or 4 digits --> recursively check first digit
	            while (number >= 10) {
	                number = number / 10;
	            }
	            return eifelerRegelAppliesToNumber(number);
	        } else {
	            // Anything larger than 4 digits: recursively check first n-3 digits
	            number = number / 1000;
	            return eifelerRegelAppliesToNumber(number);
	        }
	    }

	    var lb = moment.defineLocale('lb', {
	        months: 'Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
	        monthsShort: 'Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
	        monthsParseExact : true,
	        weekdays: 'Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg'.split('_'),
	        weekdaysShort: 'So._Mé._Dë._Më._Do._Fr._Sa.'.split('_'),
	        weekdaysMin: 'So_Mé_Dë_Më_Do_Fr_Sa'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat: {
	            LT: 'H:mm [Auer]',
	            LTS: 'H:mm:ss [Auer]',
	            L: 'DD.MM.YYYY',
	            LL: 'D. MMMM YYYY',
	            LLL: 'D. MMMM YYYY H:mm [Auer]',
	            LLLL: 'dddd, D. MMMM YYYY H:mm [Auer]'
	        },
	        calendar: {
	            sameDay: '[Haut um] LT',
	            sameElse: 'L',
	            nextDay: '[Muer um] LT',
	            nextWeek: 'dddd [um] LT',
	            lastDay: '[Gëschter um] LT',
	            lastWeek: function () {
	                // Different date string for 'Dënschdeg' (Tuesday) and 'Donneschdeg' (Thursday) due to phonological rule
	                switch (this.day()) {
	                    case 2:
	                    case 4:
	                        return '[Leschten] dddd [um] LT';
	                    default:
	                        return '[Leschte] dddd [um] LT';
	                }
	            }
	        },
	        relativeTime : {
	            future : processFutureTime,
	            past : processPastTime,
	            s : 'e puer Sekonnen',
	            m : processRelativeTime,
	            mm : '%d Minutten',
	            h : processRelativeTime,
	            hh : '%d Stonnen',
	            d : processRelativeTime,
	            dd : '%d Deeg',
	            M : processRelativeTime,
	            MM : '%d Méint',
	            y : processRelativeTime,
	            yy : '%d Joer'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal: '%d.',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return lb;

	}));

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : lao (lo)
	//! author : Ryan Hart : https://github.com/ryanhart2

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var lo = moment.defineLocale('lo', {
	        months : 'ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ'.split('_'),
	        monthsShort : 'ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ'.split('_'),
	        weekdays : 'ອາທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ'.split('_'),
	        weekdaysShort : 'ທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ'.split('_'),
	        weekdaysMin : 'ທ_ຈ_ອຄ_ພ_ພຫ_ສກ_ສ'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'ວັນdddd D MMMM YYYY HH:mm'
	        },
	        meridiemParse: /ຕອນເຊົ້າ|ຕອນແລງ/,
	        isPM: function (input) {
	            return input === 'ຕອນແລງ';
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 12) {
	                return 'ຕອນເຊົ້າ';
	            } else {
	                return 'ຕອນແລງ';
	            }
	        },
	        calendar : {
	            sameDay : '[ມື້ນີ້ເວລາ] LT',
	            nextDay : '[ມື້ອື່ນເວລາ] LT',
	            nextWeek : '[ວັນ]dddd[ໜ້າເວລາ] LT',
	            lastDay : '[ມື້ວານນີ້ເວລາ] LT',
	            lastWeek : '[ວັນ]dddd[ແລ້ວນີ້ເວລາ] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'ອີກ %s',
	            past : '%sຜ່ານມາ',
	            s : 'ບໍ່ເທົ່າໃດວິນາທີ',
	            m : '1 ນາທີ',
	            mm : '%d ນາທີ',
	            h : '1 ຊົ່ວໂມງ',
	            hh : '%d ຊົ່ວໂມງ',
	            d : '1 ມື້',
	            dd : '%d ມື້',
	            M : '1 ເດືອນ',
	            MM : '%d ເດືອນ',
	            y : '1 ປີ',
	            yy : '%d ປີ'
	        },
	        ordinalParse: /(ທີ່)\d{1,2}/,
	        ordinal : function (number) {
	            return 'ທີ່' + number;
	        }
	    });

	    return lo;

	}));

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Lithuanian (lt)
	//! author : Mindaugas Mozūras : https://github.com/mmozuras

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var units = {
	        'm' : 'minutė_minutės_minutę',
	        'mm': 'minutės_minučių_minutes',
	        'h' : 'valanda_valandos_valandą',
	        'hh': 'valandos_valandų_valandas',
	        'd' : 'diena_dienos_dieną',
	        'dd': 'dienos_dienų_dienas',
	        'M' : 'mėnuo_mėnesio_mėnesį',
	        'MM': 'mėnesiai_mėnesių_mėnesius',
	        'y' : 'metai_metų_metus',
	        'yy': 'metai_metų_metus'
	    };
	    function translateSeconds(number, withoutSuffix, key, isFuture) {
	        if (withoutSuffix) {
	            return 'kelios sekundės';
	        } else {
	            return isFuture ? 'kelių sekundžių' : 'kelias sekundes';
	        }
	    }
	    function translateSingular(number, withoutSuffix, key, isFuture) {
	        return withoutSuffix ? forms(key)[0] : (isFuture ? forms(key)[1] : forms(key)[2]);
	    }
	    function special(number) {
	        return number % 10 === 0 || (number > 10 && number < 20);
	    }
	    function forms(key) {
	        return units[key].split('_');
	    }
	    function translate(number, withoutSuffix, key, isFuture) {
	        var result = number + ' ';
	        if (number === 1) {
	            return result + translateSingular(number, withoutSuffix, key[0], isFuture);
	        } else if (withoutSuffix) {
	            return result + (special(number) ? forms(key)[1] : forms(key)[0]);
	        } else {
	            if (isFuture) {
	                return result + forms(key)[1];
	            } else {
	                return result + (special(number) ? forms(key)[1] : forms(key)[2]);
	            }
	        }
	    }
	    var lt = moment.defineLocale('lt', {
	        months : {
	            format: 'sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio'.split('_'),
	            standalone: 'sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis'.split('_')
	        },
	        monthsShort : 'sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd'.split('_'),
	        weekdays : {
	            format: 'sekmadienį_pirmadienį_antradienį_trečiadienį_ketvirtadienį_penktadienį_šeštadienį'.split('_'),
	            standalone: 'sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis'.split('_'),
	            isFormat: /dddd HH:mm/
	        },
	        weekdaysShort : 'Sek_Pir_Ant_Tre_Ket_Pen_Šeš'.split('_'),
	        weekdaysMin : 'S_P_A_T_K_Pn_Š'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'YYYY-MM-DD',
	            LL : 'YYYY [m.] MMMM D [d.]',
	            LLL : 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
	            LLLL : 'YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]',
	            l : 'YYYY-MM-DD',
	            ll : 'YYYY [m.] MMMM D [d.]',
	            lll : 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
	            llll : 'YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]'
	        },
	        calendar : {
	            sameDay : '[Šiandien] LT',
	            nextDay : '[Rytoj] LT',
	            nextWeek : 'dddd LT',
	            lastDay : '[Vakar] LT',
	            lastWeek : '[Praėjusį] dddd LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'po %s',
	            past : 'prieš %s',
	            s : translateSeconds,
	            m : translateSingular,
	            mm : translate,
	            h : translateSingular,
	            hh : translate,
	            d : translateSingular,
	            dd : translate,
	            M : translateSingular,
	            MM : translate,
	            y : translateSingular,
	            yy : translate
	        },
	        ordinalParse: /\d{1,2}-oji/,
	        ordinal : function (number) {
	            return number + '-oji';
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return lt;

	}));

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : latvian (lv)
	//! author : Kristaps Karlsons : https://github.com/skakri
	//! author : Jānis Elmeris : https://github.com/JanisE

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var units = {
	        'm': 'minūtes_minūtēm_minūte_minūtes'.split('_'),
	        'mm': 'minūtes_minūtēm_minūte_minūtes'.split('_'),
	        'h': 'stundas_stundām_stunda_stundas'.split('_'),
	        'hh': 'stundas_stundām_stunda_stundas'.split('_'),
	        'd': 'dienas_dienām_diena_dienas'.split('_'),
	        'dd': 'dienas_dienām_diena_dienas'.split('_'),
	        'M': 'mēneša_mēnešiem_mēnesis_mēneši'.split('_'),
	        'MM': 'mēneša_mēnešiem_mēnesis_mēneši'.split('_'),
	        'y': 'gada_gadiem_gads_gadi'.split('_'),
	        'yy': 'gada_gadiem_gads_gadi'.split('_')
	    };
	    /**
	     * @param withoutSuffix boolean true = a length of time; false = before/after a period of time.
	     */
	    function format(forms, number, withoutSuffix) {
	        if (withoutSuffix) {
	            // E.g. "21 minūte", "3 minūtes".
	            return number % 10 === 1 && number !== 11 ? forms[2] : forms[3];
	        } else {
	            // E.g. "21 minūtes" as in "pēc 21 minūtes".
	            // E.g. "3 minūtēm" as in "pēc 3 minūtēm".
	            return number % 10 === 1 && number !== 11 ? forms[0] : forms[1];
	        }
	    }
	    function relativeTimeWithPlural(number, withoutSuffix, key) {
	        return number + ' ' + format(units[key], number, withoutSuffix);
	    }
	    function relativeTimeWithSingular(number, withoutSuffix, key) {
	        return format(units[key], number, withoutSuffix);
	    }
	    function relativeSeconds(number, withoutSuffix) {
	        return withoutSuffix ? 'dažas sekundes' : 'dažām sekundēm';
	    }

	    var lv = moment.defineLocale('lv', {
	        months : 'janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris'.split('_'),
	        monthsShort : 'jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec'.split('_'),
	        weekdays : 'svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena'.split('_'),
	        weekdaysShort : 'Sv_P_O_T_C_Pk_S'.split('_'),
	        weekdaysMin : 'Sv_P_O_T_C_Pk_S'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY.',
	            LL : 'YYYY. [gada] D. MMMM',
	            LLL : 'YYYY. [gada] D. MMMM, HH:mm',
	            LLLL : 'YYYY. [gada] D. MMMM, dddd, HH:mm'
	        },
	        calendar : {
	            sameDay : '[Šodien pulksten] LT',
	            nextDay : '[Rīt pulksten] LT',
	            nextWeek : 'dddd [pulksten] LT',
	            lastDay : '[Vakar pulksten] LT',
	            lastWeek : '[Pagājušā] dddd [pulksten] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'pēc %s',
	            past : 'pirms %s',
	            s : relativeSeconds,
	            m : relativeTimeWithSingular,
	            mm : relativeTimeWithPlural,
	            h : relativeTimeWithSingular,
	            hh : relativeTimeWithPlural,
	            d : relativeTimeWithSingular,
	            dd : relativeTimeWithPlural,
	            M : relativeTimeWithSingular,
	            MM : relativeTimeWithPlural,
	            y : relativeTimeWithSingular,
	            yy : relativeTimeWithPlural
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return lv;

	}));

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Montenegrin (me)
	//! author : Miodrag Nikač <miodrag@restartit.me> : https://github.com/miodragnikac

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var translator = {
	        words: { //Different grammatical cases
	            m: ['jedan minut', 'jednog minuta'],
	            mm: ['minut', 'minuta', 'minuta'],
	            h: ['jedan sat', 'jednog sata'],
	            hh: ['sat', 'sata', 'sati'],
	            dd: ['dan', 'dana', 'dana'],
	            MM: ['mjesec', 'mjeseca', 'mjeseci'],
	            yy: ['godina', 'godine', 'godina']
	        },
	        correctGrammaticalCase: function (number, wordKey) {
	            return number === 1 ? wordKey[0] : (number >= 2 && number <= 4 ? wordKey[1] : wordKey[2]);
	        },
	        translate: function (number, withoutSuffix, key) {
	            var wordKey = translator.words[key];
	            if (key.length === 1) {
	                return withoutSuffix ? wordKey[0] : wordKey[1];
	            } else {
	                return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
	            }
	        }
	    };

	    var me = moment.defineLocale('me', {
	        months: 'januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar'.split('_'),
	        monthsShort: 'jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.'.split('_'),
	        monthsParseExact : true,
	        weekdays: 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
	        weekdaysShort: 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
	        weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat: {
	            LT: 'H:mm',
	            LTS : 'H:mm:ss',
	            L: 'DD. MM. YYYY',
	            LL: 'D. MMMM YYYY',
	            LLL: 'D. MMMM YYYY H:mm',
	            LLLL: 'dddd, D. MMMM YYYY H:mm'
	        },
	        calendar: {
	            sameDay: '[danas u] LT',
	            nextDay: '[sjutra u] LT',

	            nextWeek: function () {
	                switch (this.day()) {
	                case 0:
	                    return '[u] [nedjelju] [u] LT';
	                case 3:
	                    return '[u] [srijedu] [u] LT';
	                case 6:
	                    return '[u] [subotu] [u] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[u] dddd [u] LT';
	                }
	            },
	            lastDay  : '[juče u] LT',
	            lastWeek : function () {
	                var lastWeekDays = [
	                    '[prošle] [nedjelje] [u] LT',
	                    '[prošlog] [ponedjeljka] [u] LT',
	                    '[prošlog] [utorka] [u] LT',
	                    '[prošle] [srijede] [u] LT',
	                    '[prošlog] [četvrtka] [u] LT',
	                    '[prošlog] [petka] [u] LT',
	                    '[prošle] [subote] [u] LT'
	                ];
	                return lastWeekDays[this.day()];
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'za %s',
	            past   : 'prije %s',
	            s      : 'nekoliko sekundi',
	            m      : translator.translate,
	            mm     : translator.translate,
	            h      : translator.translate,
	            hh     : translator.translate,
	            d      : 'dan',
	            dd     : translator.translate,
	            M      : 'mjesec',
	            MM     : translator.translate,
	            y      : 'godinu',
	            yy     : translator.translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return me;

	}));

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : macedonian (mk)
	//! author : Borislav Mickov : https://github.com/B0k0

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var mk = moment.defineLocale('mk', {
	        months : 'јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември'.split('_'),
	        monthsShort : 'јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек'.split('_'),
	        weekdays : 'недела_понеделник_вторник_среда_четврток_петок_сабота'.split('_'),
	        weekdaysShort : 'нед_пон_вто_сре_чет_пет_саб'.split('_'),
	        weekdaysMin : 'нe_пo_вт_ср_че_пе_сa'.split('_'),
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'D.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY H:mm',
	            LLLL : 'dddd, D MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay : '[Денес во] LT',
	            nextDay : '[Утре во] LT',
	            nextWeek : '[Во] dddd [во] LT',
	            lastDay : '[Вчера во] LT',
	            lastWeek : function () {
	                switch (this.day()) {
	                case 0:
	                case 3:
	                case 6:
	                    return '[Изминатата] dddd [во] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[Изминатиот] dddd [во] LT';
	                }
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'после %s',
	            past : 'пред %s',
	            s : 'неколку секунди',
	            m : 'минута',
	            mm : '%d минути',
	            h : 'час',
	            hh : '%d часа',
	            d : 'ден',
	            dd : '%d дена',
	            M : 'месец',
	            MM : '%d месеци',
	            y : 'година',
	            yy : '%d години'
	        },
	        ordinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
	        ordinal : function (number) {
	            var lastDigit = number % 10,
	                last2Digits = number % 100;
	            if (number === 0) {
	                return number + '-ев';
	            } else if (last2Digits === 0) {
	                return number + '-ен';
	            } else if (last2Digits > 10 && last2Digits < 20) {
	                return number + '-ти';
	            } else if (lastDigit === 1) {
	                return number + '-ви';
	            } else if (lastDigit === 2) {
	                return number + '-ри';
	            } else if (lastDigit === 7 || lastDigit === 8) {
	                return number + '-ми';
	            } else {
	                return number + '-ти';
	            }
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return mk;

	}));

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : malayalam (ml)
	//! author : Floyd Pink : https://github.com/floydpink

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var ml = moment.defineLocale('ml', {
	        months : 'ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ'.split('_'),
	        monthsShort : 'ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച'.split('_'),
	        weekdaysShort : 'ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി'.split('_'),
	        weekdaysMin : 'ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ'.split('_'),
	        longDateFormat : {
	            LT : 'A h:mm -നു',
	            LTS : 'A h:mm:ss -നു',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, A h:mm -നു',
	            LLLL : 'dddd, D MMMM YYYY, A h:mm -നു'
	        },
	        calendar : {
	            sameDay : '[ഇന്ന്] LT',
	            nextDay : '[നാളെ] LT',
	            nextWeek : 'dddd, LT',
	            lastDay : '[ഇന്നലെ] LT',
	            lastWeek : '[കഴിഞ്ഞ] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s കഴിഞ്ഞ്',
	            past : '%s മുൻപ്',
	            s : 'അൽപ നിമിഷങ്ങൾ',
	            m : 'ഒരു മിനിറ്റ്',
	            mm : '%d മിനിറ്റ്',
	            h : 'ഒരു മണിക്കൂർ',
	            hh : '%d മണിക്കൂർ',
	            d : 'ഒരു ദിവസം',
	            dd : '%d ദിവസം',
	            M : 'ഒരു മാസം',
	            MM : '%d മാസം',
	            y : 'ഒരു വർഷം',
	            yy : '%d വർഷം'
	        },
	        meridiemParse: /രാത്രി|രാവിലെ|ഉച്ച കഴിഞ്ഞ്|വൈകുന്നേരം|രാത്രി/i,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if ((meridiem === 'രാത്രി' && hour >= 4) ||
	                    meridiem === 'ഉച്ച കഴിഞ്ഞ്' ||
	                    meridiem === 'വൈകുന്നേരം') {
	                return hour + 12;
	            } else {
	                return hour;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'രാത്രി';
	            } else if (hour < 12) {
	                return 'രാവിലെ';
	            } else if (hour < 17) {
	                return 'ഉച്ച കഴിഞ്ഞ്';
	            } else if (hour < 20) {
	                return 'വൈകുന്നേരം';
	            } else {
	                return 'രാത്രി';
	            }
	        }
	    });

	    return ml;

	}));

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Marathi (mr)
	//! author : Harshad Kale : https://github.com/kalehv
	//! author : Vivek Athalye : https://github.com/vnathalye

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var symbolMap = {
	        '1': '१',
	        '2': '२',
	        '3': '३',
	        '4': '४',
	        '5': '५',
	        '6': '६',
	        '7': '७',
	        '8': '८',
	        '9': '९',
	        '0': '०'
	    },
	    numberMap = {
	        '१': '1',
	        '२': '2',
	        '३': '3',
	        '४': '4',
	        '५': '5',
	        '६': '6',
	        '७': '7',
	        '८': '8',
	        '९': '9',
	        '०': '0'
	    };

	    function relativeTimeMr(number, withoutSuffix, string, isFuture)
	    {
	        var output = '';
	        if (withoutSuffix) {
	            switch (string) {
	                case 's': output = 'काही सेकंद'; break;
	                case 'm': output = 'एक मिनिट'; break;
	                case 'mm': output = '%d मिनिटे'; break;
	                case 'h': output = 'एक तास'; break;
	                case 'hh': output = '%d तास'; break;
	                case 'd': output = 'एक दिवस'; break;
	                case 'dd': output = '%d दिवस'; break;
	                case 'M': output = 'एक महिना'; break;
	                case 'MM': output = '%d महिने'; break;
	                case 'y': output = 'एक वर्ष'; break;
	                case 'yy': output = '%d वर्षे'; break;
	            }
	        }
	        else {
	            switch (string) {
	                case 's': output = 'काही सेकंदां'; break;
	                case 'm': output = 'एका मिनिटा'; break;
	                case 'mm': output = '%d मिनिटां'; break;
	                case 'h': output = 'एका तासा'; break;
	                case 'hh': output = '%d तासां'; break;
	                case 'd': output = 'एका दिवसा'; break;
	                case 'dd': output = '%d दिवसां'; break;
	                case 'M': output = 'एका महिन्या'; break;
	                case 'MM': output = '%d महिन्यां'; break;
	                case 'y': output = 'एका वर्षा'; break;
	                case 'yy': output = '%d वर्षां'; break;
	            }
	        }
	        return output.replace(/%d/i, number);
	    }

	    var mr = moment.defineLocale('mr', {
	        months : 'जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर'.split('_'),
	        monthsShort: 'जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
	        weekdaysShort : 'रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि'.split('_'),
	        weekdaysMin : 'र_सो_मं_बु_गु_शु_श'.split('_'),
	        longDateFormat : {
	            LT : 'A h:mm वाजता',
	            LTS : 'A h:mm:ss वाजता',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, A h:mm वाजता',
	            LLLL : 'dddd, D MMMM YYYY, A h:mm वाजता'
	        },
	        calendar : {
	            sameDay : '[आज] LT',
	            nextDay : '[उद्या] LT',
	            nextWeek : 'dddd, LT',
	            lastDay : '[काल] LT',
	            lastWeek: '[मागील] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future: '%sमध्ये',
	            past: '%sपूर्वी',
	            s: relativeTimeMr,
	            m: relativeTimeMr,
	            mm: relativeTimeMr,
	            h: relativeTimeMr,
	            hh: relativeTimeMr,
	            d: relativeTimeMr,
	            dd: relativeTimeMr,
	            M: relativeTimeMr,
	            MM: relativeTimeMr,
	            y: relativeTimeMr,
	            yy: relativeTimeMr
	        },
	        preparse: function (string) {
	            return string.replace(/[१२३४५६७८९०]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        meridiemParse: /रात्री|सकाळी|दुपारी|सायंकाळी/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'रात्री') {
	                return hour < 4 ? hour : hour + 12;
	            } else if (meridiem === 'सकाळी') {
	                return hour;
	            } else if (meridiem === 'दुपारी') {
	                return hour >= 10 ? hour : hour + 12;
	            } else if (meridiem === 'सायंकाळी') {
	                return hour + 12;
	            }
	        },
	        meridiem: function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'रात्री';
	            } else if (hour < 10) {
	                return 'सकाळी';
	            } else if (hour < 17) {
	                return 'दुपारी';
	            } else if (hour < 20) {
	                return 'सायंकाळी';
	            } else {
	                return 'रात्री';
	            }
	        },
	        week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return mr;

	}));

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Bahasa Malaysia (ms-MY)
	//! author : Weldan Jamili : https://github.com/weldan

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var ms = moment.defineLocale('ms', {
	        months : 'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split('_'),
	        monthsShort : 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
	        weekdays : 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
	        weekdaysShort : 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
	        weekdaysMin : 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
	        longDateFormat : {
	            LT : 'HH.mm',
	            LTS : 'HH.mm.ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY [pukul] HH.mm',
	            LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
	        },
	        meridiemParse: /pagi|tengahari|petang|malam/,
	        meridiemHour: function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'pagi') {
	                return hour;
	            } else if (meridiem === 'tengahari') {
	                return hour >= 11 ? hour : hour + 12;
	            } else if (meridiem === 'petang' || meridiem === 'malam') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours < 11) {
	                return 'pagi';
	            } else if (hours < 15) {
	                return 'tengahari';
	            } else if (hours < 19) {
	                return 'petang';
	            } else {
	                return 'malam';
	            }
	        },
	        calendar : {
	            sameDay : '[Hari ini pukul] LT',
	            nextDay : '[Esok pukul] LT',
	            nextWeek : 'dddd [pukul] LT',
	            lastDay : '[Kelmarin pukul] LT',
	            lastWeek : 'dddd [lepas pukul] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'dalam %s',
	            past : '%s yang lepas',
	            s : 'beberapa saat',
	            m : 'seminit',
	            mm : '%d minit',
	            h : 'sejam',
	            hh : '%d jam',
	            d : 'sehari',
	            dd : '%d hari',
	            M : 'sebulan',
	            MM : '%d bulan',
	            y : 'setahun',
	            yy : '%d tahun'
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ms;

	}));

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Bahasa Malaysia (ms-MY)
	//! author : Weldan Jamili : https://github.com/weldan

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var ms_my = moment.defineLocale('ms-my', {
	        months : 'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split('_'),
	        monthsShort : 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
	        weekdays : 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
	        weekdaysShort : 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
	        weekdaysMin : 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
	        longDateFormat : {
	            LT : 'HH.mm',
	            LTS : 'HH.mm.ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY [pukul] HH.mm',
	            LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
	        },
	        meridiemParse: /pagi|tengahari|petang|malam/,
	        meridiemHour: function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'pagi') {
	                return hour;
	            } else if (meridiem === 'tengahari') {
	                return hour >= 11 ? hour : hour + 12;
	            } else if (meridiem === 'petang' || meridiem === 'malam') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours < 11) {
	                return 'pagi';
	            } else if (hours < 15) {
	                return 'tengahari';
	            } else if (hours < 19) {
	                return 'petang';
	            } else {
	                return 'malam';
	            }
	        },
	        calendar : {
	            sameDay : '[Hari ini pukul] LT',
	            nextDay : '[Esok pukul] LT',
	            nextWeek : 'dddd [pukul] LT',
	            lastDay : '[Kelmarin pukul] LT',
	            lastWeek : 'dddd [lepas pukul] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'dalam %s',
	            past : '%s yang lepas',
	            s : 'beberapa saat',
	            m : 'seminit',
	            mm : '%d minit',
	            h : 'sejam',
	            hh : '%d jam',
	            d : 'sehari',
	            dd : '%d hari',
	            M : 'sebulan',
	            MM : '%d bulan',
	            y : 'setahun',
	            yy : '%d tahun'
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ms_my;

	}));

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Burmese (my)
	//! author : Squar team, mysquar.com

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var symbolMap = {
	        '1': '၁',
	        '2': '၂',
	        '3': '၃',
	        '4': '၄',
	        '5': '၅',
	        '6': '၆',
	        '7': '၇',
	        '8': '၈',
	        '9': '၉',
	        '0': '၀'
	    }, numberMap = {
	        '၁': '1',
	        '၂': '2',
	        '၃': '3',
	        '၄': '4',
	        '၅': '5',
	        '၆': '6',
	        '၇': '7',
	        '၈': '8',
	        '၉': '9',
	        '၀': '0'
	    };

	    var my = moment.defineLocale('my', {
	        months: 'ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ'.split('_'),
	        monthsShort: 'ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ'.split('_'),
	        weekdays: 'တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ'.split('_'),
	        weekdaysShort: 'နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),
	        weekdaysMin: 'နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),

	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[ယနေ.] LT [မှာ]',
	            nextDay: '[မနက်ဖြန်] LT [မှာ]',
	            nextWeek: 'dddd LT [မှာ]',
	            lastDay: '[မနေ.က] LT [မှာ]',
	            lastWeek: '[ပြီးခဲ့သော] dddd LT [မှာ]',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'လာမည့် %s မှာ',
	            past: 'လွန်ခဲ့သော %s က',
	            s: 'စက္ကန်.အနည်းငယ်',
	            m: 'တစ်မိနစ်',
	            mm: '%d မိနစ်',
	            h: 'တစ်နာရီ',
	            hh: '%d နာရီ',
	            d: 'တစ်ရက်',
	            dd: '%d ရက်',
	            M: 'တစ်လ',
	            MM: '%d လ',
	            y: 'တစ်နှစ်',
	            yy: '%d နှစ်'
	        },
	        preparse: function (string) {
	            return string.replace(/[၁၂၃၄၅၆၇၈၉၀]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return my;

	}));

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : norwegian bokmål (nb)
	//! authors : Espen Hovlandsdal : https://github.com/rexxars
	//!           Sigurd Gartmann : https://github.com/sigurdga

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var nb = moment.defineLocale('nb', {
	        months : 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
	        monthsShort : 'jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
	        weekdaysShort : 'sø._ma._ti._on._to._fr._lø.'.split('_'),
	        weekdaysMin : 'sø_ma_ti_on_to_fr_lø'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY [kl.] HH:mm',
	            LLLL : 'dddd D. MMMM YYYY [kl.] HH:mm'
	        },
	        calendar : {
	            sameDay: '[i dag kl.] LT',
	            nextDay: '[i morgen kl.] LT',
	            nextWeek: 'dddd [kl.] LT',
	            lastDay: '[i går kl.] LT',
	            lastWeek: '[forrige] dddd [kl.] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'om %s',
	            past : '%s siden',
	            s : 'noen sekunder',
	            m : 'ett minutt',
	            mm : '%d minutter',
	            h : 'en time',
	            hh : '%d timer',
	            d : 'en dag',
	            dd : '%d dager',
	            M : 'en måned',
	            MM : '%d måneder',
	            y : 'ett år',
	            yy : '%d år'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return nb;

	}));

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : nepali/nepalese
	//! author : suvash : https://github.com/suvash

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var symbolMap = {
	        '1': '१',
	        '2': '२',
	        '3': '३',
	        '4': '४',
	        '5': '५',
	        '6': '६',
	        '7': '७',
	        '8': '८',
	        '9': '९',
	        '0': '०'
	    },
	    numberMap = {
	        '१': '1',
	        '२': '2',
	        '३': '3',
	        '४': '4',
	        '५': '5',
	        '६': '6',
	        '७': '7',
	        '८': '8',
	        '९': '9',
	        '०': '0'
	    };

	    var ne = moment.defineLocale('ne', {
	        months : 'जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर'.split('_'),
	        monthsShort : 'जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार'.split('_'),
	        weekdaysShort : 'आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.'.split('_'),
	        weekdaysMin : 'आ._सो._मं._बु._बि._शु._श.'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'Aको h:mm बजे',
	            LTS : 'Aको h:mm:ss बजे',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, Aको h:mm बजे',
	            LLLL : 'dddd, D MMMM YYYY, Aको h:mm बजे'
	        },
	        preparse: function (string) {
	            return string.replace(/[१२३४५६७८९०]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        meridiemParse: /राति|बिहान|दिउँसो|साँझ/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'राति') {
	                return hour < 4 ? hour : hour + 12;
	            } else if (meridiem === 'बिहान') {
	                return hour;
	            } else if (meridiem === 'दिउँसो') {
	                return hour >= 10 ? hour : hour + 12;
	            } else if (meridiem === 'साँझ') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 3) {
	                return 'राति';
	            } else if (hour < 12) {
	                return 'बिहान';
	            } else if (hour < 16) {
	                return 'दिउँसो';
	            } else if (hour < 20) {
	                return 'साँझ';
	            } else {
	                return 'राति';
	            }
	        },
	        calendar : {
	            sameDay : '[आज] LT',
	            nextDay : '[भोलि] LT',
	            nextWeek : '[आउँदो] dddd[,] LT',
	            lastDay : '[हिजो] LT',
	            lastWeek : '[गएको] dddd[,] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%sमा',
	            past : '%s अगाडि',
	            s : 'केही क्षण',
	            m : 'एक मिनेट',
	            mm : '%d मिनेट',
	            h : 'एक घण्टा',
	            hh : '%d घण्टा',
	            d : 'एक दिन',
	            dd : '%d दिन',
	            M : 'एक महिना',
	            MM : '%d महिना',
	            y : 'एक बर्ष',
	            yy : '%d बर्ष'
	        },
	        week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ne;

	}));

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : dutch (nl)
	//! author : Joris Röling : https://github.com/jjupiter

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var monthsShortWithDots = 'jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.'.split('_'),
	        monthsShortWithoutDots = 'jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec'.split('_');

	    var nl = moment.defineLocale('nl', {
	        months : 'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split('_'),
	        monthsShort : function (m, format) {
	            if (/-MMM-/.test(format)) {
	                return monthsShortWithoutDots[m.month()];
	            } else {
	                return monthsShortWithDots[m.month()];
	            }
	        },
	        monthsParseExact : true,
	        weekdays : 'zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag'.split('_'),
	        weekdaysShort : 'zo._ma._di._wo._do._vr._za.'.split('_'),
	        weekdaysMin : 'Zo_Ma_Di_Wo_Do_Vr_Za'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD-MM-YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[vandaag om] LT',
	            nextDay: '[morgen om] LT',
	            nextWeek: 'dddd [om] LT',
	            lastDay: '[gisteren om] LT',
	            lastWeek: '[afgelopen] dddd [om] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'over %s',
	            past : '%s geleden',
	            s : 'een paar seconden',
	            m : 'één minuut',
	            mm : '%d minuten',
	            h : 'één uur',
	            hh : '%d uur',
	            d : 'één dag',
	            dd : '%d dagen',
	            M : 'één maand',
	            MM : '%d maanden',
	            y : 'één jaar',
	            yy : '%d jaar'
	        },
	        ordinalParse: /\d{1,2}(ste|de)/,
	        ordinal : function (number) {
	            return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de');
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return nl;

	}));

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : norwegian nynorsk (nn)
	//! author : https://github.com/mechuwind

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var nn = moment.defineLocale('nn', {
	        months : 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
	        monthsShort : 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
	        weekdays : 'sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag'.split('_'),
	        weekdaysShort : 'sun_mån_tys_ons_tor_fre_lau'.split('_'),
	        weekdaysMin : 'su_må_ty_on_to_fr_lø'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY [kl.] H:mm',
	            LLLL : 'dddd D. MMMM YYYY [kl.] HH:mm'
	        },
	        calendar : {
	            sameDay: '[I dag klokka] LT',
	            nextDay: '[I morgon klokka] LT',
	            nextWeek: 'dddd [klokka] LT',
	            lastDay: '[I går klokka] LT',
	            lastWeek: '[Føregåande] dddd [klokka] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'om %s',
	            past : '%s sidan',
	            s : 'nokre sekund',
	            m : 'eit minutt',
	            mm : '%d minutt',
	            h : 'ein time',
	            hh : '%d timar',
	            d : 'ein dag',
	            dd : '%d dagar',
	            M : 'ein månad',
	            MM : '%d månader',
	            y : 'eit år',
	            yy : '%d år'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return nn;

	}));

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : punjabi india (pa-in)
	//! author : Harpreet Singh : https://github.com/harpreetkhalsagtbit

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var symbolMap = {
	        '1': '੧',
	        '2': '੨',
	        '3': '੩',
	        '4': '੪',
	        '5': '੫',
	        '6': '੬',
	        '7': '੭',
	        '8': '੮',
	        '9': '੯',
	        '0': '੦'
	    },
	    numberMap = {
	        '੧': '1',
	        '੨': '2',
	        '੩': '3',
	        '੪': '4',
	        '੫': '5',
	        '੬': '6',
	        '੭': '7',
	        '੮': '8',
	        '੯': '9',
	        '੦': '0'
	    };

	    var pa_in = moment.defineLocale('pa-in', {
	        // There are months name as per Nanakshahi Calender but they are not used as rigidly in modern Punjabi.
	        months : 'ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ'.split('_'),
	        monthsShort : 'ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ'.split('_'),
	        weekdays : 'ਐਤਵਾਰ_ਸੋਮਵਾਰ_ਮੰਗਲਵਾਰ_ਬੁਧਵਾਰ_ਵੀਰਵਾਰ_ਸ਼ੁੱਕਰਵਾਰ_ਸ਼ਨੀਚਰਵਾਰ'.split('_'),
	        weekdaysShort : 'ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ'.split('_'),
	        weekdaysMin : 'ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ'.split('_'),
	        longDateFormat : {
	            LT : 'A h:mm ਵਜੇ',
	            LTS : 'A h:mm:ss ਵਜੇ',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, A h:mm ਵਜੇ',
	            LLLL : 'dddd, D MMMM YYYY, A h:mm ਵਜੇ'
	        },
	        calendar : {
	            sameDay : '[ਅਜ] LT',
	            nextDay : '[ਕਲ] LT',
	            nextWeek : 'dddd, LT',
	            lastDay : '[ਕਲ] LT',
	            lastWeek : '[ਪਿਛਲੇ] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s ਵਿੱਚ',
	            past : '%s ਪਿਛਲੇ',
	            s : 'ਕੁਝ ਸਕਿੰਟ',
	            m : 'ਇਕ ਮਿੰਟ',
	            mm : '%d ਮਿੰਟ',
	            h : 'ਇੱਕ ਘੰਟਾ',
	            hh : '%d ਘੰਟੇ',
	            d : 'ਇੱਕ ਦਿਨ',
	            dd : '%d ਦਿਨ',
	            M : 'ਇੱਕ ਮਹੀਨਾ',
	            MM : '%d ਮਹੀਨੇ',
	            y : 'ਇੱਕ ਸਾਲ',
	            yy : '%d ਸਾਲ'
	        },
	        preparse: function (string) {
	            return string.replace(/[੧੨੩੪੫੬੭੮੯੦]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        // Punjabi notation for meridiems are quite fuzzy in practice. While there exists
	        // a rigid notion of a 'Pahar' it is not used as rigidly in modern Punjabi.
	        meridiemParse: /ਰਾਤ|ਸਵੇਰ|ਦੁਪਹਿਰ|ਸ਼ਾਮ/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'ਰਾਤ') {
	                return hour < 4 ? hour : hour + 12;
	            } else if (meridiem === 'ਸਵੇਰ') {
	                return hour;
	            } else if (meridiem === 'ਦੁਪਹਿਰ') {
	                return hour >= 10 ? hour : hour + 12;
	            } else if (meridiem === 'ਸ਼ਾਮ') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'ਰਾਤ';
	            } else if (hour < 10) {
	                return 'ਸਵੇਰ';
	            } else if (hour < 17) {
	                return 'ਦੁਪਹਿਰ';
	            } else if (hour < 20) {
	                return 'ਸ਼ਾਮ';
	            } else {
	                return 'ਰਾਤ';
	            }
	        },
	        week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return pa_in;

	}));

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : polish (pl)
	//! author : Rafal Hirsz : https://github.com/evoL

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var monthsNominative = 'styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień'.split('_'),
	        monthsSubjective = 'stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia'.split('_');
	    function plural(n) {
	        return (n % 10 < 5) && (n % 10 > 1) && ((~~(n / 10) % 10) !== 1);
	    }
	    function translate(number, withoutSuffix, key) {
	        var result = number + ' ';
	        switch (key) {
	        case 'm':
	            return withoutSuffix ? 'minuta' : 'minutę';
	        case 'mm':
	            return result + (plural(number) ? 'minuty' : 'minut');
	        case 'h':
	            return withoutSuffix  ? 'godzina'  : 'godzinę';
	        case 'hh':
	            return result + (plural(number) ? 'godziny' : 'godzin');
	        case 'MM':
	            return result + (plural(number) ? 'miesiące' : 'miesięcy');
	        case 'yy':
	            return result + (plural(number) ? 'lata' : 'lat');
	        }
	    }

	    var pl = moment.defineLocale('pl', {
	        months : function (momentToFormat, format) {
	            if (format === '') {
	                // Hack: if format empty we know this is used to generate
	                // RegExp by moment. Give then back both valid forms of months
	                // in RegExp ready format.
	                return '(' + monthsSubjective[momentToFormat.month()] + '|' + monthsNominative[momentToFormat.month()] + ')';
	            } else if (/D MMMM/.test(format)) {
	                return monthsSubjective[momentToFormat.month()];
	            } else {
	                return monthsNominative[momentToFormat.month()];
	            }
	        },
	        monthsShort : 'sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru'.split('_'),
	        weekdays : 'niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota'.split('_'),
	        weekdaysShort : 'nie_pon_wt_śr_czw_pt_sb'.split('_'),
	        weekdaysMin : 'Nd_Pn_Wt_Śr_Cz_Pt_So'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[Dziś o] LT',
	            nextDay: '[Jutro o] LT',
	            nextWeek: '[W] dddd [o] LT',
	            lastDay: '[Wczoraj o] LT',
	            lastWeek: function () {
	                switch (this.day()) {
	                case 0:
	                    return '[W zeszłą niedzielę o] LT';
	                case 3:
	                    return '[W zeszłą środę o] LT';
	                case 6:
	                    return '[W zeszłą sobotę o] LT';
	                default:
	                    return '[W zeszły] dddd [o] LT';
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'za %s',
	            past : '%s temu',
	            s : 'kilka sekund',
	            m : translate,
	            mm : translate,
	            h : translate,
	            hh : translate,
	            d : '1 dzień',
	            dd : '%d dni',
	            M : 'miesiąc',
	            MM : translate,
	            y : 'rok',
	            yy : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return pl;

	}));

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : portuguese (pt)
	//! author : Jefferson : https://github.com/jalex79

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var pt = moment.defineLocale('pt', {
	        months : 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
	        monthsShort : 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
	        weekdays : 'Domingo_Segunda-Feira_Terça-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_Sábado'.split('_'),
	        weekdaysShort : 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
	        weekdaysMin : 'Dom_2ª_3ª_4ª_5ª_6ª_Sáb'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D [de] MMMM [de] YYYY',
	            LLL : 'D [de] MMMM [de] YYYY HH:mm',
	            LLLL : 'dddd, D [de] MMMM [de] YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[Hoje às] LT',
	            nextDay: '[Amanhã às] LT',
	            nextWeek: 'dddd [às] LT',
	            lastDay: '[Ontem às] LT',
	            lastWeek: function () {
	                return (this.day() === 0 || this.day() === 6) ?
	                    '[Último] dddd [às] LT' : // Saturday + Sunday
	                    '[Última] dddd [às] LT'; // Monday - Friday
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'em %s',
	            past : 'há %s',
	            s : 'segundos',
	            m : 'um minuto',
	            mm : '%d minutos',
	            h : 'uma hora',
	            hh : '%d horas',
	            d : 'um dia',
	            dd : '%d dias',
	            M : 'um mês',
	            MM : '%d meses',
	            y : 'um ano',
	            yy : '%d anos'
	        },
	        ordinalParse: /\d{1,2}º/,
	        ordinal : '%dº',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return pt;

	}));

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : brazilian portuguese (pt-br)
	//! author : Caio Ribeiro Pereira : https://github.com/caio-ribeiro-pereira

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var pt_br = moment.defineLocale('pt-br', {
	        months : 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
	        monthsShort : 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
	        weekdays : 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_'),
	        weekdaysShort : 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
	        weekdaysMin : 'Dom_2ª_3ª_4ª_5ª_6ª_Sáb'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D [de] MMMM [de] YYYY',
	            LLL : 'D [de] MMMM [de] YYYY [às] HH:mm',
	            LLLL : 'dddd, D [de] MMMM [de] YYYY [às] HH:mm'
	        },
	        calendar : {
	            sameDay: '[Hoje às] LT',
	            nextDay: '[Amanhã às] LT',
	            nextWeek: 'dddd [às] LT',
	            lastDay: '[Ontem às] LT',
	            lastWeek: function () {
	                return (this.day() === 0 || this.day() === 6) ?
	                    '[Último] dddd [às] LT' : // Saturday + Sunday
	                    '[Última] dddd [às] LT'; // Monday - Friday
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'em %s',
	            past : '%s atrás',
	            s : 'poucos segundos',
	            m : 'um minuto',
	            mm : '%d minutos',
	            h : 'uma hora',
	            hh : '%d horas',
	            d : 'um dia',
	            dd : '%d dias',
	            M : 'um mês',
	            MM : '%d meses',
	            y : 'um ano',
	            yy : '%d anos'
	        },
	        ordinalParse: /\d{1,2}º/,
	        ordinal : '%dº'
	    });

	    return pt_br;

	}));

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : romanian (ro)
	//! author : Vlad Gurdiga : https://github.com/gurdiga
	//! author : Valentin Agachi : https://github.com/avaly

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function relativeTimeWithPlural(number, withoutSuffix, key) {
	        var format = {
	                'mm': 'minute',
	                'hh': 'ore',
	                'dd': 'zile',
	                'MM': 'luni',
	                'yy': 'ani'
	            },
	            separator = ' ';
	        if (number % 100 >= 20 || (number >= 100 && number % 100 === 0)) {
	            separator = ' de ';
	        }
	        return number + separator + format[key];
	    }

	    var ro = moment.defineLocale('ro', {
	        months : 'ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie'.split('_'),
	        monthsShort : 'ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.'.split('_'),
	        monthsParseExact: true,
	        weekdays : 'duminică_luni_marți_miercuri_joi_vineri_sâmbătă'.split('_'),
	        weekdaysShort : 'Dum_Lun_Mar_Mie_Joi_Vin_Sâm'.split('_'),
	        weekdaysMin : 'Du_Lu_Ma_Mi_Jo_Vi_Sâ'.split('_'),
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY H:mm',
	            LLLL : 'dddd, D MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay: '[azi la] LT',
	            nextDay: '[mâine la] LT',
	            nextWeek: 'dddd [la] LT',
	            lastDay: '[ieri la] LT',
	            lastWeek: '[fosta] dddd [la] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'peste %s',
	            past : '%s în urmă',
	            s : 'câteva secunde',
	            m : 'un minut',
	            mm : relativeTimeWithPlural,
	            h : 'o oră',
	            hh : relativeTimeWithPlural,
	            d : 'o zi',
	            dd : relativeTimeWithPlural,
	            M : 'o lună',
	            MM : relativeTimeWithPlural,
	            y : 'un an',
	            yy : relativeTimeWithPlural
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ro;

	}));

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : russian (ru)
	//! author : Viktorminator : https://github.com/Viktorminator
	//! Author : Menelion Elensúle : https://github.com/Oire
	//! author : Коренберг Марк : https://github.com/socketpair

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function plural(word, num) {
	        var forms = word.split('_');
	        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
	    }
	    function relativeTimeWithPlural(number, withoutSuffix, key) {
	        var format = {
	            'mm': withoutSuffix ? 'минута_минуты_минут' : 'минуту_минуты_минут',
	            'hh': 'час_часа_часов',
	            'dd': 'день_дня_дней',
	            'MM': 'месяц_месяца_месяцев',
	            'yy': 'год_года_лет'
	        };
	        if (key === 'm') {
	            return withoutSuffix ? 'минута' : 'минуту';
	        }
	        else {
	            return number + ' ' + plural(format[key], +number);
	        }
	    }
	    var monthsParse = [/^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[йя]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i];

	    // http://new.gramota.ru/spravka/rules/139-prop : § 103
	    // Сокращения месяцев: http://new.gramota.ru/spravka/buro/search-answer?s=242637
	    // CLDR data:          http://www.unicode.org/cldr/charts/28/summary/ru.html#1753
	    var ru = moment.defineLocale('ru', {
	        months : {
	            format: 'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split('_'),
	            standalone: 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_')
	        },
	        monthsShort : {
	            // по CLDR именно "июл." и "июн.", но какой смысл менять букву на точку ?
	            format: 'янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.'.split('_'),
	            standalone: 'янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.'.split('_')
	        },
	        weekdays : {
	            standalone: 'воскресенье_понедельник_вторник_среда_четверг_пятница_суббота'.split('_'),
	            format: 'воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу'.split('_'),
	            isFormat: /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/
	        },
	        weekdaysShort : 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
	        weekdaysMin : 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
	        monthsParse : monthsParse,
	        longMonthsParse : monthsParse,
	        shortMonthsParse : monthsParse,
	        monthsRegex: /^(сентябр[яь]|октябр[яь]|декабр[яь]|феврал[яь]|январ[яь]|апрел[яь]|августа?|ноябр[яь]|сент\.|февр\.|нояб\.|июнь|янв.|июль|дек.|авг.|апр.|марта|мар[.т]|окт.|июн[яь]|июл[яь]|ма[яй])/i,
	        monthsShortRegex: /^(сентябр[яь]|октябр[яь]|декабр[яь]|феврал[яь]|январ[яь]|апрел[яь]|августа?|ноябр[яь]|сент\.|февр\.|нояб\.|июнь|янв.|июль|дек.|авг.|апр.|марта|мар[.т]|окт.|июн[яь]|июл[яь]|ма[яй])/i,
	        monthsStrictRegex: /^(сентябр[яь]|октябр[яь]|декабр[яь]|феврал[яь]|январ[яь]|апрел[яь]|августа?|ноябр[яь]|марта?|июн[яь]|июл[яь]|ма[яй])/i,
	        monthsShortStrictRegex: /^(нояб\.|февр\.|сент\.|июль|янв\.|июн[яь]|мар[.т]|авг\.|апр\.|окт\.|дек\.|ма[яй])/i,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY г.',
	            LLL : 'D MMMM YYYY г., HH:mm',
	            LLLL : 'dddd, D MMMM YYYY г., HH:mm'
	        },
	        calendar : {
	            sameDay: '[Сегодня в] LT',
	            nextDay: '[Завтра в] LT',
	            lastDay: '[Вчера в] LT',
	            nextWeek: function (now) {
	                if (now.week() !== this.week()) {
	                    switch (this.day()) {
	                    case 0:
	                        return '[В следующее] dddd [в] LT';
	                    case 1:
	                    case 2:
	                    case 4:
	                        return '[В следующий] dddd [в] LT';
	                    case 3:
	                    case 5:
	                    case 6:
	                        return '[В следующую] dddd [в] LT';
	                    }
	                } else {
	                    if (this.day() === 2) {
	                        return '[Во] dddd [в] LT';
	                    } else {
	                        return '[В] dddd [в] LT';
	                    }
	                }
	            },
	            lastWeek: function (now) {
	                if (now.week() !== this.week()) {
	                    switch (this.day()) {
	                    case 0:
	                        return '[В прошлое] dddd [в] LT';
	                    case 1:
	                    case 2:
	                    case 4:
	                        return '[В прошлый] dddd [в] LT';
	                    case 3:
	                    case 5:
	                    case 6:
	                        return '[В прошлую] dddd [в] LT';
	                    }
	                } else {
	                    if (this.day() === 2) {
	                        return '[Во] dddd [в] LT';
	                    } else {
	                        return '[В] dddd [в] LT';
	                    }
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'через %s',
	            past : '%s назад',
	            s : 'несколько секунд',
	            m : relativeTimeWithPlural,
	            mm : relativeTimeWithPlural,
	            h : 'час',
	            hh : relativeTimeWithPlural,
	            d : 'день',
	            dd : relativeTimeWithPlural,
	            M : 'месяц',
	            MM : relativeTimeWithPlural,
	            y : 'год',
	            yy : relativeTimeWithPlural
	        },
	        meridiemParse: /ночи|утра|дня|вечера/i,
	        isPM : function (input) {
	            return /^(дня|вечера)$/.test(input);
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'ночи';
	            } else if (hour < 12) {
	                return 'утра';
	            } else if (hour < 17) {
	                return 'дня';
	            } else {
	                return 'вечера';
	            }
	        },
	        ordinalParse: /\d{1,2}-(й|го|я)/,
	        ordinal: function (number, period) {
	            switch (period) {
	            case 'M':
	            case 'd':
	            case 'DDD':
	                return number + '-й';
	            case 'D':
	                return number + '-го';
	            case 'w':
	            case 'W':
	                return number + '-я';
	            default:
	                return number;
	            }
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ru;

	}));

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Northern Sami (se)
	//! authors : Bård Rolstad Henriksen : https://github.com/karamell

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';



	    var se = moment.defineLocale('se', {
	        months : 'ođđajagemánnu_guovvamánnu_njukčamánnu_cuoŋománnu_miessemánnu_geassemánnu_suoidnemánnu_borgemánnu_čakčamánnu_golggotmánnu_skábmamánnu_juovlamánnu'.split('_'),
	        monthsShort : 'ođđj_guov_njuk_cuo_mies_geas_suoi_borg_čakč_golg_skáb_juov'.split('_'),
	        weekdays : 'sotnabeaivi_vuossárga_maŋŋebárga_gaskavahkku_duorastat_bearjadat_lávvardat'.split('_'),
	        weekdaysShort : 'sotn_vuos_maŋ_gask_duor_bear_láv'.split('_'),
	        weekdaysMin : 's_v_m_g_d_b_L'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'MMMM D. [b.] YYYY',
	            LLL : 'MMMM D. [b.] YYYY [ti.] HH:mm',
	            LLLL : 'dddd, MMMM D. [b.] YYYY [ti.] HH:mm'
	        },
	        calendar : {
	            sameDay: '[otne ti] LT',
	            nextDay: '[ihttin ti] LT',
	            nextWeek: 'dddd [ti] LT',
	            lastDay: '[ikte ti] LT',
	            lastWeek: '[ovddit] dddd [ti] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : '%s geažes',
	            past : 'maŋit %s',
	            s : 'moadde sekunddat',
	            m : 'okta minuhta',
	            mm : '%d minuhtat',
	            h : 'okta diimmu',
	            hh : '%d diimmut',
	            d : 'okta beaivi',
	            dd : '%d beaivvit',
	            M : 'okta mánnu',
	            MM : '%d mánut',
	            y : 'okta jahki',
	            yy : '%d jagit'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return se;

	}));

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Sinhalese (si)
	//! author : Sampath Sitinamaluwa : https://github.com/sampathsris

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    /*jshint -W100*/
	    var si = moment.defineLocale('si', {
	        months : 'ජනවාරි_පෙබරවාරි_මාර්තු_අප්‍රේල්_මැයි_ජූනි_ජූලි_අගෝස්තු_සැප්තැම්බර්_ඔක්තෝබර්_නොවැම්බර්_දෙසැම්බර්'.split('_'),
	        monthsShort : 'ජන_පෙබ_මාර්_අප්_මැයි_ජූනි_ජූලි_අගෝ_සැප්_ඔක්_නොවැ_දෙසැ'.split('_'),
	        weekdays : 'ඉරිදා_සඳුදා_අඟහරුවාදා_බදාදා_බ්‍රහස්පතින්දා_සිකුරාදා_සෙනසුරාදා'.split('_'),
	        weekdaysShort : 'ඉරි_සඳු_අඟ_බදා_බ්‍රහ_සිකු_සෙන'.split('_'),
	        weekdaysMin : 'ඉ_ස_අ_බ_බ්‍ර_සි_සෙ'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'a h:mm',
	            LTS : 'a h:mm:ss',
	            L : 'YYYY/MM/DD',
	            LL : 'YYYY MMMM D',
	            LLL : 'YYYY MMMM D, a h:mm',
	            LLLL : 'YYYY MMMM D [වැනි] dddd, a h:mm:ss'
	        },
	        calendar : {
	            sameDay : '[අද] LT[ට]',
	            nextDay : '[හෙට] LT[ට]',
	            nextWeek : 'dddd LT[ට]',
	            lastDay : '[ඊයේ] LT[ට]',
	            lastWeek : '[පසුගිය] dddd LT[ට]',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%sකින්',
	            past : '%sකට පෙර',
	            s : 'තත්පර කිහිපය',
	            m : 'මිනිත්තුව',
	            mm : 'මිනිත්තු %d',
	            h : 'පැය',
	            hh : 'පැය %d',
	            d : 'දිනය',
	            dd : 'දින %d',
	            M : 'මාසය',
	            MM : 'මාස %d',
	            y : 'වසර',
	            yy : 'වසර %d'
	        },
	        ordinalParse: /\d{1,2} වැනි/,
	        ordinal : function (number) {
	            return number + ' වැනි';
	        },
	        meridiemParse : /පෙර වරු|පස් වරු|පෙ.ව|ප.ව./,
	        isPM : function (input) {
	            return input === 'ප.ව.' || input === 'පස් වරු';
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours > 11) {
	                return isLower ? 'ප.ව.' : 'පස් වරු';
	            } else {
	                return isLower ? 'පෙ.ව.' : 'පෙර වරු';
	            }
	        }
	    });

	    return si;

	}));

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : slovak (sk)
	//! author : Martin Minka : https://github.com/k2s
	//! based on work of petrbela : https://github.com/petrbela

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var months = 'január_február_marec_apríl_máj_jún_júl_august_september_október_november_december'.split('_'),
	        monthsShort = 'jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec'.split('_');
	    function plural(n) {
	        return (n > 1) && (n < 5);
	    }
	    function translate(number, withoutSuffix, key, isFuture) {
	        var result = number + ' ';
	        switch (key) {
	        case 's':  // a few seconds / in a few seconds / a few seconds ago
	            return (withoutSuffix || isFuture) ? 'pár sekúnd' : 'pár sekundami';
	        case 'm':  // a minute / in a minute / a minute ago
	            return withoutSuffix ? 'minúta' : (isFuture ? 'minútu' : 'minútou');
	        case 'mm': // 9 minutes / in 9 minutes / 9 minutes ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'minúty' : 'minút');
	            } else {
	                return result + 'minútami';
	            }
	            break;
	        case 'h':  // an hour / in an hour / an hour ago
	            return withoutSuffix ? 'hodina' : (isFuture ? 'hodinu' : 'hodinou');
	        case 'hh': // 9 hours / in 9 hours / 9 hours ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'hodiny' : 'hodín');
	            } else {
	                return result + 'hodinami';
	            }
	            break;
	        case 'd':  // a day / in a day / a day ago
	            return (withoutSuffix || isFuture) ? 'deň' : 'dňom';
	        case 'dd': // 9 days / in 9 days / 9 days ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'dni' : 'dní');
	            } else {
	                return result + 'dňami';
	            }
	            break;
	        case 'M':  // a month / in a month / a month ago
	            return (withoutSuffix || isFuture) ? 'mesiac' : 'mesiacom';
	        case 'MM': // 9 months / in 9 months / 9 months ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'mesiace' : 'mesiacov');
	            } else {
	                return result + 'mesiacmi';
	            }
	            break;
	        case 'y':  // a year / in a year / a year ago
	            return (withoutSuffix || isFuture) ? 'rok' : 'rokom';
	        case 'yy': // 9 years / in 9 years / 9 years ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'roky' : 'rokov');
	            } else {
	                return result + 'rokmi';
	            }
	            break;
	        }
	    }

	    var sk = moment.defineLocale('sk', {
	        months : months,
	        monthsShort : monthsShort,
	        weekdays : 'nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota'.split('_'),
	        weekdaysShort : 'ne_po_ut_st_št_pi_so'.split('_'),
	        weekdaysMin : 'ne_po_ut_st_št_pi_so'.split('_'),
	        longDateFormat : {
	            LT: 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY H:mm',
	            LLLL : 'dddd D. MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay: '[dnes o] LT',
	            nextDay: '[zajtra o] LT',
	            nextWeek: function () {
	                switch (this.day()) {
	                case 0:
	                    return '[v nedeľu o] LT';
	                case 1:
	                case 2:
	                    return '[v] dddd [o] LT';
	                case 3:
	                    return '[v stredu o] LT';
	                case 4:
	                    return '[vo štvrtok o] LT';
	                case 5:
	                    return '[v piatok o] LT';
	                case 6:
	                    return '[v sobotu o] LT';
	                }
	            },
	            lastDay: '[včera o] LT',
	            lastWeek: function () {
	                switch (this.day()) {
	                case 0:
	                    return '[minulú nedeľu o] LT';
	                case 1:
	                case 2:
	                    return '[minulý] dddd [o] LT';
	                case 3:
	                    return '[minulú stredu o] LT';
	                case 4:
	                case 5:
	                    return '[minulý] dddd [o] LT';
	                case 6:
	                    return '[minulú sobotu o] LT';
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'za %s',
	            past : 'pred %s',
	            s : translate,
	            m : translate,
	            mm : translate,
	            h : translate,
	            hh : translate,
	            d : translate,
	            dd : translate,
	            M : translate,
	            MM : translate,
	            y : translate,
	            yy : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return sk;

	}));

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : slovenian (sl)
	//! author : Robert Sedovšek : https://github.com/sedovsek

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function processRelativeTime(number, withoutSuffix, key, isFuture) {
	        var result = number + ' ';
	        switch (key) {
	        case 's':
	            return withoutSuffix || isFuture ? 'nekaj sekund' : 'nekaj sekundami';
	        case 'm':
	            return withoutSuffix ? 'ena minuta' : 'eno minuto';
	        case 'mm':
	            if (number === 1) {
	                result += withoutSuffix ? 'minuta' : 'minuto';
	            } else if (number === 2) {
	                result += withoutSuffix || isFuture ? 'minuti' : 'minutama';
	            } else if (number < 5) {
	                result += withoutSuffix || isFuture ? 'minute' : 'minutami';
	            } else {
	                result += withoutSuffix || isFuture ? 'minut' : 'minutami';
	            }
	            return result;
	        case 'h':
	            return withoutSuffix ? 'ena ura' : 'eno uro';
	        case 'hh':
	            if (number === 1) {
	                result += withoutSuffix ? 'ura' : 'uro';
	            } else if (number === 2) {
	                result += withoutSuffix || isFuture ? 'uri' : 'urama';
	            } else if (number < 5) {
	                result += withoutSuffix || isFuture ? 'ure' : 'urami';
	            } else {
	                result += withoutSuffix || isFuture ? 'ur' : 'urami';
	            }
	            return result;
	        case 'd':
	            return withoutSuffix || isFuture ? 'en dan' : 'enim dnem';
	        case 'dd':
	            if (number === 1) {
	                result += withoutSuffix || isFuture ? 'dan' : 'dnem';
	            } else if (number === 2) {
	                result += withoutSuffix || isFuture ? 'dni' : 'dnevoma';
	            } else {
	                result += withoutSuffix || isFuture ? 'dni' : 'dnevi';
	            }
	            return result;
	        case 'M':
	            return withoutSuffix || isFuture ? 'en mesec' : 'enim mesecem';
	        case 'MM':
	            if (number === 1) {
	                result += withoutSuffix || isFuture ? 'mesec' : 'mesecem';
	            } else if (number === 2) {
	                result += withoutSuffix || isFuture ? 'meseca' : 'mesecema';
	            } else if (number < 5) {
	                result += withoutSuffix || isFuture ? 'mesece' : 'meseci';
	            } else {
	                result += withoutSuffix || isFuture ? 'mesecev' : 'meseci';
	            }
	            return result;
	        case 'y':
	            return withoutSuffix || isFuture ? 'eno leto' : 'enim letom';
	        case 'yy':
	            if (number === 1) {
	                result += withoutSuffix || isFuture ? 'leto' : 'letom';
	            } else if (number === 2) {
	                result += withoutSuffix || isFuture ? 'leti' : 'letoma';
	            } else if (number < 5) {
	                result += withoutSuffix || isFuture ? 'leta' : 'leti';
	            } else {
	                result += withoutSuffix || isFuture ? 'let' : 'leti';
	            }
	            return result;
	        }
	    }

	    var sl = moment.defineLocale('sl', {
	        months : 'januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december'.split('_'),
	        monthsShort : 'jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.'.split('_'),
	        monthsParseExact: true,
	        weekdays : 'nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota'.split('_'),
	        weekdaysShort : 'ned._pon._tor._sre._čet._pet._sob.'.split('_'),
	        weekdaysMin : 'ne_po_to_sr_če_pe_so'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD. MM. YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY H:mm',
	            LLLL : 'dddd, D. MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay  : '[danes ob] LT',
	            nextDay  : '[jutri ob] LT',

	            nextWeek : function () {
	                switch (this.day()) {
	                case 0:
	                    return '[v] [nedeljo] [ob] LT';
	                case 3:
	                    return '[v] [sredo] [ob] LT';
	                case 6:
	                    return '[v] [soboto] [ob] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[v] dddd [ob] LT';
	                }
	            },
	            lastDay  : '[včeraj ob] LT',
	            lastWeek : function () {
	                switch (this.day()) {
	                case 0:
	                    return '[prejšnjo] [nedeljo] [ob] LT';
	                case 3:
	                    return '[prejšnjo] [sredo] [ob] LT';
	                case 6:
	                    return '[prejšnjo] [soboto] [ob] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[prejšnji] dddd [ob] LT';
	                }
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'čez %s',
	            past   : 'pred %s',
	            s      : processRelativeTime,
	            m      : processRelativeTime,
	            mm     : processRelativeTime,
	            h      : processRelativeTime,
	            hh     : processRelativeTime,
	            d      : processRelativeTime,
	            dd     : processRelativeTime,
	            M      : processRelativeTime,
	            MM     : processRelativeTime,
	            y      : processRelativeTime,
	            yy     : processRelativeTime
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return sl;

	}));

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Albanian (sq)
	//! author : Flakërim Ismani : https://github.com/flakerimi
	//! author: Menelion Elensúle: https://github.com/Oire (tests)
	//! author : Oerd Cukalla : https://github.com/oerd (fixes)

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var sq = moment.defineLocale('sq', {
	        months : 'Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor'.split('_'),
	        monthsShort : 'Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj'.split('_'),
	        weekdays : 'E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë'.split('_'),
	        weekdaysShort : 'Die_Hën_Mar_Mër_Enj_Pre_Sht'.split('_'),
	        weekdaysMin : 'D_H_Ma_Më_E_P_Sh'.split('_'),
	        weekdaysParseExact : true,
	        meridiemParse: /PD|MD/,
	        isPM: function (input) {
	            return input.charAt(0) === 'M';
	        },
	        meridiem : function (hours, minutes, isLower) {
	            return hours < 12 ? 'PD' : 'MD';
	        },
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[Sot në] LT',
	            nextDay : '[Nesër në] LT',
	            nextWeek : 'dddd [në] LT',
	            lastDay : '[Dje në] LT',
	            lastWeek : 'dddd [e kaluar në] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'në %s',
	            past : '%s më parë',
	            s : 'disa sekonda',
	            m : 'një minutë',
	            mm : '%d minuta',
	            h : 'një orë',
	            hh : '%d orë',
	            d : 'një ditë',
	            dd : '%d ditë',
	            M : 'një muaj',
	            MM : '%d muaj',
	            y : 'një vit',
	            yy : '%d vite'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return sq;

	}));

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Serbian-latin (sr)
	//! author : Milan Janačković<milanjanackovic@gmail.com> : https://github.com/milan-j

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var translator = {
	        words: { //Different grammatical cases
	            m: ['jedan minut', 'jedne minute'],
	            mm: ['minut', 'minute', 'minuta'],
	            h: ['jedan sat', 'jednog sata'],
	            hh: ['sat', 'sata', 'sati'],
	            dd: ['dan', 'dana', 'dana'],
	            MM: ['mesec', 'meseca', 'meseci'],
	            yy: ['godina', 'godine', 'godina']
	        },
	        correctGrammaticalCase: function (number, wordKey) {
	            return number === 1 ? wordKey[0] : (number >= 2 && number <= 4 ? wordKey[1] : wordKey[2]);
	        },
	        translate: function (number, withoutSuffix, key) {
	            var wordKey = translator.words[key];
	            if (key.length === 1) {
	                return withoutSuffix ? wordKey[0] : wordKey[1];
	            } else {
	                return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
	            }
	        }
	    };

	    var sr = moment.defineLocale('sr', {
	        months: 'januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar'.split('_'),
	        monthsShort: 'jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.'.split('_'),
	        monthsParseExact: true,
	        weekdays: 'nedelja_ponedeljak_utorak_sreda_četvrtak_petak_subota'.split('_'),
	        weekdaysShort: 'ned._pon._uto._sre._čet._pet._sub.'.split('_'),
	        weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat: {
	            LT: 'H:mm',
	            LTS : 'H:mm:ss',
	            L: 'DD. MM. YYYY',
	            LL: 'D. MMMM YYYY',
	            LLL: 'D. MMMM YYYY H:mm',
	            LLLL: 'dddd, D. MMMM YYYY H:mm'
	        },
	        calendar: {
	            sameDay: '[danas u] LT',
	            nextDay: '[sutra u] LT',
	            nextWeek: function () {
	                switch (this.day()) {
	                case 0:
	                    return '[u] [nedelju] [u] LT';
	                case 3:
	                    return '[u] [sredu] [u] LT';
	                case 6:
	                    return '[u] [subotu] [u] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[u] dddd [u] LT';
	                }
	            },
	            lastDay  : '[juče u] LT',
	            lastWeek : function () {
	                var lastWeekDays = [
	                    '[prošle] [nedelje] [u] LT',
	                    '[prošlog] [ponedeljka] [u] LT',
	                    '[prošlog] [utorka] [u] LT',
	                    '[prošle] [srede] [u] LT',
	                    '[prošlog] [četvrtka] [u] LT',
	                    '[prošlog] [petka] [u] LT',
	                    '[prošle] [subote] [u] LT'
	                ];
	                return lastWeekDays[this.day()];
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'za %s',
	            past   : 'pre %s',
	            s      : 'nekoliko sekundi',
	            m      : translator.translate,
	            mm     : translator.translate,
	            h      : translator.translate,
	            hh     : translator.translate,
	            d      : 'dan',
	            dd     : translator.translate,
	            M      : 'mesec',
	            MM     : translator.translate,
	            y      : 'godinu',
	            yy     : translator.translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return sr;

	}));

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Serbian-cyrillic (sr-cyrl)
	//! author : Milan Janačković<milanjanackovic@gmail.com> : https://github.com/milan-j

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var translator = {
	        words: { //Different grammatical cases
	            m: ['један минут', 'једне минуте'],
	            mm: ['минут', 'минуте', 'минута'],
	            h: ['један сат', 'једног сата'],
	            hh: ['сат', 'сата', 'сати'],
	            dd: ['дан', 'дана', 'дана'],
	            MM: ['месец', 'месеца', 'месеци'],
	            yy: ['година', 'године', 'година']
	        },
	        correctGrammaticalCase: function (number, wordKey) {
	            return number === 1 ? wordKey[0] : (number >= 2 && number <= 4 ? wordKey[1] : wordKey[2]);
	        },
	        translate: function (number, withoutSuffix, key) {
	            var wordKey = translator.words[key];
	            if (key.length === 1) {
	                return withoutSuffix ? wordKey[0] : wordKey[1];
	            } else {
	                return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
	            }
	        }
	    };

	    var sr_cyrl = moment.defineLocale('sr-cyrl', {
	        months: 'јануар_фебруар_март_април_мај_јун_јул_август_септембар_октобар_новембар_децембар'.split('_'),
	        monthsShort: 'јан._феб._мар._апр._мај_јун_јул_авг._сеп._окт._нов._дец.'.split('_'),
	        monthsParseExact: true,
	        weekdays: 'недеља_понедељак_уторак_среда_четвртак_петак_субота'.split('_'),
	        weekdaysShort: 'нед._пон._уто._сре._чет._пет._суб.'.split('_'),
	        weekdaysMin: 'не_по_ут_ср_че_пе_су'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat: {
	            LT: 'H:mm',
	            LTS : 'H:mm:ss',
	            L: 'DD. MM. YYYY',
	            LL: 'D. MMMM YYYY',
	            LLL: 'D. MMMM YYYY H:mm',
	            LLLL: 'dddd, D. MMMM YYYY H:mm'
	        },
	        calendar: {
	            sameDay: '[данас у] LT',
	            nextDay: '[сутра у] LT',
	            nextWeek: function () {
	                switch (this.day()) {
	                case 0:
	                    return '[у] [недељу] [у] LT';
	                case 3:
	                    return '[у] [среду] [у] LT';
	                case 6:
	                    return '[у] [суботу] [у] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[у] dddd [у] LT';
	                }
	            },
	            lastDay  : '[јуче у] LT',
	            lastWeek : function () {
	                var lastWeekDays = [
	                    '[прошле] [недеље] [у] LT',
	                    '[прошлог] [понедељка] [у] LT',
	                    '[прошлог] [уторка] [у] LT',
	                    '[прошле] [среде] [у] LT',
	                    '[прошлог] [четвртка] [у] LT',
	                    '[прошлог] [петка] [у] LT',
	                    '[прошле] [суботе] [у] LT'
	                ];
	                return lastWeekDays[this.day()];
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'за %s',
	            past   : 'пре %s',
	            s      : 'неколико секунди',
	            m      : translator.translate,
	            mm     : translator.translate,
	            h      : translator.translate,
	            hh     : translator.translate,
	            d      : 'дан',
	            dd     : translator.translate,
	            M      : 'месец',
	            MM     : translator.translate,
	            y      : 'годину',
	            yy     : translator.translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return sr_cyrl;

	}));

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : siSwati (ss)
	//! author : Nicolai Davies<mail@nicolai.io> : https://github.com/nicolaidavies

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';



	    var ss = moment.defineLocale('ss', {
	        months : "Bhimbidvwane_Indlovana_Indlov'lenkhulu_Mabasa_Inkhwekhweti_Inhlaba_Kholwane_Ingci_Inyoni_Imphala_Lweti_Ingongoni".split('_'),
	        monthsShort : 'Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo'.split('_'),
	        weekdays : 'Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo'.split('_'),
	        weekdaysShort : 'Lis_Umb_Lsb_Les_Lsi_Lsh_Umg'.split('_'),
	        weekdaysMin : 'Li_Us_Lb_Lt_Ls_Lh_Ug'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'h:mm A',
	            LTS : 'h:mm:ss A',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY h:mm A',
	            LLLL : 'dddd, D MMMM YYYY h:mm A'
	        },
	        calendar : {
	            sameDay : '[Namuhla nga] LT',
	            nextDay : '[Kusasa nga] LT',
	            nextWeek : 'dddd [nga] LT',
	            lastDay : '[Itolo nga] LT',
	            lastWeek : 'dddd [leliphelile] [nga] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'nga %s',
	            past : 'wenteka nga %s',
	            s : 'emizuzwana lomcane',
	            m : 'umzuzu',
	            mm : '%d emizuzu',
	            h : 'lihora',
	            hh : '%d emahora',
	            d : 'lilanga',
	            dd : '%d emalanga',
	            M : 'inyanga',
	            MM : '%d tinyanga',
	            y : 'umnyaka',
	            yy : '%d iminyaka'
	        },
	        meridiemParse: /ekuseni|emini|entsambama|ebusuku/,
	        meridiem : function (hours, minutes, isLower) {
	            if (hours < 11) {
	                return 'ekuseni';
	            } else if (hours < 15) {
	                return 'emini';
	            } else if (hours < 19) {
	                return 'entsambama';
	            } else {
	                return 'ebusuku';
	            }
	        },
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'ekuseni') {
	                return hour;
	            } else if (meridiem === 'emini') {
	                return hour >= 11 ? hour : hour + 12;
	            } else if (meridiem === 'entsambama' || meridiem === 'ebusuku') {
	                if (hour === 0) {
	                    return 0;
	                }
	                return hour + 12;
	            }
	        },
	        ordinalParse: /\d{1,2}/,
	        ordinal : '%d',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return ss;

	}));

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : swedish (sv)
	//! author : Jens Alm : https://github.com/ulmus

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var sv = moment.defineLocale('sv', {
	        months : 'januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december'.split('_'),
	        monthsShort : 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
	        weekdays : 'söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag'.split('_'),
	        weekdaysShort : 'sön_mån_tis_ons_tor_fre_lör'.split('_'),
	        weekdaysMin : 'sö_må_ti_on_to_fr_lö'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'YYYY-MM-DD',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY [kl.] HH:mm',
	            LLLL : 'dddd D MMMM YYYY [kl.] HH:mm',
	            lll : 'D MMM YYYY HH:mm',
	            llll : 'ddd D MMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[Idag] LT',
	            nextDay: '[Imorgon] LT',
	            lastDay: '[Igår] LT',
	            nextWeek: '[På] dddd LT',
	            lastWeek: '[I] dddd[s] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'om %s',
	            past : 'för %s sedan',
	            s : 'några sekunder',
	            m : 'en minut',
	            mm : '%d minuter',
	            h : 'en timme',
	            hh : '%d timmar',
	            d : 'en dag',
	            dd : '%d dagar',
	            M : 'en månad',
	            MM : '%d månader',
	            y : 'ett år',
	            yy : '%d år'
	        },
	        ordinalParse: /\d{1,2}(e|a)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (~~(number % 100 / 10) === 1) ? 'e' :
	                (b === 1) ? 'a' :
	                (b === 2) ? 'a' :
	                (b === 3) ? 'e' : 'e';
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return sv;

	}));

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : swahili (sw)
	//! author : Fahad Kassim : https://github.com/fadsel

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var sw = moment.defineLocale('sw', {
	        months : 'Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba'.split('_'),
	        monthsShort : 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des'.split('_'),
	        weekdays : 'Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi'.split('_'),
	        weekdaysShort : 'Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos'.split('_'),
	        weekdaysMin : 'J2_J3_J4_J5_Al_Ij_J1'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[leo saa] LT',
	            nextDay : '[kesho saa] LT',
	            nextWeek : '[wiki ijayo] dddd [saat] LT',
	            lastDay : '[jana] LT',
	            lastWeek : '[wiki iliyopita] dddd [saat] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s baadaye',
	            past : 'tokea %s',
	            s : 'hivi punde',
	            m : 'dakika moja',
	            mm : 'dakika %d',
	            h : 'saa limoja',
	            hh : 'masaa %d',
	            d : 'siku moja',
	            dd : 'masiku %d',
	            M : 'mwezi mmoja',
	            MM : 'miezi %d',
	            y : 'mwaka mmoja',
	            yy : 'miaka %d'
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return sw;

	}));

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : tamil (ta)
	//! author : Arjunkumar Krishnamoorthy : https://github.com/tk120404

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var symbolMap = {
	        '1': '௧',
	        '2': '௨',
	        '3': '௩',
	        '4': '௪',
	        '5': '௫',
	        '6': '௬',
	        '7': '௭',
	        '8': '௮',
	        '9': '௯',
	        '0': '௦'
	    }, numberMap = {
	        '௧': '1',
	        '௨': '2',
	        '௩': '3',
	        '௪': '4',
	        '௫': '5',
	        '௬': '6',
	        '௭': '7',
	        '௮': '8',
	        '௯': '9',
	        '௦': '0'
	    };

	    var ta = moment.defineLocale('ta', {
	        months : 'ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்'.split('_'),
	        monthsShort : 'ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்'.split('_'),
	        weekdays : 'ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை'.split('_'),
	        weekdaysShort : 'ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி'.split('_'),
	        weekdaysMin : 'ஞா_தி_செ_பு_வி_வெ_ச'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, HH:mm',
	            LLLL : 'dddd, D MMMM YYYY, HH:mm'
	        },
	        calendar : {
	            sameDay : '[இன்று] LT',
	            nextDay : '[நாளை] LT',
	            nextWeek : 'dddd, LT',
	            lastDay : '[நேற்று] LT',
	            lastWeek : '[கடந்த வாரம்] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s இல்',
	            past : '%s முன்',
	            s : 'ஒரு சில விநாடிகள்',
	            m : 'ஒரு நிமிடம்',
	            mm : '%d நிமிடங்கள்',
	            h : 'ஒரு மணி நேரம்',
	            hh : '%d மணி நேரம்',
	            d : 'ஒரு நாள்',
	            dd : '%d நாட்கள்',
	            M : 'ஒரு மாதம்',
	            MM : '%d மாதங்கள்',
	            y : 'ஒரு வருடம்',
	            yy : '%d ஆண்டுகள்'
	        },
	        ordinalParse: /\d{1,2}வது/,
	        ordinal : function (number) {
	            return number + 'வது';
	        },
	        preparse: function (string) {
	            return string.replace(/[௧௨௩௪௫௬௭௮௯௦]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        // refer http://ta.wikipedia.org/s/1er1
	        meridiemParse: /யாமம்|வைகறை|காலை|நண்பகல்|எற்பாடு|மாலை/,
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 2) {
	                return ' யாமம்';
	            } else if (hour < 6) {
	                return ' வைகறை';  // வைகறை
	            } else if (hour < 10) {
	                return ' காலை'; // காலை
	            } else if (hour < 14) {
	                return ' நண்பகல்'; // நண்பகல்
	            } else if (hour < 18) {
	                return ' எற்பாடு'; // எற்பாடு
	            } else if (hour < 22) {
	                return ' மாலை'; // மாலை
	            } else {
	                return ' யாமம்';
	            }
	        },
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'யாமம்') {
	                return hour < 2 ? hour : hour + 12;
	            } else if (meridiem === 'வைகறை' || meridiem === 'காலை') {
	                return hour;
	            } else if (meridiem === 'நண்பகல்') {
	                return hour >= 10 ? hour : hour + 12;
	            } else {
	                return hour + 12;
	            }
	        },
	        week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ta;

	}));

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : telugu (te)
	//! author : Krishna Chaitanya Thota : https://github.com/kcthota

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var te = moment.defineLocale('te', {
	        months : 'జనవరి_ఫిబ్రవరి_మార్చి_ఏప్రిల్_మే_జూన్_జూలై_ఆగస్టు_సెప్టెంబర్_అక్టోబర్_నవంబర్_డిసెంబర్'.split('_'),
	        monthsShort : 'జన._ఫిబ్ర._మార్చి_ఏప్రి._మే_జూన్_జూలై_ఆగ._సెప్._అక్టో._నవ._డిసె.'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'ఆదివారం_సోమవారం_మంగళవారం_బుధవారం_గురువారం_శుక్రవారం_శనివారం'.split('_'),
	        weekdaysShort : 'ఆది_సోమ_మంగళ_బుధ_గురు_శుక్ర_శని'.split('_'),
	        weekdaysMin : 'ఆ_సో_మం_బు_గు_శు_శ'.split('_'),
	        longDateFormat : {
	            LT : 'A h:mm',
	            LTS : 'A h:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, A h:mm',
	            LLLL : 'dddd, D MMMM YYYY, A h:mm'
	        },
	        calendar : {
	            sameDay : '[నేడు] LT',
	            nextDay : '[రేపు] LT',
	            nextWeek : 'dddd, LT',
	            lastDay : '[నిన్న] LT',
	            lastWeek : '[గత] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s లో',
	            past : '%s క్రితం',
	            s : 'కొన్ని క్షణాలు',
	            m : 'ఒక నిమిషం',
	            mm : '%d నిమిషాలు',
	            h : 'ఒక గంట',
	            hh : '%d గంటలు',
	            d : 'ఒక రోజు',
	            dd : '%d రోజులు',
	            M : 'ఒక నెల',
	            MM : '%d నెలలు',
	            y : 'ఒక సంవత్సరం',
	            yy : '%d సంవత్సరాలు'
	        },
	        ordinalParse : /\d{1,2}వ/,
	        ordinal : '%dవ',
	        meridiemParse: /రాత్రి|ఉదయం|మధ్యాహ్నం|సాయంత్రం/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'రాత్రి') {
	                return hour < 4 ? hour : hour + 12;
	            } else if (meridiem === 'ఉదయం') {
	                return hour;
	            } else if (meridiem === 'మధ్యాహ్నం') {
	                return hour >= 10 ? hour : hour + 12;
	            } else if (meridiem === 'సాయంత్రం') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'రాత్రి';
	            } else if (hour < 10) {
	                return 'ఉదయం';
	            } else if (hour < 17) {
	                return 'మధ్యాహ్నం';
	            } else if (hour < 20) {
	                return 'సాయంత్రం';
	            } else {
	                return 'రాత్రి';
	            }
	        },
	        week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return te;

	}));

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : thai (th)
	//! author : Kridsada Thanabulpong : https://github.com/sirn

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var th = moment.defineLocale('th', {
	        months : 'มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม'.split('_'),
	        monthsShort : 'มกรา_กุมภา_มีนา_เมษา_พฤษภา_มิถุนา_กรกฎา_สิงหา_กันยา_ตุลา_พฤศจิกา_ธันวา'.split('_'),
	        monthsParseExact: true,
	        weekdays : 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์'.split('_'),
	        weekdaysShort : 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์'.split('_'), // yes, three characters difference
	        weekdaysMin : 'อา._จ._อ._พ._พฤ._ศ._ส.'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'H นาฬิกา m นาที',
	            LTS : 'H นาฬิกา m นาที s วินาที',
	            L : 'YYYY/MM/DD',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY เวลา H นาฬิกา m นาที',
	            LLLL : 'วันddddที่ D MMMM YYYY เวลา H นาฬิกา m นาที'
	        },
	        meridiemParse: /ก่อนเที่ยง|หลังเที่ยง/,
	        isPM: function (input) {
	            return input === 'หลังเที่ยง';
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 12) {
	                return 'ก่อนเที่ยง';
	            } else {
	                return 'หลังเที่ยง';
	            }
	        },
	        calendar : {
	            sameDay : '[วันนี้ เวลา] LT',
	            nextDay : '[พรุ่งนี้ เวลา] LT',
	            nextWeek : 'dddd[หน้า เวลา] LT',
	            lastDay : '[เมื่อวานนี้ เวลา] LT',
	            lastWeek : '[วัน]dddd[ที่แล้ว เวลา] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'อีก %s',
	            past : '%sที่แล้ว',
	            s : 'ไม่กี่วินาที',
	            m : '1 นาที',
	            mm : '%d นาที',
	            h : '1 ชั่วโมง',
	            hh : '%d ชั่วโมง',
	            d : '1 วัน',
	            dd : '%d วัน',
	            M : '1 เดือน',
	            MM : '%d เดือน',
	            y : '1 ปี',
	            yy : '%d ปี'
	        }
	    });

	    return th;

	}));

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Tagalog/Filipino (tl-ph)
	//! author : Dan Hagman

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var tl_ph = moment.defineLocale('tl-ph', {
	        months : 'Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre'.split('_'),
	        monthsShort : 'Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis'.split('_'),
	        weekdays : 'Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado'.split('_'),
	        weekdaysShort : 'Lin_Lun_Mar_Miy_Huw_Biy_Sab'.split('_'),
	        weekdaysMin : 'Li_Lu_Ma_Mi_Hu_Bi_Sab'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'MM/D/YYYY',
	            LL : 'MMMM D, YYYY',
	            LLL : 'MMMM D, YYYY HH:mm',
	            LLLL : 'dddd, MMMM DD, YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[Ngayon sa] LT',
	            nextDay: '[Bukas sa] LT',
	            nextWeek: 'dddd [sa] LT',
	            lastDay: '[Kahapon sa] LT',
	            lastWeek: 'dddd [huling linggo] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'sa loob ng %s',
	            past : '%s ang nakalipas',
	            s : 'ilang segundo',
	            m : 'isang minuto',
	            mm : '%d minuto',
	            h : 'isang oras',
	            hh : '%d oras',
	            d : 'isang araw',
	            dd : '%d araw',
	            M : 'isang buwan',
	            MM : '%d buwan',
	            y : 'isang taon',
	            yy : '%d taon'
	        },
	        ordinalParse: /\d{1,2}/,
	        ordinal : function (number) {
	            return number;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return tl_ph;

	}));

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Klingon (tlh)
	//! author : Dominika Kruk : https://github.com/amaranthrose

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var numbersNouns = 'pagh_wa’_cha’_wej_loS_vagh_jav_Soch_chorgh_Hut'.split('_');

	    function translateFuture(output) {
	        var time = output;
	        time = (output.indexOf('jaj') !== -1) ?
	    	time.slice(0, -3) + 'leS' :
	    	(output.indexOf('jar') !== -1) ?
	    	time.slice(0, -3) + 'waQ' :
	    	(output.indexOf('DIS') !== -1) ?
	    	time.slice(0, -3) + 'nem' :
	    	time + ' pIq';
	        return time;
	    }

	    function translatePast(output) {
	        var time = output;
	        time = (output.indexOf('jaj') !== -1) ?
	    	time.slice(0, -3) + 'Hu’' :
	    	(output.indexOf('jar') !== -1) ?
	    	time.slice(0, -3) + 'wen' :
	    	(output.indexOf('DIS') !== -1) ?
	    	time.slice(0, -3) + 'ben' :
	    	time + ' ret';
	        return time;
	    }

	    function translate(number, withoutSuffix, string, isFuture) {
	        var numberNoun = numberAsNoun(number);
	        switch (string) {
	            case 'mm':
	                return numberNoun + ' tup';
	            case 'hh':
	                return numberNoun + ' rep';
	            case 'dd':
	                return numberNoun + ' jaj';
	            case 'MM':
	                return numberNoun + ' jar';
	            case 'yy':
	                return numberNoun + ' DIS';
	        }
	    }

	    function numberAsNoun(number) {
	        var hundred = Math.floor((number % 1000) / 100),
	    	ten = Math.floor((number % 100) / 10),
	    	one = number % 10,
	    	word = '';
	        if (hundred > 0) {
	            word += numbersNouns[hundred] + 'vatlh';
	        }
	        if (ten > 0) {
	            word += ((word !== '') ? ' ' : '') + numbersNouns[ten] + 'maH';
	        }
	        if (one > 0) {
	            word += ((word !== '') ? ' ' : '') + numbersNouns[one];
	        }
	        return (word === '') ? 'pagh' : word;
	    }

	    var tlh = moment.defineLocale('tlh', {
	        months : 'tera’ jar wa’_tera’ jar cha’_tera’ jar wej_tera’ jar loS_tera’ jar vagh_tera’ jar jav_tera’ jar Soch_tera’ jar chorgh_tera’ jar Hut_tera’ jar wa’maH_tera’ jar wa’maH wa’_tera’ jar wa’maH cha’'.split('_'),
	        monthsShort : 'jar wa’_jar cha’_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa’maH_jar wa’maH wa’_jar wa’maH cha’'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
	        weekdaysShort : 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
	        weekdaysMin : 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[DaHjaj] LT',
	            nextDay: '[wa’leS] LT',
	            nextWeek: 'LLL',
	            lastDay: '[wa’Hu’] LT',
	            lastWeek: 'LLL',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : translateFuture,
	            past : translatePast,
	            s : 'puS lup',
	            m : 'wa’ tup',
	            mm : translate,
	            h : 'wa’ rep',
	            hh : translate,
	            d : 'wa’ jaj',
	            dd : translate,
	            M : 'wa’ jar',
	            MM : translate,
	            y : 'wa’ DIS',
	            yy : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return tlh;

	}));

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : turkish (tr)
	//! authors : Erhan Gundogan : https://github.com/erhangundogan,
	//!           Burak Yiğit Kaya: https://github.com/BYK

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var suffixes = {
	        1: '\'inci',
	        5: '\'inci',
	        8: '\'inci',
	        70: '\'inci',
	        80: '\'inci',
	        2: '\'nci',
	        7: '\'nci',
	        20: '\'nci',
	        50: '\'nci',
	        3: '\'üncü',
	        4: '\'üncü',
	        100: '\'üncü',
	        6: '\'ncı',
	        9: '\'uncu',
	        10: '\'uncu',
	        30: '\'uncu',
	        60: '\'ıncı',
	        90: '\'ıncı'
	    };

	    var tr = moment.defineLocale('tr', {
	        months : 'Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık'.split('_'),
	        monthsShort : 'Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara'.split('_'),
	        weekdays : 'Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi'.split('_'),
	        weekdaysShort : 'Paz_Pts_Sal_Çar_Per_Cum_Cts'.split('_'),
	        weekdaysMin : 'Pz_Pt_Sa_Ça_Pe_Cu_Ct'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[bugün saat] LT',
	            nextDay : '[yarın saat] LT',
	            nextWeek : '[haftaya] dddd [saat] LT',
	            lastDay : '[dün] LT',
	            lastWeek : '[geçen hafta] dddd [saat] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s sonra',
	            past : '%s önce',
	            s : 'birkaç saniye',
	            m : 'bir dakika',
	            mm : '%d dakika',
	            h : 'bir saat',
	            hh : '%d saat',
	            d : 'bir gün',
	            dd : '%d gün',
	            M : 'bir ay',
	            MM : '%d ay',
	            y : 'bir yıl',
	            yy : '%d yıl'
	        },
	        ordinalParse: /\d{1,2}'(inci|nci|üncü|ncı|uncu|ıncı)/,
	        ordinal : function (number) {
	            if (number === 0) {  // special case for zero
	                return number + '\'ıncı';
	            }
	            var a = number % 10,
	                b = number % 100 - a,
	                c = number >= 100 ? 100 : null;
	            return number + (suffixes[a] || suffixes[b] || suffixes[c]);
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return tr;

	}));

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : talossan (tzl)
	//! author : Robin van der Vliet : https://github.com/robin0van0der0v with the help of Iustì Canun

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';



	    // After the year there should be a slash and the amount of years since December 26, 1979 in Roman numerals.
	    // This is currently too difficult (maybe even impossible) to add.
	    var tzl = moment.defineLocale('tzl', {
	        months : 'Januar_Fevraglh_Març_Avrïu_Mai_Gün_Julia_Guscht_Setemvar_Listopäts_Noemvar_Zecemvar'.split('_'),
	        monthsShort : 'Jan_Fev_Mar_Avr_Mai_Gün_Jul_Gus_Set_Lis_Noe_Zec'.split('_'),
	        weekdays : 'Súladi_Lúneçi_Maitzi_Márcuri_Xhúadi_Viénerçi_Sáturi'.split('_'),
	        weekdaysShort : 'Súl_Lún_Mai_Már_Xhú_Vié_Sát'.split('_'),
	        weekdaysMin : 'Sú_Lú_Ma_Má_Xh_Vi_Sá'.split('_'),
	        longDateFormat : {
	            LT : 'HH.mm',
	            LTS : 'HH.mm.ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM [dallas] YYYY',
	            LLL : 'D. MMMM [dallas] YYYY HH.mm',
	            LLLL : 'dddd, [li] D. MMMM [dallas] YYYY HH.mm'
	        },
	        meridiemParse: /d\'o|d\'a/i,
	        isPM : function (input) {
	            return 'd\'o' === input.toLowerCase();
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours > 11) {
	                return isLower ? 'd\'o' : 'D\'O';
	            } else {
	                return isLower ? 'd\'a' : 'D\'A';
	            }
	        },
	        calendar : {
	            sameDay : '[oxhi à] LT',
	            nextDay : '[demà à] LT',
	            nextWeek : 'dddd [à] LT',
	            lastDay : '[ieiri à] LT',
	            lastWeek : '[sür el] dddd [lasteu à] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'osprei %s',
	            past : 'ja%s',
	            s : processRelativeTime,
	            m : processRelativeTime,
	            mm : processRelativeTime,
	            h : processRelativeTime,
	            hh : processRelativeTime,
	            d : processRelativeTime,
	            dd : processRelativeTime,
	            M : processRelativeTime,
	            MM : processRelativeTime,
	            y : processRelativeTime,
	            yy : processRelativeTime
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    function processRelativeTime(number, withoutSuffix, key, isFuture) {
	        var format = {
	            's': ['viensas secunds', '\'iensas secunds'],
	            'm': ['\'n míut', '\'iens míut'],
	            'mm': [number + ' míuts', '' + number + ' míuts'],
	            'h': ['\'n þora', '\'iensa þora'],
	            'hh': [number + ' þoras', '' + number + ' þoras'],
	            'd': ['\'n ziua', '\'iensa ziua'],
	            'dd': [number + ' ziuas', '' + number + ' ziuas'],
	            'M': ['\'n mes', '\'iens mes'],
	            'MM': [number + ' mesen', '' + number + ' mesen'],
	            'y': ['\'n ar', '\'iens ar'],
	            'yy': [number + ' ars', '' + number + ' ars']
	        };
	        return isFuture ? format[key][0] : (withoutSuffix ? format[key][0] : format[key][1]);
	    }

	    return tzl;

	}));

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Morocco Central Atlas Tamaziɣt (tzm)
	//! author : Abdel Said : https://github.com/abdelsaid

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var tzm = moment.defineLocale('tzm', {
	        months : 'ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ'.split('_'),
	        monthsShort : 'ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ'.split('_'),
	        weekdays : 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
	        weekdaysShort : 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
	        weekdaysMin : 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[ⴰⵙⴷⵅ ⴴ] LT',
	            nextDay: '[ⴰⵙⴽⴰ ⴴ] LT',
	            nextWeek: 'dddd [ⴴ] LT',
	            lastDay: '[ⴰⵚⴰⵏⵜ ⴴ] LT',
	            lastWeek: 'dddd [ⴴ] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s',
	            past : 'ⵢⴰⵏ %s',
	            s : 'ⵉⵎⵉⴽ',
	            m : 'ⵎⵉⵏⵓⴺ',
	            mm : '%d ⵎⵉⵏⵓⴺ',
	            h : 'ⵙⴰⵄⴰ',
	            hh : '%d ⵜⴰⵙⵙⴰⵄⵉⵏ',
	            d : 'ⴰⵙⵙ',
	            dd : '%d oⵙⵙⴰⵏ',
	            M : 'ⴰⵢoⵓⵔ',
	            MM : '%d ⵉⵢⵢⵉⵔⵏ',
	            y : 'ⴰⵙⴳⴰⵙ',
	            yy : '%d ⵉⵙⴳⴰⵙⵏ'
	        },
	        week : {
	            dow : 6, // Saturday is the first day of the week.
	            doy : 12  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return tzm;

	}));

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Morocco Central Atlas Tamaziɣt in Latin (tzm-latn)
	//! author : Abdel Said : https://github.com/abdelsaid

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var tzm_latn = moment.defineLocale('tzm-latn', {
	        months : 'innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir'.split('_'),
	        monthsShort : 'innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir'.split('_'),
	        weekdays : 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
	        weekdaysShort : 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
	        weekdaysMin : 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[asdkh g] LT',
	            nextDay: '[aska g] LT',
	            nextWeek: 'dddd [g] LT',
	            lastDay: '[assant g] LT',
	            lastWeek: 'dddd [g] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'dadkh s yan %s',
	            past : 'yan %s',
	            s : 'imik',
	            m : 'minuḍ',
	            mm : '%d minuḍ',
	            h : 'saɛa',
	            hh : '%d tassaɛin',
	            d : 'ass',
	            dd : '%d ossan',
	            M : 'ayowr',
	            MM : '%d iyyirn',
	            y : 'asgas',
	            yy : '%d isgasn'
	        },
	        week : {
	            dow : 6, // Saturday is the first day of the week.
	            doy : 12  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return tzm_latn;

	}));

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : ukrainian (uk)
	//! author : zemlanin : https://github.com/zemlanin
	//! Author : Menelion Elensúle : https://github.com/Oire

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function plural(word, num) {
	        var forms = word.split('_');
	        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
	    }
	    function relativeTimeWithPlural(number, withoutSuffix, key) {
	        var format = {
	            'mm': withoutSuffix ? 'хвилина_хвилини_хвилин' : 'хвилину_хвилини_хвилин',
	            'hh': withoutSuffix ? 'година_години_годин' : 'годину_години_годин',
	            'dd': 'день_дні_днів',
	            'MM': 'місяць_місяці_місяців',
	            'yy': 'рік_роки_років'
	        };
	        if (key === 'm') {
	            return withoutSuffix ? 'хвилина' : 'хвилину';
	        }
	        else if (key === 'h') {
	            return withoutSuffix ? 'година' : 'годину';
	        }
	        else {
	            return number + ' ' + plural(format[key], +number);
	        }
	    }
	    function weekdaysCaseReplace(m, format) {
	        var weekdays = {
	            'nominative': 'неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота'.split('_'),
	            'accusative': 'неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу'.split('_'),
	            'genitive': 'неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи'.split('_')
	        },
	        nounCase = (/(\[[ВвУу]\]) ?dddd/).test(format) ?
	            'accusative' :
	            ((/\[?(?:минулої|наступної)? ?\] ?dddd/).test(format) ?
	                'genitive' :
	                'nominative');
	        return weekdays[nounCase][m.day()];
	    }
	    function processHoursFunction(str) {
	        return function () {
	            return str + 'о' + (this.hours() === 11 ? 'б' : '') + '] LT';
	        };
	    }

	    var uk = moment.defineLocale('uk', {
	        months : {
	            'format': 'січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня'.split('_'),
	            'standalone': 'січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень'.split('_')
	        },
	        monthsShort : 'січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд'.split('_'),
	        weekdays : weekdaysCaseReplace,
	        weekdaysShort : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
	        weekdaysMin : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY р.',
	            LLL : 'D MMMM YYYY р., HH:mm',
	            LLLL : 'dddd, D MMMM YYYY р., HH:mm'
	        },
	        calendar : {
	            sameDay: processHoursFunction('[Сьогодні '),
	            nextDay: processHoursFunction('[Завтра '),
	            lastDay: processHoursFunction('[Вчора '),
	            nextWeek: processHoursFunction('[У] dddd ['),
	            lastWeek: function () {
	                switch (this.day()) {
	                case 0:
	                case 3:
	                case 5:
	                case 6:
	                    return processHoursFunction('[Минулої] dddd [').call(this);
	                case 1:
	                case 2:
	                case 4:
	                    return processHoursFunction('[Минулого] dddd [').call(this);
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'за %s',
	            past : '%s тому',
	            s : 'декілька секунд',
	            m : relativeTimeWithPlural,
	            mm : relativeTimeWithPlural,
	            h : 'годину',
	            hh : relativeTimeWithPlural,
	            d : 'день',
	            dd : relativeTimeWithPlural,
	            M : 'місяць',
	            MM : relativeTimeWithPlural,
	            y : 'рік',
	            yy : relativeTimeWithPlural
	        },
	        // M. E.: those two are virtually unused but a user might want to implement them for his/her website for some reason
	        meridiemParse: /ночі|ранку|дня|вечора/,
	        isPM: function (input) {
	            return /^(дня|вечора)$/.test(input);
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'ночі';
	            } else if (hour < 12) {
	                return 'ранку';
	            } else if (hour < 17) {
	                return 'дня';
	            } else {
	                return 'вечора';
	            }
	        },
	        ordinalParse: /\d{1,2}-(й|го)/,
	        ordinal: function (number, period) {
	            switch (period) {
	            case 'M':
	            case 'd':
	            case 'DDD':
	            case 'w':
	            case 'W':
	                return number + '-й';
	            case 'D':
	                return number + '-го';
	            default:
	                return number;
	            }
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return uk;

	}));

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : uzbek (uz)
	//! author : Sardor Muminov : https://github.com/muminoff

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var uz = moment.defineLocale('uz', {
	        months : 'январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр'.split('_'),
	        monthsShort : 'янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек'.split('_'),
	        weekdays : 'Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба'.split('_'),
	        weekdaysShort : 'Якш_Душ_Сеш_Чор_Пай_Жум_Шан'.split('_'),
	        weekdaysMin : 'Як_Ду_Се_Чо_Па_Жу_Ша'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'D MMMM YYYY, dddd HH:mm'
	        },
	        calendar : {
	            sameDay : '[Бугун соат] LT [да]',
	            nextDay : '[Эртага] LT [да]',
	            nextWeek : 'dddd [куни соат] LT [да]',
	            lastDay : '[Кеча соат] LT [да]',
	            lastWeek : '[Утган] dddd [куни соат] LT [да]',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'Якин %s ичида',
	            past : 'Бир неча %s олдин',
	            s : 'фурсат',
	            m : 'бир дакика',
	            mm : '%d дакика',
	            h : 'бир соат',
	            hh : '%d соат',
	            d : 'бир кун',
	            dd : '%d кун',
	            M : 'бир ой',
	            MM : '%d ой',
	            y : 'бир йил',
	            yy : '%d йил'
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return uz;

	}));

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : vietnamese (vi)
	//! author : Bang Nguyen : https://github.com/bangnk

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var vi = moment.defineLocale('vi', {
	        months : 'tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12'.split('_'),
	        monthsShort : 'Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy'.split('_'),
	        weekdaysShort : 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
	        weekdaysMin : 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
	        weekdaysParseExact : true,
	        meridiemParse: /sa|ch/i,
	        isPM : function (input) {
	            return /^ch$/i.test(input);
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours < 12) {
	                return isLower ? 'sa' : 'SA';
	            } else {
	                return isLower ? 'ch' : 'CH';
	            }
	        },
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM [năm] YYYY',
	            LLL : 'D MMMM [năm] YYYY HH:mm',
	            LLLL : 'dddd, D MMMM [năm] YYYY HH:mm',
	            l : 'DD/M/YYYY',
	            ll : 'D MMM YYYY',
	            lll : 'D MMM YYYY HH:mm',
	            llll : 'ddd, D MMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[Hôm nay lúc] LT',
	            nextDay: '[Ngày mai lúc] LT',
	            nextWeek: 'dddd [tuần tới lúc] LT',
	            lastDay: '[Hôm qua lúc] LT',
	            lastWeek: 'dddd [tuần rồi lúc] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : '%s tới',
	            past : '%s trước',
	            s : 'vài giây',
	            m : 'một phút',
	            mm : '%d phút',
	            h : 'một giờ',
	            hh : '%d giờ',
	            d : 'một ngày',
	            dd : '%d ngày',
	            M : 'một tháng',
	            MM : '%d tháng',
	            y : 'một năm',
	            yy : '%d năm'
	        },
	        ordinalParse: /\d{1,2}/,
	        ordinal : function (number) {
	            return number;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return vi;

	}));

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : pseudo (x-pseudo)
	//! author : Andrew Hood : https://github.com/andrewhood125

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var x_pseudo = moment.defineLocale('x-pseudo', {
	        months : 'J~áñúá~rý_F~ébrú~árý_~Márc~h_Áp~ríl_~Máý_~Júñé~_Júl~ý_Áú~gúst~_Sép~témb~ér_Ó~ctób~ér_Ñ~óvém~bér_~Décé~mbér'.split('_'),
	        monthsShort : 'J~áñ_~Féb_~Már_~Ápr_~Máý_~Júñ_~Júl_~Áúg_~Sép_~Óct_~Ñóv_~Déc'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'S~úñdá~ý_Mó~ñdáý~_Túé~sdáý~_Wéd~ñésd~áý_T~húrs~dáý_~Fríd~áý_S~átúr~dáý'.split('_'),
	        weekdaysShort : 'S~úñ_~Móñ_~Túé_~Wéd_~Thú_~Frí_~Sát'.split('_'),
	        weekdaysMin : 'S~ú_Mó~_Tú_~Wé_T~h_Fr~_Sá'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[T~ódá~ý át] LT',
	            nextDay : '[T~ómó~rró~w át] LT',
	            nextWeek : 'dddd [át] LT',
	            lastDay : '[Ý~ést~érdá~ý át] LT',
	            lastWeek : '[L~ást] dddd [át] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'í~ñ %s',
	            past : '%s á~gó',
	            s : 'á ~féw ~sécó~ñds',
	            m : 'á ~míñ~úté',
	            mm : '%d m~íñú~tés',
	            h : 'á~ñ hó~úr',
	            hh : '%d h~óúrs',
	            d : 'á ~dáý',
	            dd : '%d d~áýs',
	            M : 'á ~móñ~th',
	            MM : '%d m~óñt~hs',
	            y : 'á ~ýéár',
	            yy : '%d ý~éárs'
	        },
	        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (~~(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return x_pseudo;

	}));

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : chinese (zh-cn)
	//! author : suupic : https://github.com/suupic
	//! author : Zeno Zeng : https://github.com/zenozeng

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var zh_cn = moment.defineLocale('zh-cn', {
	        months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
	        monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	        weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
	        weekdaysShort : '周日_周一_周二_周三_周四_周五_周六'.split('_'),
	        weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
	        longDateFormat : {
	            LT : 'Ah点mm分',
	            LTS : 'Ah点m分s秒',
	            L : 'YYYY-MM-DD',
	            LL : 'YYYY年MMMD日',
	            LLL : 'YYYY年MMMD日Ah点mm分',
	            LLLL : 'YYYY年MMMD日ddddAh点mm分',
	            l : 'YYYY-MM-DD',
	            ll : 'YYYY年MMMD日',
	            lll : 'YYYY年MMMD日Ah点mm分',
	            llll : 'YYYY年MMMD日ddddAh点mm分'
	        },
	        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
	        meridiemHour: function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === '凌晨' || meridiem === '早上' ||
	                    meridiem === '上午') {
	                return hour;
	            } else if (meridiem === '下午' || meridiem === '晚上') {
	                return hour + 12;
	            } else {
	                // '中午'
	                return hour >= 11 ? hour : hour + 12;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            var hm = hour * 100 + minute;
	            if (hm < 600) {
	                return '凌晨';
	            } else if (hm < 900) {
	                return '早上';
	            } else if (hm < 1130) {
	                return '上午';
	            } else if (hm < 1230) {
	                return '中午';
	            } else if (hm < 1800) {
	                return '下午';
	            } else {
	                return '晚上';
	            }
	        },
	        calendar : {
	            sameDay : function () {
	                return this.minutes() === 0 ? '[今天]Ah[点整]' : '[今天]LT';
	            },
	            nextDay : function () {
	                return this.minutes() === 0 ? '[明天]Ah[点整]' : '[明天]LT';
	            },
	            lastDay : function () {
	                return this.minutes() === 0 ? '[昨天]Ah[点整]' : '[昨天]LT';
	            },
	            nextWeek : function () {
	                var startOfWeek, prefix;
	                startOfWeek = moment().startOf('week');
	                prefix = this.diff(startOfWeek, 'days') >= 7 ? '[下]' : '[本]';
	                return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
	            },
	            lastWeek : function () {
	                var startOfWeek, prefix;
	                startOfWeek = moment().startOf('week');
	                prefix = this.unix() < startOfWeek.unix()  ? '[上]' : '[本]';
	                return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
	            },
	            sameElse : 'LL'
	        },
	        ordinalParse: /\d{1,2}(日|月|周)/,
	        ordinal : function (number, period) {
	            switch (period) {
	            case 'd':
	            case 'D':
	            case 'DDD':
	                return number + '日';
	            case 'M':
	                return number + '月';
	            case 'w':
	            case 'W':
	                return number + '周';
	            default:
	                return number;
	            }
	        },
	        relativeTime : {
	            future : '%s内',
	            past : '%s前',
	            s : '几秒',
	            m : '1 分钟',
	            mm : '%d 分钟',
	            h : '1 小时',
	            hh : '%d 小时',
	            d : '1 天',
	            dd : '%d 天',
	            M : '1 个月',
	            MM : '%d 个月',
	            y : '1 年',
	            yy : '%d 年'
	        },
	        week : {
	            // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return zh_cn;

	}));

/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : traditional chinese (zh-tw)
	//! author : Ben : https://github.com/ben-lin

	;(function (global, factory) {
	    true ? factory(__webpack_require__(131)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var zh_tw = moment.defineLocale('zh-tw', {
	        months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
	        monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	        weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
	        weekdaysShort : '週日_週一_週二_週三_週四_週五_週六'.split('_'),
	        weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
	        longDateFormat : {
	            LT : 'Ah點mm分',
	            LTS : 'Ah點m分s秒',
	            L : 'YYYY年MMMD日',
	            LL : 'YYYY年MMMD日',
	            LLL : 'YYYY年MMMD日Ah點mm分',
	            LLLL : 'YYYY年MMMD日ddddAh點mm分',
	            l : 'YYYY年MMMD日',
	            ll : 'YYYY年MMMD日',
	            lll : 'YYYY年MMMD日Ah點mm分',
	            llll : 'YYYY年MMMD日ddddAh點mm分'
	        },
	        meridiemParse: /早上|上午|中午|下午|晚上/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === '早上' || meridiem === '上午') {
	                return hour;
	            } else if (meridiem === '中午') {
	                return hour >= 11 ? hour : hour + 12;
	            } else if (meridiem === '下午' || meridiem === '晚上') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            var hm = hour * 100 + minute;
	            if (hm < 900) {
	                return '早上';
	            } else if (hm < 1130) {
	                return '上午';
	            } else if (hm < 1230) {
	                return '中午';
	            } else if (hm < 1800) {
	                return '下午';
	            } else {
	                return '晚上';
	            }
	        },
	        calendar : {
	            sameDay : '[今天]LT',
	            nextDay : '[明天]LT',
	            nextWeek : '[下]ddddLT',
	            lastDay : '[昨天]LT',
	            lastWeek : '[上]ddddLT',
	            sameElse : 'L'
	        },
	        ordinalParse: /\d{1,2}(日|月|週)/,
	        ordinal : function (number, period) {
	            switch (period) {
	            case 'd' :
	            case 'D' :
	            case 'DDD' :
	                return number + '日';
	            case 'M' :
	                return number + '月';
	            case 'w' :
	            case 'W' :
	                return number + '週';
	            default :
	                return number;
	            }
	        },
	        relativeTime : {
	            future : '%s內',
	            past : '%s前',
	            s : '幾秒',
	            m : '1分鐘',
	            mm : '%d分鐘',
	            h : '1小時',
	            hh : '%d小時',
	            d : '1天',
	            dd : '%d天',
	            M : '1個月',
	            MM : '%d個月',
	            y : '1年',
	            yy : '%d年'
	        }
	    });

	    return zh_tw;

	}));

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var React = __webpack_require__(23)

	var $__0=
	     
	     
	      
	  __webpack_require__(1),BooleanField=$__0.BooleanField,BoundField=$__0.BoundField,CheckboxChoiceInput=$__0.CheckboxChoiceInput,CheckboxFieldRenderer=$__0.CheckboxFieldRenderer,CheckboxSelectMultiple=$__0.CheckboxSelectMultiple,ChoiceFieldRenderer=$__0.ChoiceFieldRenderer,FileField=$__0.FileField,Form=$__0.Form,MultiValueField=$__0.MultiValueField,MultiWidget=$__0.MultiWidget,RadioChoiceInput=$__0.RadioChoiceInput,RadioFieldRenderer=$__0.RadioFieldRenderer,RadioSelect=$__0.RadioSelect

	var SPINNER = 'data:image/gif;base64,R0lGODlhDgAOANU%2FAJ2rtf39%2FfL09a65wvX2993i5qq2v9Ta35CgrLjCyuTo6%2Bfq7aGvub3Hzs7V2vX3%2BI6eq9rf47rEzOvu8NLZ3ens7u7w8sDJ0ODl6MfP1aazvYqbqNDX3Pr7%2FLW%2Fx4iZpomap%2BPn6vHz9Y2dqqSxu%2FT19%2Bjr7tfd4dvg5KOwuvj5%2BeLm6ae0vd%2Fk5%2Fj5%2BvHz9Nbc4Nbc4Y2dqff4%2Bebp7NXb3%2FDy9Iqbp%2BXp7Pv8%2FL%2FIz%2Fn6%2B7nDy%2FDy84%2Bfq%2F%2F%2F%2FyH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FwtYTVAgRGF0YVhNUDw%2FeHBhY2tldCBiZWdpbj0i77u%2FIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8%2BIDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyNzA4MjZFM0EyRUExMUUzQjE2OUQwNUQ1MzZBQ0M2NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyNzA4MjZFNEEyRUExMUUzQjE2OUQwNUQ1MzZBQ0M2NyI%2BIDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjk2NDkzOTlDQTJBOTExRTNCMTY5RDA1RDUzNkFDQzY3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjI3MDgyNkUyQTJFQTExRTNCMTY5RDA1RDUzNkFDQzY3Ii8%2BIDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY%2BIDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8%2BAf%2F%2B%2Ffz7%2Bvn49%2Fb19PPy8fDv7u3s6%2Brp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M%2FOzczLysnIx8bFxMPCwcC%2Fvr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ%2BenZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8%2BPTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEBQMAPwAsAAAAAA4ADgAABhTAn3BILBqPyKRyyWw6n9CodGoMAgAh%2BQQFAwA%2FACwHAAAAAQADAAAGBcCOrRMEACH5BAUDAD8ALAcAAAABAAMAAAYFwNKhFAQAIfkEBQMAPwAsBwAAAAEAAwAABgXABQkXBAAh%2BQQFAwA%2FACwHAAAAAgADAAAGB8DQ7FOLPYIAIfkEBQMAPwAsBwAAAAMAAwAABgrAX%2Bn3%2B0xOmV8QACH5BAUDAD8ALAcAAAAEAAMAAAYLQMxvOCSJfjpNIAgAIfkEBQMAPwAsBwAAAAUABAAABg%2FA0G9I%2FCmGDR%2BoMiRQfkEAIfkEBQMAPwAsBwAAAAYABQAABhNAzG9IHIaGNcnQQXwwPotm7RcEACH5BAUDAD8ALAcAAAAHAAYAAAYVwNVvSCwSTw3ExzgECYkEBMOYMXSCACH5BAUDAD8ALAcAAAAHAAgAAAYcwNBvSCQqij8fiFMkDIXIFPLyERRRn1axl1gEAQAh%2BQQFAwA%2FACwLAAcAAwADAAAGCsDIB3P5CFCeXxAAIfkEBQMAPwAsCgAHAAQABQAABhHAn7Al%2FIkeiNTP8An9MA5hEAAh%2BQQFAwA%2FACwIAAMABgAKAAAGHMCf8LcaGo9II%2BpXOL6MDCGBASrWEKBhjRQaBgEAIfkEBQMAPwAsBgAAAAgADgAABirA3%2BRHLP4YxJCxYGw6i4%2BndEpsPQVGwi%2F1VE5ODd%2BPQxx8Pj9FsRIqNYMAIfkECQMAPwAsAwAAAAkADgAABiLAn%2FA3Gxp%2FjuNw8kMgldAhIUqtWq%2FKC692DLA%2BHyhhdQwCACH5BAkDAD8ALAAAAAAOAA4AAAZGwJ9wKOwQj0QGKYQ8XnwgR5NIYHymxAeCgR1efqLuDyUWkstfYgBJQBAdgPCwCiLWQBAJ7NSAco4VBh%2BDHyQKUw8KISVHQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGUcCfcEgsGn%2BBQehItCBADubwwQCtpMIHgoEVXj6vLupTEH9aP1OE%2BRX8DCORkYBICU0bgHtIqC6FNRsQEicnDT4gHEULGh%2BOHyQKTA8hISVFQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGVsCfcEgsGoe9Y1EBciiHDwYI8xSWEIyqUPexBVQBZeRTWHwoStSn5QIllJeP4GeQvYwEREpY2QBERARSIUMwGyMSMScNPiAcRSYsH5MfJApKDwohJUVBACH5BAkDAD8ALAAAAAAOAA4AAAZRwJ9wSCwaj8ghLTl0gFbMHwGR%2Bs0GCuTlI8B9DkjUp7X4UMJjFyih5f4MspdxWv1VNgARkcAAhYYwGyMSMScNPiAcRSYsH44fJFlHDwohJUVBACH5BAkDAD8ALAAAAAAOAA4AAAZVwJ9wSCwaj8gjIZBk%2FlgaZCb1m30kSN3HhvvUkJFPYfGhIFGflguUQF4%2Bgp9B9jISENRfZQMQEQkMICFDMBsjEjEnDT4gHEUmLB%2BSHyQKSA8KISVFQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGUcCfcEgsGo%2FCCZJo2nCWQsNIBHWBeEvLjvY5IAuf1uJDQaLC1gTy8hH8DLKXkYBICSsbAHVIYIBCQzAbIxIxJw0%2BIE9MLB%2BOHyQKSA8KISVFQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGU8CfcEgsCnNGYw3gSg5NG0DJKWSNetTf7JPI%2FhQfincRdgoUOReom7x8BD%2BD7GV8IBjCSlREJDA%2BIUMwGyMSMScNPiAORSYsH5AfKYFJDwohU0RBACH5BAkDAD8ALAAAAAAOAA4AAAZPwJ9wSCwKFyhjsXYDKIemDUDwFLJG1Orsw6sKcZ%2BD97f4UMYuUGL8M8hexkemI6xIRcQHA7QawjYjEjE1Ej4gDkUmLB%2BMHyQhTw8KGCVFQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGSsCfcEgsChcajJFY20BOS6FpAxBEhYaR6PqbfXjcH%2B5zCC8%2BlLALlAj%2FDLJXuELdDh%2BBImwzksRODQgNRiYsH4cfJCFRDworJUVBACH5BAkDAD8ALAAAAAAOAA4AAAZGwJ9Q2BkajQsN4nisbUaSAFNougEE06FhJMoKZyCeV0j7HMa%2FxYeCdoES6J9B9kJXNoDuGPaUxGA2WSYsH4UZYw8KGARHQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGPMCfUPhQDY%2FDBetzQB5rN4hk4hRWNgBBdWgYibZCFYgHFtKY5d%2B5WRaT091v%2BQqQg6HSV1n5MaV%2FDwFVQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGPMCfUPiwDI%2FDBetjQB5rG4ik5RSaNgBRdWgYabc%2FF4gHFtI%2Bh%2FIP96GoZ5%2BE%2Bsca9dQLrEBdA6HmRnNqQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGN8CfUPgwDY9DE%2BvjQx5jm5Ek4hSaNgBRdWiQvbZCF4gHFtI%2Bh%2FIPh1bPPmS1YURQmxzqvH4%2FDAIAIfkECQMAPwAsAAAAAA4ADgAABjXAn1D4UASGSKGJ9fmokkPYZiSJHaGmDUAERRpkr%2B7QBeKJh4sP5SzEfWrs38yziNvv%2BLw%2BCAAh%2BQQJAwA%2FACwAAAAADgAOAAAGL8CfUPhQBIZIoYn1%2BaiSQ9hmJIkdoaYNQARFGmTcrlAF4omHFhLqzG673%2FC4%2FBwEACH5BAkDAD8ALAAAAAAOAA4AAAYqwJ9Q%2BAgFhkjhQvP5qJLD2gYiOR2hpg1AAEUaRqIu8rESm8%2FotHrNbrODACH5BAkDAD8ALAAAAAAOAA4AAAYowJ9QSFgFhkghTfP5qJLD2g3Cqx2hOQDABk3uSt2weEwum8%2FotBoZBAAh%2BQQJAwA%2FACwAAAAADgAOAAAGI8CfUEgIBYZI4ULz%2BaiSwx1iJDkdoUKTCMvter%2FgsHhMLpeDACH5BAkDAD8ALAAAAAAOAA4AAAYgwJ9QSFgFhkihSvP5qJLJAe9whFqv2Kx2y%2B16v%2BDwMAgAIfkECQMAPwAsAAAAAA4ADgAABh7An1BICAWGyKHl81Eln5nT8UmtWq%2FYrHbL7Xq%2FwyAAIfkECQMAPwAsAAAAAA4ADgAABh3An1D4WAWGSCTno0o6S7Wjc0qtWq%2FYrHbL7XqHQQAh%2BQQFAwA%2FACwAAAAADgAOAAAGGsCfcIgLDI9IgArJ%2FBWb0Kh0Sq1ar9isVhoEACH5BAUDAD8ALAYAAAABAAMAAAYFQAFHEAQAIfkECQMAPwAsBgAAAAEAAwAABgXAnK0TBAAh%2BQQJAwA%2FACwAAAAADgAOAAAGFMCfcEgsGo%2FIpHLJbDqf0Kh0agwCACH5BAUDAD8ALAAAAAAOAA4AAAYUwJ9wSCwaj8ikcslsOp%2FQqHRqDAIAIfkEBQMAPwAsAAAAAAEAAQAABgPAXxAAIfkEBQMAPwAsAAAAAAEAAQAABgPAXxAAIfkEBQMAPwAsAAAAAAEAAQAABgPAXxAAIfkEBQMAPwAsAAAAAAEAAQAABgPAXxAAOw%3D%3D'

	var BOOTSTRAP_COLUMN_SIZES = ['xs', 'sm', 'md', 'lg']

	// =================================================================== Utils ===

	var noobj = {}

	var warn = function()  {}

	if ("production" !== process.env.NODE_ENV) {
	  warn = function(message ) {for (var args=[],$__0=1,$__1=arguments.length;$__0<$__1;$__0++) args.push(arguments[$__0]);
	    var index = 0
	    console.warn('[newforms-bootstrap] Warning: ' + message.replace(/%s/g, function()  {return args[index++];}))
	  }
	}

	var toString = Object.prototype.toString

	function cx(/*[...staticClasses: (string|falsy)[, conditionalClasses: Object.<string, booleanish>]]*/) {
	  var classNames = []
	  var staticClassCount = arguments.length
	  var conditionalClasses = null
	  if (toString.call(arguments[arguments.length - 1]) == '[object Object]') {
	    conditionalClasses = arguments[arguments.length - 1]
	    staticClassCount -= 1
	  }
	  for (var i = 0, l = staticClassCount; i < l; i++) {
	    if (arguments[i]) {
	      classNames.push(arguments[i])
	    }
	  }
	  if (conditionalClasses != null) {
	    Object.keys(conditionalClasses).forEach(function(className)  {
	      if (!!conditionalClasses[className]) {
	        classNames.push(className)
	      }
	    })
	  }
	  return classNames.join(' ')
	}

	function extend(dest, src) {
	  if (src) {
	    var props = Object.keys(src)
	    for (var i = 0, l = props.length; i < l ; i++) {
	      dest[props[i]] = src[props[i]]
	    }
	  }
	  return dest
	}

	function errorMessage(message) {
	  return React.createElement("span", {className: "help-block"}, 
	    React.createElement("span", {className: "glyphicon glyphicon-exclamation-sign"}), " ", message
	  )
	}

	// ============================================== Bootstrap Newforms Objects ===

	function patchForm(form) {
	  if (!form.__patchedByBootstrapForm) {
	    BootstrapForm.patchFields(form)
	    form.__patchedByBootstrapForm = true
	  }
	}

	var BootstrapChoiceFieldRenderer = ChoiceFieldRenderer.extend({
	  className: null,

	  constructor:function(name, value, attrs, controlled, choices) {
	    if (!(this instanceof BootstrapChoiceFieldRenderer)) {
	      return new BootstrapChoiceFieldRenderer(name, value, attrs, controlled, choices)
	    }
	    ChoiceFieldRenderer.call(this, name, value, attrs, controlled, choices)
	  },

	  render:function() {
	    var id = this.attrs.id || null
	    var key = this.attrs.key || null
	    if (key) {
	      delete this.attrs.key
	    }
	    var items = []
	    for (var i = 0, l = this.choices.length; i < l; i++) {
	      var choice = this.choices[i]
	      var $__0=   choice,choiceValue=$__0[0],choiceLabel=$__0[1]
	      if (Array.isArray(choiceLabel)) {
	        var attrsPlus = extend({}, this.attrs)
	        if (id) { attrsPlus.id +='_' + i }
	        if (key) { attrsPlus.key += '_' + i }
	        var subRenderer = BootstrapChoiceFieldRenderer(
	          this.name, this.value, attrsPlus, this.controlled, choiceLabel)
	        subRenderer.choiceInputConstructor = this.choiceInputConstructor
	        subRenderer.className = this.className
	        items.push(React.createElement("li", null, React.createElement("em", {className: "help-block"}, choiceValue), subRenderer.render()))
	      }
	      else {
	        var w = this.choiceInputConstructor(
	          this.name, this.value, extend({}, this.attrs), this.controlled, choice, i)
	        items.push(React.createElement("li", {className: this.className}, w.render()))
	      }
	    }
	    var listAttrs = {className: 'list-unstyled'}
	    if (id) {
	      listAttrs.id = id
	    }
	    return React.createElement("ul", React.__spread({},  listAttrs), items)
	  }
	})

	var BootstrapCheckboxRenderer = BootstrapChoiceFieldRenderer.extend({
	  choiceInputConstructor: CheckboxChoiceInput,
	  className: 'checkbox'
	})

	var BootstrapRadioRenderer = BootstrapChoiceFieldRenderer.extend({
	  choiceInputConstructor: RadioChoiceInput,
	  className: 'radio'
	})

	var BootstrapCheckboxInlineRenderer = CheckboxFieldRenderer.extend({
	  render:function() {
	    return React.createElement("div", {className: "checkbox"}, 
	      this.choiceInputs().map(function(input)  {return React.createElement("label", {className: "checkbox-inline"}, 
	        input.tag(), " ", input.choiceLabel
	      );})
	    )
	  }
	})

	var BootstrapRadioInlineRenderer = RadioFieldRenderer.extend({
	  render:function() {
	    return React.createElement("div", {className: "radio"}, 
	      this.choiceInputs().map(function(input)  {return React.createElement("label", {className: "radio-inline"}, 
	        input.tag(), " ", input.choiceLabel
	      );})
	    )
	  }
	})

	// ========================================================= Form Components ===

	var BootstrapForm = React.createClass({displayName: "BootstrapForm",
	  statics: {
	    patchFields:function(form) {
	      if (form.__patchedByBootstrapForm) { return }
	      var fieldNames = Object.keys(form.fields)
	      for (var i = 0, l = fieldNames.length; i < l ; i++) {
	        var field = form.fields[fieldNames[i]]
	        if (field.widget instanceof CheckboxSelectMultiple) {
	          if (field.widget.renderer === CheckboxFieldRenderer) {
	            field.widget.renderer = BootstrapCheckboxRenderer
	          }
	        }
	        else if (field.widget instanceof RadioSelect) {
	          if (field.widget.renderer === RadioFieldRenderer) {
	            field.widget.renderer = BootstrapRadioRenderer
	          }
	        }
	        else if (field instanceof MultiValueField) {
	          if (field.fields.length < 5 &&
	              field.widget.formatOutput === MultiWidget.prototype.formatOutput) {
	            var colClass = 'col-sm-' + (12 / field.fields.length)
	            field.widget.formatOutput = function(widgets) {
	              return React.createElement("div", {className: "row"}, 
	                widgets.map(function(widget)  {return React.createElement("div", {className: colClass}, widget);})
	              )
	            }
	          }
	        }
	      }
	    }
	  },

	  propTypes: {
	    form: React.PropTypes.instanceOf(Form).isRequired,
	    spinner: React.PropTypes.string
	  },

	  getDefaultProps:function() {
	    return {
	      spinner: SPINNER
	    }
	  },

	  render:function() {
	    patchForm(this.props.form)
	    return React.createElement("div", null, 
	      this.renderRows()
	    )
	  },

	  renderRows:function() {
	    var rows = []
	    var form = this.props.form
	    var formErrors = form.nonFieldErrors()
	    if (formErrors.isPopulated()) {
	      rows.push(React.createElement("div", {key: form.addPrefix('__all__'), className: "alert alert-danger has-error"}, 
	        formErrors.messages().map(errorMessage)
	      ))
	    }
	    rows.push.apply(rows, form.visibleFields().map(function(field) 
	      {return React.createElement(BootstrapField, {key: field.htmlName, field: field, spinner: this.props.spinner});}.bind(this)
	    ))
	    var hiddenFields = form.hiddenFields()
	    if (hiddenFields.length > 0) {
	      rows.push(React.createElement("div", {key: form.addPrefix('__hiddenFields__'), style: {display: 'none'}}, 
	        hiddenFields.map(function(field)  {return field.render();})
	      ))
	    }
	    if (form.nonFieldPending()) {
	      rows.push(React.createElement("span", {key: form.addPrefix('__pending__'), className: "help-block"}, 
	        React.createElement("img", {src: this.props.spinner}), " Validating…"
	      ))
	    }
	    return rows
	  }
	})

	var BootstrapField = React.createClass({displayName: "BootstrapField",
	  propTypes: {
	    field: React.PropTypes.instanceOf(BoundField).isRequired
	  , spinner: React.PropTypes.string
	  },

	  getDefaultProps:function() {
	    return {
	      spinner: SPINNER
	    }
	  },

	  render:function() {
	    var field = this.props.field
	    var status = field.status()
	    var isBooleanField = field.field.constructor === BooleanField
	    var isFileField = field.field instanceof FileField
	    var isSpecialCaseWidget = isBooleanField || isFileField
	    var containerClasses = cx({
	      'checkbox': isBooleanField
	    , 'form-group': !isBooleanField
	    , 'has-error': status == 'error'
	    , 'has-success': status == 'valid'
	    })
	    var widgetAttrs = {attrs: {className: cx({
	      'form-control': !isFileField  &&
	                      !(field.field.widget instanceof RadioSelect) &&
	                      !(field.field.widget instanceof CheckboxSelectMultiple)
	    })}}
	    // Always show help text for empty fields, regardless of status
	    var showHelpText = field.helpText && (field.isEmpty() || status == 'default')

	    return React.createElement("div", {className: containerClasses}, 
	      !isBooleanField && field.labelTag({attrs: {className: 'control-label'}}), 
	      !isSpecialCaseWidget && field.asWidget(widgetAttrs), 
	      isBooleanField && React.createElement("label", {htmlFor: field.idForLabel()}, 
	        field.asWidget(), " ", field.label
	      ), 
	      isFileField && React.createElement("div", null, 
	        field.asWidget(widgetAttrs)
	      ), 
	      showHelpText && field.helpTextTag({attrs: {className: 'help-block'}}), 
	      status == 'pending' && React.createElement("span", {className: "help-block"}, 
	        React.createElement("img", {src: this.props.spinner}), " Validating…"
	      ), 
	      status == 'error' && field.errors().messages().map(errorMessage)
	    )
	  }
	})

	// ========================================================= Grid Components ===

	/**
	 * Validates that a prop is a String or a Number with a value between 1 and 12.
	 */
	function colSizeChecker(props, propName, componentName, location) {
	  var originalValue = props[propName]
	  var value = props[propName]
	  var type = Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
	  if (value != null) {
	    if (type == 'string') {
	      value = Number(value)
	      type = 'number'
	    }

	    if (type == 'number' && !isNaN(value)) {
	      if (value < 1 || value > 12) {
	        return new Error(
	          ("Invalid " + location + " `" + propName + "` of value `" + value + "` ") +
	          ("supplied to `" + componentName + "`, Bootstrap column sizes must be ") +
	          ("between 1 and 12.")
	        )
	      }
	    }
	    else {
	      return new Error(
	        ("Invalid " + location + " `" + propName + "` of value `" + originalValue + "` ") +
	        ("supplied to `" + componentName + "`, expected a String or a Number.")
	      )
	    }
	  }
	}

	function calculateColumnProps(childProps, options) {
	  // Final column sizing prop object for each child - existing props will be
	  // copied to this object and missing props will be calculated.
	  var colSizeProps = childProps.map(function()  {return {};})
	  var $__0=   options,colProp=$__0.colProp,rowNum=$__0.rowNum

	  var availableCols = 12
	  var needColSizeIndexes = []
	  var offsetProp = (colProp + "Offset")

	  childProps.forEach(function(props, index)  {
	    if (colProp in props) {
	      var colSize = Number(props.md)
	      availableCols -= colSize
	      colSizeProps[index][colProp] = colSize
	    }
	    else {
	      needColSizeIndexes.push(index)
	    }

	    if (offsetProp in props) {
	      var offsetSize = Number(props[offsetProp])
	      availableCols -= offsetSize
	      colSizeProps[index][offsetProp] = offsetSize
	    }
	  })

	  if (needColSizeIndexes.length === 0) {
	    ("production" !== process.env.NODE_ENV ? warn(
	      '[Row %s] All Cols/Fields already have %s column units specified, so ' +
	      'you don\'t need to use autoColumns.',
	      rowNum, colProp
	    ) : null)
	  }
	  else if (availableCols < 0) {
	    ("production" !== process.env.NODE_ENV ? warn(
	      '[Row %s] Too many %s column units specified - widths and offsets ' +
	      'added up to %s.',
	      rowNum, colProp, 12 - availableCols
	    ) : null)
	  }
	  else if (availableCols === 0) {
	    ("production" !== process.env.NODE_ENV ? warn(
	      '[Row %s] There are no %s column units left to distribute to the %s ' +
	      'Cols/Fields which needthem.',
	      rowNum, colProp, needColSizeIndexes.length
	    ) : null)
	  }
	  else if (availableCols < needColSizeIndexes.length) {
	    ("production" !== process.env.NODE_ENV ? warn(
	      '[Row %s] There are more Cols/Fields needing column widths ' +
	      '(%s) than there are %s column units remaining to distribute (%s).',
	      rowNum, needColSizeIndexes.length, colProp, availableCols
	    ) : null)
	  }
	  else {
	    // Distribute remaining columns equally if possible. Otherwise, leftover
	    // column width will be distributed among initial columns.
	    var baseColSize = Math.floor(availableCols / needColSizeIndexes.length)
	    var leftoverCols = availableCols % needColSizeIndexes.length
	    needColSizeIndexes.forEach(function(colIndex, index)  {
	      colSizeProps[colIndex][colProp] = baseColSize + (index < leftoverCols ? 1 : 0)
	    })
	  }

	  return colSizeProps
	}

	var ColMixin = {
	  propTypes: {
	    className: React.PropTypes.string
	  , xs: colSizeChecker
	  , sm: colSizeChecker
	  , md: colSizeChecker
	  , lg: colSizeChecker
	  , xsOffset: colSizeChecker
	  , smOffset: colSizeChecker
	  , mdOffset: colSizeChecker
	  , lgOffset: colSizeChecker
	  },

	  getColClassName:function() {
	    var props = this.props
	    var classNames = {}
	    classNames[("col-xs-" + props.xs)] = !!props.xs
	    classNames[("col-sm-" + props.sm)] = !!props.sm
	    classNames[("col-md-" + props.md)] = !!props.md
	    classNames[("col-lg-" + props.lg)] = !!props.lg
	    classNames[("col-xs-offset-" + props.xsOffset)] = !!props.xsOffset
	    classNames[("col-sm-offset-" + props.smOffset)] = !!props.smOffset
	    classNames[("col-md-offset-" + props.mdOffset)] = !!props.mdOffset
	    classNames[("col-lg-offset-" + props.lgOffset)] = !!props.lgOffset
	    return cx(props.className, classNames)
	  }
	}

	var Container = React.createClass({displayName: "Container",
	  propTypes: {
	    autoColumns: React.PropTypes.oneOf(BOOTSTRAP_COLUMN_SIZES)
	  , className: React.PropTypes.string
	  , fluid: React.PropTypes.bool
	  , spinner: React.PropTypes.string
	  },

	  getDefaultProps:function() {
	    return {
	      autoColumns: null
	    , fluid: false
	    , spinner: SPINNER
	    }
	  },

	  render:function() {
	    var $__0=  this.props,form=$__0.form
	    patchForm(form)
	    var formErrors = form.nonFieldErrors()
	    return React.createElement("div", {className: cx(this.props.className, {'container': !this.props.fluid, 'fluid': this.props.fluid})}, 
	      formErrors.isPopulated() && React.createElement("div", {key: form.addPrefix('__all__'), className: "alert alert-danger has-error"}, 
	        formErrors.messages().map(errorMessage)
	      ), 
	      React.Children.map(this.props.children, function(row, index)  {return React.cloneElement(row, {
	        autoColumns: this.props.autoColumns
	      , form: this.props.form
	      , index: index
	      , spinner: this.props.spinner
	      });}.bind(this)), 
	      form.nonFieldPending() && React.createElement("span", {key: form.addPrefix('__pending__'), className: "help-block"}, 
	        React.createElement("img", {src: this.props.spinner}), " Validating…"
	      )
	    )
	  }
	})

	var Row = React.createClass({displayName: "Row",
	  propTypes: {
	    autoColumns: React.PropTypes.oneOf(BOOTSTRAP_COLUMN_SIZES)
	  , className: React.PropTypes.string
	  },

	  render:function() {
	    var columnProps = noobj
	    if (this.props.autoColumns) {
	      var childProps = []
	      React.Children.forEach(this.props.children, function(child)  {
	        childProps.push(child.props)
	      })
	      columnProps = calculateColumnProps(childProps, {
	        colProp: this.props.autoColumns
	      , rowNum: this.props.index + 1
	      })
	    }
	    return React.createElement("div", {className: cx('row', this.props.className)}, 
	      React.Children.map(this.props.children, function(child, index)  {
	        return React.cloneElement(child, extend({
	          form: this.props.form
	        , spinner: this.props.spinner
	        }, columnProps[index]))
	      }.bind(this))
	    )
	  }
	})

	var Col = React.createClass({displayName: "Col",
	  mixins: [ColMixin],

	  render:function() {
	    return React.createElement("div", {className: this.getColClassName()}, 
	      this.props.children
	    )
	  }
	})

	var Field = React.createClass({displayName: "Field",
	  mixins: [ColMixin],

	  propTypes: {
	    name: React.PropTypes.string.isRequired
	  },

	  render:function() {
	    var field = this.props.form.boundField(this.props.name)
	    return React.createElement("div", {className: this.getColClassName()}, 
	      React.createElement(BootstrapField, {key: field.htmlName, field: field})
	    )
	  }
	})

	extend(BootstrapForm, {
	  calculateColumnProps:calculateColumnProps
	, CheckboxInlineRenderer: BootstrapCheckboxInlineRenderer
	, CheckboxRenderer: BootstrapCheckboxRenderer
	, Col:Col
	, Container:Container
	, Field:Field
	, PropTypes: {
	    colSize: colSizeChecker
	  }
	, RadioInlineRenderer: BootstrapRadioInlineRenderer
	, RadioRenderer: BootstrapRadioRenderer
	, Row:Row
	})

	module.exports = BootstrapForm
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ }
/******/ ]);