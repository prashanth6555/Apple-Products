const audio = [
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
]

export const artists = [
  {
    id: 'luna-park',
    name: 'Luna Park',
    monthlyListeners: '4,812,440',
    followers: '2.1M',
    bio: 'Dreamy indie-pop from Melbourne, built on shimmering guitars and late-night vocals.',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=80',
    genres: ['Indie Pop', 'Dream Pop'],
  },
  {
    id: 'neon-harbor',
    name: 'Neon Harbor',
    monthlyListeners: '8,204,110',
    followers: '5.4M',
    bio: 'Coastal electronica with pulsing synths, neon nights, and festival-ready drops.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80',
    genres: ['Electronic', 'Synthwave'],
  },
  {
    id: 'velvet-hours',
    name: 'The Velvet Hours',
    monthlyListeners: '1,902,331',
    followers: '890K',
    bio: 'A modern jazz-soul collective weaving brass, vinyl warmth, and midnight grooves.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35cff8?auto=format&fit=crop&w=1600&q=80',
    genres: ['Jazz', 'Soul'],
  },
  {
    id: 'aria-sol',
    name: 'Aria Sol',
    monthlyListeners: '12,441,009',
    followers: '9.8M',
    bio: 'Global pop storyteller with sunlit hooks and cinematic choruses.',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1600&q=80',
    genres: ['Pop', 'Dance Pop'],
  },
  {
    id: 'midnight-express',
    name: 'Midnight Express',
    monthlyListeners: '3,112,870',
    followers: '1.4M',
    bio: 'Gritty analog rock, highway anthems, and feedback-drenched choruses.',
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=1600&q=80',
    genres: ['Rock', 'Alt Rock'],
  },
  {
    id: 'kairo',
    name: 'Kairo',
    monthlyListeners: '6,770,221',
    followers: '3.6M',
    bio: 'Sharp-tongued hip-hop from Chicago — nocturnal beats and city-skyline storytelling.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1600&q=80',
    genres: ['Hip-Hop', 'Rap'],
  },
  {
    id: 'celeste-waves',
    name: 'Celeste Waves',
    monthlyListeners: '2,440,118',
    followers: '1.1M',
    bio: 'Ambient textures for deep work, rain windows, and slow cinematic mornings.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1459749411177-04aa488bbc6c?auto=format&fit=crop&w=1600&q=80',
    genres: ['Ambient', 'Focus'],
  },
  {
    id: 'rio-santos',
    name: 'Rio Santos',
    monthlyListeners: '5,018,664',
    followers: '2.8M',
    bio: 'Brazilian grooves, sun-soaked percussion, and feel-good summer records.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80',
    genres: ['Latin', 'Bossa'],
  },
]

export const albums = [
  {
    id: 'glass-skies',
    title: 'Glass Skies',
    artistId: 'luna-park',
    artist: 'Luna Park',
    year: 2025,
    cover: 'https://images.unsplash.com/photo-1565103420311-8cbbc3cd87b8?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'harbor-nights',
    title: 'Harbor Nights',
    artistId: 'neon-harbor',
    artist: 'Neon Harbor',
    year: 2026,
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'after-hours',
    title: 'After Hours',
    artistId: 'velvet-hours',
    artist: 'The Velvet Hours',
    year: 2024,
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'solar-bloom',
    title: 'Solar Bloom',
    artistId: 'aria-sol',
    artist: 'Aria Sol',
    year: 2026,
    cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'open-road',
    title: 'Open Road',
    artistId: 'midnight-express',
    artist: 'Midnight Express',
    year: 2025,
    cover: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'night-shift',
    title: 'Night Shift',
    artistId: 'kairo',
    artist: 'Kairo',
    year: 2026,
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'still-water',
    title: 'Still Water',
    artistId: 'celeste-waves',
    artist: 'Celeste Waves',
    year: 2024,
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'copacabana-gold',
    title: 'Copacabana Gold',
    artistId: 'rio-santos',
    artist: 'Rio Santos',
    year: 2025,
    cover: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80',
  },
]

