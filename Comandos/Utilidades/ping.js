// eslint-disable-next-line no-unused-vars
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Vê o ping de resposta entre usuário e cliente e do host do BOT.',
    category: '⚙️ Utilidades',
    aliases: ['pong'],
    usage: [],
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    execute: async (client, message) => {
        let msg = await message.channel.send('**🔍 | Processando...**');

        const created = Math.round(Date.now() - message.createdTimestamp);
        const host = Math.round(client.ws.ping);

        const embed = new MessageEmbed()
            .setColor(process.env.EMBED_COLOR)
            .setTitle('Pong! 🏓')
            .setDescription(`💓 **Ping de resposta:** \`${created}\`ms \n` + `🛰️ **Ping da host**: \`${host}\`ms.`)
            .setFooter({ text: client.user.username })
            .setTimestamp();

        message.reply({ embeds: [embed] });
        msg.delete();
    },
};
