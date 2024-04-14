const process = require('process');
const fs = require('fs');

if (process.argv.length < 3) {
    console.error('Error: Missing filename argument.');
    process.exit(1);
}

const fileName = process.argv[2];
const filePath = `./proto/${fileName}.proto`;

if (!fs.existsSync(filePath)) {
    console.error(`Error: File not found: ${filePath}`);
    process.exit(1);
}

const protocCommand = `protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=./libs/common/src --ts_proto_opt=nestJs=true ${filePath}`;

// You can execute the command here using child_process
require('child_process').execSync(protocCommand);