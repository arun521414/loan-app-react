import {useState} from 'react';
import "../Styles/SignUp.css"
import validator from "validator";
import {useNavigate} from "react-router-dom";
import axios from "axios"

const SignUp = ()=>{

   let navigate = useNavigate();

  const [email,setEmail] = useState('')
  const [mobileNo,setMobileNo] = useState('')
  const [password,setPassword] = useState('')

  //error

  const [emailError,setEmailError] = useState()
  const [mobileNoError,setMobileNoError] = useState()
  const [passwordError,setPasswordError] = useState()

  const [emailValid,setEmailValid] = useState(false)
  const [mobileNoValid,setMobileNoValid] = useState(false)
  const [passwordValid,setPasswordValid] = useState(false)


  function EmailInputHandler(e){

    setEmail(e.target.value)
    var email = e.target.value

    if(validator.isEmail(email)){
      setEmailError("")
      setEmailValid(true)
    }
    else{
      setEmailError("Enter a valid Email address")
      setEmailValid(false)
    }


  }

  function MobileNoInputHandler(e){

    setMobileNo(e.target.value)
    var mobileNo = e.target.value

    if(validator.isMobilePhone(mobileNo)){
      setMobileNoError("")
      setMobileNoValid(true)
    }
    else{
      setMobileNoError("Enter a valid Mobile Number")
      setMobileNoValid(false)
    }
  }

  function PasswordInputHandler(e){

    setPassword(e.target.value)
    var password = e.target.value
    var len = password.toString().length
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

  function RedirectToLogin(){
    navigate("/login")
  }

  function signup(){
    if(emailValid&&mobileNoValid&&passwordValid){

      axios.post("/signup/",
      {
        "email"    : email,
        "mobileNo" : mobileNo,
        "password" : password
      })
      .then((res)=>{

        var data = res.data

        if(data.status==="success"){
          navigate("/login")
        }
        else if(data.status==="error"){
          if(data.type==="emailError"){
            setEmailError(data.msg)
          }
          else{
            setMobileNoError(data.msg)
          }
        }

      })
      .catch((err)=>{
        console.log(err)
      })

    }

  }

  return(
    <div className="signup-container" >
      <div className="signup-form" >
        <h1>Signup</h1>
        <input type="text" placeholder="Email Address" value={email} onChange={(e)=>EmailInputHandler(e)} />
        <h5>{emailError}</h5>
        <input type="text" placeholder="Mobile Number"  value={mobileNo}  onChange={(e)=>MobileNoInputHandler(e)} />
        <h5>{mobileNoError}</h5>
        <input type="text" placeholder="Password" value={password} onChange={(e)=>PasswordInputHandler(e)}/>
        <h5>{passwordError}</h5>
        <button onClick={signup}  >Submit</button>
        <p>You have a account ? <b onClick={RedirectToLogin}>Login</b>  </p>
      </div>
      </div>
  )
}

export default SignUp;
