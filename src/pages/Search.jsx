import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import MediaCard from '../components/ui/MediaCard'
import SectionRow from '../components/ui/SectionRow'
import SongRow from '../components/ui/SongRow'
import { categories, getSongsByIds, searchCatalog, songs as allSongs } from '../data/music'

export default function Search() {
  const [params] = useSearchParams()
  const q = params.get('q') || ''
  const results = useMemo(() => searchCatalog(q), [q])
  const hasQuery = q.trim().length > 0
  const hasHits =
    results.songs.length || results.artists.length || results.albums.length || results.playlists.length

  return (
    <div className="page-enter">
      <h1 className="mb-6 text-2xl font-bold md:text-3xl">{hasQuery ? `Search results` : 'Browse all'}</h1>

      {!hasQuery ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/search?q=${encodeURIComponent(c.title)}`}
              className="relative h-28 overflow-hidden rounded-xl p-4 font-bold shadow-lg transition hover:scale-[1.02] md:h-36"
              style={{ backgroundColor: c.color }}
            >
              <span className="relative z-10 text-lg md:text-2xl">{c.title}</span>
              <img
                src={c.image}
                alt=""
                className="absolute -right-3 -bottom-3 h-20 w-20 rotate-12 rounded-md object-cover shadow-xl md:h-24 md:w-24"
              />
            </Link>
          ))}
        </div>
      ) : !hasHits ? (
        <p className="text-muted">
          No results found for “{q}”. Try another song, artist, album, or playlist.
        </p>
      ) : (
        <>
          {results.songs.length ? (
            <section className="mb-8">
              <h2 className="mb-3 text-xl font-bold">Songs</h2>
              <div className="rounded-lg bg-white/5 p-2">
                {results.songs.slice(0, 6).map((song, i) => (
                  <SongRow key={song.id} song={song} index={i} list={results.songs} showAlbum={false} />
                ))}
              </div>
            </section>
          ) : null}

          {results.artists.length ? (
            <SectionRow title="Artists">
              {results.artists.map((a) => (
                <MediaCard
                  key={a.id}
                  to={`/artist/${a.id}`}
                  image={a.image}
                  title={a.name}
                  subtitle="Artist"
                  songs={allSongs.filter((s) => s.artistId === a.id)}
                  rounded="rounded-full"
                />
              ))}
            </SectionRow>
          ) : null}

          {results.albums.length ? (
            <SectionRow title="Albums">
              {results.albums.map((a) => (
                <MediaCard
                  key={a.id}
                  to={`/album/${a.id}`}
                  image={a.cover}
                  title={a.title}
                  subtitle={a.artist}
                  songs={allSongs.filter((s) => s.albumId === a.id)}
                />
              ))}
            </SectionRow>
          ) : null}

          {results.playlists.length ? (
            <SectionRow title="Playlists">
              {results.playlists.map((p) => (
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
          ) : null}
        </>
      )}
    </div>
  )
}
