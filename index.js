/**
 * Welcome & Goodbye Bot
 * Made by Umbra X Development x NJGhosting x NJGhosting
 * https://discord.gg/Whq4T2vYPP
 */

const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const mongoose = require("mongoose");

// Get arguments from command line
// Example: node bot.js TOKEN CLIENT_ID MONGO_URI
const [token, clientId, mongoUri] = process.argv.slice(2);

if (!token || !clientId || !mongoUri) {
  console.error(
    "❌ Missing arguments.\nUsage: node bot.js [token] [clientid] [mongourl]"
  );
  process.exit(1);
}

// Initialize Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
  ],
});

// Connect to MongoDB
mongoose
  .connect(mongoUri)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB error:", err);
    process.exit(1);
  });

// Import handlers and commands
const { handleWelcome } = require("./handlers/welcomeHandler");
const { handleGoodbye } = require("./handlers/goodbyeHandler");
const { registerCommands } = require("./commands/register");

// Bot ready event
client.once("ready", async () => {
  console.log("╔════════════════════════════════════════════════════════╗");
  console.log(`║  Bot Online: ${client.user.tag.padEnd(37)}  ║`);
  console.log("║  Made by Umbra X Development x NJGhosting              ║");
  console.log("╚════════════════════════════════════════════════════════╝");

  await registerCommands(client, clientId, token);
});

// Member join/leave events
client.on("guildMemberAdd", async (member) => {
  try {
    await handleWelcome(member);
  } catch (error) {
    console.error("Welcome error:", error);
  }
});

client.on("guildMemberRemove", async (member) => {
  try {
    await handleGoodbye(member);
  } catch (error) {
    console.error("Goodbye error:", error);
  }
});

// Command interactions
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const commands = {
    "setup-welcome": require("./commands/setupWelcome"),
    "setup-goodbye": require("./commands/setupGoodbye"),
    "test-welcome": require("./commands/testWelcome"),
    "test-goodbye": require("./commands/testGoodbye"),
    "reset-welcome": require("./commands/resetWelcome"),
    credits: require("./commands/credits"),
  };

  const cmd = commands[interaction.commandName];
  if (cmd) {
    try {
      await cmd.execute(interaction);
    } catch (error) {
      console.error(error);
      const reply = { content: "❌ Command error occurred.", ephemeral: true };
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(reply);
      } else {
        await interaction.reply(reply);
      }
    }
  }
});

// Login the bot
client.login(token);
