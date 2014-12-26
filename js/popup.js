$(document).ready(function(){
  var tablink = null;

  function showTabURL(){
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
      $('.tab_url').html(tabs[0].url.split("/")[2]);
      tablink = tabs[0].url;
    });
  }  

  showTabURL();


  //chrome.tabs.executeScript(null, {file: "js/get-url.js"});

  chrome.tabs.executeScript(null, { file: "js/jquery-2.1.1.min.js" }, function() {
    chrome.tabs.executeScript(null, { file: "js/get-url.js" });
  });




  var kState = 0;
  var keywords = [];
  $('.add-btn').on('click', function(event){
    var inputString = $('#keyword').val()
    if(inputString.length > 2 ){
    //if($('#keyword').val().length > 2 ){
      if(inputString.indexOf(',') === -1){
        keywords.push($('#keyword').val());
        $('#keyword').val("");
      } else {
        var newKeywords = inputString.split(",");
        for (var i = 0; i < newKeywords.length; i++){ 
          keywords.push(newKeywords[i]);
        }
      }
    } else {
      var runOnce;
      var once = function(){
        if (!runOnce){
          $('<p class="error">Keywords must be at least 2 characters long<p>').insertAfter(".keyword-list");
     // $('.form-2 input[type=text]').addClass("input-error");
          runOnce = true;
        }
      }();
    }
    if(kState == 0 && keywords.length > 0){
      $('#listing-head').remove();
      $('.listings').slideToggle(400, function(){
      showKeywords();
      kState = 1;
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
        //content here
      } else {
       //$('#listing-head').text("Available Positions:")
        var localListings = JSON.parse(localStorage["jobs"]);
        localListings.reverse();
        for (var i = 0; i < 10; i++) {
          addListings(localListings[i]);
        };
        var availablePos = document.querySelector("#listing-head");
        availablePos.innerHTML += "<span>Available Positions:</span>";
        listings.insertBefore(availablePos, listings.firstChild);
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
