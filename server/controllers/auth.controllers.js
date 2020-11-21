const Donor = require("../models/donor.model");
const bcrypt = require('bcryptjs');
const { verify_subject, verify_template } = require("../config/mailtemplate");
const jwt = require('jsonwebtoken');
const { nodemailsender } = require("../config/nodemailer");

exports.REGISTER_DONOR=async (req,res)=>{
	{email}=req.body;
}


exports.SAVE_DONOR=async ()=>{
	
}