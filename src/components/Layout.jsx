import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import CartDrawer from './CartDrawer'
import SearchModal from './SearchModal'
import Toast from './Toast'

export default function Layout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main key={location.pathname} className="page-enter flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <SearchModal />
      <Toast />
    </div>
  )
}
