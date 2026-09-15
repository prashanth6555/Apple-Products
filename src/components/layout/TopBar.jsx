import { ChevronLeft, ChevronRight, LogOut, Menu, Search, User } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { initials, useAuth } from '../../context/AuthContext'

export default function TopBar({ onMenu }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  const [query, setQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const isSearch = location.pathname.startsWith('/search')

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setQuery(params.get('q') || '')
  }, [location.search])

  useEffect(() => {
    const el = document.getElementById('main-scroll')
    if (!el) return
    const onScroll = () => setScrolled(el.scrollTop > 12)
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function onClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  function onSubmit(e) {
    e.preventDefault()
    navigate(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <header
      className={`sticky top-0 z-20 flex items-center gap-3 px-4 py-3 transition md:px-6 ${
        scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <button
        type="button"
        className="rounded-full bg-black/50 p-2 lg:hidden"
        aria-label="Open menu"
        onClick={onMenu}
      >
        <Menu size={20} />
      </button>

      <div className="hidden items-center gap-2 sm:flex">
        <button
          type="button"
          aria-label="Go back"
          onClick={() => navigate(-1)}
          className="rounded-full bg-black/60 p-1.5 text-muted hover:text-white"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          aria-label="Go forward"
          onClick={() => navigate(1)}
          className="rounded-full bg-black/60 p-1.5 text-muted hover:text-white"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      <form onSubmit={onSubmit} className={`relative min-w-0 flex-1 ${isSearch ? 'max-w-xl' : 'max-w-md'}`}>
        <Search size={18} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            if (location.pathname.startsWith('/search')) {
              navigate(`/search?q=${encodeURIComponent(e.target.value)}`, { replace: true })
            }
          }}
          onFocus={() => {
            if (!location.pathname.startsWith('/search')) navigate('/search')
          }}
          placeholder="What do you want to play?"
          className="w-full rounded-full bg-white/10 py-2.5 pr-4 pl-10 text-sm outline-none ring-0 transition placeholder:text-muted focus:bg-white/15 focus:ring-2 focus:ring-white"
        />
      </form>

      <div className="ml-auto flex shrink-0 items-center gap-2">
        {user ? (
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              aria-label="Account menu"
              onClick={() => setMenuOpen((o) => !o)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-xs font-bold ring-2 ring-black hover:scale-105"
            >
              {initials(user.name)}
            </button>
            {menuOpen ? (
              <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-md bg-zinc-800 py-1 text-sm shadow-xl">
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 hover:bg-white/10"
                >
                  <User size={16} />
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false)
                    logout()
                    navigate('/login')
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-left hover:bg-white/10"
                >
                  <LogOut size={16} />
                  Log out
                </button>
              </div>
            ) : null}
          </div>
        ) : (
          <>
            <Link to="/signup" className="hidden px-3 py-2 text-sm font-bold text-muted hover:text-white sm:inline">
              Sign up
            </Link>
            <Link
              to="/login"
              className="rounded-full bg-white px-4 py-2 text-sm font-bold text-black transition hover:scale-105"
            >
              Log in
            </Link>
          </>
        )}
      </div>
    </header>
  )
}
