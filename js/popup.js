$(document).ready(function(){
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
    console.log("JOBS --" + localStorage["jobs"]);
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
});



  var posts;
  var port = chrome.extension.connect({name: "Job Hunter Connector"});
  
  document.addEventListener('DOMContentLoaded', function () {
    init();
  });

  var init = function() {
    // posts = document.querySelector(".posts");
    // // Request most recent Product Hunt posts
    // $.getJSON("http://realtime-producthunt.herokuapp.com/posts?" + Date.now(), function(posts) {
    // // Reverse posts
    // posts.reverse();

    // for (var i = 0; i < posts.length; i++) {
    //   addPost(posts[i]);
    //   };
    // });

    // // Listen for realtime updates from background process
    port.onMessage.addListener(function(post) {
      console.log("+++ MESAGE RECEIVED +++");
      //addPost(post);
    });
  };

  var addPost = function(post) {
  var postDOM = document.createElement("div"); 
    postDOM.classList.add("post");

    postDOM.innerHTML += "<h2><a href='" + post.discussion_url + "' target='_blank'>" + post.name + "</a></h2>";
    postDOM.innerHTML += "<p>" + post.tagline + "</p>";
    postDOM.innerHTML += "<span class='avatar'><img src='" + post.user.image_url["73px"] + "'></span>";

    posts.insertBefore(postDOM, posts.firstChild);
  }
