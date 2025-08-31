import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Dashboard from './dashboard/pages/dashboard'
import Home from './dashboard/pages/home'
import ProductDetail from './dashboard/pages/product-detail'
import CategoryList from './dashboard/pages/category-list'
import Cart from './dashboard/pages/cart'
import Wishlist from './dashboard/pages/favourites'
import { ShopProvider } from './dashboard/state/shop'


function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}> 
            <Route index element={<Home />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="category/:categoryId" element={<CategoryList />} />
            <Route path="cart" element={<Cart />} />
            <Route path="wishlist" element={<Wishlist />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ShopProvider>
  )
}

export default App
