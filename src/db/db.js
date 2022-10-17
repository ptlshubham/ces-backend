
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ces"
});
exports.executeSql = function (sql, callback) {
    // console.log(sql)
    con.query(sql, function (err, result) {
        if (err) {
           console.log(err)
            callback(null, err);
        }
        else {
            callback(result);
        }

    });

}
