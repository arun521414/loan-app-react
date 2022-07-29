import React,{useState} from "react";
import {BiArrowBack} from "react-icons/bi"
import validator from "validator";
import axios from "axios"
import {useNavigate} from "react-router-dom";


function EmailLoginForm({changeToLoginOption}){
   let navigate = useNavigate()

   const [email,setEmail] = useState('');
   const [password,setPassword] = useState('');

   const [emailError,setEmailError] = useState();
   const [passwordError,setPasswordError] = useState();

   const [emailValid,setEmailValid] = useState(false)
   const [passwordValid,setPasswordValid] = useState(false)





  function EmailInputHandler(e){

    setEmail(e.target.value)

    var email = e.target.value

    if(validator.isEmail(email)){
      setEmailError('')
      setEmailValid(true)
    }
    else{
      setEmailError('Enter a valid email address')
      setEmailValid(false)
    }

  }

  function PasswordInputHandler(e){

    setPassword(e.target.value)
    var password = e.target.value
    var len = password.length
    if(len>=6&&len<=12){
      setPasswordError("")
      setPasswordValid(true)
    }
    else if(len<6){
      setPasswordError("password contains atleast 6 characters")
      setPasswordValid(false)
    }
    else if(len>12){
      setPasswordError("password contains maximum 12 characters only ")
      setPasswordValid(false)
    }
  }

  function login(){

    if(emailValid&&passwordValid){
      axios.post("/login/",{
        "type":"email",
        "email":email,
        "password":password
      })
      .then((res)=>{

        var data = res.data

        if(data.status=="success"){
          localStorage.setItem("user",data.profileId)
          navigate("/")
        }
        else{
          setPasswordError(data.msg)
        }

      })
      .catch((err)=>{
        console.log(err)
      })
    }
  }



     return(
       <div className="login-container" >
         <div className="login-form" >
           <div className="login-email" >
             <BiArrowBack className="back-icon" onClick={changeToLoginOption} />
             <h1>Email Login</h1>
             <input type="text"
               placeholder="Enter your Email address"
               autoFocus
               value={email}
               onChange={EmailInputHandler}
               />
             <h5 className="email-error" >{emailError}</h5>
               <input type="text"
                 placeholder="Password"
                 value={password}
                 onChange={PasswordInputHandler}
                 />
               <h5 className="password-error" >{passwordError}</h5>
             <button onClick={login}  >LogIn</button>
           </div>
         </div>
       </div>
     )

}

export default EmailLoginForm;
