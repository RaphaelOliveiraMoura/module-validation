#!/usr/bin/env node

const { name, version } = require('./package.json');

console.info(`Running package ${name}@${version}`);

const path = require('path');
const fs = require('fs-extra');

const rootDir = path.resolve(__dirname);

const templatesDir = path.resolve(rootDir, 'templates');
const templates = { ts: 'ts' };
const selectedTemplate = templates.ts;

const validationDir = path.resolve(templatesDir, selectedTemplate);
const outputDir = path.resolve(process.cwd(), 'validation');

fs.copySync(
  validationDir,
  outputDir,
  { recursive: true, overwrite: true },
  (err) => {
    if (err) return console.error('Error copying files...', err);
    console.info('Files copied with success');
  }
);
