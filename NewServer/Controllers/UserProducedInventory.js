const UserProducedInventory = require('../Models/UserProducedInventory');

// User Create a Produced Inventory data
exports.createUserProducedInventory = (req,res)=>{
  // console.log(req.body);
    UserProducedInventory.create(req.body).then(result=>{
        res.status(201).json({message:"Data Produced Inventory Created Succesfully"})
 })
 .catch(err=>res.status(500).json({ error : err , message:"error in database" }));          
} 


// Get  a Produced Inventory
exports.GetUserProducedInventoryData = (req,res)=>{
    UserProducedInventory.find({UserID : req.params.id}).then(result=>{
        res.status(201).json({message:"Get  Produced Inventory Data Succesfully",data:result})
 })
 .catch(err=>res.status(500).json({ error : err , message:"error in database" }));          
} 


// Update a Quantity
exports.UpdateUserProducedInventoryData = async (req, res) => {

  try {
    let insufficientQuantity = false; // Flag to track if any item has insufficient quantity
    for (const buyItem of req.body.Products) {      
       const product = await UserProducedInventory.findOne({ _id: buyItem.ProductID });
      //  console.log("req.body",product);
      if (product) {
        if (product.Quantity >= buyItem.Quantity) {
          const updatedQuantity = product.Quantity - buyItem.Quantity;
          await UserProducedInventory.updateOne(
            { _id: buyItem.ProductID },
            { $set: { Quantity: updatedQuantity } }
          );
        } else {
          insufficientQuantity = true; // Set the flag to true if any item has insufficient quantity
        }
      } else {
        res.status(404).json(`Product "${buyItem.name}" not found in the database`);
        return; // Return early if a product is not found
      }
    }

    if (insufficientQuantity) {
      res.status(200).json('Not enough quantity available for one or more products');
    } else {
      res.status(201).json('All products updated successfully');
    }
  } catch (error) {
    res.status(500).json('Error updating quantities: ' + error);
  }

}

