const express=require('express');
const app = express();
const {
		REGISTER_DONOR,
		SAVE_DONOR,
		LOGIN_DONOR,
		VERIFY_TOKEN,
		REGISTER_NGO,
		SAVE_NGO,
		LOGIN_NGO,
	  }=
require('../controllers/auth.controllers');

//Donor
app.route("/donor_email")
   .post(REGISTER_DONOR)

//Save Donor
app.route("/donor_register")
   .post(SAVE_DONOR)
   .get(VERIFY_TOKEN);

//Login Donor
app.route("/donor_login")
   .post(LOGIN_DONOR)

//NGO
app.route("/ngo_email")
   .post(REGISTER_NGO)

//Save NGO
app.route("/ngo_register")
   .post(SAVE_NGO)
   .get(VERIFY_TOKEN);

//Login Donor
app.route("/ngo_login")
   .post(LOGIN_NGO)


module.exports =app;