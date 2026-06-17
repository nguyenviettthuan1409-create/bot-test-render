const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bot cua toi dang hoat dong online 24/7!');
});

app.listen(PORT, () => {
  console.log(`Server dang chay tren cong ${PORT}`);
});

console.log("Bot da kich hoat thanh cong!");
