const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'avatar',
    aliases: ['av', 'icon'],
    execute: async (client, message, args) => {
        let msg = await message.channel.send("**🔍 | Processando...**");

        const user = client.users.cache.get(args[0]) || message.mentions.users.first() || message.author;

        const avatar = user.displayAvatarURL({ dynamic: true, format: "png", size: 4096 });

        const embed = new MessageEmbed()
            .setColor(process.env.EMBED_COLOR)
            .setTitle(`📷 Avatar de Perfil`)
            .addField(`Avatar de:`, `\`${user.username}\``, true)
            .addField(`Baixe:`, `[[Clique aqui]](${avatar})`, true)
            .setImage(avatar)
            .setFooter(`${client.user.username}`)
            .setTimestamp();

        message.reply({ embeds: [embed] });
        msg.delete()
    },
};