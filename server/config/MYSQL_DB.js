const mysql = require("mysql");
const dbConfig = require("./config.js");
const colors=require('colors');




const sql = mysql.createPool({
  connectionLimit : 10,
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});



module.exports = sql;