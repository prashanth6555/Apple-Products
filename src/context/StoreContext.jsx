import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const StoreContext = createContext(null)

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => load('apple-cart', []))
  const [wishlist, setWishlist] = useState(() => load('apple-wishlist', []))
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    localStorage.setItem('apple-cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('apple-wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  useEffect(() => {
    if (!toast) return undefined
    const t = setTimeout(() => setToast(null), 2400)
    return () => clearTimeout(t)
  }, [toast])

  const notify = (message) => setToast(message)

  const addToCart = (product, options = {}) => {
    const color = options.color || product.colors[0].name
    const storage = options.storage || product.storage[0].size
    const price = options.price || product.storage.find((s) => s.size === storage)?.price || product.price
    const qty = options.qty || 1
    const key = `${product.id}__${color}__${storage}`
    const image = product.colors.find((c) => c.name === color)?.image || product.images[0]

    setCart((prev) => {
      const existing = prev.find((item) => item.key === key)
      if (existing) {
        return prev.map((item) => (item.key === key ? { ...item, qty: item.qty + qty } : item))
      }
      return [
        ...prev,
        {
          key,
          id: product.id,
          name: product.name,
          image,
          color,
          storage,
          price,
          qty,
        },
      ]
    })
    setCartOpen(true)
    notify(`${product.name} added to bag`)
  }

  const updateQty = (key, qty) => {
    setCart((prev) => prev.map((item) => (item.key === key ? { ...item, qty: Math.max(1, qty) } : item)))
  }

  const removeFromCart = (key) => {
    setCart((prev) => prev.filter((item) => item.key !== key))
  }

  const clearCart = () => setCart([])

  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      if (prev.includes(id)) {
        notify('Removed from favorites')
        return prev.filter((x) => x !== id)
      }
      notify('Saved to favorites')
      return [...prev, id]
    })
  }

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      cartOpen,
      setCartOpen,
      searchOpen,
      setSearchOpen,
      toast,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      toggleWishlist,
      cartCount,
      cartTotal,
    }),
    [cart, wishlist, cartOpen, searchOpen, toast, cartCount, cartTotal],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export const useStore = () => {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
