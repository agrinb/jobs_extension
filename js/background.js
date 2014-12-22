
// Run as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  alert( "I'm here");
});
    var id = 0;
		var jobs = [];
	  var pusher = new Pusher('2089ef65bd0d820cb915', {
      disableStats: true
    });

	  var channel = pusher.subscribe('1');
    channel.bind('my_event', function(data) {
      
    localStorage["jobs"] = JSON.stringify(data);
    console.log("JOBS --" + localStorage["jobs"]);

    var item_array = new Array();
    for (var i = 0; i < 10; i++) {
      item_array.push({ title: data[i]['title'], message: ""});
    }
      
    var opt = {
      type: "list",
      title: "New Jobs Discovered",
      message: "New Jobs Discovered",
      iconUrl: "job_icon.png",
      items: item_array
    };

    opt.buttons = [{title: "View Jobs"}, {title: "Not Right Now"}]
  


    chrome.notifications.onButtonClicked.addListener(viewBtnClick);
    chrome.notifications.onButtonClicked.addListener(closeBtnClick);
    chrome.notifications.create( "not"+id++, opt, function(){});
  });

  function viewBtnClick(){
      console.log("View button clicked");
  }
  function closeBtnClick(){
    console.log("Close Button Clicked")
  }


// Enable Pusher logging - don't include this in production
Pusher.log = function(message) {
  if (window.console && window.console.log) {
    window.console.log(message);
  }
};
