import React , {Fragment , useState} from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // Const [role,SetRole] = useState('');
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);

    const handleSubmit = (event) => {
        setLoading(true);
        event.preventDefault();
        let data = {
                   Email:email,
                   Password:password 
                   }
      let options = {
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify(data)
                   }
      let output = fetch(`http://localhost:8080/api/auth/login`,options);
          output.then(res=>res.json())
                .then(response=>{
                  // console.log("reaponse",response);
                  setLoading(false);
                  if(response.login){
                    
                    // authenticate user and generate JWT token
                     const token = response.token;
                    const expires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
                      // const expires = new Date(new Date().getTime() + 10 * 1000);
                    // set a cookie with the token and send response
                      Cookies.set('mycookie', token, {expires , sameSite: 'none', secure: true });
                     if(token){
                        setError("");
                        window.location.reload();
                      }
                  }
                  else{
                    setError(response.message);
                  }
                  
                })
                
            
        // handle login logic here
      };
  return (
    <Fragment>
          <Header/>
          
          <main style={{minHeight:"82.98vh"}}>
            <div className="row mx-auto container my-5">
                <div className="col-12 text-center my-3">Login</div>
                {error && <div className="col-12 text-danger text-center my-3">{error}</div> }
                <div className="col-12 text-center my-3">
                  
                <form className="card p-3" onSubmit={handleSubmit}>
                    
               <div class="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1"><i className='bi bi-person-fill'></i></span>
                   <input type="email" class="form-control" placeholder="Email" required aria-label="Username" aria-describedby="basic-addon1" onChange={e=>setEmail(e.target.value)}/>
               </div>
               <div class="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1"><i className='bi bi-eye-fill'></i></span>
                   <input type="password" class="form-control" placeholder="Password" required aria-label="Username" aria-describedby="basic-addon1" onChange={e=>setPassword(e.target.value)}/>
               </div>
               {/* <div class="input-group mb-3">
  <label class="input-group-text" for="inputGroupSelect01">Role</label>
  <select class="form-select" id="inputGroupSelect01">
    <option selected>Choose...</option>
    <option value="Admin">Admin</option>
    <option value="User">User</option>
   
  </select>
</div> */}
               <div class="input-group mb-3">
                  <button className="btn btn-block btn-warning" type="submit">Login</button>
               </div>
               <div className='col-12 text-start'>
   Not Have an Account ? <Link to="/signup">Sign Up</Link>
  </div>
            </form>
                </div>
            </div>
          
          </main>

          <Footer/>
    </Fragment>
  )
}
