const express = require('express');
//подключаем express
const cors = require('cors');
//подключаем cors для взамодейтсвия express и react
const bodyParser = require('body-parser');
//подключаем body-parser для парсинга json

const db = require('./db');
//подключение бд

const app = express();
//обьект для настройки сервера

app.use(cors());
app.use(bodyParser.json());

db.connect((err) => {
  if (err) {
    console.log('Ошибка подключения к базе данных:', err);
  } else {
    console.log('Успешно подключено к базе данных');
  }
});

app.listen(5000, () => {
  console.log('Сервер запущен на порту 5000');
});
//запуск сервера