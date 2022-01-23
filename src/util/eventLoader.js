const resEvent = event => require(`../events/${event}`);

module.exports = client => {
    client.on('ready', () => resEvent('ready')(client));
    client.on('messageCreate', resEvent('message'));
};
