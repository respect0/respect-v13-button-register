const moment = require("moment")
moment.locale("tr")

module.exports.run = async (client, message, args, embed) => {
    if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply({ content: `Bu işlemi yapabilmek için yeterli yetkiye sahip değilsin.` }).delete(10);
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) message.reply({ content: `Hatalı kullanım, doğrusu; \`${settings.bot.prefix}kayıtsız [@respect/ID]\`` })
    await member.setRole(roles.unregisterRoles).catch(() => { });
    message.reply({ content: `${member} başarıyla kayıtsıza atıldı.` }).delete(10);
    if (client.findChannel("kayıtsız-log")) client.findChannel("kayıtsız-log").send({
        embeds: [embed.setDescription(`
    ${member} (\`${member.id}\`) ${message.author} (\`${message.author.id}\`) tarafından \`${moment(Date.now()).format("LLL")}\` tarihinde kayıtsıza atıldı.`)]
    })
};
exports.config = {
    category: "register",
    name: "kayıtsız",
    usage: `${settings.bot.prefix}kayıtsız [@respect/ID]`,
    guildOnly: true,
    aliases: [""],
};
