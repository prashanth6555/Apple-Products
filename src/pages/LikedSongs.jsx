import PlayButton from '../components/ui/PlayButton'
import SongRow, { SongListHeader } from '../components/ui/SongRow'
import { usePlayer } from '../context/PlayerContext'

export default function LikedSongs() {
  const { likedSongs, playCollection, currentSong, isPlaying, togglePlay } = usePlayer()
  const isCurrent = likedSongs.some((s) => s.id === currentSong?.id)

  return (
    <div className="page-enter">
      <div className="-mx-4 -mt-3 flex flex-col gap-6 bg-gradient-to-b from-indigo-800 to-surface px-4 pt-10 pb-8 md:-mx-6 md:flex-row md:items-end md:px-6">
        <div className="flex h-44 w-44 items-center justify-center rounded bg-gradient-to-br from-indigo-500 to-white text-6xl text-violet-900 shadow-2xl md:h-56 md:w-56">
          ♥
        </div>
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase">Playlist</p>
          <h1 className="mt-2 text-4xl font-extrabold md:text-6xl">Liked Songs</h1>
          <p className="mt-3 text-sm text-white/80">{likedSongs.length} songs</p>
        </div>
      </div>

      <div className="py-6">
        {likedSongs.length ? (
          <PlayButton
            size="lg"
            playing={isCurrent && isPlaying}
            onClick={() => (isCurrent ? togglePlay() : playCollection(likedSongs))}
          />
        ) : null}
      </div>

      {likedSongs.length ? (
        <>
          <SongListHeader />
          {likedSongs.map((song, i) => (
            <SongRow key={song.id} song={song} index={i} list={likedSongs} />
          ))}
        </>
      ) : (
        <p className="text-muted">Like songs to build this playlist.</p>
      )}
    </div>
  )
}
