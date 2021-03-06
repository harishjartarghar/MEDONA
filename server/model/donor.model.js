const mysql = require("mysql");
const dbConfig = require("../config/config.js");
const sql=require('../config/MYSQL_DB.js');

// constructor
const Donor = function(donor) {
  this.email = donor.email;
  this.name = donor.name;
  this.mobile = donor.mobile;
  this.password=donor.password;
  this.city = donor.city;
};


Donor.create = (newDonor, result) => {
  sql.query("INSERT INTO donors SET ?", newDonor, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }


    console.log("created Donor: ", { id: res.insertId, ...newDonor });
    result(null, { id: res.insertId, ...newDonor });
  });
};


Donor.count = (result) => {
  sql.query("SELECT count(*) FROM donors", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, res);
  });
};

Donor.findById = (donorId, result) => {
  sql.query(`SELECT * FROM donors WHERE id = ${donorId}`, (err, res) => {
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

Donor.findByEmail = (email, result) => {
  sql.query(`SELECT * FROM donors WHERE email = '${email}'`, (err, res) => {
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
    result(null, null);
  });
};


Donor.findByMobile = (email, result) => {
  sql.query(`SELECT * FROM donors WHERE mobile = '${mobile}'`, (err, res) => {
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

Donor.getAll = result => {
  sql.query("SELECT * FROM donors", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("donors: ", res);
    result(null, res);
  });
};

Donor.updateById = (donor, result) => {
  sql.query(
    "UPDATE donors SET  name = ?, mobile = ?,city=? WHERE id = ?",
    [donor.name, donor.mobile,donor.city, donor.id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Donor with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated donor: ", donor);
      result(null, donor);
    }
  );
};

Donor.PasswordById = (donor, result) => {
  sql.query(
    "UPDATE donors SET password = ? WHERE id = ?",
    [donor.password,donor.id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Donor with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated donor: ", { id: donor.id, ...donor });
      result(null, { id: donor.id, ...donor });
    }
  );
};

Donor.remove = (id, result) => {
  sql.query("DELETE FROM donors WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Donor with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted donor with id: ", id);
    result(null, res);
  });
};

Donor.removeAll = result => {
  sql.query("DELETE FROM donors", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} donors`);
    result(null, res);
  });
};

module.exports = Donor;
