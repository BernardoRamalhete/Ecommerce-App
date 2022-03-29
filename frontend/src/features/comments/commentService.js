import axios from 'axios'

const API_URL = '/api/comments/'

const createComment = async (commentData, token) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }

    const response = await axios.post(API_URL + commentData.product, commentData, config) 
    return response.data 
}

const getComments = async (productId) => {
    const response = await axios.get(API_URL + productId)

    return response.data
}

const deleteComment = async (commentId, token) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }

    const response = await axios.delete(API_URL + commentId, config)

    return response.data
}

const commentService = {
    createComment,
    getComments, 
    deleteComment
}

export default commentService