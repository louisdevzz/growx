import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import FeaturesSection from '@/components/FetureSection'
import ProjectsShowcase from '@/components/ProjectsShowcase'
import TrendingProjects from '@/components/TrendingProjects'
import TopInvestors from '@/components/TopInvestors'
import HowItWorks from '@/components/HowItWorks'
import Partners from '@/components/Partners'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ProjectsShowcase />
      <TrendingProjects />
      <HowItWorks />
      <TopInvestors />
      <Partners />
      <Footer />
    </main>
  )
}

