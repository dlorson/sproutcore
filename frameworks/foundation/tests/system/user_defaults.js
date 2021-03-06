// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================
// ========================================================================
// SC.UserDefaults Base Tests
// ========================================================================
/*globals module test ok isObj equals expects */

var obj; //global variables

module("User Defaults",{
 	   
 	  setup: function setup(){
 	   
 	   obj = SC.Object.create({
 		   bck : 'green'
 	    }); 	
 	}
});



test("To check if the user defaults are stored and read from local storage",function(){
    SC.userDefaults.writeDefault('Back',obj.bck);
    equals(SC.userDefaults.readDefault('Back'), obj.bck, 'should read written property');
});

