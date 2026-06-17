const express = require('express');
const mineflayer = require('mineflayer');
const app = express();
const PORT = process.env.PORT || 3000;

// Giữ cho Render không bị tắt bot
app.get('/', (req, res) => {
  res.send('Bot Minecraft dang hoat dong online 24/7!');
});
app.listen(PORT, () => {
  console.log(`Web server dang chay tren cong ${PORT}`);
});

// ================= CẤU HÌNH BOT MINECRAFT CỦA BẠN =================
const botOptions = {
  host: '168.119.210.168',         // IP server của bạn
  port: 3035,                      // Port server của bạn
  username: 'BotTreo247',          // Tên hiển thị của Bot trong game (Bạn đổi tên khác tùy ý)
  version: '1.21.11'                // Đang để mặc định là 1.20.1. Nếu server dùng bản khác, bạn hãy sửa lại số này nhé!
};
// =================================================================

function createBot() {
  const bot = mineflayer.createBot(botOptions);

  bot.on('spawn', () => {
    console.log('🤖 Bot da vao server Minecraft thanh cong!');
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    if (message === 'hello') {
      bot.chat(`Chao ${username}! Toi la bot treo may 24/7.`);
    }
  });

  // Tự động kết nối lại nếu server bị restart hoặc bot bị kick
  bot.on('end', () => {
    console.log('❌ Bot bi mat ket noi. Dang thu vao lai sau 15 giay...');
    setTimeout(createBot, 15000);
  });

  bot.on('error', (err) => console.log('Loi bot:', err));
}

// Kích hoạt chạy bot
createBot();
