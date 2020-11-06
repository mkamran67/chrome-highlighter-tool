const path = require('path');

module.exports = {
  entry: './scripts/index.js',
  output: {
    path: path.resolve(__dirname, './scripts/'),
    filename: 'content.js',
  },
};
