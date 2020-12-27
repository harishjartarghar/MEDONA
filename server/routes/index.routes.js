const express=require('express');
const app = express();
const {
		DONATE_MEDICINE,
		GET_DONATIONS,
		UPDATE_DONATION,
		DELETE_DONATION,
		GET_ALL_DONATIONS
		
	  }=
require('../controllers/index.controllers');
const {DonorVerify,NgoVerify}=require('../middleware/auth');

const { parseImageUpload } =require('../service/uploader');


app.route("/donate")
   .post(DonorVerify,parseImageUpload(),DONATE_MEDICINE)
   .get(DonorVerify,GET_DONATIONS)
   .put(DonorVerify,UPDATE_DONATION)
   .delete(DonorVerify,DELETE_DONATION)
   
app.route("/donate_all")
   .get(NgoVerify,GET_ALL_DONATIONS)


module.exports =app;