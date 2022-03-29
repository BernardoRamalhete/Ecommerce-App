import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductForm from './pages/ProductForm'
import ProductPage from './pages/ProductPage'
import TagResult from './pages/TagResult'
import Profile from './pages/Profile'
import EditProduct from './pages/EditProduct'

function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/me' element={<Profile/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/newproduct' element={<ProductForm/>}/>
            <Route path='/product/:id' element={<ProductPage/>}/>
            <Route path='/edit/:id' element={<EditProduct/>}/>
            <Route path='/tag/:tag' element={<TagResult/>}/>
          </Routes>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
