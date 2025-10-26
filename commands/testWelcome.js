/**
 * Test Welcome Command
 * Made by Umbra X Development - https://discord.gg/Whq4T2vYPP
 */

const { handleWelcome } = require('../handlers/welcomeHandler');

module.exports = {
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    
    try {
      await handleWelcome(interaction.member);
      await interaction.editReply('✅ Test welcome message sent!\n\n*Made by Umbra X Development - https://discord.gg/Whq4T2vYPP*');
    } catch (error) {
      await interaction.editReply('❌ Error: ' + error.message);
    }
  }
};