import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineHeart, HiHeart } from 'react-icons/hi'
import { formatPrice } from '../data/products'
import { useStore } from '../context/StoreContext'

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist } = useStore()
  const [color, setColor] = useState(product.colors[0].name)
  const liked = wishlist.includes(product.id)
  const displayImage = useMemo(() => {
    const match = product.colors.find((c) => c.name === color)
    return match?.image || product.images[0]
  }, [color, product])

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-mist p-5 transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_rgba(0,0,0,0.12)]">
      <button
        type="button"
        aria-label={liked ? 'Remove from favorites' : 'Save to favorites'}
        onClick={() => toggleWishlist(product.id)}
        className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 text-lg text-ink shadow-sm backdrop-blur transition hover:scale-110"
      >
        {liked ? <HiHeart className="text-red-500" /> : <HiOutlineHeart />}
      </button>
      {product.isNew && (
        <span className="absolute left-5 top-5 z-10 text-[12px] font-medium text-orange-600">New</span>
      )}
      <Link to={`/product/${product.id}`} className="flex flex-1 flex-col">
        <div className="shine-wrap relative mx-auto mb-4 aspect-square w-full max-w-[260px] overflow-hidden rounded-2xl bg-white/40">
          <img
            src={displayImage}
            alt={product.name}
            className="h-full w-full object-contain object-center transition duration-700 group-hover:scale-110"
          />
        </div>
        <h3 className="text-xl font-semibold tracking-tight">{product.name}</h3>
        <p className="mt-1 text-sm text-mute">{product.tagline}</p>
        <p className="mt-3 text-[15px]">From {formatPrice(product.price)}</p>
      </Link>
      <div className="mt-4 flex items-center gap-2">
        {product.colors.map((c) => (
          <button
            key={c.name}
            type="button"
            aria-label={c.name}
            onClick={() => setColor(c.name)}
            className={`h-3.5 w-3.5 rounded-full ring-offset-2 transition hover:scale-125 ${
              color === c.name ? 'ring-2 ring-ink' : 'ring-0'
            }`}
            style={{ backgroundColor: c.hex }}
          />
        ))}
      </div>
      <div className="mt-5 flex gap-2">
        <Link
          to={`/product/${product.id}`}
          className="flex-1 rounded-full border border-line py-2 text-center text-sm font-medium transition hover:bg-white"
        >
          Learn more
        </Link>
        <button
          type="button"
          onClick={() => addToCart(product, { color })}
          className="flex-1 rounded-full bg-apple py-2 text-sm font-medium text-white transition hover:scale-[1.02] hover:bg-apple-hover"
        >
          Add to Bag
        </button>
      </div>
    </article>
  )
}
