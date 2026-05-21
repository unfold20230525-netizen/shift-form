const https = require('https');

exports.handler = async (event) => {
  const GAS_URL = 'https://script.google.com/macros/s/AKfycbwCfBE-qtwwgyGSk6vPEnWhMu1Y6i2GKvVZ8Xj-3jc3o0QlK_Or1_z7-rhcWkioAcFv_g/exec';

  const options = {
    method: event.httpMethod,
    headers: { 'Content-Type': 'application/json' }
  };

  return new Promise((resolve) => {
    const req = https.request(GAS_URL, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
          body: data
        });
      });
    });
    req.on('error', (err) => {
      resolve({ statusCode: 500, body: JSON.stringify({ error: err.message }) });
    });
    if (event.body) req.write(event.body);
    req.end();
  });
};
