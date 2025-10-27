import "./Signup.css";
import { useState } from "react";

export function Register() {
    const [value, setValue] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState({
        nError: "",
        eError: "",
        pError: "",
        cError: ""
    });

    const ValidateInput = (ev) => {
        const { name, value: inputValue } = ev.target;
        setValue(prev => ({
            ...prev,
            [name]: inputValue
        }));
    }

    const ValidateForm = (ev) => {
        ev.preventDefault();
        
        const newError = {
            nError: value.name.length === 0 ? "Name Required" : 
                    value.name.length < 2 ? "Name must be at least 2 characters" : "valid",
            
            eError: value.email.length === 0 ? "Email Required" : 
                    !value.email.includes("@") ? "Invalid email format" : "valid",
            
            pError: value.password.length === 0 ? "Password Required" : 
                    value.password.length < 6 ? "Password must be at least 6 characters" : "valid",
            
            cError: value.confirmPassword.length === 0 ? "Confirm Password Required" : 
                    value.confirmPassword !== value.password ? "Passwords do not match" : "valid"
        };

        setError(newError);

        if (Object.values(newError).every(error => error === "valid")) {
            console.log("Registration Data:", value);
        }
    }

    return (    <>
    <div style={{width: "100vw", height:'100vh'}}>
        <h2 className="fw-bold mb-2">Register</h2>

        <form onSubmit={ValidateForm} className="form-container">
            <input 
                type="text" 
                id="inputName" 
                className="form-control" 
                name="name" 
                placeholder="Name"
                value={value.name} 
                onChange={ValidateInput} 
            />
            <div className={error.nError === "valid" ? "text-success" : "text-danger"}>
                {error.nError === "valid" ? " Name valid" : error.nError}
            </div>

            <input 
                type="email" 
                id="inputEmail" 
                className="form-control" 
                name="email" 
             placeholder="Enter your Email"

                value={value.email} 
                onChange={ValidateInput} 
            />
            <div className={error.eError === "valid" ? "text-success" : "text-danger"}>
                {error.eError === "valid" ? " Email valid" : error.eError}
            </div>

            <input 
                type="password" 
                id="inputPassword" 
                className="form-control" 
                name="password" 
                placeholder="Password"
                value={value.password} 
                onChange={ValidateInput} 
            />
            <div className={error.pError === "valid" ? "text-success" : "text-danger"}>
                {error.pError === "valid" ? " Password valid" : error.pError}
            </div>

            <input 
                type="password" 
                id="inputConfirmPassword" 
                className="form-control" 
                name="confirmPassword" 
                placeholder="Confirm Password"
                value={value.confirmPassword} 
                onChange={ValidateInput} 
            />
            <div className={error.cError === "valid" ? "text-success" : "text-danger"}>
                {error.cError === "valid" ? " Passwords match" : error.cError}
            </div>

            <button type="submit" className="btn btn-primary mt-3">Register</button>
        </form>
        </div>
        </>
    );
}