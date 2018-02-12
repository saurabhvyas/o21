const express = require('express')
const app = express()
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');


app.use(express.static('public'))
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs')

modi_text='test'

function read(file, callback) {
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
            console.log(err);
        }
        callback(data);
    });
}

var output = read('public/modi.txt', function(data) {
    modi_text=data;

});


// create a list of all modi audio file names ( not full paths)
// note : by default returns file names in random order, I need chronological order

audio_file_names=[];
input_audio_dir='public/modi_data/'

fs.readdir( input_audio_dir, function(err, items) {
    
   audio_file_names=items;

   console.log(audio_file_names[20]);


   // sort files in chronological order

   audio_file_names.sort(function(a, b) {
               return fs.statSync(input_audio_dir + a).mtime.getTime() - 
                      fs.statSync(input_audio_dir + b).mtime.getTime();
           });

   console.log(audio_file_names[20]);
 

   
});



app.get('/', function(req, res ) { 

 res.render('main', {  body: modi_text , audio_file_name: 'modi_data/' + audio_file_names[0]}

)}
)

app.post('/', function(req, res ) {

  console.log(req.body);

  // write received text as a transcription txt file in destination folder
   fs.writeFile('public/final_modi_data/2pac.txt', lyrics, (err) => {  
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('Transcripton file saved!');
});



  //res.render('main', { body: modi_text,  audio_file_name:'a.wav'}
  res.send('a.wav');

}


)

//app.get('/nextaudio', (req, res ) =>  res.render('main', {  audio_file_name: 'b.wav' })



app.listen(3000, () => console.log('Example app listening on port 3000!'))
