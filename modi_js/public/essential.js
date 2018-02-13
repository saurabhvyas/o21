





$( document ).ready(function() {

  
  function Onsuccess(response) { 
  alert('Everything Good!');
  console.log(response);
  $('#audioelement').attr( 'src', response )
  
  var temp_string = $('#text_body').text().replace($('#selected_text').text(),'');
  
  //console.log(temp_string);
  // removed selected text from text body, as it wont be needed for future use
  $('#text_body').text(temp_string);


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
  var temp_string = $('#text_body').text().replace($('#selected_text').text(),'');
  
  console.log(temp_string);
  // removed selected text from text body, as it wont be needed for future use
  $('#text_body').text(temp_string);

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

