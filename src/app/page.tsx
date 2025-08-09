import { MainLayout } from "@/components/layout/main-layout";
import { HeroSection } from "@/components/layout/hero-section";
import { RecipeShowcase } from "@/components/recipe/recipe-showcase";

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <RecipeShowcase />
    </MainLayout>
  );
}
