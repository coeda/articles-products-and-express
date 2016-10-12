let savedProducts = [];

let newProduct = (request) => {
  let product = {
    title: request.title,
    body: request.body,
    author: request.author,
    urlTitle: encodeURI(request.title)
  };
  savedProducts.push(product);
  return true;
};

let editArticle = (request) => {
  console.log('hit edit');
  let foundArticle = false;
  savedArticles = savedArticles.map((article) => {
    if(article.title.toString() === request.paramTitle){
      let newProduct = {
        title: request.title,
        body: request.body,
        author: request.author,
        urlTitle: encodeURI(request.title)
      };
      foundArticle = true;
      return newProduct;
    } else {
      return article;
    }
  });
  console.log('savedArticles: ' + savedArticles);
  return savedArticles;
};

let deleteArticle = (request) => {
  let foundArticle = false;
  let newSavedArticles = savedArticles.filter((article) => {
    if(article.title.toString() !== request.title){
      return article;
    } else {
      foundProduct = true;
    }
  });
  if(foundProduct === true){
    savedArticles = newSavedArticles;
  }
  return foundArticle;
};

module.exports = {newProduct: newProduct, editArticle: editArticle, savedArticles: savedArticles};