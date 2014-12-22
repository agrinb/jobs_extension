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


