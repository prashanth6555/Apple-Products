import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const STORAGE_USERS = 'spotify-music-users'
const STORAGE_SESSION = 'spotify-music-session'

const DEMO_USER = {
  id: 'demo-user',
  name: 'Alex Rivera',
  email: 'demo@spotify.music',
  password: 'demo1234',
  bio: 'Collector of late-night playlists, jazz records, and festival sets.',
  country: 'United States',
  plan: 'Premium',
  createdAt: '2025-11-02T10:00:00.000Z',
}

function readUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_USERS)
    const users = raw ? JSON.parse(raw) : []
    if (!users.some((u) => u.email === DEMO_USER.email)) {
      users.unshift(DEMO_USER)
      localStorage.setItem(STORAGE_USERS, JSON.stringify(users))
    }
    return users
  } catch {
    return [DEMO_USER]
  }
}

function writeUsers(users) {
  localStorage.setItem(STORAGE_USERS, JSON.stringify(users))
}

function readSession() {
  try {
    const email = localStorage.getItem(STORAGE_SESSION)
    if (!email) return null
    return readUsers().find((u) => u.email === email) || null
  } catch {
    return null
  }
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const session = readSession()
    if (!session) return null
    const { password: _pw, ...safe } = session
    return safe
  })

  const signup = useCallback((payload) => {
    const name = payload.name.trim()
    const email = payload.email.trim().toLowerCase()
    const password = payload.password
    const users = readUsers()

    if (users.some((u) => u.email === email)) {
      return { ok: false, error: 'An account with this email already exists.' }
    }

    const next = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
      bio: '',
      country: '',
      plan: 'Free',
      createdAt: new Date().toISOString(),
    }
    writeUsers([...users, next])
    localStorage.setItem(STORAGE_SESSION, email)
    const { password: _pw, ...safe } = next
    setUser(safe)
    return { ok: true }
  }, [])

  const login = useCallback((email, password) => {
    const users = readUsers()
    const found = users.find((u) => u.email === email.trim().toLowerCase())
    if (!found || found.password !== password) {
      return { ok: false, error: 'Incorrect email or password.' }
    }
    localStorage.setItem(STORAGE_SESSION, found.email)
    const { password: _pw, ...safe } = found
    setUser(safe)
    return { ok: true }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_SESSION)
    setUser(null)
  }, [])

  const updateProfile = useCallback((updates) => {
    if (!user) return { ok: false, error: 'You need to log in first.' }
    const users = readUsers()
    const index = users.findIndex((u) => u.email === user.email)
    if (index < 0) return { ok: false, error: 'Account not found.' }
    const merged = { ...users[index], ...updates }
    users[index] = merged
    writeUsers(users)
    const { password: _pw, ...safe } = merged
    setUser(safe)
    return { ok: true }
  }, [user])

  const value = useMemo(
    () => ({ user, signup, login, logout, updateProfile }),
    [user, signup, login, logout, updateProfile],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'U'
}
