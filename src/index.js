const fs = require('fs');

function extractLinks(path) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;

  return fs.promises.readFile(path, 'utf-8')
    .then((fileContent) => {
      const links = [...fileContent.matchAll(regex)];
      // matchAll encontra todas correspondencias de links no texto e armazena na array
      const results = links.map((link) => ({
        text: link[1],
        url: link[2],
        file: path,
      }));
      return results;
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = { extractLinks };
