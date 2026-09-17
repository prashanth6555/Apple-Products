import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineSearch, HiOutlineX } from 'react-icons/hi'
import { products, formatPrice } from '../data/products'
import { useStore } from '../context/StoreContext'

export default function SearchModal() {
  const { searchOpen, setSearchOpen } = useStore()
  const [q, setQ] = useState('')

  useEffect(() => {
    if (searchOpen) {
      setQ('')
    }
  }, [searchOpen])

  const query = q.trim()
  const results = useMemo(() => {
    if (!query) return []
    const needle = query.toLowerCase()
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(needle) ||
        p.category.includes(needle) ||
        p.tagline.toLowerCase().includes(needle),
    )
  }, [query])

  if (!searchOpen) return null

  const close = () => setSearchOpen(false)

  return (
    <div className="fixed inset-0 z-[80]">
      <button type="button" className="absolute inset-0 bg-black/55 animate-fade-in" onClick={close} aria-label="Close search" />
      <div className="relative mx-auto mt-12 w-[min(760px,calc(100%-1.5rem))] overflow-hidden rounded-3xl bg-white shadow-2xl animate-scale-in">
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <HiOutlineSearch className="text-xl text-mute" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search iPhone, Mac, Watch..."
            className="h-12 w-full bg-transparent text-base outline-none"
          />
          {q && (
            <button type="button" onClick={() => setQ('')} className="text-xs text-mute hover:text-ink">
              Clear
            </button>
          )}
          <button type="button" onClick={close} aria-label="Close" className="rounded-full p-2 hover:bg-mist">
            <HiOutlineX />
          </button>
        </div>

        {!query && (
          <div className="flex flex-col items-center px-6 py-12 text-center">
            <div className="relative mb-5 h-28 w-40">
              <img
                src="/images/iphone-16-pro-front.png"
                alt=""
                className="animate-search-bounce absolute left-6 top-0 h-28 w-auto drop-shadow-lg"
              />
              <span className="absolute -right-1 bottom-2 flex h-10 w-10 items-center justify-center rounded-full bg-apple text-white shadow-lg">
                <HiOutlineSearch />
              </span>
            </div>
            <p className="text-lg font-medium">Start typing to search</p>
            <p className="mt-1 max-w-sm text-sm text-mute">Results appear after you enter a product name, like iPhone, Mac, Watch, or AirPods.</p>
          </div>
        )}

        {query && results.length === 0 && (
          <div className="px-6 py-12 text-center animate-fade-up">
            <p className="text-lg font-medium">No matches for “{query}”</p>
            <p className="mt-1 text-sm text-mute">Try iPhone, iPad, Mac, Watch, or AirPods.</p>
          </div>
        )}

        {query && results.length > 0 && (
          <ul className="max-h-[62vh] space-y-1 overflow-y-auto p-3">
            {results.map((p, i) => (
              <li key={p.id} className="search-result" style={{ animationDelay: `${i * 55}ms` }}>
                <Link
                  to={`/product/${p.id}`}
                  onClick={close}
                  className="group flex items-center gap-4 rounded-2xl px-3 py-3 transition hover:bg-mist"
                >
                  <div className="shine-wrap h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-mist">
                    <img
                      src={p.colors?.[0]?.image || p.images[0]}
                      alt={p.name}
                      className="h-full w-full object-contain transition duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{p.name}</p>
                    <p className="truncate text-sm text-mute">{p.tagline}</p>
                  </div>
                  <p className="text-sm">{formatPrice(p.price)}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
