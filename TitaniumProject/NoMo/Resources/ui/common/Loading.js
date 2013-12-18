/*
 *
 *
 */

function Loading() {
	
	if (Ti.Platform.name === 'iPhone OS'){
		var style = Ti.UI.iPhone.ActivityIndicatorStyle.BIG;
	}else{
		var style = Ti.UI.ActivityIndicatorStyle.BIG;
	}
	
	var self = Ti.UI.createActivityIndicator({
		color:'white',
		style:style,
		font : {
			fontSize : '30dp'
		},
		message:"Loading...",
		height:Ti.UI.FILL,
		width:Ti.UI.FILL
	});
	
	return self;
}

module.exports = Loading;