 
function Main (userId){
	var cur_userId= userId;
	var self = Ti.UI.createWindow({
		id:'mainWindow',
		orientationModes:'PORTRAIT',
		layout:'vertical',
		backgroundColor:'#f7f7f7'
	});
	
	// load navigation bar
	var navbar = require('ui/common/NavigationBar');
	var navigationBar = new navbar();

	//alert(cur_userId);
	
	self.add(navigationBar);
	
	// load menu bar
	var menu = require('ui/common/Menu');
	var menu_obj = new menu();
	
	// Creating View Structure
	var mainViewGroup = Ti.UI.createView({
		layout:'horizontal'
	});
	
	var mainView = Ti.UI.createView({
		id:'mainView',
		backgroundColor:'#f7f7f7'
	});
	
		
	// load Friends View
	var friendsLists = require('ui/common/FriendList');
	var friendsList = new friendsLists(userId);
	
	// load plan View
	var plans = require('ui/common/Plan');
	var plan = new plans(userId);
	
	
	mainView.addEventListener('swipe', function(e){
		if(e.direction=='right'){
			menu_obj.left = 0; // with no animation
			mainView.left = '40%';
		}
		
		if (e.direction == 'left'){
			menu_obj.left = '-40%';
			mainView.left = 0;
		}
	});
	
	mainView.add(friendsList);
	//mainView.add(plan);
	mainViewGroup.add(menu_obj);
	mainViewGroup.add(mainView);
	self.add(mainViewGroup);
	
	return self;
	
}
module.exports = Main;
