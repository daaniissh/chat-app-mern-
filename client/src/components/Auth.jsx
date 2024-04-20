import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'
import './Auth.css'
import signUpImage from '../assets/signup.jpg'
const cookies = new Cookies
const initialState = {
  fullName: '',
  username: '',
  password: '',
  confirmPassword: '',
  localImage: '',
  phoneNumber: ''
}

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true)
  const [form, setForm] = useState(initialState)
  const [image, setImage] = useState("")
  const [avatar, setAvatar] = useState("")
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })

  }
  useEffect(() => {
    document.title = isSignUp ? "Sign Up" : "Sign In";
  }, [isSignUp]);
  const switchMode = (e) => {
    setIsSignUp((prev) => !prev)
  }
  const handleImageChange = (event) => {
    const img = event.target.files[0];
    setImage(img)
    console.log(img);
    setForm({
      ...form,
      localImage: URL.createObjectURL(img)
    })

  };
  const handleSubmit = async (e) => {
    console.log(image, "----");
    e.preventDefault()
    const { fullName, username, password, phoneNumber } = form
    const URL = 'http://localhost:3000/auth'
    const { data: { token, userId, hashPassword } } = await axios.post(`${URL}/${isSignUp ? 'signup' : "login"}`, {
      username, password, phoneNumber, avatar, fullName
    })

    var data_image = new FormData();

    data_image.append("file", image);
    data_image.append("upload_preset", "fjkhdfbdhrb");
    data_image.append("cloud_name", "dsokmkalh");

    const config = {
      method: "POST",
      body: data_image,
    };
    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dsokmkalh/image/upload", config);
      const responseData = await response.json();
      setAvatar(responseData.url)
      console.log(responseData.url);
      // movieImageUrlCondition = responseData.url

    } catch (error) {
      console.log(error, "==");
    }

    // Do something with the responseData
    cookies.set('token', token)
    cookies.set('username', username)
    cookies.set('fullName', fullName)
    cookies.set('userId', userId)
    cookies.set('avatar', avatar)
    if (isSignUp) {;
      cookies.set('phoneNumber', phoneNumber)
      cookies.set('hashPassword', hashPassword)
    }
    window.location.reload()
  }

  return (
    <div className='auth__form-container' >

      <div className="auth__form-container_fields">

        <div className="auth__form-container_fields-content">
          <p>{isSignUp ? "Sign Up" : "Sign In"}</p>
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="no-dp">
                <img src={form.localImage || "/assets/noImg.png"} alt="" width="110px" height="110px" />
              </div>
            )}
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Full name</label>
                <input type="text" name="fullName" placeholder='Full Name' onChange={handleChange} required id="fullName" />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="userName">Username</label>
              <input type="text" name="username" placeholder='userName' onChange={handleChange} required id="userName" />
            </div>
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phone">Phone number</label>
                <input type="text" name="phoneNumber" placeholder='Phone Number' onChange={handleChange} required id="phone" />
              </div>
            )}
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="">Avatar</label>
                <label class="file">
                  <input type="file" onChange={handleImageChange} id="file" className='custom-file-input' aria-label="File browser example" />
                  <span class="file-custom"></span>
                </label>
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder='*********' onChange={handleChange} required id="pass" />
            </div>
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmPassword">Conform password</label>
                <input type="password" name="confirmPassword" placeholder='Conform password' onChange={handleChange} required id="cPass" />
              </div>
            )}
            <div className="auth__form-container_fields-content_button">
              <button>{isSignUp ? "Sig Up" : "Sig In"}</button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {isSignUp ? "Already have a account" : "Don't have an account"}
              <span onClick={switchMode} >{isSignUp ? 'Sig In' : 'Sign Up'}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="auth__form-container_image">
        <img src={signUpImage} alt="" />
      </div>
    </div>
  )
}

export default Auth