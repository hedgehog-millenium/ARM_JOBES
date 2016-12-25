var port = 3000,
    express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    path = require('path'),

    index = require('./routes/home'),
    parsing = require('./routes/parsing'),
    helper = require('./routes/helper'),
    proxyHelper = require('./routes/proxyHelper'),

    app = express();

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
app.use('/proxyHelper',proxyHelper);
app.use('/helper',helper);

app.listen(port);
