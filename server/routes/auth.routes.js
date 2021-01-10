const express=require('express');
const app = express();
const {
		REGISTER_DONOR,
		SAVE_DONOR,
		LOGIN_DONOR,
		DONOR_VERIFY_TOKEN,
		NGO_VERIFY_TOKEN,
		REGISTER_NGO,
		SAVE_NGO,
		LOGIN_NGO,
		PROFILE_DONOR,
		PASSWORD_DONOR,
		DONOR_FORGOT_PASSWORD,
		NGO_FORGOT_PASSWORD,
		DONOR_SET_FORGOT_PASSWORD,
		NGO_SET_FORGOT_PASSWORD
	  }=
require('../controllers/auth.controllers');
const {DonorVerify}=require('../middleware/auth');



//Donor
app.route("/donor_email")
   .post(REGISTER_DONOR)

//Save Donor
app.route("/donor_register")
   .post(SAVE_DONOR)
   .get(DONOR_VERIFY_TOKEN);

//Login Donor
app.route("/donor_login")
   .post(LOGIN_DONOR)

//Login Donor
app.route("/donor_profile")
   .put(DonorVerify,PROFILE_DONOR)

//Login Donor
app.route("/donor_password")
   .put(DonorVerify,PASSWORD_DONOR)


app.route("/donor_forgot_password")
   .post(DONOR_FORGOT_PASSWORD)
   .put(DonorVerify,DONOR_SET_FORGOT_PASSWORD)

//NGO
app.route("/ngo_email")
   .post(REGISTER_NGO)

//Save NGO
app.route("/ngo_register")
   .post(SAVE_NGO)
   .get(NGO_VERIFY_TOKEN);

//Login Donor
app.route("/ngo_login")
   .post(LOGIN_NGO)

app.route("/ngo_forgot_password")
   .post(NGO_FORGOT_PASSWORD)
   .put(DonorVerify,NGO_SET_FORGOT_PASSWORD)

module.exports =app;