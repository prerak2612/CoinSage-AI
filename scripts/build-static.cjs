const { mkdir, readdir, readFile, writeFile } = require("node:fs/promises");
const path = require("node:path");
const esbuild = require("esbuild");

const projectRoot = path.resolve(__dirname, "..");
const srcDir = path.join(projectRoot, "src");
const distDir = path.join(projectRoot, "dist");
const assetsDir = path.join(distDir, "assets");

function rewriteImports(code) {
  return code
    .replaceAll('from "react/jsx-runtime"', 'from "https://esm.sh/react@19.1.0/jsx-runtime"')
    .replaceAll('from "react-dom/client"', 'from "https://esm.sh/react-dom@19.1.0/client"')
    .replaceAll('from "react"', 'from "https://esm.sh/react@19.1.0"')
    .replaceAll('from "lucide-react"', 'from "https://esm.sh/lucide-react@0.511.0"')
    .replaceAll('from "./App.jsx"', 'from "./App.js"');
}

async function main() {
  await mkdir(assetsDir, { recursive: true });

  const existingAssets = await readdir(assetsDir);
  const previousCompiledCss = existingAssets.find((file) => /^index-.*\.css$/.test(file));

  if (!previousCompiledCss) {
    throw new Error("No previous compiled CSS asset was found in dist/assets.");
  }

  const baseCss = await readFile(path.join(assetsDir, previousCompiledCss), "utf8");
  const sourceCss = await readFile(path.join(srcDir, "index.css"), "utf8");
  const customCss = sourceCss
    .split("\n")
    .filter((line) => !line.startsWith("@import"))
    .join("\n")
    .trim();

  await writeFile(
    path.join(assetsDir, "index.css"),
    `${baseCss}\n\n/* Latest custom workflow styles */\n${customCss}\n`,
    "utf8",
  );

  const appSource = await readFile(path.join(srcDir, "App.jsx"), "utf8");
  const appTransformed = esbuild.transformSync(appSource, {
    loader: "jsx",
    format: "esm",
    jsx: "automatic",
    target: "es2020",
  });

  await writeFile(path.join(assetsDir, "App.js"), rewriteImports(appTransformed.code), "utf8");

  const mainSource = [
    'import React from "react";',
    'import ReactDOM from "react-dom/client";',
    'import App from "./App.jsx";',
    'ReactDOM.createRoot(document.getElementById("root")).render(',
    "  <React.StrictMode>",
    "    <App />",
    "  </React.StrictMode>,",
    ");",
  ].join("\n");

  const mainTransformed = esbuild.transformSync(mainSource, {
    loader: "jsx",
    format: "esm",
    jsx: "automatic",
    target: "es2020",
  });

  await writeFile(path.join(assetsDir, "main.js"), rewriteImports(mainTransformed.code), "utf8");

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="CoinSage AI landing page with live agent workflow and crypto research intelligence."
    />
    <title>CoinSage AI</title>
    <link rel="stylesheet" href="./assets/index.css" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./assets/main.js"></script>
  </body>
</html>
`;

  await writeFile(path.join(distDir, "index.html"), html, "utf8");
  console.log("Static frontend built at dist/");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
