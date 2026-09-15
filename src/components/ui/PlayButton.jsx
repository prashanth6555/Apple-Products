import { Pause, Play } from 'lucide-react'

export default function PlayButton({ playing, onClick, size = 'md', className = '' }) {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-14 w-14',
  }
  const icon = size === 'sm' ? 16 : 22

  return (
    <button
      type="button"
      aria-label={playing ? 'Pause' : 'Play'}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onClick?.(e)
      }}
      className={`${sizes[size]} ${className} inline-flex items-center justify-center rounded-full bg-spotify text-black shadow-lg shadow-black/40 transition duration-200 hover:scale-110 hover:bg-spotify-hover active:scale-95`}
    >
      {playing ? <Pause fill="currentColor" size={icon} /> : <Play fill="currentColor" size={icon} className="ml-0.5" />}
    </button>
  )
}
