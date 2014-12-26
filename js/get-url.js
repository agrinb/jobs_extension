


// var links = document.querySelectorAll("a");
// console.log(links);

// for(var i = 0; i < links.length; i++) {
// 	links[i].addEventListener("click", function(event){
// 		console.log(links[i]);
// 	})
// }

// console.log("get-url")
alert("executed");

$('a').mousedown(function(){
alert($(this).attr('href'));
});