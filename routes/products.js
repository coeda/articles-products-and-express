const express = require('express');
const router = express.Router();
const productIndexFunction = require('./indexgenerator.js');
const getProduct = require('./getitem.js');
const productDb = require('../db/products.js');

router.route('/')
  .get((req, res) => {
    let products = productIndexFunction('Products', productDb.savedProducts);
    res.render('index', {
      title: 'Products',
      items: products,
      type: '/products',
      edit: products[0].edit
    });
  })

  .post((req, res) => {
    let pass = productDb.newProduct(req.body);
    res.send({ "success": pass});
  });

router.route('/:id')
  .put((req, res) => {
    req.body.paramId = req.params.id;
    let success = productDb.editProduct(req.body);
    res.send({ "success": success});
  })

  .delete((req, res) => {
    let foundProduct = false;
    let newSavedProducts = savedProducts.filter((product) => {
      if(product.id.toString() !== req.params.id){
        return product;
      } else {
        foundProduct = true;
      }
    });
    if(foundProduct === true){
      console.log(newSavedProducts);
      savedProducts = newSavedProducts;
    }
    res.send({"success": foundProduct});
  });

router.route('/:id/edit')
  .get((req, res) => {
    selectedProduct = getProduct('Product', productDb.savedProducts, req.params.id);
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

router.route('/new')
  .get((req,res) => {
    res.render('new', {
      location: 'products',
      param1: 'name',
      param2: 'price',
      param3: 'inventory',
      id: productDb.productId,
    });
  });

  module.exports = router;