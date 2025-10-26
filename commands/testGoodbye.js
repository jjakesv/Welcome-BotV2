/**
 * Test Goodbye Command
 * Made by Umbra X Development - https://discord.gg/Whq4T2vYPP
 */

const { handleGoodbye } = require('../handlers/goodbyeHandler');

module.exports = {
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    
    try {
      await handleGoodbye(interaction.member);
      await interaction.editReply('✅ Test goodbye message sent!\n\n*Made by Umbra X Development - https://discord.gg/Whq4T2vYPP*');
    } catch (error) {
      await interaction.editReply('❌ Error: ' + error.message);
    }
  }
};