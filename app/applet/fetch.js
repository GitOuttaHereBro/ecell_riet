const https = require('https');
https.get('https://in.pinterest.com/pin/975944181767591342/', (res) => {
  let data = '';
  res.on('data', (c) => data += c);
  res.on('end', () => {
    const urls = data.match(/https:\/\/i\.pinimg\.com\/originals\/[a-f0-9\/]+\.(png|jpg)/g);
    console.log(urls ? [...new Set(urls)].join('\n') : "no urls");
  });
});
