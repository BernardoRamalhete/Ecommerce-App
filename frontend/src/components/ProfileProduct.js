import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {deleteProduct} from '../features/products/productSlice'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

function ProfileProduct({product}) {
    const dispatch = useDispatch()

  return (
    <div  className='profile-products'>

        <div className='product-profile-icons'>
            <Link to={'/edit/' + product._id} className='LinkToDark'>
                <EditIcon className='product-icon'/>
            </Link>
                <DeleteIcon className='product-icon' onClick={() => dispatch(deleteProduct(product._id))}/>
        </div>
        <Link to={`/product/${product._id}`} className='LinkToDark'>
            <div className='product-profile-container'>
                <img src={product.image} alt={product.name}/>
                <div className='product-profile-info'>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>${product.price.toFixed(2)}</p>
                </div>
            </div>
        </Link>

    </div>
  )
}

export default ProfileProduct