const fs = require('fs');

function extractLinks(path) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;

  return fs.promises.readFile(path, 'utf-8').then((fileContent) => {
    const links = [...fileContent.matchAll(regex)];
    // matchAll encontra todas correspondencias de links no texto e armazena na array
    const results = links.map((link) => ({
      text: link[1],
      url: link[2],
      file: path,
    }));
    return results;
  });
}

function validate(links) {
  return Promise.all(
    links.map((link) => fetch(link.url)
      .then((response) => {
        const obj = link;
        obj.status = response.status;
        return link;
      })),
  );
}

function stats(arrayOfLinks) {
  const countLinks = arrayOfLinks.length;
  const uniqueLinks = new Set(arrayOfLinks.map((findLink) => findLink.url)).size;
  let brokenLinks = 0;
  arrayOfLinks.forEach((link) => {
    if (link.status !== 200) {
      brokenLinks++;
    }
  });
  return { countLinks, uniqueLinks, brokenLinks };
}

function checkStatusOfLinks(filePath) {
  return extractLinks(filePath)
    .then((arrayOfLinks) => validate(arrayOfLinks).then((validatedLinks) => validatedLinks));
}

module.exports = {
  extractLinks,
  validate,
  stats,
  checkStatusOfLinks,
};
