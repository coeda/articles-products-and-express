const express = require('express');
const router = express.Router();
let savedArticles = [];

router.route('/')
  .get((req, res) => {
    //Get stuff

  })

  .post((req, res) => {
    //post stuff
    let article = {
      title: req.body.title,
      body: req.body.body,
      author: req.body.author,
      urlTitle: encodeURI(req.body.title)
    };
    savedArticles.push(article);
    console.log(savedArticles);
    res.send({"success": 'true'});
  });

router.route('/:title')
  .put((req, res) => {
    //put
    let foundArticle = false;
    let newSavedArticles = savedArticles.map((article) => {
      if(article.title.toString() === req.params.title){
        let newArticle = {
          title: req.body.title,
          body: req.body.body,
          author: req.body.author,
          urlTitle: encodeURI(req.body.title)
        };
        foundArticle = true;
        return newArticle;
      } else {
        return article;
      }
    });
    if(foundArticle){
      savedArticles = newSavedArticles;
    }
    res.send({ "success": foundArticle});


  })

  .delete((req, res) => {
    //delete
    let foundArticle = false;
    let newSavedArticles = savedArticles.filter((article) => {
      if(article.title.toString() !== req.params.title){
        return article;
      } else {
        foundProduct = true;
      }
    });
    if(foundProduct === true){
      console.log(newSavedArticles);
      savedArticles = newSavedArticles;
    }
    res.send({"success": foundArticle});
  });

  router.route('/:title/edit')
    .get((req,res) => {
      let selectedArticle = savedArticles.filter((article) => {
        if(article.title.toString() === req.params.title){
          return article;
        }
      })[0];
      res.render('edit', {
        location: 'articles',
        param1: 'title',
        param2: 'body',
        param3: 'author',
        id: req.params.title,
        subParam1: selectedArticle.title,
        subParam2: selectedArticle.body,
        subParam3: selectedArticle.author
      });
    });

  router.route('/new')
    .get((req,res) => {
      res.render('new', {
        location: 'articles',
        param1: 'title',
        param2: 'body',
        param3: 'author',
      });
    });

  module.exports = router;