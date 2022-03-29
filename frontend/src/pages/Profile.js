import { getUserProducts, reset } from '../features/products/productSlice'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import Header from '../components/Header'
import Spinner from '../components/Spinner'
import ProfileProduct from '../components/ProfileProduct'
import '../styles/profile.css'

function Profile() {
    const dispatch = useDispatch()

    const {user} = useSelector((state)=> state.auth)

    const {products, isLoading, isError, message} = useSelector((state) => state.products)

    useEffect(()=> {
        if(isError) {
        toast.error(message)
        }

        dispatch(getUserProducts())

        return () => {
        dispatch(reset())
        }
    }, [dispatch, isError, message])

    if(isLoading) {
        return <Spinner/>
    }

  return (
    <>
        <Header/>
        <div className='profile-body'>
            <div className='profile-container'>
                <h1>{user.name}</h1>
                <div className='profile-info'>
                    <h3 className='profile-border'>
                        <p>Email</p>
                        <p>{user.email}</p>
                    </h3>
                    <h3>
                        <p>Address</p>
                        <p>{user.address}</p>
                    </h3>
                </div>
                <h2>My products</h2>
                {products.length > 0 && <div>
                    {
                        products.map(product =>
                            <ProfileProduct product={product} key={product._id}/>
                        )
                    }
                </div>}
            </div>
        </div>
    </>
  )
}

export default Profile