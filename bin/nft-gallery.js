#!/usr/bin/env node

const shell = require("child_process").execSync;
const ghpages = require("gh-pages");
const { resolve } = require("path");
const { build } = require("vite");
// const fs = require('fs');

const [, , action, baseUrl, tree, ...args] = process.argv;
const resolvedSources = args.map((source) => resolve(source));

console.log(`action: ${action}`);
console.log(`baseUrl: ${baseUrl}`);
console.log(`tree: ${resolve(tree)}`);
console.log(
    `sources:\n${resolvedSources.map((source) => `\t- ${source}\n`).join("")}`
);

// const treeData = fs.readFileSync(tree);
// const parsedTree = JSON.parse(treeData);

const viteBuildDistPath = resolve(__dirname, "../dist");

console.log("copying sources to dist");
shell(`cp ${resolve(tree)} ${resolve(__dirname, "../src")}/tree.json`);
shell(`cp -r ${resolvedSources.join(" ")} ${viteBuildDistPath}`);

const viteBuildingCommand = build({
  root: resolve(__dirname, ".."),
  base: `/${baseUrl}/`
});

viteBuildingCommand
  .then(() => console.log("vite build done"))
  .then(() => {
    ghpages.publish(
      viteBuildDistPath,
      {
        message: "nft-gallery publish command",
      },
      (error) =>
        error ? console.log(error) : console.log("nft-gallery publish done")
    );
  });