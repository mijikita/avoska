import React, { useState } from 'react';
import axios from 'axios';


const Login = () => {
const [formData, setFormData] = useState({ login: '', password: '' });
const [message, setMessage] = useState('');

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
    e.preventDefault();
console.log('Отправка данных:', formData);

    try {
        const res = await axios.post('http://localhost:5000/api/login', formData);
            console.log('Ответ от сервера:', res.data); 
        setMessage(res.data.message);


        if (res.data.user.role === 2) {
        alert('Добро пожаловать, администратор!');
    } else {
        alert('Вы вошли как пользователь');
}

    } catch (err) {
        console.log('Ошибка при входе:', err);
        setMessage(err.response?.data?.message || 'Ошибка входа');
    }
};

return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h2>Вход</h2>
        <form onSubmit={handleSubmit}>
        <input name="login" placeholder="Логин" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Пароль" onChange={handleChange} required />
        <button type="submit">Войти</button>
        </form>
        {message && <p>{message}</p>}
    </div>
    );
};

export default Login;
