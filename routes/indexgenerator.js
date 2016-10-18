const db = require('../db/connect.js');

let getInfo = (type, arr) => {
  type = type.toLowerCase();
  return db.query(`SELECT * FROM ${type}`)
    .then(data => {
      let onlyTitle = data.map((item) => {
        let title;
        let urlTitle;
        if (type === 'articles'){
          title = item.title;
          urlTitle = item.url_title;
        } else if(type === 'products'){
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
      return onlyTitle;
    });


};


module.exports = getInfo;