const fs = require('fs');

let writeFunc = (file, req) => {
  let currentDate = Date();
  currentDate = currentDate.split(' ');
  currentDate = currentDate.slice(0,4);
  console.log(req.originalUrl);
  let logString = req.method + ' ' + req.originalUrl + ' ' + Date() + '\n';
  currentDate = currentDate.join('-');
  getLogData(file, logString, currentDate, (logData) => {
    fs.writeFile(`./log/${currentDate}.log`, logData, (err) => {
      console.log(logData);
      if(err){
        return console.log(err);
      }
    });
  });
};

let getLogData = (file, logString, currentDate, callback) => {
  let logData = logString;
  if(file.indexOf(currentDate + '.log') > -1){
    fs.readFile('./log/'+file[file.indexOf(currentDate + '.log')], (err, data) => {
       logData += data.toString();
       return callback(logData);
     });
  } else {
    return callback(logData);
  }
};


let analytics = (req, res, next) => {
  fs.readdir('./log/', (err, file) => {
    if(err) {
      console.error(err);
    } else {
      writeFunc(file, req);
    }
  });
  next();
};

module.exports = analytics;