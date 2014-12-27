
console.log("get-url.js loaded");

$('a').mousedown(function(){
	var url = $(this).attr('href'); 
	chrome.runtime.sendMessage({message: url}, function(response) {
  console.log(response.message);
	});
});