const fs = require('fs');

const read = (path)=>new Promise((resolve, reject)  => {
  fs.readFile(path, (err, file) => {
    if (err) {
      reject(new TypeError('Error in the path'));
    } else {
      resolve(file);
    }
  });
});
module.exports = read;