import { Link } from 'react-router-dom'
import { usePlayer } from '../../context/PlayerContext'
import PlayButton from './PlayButton'

export default function MediaCard({ to, image, title, subtitle, songs, rounded = 'rounded-md' }) {
  const { playCollection, currentSong, isPlaying, togglePlay } = usePlayer()
  const isCurrent = songs?.some((s) => s.id === currentSong?.id)

  return (
    <Link
      to={to}
      className="group relative rounded-lg bg-elevated p-3 transition duration-200 hover:bg-hover"
    >
      <div className="relative mb-4 overflow-hidden">
        <img
          src={image}
          alt={title}
          className={`aspect-square w-full object-cover shadow-lg shadow-black/50 transition duration-300 group-hover:scale-105 ${rounded}`}
        />
        {songs?.length ? (
          <div className="absolute right-2 bottom-2 translate-y-3 opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100">
            <PlayButton
              playing={isCurrent && isPlaying}
              onClick={() => (isCurrent ? togglePlay() : playCollection(songs))}
            />
          </div>
        ) : null}
      </div>
      <h3 className="truncate font-semibold">{title}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-muted">{subtitle}</p>
    </Link>
  )
}
