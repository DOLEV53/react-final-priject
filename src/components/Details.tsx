import './Details.css'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCardById } from "../services/ApiService";
import Title from "./Title";

function Details() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [description, setDescription] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [web, setWeb] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageAlt, setImageAlt] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [zip, setZip] = useState('');
 
     useEffect(() => {
        if (!id) return;
          getCardById(id)
            .then(json => {
                setTitle(json.title!)
                setSubtitle(json.subtitle!);
                setDescription(json.description!);
                setPhone(json.phone!);
                setEmail(json.email!);
                setWeb(json.web!);
                setImageUrl(json.imageUrl!)
                setImageAlt(json.imageAlt!)
                setState(json.state!)
                setCountry(json.country!)
                setCity(json.city!)
                setStreet(json.street!)
                setHouseNumber(json.houseNumber!)
                setZip(json.zip!)
             })
    }, [id])

    function handleBack() {
        navigate('/')
    };

    return ( 
       <>
         <Title 
                mainText="DETAILS"
         />
        <div className="  p-4 align-items-center div_container">
         <p className="mx-3 mb-1">Title* <span className="span_1">Subtitle*</span></p>
         <div className="d-flex pb-2">
            <input
                className="form-control mx-3"
                type="title"
                placeholder="Title *"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="title"
                readOnly  />
             <input
                className="form-control mx-3"
                type="text"
                placeholder="Subtitle *"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                id='subtitle'
                readOnly />
        </div>
        <p className="mx-3 mb-1">Description* <span className="span_2">Phone*</span></p>
        <div className="d-flex pb-2">
          <input
                className="form-control mx-3"
                type="text"
                placeholder="Description *"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                readOnly   />
          <input
                className="form-control mx-3"
                type="text"
                placeholder="Phone *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                readOnly />
        </div>
        <p className="mx-3 mb-1">Email* <span className="span_3">Web</span></p>
        <div className="d-flex pb-2">
            <input
                className="form-control mx-3"
                type="email"
                placeholder="Email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                readOnly  />
            <input
                className="form-control mx-3"
                type="text"
                placeholder="Web"
                value={web}
                onChange={(e) => setWeb(e.target.value)}
                readOnly
            />
        </div>
        <p className="mx-3 mb-1">Image Url <span className="span_4">Image Alt</span></p>
        <div className="d-flex pb-2">
            <input
                className="form-control mx-3"
                type="text"
                placeholder="Image url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                readOnly  />
            <input
                className="form-control mx-3"
                type="text"
                placeholder="Image alt"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                readOnly />
            </div>
            <p className="mx-3 mb-1">State* <span className="span_5">Country*</span></p>
            <div className="d-flex pb-2">
            <input
                className="form-control mx-3"
                type="text"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                readOnly />
            <input
                className="form-control mx-3"
                type="text"
                placeholder="Country *"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                readOnly
            />
            </div>
             <p className="mx-3 mb-1">City* <span className="span_6">Street*</span></p>
            <div className="d-flex pb-2">
            <input
                className="form-control mx-3"
                type="text"
                placeholder="City *"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                readOnly  />
            <input
                className="form-control mx-3"
                type="text"
                placeholder="Street *"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                readOnly />
            </div>
             <p className="mx-3 mb-1">House Number* <span className="span_7">Zip</span></p>
            <div className="d-flex pb-3">
            <input
                className="form-control mx-3"
                type="text"
                placeholder="House number *"
                value={houseNumber}
                onChange={(e) => setHouseNumber(e.target.value)}
                readOnly />
            <input
                className="form-control mx-3"
                type="text"
                placeholder="Zip"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                readOnly />
            </div>
            <div className="d-flex pb-2">
              <button
                className="form-control mx-3 p-0 cancel bg-primary"
                type='button'
                onClick={handleBack}>BACK
              </button>
            </div>
        </div>
      </>  
     );
}
export default Details;