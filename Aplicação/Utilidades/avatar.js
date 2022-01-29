const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('[⚙️ Utilidades] Avatar do usuário mencionado ou do seu próprio avatar.')
        .addUserOption(option => option.setName('membro').setDescription('Selecione um usuário:')),
    execute: async (interaction) => {

        const user = interaction.options.getUser('membro') || interaction.user;

        const avatar = user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 });

        const embed = new MessageEmbed()
            .setColor(process.env.EMBED_COLOR)
            .setTitle(`📷 Avatar de Perfil`)
            .addField(`Avatar de:`, `\`${user.username}\``, true)
            .setImage(avatar)
            .setFooter({ text: interaction.client.user.username })
            .setTimestamp();

        let row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setEmoji('🔗')
                    .setLabel('Baixar')
                    .setURL(`${avatar}`)
                    .setStyle('LINK')
            );

        await interaction.followUp({ embeds: [embed], components: [row] });
    },
};