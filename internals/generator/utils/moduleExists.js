/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

const fs = require('fs');
const path = require('path');

const pathModules = path.join(__dirname, '../../../src/modules');

const modules = fs.readdirSync(pathModules);

function moduleExists(store) {
  return modules.indexOf(store) >= 0;
}

module.exports = {
  moduleExists,
};
