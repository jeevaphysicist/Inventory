import React ,{Fragment , useState , useEffect} from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { API } from '../../Constants';
import 'react-tabs/style/react-tabs.css';

export default function Admin() {
  const [productNameforProduced,setProductNameforProduced] = useState('');
  const [quantityTypeforProduced,setQuantityTypeforProduced] = useState('');
  const [productNameforFarm,setProductNameforFarm] = useState('');
  const [quantityTypeforFarm,setQuantityTypeforFarm] = useState('');
  const [Produced,setProduced] = useState([]);
  const [Farm,setFarm] = useState([]);

  useEffect(()=>{
      GetProducedDataHandler();
      GetFarmDataHandler();
  },[])

  // Call backend and store data in ProductInventory Collection
  const createproductInventorydatahandler = (e)=>{
                 e.preventDefault();
                 let data = {
                      ProductName:productNameforProduced,
                      QuantityType:quantityTypeforProduced
                 };
                 let options ={
                             method:"POST",
                             headers:{"Content-Type":"application/json"},
                             body:JSON.stringify(data)
                 };
                 fetch(`${API}/api/Producedinventory/create-produced-inventory`,options)
                 .then(res=>res.json())
                 .then(result=>{
                            //  console.log("result",result);
                 })

  }

  const createfarmInventorydatahandler = (e)=>{
                 e.preventDefault();
                 let data = {
                  ProductName:productNameforFarm,
                  QuantityType:quantityTypeforFarm
             };
             let options ={
                         method:"POST",
                         headers:{"Content-Type":"application/json"},
                         body:JSON.stringify(data)
             };
             fetch(`${API}/api/farminventory/create-farm-inventory`,options)
             .then(res=>res.json())
             .then(result=>{
                    //  console.log("result",result);
             })

  }

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

  <div className='mx-3 card py-3 px-3'>
      <Tabs>
    <TabList>
       <Tab>Inventory</Tab>
       <Tab>Add To Inventory</Tab>
    </TabList>

    

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
  {Produced.length > 0 && Produced.map(items=><tr key={items._id}>
      <td>{items.ProductID}</td>
      <td >{items.ProductName}</td>
      <td>{items.QuantityType}</td>      
    </tr>
      )
}
   

  </tbody>
</table>
    </TabPanel>

    <TabPanel>
      <h2>Add To Inventory</h2>
      <div className='row mx-auto '>
          <div className="col-12">
          <form className="card mx-3 py-3 px-2" onSubmit={createproductInventorydatahandler}>
              <input type="text" placeholder='New Product Name....' className='my-3' required onChange={(e)=>{setProductNameforProduced(e.target.value)}} />
              <input className="my-3" placeholder='KG / LTR / HEAD / Numbers'  required onChange={(e)=>{ setQuantityTypeforProduced(e.target.value) }} />
              
              {/* <select className="form-select my-3" aria-label="Default select example" required onChange={(e)=>{ setQuantityTypeforProduced(e.target.value) }} >
               <option selected value="">--Select Product--</option>
               <option value="KG">KG</option>
               <option value="LTR">Ltr</option>
               <option value="Peice">Peice</option>
               <option value="PACK">Pack</option>
             </select> */}
           
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
      <div className=' mx-3 card py-3 px-3'>
    <Tabs>
    <TabList>
     
      <Tab>Inventory</Tab>
      <Tab>Add To Inventory</Tab>
    </TabList>

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
  {Farm.length > 0 && Farm.map(items=><tr key={items._id}>
      <td>{items.ProductID}</td>
      <td >{items.ProductName}</td>
      <td>{items.QuantityType}</td>      
    </tr>
      )
}

  </tbody>
</table>
    </TabPanel>
    <TabPanel>
      <h2>Add To Inventory</h2>
      <div className='row mx-auto '>
          <div className="col-12">
              <form className="card mx-3 py-3 px-2" onSubmit={createfarmInventorydatahandler}>
              <input type="text" placeholder='New Product Name....' className='my-3' required onChange={(e)=>{setProductNameforFarm(e.target.value)}} />
              <input className="my-3" placeholder='KG / LTR / HEAD / Numbers'  required onChange={(e)=>{ setQuantityTypeforFarm(e.target.value) }} />
              
              {/* <select className="form-select my-3" aria-label="Default select example" required onChange={(e)=>{setQuantityTypeforFarm(e.target.value)}} >
               <option selected value="">--Select Product--</option>
               <option value="KG">KG</option>
               <option value="LTR">Ltr</option>
              <option value="PACK">Pack</option>
             </select> */}
           
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
