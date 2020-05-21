import HtmlWebPackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export const entry = './src/client/index.js';
export const mode = 'development';
export const devtool = 'source-map';
export const stats = 'verbose';
export const output = {
    libraryTarget: 'var',
    library: 'Client'
};
export const module = {
    rules: [
        {
            test: '/\.js$/',
            exclude: /node_modules/,
            loader: "babel-loader"
        },
        {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        }
    ]
};
export const plugins = [
    new HtmlWebPackPlugin({
        template: "./src/client/views/index.html",
        filename: "./index.html",
    }),
    new CleanWebpackPlugin({
        // Simulate the removal of files
        dry: true,
        // Write Logs to Console
        verbose: true,
        // Automatically remove all unused webpack assets on rebuild
        cleanStaleWebpackAssets: true,
        protectWebpackAssets: false
    })
];
