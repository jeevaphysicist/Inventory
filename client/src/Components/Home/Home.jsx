import React ,{Fragment , useState , useEffect} from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; 
import { API } from '../../Constants';

let responsePayload ;
export default function Home() {
  const token = Cookies.get('mycookie');
  if(token != undefined){
    responsePayload = jwtDecode(token);
    
  } 
  const [user,setUser] = useState(responsePayload || false);
  const [Produced,setProduced] = useState([]);
  const [Farm,setFarm] = useState([]);
  const [productforProduced,setProductforProduced] = useState('');
  const [productforFarm,setProductforFarm] = useState('');
  const [quantityforProduced,setQuantityforProduced] = useState('');
  const [quantityforFarm,setQuantityforFarm] = useState('');
  const [productforUserProduced,setProductforUserProduced] = useState('');
  const [productforUserFarm,setProductforUserFarm] = useState('');
  // const [quantityforUserFarm,setQuantityforUserFarm] = useState('');
  // const [selectedproductforProduced,setSelectedProductforProduced] = useState('');
  const [selectquantityforProduced,setSelectQuantityforProduced] = useState('');
  const [producedinventory,setProducedInventory] = useState([]);  
  const [userfarmproductquantity,setUserfarmproductquantity] = useState('');
  const [UserproducedInventory,setUserproducedInventory] = useState([]);
  const [UserfarmInventory,setUserfarmInventory] = useState([]);

  useEffect(()=>{
      GetProducedDataHandler();
      GetFarmDataHandler();
      GetUserProducedDataHandler();
      GetUserFarmDataHandler();
  },[])

  const GetProducedDataHandler = ()=>{
    fetch(`${API}/api/Producedinventory/get-produced-data`,{method:'GET'})
    .then(res=>res.json())
    .then(result=>{
     //  console.log("result",result);
      setProduced(result.data);
    })
}

const GetFarmDataHandler = ()=>{
fetch(`${API}/api/farminventory/get-farm-data`,{method:'GET'})
.then(res=>res.json())
.then(result=>{
 // console.log("result",result);
 setFarm(result.data);
})
}

const handleProductSelection = (event) => {
  const selectedProductId = event.target.value;
  // console.log(event.target.value);
  // Find the selected product based on the ID
  const selectedProduct = Produced.find((item) => item._id === selectedProductId);
  
  setProductforProduced(selectedProduct);
};


// console.log("productselection",productforProduced);

const handleFarmSelection = (event) => {
  const selectedProductId = event.target.value;
  // Find the selected product based on the ID
  const selectedProduct = Farm.find((item) => item._id === selectedProductId);
  setProductforFarm(selectedProduct);
};

const ProducedSelecthandler =(event)=>{
  const selectedProductId = event.target.value;
  // Find the selected product based on the ID
  const selectedProduct = UserproducedInventory.find((item) => item._id === selectedProductId);
  // console.log("data gdbk gkb g",selectedProduct);
  setProductforUserProduced(selectedProduct);
}

const FarmSelecthandler =(event)=>{
  const selectedProductId = event.target.value;
  // Find the selected product based on the ID
  const selectedProduct = UserfarmInventory.find((item) => item._id === selectedProductId);
  // console.log("data gdbk gkb g",selectedProduct);
  setProductforUserFarm(selectedProduct);
}

const RemoveDispatchProducedHandler = (index)=>{
  let updatedInventory = [...producedinventory]; // Create a copy of the original array
  updatedInventory.splice(index, 1); // Remove the element at the specified index
  setProducedInventory(updatedInventory); // Set the updated array
  
}

const DispatchAddhandler =(e)=>{
  e.preventDefault();
  let data = {ProductName : productforUserProduced.ProductName,Quantity : selectquantityforProduced,ProductID:productforUserProduced._id}
  setProducedInventory((prevHr) => [...prevHr, data]);
}


const DispatchHandler = ()=>{
  // console.log("dispatch handler");
  // e.preventDefault();
  let data = {
       UserID:user.id,
       Products:producedinventory
  }
  let options ={
   method:"POST",
   headers:{"Content-Type":"application/json"},
   body:JSON.stringify(data)
};
fetch(`${API}/api/userproducedinventory/update-produced-inventory`,options)
.then(res=>res.json())
.then(result=>{
   console.log("result",result);
})
}

const FarmDispatchHandler = (e)=>{
  // console.log("dispatch handler");
  e.preventDefault();
  let data = {
       id:productforUserFarm._id,
       usedQuantity: userfarmproductquantity
  }
  let options ={
   method:"POST",
   headers:{"Content-Type":"application/json"},
   body:JSON.stringify(data)
};
fetch(`${API}/api/userfarminventory/update-farm-inventory`,options)
.then(res=>res.json())
.then(result=>{
   console.log("result",result);
})
}

const UserProducedProductAddHandler =(e)=>{
  
       e.preventDefault();
       let data = {
            UserID:user.id,
            ProductName:productforProduced.ProductName,
            QuantityType:productforProduced.QuantityType,
            Quantity:quantityforProduced,
            ProductID:productforProduced.ProductID
       }
       let options ={
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
};
fetch(`${API}/api/userproducedinventory/create-produced-inventory`,options)
.then(res=>res.json())
.then(result=>{
        console.log("result",result);
})
}

const UserFarmProductAddHandler =(e)=>{
  console.log("product from ",productforFarm)
  e.preventDefault();
  let data = {
       UserID:user.id,
       ProductName:productforFarm.ProductName,
       QuantityType:productforFarm.QuantityType,
       Quantity:quantityforFarm,
       ProductID:productforFarm.ProductID
  }
  let options ={
   method:"POST",
   headers:{"Content-Type":"application/json"},
   body:JSON.stringify(data)
};
fetch(`${API}/api/userfarminventory/create-farm-inventory`,options)
.then(res=>res.json())
.then(result=>{
   console.log("result",result);
})
}

const GetUserProducedDataHandler = ()=>{
  fetch(`${API}/api/userproducedinventory/get-produced-data/${user.id}`,{method:'GET'})
  .then(res=>res.json())
  .then(result=>{
   //  console.log("result",result);
    setUserproducedInventory(result.data);
  })
}

const GetUserFarmDataHandler = ()=>{
fetch(`${API}/api/userfarminventory/get-farm-data/${user.id}`,{method:'GET'})
.then(res=>res.json())
.then(result=>{
// console.log("result",result);
setUserfarmInventory(result.data);
})
}



  return (
    <Fragment>
         <Header/>
         <main className='my-3' style={{minHeight:"82.98vh"}}>
         <Tabs>
    <TabList>
      <Tab>Produced Inventory</Tab>
      <Tab>Farm Inventory</Tab>
    </TabList>

    <TabPanel>
      <h2>Produced Inventory</h2>
  <div className="mx-5 py-3 px-3card">
      <Tabs>
    <TabList>
       <Tab>Dispatch</Tab>
       <Tab>Inventory</Tab>
       <Tab>Add To Inventory</Tab>
    </TabList>

    <TabPanel>
      <h2>Dispatch</h2>
      <div className='row mx-auto container'>
         <div className="col-5">
               <form className='card p-2' onSubmit={DispatchAddhandler}>
                <div className="row my-2">
                    <div className="col-12">
                    <div className='my-2'>Products</div>
                    <select style={{width:"100%",borderRadius:"7px"}} required onChange={ProducedSelecthandler}>
                    <option value="">-- Select a Product ---</option>
                    {UserproducedInventory.length > 0 && UserproducedInventory.map(item=><option key={item._id} value={item._id}>{item.ProductName} ({item.ProductID}) </option>) }
                    
                    
                </select>
                    </div>
                   
                </div>
                 <div className="row my-3">
                    <div className="col-12">
                    <div class="input-group my-3 ">
                    <input type="text" class="form-control" placeholder="0" required aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={(e)=>{setSelectQuantityforProduced(e.target.value)}}/>
                    <span className="input-group-text" id="basic-addon2">{productforUserProduced ? productforUserProduced.QuantityType : ""}</span>
                    </div>  
                    </div>
                    <div className='col-12 my-3'>
                          <button className='btn btn-block btn-success' type='submit'>Save</button>
                    </div>
                 </div>
               
                </form>
         </div>
         <div className="col-7">
             <div className='row '>
                 <div className="col-12">
                     <div className="card py-2">
                          <div className="row mx-auto">
                            <div className="col-12 my-2">
                              {
                                producedinventory.length > 0 && producedinventory.map((item,index)=><div className="card p-2" style={{position:"relative"}}>
                                <div className='my-2 text-start'>Product Name : {item.ProductName}</div>
                                <div className='my-2 text-start'>Quantity : {item.Quantity}</div>
                                <div  style={{position:"absolute",right:"10px",fontSize:"20px"}} onClick={e=>RemoveDispatchProducedHandler(index)}>x</div>
                                </div>)
                              }
                                                                
                            </div>
                            {
                              
                                producedinventory.length > 0 && <>  <div className="col-5">
                                <button className='btn btn-block btn-success' onClick={DispatchHandler}>Save</button>
                                </div>
                                <div className="col-7">
                                <button className='btn btn-block btn-danger' onClick={e=>setProducedInventory([])}>All Clear</button>
                                </div></>
                            }
                           
                          
                            
                          </div>
                     </div>
                 </div>
             </div>
         </div>
      </div>
    </TabPanel>

    <TabPanel>
      <h2>Inventory</h2>
      <table class="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Product Name</th>
      <th scope="col">Quantity</th>      
    </tr>
  </thead>
  <tbody>
    {
      UserproducedInventory.length > 0 && UserproducedInventory.map(item=> <tr key={item._id}>
      
        <td>{item.ProductID}</td>
        <td>{item.ProductName}</td>
        <td>{item.Quantity} {item.QuantityType} </td>
      </tr>)
    }
   

  </tbody>
</table>
    </TabPanel>

    <TabPanel>
      <h2>Add To Inventory</h2>
      <div className='row mx-auto '>
          <div className="col-12">
              <form className="card mx-3 py-3 px-2" onSubmit={UserProducedProductAddHandler}>
              <select class="form-select" aria-label="Default select example" onChange={handleProductSelection} required>
               <option value="">--Select Product--</option>
               {
                Produced.length >0 && Produced.map(items=><option key={items._id} value={items._id} >{items.ProductName} ({items.ProductID})</option>)
               }
              
              
             </select>
             <div class="input-group my-3 ">
              <input type="text" class="form-control" placeholder="0" required aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={e=>setQuantityforProduced(e.target.value)}/>
              <span class="input-group-text" id="basic-addon2">{productforProduced ? productforProduced.QuantityType : ""}</span>
             </div>
             <div>
                <button className="btn btn-block btn-success" type='submit'>Save</button>
             </div>
              </form>
           
      
                 </div>
      </div>
    </TabPanel>
  </Tabs>
  </div>

    </TabPanel>

    <TabPanel>
      <h2>Farm Inventory</h2>
<div className="mx-3 py-3 px-3 card">
    <Tabs>
    <TabList>
      <Tab>Use Inventory</Tab>
      <Tab>Inventory</Tab>
      <Tab>Add To Inventory</Tab>
    </TabList>

    <TabPanel>
      <h2>Use Inventory</h2>
      <div className='row mx-auto container'>
         <div className="col-12">
               <form className='card p-2' onSubmit={FarmDispatchHandler}>
                <div className="row my-2">
                    <div className="col-9">
                    <div className='my-2'>Products</div>
                    <select style={{width:"100%",borderRadius:"7px"}} required onChange={FarmSelecthandler}>
                    <option value="">-- Select a Product ---</option>
                    {UserfarmInventory.length > 0 && UserfarmInventory.map(item=><option value={item._id}>{item.ProductName} ({item.ProductID}) </option> )}                  
                    </select>
                    </div>
                    
                </div>
                 <div className="row my-3">
                    <div className="col-12">
                        <div className='my-2'>Quantity</div>
                        <div class="input-group my-3 ">
                        <input type="text" required class="form-control" onChange={(e)=>setUserfarmproductquantity(e.target.value)} placeholder="0" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                        <span class="input-group-text" id="basic-addon2">{productforUserFarm ? productforUserFarm.QuantityType : ""}</span>
                          </div>
                    </div>
                    <div className='col-12 my-3'>
                          <button className='btn btn-block btn-success' type='submit'>Save</button>
                    </div>
                 </div>
               
                </form>
         </div>
         {/* <div className="col-7">
             <div className='row my-3'>
                 <div className="col-12">
                     <div className="card">
                          <div className="row mx-auto">
                            <div className="col-12 my-2">
                                <div className="card p-2" style={{position:"relative"}}>
                                <div className='my-2 text-start'>Product Name</div>
                                <div className='my-2 text-start'>Quantity</div>
                                <div  style={{position:"absolute",right:"10px",fontSize:"20px"}}>x</div>
                                </div>                                
                            </div>
                            <div className="col-12 my-2">
                                <div className="card p-2">
                                <div className='my-2 text-start'>Product Name</div>
                                <div className='my-2 text-start'>Quantity</div>
                                </div>                                
                            </div>
                            <div className="col-12 my-2">
                                <div className="card p-2">
                                <div className='my-2 text-start'>Product Name</div>
                                <div className='my-2 text-start'>Quantity</div>
                                </div>                                
                            </div>
                            <div className="col-12">
                            <button className='btn btn-block btn-success'>Save</button>
                            </div>
                            
                          </div>
                     </div>
                 </div>
             </div>
         </div> */}
      </div>
    </TabPanel>
    <TabPanel>
      <h2>Inventory</h2>
      <table class="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Product Name</th>
      <th scope="col">Quantity</th>      
      <th scope="col">Type</th> 
    </tr>
  </thead>
  <tbody>
    {UserfarmInventory.length > 0 && UserfarmInventory.map(item=><tr key={item._id}>      
      <td>{item.ProductID}</td>
      <td>{item.ProductName}</td>
      <td>{item.Quantity}</td>
      <td>{item.QuantityType}</td>
    </tr>
)}
    
  </tbody>
</table>
    </TabPanel>
    <TabPanel>
      <h2>Add To Inventory</h2>
      <div className='row mx-auto '>
          <div className="col-12">
              <form className="card mx-3 py-3 px-2" onSubmit={UserFarmProductAddHandler}>
              <select class="form-select" aria-label="Default select example" required onChange={handleFarmSelection}>
               <option  value=''>--Select Product--</option>
               {
                Farm.length >0 && Farm.map(items=><option key={items._id} value={items._id} >{items.ProductName} ({items.ProductID})</option>)
               }
              
               
             </select>
             <div class="input-group my-3 ">
              <input type="text" class="form-control" placeholder="0" aria-label="Recipient's username" aria-describedby="basic-addon2" required onChange={e=>setQuantityforFarm(e.target.value)}/>
              <span class="input-group-text" id="basic-addon2">{productforFarm ? productforFarm.QuantityType : ""}</span>
             </div>
             <div>
                <button className="btn btn-block btn-success" type='submit'>Save</button>
             </div>
              </form>
           
      
                 </div>
      </div>
    </TabPanel>
  </Tabs>
  </div>

    </TabPanel>
  </Tabs>   
         </main>
         <Footer/>
    </Fragment>
  )
}
