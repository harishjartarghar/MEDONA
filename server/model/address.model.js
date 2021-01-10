const mysql = require("mysql");
const dbConfig = require("../config/config.js");
const sql=require('../config/MYSQL_DB.js');

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

Address.findById = (id, result) => {
  sql.query(`SELECT * FROM address WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found donor: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Donor with the id
    result({ kind: "not_found" }, null);
  });
};

module.exports = Address;