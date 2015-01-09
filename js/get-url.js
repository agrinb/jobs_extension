$('a').mousedown(function(){
	console.log('mousedown')
	var url = $(this).attr('href'); 
	chrome.runtime.sendMessage({message: url}, function(response) {
	});
});