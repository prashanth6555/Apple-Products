import { Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import MediaCard from '../components/ui/MediaCard'
import SectionRow from '../components/ui/SectionRow'
import { usePlayer } from '../context/PlayerContext'
import { albums, artists, getSongsByIds, playlists, podcasts, songs } from '../data/music'
import { greeting } from '../utils/format'

export default function Home() {
  const { playCollection, recent } = usePlayer()
  const featured = playlists[5]
  const featuredSongs = getSongsByIds(featured.songIds)
  const mix = playlists.slice(0, 6)

  return (
    <div className="page-enter">
      <section
        className="relative mb-8 overflow-hidden rounded-2xl"
        style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 55%, #121212 100%)' }}
      >
        <div className="grid gap-6 p-6 md:grid-cols-[220px_1fr] md:items-end md:p-8">
          <img
            src={featured.cover}
            alt={featured.title}
            className="h-44 w-44 rounded-lg object-cover shadow-2xl shadow-black/50 transition duration-500 hover:scale-105 md:h-52 md:w-52"
          />
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-white/70 uppercase">Featured playlist</p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight md:text-6xl">{greeting()}</h1>
            <p className="mt-3 max-w-xl text-sm text-white/80 md:text-base">
              Start with <span className="font-semibold text-white">{featured.title}</span> — {featured.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => playCollection(featuredSongs)}
                className="inline-flex items-center gap-2 rounded-full bg-spotify px-6 py-3 text-sm font-bold text-black transition hover:scale-105 hover:bg-spotify-hover"
              >
                <Play size={18} fill="currentColor" />
                Play {featured.title}
              </button>
              <Link
                to={`/playlist/${featured.id}`}
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-bold hover:border-white"
              >
                Open playlist
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mb-8 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {mix.map((p) => (
          <Link
            key={p.id}
            to={`/playlist/${p.id}`}
            className="group flex items-center gap-3 overflow-hidden rounded-md bg-white/8 transition hover:bg-white/16"
          >
            <img src={p.cover} alt="" className="h-16 w-16 object-cover" />
            <span className="flex-1 truncate pr-2 font-semibold">{p.title}</span>
            <span className="mr-3 hidden translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100 sm:inline-flex">
              <button
                type="button"
                aria-label={`Play ${p.title}`}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-spotify text-black shadow-lg hover:scale-105"
                onClick={(e) => {
                  e.preventDefault()
                  playCollection(getSongsByIds(p.songIds))
                }}
              >
                <Play size={16} fill="currentColor" className="ml-0.5" />
              </button>
            </span>
          </Link>
        ))}
      </div>

      <SectionRow title="Recently played">
        {recent.map((song) => (
          <MediaCard
            key={song.id}
            to={`/album/${song.albumId}`}
            image={song.cover}
            title={song.title}
            subtitle={song.artist}
            songs={[song]}
          />
        ))}
      </SectionRow>

      <SectionRow title="Trending playlists">
        {playlists.map((p) => (
          <MediaCard
            key={p.id}
            to={`/playlist/${p.id}`}
            image={p.cover}
            title={p.title}
            subtitle={p.description}
            songs={getSongsByIds(p.songIds)}
          />
        ))}
      </SectionRow>

      <SectionRow title="Popular artists">
        {artists.map((a) => (
          <MediaCard
            key={a.id}
            to={`/artist/${a.id}`}
            image={a.image}
            title={a.name}
            subtitle="Artist"
            songs={songs.filter((s) => s.artistId === a.id)}
            rounded="rounded-full"
          />
        ))}
      </SectionRow>

      <SectionRow title="Featured albums">
        {albums.map((a) => (
          <MediaCard
            key={a.id}
            to={`/album/${a.id}`}
            image={a.cover}
            title={a.title}
            subtitle={a.artist}
            songs={songs.filter((s) => s.albumId === a.id)}
          />
        ))}
      </SectionRow>

      <SectionRow title="Podcasts">
        {podcasts.map((p) => (
          <MediaCard key={p.id} to="/search?q=podcast" image={p.cover} title={p.title} subtitle={p.host} />
        ))}
      </SectionRow>
    </div>
  )
}
