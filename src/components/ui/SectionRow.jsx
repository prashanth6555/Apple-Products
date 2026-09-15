export default function SectionRow({ title, children, action }) {
  return (
    <section className="mb-8">
      <div className="mb-4 flex items-end justify-between gap-4">
        <h2 className="text-xl font-bold tracking-tight md:text-2xl">{title}</h2>
        {action}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {children}
      </div>
    </section>
  )
}
