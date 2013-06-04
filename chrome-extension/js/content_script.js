$(function(){
	var app_name = $("h1.doc-banner-title").text();
	var created_by = $(".doc-header-link").text();
	var img_url = $(".doc-banner-icon img").attr("src");
	var rating = $(".average-rating-panel .average-rating-value").html();
	var votes = $(".average-rating-panel .votes").html();
	var price = $("dd[itemprop='offers']").text();
	
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