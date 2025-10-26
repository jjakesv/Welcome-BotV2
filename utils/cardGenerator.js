/**
 * Test Goodbye Command
 * Made by Umbra X Development - https://discord.gg/Whq4T2vYPP
 */
const { createCanvas, loadImage, GlobalFonts } = require('@napi-rs/canvas');

try {
  GlobalFonts.registerFromPath('../fonts/ARIAL.TTF', 'Arial');
} catch (err) {
  console.log('Using default fonts');
}

function drawGlassCard(ctx, x, y, width, height) {
  ctx.save();
  
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 60;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 25;
  
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.beginPath();
  roundRect(ctx, x, y, width, height, 30);
  ctx.fill();
  
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  
  const shine = ctx.createLinearGradient(x, y, x, y + height / 2);
  shine.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
  shine.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = shine;
  ctx.beginPath();
  roundRect(ctx, x, y, width, height / 2, 30);
  ctx.fill();
  
  ctx.restore();
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function drawPetal(ctx, x, y, size, rotation, opacity) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.globalAlpha = opacity;
  
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-size * 0.4, -size * 0.6, -size * 0.2, -size * 1.2, 0, -size * 1.4);
  ctx.bezierCurveTo(size * 0.2, -size * 1.2, size * 0.4, -size * 0.6, 0, 0);
  ctx.closePath();
  
  const grad = ctx.createRadialGradient(0, -size * 0.7, 0, 0, -size * 0.7, size);
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
  grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.4)');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
  ctx.fillStyle = grad;
  ctx.fill();
  
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 0.5;
  ctx.stroke();
  
  ctx.restore();
}

