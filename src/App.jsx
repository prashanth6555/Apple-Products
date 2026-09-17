import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
<<<<<<< HEAD
import AuthLayout, { ProtectedRoute } from './components/layout/AuthLayout'
import Layout from './components/layout/Layout'
import { AuthProvider } from './context/AuthContext'
import { PlayerProvider } from './context/PlayerContext'
import ArtistPage from './pages/ArtistPage'
import Home from './pages/Home'
import Library from './pages/Library'
import LikedSongs from './pages/LikedSongs'
import Login from './pages/Login'
import PlaylistPage from './pages/PlaylistPage'
import Profile from './pages/Profile'
import Search from './pages/Search'
import Signup from './pages/Signup'

export default function App() {
  return (
    <AuthProvider>
      <PlayerProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="search" element={<Search />} />
              <Route path="playlist/:id" element={<PlaylistPage kind="playlist" />} />
              <Route path="album/:id" element={<PlaylistPage kind="album" />} />
              <Route path="artist/:id" element={<ArtistPage />} />
              <Route path="library" element={<Library />} />
              <Route path="liked" element={<LikedSongs />} />
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </PlayerProvider>
    </AuthProvider>
=======
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
            <Route path="/iphone" element={<Navigate to="/category/iphone" replace />} />
            <Route path="/ipad" element={<Navigate to="/category/ipad" replace />} />
            <Route path="/mac" element={<Navigate to="/category/mac" replace />} />
            <Route path="/watch" element={<Navigate to="/category/watch" replace />} />
            <Route path="/airpods" element={<Navigate to="/category/airpods" replace />} />
            <Route path="/category/:slug" element={<Category />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
>>>>>>> d030ef1 (first commit)
  )
}
