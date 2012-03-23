// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

sc_require('system/string');

SC.supplement(String.prototype, {

  /**
    @see SC.String.capitalizeEach
  */
  capitalizeEach: function capitalizeEach() {
    return SC.String.capitalizeEach(this, arguments);
  },

  /**
    @see SC.String.titleize
  */
  titleize: function titleize(str) {
    return SC.String.titleize(this, arguments);
  },

  /**
    @see SC.String.classify
  */
  classify: function classify(str) {
    return SC.String.classify(this, arguments);
  },

  /**
    @see SC.String.humanize
  */
  humanize: function humanize(str) {
    return SC.String.humanize(this, arguments);
  },

  /**
    @see SC.String.escapeForRegExp
  */
  escapeForRegExp: function escapeForRegExp(str) {
    return SC.String.escapeForRegExp(this, arguments);
  },

  /**
    @see SC.String.removeDiacritics
  */
  removeDiacritics: function removeDiacritics(str) {
    return SC.String.removeDiacritics(this, arguments);
  },

  /**
    @see SC.String.trim
  */
  trim: function trim(str) {
    return SC.String.trim(this, arguments);
  },

  /**
    @see SC.String.trimLeft
  */
  trimLeft: function (str) {
    return SC.String.trimLeft(this, arguments);
  },

  /**
    @see SC.String.trimRight
  */
  trimRight: function (str) {
    return SC.String.trimRight(this, arguments);
  },

  /**
    @see SC.String.pluralize
  */
  pluralize: function pluralize(str) {
    return SC.String.pluralize(this, arguments);
  },

  /**
    @see SC.String.singularize
  */
  singularize: function singularize(str) {
    return SC.String.singularize(this, arguments);
  }

});