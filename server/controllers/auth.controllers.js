const Donor = require("../model/donor.model");
const Ngo = require("../model/ngo.model");
const Mobile = require("../model/mobile.model");
const bcrypt = require('bcryptjs');
const { verify_subject, verify_template,ngo_verify_template,ngo_verify_subject,donor_forgot_template ,ngo_forgot_template } = require("../config/mailtemplate");
const jwt = require('jsonwebtoken');
const { VERIFY_MAIL } = require("../config/nodemailer");
const config = require("../config/config");


exports.REGISTER_DONOR=async (req,res)=>{

	const {email}=req.body;
console.log(req.body);

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

exports.DONOR_VERIFY_TOKEN=(req,res)=>{
	const {token}=req.headers;
	// verify a token symmetric
	jwt.verify(token, config.JWT_SECRET, function(err, decoded) {
		  if(err)
      {
        
        return res.status(403).json({access:false,message:"LINK EXPIRED/INVALID"});
  			
      }
  		if(!decoded)
  			return res.status(403).json({access:false,message:"URL EXPIRED"});
  //checking if email is already registered
    Donor.findByEmail(decoded.email,async (err, data) => {
    if (err)
      return res.status(403).json({access:false,message:"SOMETHING WENT WRONG!"});
    
    if(data!=null)
       return res.status(403).json({access:false,message:"DED SHANE ! REGISTRATION COMPLETE HUA HAI"});

    return res.status(200).json({access:true,email:decoded.email,mobile:decoded.mobile,type:decoded.type});
  });    

  		
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
    	return res.status(201).json({jwt:token,donor:data,message:"Registration Complete"});
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
    return res.status(201).json({'jwt':token,donor:data,message:"Login Success"});
  });

  
}

exports.PASSWORD_DONOR=async (req,res)=>{
      //hashing password
     const salt=await bcrypt.genSalt(12);
     const hashedpassword=await bcrypt.hash(req.body.password,salt);

      //checking if email is already registered
    Donor.PasswordById({password:hashedpassword,id:req.donor.id},async (err, data) => {
    if (err)
      return res.status(500).json({
        message:
          err.message || "Some error occurred."
      });
    return res.status(201).json({message:"success"});
  });

}

exports.PROFILE_DONOR=async (req,res)=>{
    const donor={name:req.body.name,mobile:req.body.mobile,city:req.body.city,id:req.donor.id}

      //checking if email is already registered
    Donor.updateById(donor,async (err, data) => {
    if (err)
      return res.status(500).json({
        message:
          err.message || "Some error occurred."
      });
    return res.status(201).json(data);
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

exports.NGO_VERIFY_TOKEN=(req,res)=>{
  const {token}=req.headers;
  // verify a token symmetric
  jwt.verify(token, config.JWT_SECRET, function(err, decoded) {
      if(err)
      {
        
        return res.status(403).json({access:false,message:"LINK EXPIRED/INVALID"});
        
      }
      if(!decoded)
        return res.status(403).json({access:false,message:"URL EXPIRED"});
      console.log(decoded);
  //checking if email is already registered
    Ngo.findByEmail(decoded.email,async (err, data) => {
    if (err)
      return res.status(403).json({access:false,message:"SOMETHING WENT WRONG!"});
    
    if(data!=null)
       return res.status(403).json({access:false,message:"DED SHANE ! REGISTRATION COMPLETE HUA HAI"});

    return res.status(200).json({access:true,email:decoded.email,mobile:decoded.mobile,type:decoded.type});
  });    

      
  });

}

exports.SAVE_NGO=async (req,res)=>{

  const {email,mobile,Amobile,name,address,password}=req.body;

   // Validate request
  if (!email || !mobile || !name || !password) {
    return res.status(400).json({
      message: "Invalid request!"
    });
  }

  //hashing password
     const salt=await bcrypt.genSalt(12);
     const hashedpassword=await bcrypt.hash(password,salt);

  // Create a Donor
  const NewNGO = new Ngo({email,password:hashedpassword,name});

  // Save Customer in the database
  Ngo.create({NGO:NewNGO,mobile,Amobile,address}, (err, data) => {
    if (err)
      return res.status(500).json({
        message:
          err.message || "Some error occurred."
      });
    else 
    {
      const token=jwt.sign({id:data.id},config.JWT_SECRET); 
      data.NGO.password=undefined;
      return res.status(201).json({'jwt':token,ngo:data,message:"Registration Complete"});
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

    Mobile.findById(data.id,async (err, result) => {
      console.log("mobile",result[0].mobile)
      const mobile=result[0]?result[0].mobile:null;
      const alternate=result[1]?result[1].mobile:null;
        return res.status(201).json({jwt:token,donor:{...data,mobile:mobile,alternate:alternate},message:"Login Success"});
    });

    
  });

  
}


exports.DONOR_FORGOT_PASSWORD=async (req,res)=>{
  const {email}=req.body;

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
      
    
    if(data)
       {
         const token=jwt.sign({id:data.id},config.JWT_SECRET,{ expiresIn: '1h' }); 
         VERIFY_MAIL(email,donor_forgot_template(token),"RESET PASSWORD");


         return res.status(201).json({message: 'PASSWORD RESET LINK SENT TO EMAIL'});
       }

   return res.status(422).json({message: 'EMAIL IS NOT REGISTERED!'});

  });
}

exports.DONOR_SET_FORGOT_PASSWORD=async (req,res)=>{
    const {password}=req.body;
    //hashing password
     const salt=await bcrypt.genSalt(12);
     const hashedpassword=await bcrypt.hash(password,salt);


        //checking if email is already registered
    Donor.PasswordById({password:hashedpassword,id:req.donor.id},async (err, data) => {
    if (err)
      return res.status(500).json({
        message:
          err.message || "Some error occurred."
      });
    return res.status(201).json("success");
  });
}


exports.NGO_FORGOT_PASSWORD=async (req,res)=>{
  const {email}=req.body;

  //checking if email is already registered
    Ngo.findByEmail(email,(err, data) => {
    if (err)
    {
      console.log(err);
      return res.status(500).json({
        message:
          err.message || "Some error occurred."
      });
    }
      
    
    if(data)
       {
         const token=jwt.sign({id:data.id},config.JWT_SECRET,{ expiresIn: '1h' }); 
         VERIFY_MAIL(email,ngo_forgot_template(token),"RESET PASSWORD");


         return res.status(201).json({message: 'PASSWORD RESET LINK SENT TO EMAIL'});
       }

   return res.status(422).json({message: 'EMAIL IS NOT REGISTERED!'});

  });
}

exports.NGO_SET_FORGOT_PASSWORD=async (req,res)=>{
    const {password}=req.body;
    //hashing password
     const salt=await bcrypt.genSalt(12);
     const hashedpassword=await bcrypt.hash(password,salt);


        //checking if email is already registered
    Ngo.PasswordById({password:hashedpassword,id:req.ngo.id},async (err, data) => {
    if (err)
      return res.status(500).json({
        message:
          err.message || "Some error occurred."
      });
    return res.status(201).json("success");
  });
}