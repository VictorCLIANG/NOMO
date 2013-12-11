/*
 * 
 * 
 */

function AddPlan (UserId){
	
	var cur_win = Ti.UI.getCurrentWindow;
	
	var self = Ti.UI.createWindow({
		id:'AddPlanWin',
		left:'5%',
		right:'5%',
		top:'7%',
		layout:'vertical'
	});
	
	var tmp = (Titanium.Platform.displayCaps.platformHeight)/100; // BorderRadius Value
	
	var titalLable = Ti.UI.createLabel({
		top:'10dp',
		left:2,
		right:2,
		text:'What are you Planing',
		font:{
			fontSize:'20dp'
		},
		color:'#5dc2d6'
	});
	
	var title = Ti.UI.createTextField({
		borderRadius: tmp,
		backgroundColor: 'white',
		hintText:'Title',
		top:'10dp',
		left:'2dp',
		right:'2dp',
		height:'10%',
		width:'98%'
	});
	
	var description = Ti.UI.createTextField({
		borderRadius: tmp,
		backgroundColor: 'white',
		hintText:'Description',
		top:'5dp',
		left:'2dp',
		right:'2dp',
		height:'10%',
		width:'98%'
	});
	
	var inputCol1 = Ti.UI.createView({
		height:'10%',
		top:'5dp',
		left:'2dp',
		right:'2dp'
	});
	
	var locationContainer= Ti.UI.createView({
		layout:'horizontal',
		borderRadius: tmp,
		backgroundColor: 'white',
		left:0,
		width:'48%'
	});
	
	var location = Ti.UI.createTextField({
		borderRadius: tmp,
		backgroundColor: 'white',
		hintText:'Location',		
		left:0,
		height:'100%',
		width:'80%'
	});
	
	var locationIcon = Ti.UI.createImageView({
		image:'/images/pan_iclocation@2x.png',
		height:'100%'
		//width:'30%'
	});
	
	locationContainer.add(location);
	locationContainer.add(locationIcon);
	
	var timeContainer= Ti.UI.createView({
		layout:'horizontal',
		borderRadius: tmp,
		backgroundColor: 'white',
		right:0,
		width:'48%'
	});
	
	
	var time = Ti.UI.createTextField({
		borderRadius: tmp,
		backgroundColor: 'white',
		hintText:'Time',
		height:'100%',
		width:'80%'
	});
	
	var timeIcon = Ti.UI.createImageView({
		image:'/images/pan_icclock@2x.png',
		height:'100%'
		//width:'30%'
	});
	
	timeContainer.add(time);
	timeContainer.add(timeIcon);
	
	inputCol1.add(locationContainer);
	inputCol1.add(timeContainer);
	
	var dayContainer= Ti.UI.createView({
		layout:'horizontal',
		borderRadius: tmp,
		backgroundColor: 'white',
		height:'10%',
		width:'48%',
		top:'5dp',
		left:'2dp'
	});
	
	var day = Ti.UI.createTextField({
		editable:false,
		borderRadius: tmp,
		backgroundColor: 'white',
		hintText:'Day',
		height:'100%',
		width:'80%'
	});
	
	var dayIcon = Ti.UI.createImageView({
		image:'/images/pan_iccalendar@2x.png',
		height:'100%'
	});
	
	dayContainer.add(day);
	dayContainer.add(dayIcon);
		
	var addBtn = Ti.UI.createButton({
		top:'20dp',
		title:'Add Plan',
		backgroundColor:"#5dc2d6",
		color:'white',
		font:{fontSize:'20dp'},
		borderRadius:tmp,
		height:'10%',
		width:'100%'
	});
	
	var updateBtn = Ti.UI.createButton({
		top:'20dp',
		visible:false,
		title:'Update Plan',
		backgroundColor:"#5dc2d6",
		color:'white',
		font:{fontSize:'20dp'},
		borderRadius:tmp,
		height:'10%',
		width:'100%'
	});
	
	var cancelBtn = Ti.UI.createButton({
		top:'10dp',
		visible:false,
		title:'Cancel Plan',
		backgroundColor:"#424240",
		color:'white',
		font:{fontSize:'20dp'},
		borderRadius:tmp,
		height:'10%',
		width:'100%'
	});
	
	var datePicker = Ti.UI.createPicker({
		visible:false,
		useSpinner:true,
		width:'100%',
		height:0,
		type:Ti.UI.PICKER_TYPE_DATE,
		minDate:new Date(2009,0,1),
		maxDate:new Date(2015,11,31),
		value:new Date(2013,12,12),
		top:50
	});
	
	self.add(titalLable);
	self.add(title);
	self.add(description);
	self.add(inputCol1);
	self.add(dayContainer);
	self.add(datePicker);
	
	self.add(addBtn);
	self.add(updateBtn);
	self.add(cancelBtn);
	
	day.addEventListener("focus",function(){
		datePicker.show();
		datePicker.height = Ti.UI.SIZE;
	});
	
	day.addEventListener("blur",function(){
		datePicker.hide();
		datePicker.height = 0;
	});
	
	datePicker.addEventListener("change",function(){
		day.setValue(datePicker.getValue());
	});
	
	addBtn.addEventListener("click",function(){
		var parentView = self.getParent();
		var plans = require('ui/common/Plan');
		var plan = new plans(333);
			
		parentView.remove(self);
		parentView.add(plan);
	});
	
	return self;
}
module.exports = AddPlan;