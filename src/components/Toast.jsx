import { useStore } from '../context/StoreContext'

export default function Toast() {
  const { toast } = useStore()
  if (!toast) return null
  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 rounded-full bg-ink px-5 py-2.5 text-sm text-white shadow-lg animate-fade-up">
      {toast}
    </div>
  )
}
