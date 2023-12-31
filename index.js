const express = require('express');
const axios = require('axios');
const uuid = require('uuid');
const app = express();
const port = 3000;

app.use(express.static('public')); // para servir seus arquivos estáticos

app.get('/api/conselho', async (req, res) => {
  const language = req.query.language || 'en';
  const url = `${process.env.URL}${language}`;
  const headers = {
    'Ocp-Apim-Subscription-Key': process.env.SUBSCRIPTION_KEY,
    'Ocp-Apim-Subscription-Region': process.env.SUBSCRIPTION_REGION,
    'Content-type': 'application/json',
    'X-ClientTraceId': uuid.v4()
  };
  const body = [{ 'Text': req.query.texto }];

  try {
    const response = await axios({
      baseURL: url,
      method: 'post',
      headers: headers,
      data: body,
      responseType: 'json'
    });
    res.json(response.data[0].translations[0].text);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ocorreu um erro ao traduzir o texto.');
  }
});

app.listen(port, () => {
  console.log(`App ouvindo na porta ${port}`);
});
