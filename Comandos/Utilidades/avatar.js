// eslint-disable-next-line no-unused-vars
const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: 'avatar',
    description: 'Avatar do usuário mencionado ou do seu próprio avatar.',
    category: "⚙️ Utilidades",
    aliases: ['av', 'icon'],
    usage: [],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    execute: async (client, message, args) => {

        let msg = await message.channel.send("**🔍 | Processando...**");
        let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.member;
        let avatar = member.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 });

        const embed = new MessageEmbed()
            .setColor(process.env.EMBED_COLOR)
            .setTitle(`📷 Avatar de Perfil`)
            .addField(`Avatar de:`, `\`${member.displayName}\``, true)
            .setImage(avatar)
            .setFooter({ text: client.user.username })
            .setTimestamp();

        let row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setEmoji('🔗')
                    .setLabel('Baixar')
                    .setURL(`${avatar}`)
                    .setStyle('LINK')
            );

        message.reply({ embeds: [embed], components: [row] });
        msg.delete()
    },
};