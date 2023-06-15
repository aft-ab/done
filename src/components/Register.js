// import './Register.css'
// import React, { Component } from 'react'
// function Register() {
//     return (
//         <>
//             <div className='done'>
//                 <form>
//                 <div className="border border-3 border-primary"></div>
//                     <h3 className="fw-bold mb-2 text-uppercase ">Please Sign Up</h3>

//                     <div className="mb-3">
//                         <label>Email address</label>
//                         <input
//                             type="email"
//                             className="form-control"
//                             placeholder="Enter email"
//                         />
//                     </div> 
//                     <div className="mb-3">
//                         <label>USERNAME</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Enter Username"
//                             // value={username}
//                         />
//                     </div>
                
                   
//                     <div className="mb-3">
//                         <label>Password</label>
//                         <input
//                             type="password"
//                             className="form-control"
//                             placeholder="Enter password"
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label>Profile Pic</label>
//                         <input
//                             type="file"
//                             className="form-control"
                      
//                         />
//                     </div>
//                     <div className="d-grid">
//                         <button type="submit" className="btn btn-primary">
//                             {/* Sign Up */}Submit
//                         </button>
//                     </div>
//                     {/* <p className="forgot-password text-right">
//                         Already registered <a href="/login">sign in?</a>
//                     </p> */}
//                     {/* <div className="mt-3">
//                       <p className="mb-0  text-center">
//                       Already registered{" "}
//                         <a href="/login" className="text-primary fw-bold">
//                           sign in?
//                         </a>
//                       </p>
//                     </div> */}
                    
//                 </form>
//             </div>

//         </>
//     );
// }

// export default Register;
import React, { useState } from "react"
import "./Register.css"
import axios from "axios"
import { Navigate, useNavigate } from "react-router-dom"

const Register = () => {

    const Navigate = useNavigate()

    const [ user, setUser] = useState({
        username: "",
        email:"",
        password:"",
        file:"",
        
    })

    

    // const handleChange = e => {
    //     const { name, value } = e.target
    //     setUser({
    //         ...user,
    //         [name]: value
    //     })
    // }
    const [file, setFile]= useState("");

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }
    
    function handleFile(e) 
    {
    e.preventDefault();
    setFile(e.target.files[0]);
    setUser({...user,["file"]:e.target.files[0]});
    console.log(file);
    }

    const register = () => {
        const { username, email, password, file } = user

        
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
        if( username  && password && password ){
            axios.post("http://localhost:4200/register", user,config)
            .then( res => {
                alert(res.data.message)
                console.log(user);
                Navigate("/login")
                
            })
        } else {
            alert("invlid input")
        }
        
    }

    return (
        <div className="register">
            {console.log("User", user)}
            <h1>Register</h1>
            <input type="text" name="username" value={user.username} placeholder="Your Name" onChange={ handleChange }></input>
            <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={ handleChange }></input>
            <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={ handleChange }></input>
            <input  type="file" name="file" onChange={handleFile}/>
            <div className="button" onClick={register} >Register</div>
            <div>or</div>
            <div className="button" onClick={() => Navigate("/login")}>Login</div>
        </div>
    )
}

export default Register