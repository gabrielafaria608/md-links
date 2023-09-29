#!/usr/bin/env node

const { mdLinks } = require('./md-links.js');

const path = process.argv[2];

const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats'),
};

mdLinks(path, options);
