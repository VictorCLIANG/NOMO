/*
 * LogIn Page Component Constructor
 */
function LogIn() {

	//var cur_win = Ti.UI.currentWindow;

	var self = Ti.UI.createWindow({
		backgroundColor : '#424240'
	});
	
	Ti.include("Loading.js");
	
	TiLoad.init({ rotate: false });
	
	var url = "http://experiment.sandbox.net.nz/nomoapi/nomoapi.svc/";

	Ti.App.baseUrl = url;

	// Create Textview for username

	var logoImg = Ti.UI.createImageView({
		height : '40dp',
		width : '160dp',
		image : '/images/nomo_logo@2x.png',
		top : '28%'
	});

	// Create a var to hold the value of borderRadius accourding to screen size

	var tmp = (Titanium.Platform.displayCaps.platformHeight) / 100;
	// BorderRadius Value

	console.log(tmp);

	var emailText = Ti.UI.createTextField({
		//height : Titanium.UI.SIZE,
		width : '85%',
		top : '40%',
		borderWidth : 1,
		borderColor : "#a99",
		hintText : 'Email',
		backgroundColor : 'white',
		borderRadius : tmp,
		paddingLeft : 5,
		height : '10%'
	});

	// Create Textfield for password

	var passText = Ti.UI.createTextField({
		//height : Titanium.UI.SIZE,
		width : '85%',
		top : '51%',
		borderWidth : 1,
		borderColor : "#a99",
		hintText : 'Password',
		backgroundColor : 'white',
		borderRadius : tmp,
		passwordMask : true,
		paddingLeft : 5,
		height : '10%'
	});
	//--------------------------------------------

	// Create Login Button.
	var loginButton = Ti.UI.createButton({
		title : 'Sign in',
		top : '64%',
		backgroundColor : "#5dc2d6",
		color : 'white',
		font : {
			fontSize : '20dp'
		},
		width : '85%',
		borderRadius : tmp,
		height : '10%'
		//height : textFieldHeight
	});

	self.add(logoImg);
	self.add(emailText);
	self.add(passText);
	self.add(loginButton);

	//--------------Define Login Requests---------------------

	var loginReq = Titanium.Network.createHTTPClient();

	var checkFirstTimeReq = Titanium.Network.createHTTPClient();

	loginReq.onload = function() {
		var userId = this.responseText;
		Ti.API.log("RETURNED USERID: '"+userId+"'");
		if (userId != null) {
			// assing user id to global variable
			Ti.App.cur_userId = userId;
			Ti.API.log("WHIN SUCCESS!");
			checkFirstTimeReq.open("GET", url + 'hasFriendsorEvents');
			var param = {
				userId : userId
			};
			checkFirstTimeReq.send(param);
		} else {
			alert("Invalid sign in, Email or Password is incorrect");
			TiLoad.hide();
		}

	};

	loginReq.onerror = function() {
		alert("Failed to connect to the server");
		TiLoad.hide();
	};

	//----create event handler for sign in button
	loginButton.addEventListener('click', function() {
		//var email = emailText.value;
		//var password = passText.value;
		//Ti.App.cur_userId = userId;
		

		var email;
		var password;
		
		
		email = emailText.value;
		password = passText.value;
		
		//email = 'jim@sush.co.nz';
		//password = '1234';
		
		Ti.API.log("EMAIL: '"+email+"'");
		Ti.API.log("PWD: '"+password+"'");
		
		loginReq.open("GET", url + 'login');
		var loginParam = {
			email :email,
			password : password
		};
		Ti.API.log("OPEND");
		loginReq.send(loginParam);
		
		TiLoad.show();
		
		Ti.API.log("WITHIN LOGIN");
	});

	//---------API for checking friendList----------

	checkFirstTimeReq.onload = function() {
		var response = this.responseText;
		//var response = JSON.parse(json);

		Ti.App.hasFriendOrPlan = response;
		Ti.API.log("WHIN CHEKCER!");
		TiLoad.hide();
		if (response == 'true') {

			var planWindow = Ti.UI.createWindow({
				id : 'plansWin',
				url : 'ui/common/Plan.js',
				modal : true,
				//fullscreen:true,
				navBarHidden : true,
				layout : 'vertical',
				//userId : userId,
				backgroundColor : '#f7f7f7'
			});
			planWindow.open();
			Ti.API.log("CHEKER TRUE");
		} else {
			Ti.API.log("Current User " + Ti.App.cur_userId + " has NOOOOOO friends or events");

			var AddFriendWindow = Ti.UI.createWindow({
				id : 'addFriendListWin',
				layout : 'vertical',
				backgroundColor : '#f7f7f7',
				navBarHidden : true,
				modal : true,
				url : 'AddFriend.js',
				userId : Ti.App.cur_userId
			});
			
			AddFriendWindow.open();
			Ti.API.log("CHEKER false");
		}
	};

	checkFirstTimeReq.onerror = function() {
		alert("Failed to connect to the server");
		TiLoad.hide();
	};
	//---------------------------------------------------

	return self;
}

module.exports = LogIn;
