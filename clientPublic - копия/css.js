const critical = require("critical");
critical.generate({
  /* The path of the Webpack bundle */
  base: "./build",
  src: "index.html",
  inline: true,
  extract: true,
  minify: true, 
  target: {
    css: "critical.css",
    html: "index.html",
    uncritical: "uncritical.css",
  },
  /* Ensure that bundled JS file is called */
  penthouse: {
    blockJSRequests: false,
  },
});
