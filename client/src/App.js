import React ,{ Fragment ,useState  } from "react";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; // If you need the 'jwtDecode' export
import { InvalidTokenError } from 'jwt-decode';
import HomePage from "./Components/Home/Home";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import {Routes , Route ,Navigate} from "react-router-dom";
import Admin from "./Components/Admin/Admin";

let responsePayload ;
let routes ;
let login ;

function App() {
  const token = Cookies.get('mycookie');
  if(token != undefined){
    responsePayload = jwtDecode(token);
    login = responsePayload.isloggedin;  
  } 
  
  const [isloggedon,setIsloggedon] = useState(login || false)


  if(isloggedon) {
     if(responsePayload.Role === "User"){
      routes =(<>
      <Route path="/" element={<HomePage/>} />
      <Route path='*' element={<Navigate to ='/'/>} />
   </>)
     }
     else{
      routes =( <>
        <Route path="/" element={<Admin/>} />
        <Route path='*' element={<Navigate to ='/'/>}/>    
            </>
      )
     }
  }
  else{
      routes =( <>
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path='*' element={<Navigate to ='/login'/>}/>  
   </>)
  }
  return (
    <Fragment>
      <Routes>
      {routes}
      </Routes>
     
    </Fragment>
  );
}

export default App;
