var mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    post: 3306,
    user: 'root',
    password: '',
    database: 'fleur',
    multipleStatements: true
})

db.connect((err) => {
    if (!err) {
        console.log('資料庫連線成功')
    } else {
        console.log('資料庫連線失敗', err)
    }
});


module.exports = db;