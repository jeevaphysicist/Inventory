const FarmInventory = require('../Models/FarmInventory');


// Admin create a FarmInventory Data
exports.createFarmInventory = (req,res)=>{
        FarmInventory.create(req.body).then(result=>{
               res.status(201).json({message:"Data Farm Inventory Created Succesfully"})
        })
        .catch(err=>res.status(500).jons({ error : err , message:"error in database" }));
} 



// Get  a Farm Inventory Data
exports.GetFarmInventoryData = (req,res)=>{
    FarmInventory.find().then(result=>{
        res.status(201).json({message:"Get Farm Inventory Data Succesfully",data:result})
 })
 .catch(err=>res.status(500).jons({ error : err , message:"error in database" }));          
} 