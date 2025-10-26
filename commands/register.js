/**
 * Command Registration
 * Made by Umbra X Development - https://discord.gg/Whq4T2vYPP
 */

const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "setup-welcome",
    description: "Setup welcome system",
    options: [
      {
        name: "channel",
        description: "Channel for welcome messages",
        type: 7,
        required: true,
      },
      {
        name: "message",
        description: "Welcome message (use {user}, {server}, {memberCount})",
        type: 3,
        required: false,
      },
      {
        name: "card",
        description: "Enable welcome card",
        type: 5,
        required: false,
      },
      {
        name: "dm",
        description: "Enable DM greeting",
        type: 5,
        required: false,
      },
      {
        name: "emoji",
        description: "Reaction emoji",
        type: 3,
        required: false,
      },
    ],
  },
  {
    name: "setup-goodbye",
    description: "Setup goodbye system",
    options: [
      {
        name: "channel",
        description: "Channel for goodbye messages",
        type: 7,
        required: true,
      },
      {
        name: "message",
        description: "Goodbye message",
        type: 3,
        required: false,
      },
      {
        name: "card",
        description: "Enable goodbye card",
        type: 5,
        required: false,
      },
    ],
  },
  {
    name: "test-welcome",
    description: "Test welcome message",
  },
  {
    name: "test-goodbye",
    description: "Test goodbye message",
  },
  {
    name: "reset-welcome",
    description: "Reset welcome settings to default",
  },
  {
    name: "credits",
    description: "Show bot credits and support server",
  },
];

async function registerCommands(client, clientid, token) {
  const rest = new REST({ version: "10" }).setToken(token);

  try {
    console.log("🔄 Registering slash commands...");

    await rest.put(Routes.applicationCommands(clientid), {
      body: commands,
    });

    console.log("✅ Slash commands registered!");
  } catch (error) {
    console.error("❌ Error registering commands:", error);
  }
}

module.exports = { registerCommands };
