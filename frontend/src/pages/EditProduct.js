import DescriptionIcon from "@mui/icons-material/Description";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import CreateIcon from "@mui/icons-material/Create";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ImageIcon from "@mui/icons-material/Image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProductById,
  updateProduct,
  reset,
} from "../features/products/productSlice";
import Spinner from "../components/Spinner";
import "../styles/editproduct.css";
import Header from "../components/Header";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  const [formData, setFormData] = useState({});

  const { name, description, price, categories, image } = formData;

  const handleInputChange = (event) => {
    if (event.target.name === "price") {
      if (!isNaN(parseFloat(event.target.value))) {
        setFormData((prevState) => ({
          ...prevState,
          price: parseFloat(event.target.value),
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    }
};

const splitCategories = () => {
    if(typeof(formData.categories) === 'string') {
        let splitedCategories = formData.categories.split(",");
        
        setFormData((prevState) => ({
            ...prevState,
            categories: splitedCategories,
        }));
    }
};

const handleFormSubmit = (event) => {

    event.preventDefault();

    const updateProductPackage = { newData: formData, id };

    dispatch(updateProduct(updateProductPackage));

    navigate("/me");
  };

  useEffect(() => {
      splitCategories()
  }, [formData.categories])

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getProductById(id));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message, id]);

  useEffect(() => {
    if (products) {
      setFormData({
        name: products.name,
        description: products.description,
        price: products.price,
        categories: String(products.categories),
        image: products.image,
        user: user._id,
      });
      console.log(typeof(String(products.categories)))
    }
  }, [products, user.id]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
    <Header/>
    <div className="edit-product-body">
      <section className="register-form-container">
        <div className="register-icon-container">
          <ShoppingBasketIcon
            sx={{ fontSize: "200px" }}
            className="register-icon"
          />
        </div>
        <form className="register-page-form" onSubmit={handleFormSubmit}>
          <div className="input-container">
            <label htmlFor="name">Product name</label>
            <CreateIcon className="input-icon" />
            <input
              type="text"
              className=""
              name="name"
              placeholder="Product name"
              value={name}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-container">
            <label htmlFor="description">Product description</label>
            <DescriptionIcon className="input-icon" />
            <input
              type="text"
              name="description"
              placeholder="Product description"
              value={description}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-container">
            <label htmlFor="price">Product price</label>
            <MonetizationOnIcon className="input-icon" />
            <input
              type="number"
              name="price"
              step="any"
              placeholder="Product price"
              value={price}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-container">
            <label htmlFor="categories">Product categories</label>
            <LocalOfferIcon className="input-icon" />
            <input
              type="text"
              name="categories"
              placeholder="Product categories"
              value={categories}
              onChange={handleInputChange}
            />
          </div>
          <p className="product-img-help">Separated by ' , '</p>

          <div className="input-container">
            <label htmlFor="image">Product image</label>
            <ImageIcon className="input-icon" />
            <input
              type="text"
              name="image"
              placeholder="Product image"
              value={image}
              onChange={handleInputChange}
            />
          </div>
          <p className="product-img-help">
            Use an link to the product image, you can upload your own in{" "}
            <a href="https://imgur.com/">imgur</a>
          </p>

          <button type="submit">Save product</button>
        </form>
      </section>
    </div>
    </>
  );
}

export default EditProduct;
