const express = require('express');
const router = express.Router();
const articleIndexFunction = require('./indexgenerator.js');
const getArticle = require('./getitem.js');
const articleDb = require('../db/articles.js');

router.route('/')
  .get((req, res) => {
    console.log(articleDb.savedArticles);
    let articles = articleIndexFunction('Articles', articleDb.savedArticles);
    res.render('index', {
      title: 'Articles',
      items: articles,
      type: '/articles',
      edit: articles[0].edit
    });
  })

  .post((req, res) => {
    let pass = articleDb.newArticle(req.body);
    res.send({"success": pass});
  });

router.route('/:title')
  .put((req, res) => {
    req.body.paramTitle = req.params.title;
    let success = articleDb.editArticle(req.body);
    console.log(success);
    console.log('articleDB: ' + articleDb.savedArticles);
    res.send({ "success": success});
  })

  .delete((req, res) => {
    let success = articleDb.deleteArticle(req.params);
    res.send({"success": success});
  });

  router.route('/:title/edit')
    .get((req,res) => {
      selectedArticle = getArticle('Article', articleDb.savedArticles, req.params.title);
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