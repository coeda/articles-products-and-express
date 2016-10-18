const Promise = require('bluebird');
const pgp = require('pg-promise')({
  //Initialization options
  promiseLib: Promise
});

const db = pgp('postgres://ape_user:1234@localhost:5432/articles_products_and_express');

let newArticle = {
  title: 'My Third Article',
  body: 'Stuff Stuff Stuff',
  author: 'Casey',
  url_title: 'My%20Third%20Article'
};

//query('INSERT INTO $1~($2~) VALUES(...)',[...]);

db.query('INSERT INTO articles (title, body, author, url_title) VALUES (${title}, ${body}, ${author}, ${url_title})', newArticle)
.then(console.log)
.catch((error) =>{
  console.error(error);
});

db.query('SELECT * FROM articles')
.then(articles => {
  console.log(articles);
})
.catch((err) => {
  console.error(err);
});