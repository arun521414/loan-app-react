import "../Styles/PersonalDetails.css"
import {useEffect,useState,useRef} from "react"
import validator from "validator";
import axios from "axios"


const PersonalDetailsForm = ({changeToKycForm})=>{

    const [fullName,setFullName]   = useState('')
    const [panNumber,setPanNumber] = useState('')
    const [gender,setGender]       = useState('')
    const [dob,setDob]            = useState('')
    const [martialStatus,setMartialStatus] = useState('')
    const [employee,setEmployee] = useState("")
    const [noOfDependents,setNoOfDependents] = useState("")
    const [education,setEducation] = useState("")
    const [propertyArea,setPropertyArea] = useState("")
    const [income,setIncome] = useState("")
    const [existingEmi,setExistingEmi] = useState('')
    const [address,setAddress] = useState("")
    const [city,setCity] = useState("")
    const [state,setState] = useState("")
    const [pincode,setPincode] = useState("")

    const fullNameRef = useRef();
    const panNoRef  = useRef()
    const genderRef = useRef()
    const dobRef  = useRef()
    const martialStatusRef = useRef()
    const employeeRef = useRef()
    const noOfDependentsRef = useRef()
    const educationRef = useRef()
    const propertyAreaRef  = useRef()
    const incomeRef = useRef()
    const existingEmiRef = useRef()
    const addressRef = useRef()
    const cityRef  = useRef()
    const stateRef = useRef()
    const pincodeRef = useRef()


    function submit(){

      if(fullName===""){
        fullNameRef.current.focus()
      }
      else if (panNumber.length >10 || panNumber.length<10) {
        panNoRef.current.focus()
      }
      else if (gender===""){
          genderRef.current.focus()
      }
      else if(dob==="") {
        dobRef.current.focus()
      }
      else if(martialStatus===""){
        martialStatusRef.current.focus()
      }
      else if(noOfDependents===""){
        noOfDependentsRef.current.focus()
      }
      else if(employee===""){
        employeeRef.current.focus()
      }
      else if(education===""){
        educationRef.current.focus()
      }
      else if(propertyArea===""){
        propertyAreaRef.current.focus()
      }
      else if(income===""){
        incomeRef.current.focus()
      }
      else if(existingEmi===""){
        existingEmiRef.current.focus()
      }
      else if(address===""){
        addressRef.current.focus()
      }
      else if(city===""){
        cityRef.current.focus()
      }
      else if(state===""){
        stateRef.current.focus()
      }
      else if(pincode===""){
        pincodeRef.current.focus()
      }
      else{

        changeToKycForm()

        let profileId  = localStorage.getItem("user")

        axios.post("/register-personal-details/"+profileId+"/",{
          "fullName" : fullName,
          "panNumber":panNumber,
          "gender"   : gender,
          "dob"      : dob,
          "martialStatus":martialStatus,
          "employee" : employee,
          "noOfDependents":noOfDependents,
          "education" : education,
          "propertyArea":propertyArea,
          "income" : income,
          "existingEmi":existingEmi,
          "address" : address,
          "city" : city,
          "state" : state,
          "pincode" : pincode
        })
        .then((res)=>{
          console.log(res)
        })
        .then((err)=>{
          console.log(err)
        })

      }

    }


    return(

      <div className="profile-form-container" >


      <div className="profile-form" >

      <input type="text" placeholder="Fullname" value={fullName}  onChange={(e)=>setFullName(e.target.value)} ref={fullNameRef} />




      <input type="text" placeholder="PAN Number" value={panNumber.toUpperCase()}  onChange={(e)=>setPanNumber(e.target.value)} ref={panNoRef} />

      <select onChange={(e)=>setGender(e.target.value)} ref={genderRef} >
      <option disabled selected >Gender</option>
      <option value="Male" >Male</option>
      <option value="Female" >Female</option>
      </select>
      <input type="text" placeholder="D.O.B(dd-mm-yy)" value={dob} onChange={(e)=>setDob(e.target.value)} ref={dobRef} />

      <select onChange={(e)=>setMartialStatus(e.target.value)} ref={martialStatusRef}  >
      <option disabled selected >Marital Status</option>
      <option value="Married" >Married</option>
      <option value="UnMarried" >UnMarried</option>
      </select>

      <select onChange={(e)=>setEmployee(e.target.value)} ref={employeeRef}  >
      <option disabled selected >Employee</option>
      <option value="Yes" >Yes</option>
      <option value="No" >No</option>
      </select>

      <input type="text" placeholder="No of Dependents" value={noOfDependents} onChange={(e)=>setNoOfDependents(e.target.value)}  ref={noOfDependentsRef}/>

      <select onChange={(e)=>setEducation(e.target.value)} ref={educationRef} >
      <option disabled selected >Education</option>
      <option  value="Graduate" >Graduate</option>
      <option value="UnderGraduate" >UnderGraduate</option>
      </select>

      <select onChange={(e)=>setPropertyArea(e.target.value)} ref={propertyAreaRef} >
      <option disabled selected >Property Area</option>
      <option value="Urban" >Urban</option>
      <option value="Semi-Urban" >Semi-Urban</option>
        <option value="Rural" >Rural</option>
      </select>

      <input type="text" placeholder="Income(per month)" value={income} onChange={(e)=>setIncome(e.target.value)} ref={incomeRef}
         />
      <input type="text" placeholder="Existing EMI(per month)" value={existingEmi} onChange={(e)=>setExistingEmi(e.target.value)} ref={existingEmiRef} />

      <input type="text" placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)} ref={addressRef} />

      <input type="text" placeholder="City" value={city} onChange={(e)=>setCity(e.target.value)} ref={cityRef} />

      <input type="text" placeholder="State" value={state} onChange={(e)=>setState(e.target.value)} ref={stateRef} />

      <input type="text" placeholder="Pincode" value={pincode}  onChange={(e)=>setPincode(e.target.value)} ref={pincodeRef} />

      <button onClick={submit} >submit</button>

      </div>

      </div>
    )

  }




export default PersonalDetailsForm;
