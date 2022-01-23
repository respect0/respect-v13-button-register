const registerDatabase = require("../../models/register");
module.exports.run = async (client, message, args, embed) => {
    if (!roles.registerStaff.some(rol => message.member.roles.cache.has(rol)) && !message.member.permissions.has('ADMINISTRATOR')) return message.reply({ content: `Bu işlemi yapabilmek için yeterli yetkiye sahip değilsin.` }).delete(10);
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    args = args.filter(a => a !== "" && a !== " ").splice(1);
    let setName;
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase() + arg.slice(1)).join(" ");
    let yas = args.filter(arg => !isNaN(arg))[0] || undefined;
    if (!member || !isim || !yas) message.reply({ content: `Hatalı kullanım, doğrusu; \`${settings.bot.prefix}isim [@respect/ID] <isim> <yaş>\`` }).delete(10);
    setNames = `${settings.guild.tagges.map(tag => member.user.tag.includes(tag)) ? settings.guild.nameTag : (settings.guild.defaultTag ? settings.guild.defaultTag : (settings.guild.defaultTag || ""))} ${isim} | ${yas}`;
    member.setNickname(`${setNamed}`).catch(() => {});
    let nickData = {
        nick: setName,
        admin: message.author.id,
        gen: "İsim değiştirme"
    };
    let registerData = await registerDatabase.findOne({guildID: message.guild.id, memberID: member.id});
    if(!registerData) new registerDatabase({
        guildID: message.guild.id,
        memberID: member.id
    }).save().catch(() => {});
    await registerDatabase.updateOne({memberID: member.id}, {$push: {nicks: nickData}});
    message.reply({embeds: [embed.setDescription(`${member} adlı kişinin ismi **${setName}** olarak değiştirildi.`)]});
};
exports.config = {
    category: "register",
    name: "isim",
    usage: `${settings.bot.prefix}isim [@respect/ID] <isim> <yaş>`,
    guildOnly: true,
    aliases: ["isim"],
};
