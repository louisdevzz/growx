export default function HowItWorks() {
  const steps = [
    {
      title: "Create Project",
      description: "Submit your innovative project and share your vision",
      icon: "📝",
    },
    {
      title: "Get Funded",
      description: "Connect with investors who believe in your project",
      icon: "💰",
    },
    {
      title: "Build & Grow",
      description: "Use the funds to build and scale your project",
      icon: "🚀",
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How GrowX Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 