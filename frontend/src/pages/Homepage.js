import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import Header from '../components/Header'
import Spinner from '../components/Spinner'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'
import { getProducts, reset } from '../features/products/productSlice'
import ProductItem from '../components/ProductItem'
import '../styles/homepage.css'

function Homepage() {
  const dispatch = useDispatch()
  
  const {products, isLoading, isError, message} = useSelector((state) => state.products)

  useEffect(()=> {
    if(isError) {
      toast.error(message)
    }

    dispatch(getProducts())

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
      <section className='homepage-content'>
        {products.length > 0 ? 
        (
          <>
            {products.map((product) =>
              <ProductItem key={product._id} product={product}/>
              )
            }
          </>
        ) : 
        (
          <div className='homepage-noproducts'>
            <h3>No products to display<ThumbDownOffAltIcon className='thumbdown-icon'/></h3>
          </div>)}
      </section>
    </>
  )
}

export default Homepage