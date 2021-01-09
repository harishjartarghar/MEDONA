var cloudinary = require('cloudinary');
const Medicine =require('../model/medicine');
const Donor = require("../model/donor.model");
const Ngo = require("../model/ngo.model");
const { ngo_order,ngo_order_template,donor_order,donor_order_template } = require("../config/mailtemplate");

const Order =require('../model/order');
const { uploadImage } = require('../service/cloudinary');
const { VERIFY_MAIL } = require("../config/nodemailer");

exports.DONATE_MEDICINE=async (req,res)=>{
var newMedicine;
if (req.file) {
	try{
		
		const result=await uploadImage(req.file);
		newMedicine=new Medicine({donor_id:req.donor.id,url:result.url,remaining:req.body.quantity,sold:0,...req.body});
	}catch(error)
	{
  		res.status(500).json({message:"something went wrong!"});

	}  
      
  } else { 
    newMedicine=new Medicine({donor_id:req.donor.id,remaining:req.body.quantity,sold:0,...req.body});
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

exports.GET_ALL_DONATIONS=async (req,res)=>{
  const donations=await Medicine.find({}).sort({"_id":-1});
  return res.json(donations);
}


exports.PLACE_ORDER=async (req,res)=>{
  const {item}=req.body;

  for(var i=0;i<item.length;i++)
  { const x=item[i];
    var d=await Medicine.findById(item[i]._id);
    await Medicine.findByIdAndUpdate(item[i]._id,{remaining:d.remaining-item[i].qty,sold:d.sold+item[i].qty});
     
     Donor.findById(item[i].donor_id,(err, result) => {
     console.log("hello",x);
      VERIFY_MAIL(result.email,donor_order_template(x),donor_order);
      VERIFY_MAIL(req.ngo.email,ngo_order_template(x,result.name,8762448499),ngo_order);
    });



    
  }

  const NewOrder=new Order({ngo_id:req.ngo.id,item:item});
  NewOrder.save();

  return res.json({message:"Success"});
}

exports.GET_ORDER=async (req,res)=>{
  
const order=await Order.find({ngo_id:req.ngo.id}).sort({"_id":-1});
console.log(order)
  return res.json(order);
}

exports.DATA_CONTROLLER=async (req,res)=>{
  const total=await Medicine.aggregate([ { $match: {} }, { $group:{ _id : null, sum : { $sum: "$quantity" } }}]);
  const sold=await Medicine.aggregate([ { $match: {} }, { $group:{ _id : null, sum : { $sum: "$sold" } }}]);
  const category=await Medicine.aggregate([{ $group: { _id : '$category', sum : { $sum: "$quantity" } }}]);
  const category_sold=await Medicine.aggregate([{ $group: { _id : '$category', sum : { $sum: "$sold" } }}]);

let label1=[];
let data1=[];
for(let i=0;i<category.length;i++){

  data1.push(category[i].sum)
  label1.push(category[i]._id)
}

let label2=[];
let data2=[];
for(let i=0;i<category_sold.length;i++){

  data2.push(category_sold[i].sum)
  label2.push(category_sold[i]._id)
}

var donor=0,ngo=0;

 Donor.count((err, result) => {
  donor=result[0]["count(*)"];

     Ngo.count((err, r) => {
     ngo=r[0]["count(*)"];
     return res.json({total:total[0].sum,sold:sold[0].sum,label1,label2,data1,data2,donor,ngo})
    });
    });
 

}