const fs = require('fs');
const { checkStatusOfLinks } = require('./validate-stats.js');

function mdLinks(path) {
  if (fs.lstatSync(path).isDirectory()) {
    return fs.promises.readdir(path)
      .then((files) => {
        const fileName = files.filter((file) => file.endsWith('.md'));
        if (fileName.length === 0) {
          throw new Error('directory doesn\'t have files .md');
        } else {
          const filePath = `${path}/${fileName}`;
          return checkStatusOfLinks(filePath)
            .then((result) => result);
        }
      });
  } else if (path.endsWith('.md')) {
    return checkStatusOfLinks(path)
      .then((result) => result);
  } else {
    throw new Error('file is not .md');
  }
}
module.exports = { mdLinks };
