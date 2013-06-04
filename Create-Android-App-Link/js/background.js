var app_data;

// Page Action?
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if(tab.url.match(/^https:\/\/play\.google\.com\/store\/apps\/details.*/)){
		chrome.pageAction.show(tabId);
	}
});

// clkicked?
chrome.pageAction.onClicked.addListener(function(tab) {
	var copy_area = $("#app-data");
	var app_tag = localStorage["android_app_tag_format"]
	
	if(!app_tag){
		app_tag = default_value
	}
	
	app_tag = app_tag.replace(/[\t\r\n]/g, "");
	app_tag = app_tag.replace(/%app_name%/g, app_data.app_name);
	app_tag = app_tag.replace(/%app_url%/g, tab.url);
	app_tag = app_tag.replace(/%app_img_url%/g, app_data.img_url);
	app_tag = app_tag.replace(/%app_created_by%/g, app_data.created_by);
	app_tag = app_tag.replace(/%app_rating%/g, app_data.rating);
	app_tag = app_tag.replace(/%app_votes%/g, app_data.votes);
	app_tag = app_tag.replace(/%app_price%/g, app_data.price);
	
	copy_area.text(app_tag);
	copy_area.select();
	document.execCommand("copy");
	
	copy_area.text("");
	
	//to content_script.js
	chrome.tabs.sendMessage(tab.id, {copy: "completed"})
});

//from content_script.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	app_data = request;
	sendResponse({});
});

