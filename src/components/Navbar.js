import React,{useState} from 'react';
import { NavLink } from 'react-router-dom';
import "../Styles/Navbar.css"
import {useNavigate} from "react-router-dom";
import {RiNotification2Fill} from "react-icons/ri"


const Navbar = ()=>{

  let navigate = useNavigate();

  //login page redirect
   const LoginRedirectHandler = ()=>{
     navigate("/login")
   }

    return(
        <div className='nav-container'>

          <div className="logo" >
              <h3><b>L</b>oan <b>M</b>aniac</h3>
              <p>Your Financial Friend</p>
          </div>

                <nav className="nav-link-container">

                    <NavLink to="/" className={({isActive}) => (isActive ? "active" : "inactive") } >HOME</NavLink>
                    <NavLink to="/apply" className={({isActive}) => (isActive ? "active" : "inactive")} >APPLY</NavLink>


                    {
                        //check user info stored in localstorage
                        localStorage.getItem("user") ?
                        <NavLink to="/profile" className={({isActive}) => (isActive ? "active" : "inactive")} >PROFILE</NavLink> :
                        <button className='login-btn' onClick={()=>LoginRedirectHandler()}  >Login</button>
                    }

                </nav>
        </div>
    )
}

export default Navbar;
