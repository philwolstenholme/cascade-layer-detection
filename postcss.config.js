module.exports = ({ env }) => ({
  plugins: {
    "postcss-import": {},
    "postcss-preset-env":
      env === "with-cascade-polyfill"
        ? {
            features: {
              "cascade-layers": true,
            },
          }
        : {
            features: {
              "cascade-layers": false,
            },
          },
  },
});
