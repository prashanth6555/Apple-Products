import { Link } from 'react-router-dom'
import { HiOutlineMinus, HiOutlinePlus, HiOutlineX } from 'react-icons/hi'
import { useStore } from '../context/StoreContext'
import { formatPrice } from '../data/products'

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQty, removeFromCart, cartTotal } = useStore()

  if (!cartOpen) return null

  return (
    <div className="fixed inset-0 z-[70]">
      <button type="button" className="absolute inset-0 bg-black/40 animate-fade-in" onClick={() => setCartOpen(false)} aria-label="Close bag" />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl animate-slide-right">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="text-lg font-semibold">Your Bag</h2>
          <button type="button" onClick={() => setCartOpen(false)} aria-label="Close" className="rounded-full p-2 hover:bg-mist">
            <HiOutlineX className="text-xl" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="text-lg font-medium">Your bag is empty.</p>
              <p className="mt-1 text-sm text-mute">Explore iPhone, Mac, Watch, and more.</p>
              <Link
                to="/"
                onClick={() => setCartOpen(false)}
                className="mt-6 rounded-full bg-apple px-5 py-2 text-sm text-white"
              >
                Continue shopping
              </Link>
            </div>
          ) : (
            <ul className="space-y-5">
              {cart.map((item) => (
                <li key={item.key} className="flex gap-4">
                  <img src={item.image} alt="" className="h-20 w-20 rounded-2xl object-cover bg-mist" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-mute">
                          {item.color} · {item.storage}
                        </p>
                      </div>
                      <p className="text-sm">{formatPrice(item.price * item.qty)}</p>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-3 rounded-full border border-line px-2 py-1">
                        <button type="button" aria-label="Decrease" onClick={() => updateQty(item.key, item.qty - 1)}>
                          <HiOutlineMinus />
                        </button>
                        <span className="w-4 text-center text-sm">{item.qty}</span>
                        <button type="button" aria-label="Increase" onClick={() => updateQty(item.key, item.qty + 1)}>
                          <HiOutlinePlus />
                        </button>
                      </div>
                      <button type="button" className="text-xs text-mute hover:text-ink" onClick={() => removeFromCart(item.key)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {cart.length > 0 && (
          <div className="border-t border-line px-5 py-4">
            <div className="mb-3 flex justify-between text-sm">
              <span className="text-mute">Subtotal</span>
              <span className="font-medium">{formatPrice(cartTotal)}</span>
            </div>
            <Link
              to="/cart"
              onClick={() => setCartOpen(false)}
              className="block rounded-full bg-apple py-3 text-center text-sm font-medium text-white transition hover:bg-apple-hover"
            >
              Review bag & checkout
            </Link>
          </div>
        )}
      </aside>
    </div>
  )
}
