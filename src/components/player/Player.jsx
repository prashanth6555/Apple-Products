import {
  Heart,
  Pause,
  Play,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { usePlayer } from '../../context/PlayerContext'
import { formatTime } from '../../utils/format'

export default function Player() {
  const {
    currentSong,
    isPlaying,
    progress,
    duration,
    volume,
    muted,
    shuffle,
    repeat,
    liked,
    togglePlay,
    next,
    prev,
    seek,
    setVolume,
    toggleMute,
    toggleShuffle,
    cycleRepeat,
    toggleLike,
  } = usePlayer()

  if (!currentSong) return null

  const pct = duration ? (progress / duration) * 100 : 0

  return (
    <footer className="z-50 grid h-[88px] grid-cols-[1fr_auto] items-center gap-3 border-t border-white/5 bg-black px-3 py-2 md:grid-cols-[minmax(180px,1fr)_minmax(280px,2fr)_minmax(140px,1fr)] md:px-4">
      <div className="flex min-w-0 items-center gap-3">
        <img
          src={currentSong.cover}
          alt=""
          className={`h-12 w-12 shrink-0 rounded object-cover shadow md:h-14 md:w-14 ${isPlaying ? 'animate-pulse' : ''}`}
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{currentSong.title}</p>
          <Link to={`/artist/${currentSong.artistId}`} className="truncate text-xs text-muted hover:underline">
            {currentSong.artist}
          </Link>
        </div>
        <button
          type="button"
          aria-label="Like"
          onClick={() => toggleLike(currentSong.id)}
          className={`hidden sm:block ${liked.has(currentSong.id) ? 'text-spotify' : 'text-muted hover:text-white'}`}
        >
          <Heart size={16} fill={liked.has(currentSong.id) ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-3 md:gap-5">
          <button
            type="button"
            aria-label="Shuffle"
            onClick={toggleShuffle}
            className={`hidden sm:block ${shuffle ? 'text-spotify' : 'text-muted hover:text-white'}`}
          >
            <Shuffle size={16} />
          </button>
          <button type="button" aria-label="Previous" onClick={prev} className="text-muted hover:text-white">
            <SkipBack size={20} fill="currentColor" />
          </button>
          <button
            type="button"
            aria-label={isPlaying ? 'Pause' : 'Play'}
            onClick={togglePlay}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition hover:scale-105"
          >
            {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
          </button>
          <button type="button" aria-label="Next" onClick={next} className="text-muted hover:text-white">
            <SkipForward size={20} fill="currentColor" />
          </button>
          <button
            type="button"
            aria-label="Repeat"
            onClick={cycleRepeat}
            className={`hidden sm:block ${repeat !== 'off' ? 'text-spotify' : 'text-muted hover:text-white'}`}
          >
            {repeat === 'one' ? <Repeat1 size={16} /> : <Repeat size={16} />}
          </button>
        </div>
        <div className="flex w-full max-w-xl items-center gap-2 text-[11px] text-muted">
          <span className="w-8 text-right tabular-nums">{formatTime(progress)}</span>
          <input
            type="range"
            min="0"
            max={duration || currentSong.duration}
            value={progress}
            onChange={(e) => seek(Number(e.target.value))}
            className="range-spotify w-full"
            style={{
              background: `linear-gradient(to right, #1db954 ${pct}%, #4d4d4d ${pct}%)`,
            }}
            aria-label="Seek"
          />
          <span className="w-8 tabular-nums">{formatTime(duration || currentSong.duration)}</span>
        </div>
      </div>

      <div className="hidden items-center justify-end gap-2 md:flex">
        <button type="button" aria-label="Mute" onClick={toggleMute} className="text-muted hover:text-white">
          {muted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={muted ? 0 : volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="range-spotify w-24"
          style={{
            background: `linear-gradient(to right, #fff ${(muted ? 0 : volume) * 100}%, #4d4d4d ${(muted ? 0 : volume) * 100}%)`,
          }}
          aria-label="Volume"
        />
      </div>
    </footer>
  )
}
