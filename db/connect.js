const Promise = require('bluebird');
const pgp = require('pg-promise')({
  //Initialization options
  promiseLib: Promise
});

const db = pgp('postgres://ape_user:1234@localhost:5432/articles_products_and_express');

module.exports = db;