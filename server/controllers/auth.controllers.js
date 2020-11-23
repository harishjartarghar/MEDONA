const Donor = require("../model/donor.model");
const Ngo = require("../model/ngo.model");
const bcrypt = require('bcryptjs');
const { verify_subject, verify_template,ngo_verify_template,ngo_verify_subject } = require("../config/mailtemplate");
const jwt = require('jsonwebtoken');
const { VERIFY_MAIL } = require("../config/nodemailer");
const config = require("../config/config");


exports.REGISTER_DONOR=async (req,res)=>{

	const {email}=req.body;

	if (!email || !email.trim()) 
       return res.status(500).json({message: 'Invalid Request !'});

   //checking if email is already registered
    Donor.findByEmail(email,(err, data) => {
    if (err)
    {
      console.log(err);
      return res.status(500).json({
        message:
          err.message || "Some error occurred."
      });
    }
      
    
    if(data!=null)
    	 return res.status(500).json({
        message:
          "Email is already registered! :)"
      });

    const token=jwt.sign({email:email,type:"donor"},config.JWT_SECRET,{ expiresIn: '1h' }); 
    VERIFY_MAIL(email,verify_template(token),verify_subject);


    return res.status(201).json({message: 'REGISTRATION LINK SENT TO EMAIL'});

  });

  
        
}

exports.VERIFY_TOKEN=(req,res)=>{
	const {token}=req.body;

	// verify a token symmetric
	jwt.verify(token, config.JWT_SECRET, function(err, decoded) {
		if(err)
  			return res.status(403).json({access:false,message:"URL EXPIRED"});
  		if(!decoded)
  			return res.status(403).json({access:false,message:"URL EXPIRED"});
  		return res.json(200).json({access:true,email:decoded.email,mobile:decoded.mobile,type:decoded.type});
	});

}

exports.SAVE_DONOR=async (req,res)=>{

	const {email,mobile,name,city,password}=req.body;

	 // Validate request
  if (!email || !mobile || !name || !city || !password) {
    return res.status(400).json({
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
      return res.status(500).json({
        message:
          err.message || "Some error occurred."
      });
    else 
    {
    	const token=jwt.sign({id:data.id},config.JWT_SECRET); 
      data.password=null;
    	return res.header('jwt',token).status(201).json({donor:data,message:"Registration Complete"});
    }
  });

}

exports.LOGIN_DONOR=async (req,res)=>{

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

    const token=jwt.sign({id:data.id},config.JWT_SECRET);
    data.password=null; 
    return res.header('jwt',token).status(201).json({donor:data,message:"Login Success"});
  });

  
}


exports.REGISTER_NGO=async (req,res)=>{

  const {email,mobile}=req.body;

  if (!email || !email.trim() || !mobile || !mobile.trim()) 
       return res.status(500).json({message: 'Invalid Request !'});

   //checking if email is already registered
    Ngo.findByEmailorMobile({email,mobile},(err, data) => {
    if (err)
    {
      console.log(err);
      return res.status(500).json({
        message:
          err.message || "Some error occurred."
      });
    }
      
    
    if(data!=null)
       return res.status(500).json({
        message:
          "Email/Mobile No is already registered! :)"
      });

    const token=jwt.sign({email:email,mobile:mobile,type:"ngo"},config.JWT_SECRET,{ expiresIn: '1h' }); 
    VERIFY_MAIL(email,ngo_verify_template(token),ngo_verify_subject);


    return res.status(201).json({message: 'REGISTRATION LINK SENT TO EMAIL'});

  });

  
        
}


exports.SAVE_NGO=async (req,res)=>{

  const {email,mobile,name,city,password}=req.body;

   // Validate request
  if (!email || !mobile || !name || !city || !password) {
    return res.status(400).json({
      message: "Invalid request!"
    });
  }

  //hashing password
     const salt=await bcrypt.genSalt(12);
     const hashedpassword=await bcrypt.hash(password,salt);

  // Create a Donor
  const NewNGO = new Ngo({email,mobile,password:hashedpassword,city,name});

  // Save Customer in the database
  Ngo.create(NewNGO, (err, data) => {
    if (err)
      return res.status(500).json({
        message:
          err.message || "Some error occurred."
      });
    else 
    {
      const token=jwt.sign({id:data.id},config.JWT_SECRET); 
      data.password=null;
      return res.header('jwt',token).status(201).json({ngo:data,message:"Registration Complete"});
    }
  });

}

exports.LOGIN_NGO=async (req,res)=>{

  const {email,password}=req.body;

   // Validate request
  if (!email || !password) {
    res.status(400).json({
      message: "Invalid request!"
    });
  }

  //checking if email is already registered
    Ngo.findByEmail(email,async (err, data) => {
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
      return res.status(422).json({message:'Email and Password do not match'});

    const token=jwt.sign({id:data.id},config.JWT_SECRET); 
    data.password=null;
    return res.header('jwt',token).status(201).json({ngo:data,message:"Login Success"});
  });

  
}