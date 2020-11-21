const sql = require("../config/MYSQL_DB");

// constructor
const Donor = function(donor) {
  this.email = donor.email;
  this.name = donor.name;
  this.city = donor.active;
  this.mobile = donor.mobile;
  this.password=donor.password;
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
  sql.query(`SELECT * FROM donors WHERE email = ${email}`, (err, res) => {
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


Donor.findByMobile = (email, result) => {
  sql.query(`SELECT * FROM donors WHERE mobile = ${mobile}`, (err, res) => {
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

Donor.updateById = (id, donor, result) => {
  sql.query(
    "UPDATE donors SET email = ?, name = ?, active = ? WHERE id = ?",
    [donor.email, donor.name, donor.active, id],
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

      console.log("updated donor: ", { id: id, ...donor });
      result(null, { id: id, ...donor });
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