const GetMention = (id) => new RegExp(`^<@!?${id}>( |)$`);

module.exports = {
    name: 'messageCreate',
    execute: async (message, client) => {

        let prefix = process.env.PREFIX;

        if (message.content.match(GetMention(client.user.id))) {
            return message.reply(`Olá ${message.author}, o meu prefixo é: **\`${prefix}\`**.`);
        }

        if (message.content === 'ping') {
            message.reply('pong!')
        }

        if (message.content.startsWith(prefix)) {

            if (message.author.bot) return;

            const args = message.content.slice(prefix.length).trim().split(/ +/);
            const commandName = args.shift().toLowerCase();
            const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

            if (!command) return;

            if (message.channel.type == 'DM') {
                return message.reply('Ei, comandos não podem ser executados na minha DM, utilize o canal de comandos do servidor.');
            }

            try {
                command.execute(client, message, args, prefix);
            } catch (error) {
                console.error(error);
                return message.reply('Ouve um erro ao executar o comando! Tente novamente mais tarde.');
            }
        }
    }
}