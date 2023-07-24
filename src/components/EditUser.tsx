import { useNavigate, useParams } from "react-router-dom";
import "./EditUser.css"
import { useEffect, useState } from "react";
import { validate } from "../Types/UserType";
import { toast } from "react-toastify";
import Title from "./Title";
import { updateUser,getUserById } from "../services/ApiService";


function EditUser() {
     const navigate = useNavigate();
     const { id } = useParams();
    const [password, setPassword] = useState('');
    const [fName, setFname] = useState('');
    const [mName, setMname] = useState('');
    const [lName, setLname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageAlt, setImageAlt] = useState('');
    const [state, setState] = useState(''); 
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [zip, setZip] = useState('');
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (!id) return;
          getUserById(id)
            .then(json => {
                setFname(json.fName!)
                setMname(json.mName!);
                setLname(json.lName!);
                setPhone(json.phone!);
                setEmail(json.email!);
                setPassword(json.password!);
                setImageUrl(json.imageUrl!)
                setImageAlt(json.imageAlt!)
                setState(json.state!)
                setCountry(json.country!)
                setCity(json.city!)
                setStreet(json.street!)
                setHouseNumber(json.houseNumber!)
                setZip(json.zip!)
                setChecked(json.checked!)
              })
    }, [id]);
    
    function handleClick() {
        if (!validate({fName,mName,lName,phone,email,password,imageUrl,imageAlt,state,country,city,street,houseNumber,zip,checked})) {
            return
        }
        if (!id) return;
        updateUser(id, {
            fName,
            mName,
            lName,
            phone,
            email,
            password,
            imageUrl,
            imageAlt,
            state,
            country,
            city,
            street,
            houseNumber,
            zip,
            checked,
        })
            .then(json => {
                navigate('/');
                toast.success(`The user has been updated successfully`, {position: toast.POSITION.TOP_RIGHT});
        })}; 

      function handleClean() {
        setFname('');
        setMname('');
        setLname('');
        setPhone('');
        setEmail('');
        setPassword('');
        setImageUrl('');
        setImageAlt('');
        setState('');
        setCountry('');
        setCity('');
        setStreet('');
        setHouseNumber('');
        setZip('');
        setChecked(false);
       };
        
    function handleBack() {
        navigate('/')
    };

    return ( 
         <>
        <Title  
           mainText="Update user" subText="Here you can update your personal details" />

        <div className="  p-4  div_container">
        <div className="row g-3  div_input">
           <div className="col-auto ">
            <label  className="form-label mb-0 mx-5">First name*</label> 
            <input  className="form-control mx-5" type="text" placeholder="First name *" value={fName}
            onChange={(e) => setFname(e.target.value)}  /></div>
            <div className="col-auto ">
            <label  className="form-label mb-0 mx-5">Middle name*</label>    
            <input className="form-control mx-5" type="text" placeholder="Middle name *" value={mName}
                onChange={(e) => setMname(e.target.value)} /></div>
        </div>
          <div className="row g-3  div_input">
             <div className="col-auto ">
            <label  className="form-label mb-0 mx-5">Last name*</label>  
            <input className="form-control mx-5" type="text" placeholder="Last name *" value={lName}
                onChange={(e) => setLname(e.target.value)} /></div>
             <div className="col-auto ">
            <label  className="form-label mb-0 mx-5">Phone number*</label>    
            <input className="form-control mx-5"  type="text" placeholder="050-00000000 *" value={phone}
                onChange={(e) => setPhone(e.target.value)} /></div>
        </div>
        <div className="row g-3  div_input">
             <div className="col-auto ">
            <label  className="form-label mb-0 mx-5">Email*</label>
            <input className="form-control mx-5" type="email" placeholder="test@gmail.com *" value={email}
                onChange={(e) => setEmail(e.target.value)} /> </div>
            <div className="col-auto ">
            <label  className="form-label mb-0 mx-5">Password*</label>   
            <input className="form-control mx-5"  type="text" placeholder="can't change password here *"  readOnly value={password}  onChange={(e) => setPassword(e.target.value)}  /> </div>
        </div>
        <div className="row g-3  div_input">
            <div className="col-auto ">
            <label  className="form-label mb-0 mx-5">Image url*</label>
            <input className="form-control mx-5"  type="text" placeholder="Image url *"  value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)} /> </div>
             <div className="col-auto ">
            <label  className="form-label mb-0 mx-5">Image alt*</label>   
            <input className="form-control mx-5"  type="text" placeholder="Image alt *"  value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)} /> </div>
            </div>
            <div className="row g-3  div_input">
             <div className="col-auto ">
            <label  className="form-label mb-0 mx-5">State*</label>   
            <input className="form-control mx-5" type="text" placeholder="State *" value={state}
                onChange={(e) => setState(e.target.value)} /> </div>
             <div className="col-auto ">
            <label  className="form-label mb-0 mx-5">Country*</label>   
            <input className="form-control mx-5" type="text" placeholder="Country *" value={country}
                onChange={(e) => setCountry(e.target.value)} /> </div>
            </div>
            <div className="row g-3  div_input">
              <div className="col-auto ">
            <label  className="form-label mb-0 mx-5">City*</label>   
            <input
                className="form-control mx-5" type="text" placeholder="City *" value={city}
                onChange={(e) => setCity(e.target.value)} /> </div>
              <div className="col-auto ">
            <label  className="form-label mb-0 mx-5">Street*</label>   
            <input className="form-control mx-5" type="text" placeholder="Street *" value={street}
                onChange={(e) => setStreet(e.target.value)} /> </div>
            </div>
            <div className="row g-3  div_input">
            <div className="col-auto ">
            <label  className="form-label mb-0 mx-5">House number*</label>  
            <input className="form-control mx-5" type="text" placeholder="House number *" 
            value={houseNumber}  onChange={(e) => setHouseNumber(e.target.value)} /> </div>
             <div className="col-auto ">
            <label  className="form-label mb-0 mx-5">Zip*</label>
            <input className="form-control mx-5" type="text" placeholder="Zip *" value={zip}
                onChange={(e) => setZip(e.target.value)} /> </div>
            </div>
 <div className="mb-3 mt-1 mx-5">
 <div className="form-check">
    <input 
     className="form-check-input"  type="checkbox" defaultChecked={checked}
     onChange={() => setChecked(!checked)}  />
    <label className="form-check-label" >
    Signup as business 
    </label>
 </div>
</div>
             <div className="d-flex mini_continer">
              <button  className="form-control p-0 mx-3 cancel"   
               onClick={handleBack}>CANCEL </button>    
              <button   className="form-control p-0  refresh" onClick={handleClean}>
              <i className="bi bi-arrow-repeat"></i>  </button>
             </div>
            <div className="update">
            <input className="btn btn-primary form-control mx-3"
                placeholder="UPDATE"   onClick={handleClick} />
            </div>      
</div>  
       </>
     );
}

export default EditUser;