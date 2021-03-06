/*
 * LogIn Page Component Constructor
 */
function LogIn() {
	var self = Ti.UI.createView({
		backgroundColor : '#424240'
	});

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

	var userNameText = Ti.UI.createTextField({
		//height : Titanium.UI.SIZE,
		width : '85%',
		top : '40%',
		borderWidth : 1,
		borderColor : "#a99",
		hintText : 'Username',
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
		title : 'Sign In',
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
	self.add(userNameText);
	self.add(passText);
	self.add(loginButton);

	//----create event handler for sign in button
	loginButton.addEventListener('click', function() {

		var userId = 1;

		//	if(userNameText.value=="admin"&&passText.value=="sushmobile"){

		var friendListWindow = Ti.UI.createWindow({
			id : 'friendListWin',
			layout : 'vertical',
			backgroundColor : '#f7f7f7',
			navBarHidden : true,
			modal : true,
			url : 'FriendList.js',
			userId : 1
		});

		friendListWindow.open();

		//	}else{
		//		alert("wrong input");
		//	}
	});

	return self;
}

module.exports = LogIn; 