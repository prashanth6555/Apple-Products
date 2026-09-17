import { Link } from 'react-router-dom'
import { FaApple } from 'react-icons/fa'

const columns = [
  {
    title: 'Shop and Learn',
    links: [
      { to: '/iphone', label: 'iPhone' },
      { to: '/ipad', label: 'iPad' },
      { to: '/mac', label: 'Mac' },
      { to: '/watch', label: 'Watch' },
      { to: '/airpods', label: 'AirPods' },
    ],
  },
  {
    title: 'Store',
    links: [
      { to: '/', label: 'Featured' },
      { to: '/cart', label: 'Bag' },
      { to: '/wishlist', label: 'Favorites' },
    ],
  },
  {
    title: 'Values',
    links: [
      { to: '/', label: 'Accessibility' },
      { to: '/', label: 'Environment' },
      { to: '/', label: 'Privacy' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-mist text-[12px] text-mute">
      <div className="mx-auto max-w-[980px] px-5 py-10 md:px-8">
        <p className="mb-6 border-b border-line pb-4 leading-relaxed">
          This is a student / portfolio demonstration inspired by Apple’s product presentation. It is not affiliated with Apple Inc.
          Product names and imagery are used for educational UI design.
        </p>
        <div className="grid gap-8 sm:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-2 font-semibold text-ink">{col.title}</h3>
              <ul className="space-y-1.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-1.5">
            <FaApple className="text-[14px] text-ink" /> Copyright © {new Date().getFullYear()} Apple Store Demo. All rights reserved.
          </p>
          <p>United States</p>
        </div>
      </div>
    </footer>
  )
}
