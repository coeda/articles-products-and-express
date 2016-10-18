const express = require('express');
const router = express.Router();
const productIndexFunction = require('./indexgenerator.js');
const getProduct = require('./getitem.js');
const productDb = require('../db/products.js');

router.route('/')
  .get((req, res) => {
    let products = productIndexFunction('Products')
    .then(data => {
      res.render('index', {
        title: 'Products',
        items: data,
        type: '/products',
        edit: data[0].edit
      });
    });
  })

  .post((req, res) => {
    productDb.newProduct(req.body)
    .then(() => {
      res.send({ "success": true});
    })
    .catch(error => {
      res.send({ "success" : false});
    });

  });

router.route('/:id')
  .put((req, res) => {
    req.body.paramId = req.params.id;
    productDb.editProduct(req.body)
    .then(() => {
      res.send({ "success": true});
    });
  })

  .delete((req, res) => {
    req.body.paramId = req.params.id;
    let foundProduct = productDb.deleteProduct(req.body);
    res.send({"success": foundProduct});

    productDb.deleteProduct(req.params)
      .then(() => {
        res.send({"success" : false});
      });
  });

router.route('/:id/edit')
  .get((req, res) => {
    productDb.getProducts()
    .then( data => {
      selectedProduct = getProduct('Product', data, req.params.id);
      res.render('edit', {
        location: 'products',
        param1: 'name',
        param2: 'price',
        param3: 'inventory',
        id: req.params.id,
        subParam1: selectedProduct.name,
        subParam2: selectedProduct.price,
        subParam3: selectedProduct.inventory
      });
    });
  });

router.route('/new')
  .get((req,res) => {
    res.render('new', {
      location: 'products',
      param1: 'name',
      param2: 'price',
      param3: 'inventory'
    });
  });

  module.exports = router;