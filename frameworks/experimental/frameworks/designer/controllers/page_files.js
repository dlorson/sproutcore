// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================
// ==========================================================================
// Project:   SC.pageFilesController
// ==========================================================================
/*globals SC */

/** @class

  in `suppressMain` mode all page files register with this array controller

  @extends SC.Object
*/
SC.pageFilesController = SC.ArrayController.create(
/** @scope SC.pageFilesController.prototype */ {
  
}) ;
SC.pageFilesController.mixin({
  pages: [],
  
  register: function register(page){
    SC.pageFilesController.pages.pushObject(page);
  }
});