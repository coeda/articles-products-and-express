const fs = require('fs');
let analytics = (req, res, next) => {
  let currentDate = Date();
  currentDate = currentDate.split(' ');
  currentDate = currentDate.slice(0,4);

  let logString = req.method + ' ' + req.url + ' ' + Date();
  console.log(currentDate);
  fs.writeFile("./log/newlog.log", req.body.toString(), (err) => {
    if(err){
      return console.log(err);
    }
    console.log("the file was saved");
  });
  next();
};

module.exports = analytics;