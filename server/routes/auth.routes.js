const express=require('express');
const app = express();
const {
		REGISTER_DONOR,
		SAVE_DONOR
	  }=
require('../controllers/auth.controllers');

app.route("/register")
   .post(REGISTER_DONOR)
   .put(SAVE_DONOR);

module.exports =app;