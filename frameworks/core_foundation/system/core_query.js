// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

sc_require('system/builder') ;

// Alias jQuery as SC.$ and SC.CoreQuery for compatibility
SC.$ = SC.CoreQuery = jQuery ;

// Add some plugins to SC.$. jQuery will get these also. -- test in system/core_query/additions
SC.mixin(SC.$.fn, /** @scope SC.$.prototype */ {

  isCoreQuery: YES, // walk like a duck

  /** @private - better loggin */
  toString: function toString() {
    var values = [],
        len = this.length, idx=0;
    for(idx=0;idx<len;idx++) {
      values[idx] = '%@: %@'.fmt(idx, this[idx] ? this[idx].toString() : '(null)');
    }
    return "<$:%@>(%@)".fmt(SC.guidFor(this),values.join(' , '));
  },

  /**
    Returns YES if all member elements are visible.  This is provided as a
    common test since CoreQuery does not support filtering by
    psuedo-selector.
  */
  isVisible: function isVisible() {
    return Array.prototype.every.call(this, function(elem){
      return SC.$.isVisible(elem);
    });
  },

  /**
    Attempts to find the views managing the passed DOM elements and returns
    them.   This will start with the matched element and walk up the DOM until
    it finds an element managed by a view.

    @returns {Array} array of views or null.
  */
  view: function view() {
    return this.map(function() {
      var ret=null, guidKey = SC.viewKey, dom = this, value;
      while(!ret && dom && (dom !== document)) {
        if (dom.nodeType===1 && (value = dom.getAttribute('id'))) { ret = SC.View.views[value] ; }
        dom = dom.parentNode;
      }
      dom = null;
      return ret ;
    });
  },

  /**
    Returns YES if any of the matched elements have the passed element or CQ object as a child element.
  */
  within: function within(el) {
    if( this.filter(el).length ) { return true; }
    return !!this.has(el).length;
  }

});

/**
  Make CoreQuery enumerable.  Since some methods need to be disambiguated,
  we will implement some wrapper functions here.

  Note that SC.Enumerable is implemented on SC.Builder, which means the
  CoreQuery object inherits this automatically.  jQuery does not extend from
  SC.Builder though, so we reapply SC.Enumerable just to be safe.
*/
(function() {
  var original = {},
      wrappers = {

    // if you call find with a selector, then use the jQuery way.  If you
    // call with a function/target, use Enumerable way
    find: function find(callback,target) {
      return (target !== undefined) ? SC.Enumerable.find.call(this, callback, target) : original.find.call(this, callback) ;
    },

    // ditto for filter - execute SC.Enumerable style if a target is passed.
    filter: function filter(callback,target) {
      return (target !== undefined) ?
        this.pushStack(SC.Enumerable.filter.call(this, callback, target)) :
        original.filter.call(this, callback) ;
    },

    // filterProperty is an SC.Enumerable thing, but it needs to be wrapped
    // in a CoreQuery object.
    filterProperty: function filterProperty(key, value) {
      return this.pushStack(
        SC.Enumerable.filterProperty.call(this,key,value));
    },

    // indexOf() is best implemented using the jQuery index()
    indexOf: SC.$.index,

    // map() is a little tricky because jQuery is non-standard.  If you pass
    // a context object, we will treat it like SC.Enumerable.  Otherwise use
    // jQuery.
    map: function map(callback, target) {
      return (target !== undefined) ?
        SC.Enumerable.map.call(this, callback, target) :
        original.map.call(this, callback);
    }
  };

  // loop through an update some enumerable methods.
  var fn = SC.$.fn,
      enumerable = SC.Enumerable ,
      value;

  for(var key in enumerable) {
    if (enumerable.hasOwnProperty(key)) {
      value = enumerable[key];
      if (key in wrappers) {
        original[key] = fn[key]; value = wrappers[key];
      }
      fn[key] = value;
    }
  }
})();

// Add some global helper methods.
SC.mixin(SC.$, {

  /** @private helper method to determine if an element is visible.  Exposed
   for use in testing. */
  isVisible: function isVisible(elem) {
    var CQ = SC.$;
    return ("hidden"!=elem.type) && (CQ.css(elem,"display")!="none") && (CQ.css(elem,"visibility")!="hidden");
  }

}) ;


