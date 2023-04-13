const path = require('path');

module.exports = {
    // other config options...
    resolve: {
        alias: {
            src: path.resolve(__dirname, 'src/'),
        },
    },
};
