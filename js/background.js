
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


    if (localStorage.getItem("userUID") !== null) {
      var userUID = JSON.parse(localStorage.getItem("userUID"))['id'];
    }

	  var channel = pusher.subscribe(userUID);
    channel.bind('jobs_json', function(data) {
      var newBatch = JSON.stringify(data);
      localStorage.setItem("jobs", newBatch)
    
    // if (popupPort) {
    //   popupPort.postMessage("jobs received");
    // }

    // var item_array = new Array();
    // for (var i = 0; i < 10; i++) {
    //   item_array.push({ title: newBatch[i]['title'], message: ""});
    // }
      
    var opt = {
      type: "basic",
      title: "New Jobs Sniped",
      message: "Open Extension to view your new jobs",
      iconUrl: "job_icon.png",
    };

    chrome.notifications.create( "not"+id++, opt, function(){});
  });

// Enable Pusher logging - don't include this in production
Pusher.log = function(message) {
  if (window.console && window.console.log) {
    window.console.log(message);
  }
};

