const registerDatabase = require('../../models/register.js');

module.exports.run = async (client, message, args, embed) => {
    if (!roles.registerStaff.some(rol => message.member.roles.cache.has(rol)) && !message.member.permissions.has('ADMINISTRATOR')) return message.reply({ content: `Bu i??lemi yapabilmek i癟in yeterli yetkiye sahip de??ilsin.` }).delete(10);
    let registerData = await registerDatabase.find({ guildID: message.guild.id }).sort([["totalRegister", "descending"]]).exec();
    let result = registerData.map(x => x.totalRegister).reduce((a, b) => a + b, 0)
    let registerDat = registerData.sort((a, b) => b.totalRegister - a.totalRegister, 0).slice(0, 20)
    let find = registerDat.find(x => x.memberID === message.author.id)
    let topRegCozumlenmis = registerDat.map((x, index) => `${index + 1 > 3 ? `\`${index + 1}.\`` : ``} ${index + 1 == 1 ? "????" : "" || index + 1 == 2 ? "????" : "" || index + 1 == 3 ? "????" : ""} <@${x.memberID}>: \`${x.totalRegister ?? 0} kay覺t\` ${x.userId === message.author.id ? " **(Siz)** " : ""}`).join(`\n`)
    message.channel.send({
        embeds: [embed.setDescription(`
     **襤lk 20 kay覺t s覺ralamas覺 a??a??覺da s覺ralanm覺??t覺r.**
     
     Veritaban覺n da **${registerData.length}** ki??i hakk覺nda kay覺t bilgisi mevcut.
     ${topRegCozumlenmis}
     
     ${find ? `**${registerData.indexOf(find) + 1}.** s覺rada bulunuyorsun. Toplam \`${find.manRegister}\` erkek, \`${find.womanRegister}\` kad覺n kaydetmi??siniz.` : "Hi癟 kay覺t bilginiz yok."}
    \nT羹m zamanlar da toplam **${result}** kay覺t i??lemi yap覺ld覺.`)]
    })
}
exports.config = {
    category: "register",
    name: "topteyit",
    usage: `${global.settings.bot.prefix}topteyit`,
    guildOnly: true,
    aliases: ["topteyit"],
};