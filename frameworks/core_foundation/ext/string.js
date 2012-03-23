// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

sc_require('system/string');

SC.supplement(String.prototype,
/** @scope String.prototype */ {

  /**
    @see SC.String.capitalize
  */
  capitalize: function capitalize() {
    return SC.String.capitalize(this, arguments);
  },

  /**
    @see SC.String.camelize
  */
  camelize: function camelize() {
    return SC.String.camelize(this, arguments);
  },

  /**
    @see SC.String.decamelize
  */
  decamelize: function decamelize() {
    return SC.String.decamelize(this, arguments);
  },

  /**
    @see SC.String.dasherize
  */
  dasherize: function dasherize() {
    return SC.String.dasherize(this, arguments);
  },

  /**
    @see SC.String.loc
  */
  loc: function loc() {
    var args = SC.$A(arguments);
    args.unshift(this);
    return SC.String.loc.apply(SC.String, args);
  },

  /**
    @see SC.String.locWithDefault
  */
  locWithDefault: function locWithDefault(def) {
    var args = SC.$A(arguments);
    args.unshift(this);
    return SC.String.locWithDefault.apply(SC.String, args);
  },
  
  /**
    @see SC.String.mult
  */
  mult: function mult(value) {
    return SC.String.mult(this, value);
  }

});

