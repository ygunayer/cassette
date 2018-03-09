const path = require('path');
const util = require('util');
const config = require('config');

const fs = {
    writeFile: util.promisify(require('fs').writeFile)
};

const SlackClient = require('./lib/SlackClient');

const channelId = process.argv[2];
const outputFilename = process.argv[3];

if (!channelId) {
    throw new Error('Please specify the channel ID');
}

if (!outputFilename) {
    throw new Error('Please specify an output filename');
}

const client = new SlackClient(config.get('slack'));

const outputPath = path.resolve(__dirname, outputFilename);

client.getAllMessages(channelId, config.get('bufferSize'))
    .then(results => fs.writeFile(outputPath, JSON.stringify(results, null, 2), 'utf8').then(_ => results))
    .then(_ => console.log(`Successfully saved ${_.length} messages`))
    .catch(console.error.bind(console));
