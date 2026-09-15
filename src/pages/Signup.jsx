import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BrandMark } from '../components/layout/AuthLayout'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  function onSubmit(e) {
    e.preventDefault()
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    const result = signup({ name, email, password })
    if (!result.ok) {
      setError(result.error)
      return
    }
    navigate('/', { replace: true })
  }

  return (
    <div className="page-enter">
      <div className="mb-8 flex flex-col items-center text-center">
        <BrandMark size="lg" />
        <h1 className="mt-5 text-3xl font-extrabold tracking-tight">Sign up to start listening</h1>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {error ? (
          <p className="rounded-md bg-red-500/15 px-3 py-2 text-sm text-red-300" role="alert">
            {error}
          </p>
        ) : null}

        <label className="block text-sm font-semibold">
          Display name
          <input
            type="text"
            required
            minLength={2}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-md border border-white/15 bg-white/5 px-3 py-3 text-sm outline-none focus:border-white"
            placeholder="Your name"
          />
        </label>

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
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-md border border-white/15 bg-white/5 px-3 py-3 text-sm outline-none focus:border-white"
            placeholder="Create a password"
          />
        </label>

        <label className="block text-sm font-semibold">
          Confirm password
          <input
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="mt-2 w-full rounded-md border border-white/15 bg-white/5 px-3 py-3 text-sm outline-none focus:border-white"
            placeholder="Repeat password"
          />
        </label>

        <button
          type="submit"
          className="w-full rounded-full bg-spotify py-3 text-sm font-bold text-black transition hover:scale-[1.02] hover:bg-spotify-hover"
        >
          Sign up
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-muted">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-white underline hover:text-spotify">
          Log in
        </Link>
      </p>
    </div>
  )
}
