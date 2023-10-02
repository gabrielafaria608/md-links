#!/usr/bin/env node

const chalk = require('chalk');
const { mdLinks } = require('./md-links.js');
const { stats } = require('./validate-stats.js');

const path = process.argv[2];

const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats'),
};

function handleLogs(links, options, stats) {
  if (options.validate && options.stats) {
    links.forEach((link) => {
      if (link.status === 200) {
        console.log(`${chalk.greenBright('☑ OK')} | ${chalk.greenBright(link.status)} ${chalk.magentaBright(link.text)}: ${chalk.blueBright(link.url)}`);
      } else {
        console.log(`${chalk.redBright('☒ FAIL')} | ${chalk.redBright(link.status)} ${chalk.redBright(link.text)}: ${chalk.redBright(link.url)}`);
      }
    });
    console.log(chalk.yellowBright(`\nLink statistics:\n${chalk.greenBright('\nTotal:')} ${chalk.greenBright(stats.countLinks)}\n${chalk.magentaBright('Unique:')} ${chalk.magentaBright(stats.uniqueLinks)}\n${chalk.redBright('Broken:')} ${chalk.redBright(stats.brokenLinks)}`));
  } else if (options.validate) {
    links.forEach((link) => {
      if (link.status === 200) {
        console.log(`${chalk.greenBright('☑ OK')} | ${chalk.greenBright(link.status)} ${chalk.magentaBright(link.text)}: ${chalk.blueBright(link.url)}`);
      } else {
        console.log(`${chalk.redBright('☒ FAIL')} | ${chalk.redBright(link.status)} ${chalk.redBright(link.text)}: ${chalk.redBright(link.url)}`);
      }
    });
  } else if (options.stats) {
    console.log(chalk.yellowBright(`Link statistics:\n${chalk.greenBright('\nTotal:')} ${chalk.greenBright(stats.countLinks)}\n${chalk.magentaBright('Unique:')} ${chalk.magentaBright(stats.uniqueLinks)}`));
  } else {
    links.forEach((link) => {
      console.log(`${chalk.magentaBright(link.text)}: ${chalk.blueBright(link.url)}`);
    });
  }
}

mdLinks(path, options)
  .then((links) => {
    const result = stats(links);
    handleLogs(links, options, result);
  })
  .catch((error) => {
    console.log(error);
  });
