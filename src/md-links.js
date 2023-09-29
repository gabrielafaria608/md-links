const fs = require('fs');
const chalk = require('chalk');

function validate(link) {
  return fetch(link.url)
    .then((response) => response.status)
    .catch((error) => {
      throw new Error(chalk.redBright(error.code, 'The indicated file does not have links.'));
    });
}

function stats(arrayOfLinks) {
  const countLinks = arrayOfLinks.length;
  const uniqueLinks = new Set(arrayOfLinks.map((findLink) => findLink.url)).size;
  let brokenLinks = 0;
  const promises = arrayOfLinks.map((link) => validate(link)
    .then((status) => {
      if (status !== 200) {
        brokenLinks++;
      }
    }));
  Promise.all(promises)
    .then(() => {
      console.log(chalk.yellowBright(`Link statistics:\n${chalk.greenBright('\nTotal:')} ${chalk.greenBright(countLinks)}\n${chalk.magentaBright('Unique:')} ${chalk.magentaBright(uniqueLinks)}\n${chalk.redBright('Broken:')} ${chalk.redBright(brokenLinks)}`));
    });
}

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
    });
}

function handleLogs(link, status) {
  if (status === 200) {
    console.log(`${chalk.greenBright('☑ OK')} | ${chalk.greenBright(status)} ${chalk.magentaBright(link.text)}: ${chalk.blueBright(link.url)}`);
  } else {
    console.log(`${chalk.redBright('☒ FAIL')} | ${chalk.redBright(status)} ${chalk.redBright(link.text)}: ${chalk.redBright(link.url)}`);
  }
}

function checkStatsAndValidate(path, options) {
  extractLinks(path).then((links) => {
    if (options.validate && options.stats) {
      stats(links);
      console.log(chalk.yellowBright('\nList of links:\n'));
      links.forEach((link) => {
        validate(link)
          .then((status) => {
            handleLogs(link, status);
          });
      });
    } else if (options.validate) {
      console.log(chalk.yellowBright('\nList of links:\n'));
      links.forEach((link) => {
        validate(link)
          .then((status) => {
            handleLogs(link, status);
          });
      });
    } else if (options.stats) {
      stats(links);
    } else {
      console.log(links);
    }
  });
}

function mdLinks(path, options) {
  if (fs.lstatSync(path).isDirectory()) {
    fs.promises.readdir(path).then((files) => {
      const fileName = files.filter((file) => file.endsWith('.md'));
      const filePath = `${path}/${fileName}`;
      checkStatsAndValidate(filePath, options);
    });
  } else if (path.endsWith('.md')) {
    checkStatsAndValidate(path, options);
  } else {
    console.log('file is not markdown');
  }
}

module.exports = {
  mdLinks,
  extractLinks,
  validate,
  stats,
  handleLogs,
};
