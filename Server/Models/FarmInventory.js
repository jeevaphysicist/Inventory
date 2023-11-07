const mongoose = require('mongoose');
const schema = mongoose.Schema({
          ProductName:{
                   type:String,
                   required:true
            },
            QuantityType:{
                type:String,
                required:true
            }
});

module.exports =  mongoose.model("FarmInventory",schema,"FarmInventory")