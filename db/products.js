const db = require('./connect.js');

let getProducts = () => {
  return db.query('SELECT * FROM products')
    .catch(error => {
      console.error(error);
    });
};

let newProduct = (request) => {
  let product = {
    name: request.name,
    price: request.price,
    inventory: request.inventory,
  };
  return db.query('INSERT INTO products (name, price, inventory) VALUES (${name}, ${price}, ${inventory})', product)
    .catch(error => {
      console.error(error);
    });
};

let editProduct = (request) => {
  let newProduct = {
    name: request.name,
    price: request.price,
    inventory: request.inventory
  };
  return db.query('UPDATE products SET name = ${name}, price = ${price}, inventory = ${inventory}', newProduct);
};

let deleteProduct = (request) => {
  return db.query('DELETE FROM products WHERE id = ${paramID}', request);
};

module.exports = {newProduct: newProduct, editProduct: editProduct, deleteProduct: deleteProduct, getProducts: getProducts};