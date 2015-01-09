
// Run as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  //
});


    var popupPort;
    chrome.extension.onConnect.addListener(function(port) {
      popupPort = port;

      popupPort.onDisconnect.addListener(function() {
        popupPort = undefined;
      });
    });

   
    var id = 0;
		var jobs = [];
	  var pusher = new Pusher('2089ef65bd0d820cb915', {
      disableStats: true
    });

    //get the URL from get-url.js and send to pop-up.js
    chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log("background page received" + request.message);
      clickedUrl = request.message;
      //send URL to pop-up.js
      chrome.runtime.sendMessage({popMessage: clickedUrl}, function(response) {
         sendResponse({message: "received"});
      });
      var timeNow = new Date().getTime();
      localStorage.setItem("clickedUrl", JSON.stringify({url: clickedUrl, timeNow: timeNow}));
      console.log(localStorage["clickedUrl"]);

      var opt = {
      type: "basic",
      title: "Link Saved!",
      message: "Open Extension to Continue!",
      iconUrl: "job_icon.png",
      };

      chrome.notifications.create( "not"+id++, opt, function(){});
      //open the pop-up page
      // chrome.tabs.create({url:"index.html"});
    });




	  var channel = pusher.subscribe(user_uid);
    channel.bind('jobs_json', function(data) {
    var newBatch = JSON.stringify(data);
    for (var i = 0; i < newBatch.length; i++){
      localStorage["jobs"].push(newBatch[i]);
    }
    //localStorage["jobs"] = JSON.stringify(data);
    console.log("JOBS --" + localStorage["jobs"]);
    // Send post to popup if connected
    if (popupPort) {
      popupPort.postMessage("new data received");
    }

    var item_array = new Array();
    for (var i = 0; i < 10; i++) {
      item_array.push({ title: data[i]['title'], message: ""});
    }
      
    var opt = {
      type: "basic",
      title: "New Jobs Sniped",
      message: "Open Extension to view your new jobs",
      iconUrl: "job_icon.png",
    };

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

