import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export function BrandMark({ size = 'md' }) {
  const box = size === 'lg' ? 'h-12 w-12' : 'h-9 w-9'
  const icon = size === 'lg' ? 'h-7 w-7' : 'h-5 w-5'
  return (
    <span className={`inline-flex ${box} items-center justify-center rounded-full bg-spotify text-black`}>
      <svg viewBox="0 0 24 24" className={icon} fill="currentColor" aria-hidden>
        <path d="M12 1.5A10.5 10.5 0 1 0 22.5 12 10.51 10.51 0 0 0 12 1.5Zm4.82 15.16a.66.66 0 0 1-.9.22c-2.47-1.51-5.58-1.85-9.24-1.01a.66.66 0 0 1-.29-1.28c4.02-.92 7.47-.52 10.21 1.16a.66.66 0 0 1 .22.91Zm1.29-2.86a.82.82 0 0 1-1.13.27c-2.83-1.74-7.14-2.24-10.49-1.23a.82.82 0 1 1-.48-1.57c3.85-1.16 8.58-.6 11.83 1.4a.82.82 0 0 1 .27 1.13Zm.11-2.98c-3.39-2.01-8.98-2.2-12.21-1.22a.99.99 0 0 1-.57-1.89c3.72-1.13 9.9-.91 13.8 1.41a.99.99 0 1 1-1.02 1.7Z" />
      </svg>
    </span>
  )
}

export default function AuthLayout() {
  const { user } = useAuth()
  const location = useLocation()
  if (user) {
    const to = location.state?.from?.pathname || '/'
    return <Navigate to={to} replace />
  }

  return (
    <div className="min-h-dvh bg-black text-white">
      <header className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
        <Link to="/" className="flex items-center gap-2 font-bold">
          <BrandMark />
          Spotify Music
        </Link>
      </header>
      <main className="mx-auto flex max-w-md flex-col px-5 py-10">
        <Outlet />
      </main>
    </div>
  )
}

export function ProtectedRoute({ children }) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return children
}
