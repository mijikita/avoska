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

const hashedPassword = bcrypt.hashSync(password, 8);
//хэширование пароля

const sql = 'INSERT INTO users (login, password, full_name, phone, email) VALUES (?, ?, ?, ?, ?)';
const values = [login, hashedPassword, full_name, phone, email];
//sql запрос для записи в бд

db.query(sql, values, (err, result) => {
if (err) {
    console.error('Ошибка регистрации:', err);
    return res.status(500).json({ message: 'Ошибка сервера' });
}
if (password.length < 6) {
    return res.status(400).json({ message: 'Пароль должен быть от 6 символов' });
}
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Некорректный email' });
}
const phoneRegex = /^[0-9]{10,12}$/;
if (!phoneRegex.test(phone)) {
    return res.status(400).json({ message: 'Введите корректный номер телефона' });
}

//обработка ошибок
res.status(200).json({ message: 'Пользователь зарегистрирован' });
    });
});
module.exports = router;
