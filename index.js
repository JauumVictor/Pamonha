// Para usar o Discord.js, você precisará instalar o Node.js. Mais informações no site: https://nodejs.org/en/.
// Discord.js v13 ou superior requer Node.js v16.6.0 ou superior. Você pode conferir a versão do seu node digitando: 'node -v' no terminal.
// Ative as intents do seu BOT no site: https://discord.com/developers/applications/.
// Calcule as intents necessárias para seu BOT no site: https://ziad87.net/intents/.

const { Client, Collection, GatewayIntentBits } = require('discord.js'); // npm i discord.js@dev --save
const client = new Client({
  intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.MessageContent
    ],
}); // Insira o valor das intents necessárias.
const { readdirSync } = require('fs'); // npm i fs --save
const { config } = require('dotenv'); // npm i dotenv --save
const { green, yellow } = require('colors'); // npm i colors --save
const { REST } = require('@discordjs/rest'); // npm i @discordjs/rest
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
const commands = [];
const commandsFolders = readdirSync('./Comandos');
for (const folder of commandsFolders) {
  const commandsFiles = readdirSync(`./Comandos/${folder}`).filter(file => file.endsWith(".js"));

  for (const file of commandsFiles) {
    const command = require(`./Comandos/${folder}/${file}`);
    client.commands.set(command.name, command);
    client.applications.set(command.name, command);
    commands.push(command);
  }
}

  //===============> Atualizações dos comandos de barra <===============//

  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
  (async () => {
    try {
      console.log(yellow('Atualizando os comandos de barra (/).'));

      await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID), { body: commands },
      );

      console.log(green('Atualizado com sucesso todos os comandos de barra (/)!'));
    } catch (error) {
      console.error(error);
    }
  })();
  
//===============> Finalizações <===============//
client.login(process.env.TOKEN);
