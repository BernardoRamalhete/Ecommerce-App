import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { getProducts, reset } from "../features/products/productSlice"
import Header from "../components/Header"
import ProductItem from "../components/ProductItem"
import Spinner from "../components/Spinner"
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'
import "../styles/tagresult.css"

function TagResult() {
  const dispatch = useDispatch()

  const { tag } = useParams()

  const [filteredProducts, setFilteredProducts] = useState([])

  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getProducts())

    return () => {
      dispatch(reset())
    };
  }, [dispatch, isError, message])

  useEffect(()=> {
    if(products.length > 0) {
      setFilteredProducts(products.filter((product) =>
      product.categories.map(category => category.trim()).includes(tag.trim())
    ))
    }
  }, [products, tag])

  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <Header />
      <div className="tag-result-body">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))
        ) : (
          <div className="homepage-noproducts">
            <h3>
              No products to display
              <ThumbDownOffAltIcon className="thumbdown-icon" />
            </h3>
          </div>
        )}
      </div>
    </>
  );
}

export default TagResult;
