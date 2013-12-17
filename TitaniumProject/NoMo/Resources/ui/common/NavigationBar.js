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

	var userId = Ti.App.cur_userId;

	var leftBtnContainer = Ti.UI.createView({
		left : 0,
		width : '30%'
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
		left : 0
	});

	var backBtnImage = Ti.UI.createImageView({
		left : '3dp',
		image : '/images/arrow_back@2x.png',
		height : '70%'
	});

	/*
	 var backBtnLabel = Ti.UI.createLabel({
	 textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	 text : 'Back',
	 left : '18dp',
	 font : {
	 fontSize : '20dp'
	 },
	 color : '#5dc2d6'
	 });
	 */

	var doneBtnLabel = Ti.UI.createLabel({
		text : 'Done',
		right : '10dp',
		font : {
			fontSize : '20dp'
		},
		color : '#5dc2d6'
	});

	backBtnContainer.add(backBtnImage);
	//backBtnContainer.add(backBtnLabel);

	if (win_id == 'plansWin') {//---------------------Navigation Setup for Plans Window-----------------------------
		//var cur_win = self.parent;
		
		var menuBtn = Ti.UI.createImageView({
			left : 0,
			image : '/images/nav_ic_menu@2x.png'
		});

		var addBtn = Ti.UI.createImageView({
			right : 0,
			image : '/images/nav_ic_add@2x.png'
		});

		menuBtn.addEventListener('click', function() {
			var menuObj = self.parent.children[1].children[0];
			if (menuObj.toggle == false) {
				menuObj.setLeft('0%');
				menuObj.toggle = true;
			} else {
				menuObj.setLeft('-40%');
				menuObj.toggle = false;
			}
		});

		addBtn.addEventListener('click', function() {

			//Ti.API.log("CurrentWindow : " + cur_win_id);
			//console.log(mainView[0]);

			var AddPlanWindow = Ti.UI.createWindow({
				id : 'AddPlanWin',
				modal : true,
				navBarHidden : true,
				backgroundColor : '#f7f7f7',
				url : 'AddPlan.js',
				layout : 'vertical'
			});
			
			AddPlanWindow.open();

		});

		leftBtnContainer.add(menuBtn);
		rightBtnContainer.add(addBtn);

	} else if (win_id == 'addFriendWin_empty') {//--------------Navigation bar Setup for Add friends window when its empty---------------------------

		rightBtnContainer.add(doneBtnLabel);
		doneBtnLabel.addEventListener('click', function() {

			var planWindow = Ti.UI.createWindow({
				id : 'plansWin',
				url : 'ui/common/Plan.js',
				modal : true,
				//fullscreen:true,
				navBarHidden : true,
				layout : 'vertical',
				userId : userId,
				backgroundColor : '#f7f7f7'
			});

			planWindow.open();
			
			var cur_win = self.parent;
			
			cur_win.close();

		});

	} else if (win_id == 'addFriendWin') {
		var cur_win = self.parent;
		
		leftBtnContainer.add(backBtnContainer);

		rightBtnContainer.add(doneBtnLabel);
		doneBtnLabel.addEventListener('click', function() {
			cur_win.close();
		});
	} else if ( win_id == 'FriendListWin') {//---------------------Navigation Bar setup for FriendList window---------------------
		var cur_win = self.parent;
		
		var menuBtn = Ti.UI.createImageView({
			left : 0,
			image : '/images/nav_ic_menu@2x.png'
		});

		menuBtn.addEventListener('click', function() {
			var menuObj = self.parent.children[1].children[0];
			if (menuObj.toggle == false) {
				menuObj.setLeft('0%');
				menuObj.toggle = true;
			} else {
				menuObj.setLeft('-40%');
				menuObj.toggle = false;
			}
		});

		var addBtn = Ti.UI.createImageView({
			right : 0,
			image : '/images/nav_ic_add_friend@2x.png'
		});

		addBtn.addEventListener('click', function() {

			var AddFriendWindow = Ti.UI.createWindow({
				id : 'addfriendWin',
				layout : 'vertical',
				backgroundColor : '#f7f7f7',
				navBarHidden : true,
				modal : true,
				url : 'AddFriend.js',
				//fromList : true,
				userId : userId
			});
			AddFriendWindow.open();

		});

		leftBtnContainer.add(menuBtn);
		rightBtnContainer.add(addBtn);

	} else if(win_id == 'addPlanWin') {//-------------------Default Setup with back button
		leftBtnContainer.add(backBtnContainer);

	}else {//-------------------Default Setup with back button
		leftBtnContainer.add(backBtnContainer);

	}

	backBtnContainer.addEventListener('click', function() {
		self.parent.close();
	});

	self.add(leftBtnContainer);
	self.add(logoImg);
	self.add(rightBtnContainer);
	
	Ti.API.log(win_id);

	return self;
}

module.exports = NavigationBar;
