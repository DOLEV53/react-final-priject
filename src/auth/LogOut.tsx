import { useNavigate } from "react-router-dom";
import { removeToken } from "./TokenManager";

 

function LogOut() {
    const navigate = useNavigate();
    

    function handleClick() {
        localStorage.removeItem('admin');
        navigate('/login');
        removeToken();
    }

    return (
        <button
            className="btn btn-link nav-link"
            onClick={handleClick}
        >
           Log Out
        </button>
    );
}

export default LogOut;
