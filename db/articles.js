let savedArticles = [];

let getArticles = () => {
  return savedArticles;
};
let newArticle = (request) => {
  let article = {
    title: request.title,
    body: request.body,
    author: request.author,
    urlTitle: encodeURI(request.title)
  };
  savedArticles.push(article);
  return true;
};

let editArticle = (request) => {
  console.log('hit edit');
  let foundArticle = false;
  savedArticles = savedArticles.map((article) => {
    if(article.title.toString() === request.paramTitle){
      let newArticle = {
        title: request.title,
        body: request.body,
        author: request.author,
        urlTitle: encodeURI(request.title)
      };
      foundArticle = true;
      return newArticle;
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

module.exports = {newArticle: newArticle, editArticle: editArticle, getArticles: getArticles};