import { useNavigate } from "react-router-dom";
import "./Login.css"; 

import { useState } from "react"
import toast, { Toaster } from "react-hot-toast";
import { Toast } from "bootstrap";
import { userLogin } from "../../services/auth";

export function Login (){
const [value , setValue] = useState ({
    email : "",
    password : ''
});
    const navigate = useNavigate();

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

const ValidateForm = async(ev)=> { 
ev.preventDefault();

const isEmailValid = value.email.length > 0 && value.email.includes("@");
const isPasswordValid = value.password.length >= 6;

setError({
  eError: !value.email.length ? "Email Required" : !value.email.includes("@") ? "Invalid email" : "valid",
  pError: !value.password.length ? "Password Required" : value.password.length < 6 ? "Password should be more than 6 digit" : "valid"
});

if (isEmailValid && isPasswordValid) {
    try {
        console.log("Login Data:", value);
        const res = await userLogin(value.email, value.password);
        console.log(res);
        // localStorage to store token
        localStorage.setItem('userToken', res.user.accessToken);
        toast.success("Login successful!");
        //to navigate to movies after login
        setTimeout(() => {
            navigate("/Movies");
            //to reload the page after login to update nav bar
            window.location.reload();
        }, 1000);
    } catch (error) {
        toast.error(error.message);
    }
} else {
     console.log("Invalid validation");     
    toast.error("Invalid validation");
}
}
        return (
        <div className="loginPage">
        <h1> Welcome Back :") </h1>
        <form onSubmit={(ev)=>{ValidateForm(ev)}} className="form-container">

<input type="email" id="inputEmail5" className="form-control" name="email" value={value.email} placeholder="Email:" onChange={ValidateInput} />
<div className={error.eError === "valid" ? "text-success" : "text-danger"}>
    {error.eError === "valid" ? " Email valid" : error.eError}
</div>
<input type="password" id="inputPassword5" className="form-control" name="password" value={value.password} placeholder="Password" onChange={ValidateInput} />
<div className={error.pError === "valid" ? "text-success" : "text-danger"}>
    {error.pError === "valid" ? " Password valid" : error.pError}
</div>            <button type="submit" className="btn btn-primary mt-3">Submit</button>
<Toaster position="top-center"  />
        </form>
        </div>
        )

}