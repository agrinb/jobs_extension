$(document).ready(function(){
  var tablink = null;

  function showTabURL(){
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
         $('.tab_url').html(tabs[0].url);
         console.log(tabs[0].url);
         tablink = tabs[0].url;
      });
  }

  showTabURL


  var keywords = [];
  $('.add-btn').on('click', function(event){
    if($('#keyword').val().length > 2 ){
      keywords.push($('#keyword').val());
      $('#keyword').val("");
    }
    if(keywords.length == 1){
      $('.listings').slideToggle(400, function(){
      showKeywords();
      })
    } else {
      showKeywords();
    }
      // if($('#keyword').val().length > 2 ){
      //   keywords.push($('#keyword').val());
      //   $('#keyword').val("");
      //   for(i = 0; i <= keywords.length; i++ ){
      //     var keywordsOnPage = $.map(keywords, function(keyword, index) {
      //     return $('<li class="keyword">'+keyword+'</li>');
      //     })
      //     $('.keyword-list').html(keywordsOnPage);
      //   };
      // };
  });

  function showKeywords(){
    for(i = 0; i <= keywords.length; i++ ){
      var keywordsOnPage = $.map(keywords, function(keyword, index) {
      return $('<li class="keyword">'+keyword+'</li>');
      })
      $('.keyword-list').html(keywordsOnPage);
    };
  }
 

  $( ".form-2" ).submit(function( event ) {
    event.preventDefault();
    var interactive = true;
    getUserInfo(interactive);
  });  
});



  var port = chrome.extension.connect({name: "Job Hunter Connector"});
  
  document.addEventListener('DOMContentLoaded', function () {
    init();
  });

  var init = function() {
    listings = document.querySelector(".listings");
      if (localStorage.getItem("jobs") === null) {
        //...
      } else {
        var localListings = JSON.parse(localStorage["jobs"]);
        for (var i = 0; i < 10; i++) {
          addListings(localListings[i]);
        };
      }
    // $.getJSON("http://realtime-producthunt.herokuapp.com/posts?" + Date.now(), function(posts) {
    // // Reverse posts
    // posts.reverse();
      
    // });

    // // Listen for realtime updates from background process
    port.onMessage.addListener(function(post) {
      console.log("+++ MESAGE RECEIVED +++");
      //addPost(post);
    });
  };

  var addListings = function(listing) {    
    var listingDOM = document.createElement("div");
    var source = listing['url'].split("/")[2];
  //var listings = [];
    listingDOM.classList.add("listing");
    listingDOM.innerHTML += "<h2><a href='" + listing['url'] + "' target='_blank'>" + listing['title'] + "</a></h2>";
    listingDOM.innerHTML += "<p class=\"source-site\">" + source + "</p>";
    listingDOM.innerHTML += "<span class=\"bullet\"><i class=\"fa fa-paper-plane-o\"></i></span>";
    listings.insertBefore(listingDOM, listings.firstChild);
  }
