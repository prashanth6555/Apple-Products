import { Camera, LogOut } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MediaCard from '../components/ui/MediaCard'
import SongRow, { SongListHeader } from '../components/ui/SongRow'
import { initials, useAuth } from '../context/AuthContext'
import { usePlayer } from '../context/PlayerContext'
import { getSongsByIds, playlists } from '../data/music'

export default function Profile() {
  const { user, updateProfile, logout } = useAuth()
  const { likedSongs, following } = usePlayer()
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    name: user.name,
    bio: user.bio || '',
    country: user.country || '',
    plan: user.plan || 'Free',
  })
  const [saved, setSaved] = useState(false)

  function onSave(e) {
    e.preventDefault()
    const result = updateProfile({
      name: form.name.trim(),
      bio: form.bio.trim(),
      country: form.country.trim(),
      plan: form.plan,
    })
    if (result.ok) {
      setEditing(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 2200)
    }
  }

  function onLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  const joined = new Date(user.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
  })

  return (
    <div className="page-enter">
      <div className="-mx-4 -mt-3 bg-gradient-to-b from-emerald-900/80 to-surface px-4 pt-10 pb-8 md:-mx-6 md:px-6">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end">
          <div className="relative">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-zinc-800 text-4xl font-bold shadow-2xl ring-4 ring-black/40 md:h-44 md:w-44 md:text-5xl">
              {initials(user.name)}
            </div>
            <span className="absolute right-1 bottom-1 flex h-9 w-9 items-center justify-center rounded-full bg-black text-muted">
              <Camera size={16} />
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase">Profile</p>
            <h1 className="mt-1 text-4xl font-extrabold md:text-6xl">{user.name}</h1>
            <p className="mt-3 text-sm text-white/80">
              {playlists.length} public playlists • {following.size} following • {likedSongs.length} liked songs
            </p>
            <span className="mt-3 inline-flex rounded-full bg-spotify px-3 py-1 text-xs font-bold text-black">
              {user.plan} plan
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 py-6">
        <button
          type="button"
          onClick={() => {
            setForm({
              name: user.name,
              bio: user.bio || '',
              country: user.country || '',
              plan: user.plan || 'Free',
            })
            setEditing((v) => !v)
          }}
          className="rounded-full border border-white/30 px-5 py-2 text-sm font-bold hover:border-white"
        >
          {editing ? 'Cancel' : 'Edit profile'}
        </button>
        <button
          type="button"
          onClick={onLogout}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-muted hover:text-white"
        >
          <LogOut size={16} />
          Log out
        </button>
        {saved ? <span className="self-center text-sm text-spotify">Profile saved</span> : null}
      </div>

      {editing ? (
        <form onSubmit={onSave} className="mb-10 max-w-xl space-y-4 rounded-xl bg-white/5 p-5">
          <label className="block text-sm font-semibold">
            Display name
            <input
              required
              minLength={2}
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="mt-2 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2.5 text-sm outline-none focus:border-white"
            />
          </label>
          <label className="block text-sm font-semibold">
            Bio
            <textarea
              rows={3}
              value={form.bio}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
              className="mt-2 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2.5 text-sm outline-none focus:border-white"
              placeholder="Tell people a little about your music taste"
            />
          </label>
          <label className="block text-sm font-semibold">
            Country
            <input
              value={form.country}
              onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
              className="mt-2 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2.5 text-sm outline-none focus:border-white"
              placeholder="Where you listen from"
            />
          </label>
          <label className="block text-sm font-semibold">
            Plan
            <select
              value={form.plan}
              onChange={(e) => setForm((f) => ({ ...f, plan: e.target.value }))}
              className="mt-2 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2.5 text-sm outline-none focus:border-white"
            >
              <option>Free</option>
              <option>Premium</option>
            </select>
          </label>
          <button
            type="submit"
            className="rounded-full bg-white px-6 py-2 text-sm font-bold text-black hover:scale-105"
          >
            Save
          </button>
        </form>
      ) : (
        <section className="mb-10 max-w-2xl">
          <h2 className="mb-2 text-xl font-bold">About</h2>
          <p className="text-sm leading-relaxed text-white/80">
            {user.bio || 'No bio yet. Edit your profile to add one.'}
          </p>
          <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
            <div className="rounded-lg bg-white/5 p-3">
              <dt className="text-muted">Email</dt>
              <dd className="mt-1 font-medium">{user.email}</dd>
            </div>
            <div className="rounded-lg bg-white/5 p-3">
              <dt className="text-muted">Country</dt>
              <dd className="mt-1 font-medium">{user.country || 'Not set'}</dd>
            </div>
            <div className="rounded-lg bg-white/5 p-3">
              <dt className="text-muted">Member since</dt>
              <dd className="mt-1 font-medium">{joined}</dd>
            </div>
            <div className="rounded-lg bg-white/5 p-3">
              <dt className="text-muted">Account</dt>
              <dd className="mt-1 font-medium">{user.plan}</dd>
            </div>
          </dl>
        </section>
      )}

      <section className="mb-10">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xl font-bold">Liked songs</h2>
          <Link to="/liked" className="text-sm font-semibold text-muted hover:text-white">
            Show all
          </Link>
        </div>
        {likedSongs.length ? (
          <>
            <SongListHeader />
            {likedSongs.slice(0, 5).map((song, i) => (
              <SongRow key={song.id} song={song} index={i} list={likedSongs} />
            ))}
          </>
        ) : (
          <p className="text-sm text-muted">Like songs and they will show up here.</p>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">Public playlists</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {playlists.slice(0, 5).map((p) => (
            <MediaCard
              key={p.id}
              to={`/playlist/${p.id}`}
              image={p.cover}
              title={p.title}
              subtitle={`Playlist • ${user.name}`}
              songs={getSongsByIds(p.songIds)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
