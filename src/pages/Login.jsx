import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BrandMark } from '../components/layout/AuthLayout'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function onSubmit(e) {
    e.preventDefault()
    const result = login(email, password)
    if (!result.ok) {
      setError(result.error)
      return
    }
    navigate(location.state?.from?.pathname || '/', { replace: true })
  }

  return (
    <div className="page-enter">
      <div className="mb-8 flex flex-col items-center text-center">
        <BrandMark size="lg" />
        <h1 className="mt-5 text-3xl font-extrabold tracking-tight">Log in to Spotify Music</h1>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {error ? (
          <p className="rounded-md bg-red-500/15 px-3 py-2 text-sm text-red-300" role="alert">
            {error}
          </p>
        ) : null}

        <label className="block text-sm font-semibold">
          Email
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-md border border-white/15 bg-white/5 px-3 py-3 text-sm outline-none focus:border-white"
            placeholder="name@domain.com"
          />
        </label>

        <label className="block text-sm font-semibold">
          Password
          <input
            type="password"
            required
            minLength={6}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-md border border-white/15 bg-white/5 px-3 py-3 text-sm outline-none focus:border-white"
            placeholder="Your password"
          />
        </label>

        <button
          type="submit"
          className="w-full rounded-full bg-spotify py-3 text-sm font-bold text-black transition hover:scale-[1.02] hover:bg-spotify-hover"
        >
          Log in
        </button>
      </form>

      <p className="mt-6 rounded-lg bg-white/5 p-3 text-center text-xs text-muted">
        Demo account: <span className="text-white">demo@spotify.music</span> /{' '}
        <span className="text-white">demo1234</span>
      </p>

      <p className="mt-8 text-center text-sm text-muted">
        Don&apos;t have an account?{' '}
        <Link to="/signup" className="font-semibold text-white underline hover:text-spotify">
          Sign up
        </Link>
      </p>
    </div>
  )
}
