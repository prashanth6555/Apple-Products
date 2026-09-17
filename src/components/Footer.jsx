import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaApple } from 'react-icons/fa'
import { HiChevronDown } from 'react-icons/hi'

const columns = [
  {
    title: 'Shop and Learn',
    links: [
      { to: '/', label: 'Store' },
      { to: '/iphone', label: 'iPhone' },
      { to: '/ipad', label: 'iPad' },
      { to: '/mac', label: 'Mac' },
      { to: '/watch', label: 'Watch' },
      { to: '/airpods', label: 'AirPods' },
    ],
  },
  {
    title: 'Account',
    links: [
      { to: '/cart', label: 'Bag' },
      { to: '/wishlist', label: 'Favorites' },
      { to: '/iphone', label: 'Order Status' },
    ],
  },
  {
    title: 'Apple Store',
    links: [
      { to: '/', label: 'Featured' },
      { to: '/iphone', label: 'Shop iPhone' },
      { to: '/mac', label: 'Shop Mac' },
      { to: '/watch', label: 'Shop Watch' },
      { to: '/airpods', label: 'Shop AirPods' },
    ],
  },
  {
    title: 'For Education',
    links: [
      { to: '/mac', label: 'Mac in Education' },
      { to: '/ipad', label: 'iPad in Education' },
      { to: '/iphone', label: 'Shop for College' },
    ],
  },
  {
    title: 'Apple Values',
    links: [
      { to: '/', label: 'Accessibility' },
      { to: '/', label: 'Environment' },
      { to: '/', label: 'Privacy' },
      { to: '/', label: 'Supplier Responsibility' },
    ],
  },
  {
    title: 'About',
    links: [
      { to: '/', label: 'Newsroom' },
      { to: '/', label: 'Apple Leadership' },
      { to: '/', label: 'Career Opportunities' },
      { to: '/', label: 'Contact Apple' },
    ],
  },
]

const legal = [
  { to: '/', label: 'Privacy Policy' },
  { to: '/', label: 'Terms of Use' },
  { to: '/', label: 'Sales and Refunds' },
  { to: '/', label: 'Legal' },
  { to: '/', label: 'Site Map' },
]

function FooterColumn({ col }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-line md:border-0">
      <button
        type="button"
        className="flex w-full items-center justify-between py-3 text-left text-[12px] font-semibold text-ink md:hidden"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {col.title}
        <HiChevronDown className={`text-[16px] text-mute transition ${open ? 'rotate-180' : ''}`} />
      </button>
      <h3 className="hidden text-[12px] font-semibold text-ink md:block">{col.title}</h3>
      <ul className={`${open ? 'block pb-3' : 'hidden'} space-y-2 md:mt-3 md:block md:pb-0`}>
        {col.links.map((link) => (
          <li key={link.label}>
            <Link to={link.to} className="text-[12px] text-mute transition hover:text-ink hover:underline">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="mt-auto bg-mist text-[12px] text-mute">
      <div className="w-full px-6 py-8 md:px-12 lg:px-16">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-ink">
          <Link to="/" aria-label="Apple Store home" className="text-[18px] transition hover:opacity-70">
            <FaApple />
          </Link>
          <span className="text-line">/</span>
          <Link to="/" className="hover:underline">
            Apple Store
          </Link>
          <span className="text-line">/</span>
          <span>Explore the ecosystem</span>
        </nav>

        <p className="max-w-[980px] border-b border-line pb-5 leading-relaxed">
          1. This is a student / portfolio demonstration inspired by Apple’s product presentation. It is not affiliated with
          Apple Inc. Product names, logos, and imagery are used for educational UI design only. Features such as Bag and
          Favorites are simulated and do not process real payments.
        </p>

        <div className="mt-2 grid gap-0 md:mt-8 md:grid-cols-3 md:gap-8 xl:grid-cols-6">
          {columns.map((col) => (
            <FooterColumn key={col.title} col={col} />
          ))}
        </div>

        <p className="mt-8 border-b border-line pb-4 leading-relaxed">
          More ways to shop:{' '}
          <Link to="/iphone" className="text-apple hover:underline">
            find an Apple Store
          </Link>{' '}
          or other retailer near you. Or call 1-800-MY-APPLE.
        </p>

        <div className="flex flex-col gap-3 py-4 md:flex-row md:flex-wrap md:items-center md:justify-between">
          <p>Copyright © {new Date().getFullYear()} Apple Store Demo. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {legal.map((item, i) => (
              <li key={item.label} className="flex items-center gap-3">
                {i > 0 && <span className="hidden h-3 w-px bg-line sm:block" />}
                <Link to={item.to} className="hover:text-ink hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="md:text-right">United States</p>
        </div>
      </div>
    </footer>
  )
}
