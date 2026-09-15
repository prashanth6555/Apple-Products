import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { songs as catalogSongs } from '../data/music'

const PlayerContext = createContext(null)

export function PlayerProvider({ children }) {
  const audioRef = useRef(null)
  const [currentSong, setCurrentSong] = useState(catalogSongs[8])
  const [queue, setQueue] = useState(catalogSongs)
  const [queueIndex, setQueueIndex] = useState(8)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(0.72)
  const [muted, setMuted] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState('off')
  const [liked, setLiked] = useState(() => new Set(['s9', 's4', 's1']))
  const [recent, setRecent] = useState(catalogSongs.slice(0, 6))
  const [following, setFollowing] = useState(() => new Set(['aria-sol']))

  const playAtIndex = useCallback(
    async (list, index) => {
      const song = list[index]
      if (!song) return
      setQueue(list)
      setQueueIndex(index)
      setCurrentSong(song)
      setRecent((prev) => [song, ...prev.filter((s) => s.id !== song.id)].slice(0, 8))
      setIsPlaying(true)
    },
    [],
  )

  const playSong = useCallback(
    (song, list = queue.length ? queue : catalogSongs) => {
      const idx = list.findIndex((s) => s.id === song.id)
      playAtIndex(idx >= 0 ? list : [song, ...list], idx >= 0 ? idx : 0)
    },
    [playAtIndex, queue],
  )

  const playCollection = useCallback(
    (list, startId) => {
      if (!list?.length) return
      const idx = startId ? Math.max(0, list.findIndex((s) => s.id === startId)) : 0
      playAtIndex(list, idx)
    },
    [playAtIndex],
  )

  const togglePlay = useCallback(() => {
    if (!currentSong) {
      playAtIndex(catalogSongs, 0)
      return
    }
    setIsPlaying((p) => !p)
  }, [currentSong, playAtIndex])

  const next = useCallback(() => {
    if (!queue.length) return
    if (shuffle) {
      const nextIndex = Math.floor(Math.random() * queue.length)
      playAtIndex(queue, nextIndex)
      return
    }
    const nextIndex = queueIndex + 1
    if (nextIndex < queue.length) {
      playAtIndex(queue, nextIndex)
    } else if (repeat === 'all') {
      playAtIndex(queue, 0)
    } else {
      setIsPlaying(false)
    }
  }, [playAtIndex, queue, queueIndex, repeat, shuffle])

  const prev = useCallback(() => {
    if (!queue.length) return
    if (progress > 3) {
      if (audioRef.current) audioRef.current.currentTime = 0
      setProgress(0)
      return
    }
    const prevIndex = queueIndex - 1
    playAtIndex(queue, prevIndex < 0 ? queue.length - 1 : prevIndex)
  }, [playAtIndex, progress, queue, queueIndex])

  const seek = useCallback((value) => {
    if (!audioRef.current) return
    audioRef.current.currentTime = value
    setProgress(value)
  }, [])

  const setVolume = useCallback((value) => {
    setVolumeState(value)
    setMuted(value === 0)
  }, [])

  const toggleMute = useCallback(() => {
    setMuted((m) => !m)
  }, [])

  const toggleShuffle = useCallback(() => setShuffle((s) => !s), [])

  const cycleRepeat = useCallback(() => {
    setRepeat((r) => (r === 'off' ? 'all' : r === 'all' ? 'one' : 'off'))
  }, [])

  const toggleLike = useCallback((songId) => {
    setLiked((prev) => {
      const nextSet = new Set(prev)
      if (nextSet.has(songId)) nextSet.delete(songId)
      else nextSet.add(songId)
      return nextSet
    })
  }, [])

  const toggleFollow = useCallback((artistId) => {
    setFollowing((prev) => {
      const nextSet = new Set(prev)
      if (nextSet.has(artistId)) nextSet.delete(artistId)
      else nextSet.add(artistId)
      return nextSet
    })
  }, [])

  useEffect(() => {
    const audioEl = audioRef.current
    if (!audioEl || !currentSong) return
    if (audioEl.src !== currentSong.audio) {
      audioEl.src = currentSong.audio
    }
    audioEl.volume = muted ? 0 : volume
    if (isPlaying) {
      audioEl.play().catch(() => setIsPlaying(false))
    } else {
      audioEl.pause()
    }
  }, [currentSong, isPlaying, muted, volume])

  useEffect(() => {
    const audioEl = audioRef.current
    if (!audioEl) return

    const onTime = () => setProgress(audioEl.currentTime || 0)
    const onMeta = () => setDuration(audioEl.duration || 0)
    const onEnded = () => {
      if (repeat === 'one') {
        audioEl.currentTime = 0
        audioEl.play()
        return
      }
      next()
    }

    audioEl.addEventListener('timeupdate', onTime)
    audioEl.addEventListener('loadedmetadata', onMeta)
    audioEl.addEventListener('ended', onEnded)
    return () => {
      audioEl.removeEventListener('timeupdate', onTime)
      audioEl.removeEventListener('loadedmetadata', onMeta)
      audioEl.removeEventListener('ended', onEnded)
    }
  }, [next, repeat])

  const likedSongs = useMemo(
    () => catalogSongs.filter((s) => liked.has(s.id)),
    [liked],
  )

  const value = useMemo(
    () => ({
      currentSong,
      queue,
      isPlaying,
      progress,
      duration,
      volume,
      muted,
      shuffle,
      repeat,
      liked,
      likedSongs,
      recent,
      following,
      playSong,
      playCollection,
      togglePlay,
      next,
      prev,
      seek,
      setVolume,
      toggleMute,
      toggleShuffle,
      cycleRepeat,
      toggleLike,
      toggleFollow,
    }),
    [
      currentSong,
      cycleRepeat,
      duration,
      following,
      isPlaying,
      liked,
      likedSongs,
      muted,
      next,
      playCollection,
      playSong,
      prev,
      progress,
      queue,
      recent,
      repeat,
      seek,
      setVolume,
      shuffle,
      toggleFollow,
      toggleLike,
      toggleMute,
      togglePlay,
      toggleShuffle,
      volume,
    ],
  )

  return (
    <PlayerContext.Provider value={value}>
      <audio ref={audioRef} preload="metadata" />
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider')
  return ctx
}
