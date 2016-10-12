    let editable = true;
    let edit = '/edit';
    let getInfo = (type, arr) => {
      let onlyTitle = arr.map((item) => {
        let returnedItem = {
          title: item.title,
          urlTitle: item.urlTitle
        };
        return returnedItem;
      });
      if(onlyTitle.length === 0){
        onlyTitle.push({
          title: `There are no ${type} available, create new ${type}`,
          urlTitle: ''
        });
        editable = false;
      }
      if(!editable){
        edit = '/new';
      }
    return onlyTitle;
    };


module.exports = {getInfo: getInfo, edit: edit};