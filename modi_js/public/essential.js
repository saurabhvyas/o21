





$( document ).ready(function() {

   function create_post_request() {
  //ChromeSamples.log('Posting request to GitHub API...');
  fetch('/', {
    method: 'post',
    body: $('#selected_text').text()
  }).then(function(response) {
    return response.text();
  }).then(function(data) {
    //ChromeSamples.log('Created Gist:', data.html_url);
     console.log(data);

  });
}




    console.log( "jquery ready!" );


  $('#submit_text').on('click', function()
   
{ 

create_post_request()

}


);

  $('#text_body').on('click', function(){

    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }

    //alert(text);  
    console.log(text);
    $('#selected_text').text(text);

     
});
    
    


});

