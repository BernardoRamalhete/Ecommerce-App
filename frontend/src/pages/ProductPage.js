import {toast} from 'react-toastify'
import {useParams, Link} from 'react-router-dom'
import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { createComment } from '../features/comments/commentSlice'
import { getProductById, reset } from '../features/products/productSlice'
import {getComments} from '../features/comments/commentSlice'
import Spinner from '../components/Spinner'
import Header from '../components/Header'
import Comment from '../components/Comment'
import SellIcon from '@mui/icons-material/Sell'
import '../styles/productpage.css'

function ProductPage() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const {products, isLoading, isError, message} = useSelector((state) => state.products)
    const comments = useSelector((state) => state.comments)
    
    const [commentData, setCommentData] = useState({
      text: '',
      user: user?._id,
      product: id,
      author: user?.name
    })
    
    const {text} = commentData

    const handleCommentInput = (event) => {
      setCommentData((prevState) => ({
        ...prevState,
        text: event.target.value
      }))
    }

    const submitComment = (event) => {
      event.preventDefault()
      setCommentData((prevState) => ({
        ...prevState,
        text: ''
      }))

      dispatch(createComment(commentData))
    }

    useEffect(()=> {
        if(isError) {
          toast.error(message)
        }

        if(comments.isError) {
          toast.error(comments.message)
        }
    
        dispatch(getProductById(id))
        dispatch(getComments(id))
    
        return () => {
          dispatch(reset())
        }
      }, [dispatch, isError, message, id, comments.isError, comments.message])

    if(isLoading || comments.isLoading) {
      return <Spinner/>
    }
  return (
    <>
      <Header/>
      <div className='product-page-body'>

        <div className='product-page-container'>

          <img src={products.image} alt={products.name}/>

          <div className='product-page-info'>

            <h1 className='product-page-title'>{products.name}</h1>
            <p className='product-page-description'>{products.description}</p>
            <p className='product-page-price'>${products?.price?.toFixed(2)}</p>
            <div className='product-page-category'>
              <SellIcon className='product-page-categories-tag'/>
              <div className='product-page-categories'>
                {
                  products?.categories?.map((category, key) => 
                  <p key={key}><Link className='LinkToDark' to={`/tag/${category}`}>{category}</Link></p>
                  )
                }
              </div>
            </div>

            {user && <form className='product-page-form' onSubmit={submitComment}>
              <input type='text' placeholder='Add a comment' name='text' value={text} onChange={handleCommentInput}/>
              <button type='submit'>Add comment</button>
            </form>}

          </div>
        
        {comments.comments.length > 0 && <div className='product-page-comments'>
                <h3>Comments</h3>
            {comments.comments.length > 0 &&
              comments.comments.map((comment) => 
              <Comment comment={comment} key={comment._id}/>
              )
            }
        </div>}
        </div>

      </div>
    </>
  )
}

export default ProductPage