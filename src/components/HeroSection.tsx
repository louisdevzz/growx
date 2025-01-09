import { Button } from '@/components/ui/button'


export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 relative z-10">
        <div className="max-w-2xl pt-8">
          <h1 className="text-[56px] font-medium leading-tight mb-6">
            Discover the joy of{' '}
            <span className="inline-block bg-[#B4B1FF]/20 px-3 py-1 rounded-lg">
              effortless
            </span>{' '}
            investment{' '}
            <span className="inline-block bg-[#B4B1FF]/20 px-3 py-1 rounded-lg">
              opportunities
            </span>{' '}
            <span className="inline-block bg-[#B4B1FF]/20 px-3 py-1 rounded-lg">
              with GrowX.
            </span>
          </h1>
          <p className="text-gray-600 mb-8 text-lg max-w-xl">
            GrowX's investment platform is now available and ready to revolutionize the way you think about venture capital and investment opportunities.
          </p>
          <Button variant="default" size="lg" className="bg-black text-white hover:bg-black/90 rounded-full px-8 h-12">
            GET STARTED
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 grid grid-cols-4 gap-4">
            {/* Pattern squares */}
            <div className="col-span-2 bg-[#E2FF00]/30 rounded-2xl" />
            <div className="bg-white rounded-2xl" />
            <div className="bg-[#E2FF00]/30 rounded-2xl" />
            
            <div className="bg-white rounded-2xl" />
            <div className="bg-white rounded-2xl" />
            <div className="bg-white rounded-2xl" />
            <div className="bg-[#B4B1FF]/20 rounded-2xl" />
            
            <div className="bg-[#E2FF00]/30 rounded-2xl" />
            <div className="bg-white rounded-2xl" />
            <div className="bg-[#B4B1FF]/20 rounded-2xl" />
            <div className="bg-[#B4B1FF]/20 rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}

