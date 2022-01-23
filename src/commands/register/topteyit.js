const registerDatabase = require('../../models/register.js');

module.exports.run = async (client, message, args, embed) => {
    if (!roles.registerStaff.some(rol => message.member.roles.cache.has(rol)) && !message.member.permissions.has('ADMINISTRATOR')) return message.reply({ content: `Bu işlemi yapabilmek için yeterli yetkiye sahip değilsin.` }).delete(10);
    let registerData = await registerDatabase.find({ guildID: message.guild.id }).sort([["totalRegister", "descending"]]).exec();
    let result = registerData.map(x => x.totalRegister).reduce((a, b) => a + b, 0)
    let registerDat = registerData.sort((a, b) => b.totalRegister - a.totalRegister, 0).slice(0, 20)
    let find = registerDat.find(x => x.memberID === message.author.id)
    let topRegCozumlenmis = registerDat.map((x, index) => `${index + 1 > 3 ? `\`${index + 1}.\`` : ``} ${index + 1 == 1 ? "🥇" : "" || index + 1 == 2 ? "🥈" : "" || index + 1 == 3 ? "🥉" : ""} <@${x.memberID}>: \`${x.totalRegister ?? 0} kayıt\` ${x.userId === message.author.id ? " **(Siz)** " : ""}`).join(`\n`)
    message.channel.send({
        embeds: [embed.setDescription(`
     **İlk 20 kayıt sıralaması aşağıda sıralanmıştır.**
     
     Veritabanın da **${registerData.length}** kişi hakkında kayıt bilgisi mevcut.
     ${topRegCozumlenmis}
     
     ${find ? `**${registerData.indexOf(find) + 1}.** sırada bulunuyorsun. Toplam \`${find.manRegister}\` erkek, \`${find.womanRegister}\` kadın kaydetmişsiniz.` : "Hiç kayıt bilginiz yok."}
    \nTüm zamanlar da toplam **${result}** kayıt işlemi yapıldı.`)]
    })
}
exports.config = {
    category: "register",
    name: "topteyit",
    usage: `${global.settings.bot.prefix}topteyit`,
    guildOnly: true,
    aliases: ["topteyit"],
};