const mysql = require('mysql');
// const supplementsDE = require('./json/supplements_de.json');
// const supplementsEN = require('./json/supplements_en.json');
// const supplementsPL = require('./json/supplements_pl.json');
const collagen1DE = require('./json/collagen_3_de.json');
const collagen1EN = require('./json/collagen_3_en.json');
const collagen1PL = require('./json/collagen_3_pl.json');

let category = 4;


const con = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database: ""
});



con.connect((err) => {
    if (err) throw err;
    var sql = "INSERT INTO products (`productID`, `price`, `category`,`icon`, `souvre-url`, `name-de`, `short-description-de`,`description-de`) VALUES "; 
    for (let supplement of collagen1DE) {
        // console.log(mysql.escape(supplement.price));
        sql += "(" + mysql.escape(supplement.id) + ',' + mysql.escape(supplement.price) + ',' + category + ',' +mysql.escape(supplement.icon) + ',' + mysql.escape(supplement.url) + ',' + mysql.escape(supplement.name) + ',' + mysql.escape(supplement.shortDescription) + ',' + mysql.escape(supplement.description)+'),';
    }
    sql = sql.replace(/,\s*$/, "");
    console.log(sql)
    // console.log(sql);
    con.query(sql, function (err, result) {
        if (err) throw err;
        if(result){

            for (let supplement of collagen1EN) {
                var sql = "update products set `name-en` =" + mysql.escape(supplement.name) + ", `short-description-en` = " + mysql.escape(supplement.shortDescription) + " ,`description-en` = " + mysql.escape(supplement.description) + " where `productID` = " + mysql.escape(supplement.id);
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("1 record inserted");
                });
                console.log(sql + "\n");
            }

            for (let supplement of collagen1PL) {
                var sql = "update products set `name-pl` =" + mysql.escape(supplement.name) + ", `short-description-pl` = " + mysql.escape(supplement.shortDescription) + " ,`description-pl` = " + mysql.escape(supplement.description) + " where `productID` = " + mysql.escape(supplement.id);
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("1 record inserted");
                });
                console.log(sql + "\n");
            }
        }
    });



    // console.log(sql);




});

