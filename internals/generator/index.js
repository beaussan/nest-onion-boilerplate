/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const fs = require('fs');
const path = require('path');
const moduleGenerator = require('./module/index.js');

module.exports = plop => {
  plop.setGenerator('module', moduleGenerator);
  /*
  plop.addHelper('directory', (comp) => {
    try {
      fs.accessSync(path.join(__dirname, `../../app/containers/${comp}`), fs.F_OK);
      return `containers/${comp}`;
    } catch (e) {
      return `components/${comp}`;
    }
  });
  */
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
};