function drawFloralDecoration(ctx, x, y, scale, type = 'welcome') {
  ctx.save();
  
  const petalCount = 5;
  const baseSize = 15 * scale;
  
  for (let i = 0; i < petalCount; i++) {
    const angle = (Math.PI * 2 * i) / petalCount;
    drawPetal(ctx, x, y, baseSize, angle, 0.6);
  }
  
  const centerGrad = ctx.createRadialGradient(x, y, 0, x, y, 8 * scale);
  centerGrad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
  centerGrad.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
  ctx.fillStyle = centerGrad;
  ctx.beginPath();
  ctx.arc(x, y, 8 * scale, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 1;
  ctx.stroke();
  
  ctx.restore();
}

function drawFloatingPetals(ctx, width, height) {
  ctx.save();
  
  const petals = [
    { x: width * 0.15, y: height * 0.2, size: 12, rotation: 0.3, opacity: 0.3 },
    { x: width * 0.25, y: height * 0.15, size: 10, rotation: 1.2, opacity: 0.25 },
    { x: width * 0.85, y: height * 0.25, size: 14, rotation: 2.1, opacity: 0.35 },
    { x: width * 0.9, y: height * 0.35, size: 11, rotation: 0.8, opacity: 0.28 },
    { x: width * 0.2, y: height * 0.75, size: 13, rotation: 1.5, opacity: 0.32 },
    { x: width * 0.88, y: height * 0.8, size: 12, rotation: 0.6, opacity: 0.3 },
    { x: width * 0.12, y: height * 0.85, size: 10, rotation: 2.3, opacity: 0.26 },
    { x: width * 0.93, y: height * 0.7, size: 9, rotation: 1.8, opacity: 0.24 }
  ];
  
  petals.forEach(petal => {
    drawPetal(ctx, petal.x, petal.y, petal.size, petal.rotation, petal.opacity);
  });
  
  ctx.restore();
}

function drawMinimalBackground(ctx, width, height, type = 'welcome') {
  if (type === 'welcome') {
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#1a1a2e');
    grad.addColorStop(0.5, '#16213e');
    grad.addColorStop(1, '#0f3460');
    ctx.fillStyle = grad;
  } else {
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#2d1b2e');
    grad.addColorStop(0.5, '#1e1e2e');
    grad.addColorStop(1, '#0f0f1e');
    ctx.fillStyle = grad;
  }
  ctx.fillRect(0, 0, width, height);
  
  ctx.save();
  ctx.globalAlpha = 0.03;
  
  const accent = ctx.createRadialGradient(width * 0.2, height * 0.3, 0, width * 0.2, height * 0.3, 400);
  accent.addColorStop(0, '#ffffff');
  accent.addColorStop(1, 'transparent');
  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.arc(width * 0.2, height * 0.3, 400, 0, Math.PI * 2);
  ctx.fill();
  
  const accent2 = ctx.createRadialGradient(width * 0.8, height * 0.7, 0, width * 0.8, height * 0.7, 350);
  accent2.addColorStop(0, '#ffffff');
  accent2.addColorStop(1, 'transparent');
  ctx.fillStyle = accent2;
  ctx.beginPath();
  ctx.arc(width * 0.8, height * 0.7, 350, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.restore();
}

async function drawCleanAvatar(ctx, avatarUrl, x, y, size) {
  ctx.save();
  
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowBlur = 40;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 15;
  
  const glow = ctx.createRadialGradient(x, y, size / 2, x, y, size / 2 + 20);
  glow.addColorStop(0, 'rgba(255, 255, 255, 0)');
  glow.addColorStop(0.8, 'rgba(255, 255, 255, 0.1)');
  glow.addColorStop(1, 'rgba(255, 255, 255, 0.3)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(x, y, size / 2 + 20, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(x, y, size / 2 + 8, 0, Math.PI * 2);
  ctx.stroke();
  
  ctx.shadowBlur = 0;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, size / 2 + 14, 0, Math.PI * 2);
  ctx.stroke();
  
  ctx.shadowColor = 'transparent';
  ctx.beginPath();
  ctx.arc(x, y, size / 2, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  
  const avatar = await loadImage(avatarUrl);
  ctx.drawImage(avatar, x - size / 2, y - size / 2, size, size);
  
  ctx.restore();
}

async function createWelcomeCard(member) {
  const canvas = createCanvas(1000, 400);
  const ctx = canvas.getContext('2d');
  
  drawMinimalBackground(ctx, canvas.width, canvas.height, 'welcome');
  
  drawFloatingPetals(ctx, canvas.width, canvas.height);
  
  drawGlassCard(ctx, 280, 50, 690, 300);
  
  drawFloralDecoration(ctx, 320, 80, 0.8, 'welcome');
  drawFloralDecoration(ctx, 930, 90, 0.7, 'welcome');
  drawFloralDecoration(ctx, 310, 320, 0.75, 'welcome');
  drawFloralDecoration(ctx, 920, 310, 0.85, 'welcome');
  
  const avatarSize = 180;
  const avatarX = 150;
  const avatarY = canvas.height / 2;
  
  await drawCleanAvatar(
    ctx,
    member.user.displayAvatarURL({ extension: 'png', size: 512 }),
    avatarX,
    avatarY,
    avatarSize
  );
  
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
  ctx.shadowBlur = 15;
  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = 3;
  
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.font = 'bold 58px Arial, sans-serif';
  ctx.fillText('WELCOME', 310, 115);
  
  ctx.shadowBlur = 10;
  ctx.font = 'bold 46px Arial, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  const username = member.user.username;
  const displayName = username.length > 15 ? username.substring(0, 15) + '...' : username;
  ctx.fillText(displayName, 310, 180);
  
  ctx.font = '32px Arial, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  const guildName = member.guild.name;
  const displayGuild = guildName.length > 17 ? guildName.substring(0, 17) + '...' : guildName;
  ctx.fillText(`to ${displayGuild}`, 310, 230);
  
  ctx.shadowBlur = 20;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.beginPath();
  roundRect(ctx, 310, 255, 230, 48, 24);
  ctx.fill();
  
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  
  ctx.shadowBlur = 5;
  ctx.font = 'bold 25px Arial, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.fillText(`Member #${member.guild.memberCount}`, 335, 286);
  
  ctx.restore();
  
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
  ctx.shadowBlur = 5;
  ctx.font = '14px Arial, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.fillText('Made by Umbra X Development', 310, 328);
  ctx.restore();
  
  return canvas.toBuffer('image/png');
}

async function createGoodbyeCard(member) {
  const canvas = createCanvas(1000, 400);
  const ctx = canvas.getContext('2d');
  
  drawMinimalBackground(ctx, canvas.width, canvas.height, 'goodbye');
  
  drawFloatingPetals(ctx, canvas.width, canvas.height);
  
  drawGlassCard(ctx, 280, 50, 690, 300);
  
  drawFloralDecoration(ctx, 320, 80, 0.8, 'goodbye');
  drawFloralDecoration(ctx, 930, 90, 0.7, 'goodbye');
  drawFloralDecoration(ctx, 310, 320, 0.75, 'goodbye');
  drawFloralDecoration(ctx, 920, 310, 0.85, 'goodbye');
  
  const avatarSize = 180;
  const avatarX = 150;
  const avatarY = canvas.height / 2;
  
  await drawCleanAvatar(
    ctx,
    member.user.displayAvatarURL({ extension: 'png', size: 512 }),
    avatarX,
    avatarY,
    avatarSize
  );
  
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
  ctx.shadowBlur = 15;
  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = 3;
  
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.font = 'bold 58px Arial, sans-serif';
  ctx.fillText('GOODBYE', 310, 115);
  
  ctx.shadowBlur = 10;
  ctx.font = 'bold 46px Arial, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  const username = member.user.username;
  const displayName = username.length > 15 ? username.substring(0, 15) + '...' : username;
  ctx.fillText(displayName, 310, 180);
  
  ctx.font = '32px Arial, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.fillText("We'll miss you!", 310, 230);
  
  ctx.shadowBlur = 20;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.beginPath();
  roundRect(ctx, 310, 255, 280, 48, 24);
  ctx.fill();
  
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  
  ctx.shadowBlur = 5;
  ctx.font = 'bold 23px Arial, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.fillText('Bye bye!', 335, 286);
  
  ctx.restore();
  
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
  ctx.shadowBlur = 5;
  ctx.font = '14px Arial, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.fillText('Made by Umbra X Development', 310, 328);
  ctx.restore();
  
  return canvas.toBuffer('image/png');
}

module.exports = { createWelcomeCard, createGoodbyeCard };
