/**
 * Welcome Handler
 * Made by Umbra X Development x NJGhosting
 */

const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const GuildConfig = require("../models/GuildConfig");
const { createWelcomeCard } = require("../utils/cardGenerator");

async function handleWelcome(member) {
  const config = await GuildConfig.findOne({ guildId: member.guild.id });

  if (!config || !config.welcomeChannelId) return;

  const channel = member.guild.channels.cache.get(config.welcomeChannelId);
  if (!channel) return;

  // Replace placeholders
  const message = config.welcomeMessage
    .replace("{user}", `<@${member.id}>`)
    .replace("{server}", member.guild.name)
    .replace("{memberCount}", member.guild.memberCount);

  let sentMessage;

  if (config.welcomeCardEnabled) {
    const card = await createWelcomeCard(member, config.welcomeCardBackground);
    const attachment = new AttachmentBuilder(card, { name: "welcome.png" });

    sentMessage = await channel.send({
      content: message,
      files: [attachment],
    });
  } else {
    const embed = new EmbedBuilder()
      .setColor("#5865F2")
      .setTitle("👋 Welcome!")
      .setDescription(message)
      .setThumbnail(member.user.displayAvatarURL({ size: 256 }))
      .setFooter({
        text: `Member #${member.guild.memberCount} | Made by Umbra X Development x NJGhosting`,
        iconURL: "https://cdn.discordapp.com/embed/avatars/0.png",
      })
      .setTimestamp();

    sentMessage = await channel.send({ embeds: [embed] });
  }

  if (config.welcomeEmoji && sentMessage) {
    try {
      await sentMessage.react(config.welcomeEmoji);
    } catch (err) {
      console.log("Could not react with emoji:", err.message);
    }
  }

  if (config.welcomeDmEnabled) {
    try {
      const dmMessage = config.welcomeDmMessage
        .replace("{user}", member.user.username)
        .replace("{server}", member.guild.name);

      const dmEmbed = new EmbedBuilder()
        .setColor("#5865F2")
        .setTitle(`Welcome to ${member.guild.name}!`)
        .setDescription(dmMessage)
        .setThumbnail(member.guild.iconURL())
        .setFooter({
          text: "Made by Umbra X Development x NJGhosting",
          iconURL: "https://cdn.discordapp.com/embed/avatars/0.png",
        })
        .setTimestamp();

      await member.send({ embeds: [dmEmbed] });
    } catch (err) {
      console.log("Could not send DM to user:", err.message);
    }
  }
}

module.exports = { handleWelcome };
