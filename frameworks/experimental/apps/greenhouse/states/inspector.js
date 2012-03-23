// ==========================================================================
// Project:   Greenhouse
// Copyright: ©2010 Mike Ball
// ==========================================================================
/*globals Greenhouse */
/*jslint evil: true */

/** @mixin
  @extends Greenhouse
  @author Mike Ball
  @author Evin Grano
  @version RC1
  @since RC1
*/
Greenhouse.mixin( /** @scope Greenhouse */{
  
  inspectorStates: SC.State.design({
    initialSubstate: 'inspectorClosed',
    
    inspectorClosed: SC.State.design({

      parallelStatechart: 'inspector',

      // ..........................................................
      // Events
      //
      openInspector: function openInspector(anchor){
        if(anchor) Greenhouse.setPath('inspectorStates.openInspectorPicker.anchor', anchor);
        this.gotoState('openInspectorPicker');
      },

      toggleDockedInspector: function toggleDockedInspector(){
        this.gotoState('dockedInspector');
      },

      floatInspector: function floatInspector(){
        this.gotoState('inspectorPalette');
      }
    }),

    openInspectorPicker: SC.State.design({
      parallelStatechart: 'inspector',

      enterState: function enterState(){
        var ap = Greenhouse.appPage;
        var picker = ap.get('inspectorPicker'),
            pickerContentView = ap.get('inspectorPickerContentView');
        var anchor = this.get('anchor') || ap.getPath('mainView.toolBar.inspector');

        pickerContentView.setIfChanged('nowShowing', 'Greenhouse.appPage.inspectorContentView');
        picker.popup(anchor, SC.PICKER_POINTER);
        picker.becomeFirstResponder();
      },
      exitState: function exitState(){
        var ap = Greenhouse.appPage; 
        var picker = ap.get('inspectorPicker'),
            pickerContentView = ap.get('inspectorPickerContentView');
        pickerContentView.setIfChanged('nowShowing', null);
        picker.remove();
        this.set('anchor', null);
      },

      // ..........................................................
      // Events
      //
      cancel: function cancel(){
        this.gotoState('inspectorClosed');
      },

      floatInspector: function floatInspector(){
        this.gotoState('inspectorPalette');
      },

      toggleDockedInspector: function toggleDockedInspector(){
        this.gotoState('dockedInspector');
      }
    }),

    inspectorPalette: SC.State.design({
      parallelStatechart: 'inspector',

      enterState: function enterState(){
        var ap = Greenhouse.appPage; 
        var picker = ap.get('inspectorPicker'),
            pickerContentView = ap.get('inspectorPickerContentView');

        pickerContentView.setIfChanged('nowShowing', 'Greenhouse.appPage.inspectorContentView');
        picker.append();
        picker.set('isModal', NO);
        picker.set('isAnchored', NO);
        picker.$().toggleClass('sc-picker', NO);
        var content = ap.getPath('inspectorContentView.content'),
            toolbar = ap.getPath('inspectorContentView.toolbar');

        content.adjust('top', 28);    
        toolbar.set('isVisible', YES); 
      },
      exitState: function exitState(){
        var ap = Greenhouse.appPage; 
        var picker = ap.get('inspectorPicker'),
            pickerContentView = ap.get('inspectorPickerContentView');

        pickerContentView.setIfChanged('nowShowing', null);
        picker.set('isModal', YES);
        picker.set('isAnchored', YES);
        picker.remove();

        var content = ap.getPath('inspectorContentView.content'),
            toolbar = ap.getPath('inspectorContentView.toolbar');

        content.adjust('top', 0);    
        toolbar.set('isVisible', NO);
      },

      // ..........................................................
      // Events
      //
      closeInspector: function closeInspector(){
        this.gotoState('inspectorClosed');
      },

      toggleDockedInspector: function toggleDockedInspector(){
        this.gotoState('dockedInspector');
      }
    }),

    dockedInspector: SC.State.design({
      parallelStatechart: 'inspector',

      enterState: function enterState(){
        var iDock = Greenhouse.appPage.get('inspectorDockView');
        iDock.setIfChanged('nowShowing', 'Greenhouse.appPage.inspectorContentView');
      },
      exitState: function exitState(){
        var iDock = Greenhouse.appPage.get('inspectorDockView');
        iDock.setIfChanged('nowShowing', null);
      },

      // ..........................................................
      // Events
      //
      toggleDockedInspector: function toggleDockedInspector(){
        var states = Greenhouse.get('currentStates') || [];
        if (states.indexOf(Greenhouse.getState('dockedLibrary'))) Greenhouse.sendEvent('undock');
        this.gotoState('inspectorClosed');
      }
    })
  })
  
  

});
