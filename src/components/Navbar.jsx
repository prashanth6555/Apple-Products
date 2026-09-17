import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FaApple } from 'react-icons/fa'
import { HiOutlineSearch, HiOutlineShoppingBag, HiOutlineHeart, HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import { useStore } from '../context/StoreContext'

const links = [
  { to: '/', label: 'Store' },
  { to: '/iphone', label: 'iPhone' },
  { to: '/ipad', label: 'iPad' },
  { to: '/mac', label: 'Mac' },
  { to: '/watch', label: 'Watch' },
  { to: '/airpods', label: 'AirPods' },
]

export default function Navbar() {
  const { cartCount, setCartOpen, setSearchOpen, wishlist } = useStore()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'bg-black/90 backdrop-blur-xl' : 'bg-black/80 backdrop-blur-md'
      }`}
    >
      <nav className="mx-auto flex h-12 max-w-[1400px] items-center justify-between px-4 text-[12px] text-white/90 md:h-11 md:px-8">
        <Link to="/" aria-label="Apple Store home" className="text-[18px] transition hover:text-white">
          <FaApple />
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `tracking-wide transition hover:text-white ${isActive ? 'text-white' : 'text-white/80'}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 text-[18px]">
          <button type="button" aria-label="Search" className="transition hover:text-white" onClick={() => setSearchOpen(true)}>
            <HiOutlineSearch />
          </button>
          <Link to="/wishlist" aria-label="Favorites" className="relative hidden transition hover:text-white sm:inline-flex">
            <HiOutlineHeart />
            {wishlist.length > 0 && (
              <span className="absolute -right-2 -top-1.5 min-w-4 rounded-full bg-apple px-1 text-center text-[9px] font-semibold leading-4 text-white">
                {wishlist.length}
              </span>
            )}
          </Link>
          <button type="button" aria-label="Bag" className="relative transition hover:text-white" onClick={() => setCartOpen(true)}>
            <HiOutlineShoppingBag />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-1.5 min-w-4 rounded-full bg-apple px-1 text-center text-[9px] font-semibold leading-4 text-white">
                {cartCount}
              </span>
            )}
          </button>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <HiOutlineX /> : <HiOutlineMenu />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="animate-nav-in border-t border-white/10 bg-black md:hidden">
          <ul className="flex flex-col gap-1 px-5 py-6 text-[28px] font-semibold leading-tight text-white">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === '/'}>
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <Link to="/wishlist" className="text-white/80">
                Favorites
              </Link>
            </li>
            <li>
              <Link to="/cart" className="text-white/80">
                Bag
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
