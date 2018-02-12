const express = require('express')
const app = express()
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');


app.use(express.static('public'))
app.use(bodyParser.raw());

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

app.get('/', (req, res ) =>  res.render('main', {  body: modi_text , audio_file_name:'a.wav'})
)

app.post('/', function(req, res ) {

  console.log(req.body);

  //res.render('main', { body: modi_text,  audio_file_name:'a.wav'}
  res.send('a.wav');

}


)

//app.get('/nextaudio', (req, res ) =>  res.render('main', {  audio_file_name: 'b.wav' })



app.listen(3000, () => console.log('Example app listening on port 3000!'))
