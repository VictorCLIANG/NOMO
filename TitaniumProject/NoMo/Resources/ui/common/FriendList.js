Ti.UI.setBackgroundColor('#f7f7f7');

var friendList = null;

var self = Ti.UI.currentWindow;

self.id = 'FriendListWindow';

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

	tabContainer.remove(flist);
	tabContainer.add(Rlist);

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

	tabContainer.remove(Rlist);
	tabContainer.add(flist);
});

rightBtnContainer.add(rightBtn);
rightBtnContainer.add(newNotificationLabel);

tabView.add(LeftBtn);
tabView.add(rightBtnContainer);

tabContainer.add(tabView);

//---------table View Contents---------------------------------
var f_data = [{
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

var f_rowData = [];

for (var i = 0; i < f_data.length; i++) {

	var name = Ti.UI.createLabel({
		left : 0,
		font : {
			fontSize : '20dp'
		},
		color : 'black',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		text : f_data[i].name
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

	f_rowData.push(rowContainer);
}

var flist = Ti.UI.createTableView({
	id : 'FriendListView',
	data : f_rowData,
	layout : 'vertical'
});

//----------Request List --------------------

var r_data = [{
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

var r_rowData = [];

for (var i = 0; i < r_data.length; i++) {

	var name = Ti.UI.createLabel({
		left : 0,
		font : {
			fontSize : '20dp'
		},
		color : 'black',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		text : r_data[i].name
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
		height : '30dp',
		clickItem : 'accept'
	});

	var declineBtn = Ti.UI.createImageView({
		right : 0,
		image : '/images/request_decline@2x.png',
		height : '30dp',
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

	rowContainer.add(row);

	r_rowData.push(rowContainer);
}

var Rlist = Ti.UI.createTableView({
	id : 'RequestListView',
	data : r_rowData,
	layout : 'vertical'
});

//------EVENT LISTENERs----------------
Rlist.addEventListener('click', function(e) {
	Ti.API.log("Row Number:" + e.index);
	var rowIndex = e.index;
	var clickedItem = e.source.clickItem;
	Ti.API.log("Clicked On:" + clickedItem);

	if (clickedItem == 'accept') {
		r_data.splice(rowIndex, 1);
		Rlist.deleteRow(rowIndex);
	} else if (clickedItem == 'decline') {

		var confirm = Titanium.UI.createAlertDialog({
			title : 'Decline',
			message : 'Are you sure you want to ignore this request?',
			buttonNames : ['Yes', 'No'],
			cancel : 1
		});

		confirm.addEventListener('click', function(e1) {
			if (e1.cancel === e1.index || e1.cancel === true) {
				return false;
			}
			if (e1.index === 0) {
				r_data.splice(rowIndex, 1);
				Rlist.deleteRow(rowIndex);
			}
		});

		confirm.show();
	}

});

declineBtn.addEventListener('click', function() {

	var confirm = Titanium.UI.createAlertDialog({
		title : 'Decline',
		message : 'Are you sure you want to ignore this request?',
		buttonNames : ['Yes', 'No'],
		cancel : 1
	});

	confirm.addEventListener('click', function(e) {
		if (e.cancel === e.index || e.cancel === true) {
			return false;
		}
		if (e.index === 0) {
			r_data.splice(i, 1);
		}
	});

	confirm.show();
});

//---------------------------

tabContainer.add(flist);

