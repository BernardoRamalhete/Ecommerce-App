import '../styles/header.css'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import PersonIcon from '@mui/icons-material/Person'
import AddBoxIcon from '@mui/icons-material/AddBox'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state)=> state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }
  return (
    <div className='header-body'>
        <Link to='/'  className='LinkTo'>
            <h1>My Ecommerce</h1>
        </Link>
        <div className='header-links'>

            {user ? (
                <>
                    <p className='header-logout' onClick={onLogout}><LogoutIcon className='header-icon'/>Logout</p>
                    
                    <Link to='/newproduct'  className='LinkTo'>
                        <p className='header-product'><AddBoxIcon className='header-icon'/> New product</p>
                    </Link>

                    <Link to='/me'  className='LinkTo'>
                        <p className='header-profile'><AccountBoxIcon className='header-icon'/>My Profile</p>
                    </Link>
                </>
            ) : (
                <>
                    <Link to='/login'  className='LinkTo'>
                        <p className='header-login'><LoginIcon className='header-icon'/>Login</p>
                    </Link>

                    <Link to='/register'  className='LinkTo'>
                        <p className='header-register'><PersonIcon className='header-icon'/>Register</p>
                    </Link>
                </>
            )}
            
            
        </div>
    </div>
  )
}

export default Header