const express = require('express');
const router = express.Router();
const articleIndexFunction = require('./indexgenerator.js');
const getArticle = require('./getitem.js');
const articleDb = require('../db/articles.js');

router.route('/')
  .get((req, res) => {
    let articles = articleIndexFunction('Articles')
    .then(data => {
      res.render('index', {
        title: 'Articles',
        items: data,
        type: '/articles',
        edit: data[0].edit
      });
    });
  })

  .post((req, res) => {
    articleDb.newArticle(req.body)
    .then(() => {
      res.send({"success": true});
    });
  });

router.route('/:title')
  .put((req, res) => {
    req.body.paramTitle = req.params.title;
    articleDb.editArticle(req.body)
    .then(() => {
      res.send({ "success": true});
    });
  })

  .delete((req, res) => {
    articleDb.deleteArticle(req.params)
    .then(()=>{
      res.send({"success": true});
    });
  });

  router.route('/:title/edit')
    .get((req,res) => {
      articleDb.getArticles()
      .then( data => {
        selectedArticle = getArticle('Article', data, req.params.title);
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