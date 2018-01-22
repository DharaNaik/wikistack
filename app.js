
const morgan = require('morgan');
const express = require('express');
const path = require('path');
const app = express()
const router = require('./routes')

const bodyparser = require('body-parser');
const nunjucks = require('nunjucks');
const models = require('./models');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'/public')));

var env = nunjucks.configure('views',{noCache : true} );
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended : true
}))

// this drops all tables then recreates them based on our JS definitions
// models.db.sync({force: true})


app.use('/',router);

models.db.sync({})
    .then(function(){
        app.listen(3000);
    })
    .catch(console.error);




