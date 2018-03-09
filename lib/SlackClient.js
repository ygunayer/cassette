const request = (() => {
    const r = require('request');
    const ret = (...args) => new Promise((resolve, reject) => {
        r(...args, (err, response, body) => {
            if (err) {
                return reject(err);
            }

            resolve({ response, body });
        });
    });

    ret.jar = r.jar.bind(r);
    return ret;
})();

class SlackClient {
    constructor(config) {
        this.config = config;
        this.baseUrl = 'https://slack.com/api'
    }

    getMessages(channel, latest, count = 1000) {
        return request({
            url: `${this.baseUrl}/groups.history`,
            qs: {
                token: this.config.token,
                channel,
                count,
                latest
            },
            headers: {
                'Host': this.config.host,
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:58.0) Gecko/20100101 Firefox/58.0'
            }
        }).then(({ response, body }) => JSON.parse(body));
    }

    getAllMessages(channel, bufferSize = 1000) {
        let buf = [];

        const doGet = latest => this.getMessages(channel, latest, bufferSize)
            .then(result => {
                const messages = result.messages || [];

                buf = buf.concat(result.messages || []);

                if (!result.has_more) {
                    return buf.reverse();
                }

                const latest = messages.map(msg => +msg.ts).reduce((acc, ts) => acc < ts ? acc : ts, Infinity);
                console.log(`Moving to next page at TS ${latest}`);
                return doGet(latest);
            });

        return doGet();
    }
}

module.exports = SlackClient;
