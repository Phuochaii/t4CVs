const fs = require('fs-extra');

function copyDir(sourceDir, targetDir) {
  fs.copy(sourceDir, targetDir)
    .then(() => console.log(`Successfully copied ${sourceDir} to ${targetDir}`))
    .catch(err => console.error(err));
}

const serviceConfig = require('./service.config.json');

for (const config of serviceConfig) {
  const { serviceName, protoFiles } = config;
  for (const protoFile of protoFiles) {
    const sourceDir = `./proto/${protoFile}.proto`;
    const targetDir = `./apps/${serviceName}/src/proto/${protoFile}.proto`;
    copyDir(sourceDir, targetDir);
  }
}