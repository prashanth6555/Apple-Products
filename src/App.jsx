import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import { PlayerProvider } from './context/PlayerContext'
import ArtistPage from './pages/ArtistPage'
import Home from './pages/Home'
import Library from './pages/Library'
import LikedSongs from './pages/LikedSongs'
import PlaylistPage from './pages/PlaylistPage'
import Search from './pages/Search'

export default function App() {
  return (
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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PlayerProvider>
  )
}
