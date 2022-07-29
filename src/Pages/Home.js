import React from "react";
import "../Styles/Home.css"
import {useNavigate} from "react-router-dom"


const Home = ()=>{

  let navigate = useNavigate()


  function redirectToApply(){
    if(localStorage.getItem("user")){
      navigate("/apply")
    }
    else{
      navigate("/login")
    }
  }

    return(
        <div className="home-container" >
          <div className="loan-apply-steps" >
            <h1>Get Your <b>Personal Loan</b> In Few Steps</h1>
           <button onClick={redirectToApply} >Apply Now</button>
          </div>
        </div>
    )
}


export default Home;
