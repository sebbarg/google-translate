const https = require('https');

function translate(from, to, text) {
  const url = `https://translate.googleapis.com/translate_a/single
    ?client=gtx
    &ie=UTF-8
    &oe=UTF-8
    &dt=t
    &sl=${encodeURI(from)}
    &tl=${encodeURI(to)}
    &q=${encodeURI(text)}`
    .replace(/\s/g,'');

  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.setEncoding('utf8');
    
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json[0] && json[0][0] && json[0][0][0]) {
            resolve(json[0][0][0]);
          } else {
            reject(data);  
          }
        } catch (err) {
          reject(data);
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function test(from, to, text) {
  try {
    const result = await translate(from, to, text);
    console.log(result);
  } catch (err) {
    console.log('ERROR ' + err);
  }
}

test('en-US', 'da-DK', 'Hello, world!');
