const Donor = require("../model/donor.model");
const bcrypt = require('bcryptjs');
const { verify_subject, verify_template } = require("../config/mailtemplate");
const jwt = require('jsonwebtoken');
const { nodemailsender } = require("../config/nodemailer");
const config = require("../config/config");

exports.REGISTER_DONOR=async (req,res)=>{

	const {email}=req.body;

	if (!email || !email.trim()) 
       return res.status(500).json({message: 'Invalid Request !'});

   //checking if email is already registered
    Donor.findByEmail(email,(err, data) => {
    if (err)
      return res.status(500).json({
        message:
          err.message || "Some error occurred."
      });
    
    if(data!=null)
    	 return res.status(500).json({
        message:
          "Email is already registered! :)"
      });

  });

    const token=jwt.sign({email:email},config.JWT_SECRET,{ expiresIn: '1h' }); 
    nodemailsender(email,verify_template(token),verify_subject);


    return res.status(201).json({message: 'Verify mail sent to the emailid'});
        
}

exports.VERIFY_TOKEN=(req,res)=>{
	const {token}=req.body;

	// verify a token symmetric
	jwt.verify(token, config.JWT_SECRET, function(err, decoded) {
  		if(!token)
  			return res.status(403).json({access:false,message:"URL EXPIRED"});
  		return res.json(200).json({access:true});
	});

}

exports.SAVE_DONOR=async ()=>{

	const {email,mobile,name,city,password}=req.body;

	 // Validate request
  if (!email || !mobile || !name || !city || !password) {
    res.status(400).json({
      message: "Invalid request!"
    });
  }

  //hashing password
     const salt=await bcrypt.genSalt(12);
     const hashedpassword=await bcrypt.hash(password,salt);

  // Create a Donor
  const NewDonor = new Donor({email,mobile,password:hashedpassword,city,name});

  // Save Customer in the database
  Donor.create(NewDonor, (err, data) => {
    if (err)
      return res.status(500).jsoon({
        message:
          err.message || "Some error occurred."
      });
    else 
    {
    	const token=jwt.sign({id:donor.insertId},config.JWT_SECRET); 
    	return res.header('jwt',token).status(201).json({donor:data.newDonor,message:"Registration Complete"});
    }
  });

}

exports.LOGIN_DONOR=async ()=>{

	const {email,password}=req.body;

	 // Validate request
  if (!email || !password) {
    res.status(400).json({
      message: "Invalid request!"
    });
  }

  //checking if email is already registered
    Donor.findByEmail(email,async (err, data) => {
    if (err)
      return res.status(500).json({
        message:
          err.message || "Some error occurred."
      });
    
    if(data==null)
    	 return res.status(500).json({
        message:
          "Email is not registered! :)"
      });

    const passCheck=await bcrypt.compare(password,data.password);
    if(!passCheck) 
    	return res.status(422).json({message:'Email/Number and Password do not match'});

    const token=jwt.sign({id:donor.insertId},config.JWT_SECRET); 
    return res.header('jwt',token).status(201).json({donor:data,message:"Login Success"});
  });

  
}