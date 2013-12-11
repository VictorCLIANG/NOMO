Ti.UI.setBackgroundColor('#f7f7f7');

var friendList = null;

var self = Titanium.UI.currentWindow;

var userId = self.userId;

if (userId == 333) {
	friendList = "somthing";
}

var NavigationBar = require('ui/common/NavigationBar');
var navBar = new NavigationBar();

self.add(navBar);

//commentted out for testing as mobileWeb

var searchBarContainer = Ti.UI.createView({
	id : 'searchBarContainer',
	backgroundColor : '#424240',
	layout : 'horizontal',
	height : '10%'
});

var searchBar = Ti.UI.createSearchBar({
	left : '3dp',
	right : 0,
	width : '85%',
	backgroundColor : '#424240',
	hintText : 'Find Friends',
	showCancel : false
});

var searchBarIcon = Ti.UI.createImageView({
	left : '5dp',
	image : '/images/Search_ic@2x.png',
	height : '70%'
});

searchBarContainer.add(searchBarIcon);
searchBarContainer.add(searchBar);

self.add(searchBarContainer);

console.log("Friend LIst not empty");

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

var rowData = [];

for (var i = 0; i < data.length; i++) {
	Ti.API.log(data[i].sentRequest);
	var name = Ti.UI.createLabel({
		left : 0,
		font : {
			fontSize : '20dp'
		},
		color : 'black',
		text : data[i].name
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
		fname : data[i].name,
		//image:'/images/friends_icrequest@2x.png',
		height : '70%',
		isSent : false,
		right : '10dp'
	});

	if (data[i].sentRequest == 'true') {
		friendListBtn.setImage('/images/friends_icsent@2x.png');
		friendListBtn.isSent = 'true';
	} else {
		friendListBtn.setImage('/images/friends_icrequest@2x.png');
	}

	friendListBtn.addEventListener('click', function(e) {
		Ti.API.log(e.source.isSent);
		if (e.source.isSent == false) {
			alert("Friend Request has send to " + e.source.fname);
			e.source.isSent = true;
			e.source.image = "/images/friends_icsent@2x.png";
		}
	});

	row.add(name);
	row.add(friendListBtn);

	var rowContainer = Ti.UI.createTableViewRow({
		layout : 'horizontal'
	});

	rowContainer.add(row);

	rowData.push(rowContainer);
}

var content = Ti.UI.createTableView({
	id:'contentView',
	data : rowData,
	layout : 'vertical'
});

self.addEventListener('open', function() {
	if (friendList == null) {
		
		var emptyListContent = Ti.UI.createView({
			id:'emptyListContent',
			layout : 'vertical'
		});
		console.log("Friend List Empty");
		var emptyFriendListBtn = Ti.UI.createImageView({
			top : 5,
			image : '/images/empty_listfriends@2x.png',
			height : '150dp',
			width : '150dp'
		});

		var skipMessage = Ti.UI.createLabel({
			top : 10,
			font : {
				fontSize : '20dp'
			},
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
		/*
		 skipLink.addEventListener('click',function(e){

		 var parentView = self.getParent();
		 var plans = require('ui/common/Plan');
		 var plan = new plans(userId);

		 parentView.remove(self);
		 parentView.add(plan);

		 });
		 */
	} else {
		self.remove(self.children[2]);
		self.add(content);
	}
});

searchBar.addEventListener('return', function() {
	if (friendList == null) {
		friendList = 'somthing';
		self.fireEvent('open');
		
	}
});


