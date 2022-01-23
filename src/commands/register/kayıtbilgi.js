const registerDatabase = require('../../models/register.js');

module.exports.run = async (client, message, args, embed) => {
    if (!roles.registerStaff.some(rol => message.member.roles.cache.has(rol)) && !message.member.permissions.has('ADMINISTRATOR')) return message.reply({ content: `Bu işlemi yapabilmek için yeterli yetkiye sahip değilsin.` }).delete(10);
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let respo = await registerDatabase.findOne({guildID: message.guild.id, memberID: member.id});
    if(!respo) return message.reply({content: `Bu kişinin kayıt verisi bulunmuyor.`}).delete(10);
    message.channel.send({embeds: [embed.setDescription(`${member}, \`${respo.manRegister || 0}\` erkek, \`${respo.womanRegister || 0}\` kadın kaydetmiş.Toplam **${respo.totalRegister || 0}** kişi kaydetmiş.`)]}).delete(10)
}
exports.config = {
    category: "register",
    name: "kayıtbilgi",
    usage: `${global.settings.bot.prefix}kayıtbilgi`,
    guildOnly: true,
    aliases: ["kayıtbilgi", "kb"],
};