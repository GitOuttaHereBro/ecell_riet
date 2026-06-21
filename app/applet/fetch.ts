import https from 'https';

https.get('https://in.pinterest.com/pin/975944181767591224/', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const match = data.match(/<meta property="og:image" name="og:image" content="(.*?)"/);
    if(match) {
        console.log("ALOK:", match[1]);
    } else {
        const match2 = data.match(/og:image" content="(.*?)"/);
        console.log("ALOK2:", match2 ? match2[1] : 'not found');
    }
  });
}).on('error', (e) => {
  console.error(e);
});

https.get('https://in.pinterest.com/pin/975944181767591175/', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const match = data.match(/<meta property="og:image" name="og:image" content="(.*?)"/);
    if(match) {
        console.log("LOGO:", match[1]);
    } else {
        const match2 = data.match(/og:image" content="(.*?)"/);
        console.log("LOGO2:", match2 ? match2[1] : 'not found');
    }
  });
}).on('error', (e) => {
  console.error(e);
});
