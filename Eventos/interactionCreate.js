module.exports = {
  name: 'interactionCreate',
  execute: async (interaction) => {
    if (interaction.isCommand()) {
      try {
        const command = interaction.client.applications.get(interaction.commandName);

        if (command) {
          try {
            command && command.interactionExecute(interaction);
          } catch (err) {
            console.error(err);
            await interaction.reply({ content: 'Ocorreu um erro ao executar esta aplicação, tente novamente mais tarde.', ephemeral: true });
          }
        }
        } catch (err) {
          console.error(err);
        }
    }
  }
}
