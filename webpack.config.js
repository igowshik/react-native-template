const path = require('path');
module.exports = {
  resolve: {
    modules: [path.resolve(__dirname, './src')],
    extensions: ['.js', '.jsx', '.json'],
  },
};
