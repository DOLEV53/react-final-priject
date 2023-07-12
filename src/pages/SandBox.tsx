import { useEffect, useState } from "react";
import { UserProps } from "../Types/UserType";
import { deleteUser, getUsers, updateUserBussiness } from "../services/ApiService";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";






function SandBox() {
    
      const { id } = useParams();
      const [listUsers, setListUsers] = useState<Array<UserProps>>([]);     
      const [checked, setChecked] = useState(false);     
    
       useEffect(() => {
        getUsers()
            .then(json => {
                setListUsers(json);
                console.log(json);
                 
            })
         }, []);
       

    // useEffect(() => {
    //       getUserById(id!)
    //         .then(json => {
    //             setChecked(json.checked!)
    //             console.log(id);
                
    //           })
    // }, [id]);
        
 
 function handleChangeClick(userId: string , checked: boolean) {
         console.log(checked);
         
         updateUserBussiness(userId, {
            checked
        })
            .then(json => {
                toast.success(`The ${json.fName} has been updated successfully`, {position: toast.POSITION.TOP_RIGHT});
                getUsers()
                  .then(json => {
                setListUsers(json);
                console.log(json);
                 
            }) 
                
        })}; 
 

    async function onDeleteUser(_id: string) {
       const res = await deleteUser(_id);
        const updated = [...listUsers].filter(
            user => user._id !== _id
        )
       setListUsers(updated);
       toast.success('User has been deleted');
    }


    
    return ( 
       <>
       <table className='table table-hover'>
                <thead>
                    <tr>
                        <th>User first name</th>
                        <th>User last name</th>
                        <th>User email</th>
                        <th>Business cliet (Yes/No)</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers.map(user =>
                        <tr key={user._id}>
                            <td>{user.fName}</td>
                            <td>{user.lName}</td>
                            <td>{user.email}</td>
                            <td>
                                  {
                                   user.checked === true ? "Yes" : "No"
                                  }
                            </td>
                            <td>
                                <button
                                    className="btn btn-default ms-2"
                                     onClick={() => handleChangeClick(user._id as string,!user.checked)}
                                >Change status</button>
                                <button
                                    className="btn btn-default ms-2"
                                    onClick={() => onDeleteUser(user._id as string)}
                                >
                                    <i className="bi bi-trash" />
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
       </>
     );
}

export default SandBox;