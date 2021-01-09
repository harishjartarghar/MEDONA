const mongoose=require('mongoose');




const OrderSchema=mongoose.Schema({
    ngo_id:Number,
    item:[
        {
            name:String,
            category:String,
            qty:Number,
            expiry:Date,
            donor_id:Number
        }
    ],
    date:{type:Date,default:Date.now}    
});

const Order=mongoose.model('Order',OrderSchema);

module.exports=Order;