const { version } = require('discord.js'); // npm i discord.js --save
const { green } = require('colors'); // npm i colors --save
const express = require('express'); // npm i express --save

module.exports = {
  name: 'ready',
  once: true,
  execute: (client) => {

    //===============> Importações <===============//

    const app = express();

    //===============> Status <===============//

    client.user.setStatus('online');

    //===============> Finalizações <===============//

    app.get('/', (req, res) => {
      res.send(`<h>${client.user.username}</h><br><br>NodeJS: ${process.version}<br>Discord.JS: ${version}`);
    });

    app.listen(process.env.PORT, () => {
      console.log(green(`[Web] Framework online rodando na porta: ${process.env.PORT}`));
    })

    console.log(green('[Status] Status do BOT sendo transmitido!'));
    console.log(green('[Inicialização] - O BOT foi inicializado com sucesso.'));
  }
}