import {useState,useEffect} from "react"
import axios from "axios"


const ApplyLoan = ()=>{
  const [eligible,setEligible] = useState(false)
  const [eligibleMsg,setEligibleMsg] = useState()
  const [loanAmount,setLoanAmount] = useState()
  const [tenure,setTenure] = useState()
  const [emi,setEmi] = useState()
  const [interestRate,setInterestRate] = useState()
  const [totalPayable,setTotalPayable] = useState()
  const [interestPayable,setInterestPayable] = useState()

  useEffect(()=>{

    let mounted = true
    let profileId = localStorage.getItem("user")
    axios.get("/get-loan-details/"+profileId+"/")

    .then((res)=>{
      let data = res.data
      if(mounted){
      if(data.status==="success"){
        setEligible(true)
        setEligibleMsg(data.msg)
        setLoanAmount(data.loanAmount)
        setEmi(data.emi)
        setTenure(data.tenure)
        setInterestRate(data.interestRate)
        setTotalPayable(data.totalPayable)
        setInterestPayable(data.interestPayable)
      }
    else if(data.status==="error"){
      setEligible(false)
      setEligibleMsg(data.msg)
    }
  }

    })

    return ()=> mounted = false

  },[])

  if(eligible){
    return(
      <div className="eligible-loan-container" >

        <div className="eligible-msg" >
          <h1>Congratulations you are <b>{eligibleMsg}</b> for Loan Amount : <b>Rs {loanAmount}</b></h1>
        </div>
        <div className="loan-details" >
          <h1>Loan Amount : Rs {loanAmount}</h1>
          <h1>Tenure : {tenure} months</h1>
          <h1>Interest Rate : {interestRate} %</h1>
          <h1>Emi : Rs {emi}</h1>
          <h1>Total Payable : Rs {totalPayable}</h1>
          <h1>Interest Payable : Rs {interestPayable}</h1>
        </div>

      </div>
    )

  }
  else{
    return(
      <div  className="eligible-loan-container" >
        <div className="not-eligible-msg" >
          <h1>Sorry you are {eligibleMsg} for loan</h1>
        </div>

      </div>
    )
  }





}

export default ApplyLoan;
