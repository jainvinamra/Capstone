import HtmlWebPackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import WorkboxPlugin from "workbox-webpack-plugin";

export const entry = "./src/client/index.js";
export const mode = "production";
export const optimization = {
  minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
};
export const output = {
  libraryTarget: "var",
  library: "Client",
};
export const module = {
  rules: [
    {
      test: "/.js$/",
      exclude: /node_modules/,
      loader: "babel-loader",
    },
    {
      test: /\.scss$/,
      use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
    },
  ],
};
export const plugins = [
  new HtmlWebPackPlugin({
    template: "./src/client/views/index.html",
    filename: "./index.html",
  }),
  new MiniCssExtractPlugin({ filename: "[name].css" }),
  new WorkboxPlugin.GenerateSW(),
];
