let getItem = (type, arr, param) =>{
  let title;
  let selectedItem = arr.filter((item) => {
    if(type === 'Article'){
      title = item.title.toString();
    } else if(type === 'Product') {
      title = item.id.toString();
    }
    if(title === param){
      return item;
    }
  })[0];
  return selectedItem;
};

module.exports = getItem;