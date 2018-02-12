





$( document ).ready(function() {

  function Onsuccess(response) { 
  console.log(response);
  $('#audioelement').attr( 'src', response )

var audio_element = document.getElementById('audioparent');

audio_element.load(); //call this to just preload the audio without playing
audio_element.play(); //call this to play the song right away

}

   function create_post_request_jquery() {


  
$.ajax({
  type: "POST",
  url: '/',
  data: $('#selected_text').text(),
  success: Onsuccess,
  contentType:'text/plain'
});


  }

   function create_post_request() {

  console.log($('#selected_text').text());
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

create_post_request_jquery()

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

