import axios from 'axios'

const API_URL = '/api/products/'

const createProduct = async (productData, token) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }

    const response = await axios.post(API_URL, productData, config)

    return response.data
}

const getProducts = async () => {

    const response = await axios.get(API_URL)

    return response.data
}

const getProductById = async (productId) => {
    const response = await axios.get(API_URL + productId)

    return response.data
}

const getUserProducts = async (token) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }

    const response = await axios.get(API_URL + '/me', config)

    return response.data
}

const deleteProduct = async (productId, token) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    const response = await axios.delete(API_URL + productId, config)

    return response.data
}

const updateProduct = async (newData, productId, token) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }

    const data = {
        user: newData.user,
        name: newData.name,
        price: newData.price,
        image: newData.image,
        description: newData.description,
        categories: newData.categories
    }


    const response = await axios.put(API_URL + productId, data, config) 

    return response.data
}

const productService = {
    createProduct,
    getProducts,
    getProductById,
    getUserProducts,
    deleteProduct,
    updateProduct
}

export default productService