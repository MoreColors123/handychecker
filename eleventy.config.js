// Eleventy 3.1.6 — CommonJS config (works; ESM via .mjs also supported)
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/manifest.webmanifest");
  eleventyConfig.addPassthroughCopy({ "src/icons": "icons" });
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });

  return {
    pathPrefix: "/handychecker/", // adjust to final repo name; "/" for user-site/Cloudflare
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    templateFormats: ["njk", "html", "md"],
    htmlTemplateEngine: "njk",
  };
};