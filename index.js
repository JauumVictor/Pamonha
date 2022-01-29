// Para usar o Discord.js, você precisará instalar o Node.js. Mais informações no site: https://nodejs.org/en/.
// Discord.js v13 ou superior requer Node.js v16.6.0 ou superior. Você pode conferir a versão do seu node digitando: 'node -v' no terminal.
// Ative as intents do seu BOT no site: https://discord.com/developers/applications/.
// Calcule as intents necessárias para seu BOT no site: https://ziad87.net/intents/.

const { Client, Collection } = require('discord.js'); // npm i discord.js --save
const client = new Client({ intents: 32767 }); // Insira o valor das intents necessárias.
const fs = require('fs'); // npm i fs --save
const dotenv = require('dotenv'); // npm i dotenv --save
dotenv.config(); // Configurando o arquivo .env
const { REST } = require('@discordjs/rest'); // npm i @discordjs/rest --save
const { Routes } = require('discord-api-types/v9');
const c = require('colors'); // npm i colors --save

//===============> Exportações <===============//

module.exports = client;
client.commands = new Collection();
client.applications = new Collection();

//===============> Handlers <===============//

// Uma pasta dedicada para comandos:
const commandFolders = fs.readdirSync('./Comandos');
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./Comandos/${folder}`).filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {
        const command = require(`./Comandos/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}
// Uma pasta dedicada para eventos:
const eventFiles = fs.readdirSync('./Eventos').filter(file => file.endsWith(".js"));
for (const file of eventFiles) {
    const event = require(`./Eventos/${file}`);

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}
// Uma pasta dedicada para comandos de barra:
const application = [];
const applicationFolders = fs.readdirSync('./Aplicação');
for (const folder of applicationFolders) {
    const applicationFiles = fs.readdirSync(`./Aplicação/${folder}`).filter(file => file.endsWith(".js"));

    for (const file of applicationFiles) {
        const command = require(`./Aplicação/${folder}/${file}`);
        client.applications.set(command.data.name, command);
        application.push(command.data.toJSON());
    }
}

//===============> Atualizações dos comandos de barra <===============//

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
(async () => {
    try {
        console.log(c.yellow('Atualizando os comandos de barra (/).'));

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: application },
        );

        console.log(c.green('Atualizado com sucesso todos os comandos de barra (/)!'));
    } catch (error) {
        console.error(error);
    }
})();

//===============> Finalizações <===============//

client.login(process.env.TOKEN);