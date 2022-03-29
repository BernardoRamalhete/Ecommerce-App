import { useState, useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {login, reset} from '../features/auth/authSlice'
import "../styles/register.css"
import LoginIcon from '@mui/icons-material/Login'
import KeyIcon from '@mui/icons-material/Key'
import EmailIcon from '@mui/icons-material/Email'
import Spinner from "../components/Spinner"
import '../styles/login.css'

function Login() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        password: "",
        confirmPassword: "",
      })
    
      const { email, password} = formData

      const navigate = useNavigate()
      const dispatch = useDispatch()

      const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)
    
      const handleInputChange = (event) => {
        setFormData((prevState) => ({
          ...prevState,
          [event.target.name]: event.target.value
        }))
      }
      
      const handleFormSubmit = (event) => {
        event.preventDefault()

        const userData = {
          email,
          password
        }

        dispatch(login(userData))
      }

      useEffect(()=> {
        if(isError) {
          toast.error(message)
        }
    
        if(isSuccess || user) {
          navigate('/')
        }
    
        dispatch(reset())
      }, [user, isError, isSuccess, message, navigate, dispatch])

      if(isLoading) {
        return <Spinner/>
      }
  return (
    <>
      <div className="login-page-body">
        <section className='register-form-container'>
          <div className='register-icon-container'>
            <LoginIcon sx={{fontSize: '200px'}} className='register-icon'/>
          </div>
          <form className="register-page-form" onSubmit={handleFormSubmit}>

            <div className='input-container'>
              <label htmlFor="email">Email</label>
              <EmailIcon className='input-icon'/>
              <input
                type="email"
                className=""
                name="email"
                placeholder="Your email address"
                value={email}
                onChange={handleInputChange}
              />
            </div>

            <div className='input-container'>
              <label htmlFor="password">Password</label>
              <KeyIcon className='input-icon'/> 
              <input
                type="password"
                name="password"
                placeholder="Your password"
                value={password}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit">Login</button>
          </form>
        </section>
      </div>
    </>
  )
}

export default Login