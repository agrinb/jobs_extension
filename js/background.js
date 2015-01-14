
   
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
      if (data['status'] === "false") {
        var port = chrome.runtime.connect({name: "jobnotice"});
        port.postMessage({note: "no new jobs"});
        //console.log("connecting");
      } else {
        var newBatch = JSON.stringify(data);
        localStorage.setItem("jobs", newBatch)
      }

      
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

