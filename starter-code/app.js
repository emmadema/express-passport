var express      = require('express');
var app          = express();
var mongoose     = require('mongoose');
var passport     = require('passport');
var flash        = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

mongoose.connect('mongodb://localhost/local-authentication-with-passport'); 

app.use(morgan('dev')); 
app.use(cookieParser());
app.use(bodyParser()); 

app.set('views', './views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'WDI-GENERAL-ASSEMBLY-EXPRESS' })); 
//inialize passport
app.use(passport.initialize());
//sessions
app.use(passport.session()); 
//flash messgaes
app.use(flash()); 

//keep above routes
//require file config passport and pass in passport package
require('./config/passport')(passport);

var routes = require('./config/routes');
app.use(routes);

app.listen(3000);