// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================
/*global Buffer */
// sc_require("jquery");
// sc_require("jquery-buffer");

(function() {

jQuery.buffer = jQuery.bufferedJQuery = jQuery.sub();

jQuery.bufferedJQuery.fn.extend({

  html: function html(value) {
    // if there is no value, we don't handle it.
    if (value === undefined) {
      if (this.length < 1) return undefined;
      return jQuery.Buffer.bufferForElement(this[0]).html();
    }

    // there is a vlaue. We are going to do it like jquery, but different.
    // in this, we inline "buffers" above
    var len = this.length, i, buffer;
    for (i = 0; i < len; i++) {
      buffer = jQuery.Buffer.bufferForElement(this[i]);
      buffer.html(value);
    }
    return this;
  },

  text: function text(value) {
    if (value === undefined) {
      if (this.length < 1) return undefined;
      return jQuery.Buffer.bufferForElement(this[0]).text();
    }

    // there is a vlaue. We are going to do it like jquery, but different.
    // in this, we inline "buffers" above
    var len = this.length, i, buffer;
    for (i = 0; i < len; i++) {
      buffer = jQuery.Buffer.bufferForElement(this[i]);
      buffer.text(value);
    }
    return this;
  },

  attr: function attr(key, value) {
    // first, handle the get-case
    var buffer;
    if (typeof value === "undefined" && typeof key === "string") {
      if (this.length < 1) return false;
      buffer = jQuery.Buffer.bufferForElement(this[0]);
      return buffer.attr(key);
    }

    // now, buffer the command.
    var len = this.length, i;
    for (i = 0; i < len; i++) {
      buffer = jQuery.Buffer.bufferForElement(this[i]);
      buffer.attr(key, value);
    }
    return this;
  },

  hasClass: function hasClass(className) {
    if (this.length < 1) return false;
    return jQuery.Buffer.bufferForElement(this[0]).hasClass(className);
  },
  
  setClass: function setClass(value, on) {
    // now, buffer the command.
    var len = this.length, i, buffer;
    for (i = 0; i < len; i++) {
      buffer = jQuery.Buffer.bufferForElement(this[i]);
      buffer.setClass(value, on);
    }
    return this;
  },

  addClass: function addClass(value) {
    // now, buffer the command.
    var len = this.length, i, buffer;
    for (i = 0; i < len; i++) {
      buffer = jQuery.Buffer.bufferForElement(this[i]);
      buffer.addClass(value);
    }
    return this;
  },

  removeClass: function removeClass(value) {
    // now, buffer the command.
    var len = this.length, i, buffer;
    for (i = 0; i < len; i++) {
      buffer = jQuery.Buffer.bufferForElement(this[i]);
      buffer.removeClass(value);
    }
    return this;
  },

  resetClassNames: function resetClassNames() {
    // now, buffer the command.
    var len = this.length, i, buffer;
    for (i = 0; i < len; i++) {
      buffer = jQuery.Buffer.bufferForElement(this[i]);
      buffer.resetClassNames();
    }
    return this;
  },

  css: function css(key, value) {
    // now, buffer the command.
    var len = this.length, i, buffer;
    for (i = 0; i < len; i++) {
      buffer = jQuery.Buffer.bufferForElement(this[i]);
      buffer.css(key, value);
    }
    return this;
  },

  styles: function styles() {
    if (this.length < 1) return null;
    return jQuery.Buffer.bufferForElement(this[0]).styles();
  },

  resetStyles: function resetStyles() {
    if (this.length < 1) return null;
    jQuery.Buffer.bufferForElement(this[0]).resetStyles();
    return this;
  }
});
})();
