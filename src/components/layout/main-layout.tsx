"use client";

import { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ChefHat, Heart, BookOpen, Sparkles } from "lucide-react";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-pink-50">
      {/* Navigation Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          {/* Mobile and Desktop Header */}
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="bg-gradient-to-br from-orange-400 to-rose-400 p-1.5 sm:p-2 rounded-xl">
                <ChefHat className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                  RecipeAI
                </h1>
                <p className="text-xs text-gray-500 -mt-1 hidden sm:block">
                  Smart Recipe Assistant
                </p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-lg font-bold bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                  RecipeAI
                </h1>
              </div>
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search for pasta, chicken, desserts..."
                  className="pl-10 bg-white/70 border-orange-200 focus:border-orange-300 focus:ring-orange-200"
                />
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-3 lg:space-x-6">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-orange-600 hover:bg-orange-50 px-2 lg:px-4"
              >
                <BookOpen className="h-4 w-4 lg:mr-2" />
                <span className="hidden lg:inline">Recipes</span>
              </Button>
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-rose-600 hover:bg-rose-50 px-2 lg:px-4"
              >
                <Heart className="h-4 w-4 lg:mr-2" />
                <span className="hidden lg:inline">Favorites</span>
              </Button>
              <Button className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white shadow-lg px-3 lg:px-4">
                <Sparkles className="h-4 w-4 lg:mr-2" />
                <span className="hidden lg:inline">Generate Recipe</span>
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <Button variant="ghost" className="md:hidden p-2">
              <div className="flex flex-col space-y-1">
                <div className="w-5 h-0.5 bg-gray-600"></div>
                <div className="w-5 h-0.5 bg-gray-600"></div>
                <div className="w-5 h-0.5 bg-gray-600"></div>
              </div>
            </Button>
          </div>

          {/* Mobile Search Bar */}
          <div className="lg:hidden pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search recipes..."
                className="pl-10 bg-white/70 border-orange-200 focus:border-orange-300 focus:ring-orange-200"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white/60 backdrop-blur-sm border-t border-orange-100 mt-8 sm:mt-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-br from-orange-400 to-rose-400 p-2 rounded-xl">
                  <ChefHat className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                  RecipeAI
                </h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                Your smart cooking companion powered by AI. Discover, create,
                and share amazing recipes tailored to your taste and dietary
                preferences.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className="bg-orange-100 text-orange-700 hover:bg-orange-200 text-xs"
                >
                  AI-Powered
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-rose-100 text-rose-700 hover:bg-rose-200 text-xs"
                >
                  Personalized
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-pink-100 text-pink-700 hover:bg-pink-200 text-xs"
                >
                  Community
                </Badge>
              </div>
            </div>

            <div className="sm:col-span-1">
              <h4 className="font-semibold text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">
                Features
              </h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                <li>AI Recipe Generation</li>
                <li>Smart Ingredient Search</li>
                <li>Dietary Preferences</li>
                <li>Meal Planning</li>
              </ul>
            </div>

            <div className="sm:col-span-1">
              <h4 className="font-semibold text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">
                Community
              </h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                <li>Share Recipes</li>
                <li>Rate & Review</li>
                <li>Cooking Tips</li>
                <li>Recipe Collections</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-orange-100 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-gray-500">
            <p>
              &copy; 2024 RecipeAI. Made with ❤️ for food lovers everywhere.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
