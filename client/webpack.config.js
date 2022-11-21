const path = require("path");
const webpack = require("webpack");

module.exports={
    mode: "development", 
    entry: "./index.js", 
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "main.js",
        publicPath: '/'
    },
    target: "web",
    devServer: {
        port: "3500",
        contentBase: ["./public"],
        open: true,
        historyApiFallback: true,
        // hot: true ,
        // liveReload: true
    },
    resolve: {
        extensions: ['*','.js','.jsx','.json','.ts','.tsx','.css'],
        alias: {
            process: "process/browser"
        }, 
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
    module:{
        rules: [
            {
                test: /\.(js|jsx)$/, 
                exclude: /node_modules/,
                use:  'babel-loader' 
            },
            // for TypeScript
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            // for css
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            // for page reload
            {
                test: /webpack-dev-server\\client/,
                loader: "null-loader"                
            },
            // process/browser error
            {
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false
                } 
            }
        ]
    }
}
