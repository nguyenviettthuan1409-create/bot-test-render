const express = require('express');
const mineflayer = require('mineflayer');
const app = express();
const PORT = process.env.PORT || 3000;

// Giữ cho Render không bị tắt bot
app.get('/', (req, res) => {
  res.send('Bot Minecraft dang hoạt động online 24/7!');
});
app.listen(PORT, () => {
  console.log(`Web server dang chay tren cong ${PORT}`);
});

// ================= CẤU HÌNH BOT MINECRAFT TẠI ĐÂY =================
const botOptions = {
  host: 'IP_SERVER_CỦA_BẠN',       // Thay bằng IP hoặc Tên miền server của bạn (Ví dụ: abc.aternos.me)
  port: 25565,                     // Thay bằng Port server của bạn (Nếu dùng Aternos, xem dòng port gồm 5 chữ số)
  username: 'BotTreo247',          // Tên nhân vật của con Bot trong game
  version: '1.20.1'                // Thay bằng phiên bản Minecraft của server bạn (Ví dụ: 1.20.1, 1.19...)
};
// =================================================================

function createBot() {
  const bot = mineflayer.createBot(botOptions);

  bot.on('spawn', () => {
    console.log('🤖 Bot da vao server Minecraft thanh cong!');
    // Nếu server có bắt đăng nhập bằng lệnh /login, bỏ dấu // ở dòng dưới và sửa mật khẩu:
    // bot.chat('/login matkhaucua_bot'); 
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    if (message === 'hello') {
      bot.chat(`Chao ${username}! Toi la bot treo may 24/7.`);
    }
  });

  // Tự động kết nối lại nếu server bị sập hoặc bot bị kích (kick) ra ngoài
  bot.on('end', () => {
    console.log('❌ Bot bi mat ket noi. Dang thu vao lai sau 15 giay...');
    setTimeout(createBot, 15000);
  });

  bot.on('error', (err) => console.log('Loi bot:', err));
}

// Kích hoạt chạy bot
createBot();
