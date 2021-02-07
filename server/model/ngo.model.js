const mysql = require("mysql");
const dbConfig = require("../config/config.js");
const Address=require('./address.model');
const Mobile=require('./mobile.model');
const sql=require('../config/MYSQL_DB.js');


// constructor
const NGO = function(ngo) {
  this.email = ngo.email;
  this.name = ngo.name;
  this.password=ngo.password;
};


NGO.create = (data, result) => {
  sql.query("INSERT INTO ngos SET ?", data.NGO, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    const NewAddress = new Address({id:res.insertId,address:data.address});


    Address.create(NewAddress, (err, data1) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    const newMobile=new Mobile({id:res.insertId,mobile:data.mobile});

    Mobile.create(newMobile, (err, data2) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if(!data.Amobile)
    {
         console.log("created NGO: ", { id: res.insertId,...data  });
          result(null, { id: res.insertId,...data });
    }
    else
    {
      const newMobile=new Mobile({id:res.insertId,mobile:data.Amobile});

      Mobile.create(newMobile, (err, data3) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

      console.log("created NGO: ", { id: res.insertId,...data });
      result(null, { id: res.insertId,...data });
  });
    }

  });
  }); 
  });
};

NGO.count = (result) => {
  sql.query("SELECT count(*) FROM ngos", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, res);
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
  sql.query(`SELECT * FROM ngos WHERE  email='${data.email}'`, (err, res) => {
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

NGO.updateById = (ngo, result) => {
  sql.query(
    "UPDATE ngos SET name = ? WHERE id = ?",
    [ngo.name, ngo.id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
    }
  );


  sql.query(
    "UPDATE mobiles  SET mobile = ? WHERE ngo_id = ? AND mobile!=?",
    [ngo.alternate, ngo.id,ngo.mobile],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found NGO with the id
        sql.query("INSERT INTO mobiles SET ngo_id=?,mobile=?", [ngo.id,ngo.alternate], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, {...ngo });
  });
       
      }

      console.log("updated ngo: ", {  ...ngo });
      result(null, {  ...ngo });
    }
  );
};

NGO.PasswordById = (ngo, result) => {
  sql.query(
    "UPDATE ngos SET password = ? WHERE id = ?",
    [ngo.password,ngo.id],
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

      console.log("updated donor: ", { id: ngo.id, ...ngo });
      result(null, { id: ngo.id, ...ngo });
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
