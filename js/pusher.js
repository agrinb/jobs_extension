  var pusher = new Pusher('100611');

  var channel = pusher.subscribe('jobs-channel');

  channel.bind('my-event', function(data) {
    alert('An event was triggered with message: ' + data.message);
  });



