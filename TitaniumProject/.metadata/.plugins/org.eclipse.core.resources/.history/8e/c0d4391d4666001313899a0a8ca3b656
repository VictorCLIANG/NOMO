/*
 *
 *
 */

function AddPlan(UserId) {

	var self = Ti.UI.createWindow({
		id : 'AddPlanWin',
		modal : true,
		navBarHidden : true,
		backgroundColor : '#f7f7f7',
		layout : 'vertical'
	});

	//----------------------------------Navigation
	var navbar = require('ui/common/NavigationBar');
	var navigationBar = new navbar();

	self.add(navigationBar);
	
	//-----------------------------------Main Content View
	var mainView = Ti.UI.createView({
		id : 'AddPlanMainView',
		height : '80%',
		left : '5%',
		right : '5%',
		top : '7%',
		layout : 'vertical'
	});
	//------------------------------------------------------
	var tmp = (Titanium.Platform.displayCaps.platformHeight) / 100;
	// BorderRadius Value

	//----------------------------------Contents
	var titalLable = Ti.UI.createLabel({
		top : '10dp',
		left : 2,
		right : 2,
		text : 'What are you Planing',
		font : {
			fontSize : '20dp'
		},
		color : '#5dc2d6'
	});

	var title = Ti.UI.createTextField({
		borderRadius : tmp,
		backgroundColor : 'white',
		hintText : 'Title',
		top : '10dp',
		left : '2dp',
		right : '2dp',
		font : {
			fontSize : '20dp'
		},
		height : '40dp',
		width : '98%'
	});

	var description = Ti.UI.createTextField({
		borderRadius : tmp,
		backgroundColor : 'white',
		hintText : 'Description',
		top : '5dp',
		left : '2dp',
		right : '2dp',
		font : {
			fontSize : '20dp'
		},
		height : '40dp',
		width : '98%'
	});

	var inputCol1 = Ti.UI.createView({
		height : '40dp',
		top : '5dp',
		left : '2dp',
		right : '2dp'
	});

	var locationContainer = Ti.UI.createView({
		layout : 'horizontal',
		borderRadius : tmp,
		backgroundColor : 'white',
		left : 0,
		width : '48%'
	});

	var location = Ti.UI.createTextField({
		borderRadius : tmp,
		backgroundColor : 'white',
		hintText : 'Location',
		left : 0,
		height : '100%',
		width : '80%'
	});

	var locationIcon = Ti.UI.createImageView({
		image : '/images/pan_iclocation@2x.png',
		height : '100%'
		//width:'30%'
	});

	locationContainer.add(location);
	locationContainer.add(locationIcon);

	var timeContainer = Ti.UI.createView({
		layout : 'horizontal',
		borderRadius : tmp,
		backgroundColor : 'white',
		right : 0,
		width : '48%'
	});

	var time = Ti.UI.createTextField({
		borderRadius : tmp,
		backgroundColor : 'white',
		hintText : 'Time',
		height : '100%',
		width : '80%'
	});

	var timeIcon = Ti.UI.createImageView({
		image : '/images/pan_icclock@2x.png',
		height : '100%'
		//width:'30%'
	});

	timeContainer.add(time);
	timeContainer.add(timeIcon);

	inputCol1.add(locationContainer);
	inputCol1.add(timeContainer);

	var dayContainer = Ti.UI.createView({
		layout : 'horizontal',
		borderRadius : tmp,
		backgroundColor : 'white',
		height : '40dp',
		width : '48%',
		top : '5dp',
		left : '2dp'
	});

	var day = Ti.UI.createTextField({
		editable : false,
		borderRadius : tmp,
		backgroundColor : 'white',
		hintText : 'Day',
		height : '100%',
		width : '80%'
	});

	var dayIcon = Ti.UI.createImageView({
		image : '/images/pan_iccalendar@2x.png',
		height : '100%'
	});

	dayContainer.add(day);
	dayContainer.add(dayIcon);

	var addBtn = Ti.UI.createButton({
		top : '20dp',
		title : 'Add Plan',
		backgroundColor : "#5dc2d6",
		color : 'white',
		font : {
			fontSize : '20dp'
		},
		borderRadius : tmp,
		height : '40dp',
		width : '100%'
	});

	var updateBtn = Ti.UI.createButton({
		top : '20dp',
		visible : false,
		title : 'Update Plan',
		backgroundColor : "#5dc2d6",
		color : 'white',
		font : {
			fontSize : '20dp'
		},
		borderRadius : tmp,
		height : '40dp',
		width : '100%'
	});

	var cancelBtn = Ti.UI.createButton({
		top : '10dp',
		visible : false,
		title : 'Cancel Plan',
		backgroundColor : "#424240",
		color : 'white',
		font : {
			fontSize : '20dp'
		},
		borderRadius : tmp,
		height : '40dp',
		width : '100%'
	});

	var datePicker = Ti.UI.createPicker({
		visible : false,
		useSpinner : true,
		height : 0,
		width : '80%',
		type : Ti.UI.PICKER_TYPE_DATE,
		minDate : new Date(2009, 0, 1),
		maxDate : new Date(2015, 11, 31),
		value : new Date(2013, 12, 12),
		top : 30
	});

	mainView.add(titalLable);
	mainView.add(title);
	mainView.add(description);
	mainView.add(inputCol1);
	mainView.add(dayContainer);
	mainView.add(datePicker);

	mainView.add(addBtn);
	mainView.add(updateBtn);
	mainView.add(cancelBtn);

	self.add(mainView);

	day.addEventListener("click", function() {
		datePicker.show();
		datePicker.height = '30%';
	});

	day.addEventListener("blur", function() {
		datePicker.hide();
		datePicker.height = 0;
	});

	datePicker.addEventListener("change", function() {
		day.setValue(datePicker.getValue());
	});

	addBtn.addEventListener("click", function() {

		Ti.App.isEmptyPlan = false;

		self.close();

		//var parentView = self.getParent();
		//var plans = require('ui/common/Plan');
		//var plan = new plans(333);

		//parentView.open();
		//parentView.add(plan);
	});

	return self;
}

module.exports = AddPlan;
