export default function Section({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <section className="py-6 md:py-10">
      <h2 className="text-2xl font-bold mb-8">{title}</h2>
      <div className="relative">
        {children}
      </div>
    </section>
  )
} 