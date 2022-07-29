import React,{useState} from "react";
import {BiArrowBack} from "react-icons/bi"
import validator from "validator";
import axios from "axios";
import {useNavigate} from "react-router-dom";


function MobileLoginForm({changeToLoginOption}){
   let navigate = useNavigate()

   const [mobileNo,setMobileNo] = useState("")
   const [password,setPassword] = useState("")

   const [mobileNoError,setMobileNoError] = useState()
   const [passwordError,setPasswordError] = useState()

   const [mobileNoValid,setMobileNoValid] = useState(false)
   const [passwordValid,setPasswordValid] = useState(false)


   function MobileNoInputHandler(e){
     setMobileNo(e.target.value)
     var mobileno = e.target.value
     if(validator.isMobilePhone(mobileno)){
       setMobileNoError('')
       setMobileNoValid(true)
     }
    else{
       setMobileNoError("Enter a valid mobile number ")
       setMobileNoValid(false)
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
     if(mobileNoValid&&passwordValid){
       axios.post("/login/",{
         "type":"mobileNo",
         "mobileNo":mobileNo,
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
         <div className="login-mobile" >
           <BiArrowBack className="back-icon" onClick={changeToLoginOption} />
           <h1>Mobile Login</h1>
           <input type="text"
             placeholder="Enter your Mobile no"
             maxLength="10"
             autoFocus
             value={mobileNo}
             onChange={MobileNoInputHandler}
              />
            <h5 className="mobile-error" >{mobileNoError}</h5>
              <input type="text"
                placeholder="Password"
                value={password}
                onChange={PasswordInputHandler}
                />
           <h5 className="password-error" >{passwordError}</h5>
           <button onClick={login} >LogIn</button>
         </div>
         </div>
       </div>
     )



}

export default MobileLoginForm;
