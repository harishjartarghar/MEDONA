const mysql = require("mysql");
const dbConfig = require("./config.js");
const colors=require('colors');

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

const connectMYSQL=async ()=>{

	connection.connect(error => {
	  if (error) 
	  	console.log(error);
	  else 
	  	console.log(`Successfully connected to the MySQL database. :)`.blue);
	});

}


module.exports = connectMYSQL;