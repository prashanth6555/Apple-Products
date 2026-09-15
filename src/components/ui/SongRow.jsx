import { Clock3, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { usePlayer } from '../../context/PlayerContext'
import { formatTime } from '../../utils/format'

export default function SongRow({ song, index, list, showAlbum = true, showPlays = false }) {
  const { playSong, currentSong, isPlaying, togglePlay, liked, toggleLike } = usePlayer()
  const active = currentSong?.id === song.id
  const wide = showAlbum || showPlays

  return (
    <div
      className={`group grid cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-muted transition hover:bg-white/10 ${
        wide ? 'grid-cols-[24px_minmax(0,2fr)_minmax(0,1.4fr)_80px_72px]' : 'grid-cols-[24px_minmax(0,1fr)_80px_72px]'
      }`}
      onDoubleClick={() => playSong(song, list)}
      onClick={() => {
        if (window.matchMedia('(max-width: 767px)').matches) playSong(song, list)
      }}
    >
      <div className="flex items-center justify-center text-muted">
        {active && isPlaying ? (
          <span className="flex h-4 items-end gap-0.5" aria-hidden>
            <span className="eq-bar h-3 w-0.5 bg-spotify" />
            <span className="eq-bar h-4 w-0.5 bg-spotify" />
            <span className="eq-bar h-2.5 w-0.5 bg-spotify" />
          </span>
        ) : (
          <>
            <span className="group-hover:hidden">{index + 1}</span>
            <button
              type="button"
              className="hidden text-white group-hover:block"
              aria-label={active && isPlaying ? 'Pause' : 'Play'}
              onClick={(e) => {
                e.stopPropagation()
                if (active) togglePlay()
                else playSong(song, list)
              }}
            >
              {active && isPlaying ? '❚❚' : '▶'}
            </button>
          </>
        )}
      </div>

      <div className="flex min-w-0 items-center gap-3">
        <img src={song.cover} alt="" className="h-10 w-10 shrink-0 rounded object-cover" />
        <div className="min-w-0">
          <p className={`truncate font-medium ${active ? 'text-spotify' : 'text-white'}`}>{song.title}</p>
          <Link
            to={`/artist/${song.artistId}`}
            onClick={(e) => e.stopPropagation()}
            className="truncate text-xs hover:underline"
          >
            {song.artist}
          </Link>
        </div>
      </div>

      {showAlbum ? (
        <Link
          to={`/album/${song.albumId}`}
          onClick={(e) => e.stopPropagation()}
          className="hidden truncate hover:underline md:block"
        >
          {song.album}
        </Link>
      ) : showPlays ? (
        <span className="hidden truncate tabular-nums md:block">{song.plays}</span>
      ) : null}

      <button
        type="button"
        aria-label={liked.has(song.id) ? 'Remove like' : 'Like song'}
        onClick={(e) => {
          e.stopPropagation()
          toggleLike(song.id)
        }}
        className={`justify-self-end opacity-0 transition group-hover:opacity-100 ${liked.has(song.id) ? 'text-spotify opacity-100' : 'hover:text-white'}`}
      >
        <Heart size={16} fill={liked.has(song.id) ? 'currentColor' : 'none'} />
      </button>

      <span className="justify-self-end tabular-nums">{formatTime(song.duration)}</span>
    </div>
  )
}

export function SongListHeader({ showAlbum = true }) {
  return (
    <div
      className={`mb-2 grid items-center gap-3 border-b border-white/10 px-3 pb-2 text-xs uppercase tracking-wider text-muted ${
        showAlbum ? 'grid-cols-[24px_minmax(0,2fr)_minmax(0,1.4fr)_80px_72px]' : 'grid-cols-[24px_minmax(0,1fr)_80px_72px]'
      }`}
    >
      <span className="text-center">#</span>
      <span>Title</span>
      {showAlbum ? <span className="hidden md:block">Album</span> : null}
      <span />
      <Clock3 size={14} className="justify-self-end" />
    </div>
  )
}
