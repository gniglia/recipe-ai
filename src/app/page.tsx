import { HeroSection } from "@/components/layout/hero-section";
import { MainLayout } from "@/components/layout/main-layout";
import { FavoritesSection } from "@/components/recipe/favorites-section";
import { RecipeShowcase } from "@/components/recipe/recipe-showcase";

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section id="hero">
        <HeroSection />
      </section>

      {/* Recipe Section */}
      <section id="recipes">
        <RecipeShowcase />
      </section>

      {/* Favorites Section */}
      <section id="favorites" className="mt-8">
        <FavoritesSection />
      </section>
    </MainLayout>
  );
}
