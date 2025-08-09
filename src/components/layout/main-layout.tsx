"use client";

import { ReactNode, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChefHat, Heart, Sparkles, Menu, X, Search } from "lucide-react";
import { SearchInput } from "@/components/ui/search-input";

import { motion, AnimatePresence } from "framer-motion";
import { useRecipeStore } from "@/stores/recipe-store";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { searchQuery, setSearchQuery } = useRecipeStore();

  // Smooth scroll to sections
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Handle search input
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <div className="min-h-screen relative">
      {/* Simple Static Background - NO EFFECTS */}
      <div
        className="fixed inset-0 w-full h-full -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.15), rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.25)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Main Content Wrapper */}
      <div className="relative z-10">
        {/* Navigation Header */}
        <motion.header
          className="bg-black/20 backdrop-blur-md border-b border-white/20 sticky top-0 z-50"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            {/* Mobile and Desktop Header */}
            <div className="flex items-center justify-between h-14 sm:h-16">
              {/* Logo */}
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="bg-gradient-to-br from-emerald-500 to-blue-500 p-1.5 sm:p-2 rounded-xl">
                  <ChefHat className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                    RecipeAI
                  </h1>
                  <p className="text-xs text-white/80 -mt-1 hidden sm:block">
                    Smart Recipe Assistant
                  </p>
                </div>
                <div className="sm:hidden">
                  <h1 className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                    RecipeAI
                  </h1>
                </div>
              </div>

              {/* Desktop Search Bar */}
              <motion.div
                className="hidden lg:flex flex-1 max-w-2xl mx-8"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <SearchInput
                  placeholder="Search for pasta, chicken, desserts..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  variant="glass"
                />
              </motion.div>

              {/* Desktop Navigation Links */}
              <motion.nav
                className="hidden md:flex items-center space-x-3 lg:space-x-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    onClick={() => scrollToSection("favorites")}
                    className="text-white/80 hover:text-purple-300 hover:bg-purple-500/20 px-2 lg:px-4 transition-colors duration-200"
                  >
                    <Heart className="h-4 w-4 lg:mr-2" />
                    <span className="hidden lg:inline">Favorites</span>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => scrollToSection("hero")}
                    className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white shadow-lg px-3 lg:px-4 transition-all duration-200"
                  >
                    <Sparkles className="h-4 w-4 lg:mr-2" />
                    <span className="hidden lg:inline">Generate Recipe</span>
                  </Button>
                </motion.div>
              </motion.nav>

              {/* Mobile Menu Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 text-white/80 hover:text-white hover:bg-white/10"
                >
                  <AnimatePresence mode="wait">
                    {isMobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="h-5 w-5 text-gray-600" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="h-5 w-5 text-gray-600" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </div>

            {/* Mobile Search Bar */}
            <motion.div
              className="lg:hidden pb-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <SearchInput
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                variant="glass"
              />
            </motion.div>
          </div>
        </motion.header>

        {/* Mobile Slide-out Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/50 z-40 md:hidden cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
              />

              {/* Slide-out Menu */}
              <motion.div
                className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-black/80 backdrop-blur-lg border-l border-white/20 z-50 md:hidden"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
              >
                <div className="p-6">
                  {/* Menu Header */}
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                      Menu
                    </h2>
                    <Button
                      variant="ghost"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 text-white/80 hover:text-white hover:bg-white/10"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Menu Items */}
                  <nav className="space-y-4">
                    <motion.div
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Button
                        variant="ghost"
                        onClick={() => {
                          scrollToSection("favorites");
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full justify-start text-white/80 hover:text-purple-300 hover:bg-purple-500/20 p-4"
                      >
                        <Heart className="h-5 w-5 mr-3" />
                        Favorites
                      </Button>
                    </motion.div>

                    <motion.div
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Button
                        onClick={() => {
                          scrollToSection("hero");
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full justify-start bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white p-4"
                      >
                        <Sparkles className="h-5 w-5 mr-3" />
                        Generate Recipe
                      </Button>
                    </motion.div>

                    <motion.div
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Button
                        variant="ghost"
                        onClick={() => {
                          scrollToSection("recipes");
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full justify-start text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 p-4"
                      >
                        <Search className="h-5 w-5 mr-3" />
                        Browse Recipes
                      </Button>
                    </motion.div>
                  </nav>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-black/20 backdrop-blur-md border-t border-white/20 mt-8 sm:mt-16">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="sm:col-span-2 lg:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-gradient-to-br from-emerald-500 to-blue-500 p-2 rounded-xl">
                    <ChefHat className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                    RecipeAI
                  </h3>
                </div>
                <p className="text-white/80 mb-4 text-sm sm:text-base">
                  Your smart cooking companion powered by AI. Discover, create,
                  and share amazing recipes tailored to your taste and dietary
                  preferences.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 text-xs"
                  >
                    AI-Powered
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs"
                  >
                    Personalized
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 text-purple-700 hover:bg-purple-200 text-xs"
                  >
                    Community
                  </Badge>
                </div>
              </div>

              <div className="sm:col-span-1">
                <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">
                  Features
                </h4>
                <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-white/70">
                  <li>AI Recipe Generation</li>
                  <li>Smart Ingredient Search</li>
                  <li>Dietary Preferences</li>
                  <li>Meal Planning</li>
                </ul>
              </div>

              <div className="sm:col-span-1">
                <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">
                  Community
                </h4>
                <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-white/70">
                  <li>Share Recipes</li>
                  <li>Rate & Review</li>
                  <li>Cooking Tips</li>
                  <li>Recipe Collections</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/20 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-white/60">
              <p>
                &copy; 2024 RecipeAI. Made with ❤️ for food lovers everywhere.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
