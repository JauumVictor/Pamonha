module.exports = {
  name: 'interactionCreate',
  execute: async (interaction, client) => {
    if (interaction.isCommand()) {
      const command = client.applications.get(interaction.commandName);

      if (!command) {
        return;
      } else {
        try {
          command && command.execute(interaction).catch(() => interaction.reply({ content: 'Ocorreu um erro ao executar esta aplicação, tente novamente mais tarde.', ephemeral: true }))
        } catch (err) {
          console.error(err);
          await interaction.reply({ content: 'Ocorreu um erro ao executar esta aplicação, tente novamente mais tarde.', ephemeral: true });
        }
      }
    }
  }
}