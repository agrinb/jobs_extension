$(document).ready(function(){
   $('body').on('click', 'a', function(){
     chrome.tabs.create({url: $(this).attr('href')});
     return false;
   });


  var tablink = null;

  function showTabURL(){
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
         $('.tab_url').html(tabs[0].url);
         console.log(tabs[0].url);
         tablink = tabs[0].url;
      });
  }

  showTabURL();


  var keywords = [];
  $('.add-btn').on('click', function(event){
    if($('#keyword').val().length > 2 ){
      keywords.push($('#keyword').val());
      $('#keyword').val("");
      for(i = 0; i <= keywords.length; i++ ){
        var keywordsOnPage = $.map(keywords, function(keyword, index) {
        return $('<p>'+keyword+'</p>');
        })
        $('.keyword-list').html(keywordsOnPage);
      };
    };
  });



  $( ".form-2" ).submit(function( event ) {
    event.preventDefault();
    var interactive = true;
    getUserInfo(interactive);
  });

  // Enable pusher logging - don't include this in production
  Pusher.log = function(message) {
    if (window.console && window.console.log) {
      window.console.log(message);
    }
  };

  var pusher = new Pusher('2089ef65bd0d820cb915');
  var channel = pusher.subscribe('1');
  channel.bind('my_event', function(data) {
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
  

   // processJobs(data);
    chrome.notifications.onButtonClicked.addListener(viewBtnClick);
    chrome.notifications.onButtonClicked.addListener(closeBtnClick);
    chrome.notifications.create("job-alert", opt, function(){});
  });

  function viewBtnClick(){};
  function closeBtnClick(){};

  // function processJobs(data){
  //   var list = $("<ul></ul>");
  //   for (var i = 0; i < data.length; i++) {
  //     var title = data[i]['title'];
  //     var url = data[i]['url'];
  //     var li = "<li><a href="+url+">"+title+"</a></li>";
  //     list = list.append(li);
  //   }
  //   buildJobResults(list);
  // };

  // function buildJobResults(list){
  //   $('form').remove('.form-2');
  //   $('.main').append(list);
  //   $( "ul" ).addClass("job-list");
  //   $('.job-list').find('li').addClass("job");
  // };


/////////////////// chrome notification ////////////////////////////
  
});


