import React, { useContext, useState } from 'react'
import './LogIn.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import api from '../../axiosInstance'
import { StoreContext } from '../../context/StoreContext'

const LogIn = ({ setLogin }) => {
  const { url, setToken } = useContext(StoreContext)

  // default state is signup
  const [currentState, setCurrentState] = useState("signup")

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const onLogin = async (event) => {
    event.preventDefault()
    let newUrl = url

    if (currentState === "login") {
      newUrl += "/api/user/login"
    } else {
      newUrl += "/api/user/register"
    }

    try {
      const response = await axios.post(newUrl, data)
      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem("token", response.data.token)
        setLogin(false) // close popup
      } else {
        alert(response.data.message)
      }
    } 
     catch (error) {
    console.log("Login/Signup error:", error);

    if (error.response) {
        // backend responded with an error
        alert(error.response.data.message);
    } else if (error.request) {
        // request was made but no response
        alert("Backend is not reachable. Check your server.");
    } else {
        // something else
        alert("An unexpected error occurred: " + error.message);
    }
}

  }


  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        {/* Title + Close Button */}
        <div className="login-popup-title">
          <h2>{currentState === "signup" ? "Sign Up" : "Login"}</h2>
          <img
            onClick={() => setLogin(false)} // close popup
            src={assets.cross_icon}
            alt="close"
          />
        </div>

        {/* Inputs */}
        <div className="login-popup-inputs">
          {currentState === "login" ? null : (
            <input
              type="text"
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              placeholder="Your Name"
              required
            />
          )}
          <input
            type="email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            placeholder="Your Email"
            required
          />
          <input
            type="password"
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            placeholder="Password"
            required
          />
        </div>

        {/* Submit button */}
        <button type="submit">
          {currentState === "signup" ? "Create Account" : "Login"}
        </button>

        {/* Checkbox */}
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>
            By using our app, you agree to our terms of service and data
            protection practices.
          </p>
        </div>

        {/* Switch between Login & Signup */}
        {currentState === "signup" ? (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("login")}>Login Here</span>
          </p>
        ) : (
          <p>
            Don't have an account?{" "}
            <span onClick={() => setCurrentState("signup")}>Sign Up</span>
          </p>
        )}
      </form>
    </div>
  )
}

export default LogIn
