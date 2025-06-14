const mysql = require('mysql2');

//  соединение с базой данных
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',     
  database: 'avoska' 
});

module.exports = connection;
