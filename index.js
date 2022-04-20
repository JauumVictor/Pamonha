// Para usar o Discord.js, você precisará instalar o Node.js. Mais informações no site: https://nodejs.org/en/.
// Discord.js v14 ou superior requer Node.js v16.9.0 ou superior. Você pode conferir a versão do seu node digitando: 'node -v' no terminal.
// Ative as intents do seu BOT no site: https://discord.com/developers/applications/.

const { Client, Collection, GatewayIntentBits } = require('discord.js'); // npm i discord.js@dev --save
const client = new Client({
  intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
}); // Insira o valor das intents necessárias.
const { readdirSync } = require('fs'); // Node já vem com essa dependência instalada.
const { config } = require('dotenv'); // npm i dotenv --save
const { green, yellow } = require('colors'); // npm i colors --save
const { REST } = require('@discordjs/rest'); // npm i @discordjs/rest@latest
const { Routes } = require('discord-api-types/v10'); // npm i discord-api-types@latest

//===============> Exportações <===============//

module.exports = client;
client.commands = new Collection(); // Nova Collection para comandos de prefixo.
client.applications = new Collection(); // Nova Collection para comandos de barra.
config(); // Configurando o arquivo .env

//===============> Handlers <===============//

// Uma pasta dedicada para eventos:
const eventFiles = readdirSync('./Eventos').filter(file => file.endsWith(".js"));
for (const file of eventFiles) {
  const event = require(`./Eventos/${file}`);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}
// Uma pasta dedicada para comandos:
const commandsFolders = readdirSync('./Comandos');
for (const folder of commandsFolders) {
  const commandsFiles = readdirSync(`./Comandos/${folder}`).filter(file => file.endsWith(".js"));

  for (const file of commandsFiles) {
    const command = require(`./Comandos/${folder}/${file}`);
    client.commands.set(command.name, command);
    client.applications.set(command.name, command);
  }
}

//===============> Finalizações <===============//

client.login(process.env.TOKEN);
