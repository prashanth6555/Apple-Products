import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { HiHeart, HiOutlineHeart } from 'react-icons/hi'
import { getProductById, getProductsByCategory, formatPrice } from '../data/products'
import { useStore } from '../context/StoreContext'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'

export default function ProductDetails() {
  const { id } = useParams()
  const product = getProductById(id)
  const navigate = useNavigate()
  const { addToCart, toggleWishlist, wishlist } = useStore()
  const [activeImage, setActiveImage] = useState(0)
  const [color, setColor] = useState(product?.colors?.[0]?.name)
  const [storage, setStorage] = useState(product?.storage?.[0])

  useEffect(() => {
    if (!product) return
    setActiveImage(0)
    setColor(product.colors[0].name)
    setStorage(product.storage[0])
  }, [product])

  const gallery = useMemo(() => {
    if (!product) return []
    const colorImage = product.colors.find((c) => c.name === color)?.image
    const unique = [colorImage, ...product.images].filter(Boolean)
    return [...new Set(unique)]
  }, [product, color])

  const related = useMemo(() => {
    if (!product) return []
    return getProductsByCategory(product.category).filter((p) => p.id !== product.id).slice(0, 3)
  }, [product])

  if (!product) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="text-3xl font-semibold">Product not found</h1>
        <Link to="/" className="mt-4 inline-block text-apple">
          Back to store
        </Link>
      </div>
    )
  }

  const liked = wishlist.includes(product.id)
  const price = storage?.price ?? product.price

  const buyNow = () => {
    addToCart(product, { color, storage: storage?.size, price, qty: 1 })
    navigate('/cart')
  }

  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-10 lg:grid-cols-2 lg:py-16">
        <div>
          <div className="shine-wrap overflow-hidden rounded-[2rem] bg-mist">
            <img
              src={gallery[activeImage] || product.images[0]}
              alt={product.name}
              className="h-[52vh] w-full object-contain transition duration-500 hover:scale-110 md:h-[62vh]"
            />
          </div>
          <div className="mt-4 flex gap-3 overflow-x-auto no-scrollbar">
            {gallery.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActiveImage(i)}
                className={`h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 transition hover:scale-105 ${
                  activeImage === i ? 'border-ink' : 'border-transparent'
                }`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          {product.isNew && <p className="text-sm font-medium text-orange-600">New</p>}
          <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">{product.name}</h1>
          <p className="mt-3 text-lg text-mute">{product.tagline}</p>
          <p className="mt-6 text-2xl">{formatPrice(price)}</p>
          <p className="mt-4 leading-relaxed text-mute">{product.description}</p>

          <div className="mt-8">
            <p className="mb-3 text-sm font-medium">Color — {color}</p>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => {
                    setColor(c.name)
                    setActiveImage(0)
                  }}
                  className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition ${
                    color === c.name ? 'border-ink' : 'border-line hover:border-ink/40'
                  }`}
                >
                  <span className="h-4 w-4 rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="mb-3 text-sm font-medium">
              {product.category === 'watch' ? 'Size' : 'Storage'}
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {product.storage.map((s) => (
                <button
                  key={s.size}
                  type="button"
                  onClick={() => setStorage(s)}
                  className={`rounded-2xl border px-3 py-4 text-center transition ${
                    storage?.size === s.size ? 'border-apple bg-blue-50' : 'border-line hover:border-ink/40'
                  }`}
                >
                  <span className="block font-medium">{s.size}</span>
                  <span className="mt-1 block text-xs text-mute">{formatPrice(s.price)}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => addToCart(product, { color, storage: storage.size, price })}
              className="flex-1 rounded-full bg-apple py-3.5 text-sm font-medium text-white transition hover:bg-apple-hover"
            >
              Add to Bag
            </button>
            <button
              type="button"
              onClick={buyNow}
              className="flex-1 rounded-full border border-ink py-3.5 text-sm font-medium transition hover:bg-mist"
            >
              Buy Now
            </button>
            <button
              type="button"
              aria-label="Favorite"
              onClick={() => toggleWishlist(product.id)}
              className="rounded-full border border-line px-4 py-3.5 text-xl transition hover:bg-mist"
            >
              {liked ? <HiHeart className="text-red-500" /> : <HiOutlineHeart />}
            </button>
          </div>
        </div>
      </div>

      <section className="bg-mist py-16">
        <div className="mx-auto max-w-[980px] px-5">
          <Reveal>
            <h2 className="mb-8 text-3xl font-semibold tracking-tight">Tech specs</h2>
          </Reveal>
          <div className="overflow-hidden rounded-3xl bg-white">
            {product.specs.map((spec, i) => (
              <div key={spec.label} className={`grid grid-cols-1 gap-1 px-6 py-5 sm:grid-cols-3 ${i ? 'border-t border-line' : ''}`}>
                <p className="font-medium">{spec.label}</p>
                <p className="text-mute sm:col-span-2">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-[1200px] px-5 py-16">
          <h2 className="mb-8 text-3xl font-semibold tracking-tight">You may also like</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
