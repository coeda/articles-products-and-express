let savedProducts = [];
let productId = 0;

let getProducts = () => {
  return savedProducts;
};

let getProductId = () => {
  return productId;
};

let newProduct = (request) => {
  let product = {
    name: request.name,
    price: request.price,
    inventory: request.inventory,
    id: productId
  };
  savedProducts.push(product);
  productId += 1;
  return true;
};

let editProduct = (request) => {
  console.log('hit edit');
  let foundProduct = false;
  savedProducts = savedProducts.map((product) => {
    if(product.id.toString() === request.paramId){
      let newProduct = {
        name: request.name,
        price: request.price,
        inventory: request.inventory,
        id: request.paramId,
      };
      foundProduct = true;
      return newProduct;
    } else {
      return product;
    }
  });
  return foundProduct;
};

let deleteProduct = (request) => {
  let foundProduct = false;
  let newSavedProducts = savedProducts.filter((product) => {
    if(product.id.toString() !== request.paramId){
      return product;
    } else {
      foundProduct = true;
    }
  });
  if(foundProduct === true){
    savedProducts = newSavedProducts;
  }
  return foundProduct;
};

module.exports = {newProduct: newProduct, editProduct: editProduct, deleteProduct: deleteProduct, getProducts: getProducts, getProductId:getProductId};