/*
 *
 *
 */

var self = Ti.UI.currentWindow;

var userId = self.userId;

//-----------Navigation Bar------------
var NavigationBar = require('ui/common/NavigationBar');
var navBar = new NavigationBar('plansWin');

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
self.add(MainContentContainer);
//---------------------------------------

//--------------------Main Content
Ti.App.isEmptyPlan = true;

self.addEventListener('focus', function() {
	Ti.API.log("global is empty plan?:" + Ti.App.isEmptyPlan);
	//Ti.API.log("global-id:"+Ti.App.Globals.Id);
	if (Ti.App.isEmptyPlan == false) {
		var data = [{
			title : "dummy data 1",
			date : "2013.10.11",
			time : "18:00",
			name : "user 1",
			map : "location",
			numberofcomments : "0"
		}, {
			title : "dummy data 2",
			date : "2013.10.12",
			time : "12:00",
			name : "user 2",
			map : "location",
			numberofcomments : "3"
		}, {
			title : "dummy data 3dummy data 3dummy data 3",
			date : "2013.10.13",
			time : "11:00",
			name : "user 3",
			map : "location",
			numberofcomments : "2"
		}, {
			title : "dummy data 4",
			date : "2013.10.14",
			time : "9:00",
			name : "user 4",
			map : "location",
			numberofcomments : "1"
		}, {
			title : "dummy data 5",
			date : "2013.10.15",
			time : "19:00",
			name : "user 5",
			map : "location",
			numberofcomments : "3"
		}, {
			title : "dummy data 6",
			date : "2013.10.14",
			time : "13:40",
			name : "user 6",
			map : "location",
			numberofcomments : "5"
		}];

		var rowData = [];

		for (var i = 0; i < data.length; i++) {
			//-------------left Section of the data row
			//-------------------------------------------
			var leftSection = Ti.UI.createView({
				left : '5%',
				width : '20%',
				layout : 'vertical',
				height : Ti.UI.FILL,
				id : "leftSection:" + i
			});

			var name = Titanium.UI.createLabel({
				text : data[i].name,
				color : "black",
				height : Ti.UI.FILL,
				font : {
					fontSize : '15dp'
				},
				left : 0
			});

			var date = Titanium.UI.createLabel({
				top : '30dp',
				font : {
					fontSize : '13dp'
				},
				text : data[i].date,
				color : "#96d1d5",
				left : 0,
				bottom : '0dp'
			});

			//--------------------------------------------------

			//-------mid section of the data row
			//--------------------------------------------------
			var title = Titanium.UI.createLabel({
				top : 0,
				text : data[i].title,
				color : "black",
				height : Ti.UI.SIZE,
				font : {
					fontSize : '20dp'
				},
				textAlign : "top",
				left : '5dp'
			});

			var locationContainer = Ti.UI.createView({
				left : 0,
				width : '48%',
				height : Ti.UI.SIZE,
				layout : 'horizontal'
			});

			var location = Ti.UI.createLabel({
				left : 0,
				font : {
					fontSize : '15dp'
				},
				text : data[i].map,
				color : "#96d1d5"
			});

			var locationIcon = Ti.UI.createImageView({
				image : '/images/pan_iclocation@2x.png',
				height : '20dp'
			});

			locationContainer.add(locationIcon);
			locationContainer.add(location);

			var timeContainer = Ti.UI.createView({
				width : '48%',
				height : Ti.UI.SIZE,
				layout : 'horizontal',
				right : 0
			});

			var time = Ti.UI.createLabel({
				right : 0,
				font : {
					fontSize : '15dp'
				},
				text : data[i].time,
				color : "#96d1d5"
			});

			var timeIcon = Ti.UI.createImageView({
				image : '/images/pan_icclock@2x.png',
				height : '15dp'
			});

			timeContainer.add(time);
			timeContainer.add(timeIcon);

			var midTopSection = Ti.UI.createView({
				width : '65%',
				height : Ti.UI.SIZE,
				layout : 'vertical',
				id : "midTopSection:" + i
			});

			var midBotSection = Ti.UI.createView({
				top : '10dp',
				bottom : 0,
				id : "midBotSection:" + i,
				layout : 'horizontal'
			});

			//------------------------------------------------

			//-----------right section of the data row
			//---------------------------------------------------
			var comments = Ti.UI.createLabel({
				text : data[i].numberofcomments,
				font : {
					fontSize : '15dp'
				},
				color : 'white',
				top : '2dp',
				zIndex : 2
			});

			var commentIcon = Ti.UI.createImageView({
				image : '/images/bubble@2x.png',
				height : '20dp',
				top : '2dp',
				zindex : 1

			});

			var rightSection = Ti.UI.createView({
				height : Ti.UI.Fill,
				width : Ti.UI.SIZE,
				//right:'4%',
				id : "rightSection:" + i,
				zindex : 1
			});

			//------------------------------------------------
			//Create the ROW CONTAINER

			var rowContainer = Titanium.UI.createTableViewRow({
				height : Ti.UI.SIZE,
				layout : "vertical",
				id : "rowContainer:" + i,
				borderColor : "#dad4c4"
			});

			//Create the row content
			var row = Titanium.UI.createView({
				top : '15dp',
				bottom : '15dp',
				height : Ti.UI.Size,
				layout : 'horizontal',
				searchFilter : data[i].title,
				id : "row:" + i,
				borderColor : "#dad4c4"
			});

			//Add the views to the row
			leftSection.add(name);
			leftSection.add(date);

			midTopSection.add(title);

			//midBotSection.add(locationIcon);
			//midBotSection.add(location);
			//midBotSection.add(timeIcon);
			//midBotSection.add(time);
			midBotSection.add(locationContainer);
			midBotSection.add(timeContainer);

			midTopSection.add(midBotSection);

			rightSection.add(comments);
			rightSection.add(commentIcon);

			row.add(leftSection);
			row.add(midTopSection);
			row.add(rightSection);

			rowContainer.add(row);

			rowData.push(rowContainer);
		}

		var content = Titanium.UI.createTableView({
			horizontalWrap : false,
			data : rowData
		});

		Ti.API.log(self.emptyList);

		if (MainContentContainer.children[1]) {
			Ti.API.log("Old Content about to be removed, on stack 2: children[1]");
			MainContentContainer.remove(MainContentContainer.children[1]);

		};
		MainContentContainer.add(content);

	} else {
		console.log("empty plan list");

		var emptyList = Ti.UI.createView({
			horizontalWrap : false,
			id : 'emptyPlanView',
			horizontalWrap : false,
			layout : 'vertical'
		});

		var emptyPlanListBtn = Ti.UI.createImageView({
			top : 5,
			image : '/images/empty_listplans@2x.png',
			height : '150dp',
			width : '150dp'
		});

		var emptyFriendListBtn = Ti.UI.createImageView({
			top : 10,
			image : '/images/empty_listfriends@2x.png',
			height : '150dp',
			width : '150dp'
		});

		var planMessage = Ti.UI.createLabel({
			top : 10,
			font : {
				fontSize : '20dp'
			},
			text : 'Start by making a plans'
		});

		var friendListMessage = Ti.UI.createLabel({
			top : 10,
			font : {
				fontSize : '20dp'
			},
			text : 'Start by adding a friend'
		});

		emptyList.add(emptyPlanListBtn);
		emptyList.add(planMessage);
		emptyList.add(emptyFriendListBtn);
		emptyList.add(friendListMessage);

		MainContentContainer.add(emptyList);

		emptyFriendListBtn.addEventListener('click', function(e) {

			var AddFriendWindow = Ti.UI.createWindow({
				id : 'friendListWin',
				layout : 'vertical',
				backgroundColor : '#f7f7f7',
				navBarHidden : true,
				modal : true,
				//url : 'FriendList.js',
				url : 'AddFriend.js',
				userId : userId
			});

			AddFriendWindow.open();
		});

		emptyPlanListBtn.addEventListener('click', function(e) {

			var AddPlan = require('ui/common/AddPlan');
			var newPlan = new AddPlan(userId);

			newPlan.open();

		});

	}

});

MainContentContainer.addEventListener('swipe', function(e) {

	if (e.direction == 'right') {
		if (menu.toggle == false) {
			menu.setLeft('0%');
			menu.toggle = true;
		};

	}
	if (e.direction == 'left') {
		if (menu.toggle == true) {
			menu.setLeft('-40%');
			menu.toggle = false;
		};
		
	}
});

