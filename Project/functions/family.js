const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { q, i } = event.queryStringParameters || {};

  if (!q || !i) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing query parameters 'q' or 'i'" }),
    };
  }

  try {
    const apiRes = await fetch(`https://india.42web.io/family/?q=${q}&i=${i}`);
    const data = await apiRes.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
