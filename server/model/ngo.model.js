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
const NGO = function(ngo) {
  this.email = ngo.email;
  this.name = ngo.name;
  this.mobile = ngo.mobile;
  this.password=ngo.password;
  this.city = ngo.city;
};


NGO.create = (newNGO, result) => {
  sql.query("INSERT INTO ngos SET ?", newNGO, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created NGO: ", { id: res.insertId, ...newNGO });
    result(null, { id: res.insertId, ...newNGO });
  });
};

NGO.findById = (ngoId, result) => {
  sql.query(`SELECT * FROM ngos WHERE id = ${ngoId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found ngo: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found NGO with the id
    result({ kind: "not_found" }, null);
  });
};

NGO.findByEmail = (email, result) => {
  sql.query(`SELECT * FROM ngos WHERE email = '${email}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found ngo: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found NGO with the id
    result(null, null);
  });
};


NGO.findByMobile = (email, result) => {
  sql.query(`SELECT * FROM ngos WHERE mobile = '${mobile}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found ngo: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found NGO with the id
    result({ kind: "not_found" }, null);
  });
};


NGO.findByEmailorMobile = (data, result) => {
  sql.query(`SELECT * FROM ngos WHERE mobile = '${data.mobile}' OR email='${data.email}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found ngo: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found NGO with the id
    result(null, null);
  });
};

NGO.getAll = result => {
  sql.query("SELECT * FROM ngos", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("ngos: ", res);
    result(null, res);
  });
};

NGO.updateById = (id, ngo, result) => {
  sql.query(
    "UPDATE ngos SET email = ?, name = ?, active = ? WHERE id = ?",
    [ngo.email, ngo.name, ngo.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found NGO with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated ngo: ", { id: id, ...ngo });
      result(null, { id: id, ...ngo });
    }
  );
};

NGO.remove = (id, result) => {
  sql.query("DELETE FROM ngos WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found NGO with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted ngo with id: ", id);
    result(null, res);
  });
};

NGO.removeAll = result => {
  sql.query("DELETE FROM ngos", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} ngos`);
    result(null, res);
  });
};

module.exports = NGO;
