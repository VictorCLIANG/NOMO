/*
 *
 *
 */

function Menu() {

	var cur_win = Ti.UI.getCurrentWindow;

	var self = Ti.UI.createView({
		id : 'menu',
		zIndex:1,
		left : '-40%',
		width : '40%',
		layout : 'vertical',
		backgroundColor : '#424240',
		toggle:false
	});

	// Menu Titles
	var planBtn= Ti.UI.createView({
		height:'10%'
	});
	
	var planLabel=Ti.UI.createLabel({
		left:'10dp',
		text:'Plan',
		color:'white'
	});
	
	planBtn.add(planLabel);
	
	//-------------------------------
	var friendBtn= Ti.UI.createView({
		height:'10%'	
	});
	
	var friendLabel=Ti.UI.createLabel({
		left:'10dp',
		text:'My Friends',
		color:'white'
	});
	
	friendBtn.add(friendLabel);
	//-----------------------------
	var myPlanBtn= Ti.UI.createView({
		height:'10%'
	});
	
	var myPlanLabel=Ti.UI.createLabel({
		left:'10dp',
		text:'My Plans',
		color:'white'
	});
	
	myPlanBtn.add(myPlanLabel);
	//---------------------------------
	
	var logOutBtn= Ti.UI.createView({
		height:'10%'
	});

	var logOutLabel=Ti.UI.createLabel({
		left:'10dp',
		text:'Log Out',
		color:'white'
	});
	
	logOutBtn.add(logOutLabel);
	
	self.add(planBtn);
	self.add(friendBtn);
	self.add(myPlanBtn);
	self.add(logOutBtn);
	
	friendBtn.addEventListener('click',function(){
		
		var FriendWindow = Ti.UI.createWindow({
			id : 'friendListWin',
			layout : 'vertical',
			backgroundColor : '#f7f7f7',
			navBarHidden : true,
			modal : true,
			url : 'FriendList.js',
			userId : Ti.App.cur_userId
		});
		
		FriendWindow.open();
	});
	
	
	return self;
}

module.exports = Menu;
