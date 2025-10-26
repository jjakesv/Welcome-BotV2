/**
 * Reset Welcome Command
 * Made by Umbra X Development - https://discord.gg/Whq4T2vYPP
 */

const { PermissionFlagsBits } = require('discord.js');
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
    
    const config = await GuildConfig.findOne({ guildId: interaction.guild.id });
    
    if (!config) {
      return interaction.editReply('❌ No configuration found to reset.');
    }
    
    config.welcomeChannelId = null;
    config.welcomeMessage = 'Welcome {user} to {server}! 🎉\n\n*Bot made by Umbra X Development - https://discord.gg/Whq4T2vYPP*';
    config.welcomeCardEnabled = true;
    config.welcomeDmEnabled = true;
    config.welcomeEmoji = '👋';
    
    await config.save();
    
    await interaction.editReply('✅ Welcome settings reset to default!\n\n*Made by Umbra X Development - https://discord.gg/Whq4T2vYPP*');
  }
};