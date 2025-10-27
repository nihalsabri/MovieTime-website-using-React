import "./Login.css"; 

import { useState } from "react"

export function Login (){
const [value , setValue] = useState ({
    email : "",
    password : ''
});

const ValidateInput = (ev)=> {

    if (ev.target.name == "email"){
    setValue({...value,email:ev.target.value})
console.log(ev.target.value);
    } else if (ev.target.name == "password"){
    setValue({...value,password:ev.target.value})

}}

const [error, setError] = useState ({
    eError:"",pError:"" ,
})

const ValidateForm = (ev)=> { 
ev.preventDefault();
// setError({...error,eError: value.email.length === 0 ? "Email Required" : !value.email.includes("@") ? "Invalid email format" : "valid" ,pError: value.password.length === 0 ? "Password Required" : ev.target.value.length < 6 ? "Password must be at least 6 characters" : "valid"  })
setError({...error, 
  eError: value.email.length === 0 ? "Email Required" : !value.email.includes("@") ? "Invalid email" : "valid",
  pError: value.password.length === 0 ? "Password Required" : value.password.length < 6 ? "Password should be more than 6 digit" : "valid"
});
console.log(value);


}
        return (<>
        
        <form onSubmit={(ev)=>{ValidateForm(ev)}} className="form-container">
<label htmlFor="inputEmail5" className="form-label">Email:</label>
<input type="email" id="inputEmail5" className="form-control" name="email" value={value.email} onChange={ValidateInput} />
<div className={error.eError === "valid" ? "text-success" : "text-danger"}>
    {error.eError === "valid" ? " Email valid" : error.eError}
</div>
<label htmlFor="inputPassword5" className="form-label">Password</label>
<input type="password" id="inputPassword5" className="form-control" name="password" value={value.password} onChange={ValidateInput} />
<div className={error.pError === "valid" ? "text-success" : "text-danger"}>
    {error.pError === "valid" ? " Password valid" : error.pError}
</div>            <button type="submit" className="btn btn-primary mt-3">Submit</button>

        </form>
        
        </>)

}