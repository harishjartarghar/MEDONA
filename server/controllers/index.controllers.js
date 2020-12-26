var cloudinary = require('cloudinary');
const Medicine =require('../model/medicine');
const { uploadImage } = require('../service/cloudinary');


exports.DONATE_MEDICINE=async (req,res)=>{
var newMedicine;
if (req.file) {
	try{
		
		const result=await uploadImage(req.file);
		newMedicine=new Medicine({donor_id:req.donor.id,url:result.url,...req.body});
	}catch(error)
	{
  		res.status(500).json({message:"something went wrong!"});

	}  
      
  } else { 
    newMedicine=new Medicine({donor_id:req.donor.id,...req.body});
  }
  

  try{
  	const data=await newMedicine.save();
    console.log(data);
  	res.status(201).json(data);
  }catch(error)
  {console.log(error);
  		res.status(500).json({message:"something went wrong!"});
  }
        
}

exports.UPDATE_DONATION=async (req,res)=>{
  const data=await Medicine.findByIdAndUpdate(req.body.id,{...req.body});
  console.log(data)
  return res.json(data);
}

exports.DELETE_DONATION=async (req,res)=>{
  await Medicine.findByIdAndDelete(req.query.id);
  return res.json({message:"Success"});
}

exports.GET_DONATIONS=async (req,res)=>{
  const donations=await Medicine.find({donor_id:req.donor.id}).sort({"_id":-1});
  return res.json(donations);
}
