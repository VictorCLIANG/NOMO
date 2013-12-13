Ti.UI.setBackgroundColor('#f7f7f7');

var friendList = null;

var self = Ti.UI.currentWindow;

var userId = self.userId;

var NavigationBar = require('ui/common/NavigationBar');
var navBar = new NavigationBar();

self.add(navBar);

var tabView = Ti.UI.createView({
	height:'10%',
	layout:'horizontal',
	borderWidth:2,
	borderColor:'#5dc2d6'
});


var LeftBtn = Ti.UI.createLabel({
	height:'100%',
	width:'50%',
	textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
	backgroundColor : "#5dc2d6",
	text: 'My Friend List',
	color:'white'	
});

tabView.add(LeftBtn);

self.add(tabView);
