import React ,{ useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

let responsePayload ;
let login ;
export default function Header() {
  const token = Cookies.get('mycookie');
  if(token != undefined){
    responsePayload = jwtDecode(token);
    login = responsePayload.isloggedin;  
  } 
  
  const [isloggedon,setIsloggedon] = useState(login || false);


  

  const LogoutHandler = ()=>{
    Cookies.remove('mycookie');
    window.location.reload();
  }

  return (
    <div className='text-center' style={{height:"60px",boxShadow:"0px 3px 3px 0px gray",borderBottom:"2px solid gray"}}> <div className="py-3"> {isloggedon ? <i className="bi bi-lock-fill" style={{cursor:"pointer"}} onClick={()=>{LogoutHandler()}}></i> : null }</div> </div>
  )
}
