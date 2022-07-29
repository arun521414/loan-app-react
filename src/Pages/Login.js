import React from 'react';
import {useState} from "react";
import "../Styles/Login.css";
import EmailLoginForm from "../components/EmailLoginForm";
import MobileLoginForm from "../components/MobileLoginForm";
import {useNavigate} from "react-router-dom";

const Login = ({name})=>{

  let navigate = useNavigate();


    const [EmailLogin,setEmailLogin] = useState(false)
    const [MobileLogin,setMobileLogin] = useState(false)


    function changeToEmailForm(){

      setEmailLogin(true);
      setMobileLogin(false);

    }

    function changeToMobileForm(){
      setEmailLogin(false);
      setMobileLogin(true);
    }

    function changeToLoginOption(){

      setEmailLogin(false);
      setMobileLogin(false);

    }

    function changeToSignupForm(){
      navigate("/signup")
    }





    function LoginOptionsForm(){
      return(
        <div className="login-container" >
          <div className="login-form" >
              <div className="login-form-options" >
              <h1>Login</h1>
              <button onClick={changeToEmailForm} >Email</button>
              <h2>-----------------OR-----------------</h2>
              <button onClick={changeToMobileForm} >Mobile</button>
              <p>You have't Account ? <b onClick={changeToSignupForm} >Create</b></p>
              </div>
          </div>
        </div>
      )
    }


    if(!EmailLogin&&!MobileLogin)
    {
     return (<LoginOptionsForm  />)
    }
    else if (EmailLogin)
    {
      return( <EmailLoginForm changeToLoginOption={changeToLoginOption}  />)
    }
    else if(MobileLogin)
    {
      return (<MobileLoginForm changeToLoginOption={changeToLoginOption}  />)
    }

}

export default Login;
