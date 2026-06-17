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
  username: 'Server_247',          // ĐÃ ĐỔI TÊN THÀNH SERVER_247
  version: '1.21.11'                // Phiên bản chuẩn 1.21.1
};
// =================================================================

function createBot() {
  const bot = mineflayer.createBot(botOptions);

  bot.on('spawn', () => {
    console.log('🤖 Bot Server_247 da vao server Minecraft thanh cong!');
    
    // 🔥 TÍNH NĂNG ANTI-KICK XỊN: Cứ mỗi 1 phút (60000ms), bot tự LÙI -> NHẢY -> TIẾN
    setInterval(() => {
      if (bot && bot.entity) {
        console.log('🚶 Bot dang thuc hien hanh dong anti-afk...');
        
        // 1. Lùi lại 1 block (giữ nút lùi trong 300 mili giây)
        bot.setControlState('back', true);
        
        setTimeout(() => {
          bot.setControlState('back', false);
          
          // 2. Nhảy lên
          bot.setControlState('jump', true);
          
          setTimeout(() => {
            bot.setControlState('jump', false);
            
            // 3. Tiến lên lại vị trí cũ (giữ nút tiến trong 300 mili giây)
            bot.setControlState('forward', true);
            
            setTimeout(() => {
              bot.setControlState('forward', false);
              console.log('✅ Bot da ve lai vi tri cu.');
            }, 300);
            
          }, 200);
          
        }, 300);
      }
    }, 60000); // 60000ms = 1 phút
  });

  // Tự động kết nối lại nếu server bị restart hoặc bot bị đá
  bot.on('end', () => {
    console.log('❌ Bot bi mat ket noi. Dang thu vao lai sau 15 giay...');
    setTimeout(createBot, 15000);
  });

  bot.on('error', (err) => console.log('Loi bot:', err));
}

// Kích hoạt chạy bot
createBot();
