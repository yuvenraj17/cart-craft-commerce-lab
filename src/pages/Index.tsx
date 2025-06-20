
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Heart, ShoppingCart } from "lucide-react";

const perfumes = [
  {
    id: 1,
    name: "Midnight Rose",
    brand: "Luxe Parfums",
    price: 89.99,
    rating: 4.8,
    description: "A sophisticated blend of dark roses and vanilla with hints of bergamot",
    image: `https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=400&fit=crop`,
    category: "Floral"
  },
  {
    id: 2,
    name: "Ocean Breeze",
    brand: "Aqua Scents",
    price: 65.99,
    rating: 4.6,
    description: "Fresh marine notes with citrus and white musk for a clean, crisp scent",
    image: `https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=400&fit=crop`,
    category: "Fresh"
  },
  {
    id: 3,
    name: "Golden Amber",
    brand: "Oriental House",
    price: 124.99,
    rating: 4.9,
    description: "Warm amber and sandalwood with touches of jasmine and patchouli",
    image: `https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=400&fit=crop`,
    category: "Oriental"
  },
  {
    id: 4,
    name: "Citrus Burst",
    brand: "Fresh & Co",
    price: 45.99,
    rating: 4.4,
    description: "Energizing blend of lemon, grapefruit, and mint with cedar base notes",
    image: `https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=400&fit=crop`,
    category: "Citrus"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Parfumerie</h1>
              <p className="text-gray-600">Discover Your Signature Scent</p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Wishlist
              </Button>
              <Button size="sm">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart (0)
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Premium Perfume Collection
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore our curated selection of luxury fragrances from the world's finest perfume houses
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {perfumes.map((perfume) => (
              <Card key={perfume.id} className="group hover:shadow-lg transition-shadow duration-300">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={perfume.image} 
                    alt={perfume.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Button size="sm" variant="outline" className="bg-white/80 backdrop-blur-sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {perfume.category}
                    </span>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{perfume.name}</CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{perfume.rating}</span>
                    </div>
                  </div>
                  <CardDescription className="text-sm text-gray-500">
                    {perfume.brand}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {perfume.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-purple-600">
                      ${perfume.price}
                    </span>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Find Your Perfect Fragrance</h3>
          <p className="text-gray-400 mb-6">
            From fresh and floral to bold and mysterious - discover scents that tell your story
          </p>
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
            Explore Collection
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default Index;
