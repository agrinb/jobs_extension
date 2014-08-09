var Keywords = [];

$(document).ready(function(){
  $('.log-twitter').on('click', function(event){
    console.log($('#keyword').val());
    if($('#keyword').val().length > 2 ){
      Keywords.push($('#keyword').val())
    };
  });

  while (Keywords > 0) {
    var KeywordsOnPage = $.map(Keywords, function( keyword, index) {
      return $('<li>keyword</li>')
    })
    $('.keyword-list').find('ul').html(KeywordsOnPage);
  };
});

