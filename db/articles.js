const db = require('./connect.js');

let getArticles = () => {
  // return savedArticles;
  return db.query('SELECT * FROM articles')
  .catch(error => {
    console.error(error);
  });
};

let newArticle = (request) => {
  let article = {
    title: request.title,
    body: request.body,
    author: request.author,
    urlTitle: encodeURI(request.title)
  };
  return db.query('INSERT INTO articles(title, body, author, url_title) VALUES (${title}, ${body}, ${author}, ${urlTitle})', article)
    .catch(error => {
      console.error(error);
    });
};

let editArticle = (request) => {
  let article = {
    title: request.title,
    body: request.body,
    author: request.author,
    urlTitle: encodeURI(request.title),
    paramTitle: request.paramTitle
  };
  return db.query('UPDATE articles SET title = ${title}, body = ${body}, author = ${author}, url_title = ${urlTitle} WHERE url_title = ${paramTitle}', article);
};

let deleteArticle = (request) => {
  request.title = encodeURI(request.title);
  return db.query('DELETE FROM articles WHERE url_title = ${title}', request);
};

module.exports = {newArticle: newArticle, editArticle: editArticle, getArticles: getArticles, deleteArticle: deleteArticle};