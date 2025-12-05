import { Navbar } from '@/components/store/Navbar';
import { HeroServerInfo, TopSellingProducts } from '@/components/store/HomeHero';
import { WidgetsSection } from '@/components/store/HomeNew';
import { Footer } from '@/components/store/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <HeroServerInfo />
        <TopSellingProducts />
        <WidgetsSection />
      </main>
      <Footer />
    </div>
  );
}
