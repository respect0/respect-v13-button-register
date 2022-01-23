const registerDatabase = require("../../models/register");
module.exports.run = async (client, message, args, embed) => {
    let registerDat;
    if (!roles.registerStaff.some(rol => message.member.roles.cache.has(rol)) && !message.member.permissions.has('ADMINISTRATOR')) return message.reply({ content: `Bu işlemi yapabilmek için yeterli yetkiye sahip değilsin.` }).delete(10);
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) message.reply({ content: `Hatalı kullanım, doğrusu; \`${settings.bot.prefix}isimler [@respect/ID]\`` }).delete(10);
    let registerData = await registerDatabase.findOne({ guildID: message.guild.id, memberID: member.id });
    if(!registerDat) return;
    message.reply({
        embeds: [embed.setDescription(`
    ${member} kişisinin **${registerData ? registerData.nicks.length : 0}** adet kayıtı bulunuyor.
    
    ${registerData ? registerData.nicks.map(x => `\`• ${x.nick}\` (${x.gen.replace(`Erkek`, `<@&${roles.manRoles[0]}>`).replace(`Kız`, `<@&${roles.womanRoles[0]}>`)}) (<@${x.admin}>)`).slice(0, 10).join("\n ") : "Veri tabanında veri bulunamadı."}`)]
    })
};
exports.config = {
    category: "register",
    name: "isimler",
    usage: `${settings.bot.prefix}isimler [@respect/ID]`,
    guildOnly: true,
    aliases: ["nicks"],
};