export const songs = [
  { id: 's1', title: 'Silverline', artistId: 'luna-park', artist: 'Luna Park', albumId: 'glass-skies', album: 'Glass Skies', duration: 212, plays: '182,441,002', cover: albums[0].cover, audio: audio[0] },
  { id: 's2', title: 'Paper Moons', artistId: 'luna-park', artist: 'Luna Park', albumId: 'glass-skies', album: 'Glass Skies', duration: 198, plays: '94,210,331', cover: albums[0].cover, audio: audio[1] },
  { id: 's3', title: 'Balcony Lights', artistId: 'luna-park', artist: 'Luna Park', albumId: 'glass-skies', album: 'Glass Skies', duration: 241, plays: '61,008,119', cover: albums[0].cover, audio: audio[2] },
  { id: 's4', title: 'Neon Tide', artistId: 'neon-harbor', artist: 'Neon Harbor', albumId: 'harbor-nights', album: 'Harbor Nights', duration: 226, plays: '301,552,880', cover: albums[1].cover, audio: audio[3] },
  { id: 's5', title: 'Midnight Circuit', artistId: 'neon-harbor', artist: 'Neon Harbor', albumId: 'harbor-nights', album: 'Harbor Nights', duration: 204, plays: '210,004,552', cover: albums[1].cover, audio: audio[4] },
  { id: 's6', title: 'Dockside', artistId: 'neon-harbor', artist: 'Neon Harbor', albumId: 'harbor-nights', album: 'Harbor Nights', duration: 188, plays: '88,441,220', cover: albums[1].cover, audio: audio[5] },
  { id: 's7', title: 'Blue Velvet', artistId: 'velvet-hours', artist: 'The Velvet Hours', albumId: 'after-hours', album: 'After Hours', duration: 265, plays: '44,119,008', cover: albums[2].cover, audio: audio[6] },
  { id: 's8', title: 'Last Call', artistId: 'velvet-hours', artist: 'The Velvet Hours', albumId: 'after-hours', album: 'After Hours', duration: 231, plays: '29,880,441', cover: albums[2].cover, audio: audio[7] },
  { id: 's9', title: 'Golden Hour', artistId: 'aria-sol', artist: 'Aria Sol', albumId: 'solar-bloom', album: 'Solar Bloom', duration: 197, plays: '512,009,114', cover: albums[3].cover, audio: audio[0] },
  { id: 's10', title: 'Runaway Sun', artistId: 'aria-sol', artist: 'Aria Sol', albumId: 'solar-bloom', album: 'Solar Bloom', duration: 214, plays: '401,220,008', cover: albums[3].cover, audio: audio[1] },
  { id: 's11', title: 'Bloom', artistId: 'aria-sol', artist: 'Aria Sol', albumId: 'solar-bloom', album: 'Solar Bloom', duration: 183, plays: '266,441,990', cover: albums[3].cover, audio: audio[2] },
  { id: 's12', title: 'Highway Ghost', artistId: 'midnight-express', artist: 'Midnight Express', albumId: 'open-road', album: 'Open Road', duration: 248, plays: '71,004,221', cover: albums[4].cover, audio: audio[3] },
  { id: 's13', title: 'Static Heart', artistId: 'midnight-express', artist: 'Midnight Express', albumId: 'open-road', album: 'Open Road', duration: 221, plays: '38,119,440', cover: albums[4].cover, audio: audio[4] },
  { id: 's14', title: 'Skyline', artistId: 'kairo', artist: 'Kairo', albumId: 'night-shift', album: 'Night Shift', duration: 192, plays: '190,008,331', cover: albums[5].cover, audio: audio[5] },
  { id: 's15', title: 'After Dark', artistId: 'kairo', artist: 'Kairo', albumId: 'night-shift', album: 'Night Shift', duration: 207, plays: '144,220,009', cover: albums[5].cover, audio: audio[6] },
  { id: 's16', title: 'Rainglass', artistId: 'celeste-waves', artist: 'Celeste Waves', albumId: 'still-water', album: 'Still Water', duration: 276, plays: '52,441,118', cover: albums[6].cover, audio: audio[7] },
  { id: 's17', title: 'Soft Focus', artistId: 'celeste-waves', artist: 'Celeste Waves', albumId: 'still-water', album: 'Still Water', duration: 254, plays: '41,009,220', cover: albums[6].cover, audio: audio[0] },
  { id: 's18', title: 'Copacabana', artistId: 'rio-santos', artist: 'Rio Santos', albumId: 'copacabana-gold', album: 'Copacabana Gold', duration: 209, plays: '122,880,441', cover: albums[7].cover, audio: audio[1] },
  { id: 's19', title: 'Mar Azul', artistId: 'rio-santos', artist: 'Rio Santos', albumId: 'copacabana-gold', album: 'Copacabana Gold', duration: 195, plays: '98,004,110', cover: albums[7].cover, audio: audio[2] },
  { id: 's20', title: 'Electric Avenue', artistId: 'neon-harbor', artist: 'Neon Harbor', albumId: 'harbor-nights', album: 'Harbor Nights', duration: 218, plays: '77,441,002', cover: albums[1].cover, audio: audio[3] },
  { id: 's21', title: 'Quiet Fire', artistId: 'velvet-hours', artist: 'The Velvet Hours', albumId: 'after-hours', album: 'After Hours', duration: 242, plays: '18,220,441', cover: albums[2].cover, audio: audio[4] },
  { id: 's22', title: 'Northbound', artistId: 'luna-park', artist: 'Luna Park', albumId: 'glass-skies', album: 'Glass Skies', duration: 201, plays: '33,009,118', cover: albums[0].cover, audio: audio[5] },
]

