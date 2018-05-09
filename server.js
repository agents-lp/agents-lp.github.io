const express = require('express');
const app = express();
const port = 3123;

const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')

const isDirectory = source => lstatSync(source).isDirectory()
const getDirectories = source =>
  readdirSync(source).map(name => join(source, name)).filter(isDirectory)

const dirs = getDirectories('.');
const dirsToExclude = ['.git', 'node_modules'];
const dirLinks = [];

dirs.forEach((dir => {
  if (dirsToExclude.indexOf(dir) == -1) {
    dirLinks.push(`<div><a href="/${dir}">${dir}</a></div>`);
  }
}));

app.use(express.static('.'));

app.get('/', function (req, res) {
  res.send(dirLinks.join(''));
});

app.listen(port, () => console.log(`server is available under http://localhost:${port}`));