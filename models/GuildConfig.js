/**
 * Guild Configuration Schema
 * Made by Umbra X Development x NJGhosting
 */

const mongoose = require("mongoose");

const guildConfigSchema = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true },

  // Welcome settings
  welcomeChannelId: { type: String, default: null },
  welcomeMessage: {
    type: String,
    default:
      "Welcome {user} to {server}! 🎉\n\n*Bot Made by Umbra X Development x NJGhosting *",
  },
  welcomeCardEnabled: { type: Boolean, default: true },
  welcomeCardBackground: {
    type: String,
    default: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
  },
  welcomeDmEnabled: { type: Boolean, default: true },
  welcomeDmMessage: {
    type: String,
    default:
      "Welcome to {server}! Please read the rules and have fun!\n\n*Powered by Umbra X Development*\nhttps://discord.gg/Whq4T2vYPP",
  },
  welcomeEmoji: { type: String, default: "👋" },

  // Goodbye settings
  goodbyeChannelId: { type: String, default: null },
  goodbyeMessage: {
    type: String,
    default:
      "Goodbye {user}! We'll miss you 😢\n\n*Bot Made by Umbra X Development x NJGhosting *",
  },
  goodbyeCardEnabled: { type: Boolean, default: true },
  goodbyeCardBackground: {
    type: String,
    default: "https://images.unsplash.com/photo-1557683316-973673baf926",
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

guildConfigSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("GuildConfig", guildConfigSchema);
