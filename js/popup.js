var keywords = [];
var tabUrl;


function signinCallback(authResult) {
  if (authResult['status']['signed_in']) {
    //console.log("ran");
    // console.log(authResult['status']);
    document.getElementById('signinButton').setAttribute('style', 'display: none');
    init();
  } else {
    // Update the app to reflect a signed out user
    // Possible error values:
    //   "user_signed_out" - User is signed-out
    //   "access_denied" - User denied access to your app
    //   "immediate_failed" - Could not automatically log in the user
    console.log('Sign-in state: ' + authResult['error']);
  }
}


function showTabURL(){
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    $('.tab_url').html(tabs[0].url.split("/")[2]);
    tabUrl = tabs[0].url;
  });
}  

showTabURL();




var kState = 0;

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



  function showKeywords(){
    for(i = 0; i <= keywords.length; i++ ){
      var keywordsOnPage = $.map(keywords, function(keyword, index) {
      return $('<li class="keyword">'+keyword+'</li>');
      })
      $('.keyword-list').html(keywordsOnPage);
    };
  }
 

  $(".form-2").submit(function( event ) {
    event.preventDefault();
    var interactive = true;
    getUserInfo(interactive);
  });  


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
   
  };

  var addListings = function(listing) {    
    var listingDOM = document.createElement("div");
    debugger;
    var source = listing['url'].split("/")[2];
  //var listings = [];
    listingDOM.classList.add("listing");
    listingDOM.innerHTML += "<h2><a href='" + listing['url'] + "' target='_blank'>" + listing['title'] + "</a></h2>";
    listingDOM.innerHTML += "<p class=\"source-site\">" + source + "</p>";
    listingDOM.innerHTML += "<span class=\"bullet\"><i class=\"fa fa-paper-plane-o\"></i></span>";
    listings.insertBefore(listingDOM, listings.firstChild);
  }

  chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
      if (msg.note == "no new jobs") {
       // alert("Hoorah");
      } 
    });
  });

