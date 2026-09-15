import { useState } from 'react'
import { useParams } from 'react-router-dom'
import MediaCard from '../components/ui/MediaCard'
import PlayButton from '../components/ui/PlayButton'
import SectionRow from '../components/ui/SectionRow'
import SongRow from '../components/ui/SongRow'
import { usePlayer } from '../context/PlayerContext'
import { albumsByArtist, getArtist, songsByArtist } from '../data/music'

export default function ArtistPage() {
  const { id } = useParams()
  const artist = getArtist(id)
  const tracks = artist ? songsByArtist(artist.id) : []
  const albums = artist ? albumsByArtist(artist.id) : []
  const { playCollection, currentSong, isPlaying, togglePlay, following, toggleFollow } = usePlayer()
  const [showAll, setShowAll] = useState(false)

  if (!artist) {
    return <p className="page-enter text-muted">Artist not found.</p>
  }

  const popular = [...tracks].sort((a, b) => Number(b.plays.replace(/,/g, '')) - Number(a.plays.replace(/,/g, '')))
  const visible = showAll ? popular : popular.slice(0, 5)
  const isCurrent = tracks.some((s) => s.id === currentSong?.id)
  const isFollowing = following.has(artist.id)

  return (
    <div className="page-enter">
      <div className="-mx-4 -mt-3 md:-mx-6">
        <div className="relative h-52 overflow-hidden sm:h-64 md:h-80">
          <img src={artist.banner} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/25" />
          <div className="absolute bottom-6 left-4 flex items-end gap-4 md:left-6">
            <img
              src={artist.image}
              alt={artist.name}
              className="h-24 w-24 rounded-full object-cover ring-4 ring-black md:h-36 md:w-36"
            />
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase">Verified artist</p>
              <h1 className="text-4xl font-extrabold md:text-7xl">{artist.name}</h1>
              <p className="mt-2 text-sm text-white/80">{artist.monthlyListeners} monthly listeners</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 py-6">
        <PlayButton
          size="lg"
          playing={isCurrent && isPlaying}
          onClick={() => (isCurrent ? togglePlay() : playCollection(tracks))}
        />
        <button
          type="button"
          onClick={() => toggleFollow(artist.id)}
          className={`rounded-full border px-5 py-2 text-sm font-bold transition ${
            isFollowing ? 'border-white bg-white text-black' : 'border-white/40 hover:border-white'
          }`}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </button>
        <p className="text-sm text-muted">{artist.followers} followers • {artist.genres.join(' · ')}</p>
      </div>

      <p className="mb-8 max-w-3xl text-sm leading-relaxed text-white/80">{artist.bio}</p>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold">Popular</h2>
        {visible.map((song, i) => (
          <SongRow key={song.id} song={song} index={i} list={tracks} showAlbum={false} showPlays />
        ))}
        {popular.length > 5 ? (
          <button
            type="button"
            onClick={() => setShowAll((s) => !s)}
            className="mt-3 px-3 text-sm font-bold text-muted hover:text-white"
          >
            {showAll ? 'Show less' : 'See more'}
          </button>
        ) : null}
      </section>

      <SectionRow title="Albums and singles">
        {albums.map((a) => (
          <MediaCard
            key={a.id}
            to={`/album/${a.id}`}
            image={a.cover}
            title={a.title}
            subtitle={`${a.year} • Album`}
            songs={tracks.filter((s) => s.albumId === a.id)}
          />
        ))}
      </SectionRow>
    </div>
  )
}