export const playlists = [
  {
    id: 'daily-mix-1',
    title: 'Daily Mix 1',
    description: 'Luna Park, Aria Sol, Neon Harbor and more',
    cover: 'https://images.unsplash.com/photo-1562403681-c1e256fdc27b?q=80&w=1306&auto=format&fit=crop&ixlib=rb-4.1.0&ix',
    color: '#3b0764',
    songIds: ['s1', 's9', 's4', 's10', 's2', 's20'],
    owner: 'Spotify',
  },
  {
    id: 'chill-vibes',
    title: 'Chill Vibes',
    description: 'Unwind with mellow indie, jazz, and ambient.',
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    color: '#164e63',
    songIds: ['s16', 's7', 's2', 's17', 's21', 's3'],
    owner: 'Spotify',
  },
  {
    id: 'workout-energy',
    title: 'Workout Energy',
    description: 'High-BPM drops to keep you moving.',
    cover: 'https://plus.unsplash.com/premium_photo-1661502840770-56ed13363216?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    color: '#7f1d1d',
    songIds: ['s4', 's14', 's5', 's12', 's10', 's20'],
    owner: 'Spotify',
  },
  {
    id: 'late-night-jazz',
    title: 'Late Night Jazz',
    description: 'Smoky rooms, brushed drums, velvet horns.',
    cover: 'https://images.unsplash.com/photo-1725830071503-d705ef4a0975?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    color: '#1c1917',
    songIds: ['s7', 's8', 's21', 's16'],
    owner: 'Spotify',
  },
  {
    id: 'indie-discover',
    title: 'Indie Discover',
    description: 'Fresh guitar-led stories and bedroom anthems.',
    cover: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80',
    color: '#365314',
    songIds: ['s1', 's2', 's3', 's22', 's13'],
    owner: 'Spotify',
  },
  {
    id: 'top-hits',
    title: 'Top Hits 2026',
    description: 'The songs everyone is streaming right now.',
    cover: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80',
    color: '#1e3a8a',
    songIds: ['s9', 's4', 's14', 's10', 's18', 's1', 's5'],
    owner: 'Spotify',
  },
  {
    id: 'focus-flow',
    title: 'Focus Flow',
    description: 'Instrumental calm for deep work sessions.',
    cover: 'https://images.unsplash.com/photo-1650902565793-c2eb262aefbc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    color: '#134e4a',
    songIds: ['s16', 's17', 's6', 's3'],
    owner: 'Spotify',
  },
  {
    id: 'summer-heat',
    title: 'Summer Heat',
    description: 'Sun, sand, and feel-good grooves.',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    color: '#9a3412',
    songIds: ['s18', 's19', 's9', 's11', 's6'],
    owner: 'Spotify',
  },
]

