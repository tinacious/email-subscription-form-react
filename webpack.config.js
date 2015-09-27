var path = require('path');

module.exports = {
    entry: __dirname + '/client/app/index.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            // like plugins, reads loaders from right to left
            { test: /.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.html$/, loader: 'raw' }
        ]
    }
};