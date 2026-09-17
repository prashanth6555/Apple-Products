import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import { categories, getProductsByCategory } from '../data/products'

const covers = {
  iphone: '/images/iphone-lineup.png',
  ipad: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1800&q=80',
  mac: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1800&q=80',
  watch: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=1800&q=80',
  airpods: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=1800&q=80',
}

export default function Category() {
  const { slug } = useParams()
  const meta = categories.find((c) => c.slug === slug)
  const items = useMemo(() => getProductsByCategory(slug), [slug])

  if (!meta) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="text-3xl font-semibold">Category not found</h1>
      </div>
    )
  }

  return (
    <>
      <section className="relative overflow-hidden bg-black text-white">
        <img src={covers[slug]} alt="" className={`absolute inset-0 h-full w-full object-cover ${slug === 'iphone' ? 'opacity-55' : 'opacity-35'}`} />
        <div className="relative mx-auto max-w-[980px] px-5 py-24 text-center md:py-32">
          <p className="animate-fade-up text-sm tracking-[0.25em] text-white/60">{meta.name.toUpperCase()}</p>
          <h1 className="animate-fade-up mt-3 text-5xl font-semibold tracking-tight md:text-7xl" style={{ animationDelay: '0.12s' }}>
            {meta.name}
          </h1>
          <p className="animate-fade-up mt-4 text-xl text-white/80" style={{ animationDelay: '0.22s' }}>
            {meta.tagline}
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-[1200px] px-5 py-16">
        <Reveal>
          <p className="mb-8 text-mute">{items.length} models</p>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <Reveal key={p.id} delay={i * 70}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
