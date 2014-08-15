


$(document).ready(function(){

  // $("#google_login_link").click(
  //     function () {
  //       console.log("Identity:", chrome.identity);
  //       chrome.identity.getAuthToken({ 'interactive': false },function (token) {
  //         alert("back token=" + token);
  //         console.log("Identity:", chrome.identity);
  //       });
  //     });
  var keywords = [];
  $('.log-twitter').on('click', function(event){
    console.log($('#keyword').val());
    console.log(user_uid)
    if($('#keyword').val().length > 2 ){
      keywords.push($('#keyword').val());
      $('#keyword').val("");
      for(i = 0; i <= keywords.length; i++ ){
        var keywordsOnPage = $.map(keywords, function(keyword, index) {
        return $('<p>'+keyword+'</p>')
        })
        $('.keyword-list').html(keywordsOnPage);
      };
    };
  });



  $( ".form-2" ).submit(function( event ) {
  event.preventDefault();
  console.log(keywords)
    var form = $(this);
    $.ajax('/companies', {
      timeout: 3000,
      type: 'POST'
      data: {"uid": user_uid,
              "keywords": keywords,
              "url": tablink };
      success: function(result){
        console.log(result)
        form.remove();
          $.('.api_response').html('<p>Job search saved.</p')
        },
        contentType: 'application/json'
    });
  });
});

