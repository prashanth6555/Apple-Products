import { Link } from 'react-router-dom'
import MediaCard from '../components/ui/MediaCard'
import { usePlayer } from '../context/PlayerContext'
import { getSongsByIds, playlists } from '../data/music'

export default function Library() {
  const { likedSongs } = usePlayer()

  return (
    <div className="page-enter">
      <h1 className="mb-6 text-2xl font-bold md:text-3xl">Your Library</h1>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
        <Link
          to="/liked"
          className="col-span-2 flex min-h-40 flex-col justify-end rounded-lg bg-gradient-to-br from-indigo-700 to-violet-300 p-5 transition hover:scale-[1.01]"
        >
          <p className="line-clamp-2 text-sm text-white/90">
            {likedSongs.length ? likedSongs.map((s) => s.title).join(' • ') : 'Songs you like will live here'}
          </p>
          <h2 className="mt-4 text-2xl font-bold">Liked Songs</h2>
          <p className="text-sm text-white/80">{likedSongs.length} liked songs</p>
        </Link>
        {playlists.map((p) => (
          <MediaCard
            key={p.id}
            to={`/playlist/${p.id}`}
            image={p.cover}
            title={p.title}
            subtitle={`Playlist • ${p.owner}`}
            songs={getSongsByIds(p.songIds)}
          />
        ))}
      </div>
    </div>
  )
}
