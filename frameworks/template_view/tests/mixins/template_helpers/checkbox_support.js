// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================
(function() {
  var checkboxView, pane;

  module("Checkbox Support", {
    setup: function setup() {
      checkboxView = SC.TemplateView.create(SC.CheckboxSupport, {
        template: SC.Handlebars.compile('<input type="checkbox">')
      });

      pane = SC.MainPane.create({
        childViews: [checkboxView]
      });
      pane.append();
    },

    teardown: function teardown() {
      pane.remove();
    }
  });

  test("value property mirrors input value", function() {
    checkboxView.$('input').attr('checked', true);

    equals(checkboxView.get('value'), true, "gets value property from DOM");

    checkboxView.$('input').attr('checked', false);

    checkboxView.set('value', true);
    ok(checkboxView.$('input').attr("checked"), "sets value of DOM to value property");
  });

  module("SC.Checkbox", {
    setup: function setup() {
      checkboxView = SC.Checkbox.create({});

      pane = SC.MainPane.create({
        childViews: [checkboxView]
      });
      pane.append();
    },

    teardown: function teardown() {
      pane.remove();
    }
  });

  test("value property mirrors input value", function() {
    checkboxView.$('input').attr('checked', true);

    equals(checkboxView.get('value'), true, "gets value property from DOM");

    checkboxView.$('input').attr('checked', false);

    checkboxView.set('value', true);
    ok(checkboxView.$('input').attr("checked"), "sets value of DOM to value property");
  });
})();

