import {
  Heart,
  Home,
  Library,
  Plus,
  Search,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { playlists } from '../../data/music'

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold transition ${
    isActive ? 'bg-white/10 text-white' : 'text-muted hover:text-white'
  }`

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          aria-label="Close menu"
          onClick={onClose}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col gap-2 bg-black p-2 transition-transform duration-300 lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="rounded-lg bg-elevated px-3 py-4">
          <div className="mb-5 flex items-center gap-2 px-1">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-spotify text-black">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                <path d="M12 1.5A10.5 10.5 0 1 0 22.5 12 10.51 10.51 0 0 0 12 1.5Zm4.82 15.16a.66.66 0 0 1-.9.22c-2.47-1.51-5.58-1.85-9.24-1.01a.66.66 0 0 1-.29-1.28c4.02-.92 7.47-.52 10.21 1.16a.66.66 0 0 1 .22.91Zm1.29-2.86a.82.82 0 0 1-1.13.27c-2.83-1.74-7.14-2.24-10.49-1.23a.82.82 0 1 1-.48-1.57c3.85-1.16 8.58-.6 11.83 1.4a.82.82 0 0 1 .27 1.13Zm.11-2.98c-3.39-2.01-8.98-2.2-12.21-1.22a.99.99 0 0 1-.57-1.89c3.72-1.13 9.9-.91 13.8 1.41a.99.99 0 1 1-1.02 1.7Z" />
              </svg>
            </span>
            <span className="text-lg font-bold">Spotify Music</span>
          </div>
          <nav className="flex flex-col gap-1">
            <NavLink to="/" end className={linkClass} onClick={onClose}>
              <Home size={22} />
              Home
            </NavLink>
            <NavLink to="/search" className={linkClass} onClick={onClose}>
              <Search size={22} />
              Search
            </NavLink>
            <NavLink to="/library" className={linkClass} onClick={onClose}>
              <Library size={22} />
              Your Library
            </NavLink>
          </nav>
        </div>

        <div className="flex min-h-0 flex-1 flex-col rounded-lg bg-elevated p-2">
          <div className="mb-2 flex items-center justify-between px-3 py-2 text-muted">
            <p className="text-sm font-semibold">Playlists</p>
            <Plus size={18} />
          </div>
          <NavLink
            to="/liked"
            onClick={onClose}
            className={({ isActive }) =>
              `mb-1 flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                isActive ? 'bg-white/10 text-white' : 'text-muted hover:text-white'
              }`
            }
          >
            <span className="flex h-10 w-10 items-center justify-center rounded bg-gradient-to-br from-indigo-500 to-white text-violet-900">
              <Heart size={16} fill="currentColor" />
            </span>
            Liked Songs
          </NavLink>
          <div className="overflow-y-auto pb-24 lg:pb-2">
            {playlists.map((p) => (
              <NavLink
                key={p.id}
                to={`/playlist/${p.id}`}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-2 text-sm ${
                    isActive ? 'bg-white/10 text-white' : 'text-muted hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <img src={p.cover} alt="" className="h-10 w-10 rounded object-cover" />
                <span className="truncate">{p.title}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </aside>
    </>
  )
}
