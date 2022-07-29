import {useState,useRef} from "react";
import axios from "axios"
const KycForm = ({changeToApplyLoan})=>{

  const [frontImage,setFrontImage] = useState("")
  const [backImage,setBackImage]   = useState("")


   const front_inputRef = useRef()
   const back_inputRef = useRef()
   const frontImageRef = useRef()
   const backImageRef = useRef()

   function handleOpenFrontInput(){
     front_inputRef.current.click();
   }

   function handleOpenBackInput(){
     back_inputRef.current.click()
   }

   function frontInputHandler(e){

     setFrontImage(e.target.files[0])
     frontImageRef.current.src = URL.createObjectURL(e.target.files[0]);

   }

   function backInputHandler(e){

     setBackImage(e.target.files[0])
     backImageRef.current.src = URL.createObjectURL(e.target.files[0]);

   }

   function upload(){

     if(frontImage!=""&& backImage!=""){
       let profileId = localStorage.getItem("user")
       axios.post("/upload-aadhar/"+profileId+"/",{
         "frontImage" : frontImage,
         "backImage"  : backImage
       },{ headers:{
         "Content-Type" : "multipart/form-data"
       }
       })
       .then((res)=>{
         if(res.data.status=="success"){
           changeToApplyLoan()
         }
       })
       .then((err)=>{
         console.log(err)
       })
     }

   }




   return(
     <div className="kycform-container" >

      <div className="kyc-form">




      <div className="image-input"  onClick={handleOpenFrontInput} >
      <img ref={frontImageRef}  />
      <input type="file" style={{"display":"none"}} ref={front_inputRef} onChange={frontInputHandler} />
      <span>click here to upload</span>
      <h2>Aaadhar front</h2>
      </div>


      <div className="image-input"  onClick={handleOpenBackInput}>
        <img ref={backImageRef} />
      <input type="file" style={{"display":"none"}} ref={back_inputRef}  onChange={backInputHandler} />
        <span>click here to upload</span>
      <h2>Aaadhar back</h2>

      </div>

      <button onClick={upload} >Upload</button>

      </div>
     </div>
   )

}

export default KycForm;
