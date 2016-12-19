var port = 3000;
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');

var index = require('./routes/home');
var parsing = require('./routes/parsing');
var app = express();

app.use(morgan('dev'));

//Views
app.set('views',path.join(__dirname,'client','views'));
app.set('veiw engine','ejs');
app.engine('html',require('ejs').renderFile);

app.use(express.static(path.join(__dirname,'client')));

//Body Parser MW
app.set(bodyParser.json());
app.set(bodyParser.urlencoded({extended:true}));

app.use('/',index);
app.use('/parser',parsing);

app.listen(port);
