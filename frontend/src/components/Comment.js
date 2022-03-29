import { useDispatch,useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete'
import {deleteComment} from '../features/comments/commentSlice'

function Comment({comment}) {
    const dispatch = useDispatch()
    const date = new Date (comment.createdAt).toLocaleString('pt-BR').split(' ')[0]
    const {user} = useSelector((state) => state.auth)

  return (
    <>
        <div className='product-page-comment'>
                {comment.user === user?._id && 
                    <DeleteIcon className='product-page-comment-delete' onClick={() => dispatch(deleteComment(comment._id))} />
                }
            <p>{comment.text}</p>
            <div className='product-page-comment-details'>
                <p>{comment.author}</p>
                <p>{date}</p>
            </div>
        </div>
    </>
        
  )
}

export default Comment