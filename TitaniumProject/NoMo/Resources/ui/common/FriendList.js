Ti.UI.setBackgroundColor('#f7f7f7');

var friendList = null;

var self = Ti.UI.currentWindow;

self.id = 'FriendListWindow';

var getFriendListReq = Titanium.Network.createHTTPClient();
var getFriendRequestReq = Titanium.Network.createHTTPClient();

var userId = self.userId;

var NavigationBar = require('ui/common/NavigationBar');
var navBar = new NavigationBar('FriendListWin');

self.add(navBar);

//---------------------------------------

var MainContentContainer = Ti.UI.createView({
	horizontalWrap : false
	//layout : 'horizontal'
});

//-----------Menu -----------------------
var Menu = require('ui/common/Menu');
var menu = new Menu();

MainContentContainer.add(menu);

var tabContainer = Ti.UI.createView({
	layout : 'vertical',
});

MainContentContainer.add(tabContainer);

self.add(MainContentContainer);
//---------------------------------------

//------------------------------main Content
var tabView = Ti.UI.createView({
	height : '10%',
	layout : 'horizontal',
	borderWidth : 2,
	borderColor : '#5dc2d6'
});

var LeftBtn = Ti.UI.createLabel({
	height : '100%',
	width : '50%',
	font : {
		fontSize : '17dp'
	},
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	backgroundColor : "#5dc2d6",
	text : 'My Friend List',
	color : 'white'
});

var rightBtnContainer = Ti.UI.createView({
	height : '100%',
	width : '50%'
});

var rightBtn = Ti.UI.createLabel({
	height : '100%',
	width : '100%',
	font : {
		fontSize : '17dp'
	},
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	backgroundColor : 'white',
	text : 'Friend requests',
	color : '#5dc2d6'
});

var newNotificationLabel = Ti.UI.createLabel({
	visible : false,
	top : '8dp',
	left : '8dp',
	font : {
		fontSize : '10dp'
	},
	text : 'New!',
	color : '#5dc2d6'
});
//-------------event for RIGHT TAB BUTTON
rightBtnContainer.addEventListener('click', function() {
	Ti.API.log('rightBtnClicked');
	//---------- tab button display change
	rightBtn.setBackgroundColor('#5dc2d6');
	rightBtn.setColor('white');

	newNotificationLabel.setColor('white');

	LeftBtn.setBackgroundColor('white');
	LeftBtn.setColor('#5dc2d6');
	//

	getFriendRequestReq.open("GET", Ti.App.baseUrl + 'getrequesters');
	var getRequestReqParam = {
		friendId : Ti.App.cur_userId
	};
	getFriendRequestReq.send(getRequestReqParam);

	tabContainer.remove(flist);
	tabContainer.add(Rlist);

});
//-------------event for LEFT TAB BUTTON
LeftBtn.addEventListener('click', function() {
	Ti.API.log('leftBtnClicksed');
	//---------- tab button display change
	rightBtn.setBackgroundColor('white');
	rightBtn.setColor('#5dc2d6');

	newNotificationLabel.setColor('#5dc2d6');

	LeftBtn.setBackgroundColor('#5dc2d6');
	LeftBtn.setColor('white');
	//
	getFriendListReq.open("GET", Ti.App.baseUrl + 'getFriends');
	var getFriendsReqParam = {
		userId : Ti.App.cur_userId
	};
	getFriendListReq.send(getFriendsReqParam);

	tabContainer.remove(Rlist);
	tabContainer.add(flist);
});

rightBtnContainer.add(rightBtn);
rightBtnContainer.add(newNotificationLabel);

tabView.add(LeftBtn);
tabView.add(rightBtnContainer);

tabContainer.add(tabView);

var Rlist = Ti.UI.createTableView({
	id : 'RequestListView',
	layout : 'vertical'
});

var flist = Ti.UI.createTableView({
	id : 'FriendListView',
	layout : 'vertical'
});

var f_rowData;

tabContainer.add(flist);

//------------define APi--------------------
//------get friend list Req ---------------

