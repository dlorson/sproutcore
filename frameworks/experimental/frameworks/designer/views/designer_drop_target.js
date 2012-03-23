// ==========================================================================
// Project:   SC - designPage
// Copyright: ©2010 Mike Ball
// ==========================================================================
/*globals SC */
/*jslint evil: true*/
/** 
  @class
  This View is used by Greenhouse when application is in design mode
  
  
  @extends SC.ContainerView
*/
SC.DesignerDropTarget = SC.ContainerView.extend(
  /** @scope SC.DesignerDropTarget.prototype */ {
  
  inGlobalOffset: YES,
  
  // ..........................................................
  // Key Events
  // 
  acceptsFirstResponder: YES,
  
  keyDown: function keyDown(evt) {
    return this.interpretKeyEvents(evt);
  },
  
  keyUp: function keyUp(evt) {
    return YES; 
  },
  
  deleteForward: function deleteForward(evt){
    var c = SC.designsController.getPath('page.designController');
    if(c) c.deleteSelection();
    return YES;
  },
  
  deleteBackward: function deleteBackward(evt){
    var c = SC.designsController.getPath('page.designController');
    if(c) c.deleteSelection();
    return YES;
  },

  moveLeft: function moveLeft(sender, evt) {
    return YES;
  },
  
  moveRight: function moveRight(sender, evt) {   
    return YES;
  },
  
  moveUp: function moveUp(sender, evt) {
    return YES;
  },
  
  moveDown: function moveDown(sender, evt) {
    return YES;
  },

  // ..........................................................
  // Drag and drop code
  // 
  isDropTarget: YES,
  
  targetIsInIFrame: YES,
  
  dragStarted: function dragStarted(drag, evt) {
  },
  
  dragEntered: function dragEntered(drag, evt) {
  },
  
  dragUpdated: function dragUpdated(drag, evt) {},
  
  dragExited: function dragExited(drag, evt) {},
  
  dragEnded: function dragEnded(drag, evt) {},
  

  computeDragOperations: function computeDragOperations(drag, evt) { 
    return SC.DRAG_ANY; 
  },
  

  acceptDragOperation: function acceptDragOperation(drag, op) { 
    var data = drag.dataForType('SC.Object'),
        scClass = eval(data.get('scClass'));
    return scClass.kindOf(SC.View);
  },
  
  /**
    Called to actually perform the drag operation.
    
    Override this method to actually perform the drag operation.  This method
    is only called if you returned `YES` in `acceptDragOperation()`.
    
    Return the operation that was actually performed or `SC.DRAG_NONE` if the
    operation was aborted.
    
    The default implementation returns `SC.DRAG_NONE`
    
    @param {SC.Drag} drag The drag instance managing this drag
    @param {DragOp} op The proposed drag operation. A drag constant.
    
    @return {DragOp} Drag Operation actually performed
  */
  performDragOperation: function performDragOperation(drag, op) {
    var data = drag.dataForType('SC.Object'),
        cv = this.get('contentView'),
        loc = drag.get('location'),
        iframeOffset = drag.globalTargetOffset,
        design, size, newView, defaults, layout;
    var page = cv.get('page');
    var designController = page.get('designController'),
        rootDesigner = designController.get('rootDesigner');
    var rootDesignerFrame = rootDesigner.get('frame');
    //TODO: [MB] should we move most of this into the designer's addView?
    //size and location
    size = data.get('size');
    loc.x = loc.x - iframeOffset.x - rootDesignerFrame.x;
    loc.y = loc.y - iframeOffset.y - rootDesignerFrame.y;
    //setup design (use eval to make sure code comes from iframe)
    //TODO use new Function("return "+data.get('scClass))() ?...
    design = eval(data.get('scClass'));
    defaults = data.get('defaults') || {};
    layout = defaults.layout || {};
    layout = SC.merge(layout, {top: loc.y, left: loc.x});
    //pull width and height from ghost if none exists form defaults
    if(!layout.width) layout.width = drag.getPath('ghostView.layout').width;
    if(!layout.height) layout.height = drag.getPath('ghostView.layout').height;
    defaults.layout = layout;
    design = design.design(defaults);
    //drop it in the root designer
    newView = design.create({page: page});
    if(rootDesigner && newView){
      rootDesigner.addView(newView);
      //cv.appendChild(newView);
    }
    page.get('designController').select(newView.get('designer'));
    return SC.DRAG_ANY; 
  }
  
  
});
