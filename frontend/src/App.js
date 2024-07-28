
import './App.css';
import Navbar from './component/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Shop from './Pages/Shop'
import ShopCategory from './Pages/ShopCategory'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import Login from './Pages/LoginSignup'
import Footer from './component/Footer/Footer';
import men_banner from './component/Assets/banner_mens.png'
import women_banner from './component/Assets/banner_women.png'
import kids_banner from './component/Assets/banner_kids.png'
import Placeorder from './Pages/Placeorder/Placeorder';
function App() {
  return (
    <div >
      <BrowserRouter>
     <Navbar/>
     <Routes>
      <Route path='/' element={<Shop/>}/>
      <Route path='/mens' element={<ShopCategory  banner={men_banner} category="men" />}/>
      <Route path='/womens' element={<ShopCategory banner={women_banner} category="women" />}/>
      <Route path='/kids' element={<ShopCategory banner={kids_banner} category="kid"  />}/>
      <Route path='product/:ProductId' element={<Product/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/order' element={<Placeorder/>} />
     </Routes>
     <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
