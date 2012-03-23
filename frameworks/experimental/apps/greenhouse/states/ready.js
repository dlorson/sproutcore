// ==========================================================================
// Project:   Greenhouse
// Copyright: ©2010 Mike Ball
// ==========================================================================
/*globals Greenhouse js_beautify*/
/** @mixin
  @extends Greenhouse
  @author Mike Ball
  @author Evin Grano
  @version RC1
  @since RC1
*/
Greenhouse.mixin( /** @scope Greenhouse */{
  // ..........................................................
  // Ready States
  // 
  readyStates: SC.State.design({
    initialSubstate: 'readyWaiting',
    
    
    enterState: function enterState(){
      console.log('greenhouse has landed');
      var c = Greenhouse.getPath('mainPage.mainPane.container');
      c.set('nowShowing', Greenhouse.getPath('appPage.mainView'));
    },
    exitState: function exitState(){

    },

    // ..........................................................
    //  Events
    // 
    run: function run(){
      var target = Greenhouse.targetController.get('name');
      window.open(target, "","");
    },

    selectFile: function selectFile(){
      var c = Greenhouse.fileController.get('content');
      if(c) {
        c.refresh();
        this.gotoState('gettingFile');
      }
    },

    unselectFile: function unselectFile(){
     // TODO: [EG, MB] add the action for unselecting 
     this.gotoState('readyWaiting');
    },

    reloadIframe: function reloadIframe(){
      Greenhouse.filesController.set('selection', null);
      Greenhouse.gettingFile._firstTime = YES;

      Greenhouse.iframe.location.reload();
      this.gotoState('iframeLoading');
    },

    resizePage: function resizePage(sender){
      var s = sender.getPath('content.size'),
          def = {top: 20, left: 20, right: 20, bottom: 83},
          iframe = Greenhouse.get('iframe'),
          view;


      view = iframe.SC.designPage.getPath('designMainPane.container');

      if(!s){
        view.set('classNames', ['design']);
        view.set('layout', def);
      }
      else{
        view.set('classNames', []);
        view.set('layout', SC.merge({centerX:0, centerY: 0}, s));
      }
      // ..........................................................
      // Wait for the view to re-draw and update the webViewFrame
      // 
      SC.run(function(){
        var dropViewFrame,
          webView = Greenhouse.appPage.get('webView'),
          pv = webView.get('parentView'),
          webViewFrame = webView.get('frame');
          console.log(webViewFrame);
          
          webViewFrame = pv.convertFrameToView(webViewFrame, null);
          
          console.log(webViewFrame);
          //add the drop container to the adjusted layout
          pv = view.get('parentView');
          dropViewFrame = pv.convertFrameToView(view.get('frame'), null);
          if(dropViewFrame){
            webViewFrame.x += dropViewFrame.x;
            webViewFrame.y += dropViewFrame.y;
          }
          console.log(Greenhouse._webViewFrame);
          //update 
          Greenhouse._webViewFrame = webViewFrame;
          console.log(Greenhouse._webViewFrame);
      });

    },
    // ..........................................................
    // Ready substates
    // 
    readyWaiting: SC.State.design({
    }),

    gettingFile: SC.State.design({

      init: function init(){
        sc_super();
        this._firstTime = YES;
      },

      enterState: function enterState(){
        //TODO draw spinner
      },
      exitState: function exitState(){
      },

      fileSelectedIsAPage: function fileSelectedIsAPage(){
        Greenhouse.loadIframeWithPage(this._firstTime);
        this._firstTime = NO;
        this.gotoHistoryState('pageSelected');
      },

      fileSelectedIsNotAPage: function fileSelectedIsNotAPage(){
        this.gotoState('fileSelected');
      }
    }),

    fileSelected: SC.State.design({

      enterState: function enterState(){
        //TODO: draw message saying we can't do anything with this right now...
      },
      exitState: function exitState(){}
    }),

    pageSelected: SC.State.design({

      parentState: 'ready',
      initialSubstate: 'noDock',

      enterState: function enterState(){},
      exitState: function exitState(){},

      // ..........................................................
      // Events
      // 
      save: function save(){
        var designPage, content = Greenhouse.fileController.get('content');
        designPage = Greenhouse.iframe.SC.designsController.get('page');
        //check if this page has a name...
        designPage.setPath('designController.selection', null);
        if(!designPage.get('pageName')) designPage.set('pageName', content.get('pageName'));
        designPage = designPage.emitDesign();
        content.set('body', js_beautify(designPage));
        content.commitRecord(); 
      },
      addProperty: function addProperty(){
        var designer = Greenhouse.designController.get('content');

        if(designer){
          this._propertyCount = this._propertyCount ? this._propertyCount+1 : 1;
          designer.designProperties.pushObject("newProperty"+this._propertyCount); //TODO: generate better name....
          designer.propertyDidChange('editableProperties');
        }
      },
      deleteProperty: function deleteProperty(){
        var prop = Greenhouse.propertyController.get('content'),
            designer = Greenhouse.designController.get('content'),
            view;
        if(prop && designer){
          view = prop.view;
          view[prop.view] = undefined;
          delete view[prop.key]; //FIXME: [MB] this isn't removing the property...
          designer.designProperties.removeObject(prop.key);
          view.propertyDidChange(prop.key);
          if(view.displayDidChange) view.displayDidChange();
          designer.propertyDidChange('editableProperties');
        }
      },
      // ..........................................................
      // pageSelected substates
      // 
       noDock: SC.State.design({
         parentState: 'pageSelected',

         enterState: function enterState(){
           var dock = Greenhouse.appPage.get('dockView');
           dock.set('layout', {top: 0, bottom: 0, right: 0, width: 0});
           var design = Greenhouse.appPage.get('designAreaView');
           design.set('layout', {top: 0, bottom: 0, right: 0, left: 0});
         },
         exitState: function exitState(){

         },

         // ..........................................................
         // Events
         //
         toggleDockedLibrary: function toggleDockedLibrary(){
           this.gotoState('docked');
         },

         toggleDockedInspector: function toggleDockedInspector(){
           this.gotoState('docked');
         }
       }),

       docked: SC.State.design({
         parentState: 'pageSelected',

         enterState: function enterState(){
           var dock = Greenhouse.appPage.get('dockView');
           dock.set('layout', {top: 0, bottom: 0, right: 0, width: 230});
           var design = Greenhouse.appPage.get('designAreaView');
           design.set('layout', {top: 0, left: 0, right: 230, bottom: 0});
         },
         exitState: function exitState(){

         },

         // ..........................................................
         // Events
         //
         undock: function undock(){
           this.gotoState('noDock');
         }
      })
    })
  })  
});
