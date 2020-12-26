const express=require('express');
const app = express();
const {
		DONATE_MEDICINE,
		GET_DONATIONS,
		UPDATE_DONATION,
		DELETE_DONATION
		
	  }=
require('../controllers/index.controllers');
const {DonorVerify}=require('../middleware/auth');

const { parseImageUpload } =require('../service/uploader');


app.route("/donate")
   .post(DonorVerify,parseImageUpload(),DONATE_MEDICINE)
   .get(DonorVerify,GET_DONATIONS)
   .put(DonorVerify,UPDATE_DONATION)
   .delete(DonorVerify,DELETE_DONATION)
   



module.exports =app;