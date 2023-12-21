const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const port = 3000;

app.use(bodyParser.json());

let botSettings = {
    telegramBotToken: '6719942981:AAFx5qHHv949CEjP-5TD8SbMgOmqJiEGSjc',
  openWeatherMapApiKey: '34a98540c8d22823b6955ddc500e6dbe',
}

let userAccounts = [];

app.get('/settings', (req, res) => {
  res.json(botSettings);
});

app.post('/settings', (req, res) => {
  botSettings = req.body;
  res.json({ success: true });
});


app.get('/users', (req, res) => {
  res.json(userAccounts);
});

app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  userAccounts = userAccounts.filter((user) => user.id !== userId);
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Admin panel backend listening at http://localhost:${port}`);
});

