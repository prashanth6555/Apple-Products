import { ChevronLeft, ChevronRight, Menu, Search, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function TopBar({ onMenu }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [query, setQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
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

      <form onSubmit={onSubmit} className={`relative flex-1 ${isSearch ? 'max-w-xl' : 'max-w-md'}`}>
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

      <button
        type="button"
        className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-white"
        aria-label="Account"
      >
        <User size={16} />
      </button>
    </header>
  )
}
