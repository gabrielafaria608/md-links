#!/usr/bin/env node

const { extractLinks } = require('./index');

const path = process.argv[2];

extractLinks(path)
  .then((links) => {
    console.log(links);
  });
