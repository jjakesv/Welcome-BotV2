/**
 * Goodbye Handler
 * Made by Umbra X Development x NJGhosting
 */

const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const GuildConfig = require("../models/GuildConfig");
const { createGoodbyeCard } = require("../utils/cardGenerator");

async function handleGoodbye(member) {
  const config = await GuildConfig.findOne({ guildId: member.guild.id });

  if (!config || !config.goodbyeChannelId) return;

  const channel = member.guild.channels.cache.get(config.goodbyeChannelId);
  if (!channel) return;

  const message = config.goodbyeMessage
    .replace("{user}", member.user.tag)
    .replace("{server}", member.guild.name)
    .replace("{memberCount}", member.guild.memberCount);

  if (config.goodbyeCardEnabled) {
    const card = await createGoodbyeCard(member, config.goodbyeCardBackground);
    const attachment = new AttachmentBuilder(card, { name: "goodbye.png" });

    await channel.send({
      content: message,
      files: [attachment],
    });
  } else {
    const embed = new EmbedBuilder()
      .setColor("#ED4245")
      .setTitle("👋 Goodbye!")
      .setDescription(message)
      .setThumbnail(member.user.displayAvatarURL({ size: 256 }))
      .setFooter({
        text: `Members remaining: ${member.guild.memberCount} | Made by Umbra X Development x NJGhosting`,
        iconURL: "https://cdn.discordapp.com/embed/avatars/0.png",
      })
      .setTimestamp();

    await channel.send({ embeds: [embed] });
  }
}

module.exports = { handleGoodbye };
