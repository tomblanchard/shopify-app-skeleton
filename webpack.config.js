module.exports = {
  entry: {
    index: "./client/index.js",
    install: "./client/install.js"
  },
  output: {
    path: __dirname + "/client",
    filename: "[name].min.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets: ["env", "react"],
          plugins: ["babel-plugin-transform-class-properties"]
        }
      }
    ]
  }
};
