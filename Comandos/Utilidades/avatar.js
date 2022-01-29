const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: 'avatar',
    aliases: ['av', 'icon'],
    execute: async (client, message, args) => {
        let msg = await message.channel.send("**🔍 | Processando...**");

        const user = client.users.cache.get(args[0]) || message.mentions.users.first() || message.author;

        const avatar = user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 });

        const embed = new MessageEmbed()
            .setColor(process.env.EMBED_COLOR)
            .setTitle(`📷 Avatar de Perfil`)
            .addField(`Avatar de:`, `\`${user.username}\``, true)
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