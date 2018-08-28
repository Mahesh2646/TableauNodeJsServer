require('dotenv').config();
const express = require('express');
const oracledb = require('oracledb');
const async = require('async');

const dbUtils = require('./utils');

const app = express();
oracledb.autoCommit = true;



var dorelease = function (conn) {
    conn.close(function (err) {
        if (err)
            console.error(err.message);
    });
};

const insertData = () => {
    async.waterfall([
        dbUtils.doconnect,
        dbUtils.doinsert
    ],
        function (err, conn) {
            if (err) { console.error("In waterfall error cb: ==>", err, "<=="); }
            if (conn)
                dorelease(conn);
        });
};




app.get('/', (req, res) => {
    console.log(req.params);
    console.log('Server is up!')
});

app.get('/insert', (req, res) => {
    console.log('Get request initiated');
    res.status(200).json({message: 'success'})
})

app.post('/insert', (req, res) => {
    // insertData();
    console.log(req.body);
    res.status(200).json({message: 'success'});
});


app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Server is running on ${process.env.HOST}:${process.env.PORT} `);
});