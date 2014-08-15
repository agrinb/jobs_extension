
//$(document).ready(function(){

  // $("#google_login_link").click(
  //     function () {
  //       console.log("Identity:", chrome.identity);
  //       chrome.identity.getAuthToken({ 'interactive': false },function (token) {
  //         alert("back token=" + token);
  //         console.log("Identity:", chrome.identity);
  //       });
  //     });

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
  $('.log-twitter').on('click', function(event){
    console.log($('#keyword').val());
    console.log(user_uid);
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

  // $( ".form-2" ).submit(function( event ) {
  // event.preventDefault();
  // console.log(keywords);
  // var interactive = true;
  // getUserInfo(interactive);
  // console.log(tablink);
  // console.log(user_uid);
  // console.log(user_email);
  // console.log(keywords);

    /*$.ajax({
      type: "POST",
      url: "http://localhost:3000/companies",
      data: {"uid": user_uid, "keywords": keywords, "url": tablink, "user_email": user_email },
      success: function(result){

      },
      dataType: "application/json"
    });*/
  // });

  $( ".form-2" ).submit(function( event ) {
    event.preventDefault();
    var interactive = true;
    getUserInfo(interactive);


    console.log("------");
    // console.log(getUserInfo(interactive));
    /*user_uid = jQuery.parse(obj).uid;
    user_email = jQuery.parse(obj).email;*/
    console.log("form " + tablink);
    console.log("form " + user_uid);
    console.log("form " + user_email);
    console.log("form " + keywords);

    // $.ajax({
    //   type: "POST",
    //   url: "http://localhost:3000/companies",
    //   data: {uid: user_uid, keywords: keywords, url: tablink, user_email: user_email },
    //   success: function(result){
    //     console.log("++++");
    //     console.log(result);
    //     },
    //   dataType: "application/json"
    // });
  });
//});

