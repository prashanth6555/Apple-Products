import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
 
import { StoreProvider } from './context/StoreContext'

import Layout from './components/Layout'

import Home from './pages/Home'

import Category from './pages/Category'

import ProductDetails from './pages/ProductDetails'

import Cart from './pages/Cart'

import Wishlist from './pages/Wishlist'

import NotFound from './pages/NotFound'
 
export default function App() {

  return (
<StoreProvider>
<BrowserRouter>
<Routes>
<Route element={<Layout />}>
<Route path="/" element={<Home />} />
 
            <Route

              path="/iphone"

              element={<Navigate to="/category/iphone" replace />}

            />
 
            <Route

              path="/ipad"

              element={<Navigate to="/category/ipad" replace />}

            />
 
            <Route

              path="/mac"

              element={<Navigate to="/category/mac" replace />}

            />
 
            <Route

              path="/watch"

              element={<Navigate to="/category/watch" replace />}

            />
 
            <Route

              path="/airpods"

              element={<Navigate to="/category/airpods" replace />}

            />
 
            <Route path="/category/:slug" element={<Category />} />
 
            <Route path="/product/:id" element={<ProductDetails />} />
 
            <Route path="/cart" element={<Cart />} />
 
            <Route path="/wishlist" element={<Wishlist />} />
 
            <Route path="*" element={<NotFound />} />
</Route>
</Routes>
</BrowserRouter>
</StoreProvider>

  )

}
 