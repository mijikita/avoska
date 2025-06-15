import React, { useState } from 'react';
//библиотека компонентов для хуков для хранения состояния формы

import axios from 'axios';
//библиотека для отправление http запросов на сервер

const Register = () => {
const [formData, setFormData] = useState({
    //formdata - хранение данных, setfordata - функция для обновления данные
login: '',
password: '',
full_name: '',
phone: '',
email: '',
});

const [message, setMessage] = useState('');
//текст котрый покажется послеотправки формы

const handleChange = (e) => {
setFormData({ ...formData, [e.target.name]: e.target.value });
};
//функция вызывается при каждом изменеии поля, сопоставляется поле и введенные данные

const handleSubmit = async (e) => {
e.preventDefault();
//переопределяем стандартное поведение браузера(отмена перезагрузки страницы)

try {
const res = await axios.post('http://localhost:5000/api/register', formData);
setMessage(res.data.message);
//отправка данных на сервер, ожидание и запись его ответа
} 
catch (error) {
    setMessage(error.response?.data?.message || 'Ошибка регистрации');
};
//обработка ответа
}

return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h2>Регистрация</h2>
            <form onSubmit={handleSubmit}>
                <input name="login" placeholder="Логин" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Пароль" onChange={handleChange} required />
                <input name="full_name" placeholder="ФИО" onChange={handleChange} required />
                <input name="phone" placeholder="Телефон" onChange={handleChange} required />
                <input name="email" placeholder="Email" onChange={handleChange} required />
                <button type="submit">Зарегистрироваться</button>
    </form>
    {message && <p>{message}</p>}
    </div>
);
};

export default Register;
