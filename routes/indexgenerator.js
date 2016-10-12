let getInfo = (type, arr) => {
  let onlyTitle = arr.map((item) => {
    let title;
    let urlTitle;
    if (type === 'Articles'){
      title = item.title;
      urlTitle = item.urlTitle;
    } else if(type === 'Products'){
      title = item.name;
      urlTitle = item.id;
    }
    let returnedItem = {
      title: title,
      urlTitle: urlTitle,
      edit: '/edit'
    };

    return returnedItem;
   });

  if(onlyTitle.length === 0 || onlyTitle === undefined){
    onlyTitle.push({
      title: `There are no ${type} available, create new ${type}`,
      urlTitle: '',
      edit: 'new'
    });
  }
  console.log('hit index generator');
return onlyTitle;
};


module.exports = getInfo;