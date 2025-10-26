/**
 * Setup Goodbye Command
 * Made by Umbra X Development - https://discord.gg/Whq4T2vYPP
 */

const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const GuildConfig = require('../models/GuildConfig');

module.exports = {
  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({
        content: '❌ You need Administrator permission.',
        ephemeral: true
      });
    }
    
    await interaction.deferReply({ ephemeral: true });
    
    const channel = interaction.options.getChannel('channel');
    const message = interaction.options.getString('message');
    const card = interaction.options.getBoolean('card');
    
    let config = await GuildConfig.findOne({ guildId: interaction.guild.id });
    
    if (!config) {
      config = new GuildConfig({ guildId: interaction.guild.id });
    }
    
    config.goodbyeChannelId = channel.id;
    if (message) config.goodbyeMessage = message;
    if (card !== null) config.goodbyeCardEnabled = card;
    
    await config.save();
    
    const embed = new EmbedBuilder()
      .setColor('#ED4245')
      .setTitle('✅ Goodbye System Configured')
      .addFields(
        { name: '📢 Channel', value: `<#${channel.id}>`, inline: true },
        { name: '🎨 Card Enabled', value: `${config.goodbyeCardEnabled}`, inline: true }
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