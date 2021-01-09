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
const Mobile = function({id,mobile}) {
  this.ngo_id=id;
  this.mobile=mobile;
};


Mobile.create = (newMobile, result) => {
  sql.query("INSERT INTO mobiles SET ?", newMobile, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Address: ", { ...newMobile });
    result(null, {...newMobile });
  });
};

Mobile.findById = (id, result) => {
  sql.query(`SELECT * FROM mobiles WHERE ngo_id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found donor: ", res);
      result(null, res);
      return;
    }

    // not found Donor with the id
    result({ kind: "not_found" }, null);
  });
};

module.exports = Mobile;