export const podcasts = [
  {
    id: 'p1',
    title: 'Sound Stories',
    host: 'Maya Chen',
    cover: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80',
    description: 'Conversations with producers, mixers, and touring artists.',
  },
  {
    id: 'p2',
    title: 'Night Drive Radio',
    host: 'Eli Navarro',
    cover: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
    description: 'Two-hour mixes for empty highways and city glow.',
  },
  {
    id: 'p3',
    title: 'Behind the Chorus',
    host: 'Priya Raman',
    cover: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80',
    description: 'Songwriters unpack the stories behind hit records.',
  },
  {
    id: 'p4',
    title: 'Vinyl Club',
    host: 'Jonah Blake',
    cover: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80',
    description: 'Weekly crate-digging and forgotten album deep dives.',
  },
]

export const categories = [
  { id: 'c1', title: 'Music', color: '#dc2626', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80' },
  { id: 'c2', title: 'Podcasts', color: '#006450', image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=400&q=80' },
  { id: 'c3', title: 'Live Events', color: '#8400e7', image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=400&q=80' },
  { id: 'c4', title: 'Made For You', color: '#1e3a8a', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&q=80' },
  { id: 'c5', title: 'New Releases', color: '#e11d48', image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=400&q=80' },
  { id: 'c6', title: 'Hip-Hop', color: '#b45309', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80' },
  { id: 'c7', title: 'Pop', color: '#0f766e', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80' },
  { id: 'c8', title: 'Indie', color: '#365314', image: 'https://images.unsplash.com/photo-1459749411177-04aa488bbc6c?auto=format&fit=crop&w=400&q=80' },
  { id: 'c9', title: 'Rock', color: '#7f1d1d', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=400&q=80' },
  { id: 'c10', title: 'Jazz', color: '#1c1917', image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35cff8?auto=format&fit=crop&w=400&q=80' },
  { id: 'c11', title: 'Focus', color: '#155e75', image: 'https://images.unsplash.com/photo-1483412036650-81e0f84a7d85?auto=format&fit=crop&w=400&q=80' },
  { id: 'c12', title: 'Latin', color: '#9a3412', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80' },
]

export function getSong(id) {
  return songs.find((s) => s.id === id)
}

export function getSongsByIds(ids) {
  return ids.map((id) => getSong(id)).filter(Boolean)
}

export function getArtist(id) {
  return artists.find((a) => a.id === id)
}

export function getAlbum(id) {
  return albums.find((a) => a.id === id)
}

export function getPlaylist(id) {
  return playlists.find((p) => p.id === id)
}

export function songsByArtist(artistId) {
  return songs.filter((s) => s.artistId === artistId)
}

export function albumsByArtist(artistId) {
  return albums.filter((a) => a.artistId === artistId)
}

export function searchCatalog(query) {
  const q = query.trim().toLowerCase()
  if (!q) {
    return { songs: [], artists: [], albums: [], playlists: [] }
  }
  return {
    songs: songs.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.artist.toLowerCase().includes(q) ||
        s.album.toLowerCase().includes(q),
    ),
    artists: artists.filter((a) => a.name.toLowerCase().includes(q)),
    albums: albums.filter(
      (a) => a.title.toLowerCase().includes(q) || a.artist.toLowerCase().includes(q),
    ),
    playlists: playlists.filter(
      (p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
    ),
  }
}
