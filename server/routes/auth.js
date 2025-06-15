const express = require('express');

const bcrypt = require('bcryptjs');
//шифрование паролей

const db = require('../db');

const router = express.Router();
//обьект маршрутизатор для описания маршрутов

router.post('/register', (req, res) => {
const { login, password, full_name, phone, email } = req.body;

if (!login || !password || !full_name || !phone || !email) {
return res.status(400).json({ message: 'Заполните все поля' });
    }



let roleId = 1;
if (login === `sklad` && password === `123qwe`){
    roleId = 2;
}



const sql = 'INSERT INTO user (login, password, full_name, phone, email, id_role) VALUES (?, ?, ?, ?, ?, ?)';
const values = [login, password, full_name, phone, email, roleId];
//sql запрос для записи в бд

db.query(sql, values, (err, result) => {
    if (err) {
        console.error('Ошибка регистрации:', err);
        return res.status(500).json({ message: 'Ошибка сервера' });
    }

const who = roleId === 2 ? 'администратор' : 'пользователь';
    res.status(200).json({ message: `Регистрация успешна (${who})` });
});


});
module.exports = router;

router.post('/login', (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).json({ message: 'Заполните все поля' });
  }

  const sql = 'SELECT * FROM user WHERE login = ?';
  db.query(sql, [login], (err, results) => {
    if (err) return res.status(500).json({ message: 'Ошибка сервера' });
    if (results.length === 0) return res.status(401).json({ message: 'Пользователь не найден' });

    const user = results[0];

    // 👉 Сравнение как обычных строк (если bcrypt отключён)
    if (password !== user.password) {
      return res.status(400).json({ message: 'Неверный пароль' });
    }

    return res.status(200).json({
      message: 'Вход выполнен',
      user: {
        id: user.id,
        login: user.login,
        role: user.id_role
      }
    });
  });
});
