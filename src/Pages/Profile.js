import {useState,useEffect} from "react";
import "../Styles/Profile.css"
import axios from "axios"
import {useNavigate} from "react-router-dom";
import BankDetails from "../components/BankDetails";

const Profile = ()=>{
  let navigate = useNavigate();

  const [email,setEmail] = useState("")
  const [mobileNo,setMobileNo] = useState("")

  const [myProfile,setMyProfile] = useState(true)
  const [financialAccounts,setFinancialAccounts] = useState(false)

  useEffect(()=>{
    let profileId = localStorage.getItem("user")
    let mounted = true
    axios.get("/get-profile/"+profileId+"/")
    .then((res)=>{
      let data = res.data
      if(mounted){
        setEmail(data.email)
        setMobileNo(data.mobileNo)
      }
    })
    .then((err)=>{

    })
    return ()=>mounted = false
  },[])

  function logoutHandler(){
    localStorage.setItem("user","")
    navigate("/")

  }



  function MyProfile(){
    return(
      <div className="my-profile">
        <h1>Profile Id : {localStorage.getItem("user")}</h1>
        <h1>Email Address : {email}</h1>
        <h1>Mobile Number : {mobileNo}</h1>
      </div>
    )

  }

    return(
        <div className="profile-container" >
          <div className="side-nav">
            <h1 onClick={()=>{setMyProfile(true);setFinancialAccounts(false)}} >My Profile</h1>
            <h1 onClick={()=>{setMyProfile(false);setFinancialAccounts(true)}} >Financial Accounts</h1>
            <button className="logout-btn" onClick={logoutHandler} >LOGOUT</button>
          </div>

          {
            myProfile ? <MyProfile/> : <BankDetails/>
          }

        </div>
    )
}


export default Profile;
