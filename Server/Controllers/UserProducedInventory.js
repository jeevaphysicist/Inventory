const UserProducedInventory = require('../Models/UserProducedInventry');

// User Create a Produced Inventory data
  exports.createUserProducedInventory = async (req, res) => {
    try {
      // console.log('req.body', req.body);
      const quantity = parseInt(req.body.Quantity, 10);
  
      // Find the product in the database based on ProductID
      let product = await UserProducedInventory.findOne({ ProductID: req.body.ProductID });
  
      // console.log('product', product);
  
      if (!product) {
        // If the product is not found, create a new document
  
        let data = {
          ProductID: req.body.ProductID,
          ProductName: req.body.ProductName,
          QuantityType: req.body.QuantityType,
          Quantity: quantity,
          UserID: req.body.UserID,
        };
  
        UserProducedInventory.create(data)
          .then((result) => {
            res.status(201).json({ message: 'Data Farm Inventory Created Successfully' });
          })
          .catch((err) => {
            res.status(500).json({ error: err, message: 'Error in database' });
          });
      } else {
        // If the product is found, update the quantity
        product.Quantity = product.Quantity + quantity;
  
        // Save the updated product
        await product.save();
  
        return res.status(200).json({ message: 'Quantity updated successfully' });
      }
    } catch (err) {
      // Handle any unexpected errors
      res.status(500).json({ error: err, message: 'Internal server Error' });
    }
  };


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
       const product = await UserProducedInventory.findOne({ _id: buyItem.id });
      //  console.log("req.body",product);
      if (product) {
        if (product.Quantity >= buyItem.Quantity) {
          const updatedQuantity = product.Quantity - buyItem.Quantity;
          await UserProducedInventory.updateOne(
            { _id: buyItem.id },
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

