$(function(){
	var tag_format = localStorage["android_app_tag_format"];
	var textarea = $("#tag-format-textarea");
	
	if(!tag_format){
		tag_format = default_value;
	}

	textarea.val(tag_format);
	
	$("#save-btn").click(function(){
		localStorage["android_app_tag_format"] = textarea.val();

		$("body").prepend('<div id="completed_save">Save !!</div>')
		$("#completed_save").fadeIn(1000).delay(500).fadeOut(1500).queue(function(){
			$("#completed_save").remove();
		});
	});
	
	$("#reset-btn").click(function(){
		textarea.val(default_value)
	});
});
