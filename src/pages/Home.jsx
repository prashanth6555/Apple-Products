<<<<<<< HEAD
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
=======
import { Link } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi'
import Reveal from '../components/Reveal'
import ProductCard from '../components/ProductCard'
import { getFeatured, products } from '../data/products'
import { useStore } from '../context/StoreContext'

const tiles = [
  {
    to: '/iphone',
    title: 'iPhone',
    copy: 'Meet the iPhone 16 family.',
    image: '/images/iphone-lineup.png',
    theme: 'dark',
  },
  {
    to: '/mac',
    title: 'Mac',
    copy: 'If you can dream it, Mac can do it.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1400&q=80',
    theme: 'light',
  },
  {
    to: '/watch',
    title: 'Apple Watch',
    copy: 'Smarter. Brighter. Mightier.',
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=1400&q=80',
    theme: 'dark',
  },
  {
    to: '/airpods',
    title: 'AirPods',
    copy: 'A new era of sound and silence.',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=1400&q=80',
    theme: 'light',
  },
  {
    to: '/ipad',
    title: 'iPad',
    copy: 'Touch, draw, and type on one magical device.',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1400&q=80',
    theme: 'light',
  },
]

export default function Home() {
  const featured = getFeatured()
  const latest = products.filter((p) => p.isNew)
  const { addToCart } = useStore()
  const hero = products.find((p) => p.hero)

  return (
    <>
      <section className="relative overflow-hidden bg-[#000] text-white">
        <div className="animate-glow pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-[#4b6cb7] blur-[90px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(90,110,160,0.28),transparent_58%)]" />
        <div className="relative mx-auto grid min-h-[90vh] max-w-[1200px] items-center gap-8 px-5 py-16 md:grid-cols-2 md:py-20">
          <div className="text-center md:text-left">
            <p className="animate-fade-up text-sm font-medium tracking-[0.28em] text-orange-400">NEW</p>
            <h1 className="animate-fade-up mt-3 text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl" style={{ animationDelay: '0.12s' }}>
              iPhone 16 Pro
            </h1>
            <p className="animate-fade-up mt-4 text-xl text-white/80 md:text-2xl" style={{ animationDelay: '0.22s' }}>
              Titanium. So strong. So light. So Pro.
            </p>
            <div className="animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start" style={{ animationDelay: '0.34s' }}>
              <Link to="/iphone" className="btn-pulse rounded-full bg-apple px-6 py-3 text-sm font-medium text-white transition hover:bg-apple-hover">
                Explore Now
              </Link>
              <button
                type="button"
                onClick={() => hero && addToCart(hero)}
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition hover:scale-105 hover:bg-white/10"
              >
                Buy Now
              </button>
            </div>
          </div>
          <div className="relative mx-auto h-[420px] w-full max-w-[520px] md:h-[540px]">
            <img
              src="/images/iphone-16-pro-back.png"
              alt=""
              className="animate-float-delayed absolute left-2 top-16 w-[46%] drop-shadow-2xl md:left-0"
            />
            <img
              src="/images/iphone-16-pro-front.png"
              alt="iPhone 16 Pro"
              className="animate-float absolute right-2 top-0 w-[58%] drop-shadow-2xl md:right-4"
            />
          </div>
        </div>
        <div className="relative overflow-hidden border-t border-white/10 py-6">
          <div className="animate-marquee flex w-max gap-10 px-6">
            {[...Array(2)].map((_, loop) => (
              <div key={loop} className="flex gap-10">
                {['iPhone 16 Pro', 'iPhone 16', 'iPhone 16 Plus', 'iPhone 15', 'A18 Pro', 'Titanium', '48MP Camera'].map((label) => (
                  <span key={`${loop}-${label}`} className="whitespace-nowrap text-sm tracking-[0.2em] text-white/50">
                    {label}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist px-4 py-4 md:px-5">
        <Reveal>
          <Link to="/iphone" className="group relative mb-3 block overflow-hidden rounded-[1.4rem] bg-black text-white">
            <div className="grid items-center gap-4 px-6 py-10 md:grid-cols-2 md:px-12">
              <div>
                <p className="text-sm tracking-[0.2em] text-orange-400">IPHONE</p>
                <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">Meet the lineup.</h2>
                <p className="mt-3 max-w-md text-white/70">Four stunning finishes. One powerful family. Explore colors, storage, and Pro cameras.</p>
                <span className="mt-5 inline-flex items-center gap-1 text-apple">
                  Shop iPhone <HiArrowRight className="transition group-hover:translate-x-1" />
                </span>
              </div>
              <img
                src="/images/iphone-lineup.png"
                alt="iPhone lineup"
                className="h-56 w-full rounded-2xl object-cover transition duration-700 group-hover:scale-105 md:h-72"
              />
            </div>
          </Link>
        </Reveal>
        <div className="grid gap-3 md:grid-cols-2">
          <Reveal>
            <Link to="/product/ipad-pro" className="group relative block overflow-hidden rounded-[1.4rem] bg-white">
              <div className="px-6 pt-10 text-center">
                <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">iPad Pro</h2>
                <p className="mt-2 text-lg text-mute">Thinpossible.</p>
                <span className="mt-4 inline-flex items-center gap-1 text-apple">
                  Learn more <HiArrowRight />
                </span>
              </div>
              <img
                src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1400&q=80"
                alt="iPad Pro"
                className="mx-auto h-72 w-full object-cover transition duration-700 group-hover:scale-105 md:h-80"
              />
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <Link to="/product/macbook-pro-14" className="group relative block overflow-hidden rounded-[1.4rem] bg-black text-white">
              <div className="px-6 pt-10 text-center">
                <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">MacBook Pro</h2>
                <p className="mt-2 text-lg text-white/70">Mind-blowing. Head-turning.</p>
                <span className="mt-4 inline-flex items-center gap-1 text-apple">
                  Learn more <HiArrowRight />
                </span>
              </div>
              <img
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1400&q=80"
                alt="MacBook Pro"
                className="mx-auto h-72 w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 md:h-80"
              />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1200px] px-5">
          <Reveal>
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">The Apple ecosystem</h2>
              <p className="mt-3 text-mute">One experience, across every device you love.</p>
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tiles.map((tile, i) => (
              <Reveal key={tile.to} delay={i * 80} className={i === 4 ? 'sm:col-span-2 lg:col-span-1' : ''}>
                <Link
                  to={tile.to}
                  className={`group relative flex min-h-[340px] overflow-hidden rounded-3xl ${
                    tile.theme === 'dark' ? 'bg-black text-white' : 'bg-mist text-ink'
                  }`}
                >
                  <div className="relative z-10 p-8">
                    <h3 className="text-3xl font-semibold">{tile.title}</h3>
                    <p className={`mt-2 max-w-xs ${tile.theme === 'dark' ? 'text-white/70' : 'text-mute'}`}>{tile.copy}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-apple">
                      Explore <HiArrowRight />
                    </span>
                  </div>
                  <img
                    src={tile.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-45 transition duration-700 group-hover:scale-110 group-hover:opacity-70"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist py-20">
        <div className="mx-auto max-w-[1200px] px-5">
          <Reveal>
            <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Featured</h2>
                <p className="mt-2 text-mute">Handpicked products from the latest lineup.</p>
              </div>
              <Link to="/iphone" className="text-apple hover:underline">
                Shop all
              </Link>
            </div>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.slice(0, 6).map((p, i) => (
              <Reveal key={p.id} delay={i * 70}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1200px] px-5">
          <Reveal>
            <h2 className="mb-8 text-3xl font-semibold tracking-tight md:text-4xl">Just arrived</h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {latest.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-24 text-white">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <Reveal>
            <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">Designed to work together.</h2>
            <p className="mt-5 text-lg text-white/70">
              Continuity, Handoff, AirDrop, and iCloud keep iPhone, iPad, Mac, Watch, and AirPods in sync — so your ideas move as
              fast as you do.
            </p>
            <Link
              to="/mac"
              className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-ink transition hover:bg-white/90"
            >
              Explore Mac
            </Link>
          </Reveal>
        </div>
      </section>
    </>
>>>>>>> d030ef1 (first commit)
  )
}
