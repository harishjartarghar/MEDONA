const jwt=require('jsonwebtoken');
const config = require("../config/config");
const Donor = require("../model/donor.model");
const Ngo = require("../model/ngo.model");

exports.DonorVerify=(req,res,next)=>{
    const token=req.header('token');
    console.log(token)
    if(!token) return res.status(401).json({message:"Acess Denied"});

    try {
        
        const verified=jwt.verify(token,config.JWT_SECRET);

         Donor.findById(verified.id,async (err, data) => {
    		req.donor = data;
            req.donor.password=undefined;
            next();
  		});

    } catch (error) {
        return res.status(400).json({ message: 'Token is not valid' ,error:error});
    }
}




exports.NgoVerify=(req,res,next)=>{
    const token=req.header('token');
    if(!token) return res.status(401).json({message:"Acess Denied"});

    try {
        
        const verified=jwt.verify(token,config.JWT_SECRET);

         Ngo.findById(verified.id,async (err, data) => {
    		req.ngo = data;
            req.ngo.password=undefined;
            next();
  		});

    } catch (error) {
        return res.status(400).json({ message: 'Token is not valid' ,error:error});
    }
}