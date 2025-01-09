import { CuboidIcon, Shield, Zap } from 'lucide-react'

const features = [
  {
    icon: CuboidIcon,
    title: 'A WORLD OF POSSIBILITIES',
    description: 'Discover our advanced investment opportunities and technologies.',
  },
  {
    icon: Shield,
    title: 'QUALITY THAT YOU CAN TRUST',
    description: 'Explore our vetted ventures and advanced investment options.',
  },
  {
    icon: Zap,
    title: 'GET YOUR INVESTMENTS FASTER',
    description: 'High-potential ventures, fast deployment: 6 business days max.',
  }
]

export default function FeaturesSection() {
  return (
    <section className="py-20 border-t border-[#eaeaea]">
      <div className="container mx-auto px-4">        
        <div className="grid md:grid-cols-3 gap-24">
          {features.map((feature, index) => (
            <div key={index} className="group flex items-start space-x-6">
              <div className="flex-shrink-0 w-[42px] h-[42px] bg-black rounded-lg flex items-center justify-center">
                <feature.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="flex items-center space-x-2 text-xs font-medium tracking-wider uppercase mb-3">
                  <span>{feature.title}</span>
                  <span className="text-base">›</span>
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed pr-4">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

