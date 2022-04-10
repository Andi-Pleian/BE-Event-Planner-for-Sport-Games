function isWebTarget(caller) {
  return Boolean(caller && caller.target === "web");
}

function isTest(caller) {
  return Boolean(caller && caller.target === "test");
}

module.exports = (api) => {
  const web = api.caller(isWebTarget);
  const test = api.caller(isTest);
  return {
    presets: [
      [
        "@babel/preset-env",
        {
          debug: false, // Toggle this for more information on what is being bundled
          targets: !web || test ? { node: "current" } : undefined
        }
      ]
    ],
    plugins: ["@babel/plugin-syntax-dynamic-import"]
  };
};
