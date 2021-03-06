/*
 * 
 * 
 */

function NavigationBar (){
	
	var cur_win = Ti.UI.getCurrentWindow;
	
	var self = Ti.UI.createView({
		id:'navBar',
		height:'10%',
		backgroundColor:'#424240',
		borderColor:'black'
	});
	
	var leftBtnContainer = Ti.UI.createView({
		left:0,
		width:'20%'
	});
		
	var rightBtnContainer = Ti.UI.createView({
		right:0,
		width:'20%'
	});
	
	var logoImg = Ti.UI.createImageView({
		image:'/images/nomo_logo@2x.png',
		height:'30%'
	});
	
	var menuBtn = Ti.UI.createImageView({
		left:0,
		image:'/images/nav_ic_menu@2x.png'
	});

	
	var addBtn = Ti.UI.createImageView({
		right:0,
		image:'/images/nav_ic_add@2x.png'
	});
	
	addBtn.addEventListener('click',function(){
		var parentView = self.getParent();
		var childViews = parentView.getChildren(1);
		var mainViewGroup = childViews[1].getChildren();
		var mainView = mainViewGroup[1];
		mainView.removeAllChildren();
		
		var newAddPlans = require('ui/common/AddPlan');
		var addPlan = new newAddPlans();
		
		mainView.add(addPlan);
		
		//var cur_View = mainView.getChildren();
		//console.log(mainView[0]);
		
		/*var AddPlan = require('ui/common/AddPlan');
		var newPlan = new AddPlan(userId);
			
		parentView.remove(self);
		parentView.add(newPlan);
		*/
	});
	
	self.add(leftBtnContainer);
	self.add(logoImg);
	self.add(rightBtnContainer);
	
	leftBtnContainer.add(menuBtn);
	rightBtnContainer.add(addBtn);
	return self;
}
module.exports = NavigationBar;
