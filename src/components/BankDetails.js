import {useState,useEffect} from "react";
import "../Styles/BankDetails.css";
import axios from "axios"
import AddBankAccountForm from "../components/AddBankAccountForm"


const BankDetails = ()=>{

  const [addBankAccountModel,setAddBankAccountModel] = useState(false)
  const [bankDetailsFound,setBankDetailsFound] = useState(false)

  const [bankName,setBankName] = useState()
  const [ifscCode,setIfscCode] = useState()
  const [accountNo,setAccountNo] = useState()

  useEffect(()=>{
    let profileId = localStorage.getItem("user")
    let mounted = true

    axios.get("/getBankDetails/"+profileId+"/")

    .then((res)=>{

      let data = res.data

      if(data.status==="success"){

        if(mounted){

          setBankDetailsFound(true)
          setBankName(data.bankName)
          setIfscCode(data.ifscCode)
          setAccountNo(data.accountNo)
        }
      }
      else if(data.status==="error"){

        setBankDetailsFound(false)

      }

    })

    return ()=>mounted = false

  },[])

  function addBankAccountHandler(){
    setAddBankAccountModel(true)
  }


  function GetBankDetails(){

    let profileId = localStorage.getItem("user")
    let mounted = true

    axios.get("/getBankDetails/"+profileId+"/")

    .then((res)=>{

      let data = res.data

      if(data.status==="success"){

        if(mounted){

          setBankDetailsFound(true)
          setBankName(data.bankName)
          setIfscCode(data.ifscCode)
          setAccountNo(data.accountNo)
        }
      }
      else if(data.status==="error"){

        setBankDetailsFound(false)

      }

    })

  }



  function AddBankAccount(){

    if(addBankAccountModel){
      return(
        <AddBankAccountForm registerSuccess={GetBankDetails} />
      )
    }
    else{
    return(
        <div className="bank-details-container" >
        <h2 className="no-details-msg">Bank Details Not Found</h2>
        <button onClick={addBankAccountHandler} >Add Bank Account</button>
        </div>
    )
   }
  }

  if(bankDetailsFound){
    return (
      <div className="bank-details" >
      <h1>Bank Name : {bankName}</h1>
      <h1>IFSC Code : {ifscCode}</h1>
      <h1> Account No :  {accountNo}</h1>
      </div>
    )
  }
  else{
    return(
      <AddBankAccount/>
    )
  }


}

export default BankDetails;
