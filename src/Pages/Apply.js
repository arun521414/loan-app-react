import {useState,useEffect} from "react";
import "../Styles/Apply.css";
import PersonalDetailsForm from "../components/PersonalDetailsForm";
import axios from "axios"
import KycForm from "../components/KycForm"
import {useNavigate} from "react-router-dom";
import ApplyLoan from "../components/ApplyLoan";

const Apply = ()=>{

  let navigate = useNavigate();



  const [personalDetailsVerify,setPersonalDetailsVerify] = useState()
  const [kycVerify,setKycVerify] = useState()



     useEffect(()=>{

       if(!localStorage.getItem("user")){
         navigate("/login")
       }

       let profileId = localStorage.getItem("user")
       let mounted   = true

       axios.get("/get-profile/"+profileId+"/")

        .then((res)=>{

         let data = res.data

         if(mounted){
           setPersonalDetailsVerify(data.isPersonalDetailsVerify)
           setKycVerify(data.isKycVerify)
         }

         return ()=> mounted = false

       })
       .catch((err)=>{
         console.log(err)
       })


     },[])


     function changeToKycForm(){
       setPersonalDetailsVerify(true)
     }

     function changeToApplyLoan(){
       setKycVerify(true)
     }


    return(
        <div className="apply-container">
            <div className="steps-side-nav">
              <h4  >Profile Id : {localStorage.getItem("user")}</h4>
              <h3 style={personalDetailsVerify ? {"background-color":"green"}:{"background-color":"#FF671F "}} >Personal Details</h3>
              <h3 style={kycVerify ? {"background-color":"green"}:{"background-color":"#FF671F "}}  >KYC</h3>
              <h3 style={{"background-color":"#FF671F "}} >Apply Loan</h3>
            </div>
            {
              !personalDetailsVerify ? <PersonalDetailsForm changeToKycForm={changeToKycForm} /> :
              !kycVerify ? <KycForm changeToApplyLoan={changeToApplyLoan} /> : <ApplyLoan/>

            }
        </div>
    )
}


export default Apply;
