const express=require('express');
const app = express();
const {
		REGISTER_DONOR,
		SAVE_DONOR,
		LOGIN_DONOR,
		VERIFY_TOKEN
	  }=
require('../controllers/auth.controllers');

//Donor
app.route("/donor_email")
   .post(REGISTER_DONOR)

//Save Donor
app.route("/donor_register")
   .post(SAVE_DONOR)
   .get(VERIFY_TOKEN);

//Save Donor
app.route("/donor_login")
   .post(LOGIN_DONOR)


module.exports =app;