Ti.UI.setBackgroundColor('#f7f7f7');

var friendList = null;

var self = Ti.UI.currentWindow;

self.id = 'FriendListWindow';

var userId = self.userId;

var NavigationBar = require('ui/common/NavigationBar');
var navBar = new NavigationBar('FriendListWin');

self.add(navBar);

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
	text : 'My Friend List',
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

rightBtnContainer.addEventListener('click', function() {
	Ti.API.log('rightBtnClicked');
	//---------- tab button display change
	rightBtn.setBackgroundColor('#5dc2d6');
	rightBtn.setColor('white');

	newNotificationLabel.setColor('white');

	LeftBtn.setBackgroundColor('white');
	LeftBtn.setColor('#5dc2d6');
	//
	
	self.remove(flist);
	self.add(Rlist);

});

LeftBtn.addEventListener('click', function() {
	Ti.API.log('leftBtnClicksed');
	//---------- tab button display change
	rightBtn.setBackgroundColor('white');
	rightBtn.setColor('#5dc2d6');

	newNotificationLabel.setColor('#5dc2d6');

	LeftBtn.setBackgroundColor('#5dc2d6');
	LeftBtn.setColor('white');
	//
	
	self.remove(Rlist);
	self.add(flist);
});

rightBtnContainer.add(rightBtn);
rightBtnContainer.add(newNotificationLabel);

tabView.add(LeftBtn);
tabView.add(rightBtnContainer);

self.add(tabView);

//---------table View Contents---------------------------------
var data = [{
	name : "Ella Jones-Everette"
}, {
	name : "Elisa Abraham"
}, {
	name : "Elise Barnes"
}, {
	name : "Eliza Glasser"
}, {
	name : "John Smith"
}, {
	name : "Neil Anderson"
}];

var rowData = [];

for (var i = 0; i < data.length; i++) {

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
		height : '50dp'
	});

	row.add(name);

	var rowContainer = Ti.UI.createTableViewRow({
		layout : 'horizontal'
	});

	rowContainer.add(row);

	rowData.push(rowContainer);
}

var flist = Ti.UI.createTableView({
	id : 'FriendListView',
	data : rowData,
	layout : 'vertical'
});

//----------Request List --------------------

var data = [{
	name : "Ella Jones-Everette"
}, {
	name : "Elisa Abraham"
}, {
	name : "Elise Barnes"
}, {
	name : "Eliza Glasser"
}, {
	name : "John Smith"
}, {
	name : "Neil Anderson"
}];

var rowData = [];

for (var i = 0; i < data.length; i++) {

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
		height : '50dp'
	});

	var buttonContainer = Ti.UI.createView({
		width : '30%',
		right : 0
	});

	var acceptBtn = Ti.UI.createImageView({
		left : 0,
		image : '/images/request_accept@2x.png',
		height : '30dp'
	});

	var declineBtn = Ti.UI.createImageView({
		right : 0,
		image : '/images/request_decline@2x.png',
		height : '30dp'
	});

	buttonContainer.add(acceptBtn);
	buttonContainer.add(declineBtn);
	
	row.add(name);
	row.add(buttonContainer);

	var rowContainer = Ti.UI.createTableViewRow({
		layout : 'horizontal'
	});

	rowContainer.add(row);

	rowData.push(rowContainer);
}

var Rlist = Ti.UI.createTableView({
	id : 'RequestListView',
	data : rowData,
	layout : 'vertical'
});

//---------------------------

self.add(flist);

