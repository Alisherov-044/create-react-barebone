#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templateFolderPath = path.join(__dirname, "template");

function copyFolderRecursiveSync(source, target) {
  const files = fs.readdirSync(source);

  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }

  files.forEach((file) => {
    const currentSource = path.join(source, file);
    const currentTarget = path.join(target, file);

    if (fs.statSync(currentSource).isDirectory()) {
      copyFolderRecursiveSync(currentSource, currentTarget);
    } else {
      fs.copyFileSync(currentSource, currentTarget);
    }
  });
}

function execute() {
  console.log(`Copying files to react-app/...`);
  copyFolderRecursiveSync(templateFolderPath, "./react-app");
  console.log(`Copying to react-app/ complete.`);
}

execute();
