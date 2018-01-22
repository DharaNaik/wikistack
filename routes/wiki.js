
const express = require('express');
const router = express.Router();
const models = require('../models');

let Page = models.Page;
let User = models.User;

function generateUrlTitle (title) {
    if (title) {
      // Removes all non-alphanumeric characters from title And make whitespace underscore
      return title.replace(/\s+/g, '_').replace(/\W/g, '');
    } else {
      // Generates random 5 letter string
      return Math.random().toString(36).substring(2, 7);
    }
  }

router.get('/', function(req, res,next){
    console.log("This is get req",req.body);
    res.redirect('/');
});

router.post('/', function(req, res, next){
    let page = Page.build({
        title: req.body.title,
        urlTitle: generateUrlTitle(req.body.title),
        status: req.body.status,
        content: req.body.content
    })

    page.save()
    .then(function(savedPage){
        res.redirect(savedPage.route);
    }).catch(next);
});

router.get('/add', function(req, res, next){
    res.render('addpage');
});

router.get('/:urlTitle', function(req, res, next){
    Page.findOne({
        where: {
            urlTitle: req.params.urlTitle
        }
    })
    .then(function(foundPage){
        res.json(foundPage);
    })
    .catch(next);
});


module.exports = router;