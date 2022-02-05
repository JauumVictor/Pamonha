// eslint-disable-next-line no-unused-vars
const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: {
        name: 'avatar',
        description: '[⚙️ Utilidades] Avatar do usuário mencionado ou do seu próprio avatar.',
        options: [
            {
                name: 'membro',
                type: 6,
                description: 'Selecione um usuário:'
            },
        ],
    },
    /**
     * @param {CommandInteraction} interaction 
     */
    execute: async (interaction) => {

        let member = interaction.options.getMember('membro') || interaction.member;
        let avatar = member.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 });

        const embed = new MessageEmbed()
            .setColor(process.env.EMBED_COLOR)
            .setTitle(`📷 Avatar de Perfil`)
            .addField(`Avatar de:`, `\`${member.displayName}\``, true)
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