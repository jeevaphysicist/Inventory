import React , {Fragment,useState} from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import {Link, useNavigate} from "react-router-dom"

export default function Signup() {
    const [email, setEmail] = useState("");
    const [username,setUsername] = useState('');
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [error,setError] = useState("");

    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // setLoading(true);
        let data = {
                  Email:email,
                  Password:password,
                  UserName :username ,
                  Role:role
                  }
       let options = {
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify(data)
                     };
    
     
      
      let output = fetch(`http://localhost:8080/api/auth/signup`,options);
          output.then(res=>res.json())
                .then(response=>{
                    // console.log("reaponse",response);
                    // setLoading(false);
                    if(response.signup){
                       navigate('/login');
                       setError("");
                    }
                    else{
                      setError(response.message);
                    }
                       })
        // handle signup logic here
                      
      };

  return (
    <Fragment>
    <Header/>
    
    <main style={{minHeight:"82.98vh"}}>
      <div className="row mx-auto container my-5">
          <div className="col-12 text-center my-3">Sign Up</div>
          <div className="col-12 text-danger text-center my-3">{error}</div>
          <div className="col-12 text-center my-3">
          <form className="card p-3" onSubmit={handleSubmit}>
         <div class="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"><i className='bi bi-person-fill'></i></span>
             <input type="text" class="form-control"  placeholder="Username" required aria-label="Username" aria-describedby="basic-addon1" onChange={e=>setUsername(e.target.value)}/>
         </div>
         <div class="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"><i className='bi bi-person-fill'></i></span>
             <input type="email" class="form-control" placeholder="email" required aria-label="Username" aria-describedby="basic-addon1" onChange={e=>setEmail(e.target.value)}/>
         </div>
         <div class="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"><i className='bi bi-eye-fill'></i></span>
             <input type="password" class="form-control" placeholder="Password" required aria-label="Username" aria-describedby="basic-addon1" onChange={e=>setPassword(e.target.value)}/>
         </div>
         <div class="input-group mb-3">
  <label class="input-group-text" for="inputGroupSelect01">Role</label>
  <select class="form-select" id="inputGroupSelect01" required onChange={e=>setRole(e.target.value)}>
  <option value="">--Select a Role--</option>
    <option value="User">User</option>
    <option value="Admin">Admin</option>  
  </select>
</div>
         <div class="input-group mb-3">
            <button className="btn btn-block btn-success">Sign UP</button>
         </div>

  <div className='col-12 text-start'>
   Already Have an Account ? <Link to="/login">Login</Link>
  </div>
      </form>
      
          </div>
      </div>
    
    </main>

    <Footer/>
</Fragment>
  )
}
