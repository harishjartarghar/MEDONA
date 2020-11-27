const mysql = require("mysql");
const dbConfig = require("../config/config.js");

// Create a connection to the database
const sql = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// constructor
const Address = function(data) {
  this.id=data.id;
  this.street = data.address.street;
  this.city =data.address.city;
  this.district = data.address.district;
  this.state=data.address.state;
  this.pincode = data.address.pincode;
};


Address.create = (newAddress, result) => {
  sql.query("INSERT INTO address SET ?", newAddress, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Address: ", { ...newAddress });
    result(null, {...newAddress });
  });
};


module.exports = Address;