import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Bcard from './pages/Bcard';
import About from './pages/About';
import FavCards from './pages/FavCards';
import MyCards from './pages/MyCards';
import SandBox from './pages/SandBox';
import SignUp from './auth/SignUp';
import Login from './auth/Login';
import Footer from './components/Footer';
import AddCard from './components/AddCard';
import { ToastContainer } from 'react-toastify';
import EditCard from './components/EditCard';
import Details from './components/Details';
import RouteGuard from './auth/RouteGuard';
import {  getUser, verifyAdmin, verifyBuisness, verifyToken } from './auth/TokenManager';
import { UserProps } from './Types/UserType';
import EditUser from './components/EditUser';

interface userContextType {
   userData: UserProps | null;
   setUserData: (data: UserProps | null) => void
    
}

export const userContext = createContext<userContextType>({userData: null,setUserData: () =>{}})
  

function App() {
  const [userData,setUserData] = useState<UserProps | null >({})
  
  useEffect(() => {
    const currentUser = getUser()
    if (currentUser) {
        setUserData(currentUser)
    } 
   
  },[])

  return (
    <>
    <userContext.Provider value={{userData, setUserData}}>
    <Header  />
    <ToastContainer
                closeOnClick
                closeButton={false}
                position="bottom-center"
                theme="colored"
            />
            
  <div style={{minHeight:"80vh"}}>
    <Routes>
      
      <Route path="/" element={<Bcard />} />
      <Route path="about" element={<About />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<Login/>} />
      <Route path="details/:id" element={<Details />} />

       
      <Route path="favCards" element={<RouteGuard verify={verifyToken}><FavCards /></RouteGuard>} />
      <Route path="myCards" element={<RouteGuard verify={verifyBuisness} secondVerify={verifyAdmin}> <MyCards /></RouteGuard>} />
      <Route path="sandbox" element={<RouteGuard verify={verifyAdmin}><SandBox /></RouteGuard>} />

      <Route path="addCard" element=
      {<RouteGuard verify={verifyBuisness} secondVerify={verifyAdmin}><AddCard /></RouteGuard>} />
      
      <Route path="edit/:id" element={<RouteGuard verify={verifyBuisness} secondVerify={verifyAdmin}><EditCard /></RouteGuard>} />

      <Route path="editUser/:id" element={<RouteGuard verify={verifyBuisness} secondVerify={verifyAdmin}><EditUser /></RouteGuard>} />
      
      
    </Routes>
  </div>

    <Footer
     />
     </userContext.Provider>
    </>
  );
}

export default App;
