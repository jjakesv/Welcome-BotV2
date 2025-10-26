/**
 * Setup Welcome Command
 * Made by Umbra X Development - https://discord.gg/Whq4T2vYPP
 */

const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const GuildConfig = require('../models/GuildConfig');

module.exports = {
  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({
        content: '❌ You need Administrator permission to use this command.',
        ephemeral: true
      });
    }
    
    await interaction.deferReply({ ephemeral: true });
    
    const channel = interaction.options.getChannel('channel');
    const message = interaction.options.getString('message');
    const card = interaction.options.getBoolean('card');
    const dm = interaction.options.getBoolean('dm');
    const emoji = interaction.options.getString('emoji');
    
    let config = await GuildConfig.findOne({ guildId: interaction.guild.id });
    
    if (!config) {
      config = new GuildConfig({ guildId: interaction.guild.id });
    }
    
    config.welcomeChannelId = channel.id;
    if (message) config.welcomeMessage = message;
    if (card !== null) config.welcomeCardEnabled = card;
    if (dm !== null) config.welcomeDmEnabled = dm;
    if (emoji) config.welcomeEmoji = emoji;
    
    await config.save();
    
    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle('✅ Welcome System Configured')
      .addFields(
        { name: '📢 Channel', value: `<#${channel.id}>`, inline: true },
        { name: '🎨 Card Enabled', value: `${config.welcomeCardEnabled}`, inline: true },
        { name: '📩 DM Enabled', value: `${config.welcomeDmEnabled}`, inline: true },
        { name: '😊 Emoji', value: config.welcomeEmoji, inline: true }
      )
      .setFooter({ 
        text: 'Made by Umbra X Development | discord.gg/Whq4T2vYPP',
        iconURL: 'https://cdn.discordapp.com/embed/avatars/0.png'
      })
      .setTimestamp();
    
    if (message) {
      embed.addFields({ name: '💬 Custom Message', value: message, inline: false });
    }
    
    await interaction.editReply({ embeds: [embed] });
  }
};
