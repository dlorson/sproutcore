// ==========================================================================
// Project:   Greenhouse
// Copyright: ©2010Mike Ball
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
  
  libraryStates: SC.State.design({
    initialSubstate: 'libraryClosed',
    
    libraryClosed: SC.State.design({
      parallelStatechart: 'library',

      // ..........................................................
      // Events
      //
      openLibrary: function openLibrary(){
        this.gotoState('openLibraryPicker');
      },

      toggleDockedLibrary: function toggleDockedLibrary(){
        this.gotoState('dockedLibrary');
      }
    }),

    openLibraryPicker: SC.State.design({

      parallelStatechart: 'library',

      enterState: function enterState(){
        var picker = Greenhouse.appPage.get('libraryPicker'),
            button = Greenhouse.appPage.getPath('mainView.toolBar.library'),
            pickerContentView = Greenhouse.appPage.get('libraryPickerContentView');

        pickerContentView.setIfChanged('nowShowing', 'Greenhouse.appPage.libraryContentView');
        picker.popup(button, SC.PICKER_POINTER);
        picker.becomeFirstResponder();
      },

      exitState: function exitState(){
        var picker = Greenhouse.appPage.get('libraryPicker'),
            pickerContentView = Greenhouse.appPage.get('libraryPickerContentView');
        pickerContentView.setIfChanged('nowShowing', null);
        picker.remove();
      },

      cancel: function cancel(){
        this.gotoState('libraryClosed');
      },

      floatLibrary: function floatLibrary(){
        this.gotoState('libraryPalette');
      },

      toggleDockedLibrary: function toggleDockedLibrary(){
        this.gotoState('dockedLibrary');
      }
    }),

    libraryPalette: SC.State.design({
      parallelStatechart: 'library',

      enterState: function enterState(){
        var ap = Greenhouse.appPage;
        var picker = ap.get('libraryPicker'),
            pickerContentView = ap.get('libraryPickerContentView');

        pickerContentView.setIfChanged('nowShowing', 'Greenhouse.appPage.libraryContentView');
        picker.append();
        picker.set('isModal', NO);
        picker.set('isAnchored', NO);
        picker.$().toggleClass('sc-picker', NO);
        var content = ap.getPath('libraryContentView.content'),
            toolbar = ap.getPath('libraryContentView.toolbar');

        content.adjust('top', 49);    
        toolbar.set('isVisible', YES); 
      },
      exitState: function exitState(){
        var ap = Greenhouse.appPage;
        var picker = ap.get('libraryPicker'),
            pickerContentView = ap.get('libraryPickerContentView');

        pickerContentView.setIfChanged('nowShowing', null);
        picker.set('isModal', YES);
        picker.set('isAnchored', YES);
        picker.remove();

        var content = ap.getPath('libraryContentView.content'),
            toolbar = ap.getPath('libraryContentView.toolbar');

        content.adjust('top', 49);    
        toolbar.set('isVisible', NO);
      },

      closeLibrary: function closeLibrary(){
        this.gotoState('libraryClosed');
      },

      toggleDockedLibrary: function toggleDockedLibrary(){
        this.gotoState('dockedLibrary');
      }
    }),

    dockedLibrary: SC.State.design({

      parallelStatechart: 'library',

      enterState: function enterState(){
        var libDock = Greenhouse.appPage.get('libraryDockView');
        libDock.setIfChanged('nowShowing', 'Greenhouse.appPage.libraryContentView');
      },
      exitState: function exitState(){
        var libDock = Greenhouse.appPage.get('libraryDockView');
        libDock.setIfChanged('nowShowing', null);
      },

      // ..........................................................
      // Events
      //
      toggleDockedLibrary: function toggleDockedLibrary(){
        var states = Greenhouse.get('currentStates') || [];
        if (states.indexOf(Greenhouse.getState('dockedInspector'))) Greenhouse.sendEvent('undock');

        this.gotoState('libraryClosed');
      }
    })
    
    
  })
  
  
});
