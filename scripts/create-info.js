#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const  { execSync } = require('child_process');


const dist = path.normalize(`${__dirname}/../dist`);

if (!fs.existsSync(dist)) {
  console.error('dist directory doesn\'t exist');
  process.exit(1);
}

const version = execSync(`git rev-parse HEAD`).toString().trim();
const createdAt = execSync(`date`).toString().trim();
const infoVersion = JSON.stringify({ version, createdAt });

fs.writeFileSync(path.join(dist, 'info.json'), infoVersion);
