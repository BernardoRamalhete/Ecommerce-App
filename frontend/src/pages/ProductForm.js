import DescriptionIcon from '@mui/icons-material/Description'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import CreateIcon from '@mui/icons-material/Create'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import ImageIcon from '@mui/icons-material/Image'
import { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {createProduct} from '../features/products/productSlice'
import '../styles/productform.css'

function ProductForm() {
    const {user} = useSelector((state) => state.auth)

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        categories: "",
        image: "",
        user: user._id
      })

    const {name, description, price, categories, image} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleInputChange = (event) => {
        if(event.target.name === 'price') {
          if (!isNaN(parseFloat(event.target.value))) {
            setFormData((prevState) => ({
              ...prevState,
              price: parseFloat(event.target.value),
            }));
          }
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value
              }))
        }
    }

    const splitCategories = () => {
      if(typeof(formData.categories) === 'string') {
        let splitedCategories = formData.categories.split(",");
        
        setFormData((prevState) => ({
            ...prevState,
            categories: splitedCategories,
        }));
    }
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()

        dispatch(createProduct(formData))

        navigate('/')

    }

    useEffect(() => {
      splitCategories()
  }, [formData.categories])

  return (
    <>
        <div className="productform-page-body">
        <section className='register-form-container'>
          <div className='register-icon-container'>
            <ShoppingBasketIcon sx={{fontSize: '200px'}} className='register-icon'/>
          </div>
          <form className="register-page-form" onSubmit={handleFormSubmit}>

            <div className='input-container'>
              <label htmlFor="name">Product name</label>
              <CreateIcon className='input-icon'/>
              <input
                type="text"
                className=""
                name="name"
                placeholder="Product name"
                value={name}
                onChange={handleInputChange}
              />
            </div>

            <div className='input-container'>
              <label htmlFor="description">Product description</label>
              <DescriptionIcon className='input-icon'/> 
              <input
                type="text"
                name="description"
                placeholder="Product description"
                value={description}
                onChange={handleInputChange}
              />
            </div>
            
            <div className='input-container'>
              <label htmlFor="price">Product price</label>
              <MonetizationOnIcon className='input-icon'/> 
              <input
                type="number"
                name="price"
                placeholder="Product price"
                value={price}
                onChange={handleInputChange}
              />
            </div>
            
            <div className='input-container'>
              <label htmlFor="categories">Product categories</label>
              <LocalOfferIcon className='input-icon'/> 
              <input
                type="text"
                name="categories"
                placeholder="Product categories"
                value={categories}
                onChange={handleInputChange}
              />
            </div>
            <p className='product-img-help'>Separated by ' , '</p>
            
            <div className='input-container'>
              <label htmlFor="image">Product image</label>
              <ImageIcon className='input-icon'/> 
              <input
                type="text"
                name="image"
                placeholder="Product image"
                value={image}
                onChange={handleInputChange}
              />
            </div>
              <p className='product-img-help'>Use an link to the product image, you can upload your own in <a href='https://imgur.com/'>imgur</a></p>

            <button type="submit">Add product</button>
          </form>
        </section>
      </div>
    </>
  )
}

export default ProductForm