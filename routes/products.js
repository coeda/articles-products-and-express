const express = require('express');
const router = express.Router();
let savedProducts = [];
let productId = 0;

router.route('/')
  .get((req, res) => {
    res.render('index', {
      title: 'Products'
    });
  })

  .post((req, res) => {
    let product = {
      id: productId,
      name: req.body.name,
      price: req.body.price,
      inventory: req.body.inventory
    };
    savedProducts.push(product);
    productId += 1;
    console.log(savedProducts);
    res.send({ "success": 'true'});
  });

router.route('/:id')
  .put((req, res) => {
    let foundProduct = false;
    let newSavedProducts = savedProducts.map((product) => {
      if(product.id.toString() === req.params.id){
        let newProduct = {
          id: req.params.id,
          name: req.body.name,
          price: req.body.price,
          inventory: req.body.inventory
        };
        foundProduct = true;
        return newProduct;
      } else {
        return product;
      }
    });
    if(foundProduct){
      savedProducts = newSavedProducts;
    }
    res.send({ "success": foundProduct});

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
    //do get stuff
    let selectedProduct = savedProducts.filter((product) => {
      if(product.id.toString() === req.params.id){
        return product;
      }
    })[0];
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
      id: productId,
    });
  });

  module.exports = router;