import { Clock3 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import PlayButton from '../components/ui/PlayButton'
import SongRow, { SongListHeader } from '../components/ui/SongRow'
import { usePlayer } from '../context/PlayerContext'
import { albums, getPlaylist, getSongsByIds, songs } from '../data/music'
import { formatTime } from '../utils/format'

export default function PlaylistPage({ kind = 'playlist' }) {
  const { id } = useParams()
  const { playCollection, currentSong, isPlaying, togglePlay } = usePlayer()

  const playlist = kind === 'album' ? albums.find((a) => a.id === id) : getPlaylist(id)
  const list =
    kind === 'album' ? songs.filter((s) => s.albumId === id) : getSongsByIds(playlist?.songIds || [])

  if (!playlist) {
    return <p className="page-enter text-muted">This collection could not be found.</p>
  }

  const total = list.reduce((sum, s) => sum + s.duration, 0)
  const isCurrent = list.some((s) => s.id === currentSong?.id)
  const color = playlist.color || '#1e3a8a'

  return (
    <div className="page-enter">
      <div className="-mx-4 -mt-3 md:-mx-6">
        <div
          className="flex flex-col gap-6 px-4 pt-6 pb-8 md:flex-row md:items-end md:px-6"
          style={{ background: `linear-gradient(180deg, ${color} 0%, #121212 100%)` }}
        >
          <img
            src={playlist.cover}
            alt={playlist.title}
            className="h-28 w-28 rounded shadow-2xl shadow-black/50 sm:h-44 sm:w-44 md:h-56 md:w-56"
          />
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase">{kind === 'album' ? 'Album' : 'Playlist'}</p>
            <h1 className="mt-2 text-4xl font-extrabold md:text-6xl">{playlist.title}</h1>
            <p className="mt-3 max-w-2xl text-sm text-white/80">{playlist.description || `${playlist.artist} • ${playlist.year}`}</p>
            <p className="mt-2 text-sm text-white/70">
              {playlist.owner || playlist.artist} • {list.length} songs • {formatTime(total)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 py-6">
        <PlayButton
          size="lg"
          playing={isCurrent && isPlaying}
          onClick={() => (isCurrent ? togglePlay() : playCollection(list))}
        />
        <Link to="/" className="text-sm font-semibold text-muted hover:text-white">
          More like this
        </Link>
      </div>

      <SongListHeader />
      {list.map((song, i) => (
        <SongRow key={song.id} song={song} index={i} list={list} />
      ))}
      {!list.length ? (
        <p className="flex items-center gap-2 px-3 py-8 text-muted">
          <Clock3 size={16} /> No tracks yet.
        </p>
      ) : null}
    </div>
  )
}
