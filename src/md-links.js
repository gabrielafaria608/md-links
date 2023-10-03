const fs = require('fs');
const { checkStatusOfLinks } = require('./validate-stats.js');

function mdLinks(path) {
  return new Promise((resolve, reject) => {
    if (fs.lstatSync(path).isDirectory()) {
      fs.promises.readdir(path)
        .then((files) => {
          const fileName = files.filter((file) => file.endsWith('.md'));
          if (fileName.length === 0) {
            reject(new Error('directory doesn\'t have files .md'));
          } else {
            const filePath = `${path}/${fileName}`;
            resolve(checkStatusOfLinks(filePath));
          }
        });
    } else if (path.endsWith('.md')) {
      resolve(checkStatusOfLinks(path));
    } else {
      reject(new Error('file is not .md'));
    }
  });
}
module.exports = { mdLinks };
