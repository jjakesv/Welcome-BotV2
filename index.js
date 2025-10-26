/**
 * Welcome & Goodbye Bot
 * Made by Umbra X Development
 * https://discord.gg/Whq4T2vYPP
 */

const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const mongoose = require('mongoose');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
  ],
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB error:', err));

const { handleWelcome } = require('./handlers/welcomeHandler');
const { handleGoodbye } = require('./handlers/goodbyeHandler');
const { registerCommands } = require('./commands/register');

client.once('ready', async () => {
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log(`║  Bot Online: ${client.user.tag.padEnd(37)} ║`);
  console.log('║  Made by Umbra X Development                          ║');
  console.log('║  https://discord.gg/Whq4T2vYPP                        ║');
  console.log('╚════════════════════════════════════════════════════════╝');
  
  await registerCommands(client);
});

client.on('guildMemberAdd', async (member) => {
  try {
    await handleWelcome(member);
  } catch (error) {
    console.error('Welcome error:', error);
  }
});

client.on('guildMemberRemove', async (member) => {
  try {
    await handleGoodbye(member);
  } catch (error) {
    console.error('Goodbye error:', error);
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const commands = {
    'setup-welcome': require('./commands/setupWelcome'),
    'setup-goodbye': require('./commands/setupGoodbye'),
    'test-welcome': require('./commands/testWelcome'),
    'test-goodbye': require('./commands/testGoodbye'),
    'reset-welcome': require('./commands/resetWelcome'),
    'credits': require('./commands/credits'),
  };

  const cmd = commands[interaction.commandName];
  if (cmd) {
    try {
      await cmd.execute(interaction);
    } catch (error) {
      console.error(error);
      const reply = { content: '❌ Command error occurred.', ephemeral: true };
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(reply);
      } else {
        await interaction.reply(reply);
      }
    }
  }
});

client.login(process.env.DISCORD_TOKEN);