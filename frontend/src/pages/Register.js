import { useState, useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {register, reset} from '../features/auth/authSlice'
import "../styles/register.css";
import PersonIcon from "@mui/icons-material/Person"
import KeyIcon from '@mui/icons-material/Key'
import EmailIcon from '@mui/icons-material/Email'
import HomeIcon from '@mui/icons-material/Home'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import Spinner from '../components/Spinner'

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, address, password, confirmPassword } = formData

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

    if(password !== confirmPassword) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password,
        address
      }

      dispatch(register(userData))
    }
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
      <div className="register-page-body">
        <section className='register-form-container'>
          <div className='register-icon-container'>
            <PersonIcon sx={{fontSize: '200px'}} className='register-icon'/>
          </div>
          <form className="register-page-form" onSubmit={handleFormSubmit}>
          <div className='input-container'>
            <label htmlFor="name">Name</label>
            <AccountBoxIcon className='input-icon'/>
            <input
              type="text"
              className=""
              name="name"
              placeholder="What's your name?"
              value={name}
              onChange={handleInputChange}
            />
          </div>

            <div className='input-container'>
              <label htmlFor="email">Email</label>
              <EmailIcon className='input-icon'/>
              <input
                type="email"
                className=""
                name="email"
                placeholder="What's your best email?"
                value={email}
                onChange={handleInputChange}
              />
            </div>

            <div className='input-container'>
              <label htmlFor="address">Address</label>
              <HomeIcon className='input-icon'/>
              <input
                type="address"
                className=""
                name="address"
                placeholder="Where are you selling from?"
                value={address}
                onChange={handleInputChange}
              />
            </div>

            <div className='input-container'>
              <label htmlFor="password">Password</label>
              <KeyIcon className='input-icon'/> 
              <input
                type="password"
                name="password"
                placeholder="Create a strong password!"
                value={password}
                onChange={handleInputChange}
              />
            </div>

            <div className='input-container'>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <KeyIcon className='input-icon'/> 
              <input
                type="password"
                className=""
                name="confirmPassword"
                placeholder="Now confirm that password!"
                value={confirmPassword}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit">Register</button>
          </form>
        </section>
      </div>
    </>
  );
}

export default Register;
