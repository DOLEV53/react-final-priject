import { useContext, useState } from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { login } from '../services/ApiService';
import Title from '../components/Title';
import { setToken, setUser } from './TokenManager';
import { validate_2 } from '../Types/UserType';
import { userContext } from '../App';
import { toast } from 'react-toastify';



function Login() {
   const navigate = useNavigate(); 
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const { userData,setUserData } = useContext(userContext);
   

    function handleClean() {      
        setEmail('');
        setPassword('');
    }
        
    function handleBack() {
        navigate('/')
    };

    function handleClick() {
        if (!validate_2({email,password})) {
            return;
        }

        login({
          email,
            password
        })
            .then((user) => {
                if (user.status === "fail") {
                    toast.error(user.message)
                    return 
                } 
                 
                 setToken(user.token)
                 setUser(user)
                 setUserData(user)
                 navigate('/')
                
            })
           
    }

    return ( 
        <>
            <Title 
                mainText="LOGIN"
            />

       <div className="p-4 mt-4 login_container ">
        <label className='form-label mx-3'>Email *</label>
        <div className="d-flex pb-2">
            <input
                className="form-control mx-3"
                type="text"
                placeholder="test@gmail.com *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
           </div>
           <label className='form-label mx-3'>Password *</label>
           <div className="d-flex pb-2">
            <input
                className="form-control mx-3"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
           </div>

        <div className="d-flex pb-2">
              <button
                className="form-control p-0 mx-3 cancel "
                onClick={handleBack}
              >CANCEL
              </button>
              <button 
               className="form-control p-0 mx-3 refresh"
               onClick={handleClean}
               ><i className="bi bi-arrow-repeat"></i>
            </button>
        </div>  
            
            <div className="d-flex pb-3">
            <input
                className="btn btn-primary form-control mx-3"
                placeholder="SUBMIT"
                onClick={handleClick}
            />
            </div>
           
     </div>
    </>
    );
  };

export default Login;