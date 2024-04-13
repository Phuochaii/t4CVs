const process = require('process');

if (process.argv.length < 3) {
    console.error('Error: Missing filename argument.');
    process.exit(1); // Exit with non-zero code to indicate error
}

const fileName = process.argv[2];

const protocCommand = `protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto.cmd --ts_proto_out=./libs/common/src --ts_proto_opt=nestJs=true ./proto/${fileName}.proto`;

// You can execute the command here using child_process
require('child_process').execSync(protocCommand);