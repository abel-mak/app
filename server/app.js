const express      = require('express');
const router       = require('./routes');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const app          = express();
const path         = require('path');

app.set('views', path.join(__dirname, "./views"));
app.set('view engine', 'ejs');

app.use(bodyParser.json());

//app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());

app.use(router);

app.use(express.static(path.join(__dirname, "./static")));

app.listen(3000, () => console.log('listen on 3000'));

module.exports = app;
