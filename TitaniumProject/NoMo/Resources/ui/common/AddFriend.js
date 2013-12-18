Ti.UI.setBackgroundColor('#f7f7f7');

//var friendList = null;

var friendList;

var self = Titanium.UI.currentWindow;

var userId = self.userId;

var NavigationBar = require('ui/common/NavigationBar');
if (friendList == null) {
	var navBar = new NavigationBar('addFriendWin_empty');
} else {
	var navBar = new NavigationBar('addFriendWin');
}

self.add(navBar);

//commentted out for testing as mobileWeb

var searchBar = Ti.UI.createSearchBar({
	width : '100%',
	height : '10%',
	backgroundColor : '#424240',
	hintText : 'Find Friends',
	showCancel : true
});

self.add(searchBar);

console.log("Friend LIst not empty");
/*
 var data = [{
 name : "Ella Jones-Everette",
 isFrend : 'true',
 sentRequest : 'false'
 }, {
 name : "Elisa Abraham",
 isFrend : 'false',
 sentRequest : 'true'
 }, {
 name : "Elise Barnes",
 isFrend : 'false',
 sentRequest : 'false'
 }, {
 name : "Eliza Glasser",
 isFrend : 'true',
 sentRequest : 'false'
 }, {
 name : "John Smith",
 isFrend : 'true',
 sentRequest : 'false'
 }, {
 name : "Neil Anderson",
 isFrend : 'true',
 sentRequest : 'false'
 }];
 */

var content = Ti.UI.createTableView({
	id : 'contentView',
	layout : 'vertical'
});

var sendFriendReq = Titanium.Network.createHTTPClient();

sendFriendReq.onload = function(e) {
};

sendFriendReq.onerror = function() {
	alert("Failed to connect to the server");
};

var searchFriendReq = Titanium.Network.createHTTPClient();

searchFriendReq.onload = function() {

	var data = [];

	var rowData = [];

	var json = this.responseText;
	data = JSON.parse(json);

	if (data != null) {

		for (var i = 0; i < data.length; i++) {
			Ti.API.log(data[i].HasFriendRequestFromUser);
			var name = Ti.UI.createLabel({
				left : 0,
				font : {
					fontSize : '20dp'
				},
				color : 'black',
				textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
				text : data[i].Name
			});

			var row = Ti.UI.createView({
				top : '5%',
				bottom : '5%',
				left : '5%',
				right : '5%',
				height : '40dp'
			});

			var friendListBtn = Ti.UI.createImageView({
				id : 'friendListBtn' + i,
				fid : data[i].ID,
				//image:'/images/friends_icrequest@2x.png',
				height : '70%',
				isSent : data[i].ReceivedFriendRequestFromUser,
				clickedItem : 'btn',
				right : '10dp'
			});

			if (data[i].ReceivedFriendRequestFromUser == true) {
				friendListBtn.setImage('/images/friends_icsent@2x.png');
			} else {
				friendListBtn.setImage('/images/friends_icrequest@2x.png');
			}

			row.add(name);
			row.add(friendListBtn);

			var rowContainer = Ti.UI.createTableViewRow({
				layout : 'horizontal'
			});

			rowContainer.add(row);

			rowData.push(rowContainer);
		}
	}
	content.setData(rowData);
	if (Ti.App.hasFriendOrPlan == 'false') {
		self.remove(self.children[2]);
	}
	self.add(content);

	content.addEventListener('click', function(e) {

		if (e.source.clickedItem == 'btn') {
			Ti.API.log("---------------------");
			Ti.API.log(e.source.isSent);
			Ti.API.log("userId: " + Ti.App.cur_userId);
			Ti.API.log("friendId: " + e.source.fid);
			if (e.source.isSent == false) {
				alert("A friend request will be send to " + e.source.fname);
				sendFriendReq.open("GET", Ti.App.baseUrl + 'CreateFriendRequest');
				var sendFriendReqPara = {
					userId : Ti.App.cur_userId,
					friendId : e.source.fid
				};
				sendFriendReq.send(sendFriendReqPara);
				e.source.image = "/images/friends_icsent@2x.png";
			}
		}
	});
};

searchFriendReq.onerror = function() {
	alert("Failed to connect to the server");
};

//-----------------when friend list is empty-------------------
if (Ti.App.hasFriendOrPlan == 'false') {
	var emptyListContent = Ti.UI.createView({
		id : 'emptyListContent',
		layout : 'vertical'
	});

	var emptyFriendListBtn = Ti.UI.createImageView({
		top : 5,
		image : '/images/empty_listfriends@2x.png',
		height : '150dp'
	});

	var skipMessage = Ti.UI.createLabel({
		top : 10,
		font : {
			fontSize : '20dp'
		},
		color : 'black',
		text : 'Start by searching for your friends'
	});

	var skipLink = Ti.UI.createLabel({
		top : 5,
		color : 'black',
		font : {
			fontSize : '20dp'
		},
		text : 'skip this step'
	});

	emptyListContent.add(emptyFriendListBtn);
	emptyListContent.add(skipMessage);
	emptyListContent.add(skipLink);
	self.add(emptyListContent);

	skipLink.addEventListener('click', function(e) {

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

		self.close();
	});
}

//--------------------------------------------------------------

//self.remove(self.children[2]);
//self.add(content);

searchBar.addEventListener('return', function() {

	searchFriendReq.open("GET", Ti.App.baseUrl + 'GetNonFriends');
	var param = {
		userId : Ti.App.cur_userId,
		searchString : searchBar.value
	};
	searchFriendReq.send(param);

	//if (friendList == null) {
	//	friendList = 'somthing';
	//	self.fireEvent('open');
	//}
});

