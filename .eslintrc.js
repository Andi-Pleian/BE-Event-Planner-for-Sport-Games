module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["standard"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  rules: {
    quotes: "off",
    "node/file-extension-in-import": [
      "error",
      "never",
      {
        ".scss": "always",
        ".svg": "always",
        ".jpg": "always",
        ".png": "always",
        ".json": "always",
        ".yaml": "always"
      }
    ]
  },
  settings: {
    "import/ignore": "node_modules",
    "import/resolver": {
      node: {},
      webpack: {
        config: "./webpack/server.js"
      }
    }
  },
  semi: [2, "always"]
};
