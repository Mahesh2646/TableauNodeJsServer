const dbConfig = require('./config');
const oracledb = require('oracledb');

module.exports = {
    doconnect : function (cb) {
    oracledb.getConnection(
        {
            user: dbConfig.user,
            password: dbConfig.password,
            connectString: dbConfig.connectString
        },
        cb);
    },
    doinsert : function (conn, cb) {
    conn.execute(
        "INSERT INTO blah3 (id,name) VALUES (:id, :name)",
        {id: {val:3}, name: {val:'Mahesh'}},  // 'bind by name' syntax
        function (err, result) {
            if (err) {
                return cb(err, conn);
            } else {
                console.log("Rows inserted: " + result.rowsAffected);  // 1
                return cb(null, conn);
            }

        });
    }
}
