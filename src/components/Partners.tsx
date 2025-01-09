export default function Partners() {
  const partners = [
    { id: 1, name: "Partner 1", logo: "/partners/1.png" },
    { id: 2, name: "Partner 2", logo: "/partners/2.png" },
    { id: 3, name: "Partner 3", logo: "/partners/3.png" },
    { id: 4, name: "Partner 4", logo: "/partners/4.png" },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Partners</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {partners.map((partner) => (
            <div key={partner.id} className="flex items-center justify-center">
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-16 opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 