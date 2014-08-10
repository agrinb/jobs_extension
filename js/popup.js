var Keywords = [];


$(document).ready(function(){
   $('form').on('submit',function(event){
    event.preventDefault();
   });

   chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    console.log(tabs[0].url);
    console.log(tabs[0].url);
    console.log(tabs[0].url);
    });


    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
         $('.tab_url').html(tabs[0].url);
      });

    var tab_url = $('.tab_url').find('p').text
      console.log(tab_url)

  $('.log-twitter').on('click', function(event){
    console.log($('#keyword').val());
    if($('#keyword').val().length > 2 ){
      Keywords.push($('#keyword').val());
      $('#keyword').val("");
      for(i = 0; i <= Keywords.length; i++ ){
        var KeywordsOnPage = $.map(Keywords, function(keyword, index) {
        return $('<p>'+keyword+'</p>')
        })
        $('.keyword-list').html(KeywordsOnPage);
      };
    };
  });
});

