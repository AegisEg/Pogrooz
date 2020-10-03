const critical = require("critical");
critical.generate({
  /* The path of the Webpack bundle */
  base: "./build",
  src: "index.html",
  inline: true,
  extract: true,
  minify: true,
  /* iPhone 6 dimensions, use whatever you like*/
  width: 375,
  height: 565,
  target: {
    css: "critical.css",
    html: "index-critical.html",
    uncritical: "uncritical.css",
  },
  /* Ensure that bundled JS file is called */
  penthouse: {
    blockJSRequests: false,
  },
});
