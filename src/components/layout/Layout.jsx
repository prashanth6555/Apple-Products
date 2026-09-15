import { Home, Library, Search } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { useState } from 'react'
import Player from '../player/Player'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

const mobileLink = ({ isActive }) =>
  `flex flex-col items-center gap-1 text-[10px] ${isActive ? 'text-white' : 'text-muted'}`

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-black text-white">
      <div className="flex min-h-0 flex-1">
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
        <div className="flex min-w-0 flex-1 flex-col p-0 lg:pr-2 lg:pt-2">
          <div
            id="main-scroll"
            className="relative min-h-0 flex-1 overflow-y-auto rounded-none bg-gradient-to-b from-zinc-800/80 to-surface lg:rounded-lg"
          >
            <TopBar onMenu={() => setMenuOpen(true)} />
            <div className="px-4 pb-32 md:px-6">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <Player />
      <nav className="grid grid-cols-3 border-t border-white/10 bg-black py-2 lg:hidden">
        <NavLink to="/" end className={mobileLink}>
          <Home size={20} />
          Home
        </NavLink>
        <NavLink to="/search" className={mobileLink}>
          <Search size={20} />
          Search
        </NavLink>
        <NavLink to="/library" className={mobileLink}>
          <Library size={20} />
          Library
        </NavLink>
      </nav>
    </div>
  )
}
