const ProducedInventory = require('../Models/ProducedInventory');


// Admin Create a Produced Inventory data
exports.createProducedInventory = (req,res)=>{
    
    ProducedInventory.create(req.body).then(result=>{
        res.status(201).json({message:"Data Produced Inventory Created Succesfully"})
 })
 .catch(err=>res.status(500).jons({ error : err , message:"error in database" }));          
} 


// Get  a Produced Inventory
exports.GetProducedInventoryData = (req,res)=>{
    ProducedInventory.find().then(result=>{
        res.status(201).json({message:"Get  Produced Inventory Data Succesfully",data:result})
 })
 .catch(err=>res.status(500).jons({ error : err , message:"error in database" }));          
} 