getFriendListReq.onload = function() {

	Ti.API.log('get Friend List request onLoad');

	var f_data = [];

	f_rowData = [];

	var json = this.responseText;
	f_data = JSON.parse(json);

	Ti.API.log(json);
	if (json === "[]") {
		Ti.API.log("empty");
		var label = Ti.UI.createLabel({
			left : 0,
			font : {
				fontSize : '20dp'
			},
			color : 'black',
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
			text : 'No requests Found'
		});

		var row = Ti.UI.createView({
			//top : '5%',
			//bottom : '5%',
			left : '5%',
			right : '5%',
			height : '50dp'
		});

		var rowContainer = Ti.UI.createTableViewRow({
			layout : 'horizontal'
		});

		row.add(label);
		rowContainer.add(row);
		f_rowData.push(rowContainer);

	} else {
		for (var i = 0; i < f_data.length; i++) {
			Ti.API.log("ID:" + f_data.ID);
			var name = Ti.UI.createLabel({
				left : 0,
				font : {
					fontSize : '20dp'
				},
				color : 'black',
				textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
				text : f_data[i].FirstName + " " + f_data[i].LastName
			});

			var dLable = Ti.UI.createLabel({
				text : 'Delete',
				font : {
					fontSize : '15dp'
				},
				color : 'white'
			});

			var dbtn = Ti.UI.createView({
				height : '100%',
				width : '30%',
				backgroundColor : '#5dc2d6',
				right : 0,
				clickItem : 'deleteBtn',
				fid : f_data[i].ID,
				visible : false
			});

			dbtn.add(dLable);

			var row = Ti.UI.createView({
				//top : '5%',
				//bottom : '5%',
				left : '5%',
				//right : '5%',
				clickItem : 'row',
				height : '50dp'
			});

			row.add(name);
			row.add(dbtn);

			var rowContainer = Ti.UI.createTableViewRow({
				layout : 'horizontal'
			});

			rowContainer.add(row);
			//rowContainer.add(dbtn);

			f_rowData.push(rowContainer);
		}

	}

	flist.setData(f_rowData);
};

getFriendListReq.onerror = function() {
	alert("Failed to connect to the server");
};

//----------get friend request list------------

getFriendRequestReq.onload = function() {

	Ti.API.log('get Friend requests Request onLoad');

	var r_data = [];

	var r_rowData = [];

	var json = this.responseText;
	r_data = JSON.parse(json);

	Ti.API.log(json);

	if (json === "[]") {

		var label = Ti.UI.createLabel({
			left : 0,
			font : {
				fontSize : '20dp'
			},
			color : 'black',
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
			text : 'No requests Found'
		});

		var row = Ti.UI.createView({
			//top : '5%',
			//bottom : '5%',
			left : '5%',
			right : '5%',
			height : '50dp'
		});

		var rowContainer = Ti.UI.createTableViewRow({
			layout : 'horizontal'
		});

		row.add(label);
		rowContainer.add(row);
		r_rowData.push(rowContainer);
		newNotificationLabel.hide();

	} else {
		//----------Request List --------------------
		for (var i = 0; i < r_data.length; i++) {

			var name = Ti.UI.createLabel({
				left : 0,
				font : {
					fontSize : '20dp'
				},
				color : 'black',
				textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
				text : r_data[i].FirstName + " " + r_data[i].LastName
			});

			var row = Ti.UI.createView({
				//top : '5%',
				//bottom : '5%',
				left : '5%',
				right : '5%',
				height : '50dp'
			});

			var buttonContainer = Ti.UI.createView({
				width : '30%',
				right : 0
			});

			var acceptBtn = Ti.UI.createImageView({
				left : 0,
				image : '/images/request_accept@2x.png',
				height : '30dp',
				id : r_data[i].ID,
				clickItem : 'accept'
			});

			var declineBtn = Ti.UI.createImageView({
				right : 0,
				image : '/images/request_decline@2x.png',
				height : '30dp',
				id : r_data[i].ID,
				clickItem : 'decline'
			});

			buttonContainer.add(acceptBtn);
			buttonContainer.add(declineBtn);

			row.add(name);
			row.add(buttonContainer);
			//-------------------------------------

			var rowContainer = Ti.UI.createTableViewRow({
				layout : 'horizontal'
			});

			Ti.API.log("name: " + r_data[i].FirstName + " " + r_data[i].LastName);

			rowContainer.add(row);

			r_rowData.push(rowContainer);
		}
		newNotificationLabel.show();
	}

	Rlist.setData(r_rowData);
};

getFriendRequestReq.onerror = function() {
	alert("Failed to connect to the server");
};

//----------Accept friends Requests-----------

var acceptReq = Titanium.Network.createHTTPClient();

acceptReq.onload = function() {
};

acceptReq.onerror = function() {
	alert("Failed to connect to the server");
};
//----------Decline friends Requests----------

var declineReq = Titanium.Network.createHTTPClient();

declineReq.onload = function() {
};

