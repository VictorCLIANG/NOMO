/*
 *
 *
 */

function NavigationBar(win_id) {

	//var cur_win_id = this.parent.id;
	
	var self = Ti.UI.createView({
		id : 'navBar',
		height : '10%',
		backgroundColor : '#424240',
		borderColor : 'black'
	});
	
	var userId= Ti.App.cur_userId;
	
	var leftBtnContainer = Ti.UI.createView({
		left : 0,
		width : '20%'
	});

	var rightBtnContainer = Ti.UI.createView({
		right : 0,
		width : '20%'
	});
	
	var logoImg = Ti.UI.createImageView({
			image : '/images/nomo_logo@2x.png',
			height : '30%'
		});
	
	var backBtnContainer = Ti.UI.createView({
		left:0
	});
	
	var backBtnLabel = Ti.UI.createLabel({
		text:'Back',
		font : {
			fontSize : '20dp'
		},
		color:'#5dc2d6'
		
	});
	
	backBtnContainer.add(backBtnLabel);
	
	if (win_id == 'plansWin') {

		var menuBtn = Ti.UI.createImageView({
			left : 0,
			image : '/images/nav_ic_menu@2x.png'
		});

		var addBtn = Ti.UI.createImageView({
			right : 0,
			image : '/images/nav_ic_add@2x.png'
		});
		
		addBtn.addEventListener('click', function() {

			//Ti.API.log("CurrentWindow : " + cur_win_id);
			//console.log(mainView[0]);

			var AddPlan = require('ui/common/AddPlan');
			var newPlan = new AddPlan(userId);
			 
			 newPlan.open();
			 
		});
		
		leftBtnContainer.add(menuBtn);
		rightBtnContainer.add(addBtn);

	}else if(win_id == 'addFriendWin'){
		
		backBtnLabel.setText('Cancel');
		leftBtnContainer.add(backBtnContainer);
		backBtnContainer.addEventListener('click',function(){
		var cur_win = self.parent;
		cur_win.close();
		});
		
	}else{
		leftBtnContainer.add(backBtnContainer);
		backBtnContainer.addEventListener('click',function(){
		var cur_win = self.parent;
		cur_win.close();
		});
	}

	self.add(leftBtnContainer);
	self.add(logoImg);
	self.add(rightBtnContainer);

	return self;
}

module.exports = NavigationBar;
