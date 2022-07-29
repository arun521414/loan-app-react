import {useState} from "react";
import axios from "axios"


function AddBankAccountForm({registerSuccess}){



  const [bankName,setBankName] = useState("")
  const [ifscCode,setIfscCode] = useState("")
  const [accountNo,setAccountNo] = useState("")

  function bankNameInputHandler(e){
    setBankName(e.target.value)
  }

  function ifscCodeInputHandler(e){
    setIfscCode(e.target.value)
  }

  function accountNoInputHandler(e){
    setAccountNo(e.target.value)
  }

  function formSubmit(){

    if((bankName&&ifscCode&&accountNo)!==""){
      let profileId = localStorage.getItem("user")
      axios.post("/register-bank-details/"+profileId+"/",{
        "bankName" : bankName,
        "ifscCode" : ifscCode,
        "accountNo":accountNo
      })
      .then((res)=>{
        let data = res.data
        if(data.status==="success"){
          registerSuccess()
        }
      })
      .catch((err)=>{
        console.log(err)
      })
  }

  }

  return (
    <div className="bank-details-container" >
    <div className="addBankAccount-form" >
    <input type="text" placeholder="Bank Name" value={bankName} onChange={bankNameInputHandler} />
    <input type="text" placeholder="IFSC code"  value={ifscCode} onChange={ifscCodeInputHandler} />
    <input type="text" placeholder="Account No"  value={accountNo} onChange={accountNoInputHandler} />
    <button onClick={formSubmit} >Submit</button>
    </div>
    </div>
  )
}

export default AddBankAccountForm;
