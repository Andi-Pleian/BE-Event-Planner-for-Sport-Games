/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");

const production = process.env.NODE_ENV === "production";
const mode = production ? "production" : "development";

module.exports = {
  entry: {
    server: path.resolve(process.cwd(), "src/index.js"),
  },
  mode,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            configFile: path.resolve(process.cwd(), "babel.config.js"),
          },
        },
      },
      {
        test: /\.ya?ml$/,
        type: "json",
        use: "yaml-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
  target: "node",
  node: {
    __dirname: true,
  },
  output: {
    path: path.resolve(process.cwd(), "build"),
  },
};
