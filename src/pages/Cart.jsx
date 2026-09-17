import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineMinus, HiOutlinePlus } from 'react-icons/hi'
import { useStore } from '../context/StoreContext'
import { formatPrice } from '../data/products'

export default function Cart() {
  const { cart, updateQty, removeFromCart, cartTotal, clearCart } = useStore()
  const [placed, setPlaced] = useState(false)

  const checkout = () => {
    setPlaced(true)
    clearCart()
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">Thank you.</h1>
        <p className="mt-4 text-mute">Your demo order is confirmed. No payment was processed.</p>
        <Link to="/" className="mt-8 inline-block rounded-full bg-apple px-6 py-3 text-sm text-white">
          Continue shopping
        </Link>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">Your bag is empty.</h1>
        <p className="mt-3 text-mute">Free shipping and returns on every order.</p>
        <Link to="/" className="mt-8 inline-block rounded-full bg-apple px-6 py-3 text-sm text-white">
          Shop now
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[980px] px-5 py-12 md:py-16">
      <h1 className="text-4xl font-semibold tracking-tight">Review your bag.</h1>
      <p className="mt-2 text-mute">Free delivery and free returns.</p>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
        <ul className="divide-y divide-line">
          {cart.map((item) => (
            <li key={item.key} className="flex flex-col gap-4 py-6 sm:flex-row">
              <img src={item.image} alt="" className="h-32 w-32 rounded-3xl object-cover bg-mist" />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link to={`/product/${item.id}`} className="text-xl font-semibold hover:underline">
                      {item.name}
                    </Link>
                    <p className="mt-1 text-sm text-mute">
                      {item.color} · {item.storage}
                    </p>
                  </div>
                  <p className="text-lg">{formatPrice(item.price * item.qty)}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-4 rounded-full border border-line px-3 py-1.5">
                    <button type="button" aria-label="Decrease" onClick={() => updateQty(item.key, item.qty - 1)}>
                      <HiOutlineMinus />
                    </button>
                    <span>{item.qty}</span>
                    <button type="button" aria-label="Increase" onClick={() => updateQty(item.key, item.qty + 1)}>
                      <HiOutlinePlus />
                    </button>
                  </div>
                  <button type="button" className="text-sm text-apple hover:underline" onClick={() => removeFromCart(item.key)}>
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <aside className="h-fit rounded-3xl bg-mist p-6">
          <h2 className="text-lg font-semibold">Order summary</h2>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-mute">Subtotal</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-mute">Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between border-t border-line pt-3 text-base font-medium">
              <span>Total</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={checkout}
            className="mt-6 w-full rounded-full bg-apple py-3 text-sm font-medium text-white transition hover:bg-apple-hover"
          >
            Check Out
          </button>
        </aside>
      </div>
    </div>
  )
}
