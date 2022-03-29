import {useState } from 'react'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {deleteProduct} from '../features/products/productSlice'
import '../styles/productitem.css'

function ProductItem({product}) {
    const dispatch = useDispatch()

    const [imgHover, setImgHover] = useState(false)
  return (
      <Link to={`/product/${product._id}`} className='LinkToDark'>
      <div className='product-container' onMouseEnter={() => setImgHover(true)} onMouseLeave={() => setImgHover(false)}>

        <div className='product-price-container'>
          <p className='product-price'>${product.price.toFixed(2)}</p>
        </div>

        <div className='product-info'>
          <p className='product-name'>{product.name}</p>
          <p className='product-description'>{product.description}</p>
        </div>
        <div className='product-img' style={imgHover ? {
             backgroundImage:`url(${product.image})`, filter: 'blur(10px)', opacity: `0.7`
          } : {
            backgroundImage:`url(${product.image})`
            } }/>
          
        <button style={{display: 'none'}} onClick={() => dispatch(deleteProduct(product._id))}>X</button> 
        

      </div>
      </Link>
  )
}

export default ProductItem