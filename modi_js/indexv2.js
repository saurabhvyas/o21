const express = require('express')
const app = express()
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');


app.use(express.static('public'))
app.use(bodyParser.text());
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
output_audio_dir='public/final_modi_data/'
iterator=0;

// this will hold last saved transcription when user resumes operation
last_transcription=''




if(process.argv[2]==='resume') {

console.log('resuming from last data point');

fs.readdir( output_audio_dir, function(err, items) {
    
    // sort files in chronological order

   items.sort(function(a, b) {
               return fs.statSync(output_audio_dir + a).mtime.getTime() - 
                      fs.statSync(output_audio_dir + b).mtime.getTime();
           });
 
   
  // console.log(items);
   
// get the last latest file's id
   iterator=items[items.length -1 ].match(/\d+/)[0]
   console.log('resuming from ' + iterator);

 
fs.readFile(output_audio_dir + 'modi_' + iterator + '.txt', 'utf8', (e, data) => {
    if (e) throw e;
    console.log(data);
    last_transcription=data;
    iterator=iterator++; // advance iterator since we need element after currently saved last element
    //console.log(iterator);
    
});
  

   
});

}



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

 res.render('main', {  body: modi_text , audio_file_name: 'modi_data/' + audio_file_names[iterator], last_transcription:last_transcription}

)}
)

app.post('/', function(req, res ) {

  console.log(req.body);
  iterator=iterator+1;
  console.log(' iterator : ' + iterator);


  // write received text as a transcription txt file in destination folder
   output_file_name='public/final_modi_data/modi_' + iterator 
   
   fs.writeFile(output_file_name + '.txt', String(req.body), (err) => {  
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('Transcripton file saved!');
});

  // copy current audio wav file to destination folder
   input_file_name='public/modi_data/modi_' + iterator + '.wav'
   fs.createReadStream(input_file_name).pipe(fs.createWriteStream(output_file_name + '.wav'));


  //res.render('main', { body: modi_text,  audio_file_name:'a.wav'}
  res.send('modi_data/' + audio_file_names[iterator]);

}


)

//app.get('/nextaudio', (req, res ) =>  res.render('main', {  audio_file_name: 'b.wav' })



app.listen(3000, () => console.log('Example app listening on port 3000!'))
