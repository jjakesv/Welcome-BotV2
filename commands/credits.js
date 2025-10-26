/**
 * Credits Command
 * Made by Umbra X Development x NJGhosting
 */

const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor("#5865F2")
      .setTitle("🎉 Bot Credits")
      .setDescription(
        "**Welcome & Goodbye Bot**\n" +
          "A feature-rich Discord bot with customizable welcome and goodbye systems.\n\n" +
          "**Made by Umbra X Development x NJGhosting**\n" +
          "Join our community for support, updates, and more awesome bots!"
      )
      .addFields(
        {
          name: "✨ Features",
          value:
            "• Dynamic Image Cards\n• Custom Messages\n• DM Greetings\n• Auto Reactions\n• Multi-Server Support",
          inline: true,
        },
        {
          name: "🔧 Tech Stack",
          value: "• Discord.js v14\n• MongoDB\n• @napi-rs/canvas\n• Node.js",
          inline: true,
        }
      )
      .setThumbnail("https://cdn.discordapp.com/embed/avatars/0.png")
      .setFooter({
        text: "Made with ❤️ by Umbra X Development & NJGhosting",
        iconURL: "https://cdn.discordapp.com/embed/avatars/0.png",
      })
      .setTimestamp();

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel("Join Umbra X Development")
          .setURL("https://discord.gg/Whq4T2vYPP")
          .setStyle(ButtonStyle.Link)
          .setEmoji("🚀")
      )
      .addComponents(
        new ButtonBuilder()
          .setLabel("Join NJGhosting Community")
          .setURL("https://discord.gg/9uMyW3vu6b")
          .setStyle(ButtonStyle.Link)
          .setEmoji("🚀")
      );

    await interaction.reply({
      embeds: [embed],
      components: [row],
      ephemeral: true,
    });
  },
};
