import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-5 py-24 text-center">
      <h1 className="text-5xl font-semibold tracking-tight">404</h1>
      <p className="mt-3 text-mute">This page isn’t available in the store.</p>
      <Link to="/" className="mt-8 inline-block rounded-full bg-apple px-6 py-3 text-sm text-white">
        Go home
      </Link>
    </div>
  )
}