declineReq.onerror = function() {
	alert("Failed to connect to the server");
};
//----------Remove Friend request--------------

var removeFriendReq = Titanium.Network.createHTTPClient();

removeFriendReq.onload = function() {
};

removeFriendReq.onerror = function() {
	alert("Failed to connect to the server");
};

//------EVENT LISTENERs----------------
Rlist.addEventListener('click', function(e) {
	Ti.API.log("Row Number:" + e.index);
	var rowIndex = e.index;
	var clickedItem = e.source.clickItem;
	var friendId = e.source.id;

	Ti.API.log("friendId:" + friendId);
	Ti.API.log("UserId:" + Ti.App.cur_userId);

	Ti.API.log("Clicked On:" + clickedItem);

	if (clickedItem == 'accept') {

		var confirm = Titanium.UI.createAlertDialog({
			title : 'Accept',
			message : 'Are you sure you want to accept request?',
			buttonNames : ['Yes', 'No'],
			cancel : 1
		});

		confirm.addEventListener('click', function(e1) {
			if (e1.cancel === e1.index || e1.cancel === true) {
				return false;
			}
			if (e1.index === 0) {
				acceptReq.open("GET", Ti.App.baseUrl + 'ApproveFriendRequest');
				var acceptReqParam = {
					userId : friendId,
					friendId : Ti.App.cur_userId
				};
				acceptReq.send(acceptReqParam);
				//r_data.splice(rowIndex, 1);
				Rlist.deleteRow(rowIndex);
			}
		});
		confirm.show();

	} else if (clickedItem == 'decline') {

		var confirm = Titanium.UI.createAlertDialog({
			title : 'Decline',
			message : 'Are you sure you want to ignore request?',
			buttonNames : ['Yes', 'No'],
			cancel : 1
		});

		confirm.addEventListener('click', function(e1) {
			if (e1.cancel === e1.index || e1.cancel === true) {
				return false;
			}
			if (e1.index === 0) {
				declineReq.open("GET", Ti.App.baseUrl + 'DeclineFriendRequest');
				var declineReqParam = {
					//userId:Ti.App.cur_userId,
					//friendId:friendId
					userId : friendId,
					friendId : Ti.App.cur_userId //-------its the otherway around-------
				};
				declineReq.send(declineReqParam);
				//.splice(rowIndex, 1);
				Rlist.deleteRow(rowIndex);
			}
		});

		confirm.show();
	}

});

//---------------------------
flist.addEventListener('click', function(e) {

	Ti.API.log("Row Number:" + e.index);
	var rowIndex = e.index;
	var clickedItem = e.source.clickItem;
	var friendId = e.source.fid;

	Ti.API.log("friendId:" + friendId);
	Ti.API.log("UserId:" + Ti.App.cur_userId);

	Ti.API.log("Clicked On:" + clickedItem);
	//Ti.API.log("Clicked On:" + e.source.children[1].visible);
	if(clickedItem == 'row'){
		if(e.source.children[1].visible == false){
			e.source.children[1].show();
		}else{
			e.source.children[1].hide();
		}
		
	}

	if (clickedItem == 'deleteBtn') {

		var confirm = Titanium.UI.createAlertDialog({
			title : 'Remove',
			message : 'Are you sure you want to Remove this Friend?',
			buttonNames : ['Yes', 'No'],
			cancel : 1
		});

		confirm.addEventListener('click', function(e1) {
			if (e1.cancel === e1.index || e1.cancel === true) {
				return false;
			}
			if (e1.index === 0) {
				removeFriendReq.open("GET",Ti.App.baseUrl + 'RemoveFriend');
				var removeFriendReqParam = {
					userId : Ti.App.cur_userId,
					friendId : friendId
				};
				removeFriendReq.send(removeFriendReqParam);
				flist.deleteRow(rowIndex);
				//.splice(rowIndex, 1);
				Rlist.deleteRow(rowIndex);
			}
		});

		confirm.show();

	}

});

//------Load Default Friend List--------------------------------

getFriendListReq.open("GET", Ti.App.baseUrl + 'getFriends');

var getFriendsReqParam = {
	userId : Ti.App.cur_userId
};

getFriendListReq.send(getFriendsReqParam);

//-----------------------Determine if New! notification is shown on load---
getFriendRequestReq.open("GET", Ti.App.baseUrl + 'getrequesters');
var getRequestReqParam = {
	friendId : Ti.App.cur_userId
};
getFriendRequestReq.send(getRequestReqParam);

Ti.API.log(f_rowData);

//------------------------------------------------------

