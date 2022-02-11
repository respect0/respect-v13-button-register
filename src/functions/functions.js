const { GuildMember } = require("discord.js");

Promise.prototype.delete = function (timeout) {
    if (this) this.then(msg => {
        setTimeout(async () => { msg.delete().catch(e => ({})) }, timeout * 1000)
    });
};

client.findChannel = function (channelName) {
    try {
        return client.channels.cache.find(x => x.name === channelName)
    } catch (err) {
        return undefined;
    }
};

GuildMember.prototype.setRole = function (roller = []) {
    let rol = this.roles.cache.clone().filter(e => e.managed).map(e => e.id).concat(roller);
    return this.roles.set(rol);
}
