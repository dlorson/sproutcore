// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

sc_require('views/template');

/**
  @class
  @extends SC.TemplateView
  @extends SC.ActionSupport
*/
SC.Button = SC.TemplateView.extend(SC.ActionSupport,
/** @scope SC.Button.prototype */{

  classNames: ['sc-button'],

  mouseDown: function mouseDown() {
    this.set('isActive', true);
    this._isMouseDown = YES;
  },

  mouseExited: function mouseExited() {
    this.set('isActive', false);
  },

  mouseEntered: function mouseEntered() {
    if (this._isMouseDown) {
      this.set('isActive', true);
    }
  },

  rootResponder: function rootResponder() {
    var pane = this.get('pane');
    return pane.get('rootResponder');
  }.property('pane').cacheable(),

  mouseUp: function mouseUp(event) {
    if (this.get('isActive')) {
      this.fireAction();
      this.set('isActive', false);
    }

    this._isMouseDown = NO;
  },

  touchStart: function touchStart(touch) {
    this.mouseDown(touch);
  },

  touchEnd: function touchEnd(touch) {
    this.mouseUp(touch);
  }

});
