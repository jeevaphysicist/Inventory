const UserFarmInventory = require('../Models/UserFarmInventry');


// User Create a Produced Inventory data
exports.createUserFarmInventory = (req,res)=>{
    UserFarmInventory.create(req.body).then(result=>{
        res.status(201).json({message:"Data farm Inventory Created Succesfully"})
 })
 .catch(err=>res.status(500).json({ error : err , message:"error in database" }));          
} 


// Get  a Produced Inventory
exports.GetUserFarmInventoryData = (req,res)=>{
    UserFarmInventory.find({UserID : req.params.id}).then(result=>{
        res.status(201).json({message:"Get  Farm Inventory Data Succesfully",data:result})
 })
 .catch(err=>res.status(500).json({ error : err , message:"error in database" }));          
} 


// Update Farm Inventory
exports.UpdateUserFarmINventory = async (req,res)=>{
        let {id , usedQuantity} = req.body
        try{
      // Find the product by productName
    const product = await UserFarmInventory.findOne({ _id : id });

    if (product) {
      const updatedQuantity = product.Quantity - usedQuantity;

      if (updatedQuantity >= 0) {
        // Update the quantity in the database
        await UserFarmInventory.updateOne({ _id : id}, { $set: { Quantity: updatedQuantity } });
        res.status(200).json({ message: `Updated quantity  ${updatedQuantity}` });
      } else {
        res.status(400).json({ error: `Not enough quantity available` });
      }
    } else {
      res.status(404).json({ error: `Product not found in the database` });
    }
}
catch (error) {
    console.error('Error updating quantity:', error);
    res.status(500).json({ error: 'Internal server error' });
  } 
}

