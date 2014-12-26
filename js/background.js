
// Run as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  alert( "I'm here");
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



	  var channel = pusher.subscribe('1');
    channel.bind('my_event', function(data) {
    var newBatch = JSON.stringify(data);
    for (var i = 0; i < newBatch.length; i++){
      localStorage["jobs"].push(newBatch[i])
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

