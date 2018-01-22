const express = require('express');
const router = express.Router();


router.get('/', function(req, res){
    console.log("in the get function");
    res.redirect('/');
});

router.post('/', function(req, res){
    res.send('Howdy~');
});

router.get('/add', function(req, res){
    console.log("test");
    res.render('addpage');
});
