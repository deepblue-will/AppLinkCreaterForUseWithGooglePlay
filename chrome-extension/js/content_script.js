$(function(){
	var app_name = $(".document-title > div").text();
	var created_by = $("a.document-subtitle.primary").text();
	var img_url = $("img.cover-image").attr("src");
	var rating = $("[itemprop=ratingValue]").attr("content");
	var votes = $("[itemprop=ratingCount]").attr("content");
	var price = $("[itemprop=price]")
	
	// ダウンロード済みの有料アプリは価格が表示されない
	if(price){
		price = price.attr("content");
	}
	
	var app_data = {
		"app_name": app_name,
		"created_by": created_by,
		"img_url": img_url,
		"rating": rating,
		"votes": votes,
		"price": price
	}
	// To background.js
	chrome.runtime.sendMessage(app_data)
});
//from background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	$("body").prepend('<div id="completed_copy">Copied to clipboard !!</div>')
	$("#completed_copy").fadeIn(1000).delay(500).fadeOut(1500).queue(function(){
		$("#completed_copy").remove();
	});
	sendResponse({});
});