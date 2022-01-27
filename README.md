# Introdução

Então, você quer fazer um BOT e conhece um pouco (ou nada) sobre JavaScript. Você quer fazer coisas legais como um BOT de música, comandos de tag, pesquisas aleatórias de imagens, toda a coisa. Bem, você está no lugar certo!

Este tutorial o guiará pelas primeiras etapas da criação de um BOT, da configuração, da execução e da adição de alguns comandos a ele.

## Etapa 1: Criando seu BOT

O primeiro passo na criação de um BOT é criar seu próprio _aplicativo do Discord_. O BOT usará a API Discord, que exige a criação de uma conta para fins de autenticação. Mas não se preocupe, é super simples.

### Criando a conta do aplicativo

Para criar o aplicativo, vá para o [Discord Developer Portal](https://discord.com/developers/applications/). Supondo que você esteja logado \(se não estiver, faça isso agora\), você chegará a uma página parecida com esta:

![Discord Developer Portal](https://cdn.discordapp.com/attachments/897969894824484864/936315939916505128/application-page.png)

Clique em **New Application**. Com isso aparecerá uma janela, na qual você deve simplesmente inserir um nome para o _aplicativo_ \(este será o nome de usuário inicial do BOT\). Clique em **Create**, que criará o próprio aplicativo.

![Janela de Criação](https://cdn.discordapp.com/attachments/897969894824484864/936316987083202630/new-application.png)

O **Application ID** na página será o ID de usuário do seu BOT. A descrição do aplicativo é usada na seção de bots `Sobre mim`. Portanto, sinta-se à vontade para adicionar uma descrição do seu bot em menos de 190 caracteres. (Embora a página indique claramente um máximo de 400, apenas 190 serão exibidos na seção "Sobre mim".)

![Aplicações Criadas](https://cdn.discordapp.com/attachments/897969894824484864/936330543384133722/created-application.png)

### Criando uma conta do BOT

Após criar o aplicativo, precisamos criar o **Usuário do BOT**. Vá para a seção **BOT** à esquerda e você será saudado com a seguinte tela.

![Build-a-bot](https://cdn.discordapp.com/attachments/897969894824484864/936330925791408229/making-bot.png)

Por fim, clique em **Add Bot** e em **Yes, Do it** para criar seu bot.

![Are you sure?](https://cdn.discordapp.com/attachments/897969894824484864/936331158646583376/add-bot-modal.png)

Há algumas coisas que você pode alterar aqui e, o mais importante, o token.

![Making the bot](https://cdn.discordapp.com/attachments/897969894824484864/936331344412295178/bot-created.png)

* `Icon`: para alterar o avatar do BOT \(também pode ser feito com discord.js\);
* `Username`: para alterar o nome de usuário do seu BOT no Discord \(isso também pode ser feito através de código\).
* `Token`: Este é o token do seu BOT, que será usado ao se conectar ao Discord.
* `Public bot`: Isso alterna a capacidade de outros usuários adicionarem seu BOT ao servidor deles. Você pode desativá-lo durante o desenvolvimento para evitar que usuários aleatórios o convidem.
* `Require Oauth2 Code Grant`: Não ative isso. Apenas, não. Não é útil para você e causará problemas se você ligá-lo.
* `Privileged Gateway Intents`: Agora, isso é importante, se o seu BOT estiver verificando dados de presença ou baixando a lista de membros, você precisará alternar um ou ambos, por enquanto eles não são necessários. Mas observe que, se o seu BOT atingir 100 servidores, você precisará estar na lista de permissões e verificado para usá-los.

### Adicione seu bot a um servidor

Ok, pode parecer um pouco cedo para fazer isso, mas isso realmente não importa - mesmo que você não tenha escrito uma única linha de código para o seu BOT, você já pode "convida-lo" para um servidor. Para adicionar um BOT, você precisa das permissões _Manage Server_ ou _Administrator_ nesse servidor. Esta é a **única** maneira de adicionar um BOT, não pode usar links de convite ou quaisquer outros métodos.

Para gerar o link, clique em **OAuth2** na página do aplicativo (está acima de `Bot`), depois em **URL Generator**, procure por **Scopes**. Verifique se na caixa de seleção está selecionado a opção `bot` para gerar um link, se você planeja adicionar comandos de barra, certifique-se de selecionar a opção `applications.commands` também.

Normalmente, os BOT's são convidados com as _permissões_ específicas que são dadas à função do bot, que não pode ser removida, a menos que você remova e convide novamente o BOT. Isso é opcional, mas você pode definir essas permissões na página **Bot**, rolando para baixo até a seção **Bot Permissions**. Verifique as permissões que seu BOT requer. Isso modifica o link de convite acima, que você pode compartilhar.

Depois de ter o link, você pode copiá-lo para uma janela do navegador e visitá-lo. Ao fazer isso, você verá uma janela que permite escolher o servidor onde adicionar o bot, basta selecionar o servidor e clicar em **Autorizar**.

![Inviting the bot](../.gitbook/assets/gs-invite-bot.png)

{% hint style="info" %}
You need to be logged in to Discord on the browser with your account to see a list of servers. You can only add a bot to servers where you have **Manage Server** or **Administrator** permissions.
{% endhint %}

### Getting your Bot Token

{% hint style="danger" %}
Alright so, **big flashy warning**, **PAY ATTENTION**. This next part is really, really important: Your bot's **token** is meant to be **SECRET**. It is the way by which your bot authenticates with the Discord server in the same way that you login to Discord with a username and password. **Revealing your token is like putting your password on the internet**, and anyone that gets this token can use **your** bot connection to do things. Like delete all the messages on your server and ban everyone. If your token ever reaches the internet, **change it immediately**. This includes putting it on pastebin/hastebin, having it in a public github repository, displaying a screenshot of it, anything. **GOT IT? GOOD!**, Github has partnered with Discord to invalidate your token if it's found within your code repository and message you via a `System` message on Discord.
{% endhint %}

With that warning out of the way, on to the next step. The Token, as I just mentioned, is the way in which the bot authenticates. To get it, go to the **Bot** section of the app page, then click **Copy** to copy it to the clipboard. You can also _view_ your token here if you wish. Not forgetting that ever important `Regenerate` key if your token is compromised:

![NEVER SHARE YOUR TOKEN! This cannot be overstated.](../.gitbook/assets/gs-copy-token.png)

## Step 2: Getting your coding environment ready

This might go beyond saying but I'll say it anyway: You can't just start shoving bot code in notepad.exe and expect it to work. In order to use discord.js you will need a couple of things installed. At the very least:

* Get Node.js version 16.6 or higher \(earlier versions are not supported\). [Download for windows](https://nodejs.org/en/download/) or if you're on a linux distro, via [package manager](https://nodejs.org/en/download/package-manager/).
* Get an actual code editor. Don't use notepad or notepad++, they are not sufficient. [VS Code](https://www.visualstudio.com/en-us/products/code-vs.aspx) , [Sublime Text 3](https://www.sublimetext.com/3) and [Atom](https://atom.io/) are often recommended.

Once you have the required software, the next step is to prepare a _space_ for your code. Please don't just put your files on your desktop it's... unsanitary. If you have more than one hard drive or partition, you could create a special place for your development project. Mine, for example, is `D:\develop\` , and my bot is `D:\develop\guide-bot\` . Once you've created a folder, open your CLI \(command line interface\) in that folder. Linux users, you know how. Windows users, here's a trick: `SHIFT + Right Click` in the folder, then choose the "secret" command **Open PowerShell window here**. Magic!

And now ready for the next step!

## Installing Discord.js

So you have your CLI ready to go, in an empty folder, and you just wanna start coding. Alright, hold on one last second: let's install discord.js. But first we'll initialize this folder with NPM, which will ensure that any installed module will be here, and nowhere else. Simply run `npm init -y` and then hit Enter. A new file is created called `package.json`, [click here](https://docs.npmjs.com/files/package.json) for more info about it.

And now we install Discord.js through NPM, the Node Package Manager:

`npm i discord.js` _At the time of writing this v13 hasn't been released yet._

![Installing the packages](../.gitbook/assets/gs-installing-discordjs.gif)

This will take a couple of heartbeats and display a lot of things on screen. Unless you have a big fat red message saying it didn't work, or package not found, or whatever, you're good to go. If you look at your folder, you'll notice that there's a new folder created here: `node_modules` . This contains all the installed packages for your project.

## Getting your first bot running

{% hint style="info" %}
I honestly consider that if you don't understand the code you're about to see, coding a bot might not be for you. If you do not understand the following sample, please go to [CodeAcademy](https://www.codecademy.com/learn/javascript) and learn Javascript first. I beg of you: stop, drop, and roll.
{% endhint %}

Okay finally, we're ready to start coding. \o/ Let's take a look at the most basic of examples, the ping-pong bot. Here's the code in its entirety:

```javascript
const { Client, Intents } = require("discord.js");
// The Client and Intents are destructured from discord.js, since it exports an object by default. Read up on destructuring here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("messageCreate", (message) => {
  if (message.content.startsWith("ping")) {
    message.channel.send("pong!");
  }
});

client.login("SuperSecretBotTokenHere");
```

{% hint style="info" %}
The variable `client` here is used an an example to represent the [&lt;Client&gt;](https://discord.js.org/#/docs/main/stable/class/Client) class. Some people call it `bot`, but you can technically call it whatever you want. I recommend sticking to `client` though!
{% endhint %}

Okay let's just... actually get this guy to work, because this is literally **a functional bot**. So let's make it run!

1. Copy that code and paste it in your editor.
2. Replace the string in the `client.login()` function with _your_ token
3. Save the file as `index.js`.
4. In the CLI \(which should still be in your project folder\) type the following command: `node index.js`

If all went well \(hopefully it did\) your bot is now connected to your server, it's in your user list, and ready to answer all your commands... Well, at least, _one_ command: `ping`. In its current state, the bot will reply "pong!" to any message that starts with, _exactly_, `ping`. Let's demonstrate!

![Ping?, Pong!](../.gitbook/assets/gs-ping-pong.png)

Success! You now have a bot running! As you probably realize by now I could probably blabber on from here, showing you a bunch of stuff. But the scope of this tutorial is completed, so I'll shut up now! Ciao!

## The Next Step?

Now that you have a basic, functional bot, it's time to start adding new features! Head on over to [Your First Bot](../first-bot/your-first-bot.md) to continue on your journey with adding new commands and features!

## Addendum: Getting help and Support

Before you start getting support from Discord servers to help you with your bot, I strongly advise taking a look at the following, very useful, resources.

* [Discord.js Documentation](http://discord.js.org) : For the love of all that is \(un\)holy, **read the documentation**. Yes, it will be alien at first if you are not used to "developer documentation" but it contains a whole lot of information about each and every feature of the API. Combine this with the examples above to see the API in context.
* [Evie.Codes on YouTube](https://www.youtube.com/channel/UCvQubaJPD0D-PSokbd5DAiw): If you prefer video to words, Evie's YouTube series \(which is good, though no longer maintained with new videos!\) gets you started with bots.
* [Discord.js Official Server](https://discord.gg/djs): The official server has a number of competent people to help you, and the development team is there too!
