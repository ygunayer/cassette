# cassette
A command line utility that exports the messages in a Slack channel to a JSON file.

**Work in Progress**

## Usage
### Install Dependencies
```bash
$ npm i
```

or

```bash
$ yarn
```

### Run the App
Specify the Slack team URL and the token using the environment variables `SLACK_HOST` and `SLACK_TOKEN` respectively. If environment variables aren't your thing, simply drop a file called `development.json` under the folder `config/` and fill them in using the same format as [config/default.json](config/default.json).

**Important:** Make sure to use the channel ID and not the name.

```bash
$ SLACK_HOST=... SLACK_TOKEN=... node index.js (channel ID) (file path)
```

## License
MIT
