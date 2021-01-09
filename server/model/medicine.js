const mongoose=require('mongoose');




const MedicineSchema=mongoose.Schema({
	donor_id:Number,
    name:String,
    category:String,
    quantity:Number,
    remaining:Number,
    sold:Number,
    expiry:Date,
    url:{type:String, default:'https://i.guim.co.uk/img/media/20491572b80293361199ca2fc95e49dfd85e1f42/0_236_5157_3094/master/5157.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=fc5fad5b6c2b545b7143b9787d0c90b1'},
    remarks:String,
    date:{type:Date,default:Date.now}    
});

const Medicine=mongoose.model('Medicine',MedicineSchema);

module.exports=Medicine;