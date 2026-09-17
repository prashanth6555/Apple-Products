import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useStore } from '../context/StoreContext'
import { products } from '../data/products'

export default function Wishlist() {
  const { wishlist } = useStore()
  const items = products.filter((p) => wishlist.includes(p.id))

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">No favorites yet.</h1>
        <p className="mt-3 text-mute">Tap the heart on any product to save it here.</p>
        <Link to="/" className="mt-8 inline-block rounded-full bg-apple px-6 py-3 text-sm text-white">
          Browse products
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[1200px] px-5 py-14">
      <h1 className="text-4xl font-semibold tracking-tight">Favorites</h1>
      <p className="mt-2 text-mute">{items.length} saved</p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
