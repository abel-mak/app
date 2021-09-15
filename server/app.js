const express      = require('express');
const router       = require('./routes');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const app          = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());

app.use(router);


app.listen(3000, () => console.log('listen on 3000'));
