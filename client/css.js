const critical = require("critical");
critical.generate({
  /* The path of the Webpack bundle */
  base: "./build",
  src: "index.html",
  inline: true,
  extract: true,
  minify: true,
 
  target: {
    html: "index.html",
  },
  /* Ensure that bundled JS file is called */
  penthouse: {
    blockJSRequests: false,
  },
});
