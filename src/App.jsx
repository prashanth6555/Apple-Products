import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
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
  )
}
