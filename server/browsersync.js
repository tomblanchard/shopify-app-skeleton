var browsersync = require("browser-sync").create();

browsersync.init({
  proxy: "http://localhost:3000",
  port: 443,
  https: {
    key: __dirname + "/certs/server.key",
    cert: __dirname + "/certs/server.crt"
  },
  files: [
    __dirname + "/../assets/**/*"
  ],
  browser: "google chrome"
});
