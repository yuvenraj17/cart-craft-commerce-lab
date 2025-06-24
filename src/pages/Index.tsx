import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Heart, ShoppingCart, User, LogOut } from "lucide-react";
import { AuthModal } from "@/components/AuthModal";
import { CartSidebar } from "@/components/CartSidebar";
import { WishlistSidebar } from "@/components/WishlistSidebar";
import { GenderFilter } from "@/components/GenderFilter";
import { GenderModelDisplay } from "@/components/GenderModelDisplay";
import { CountryCurrencySelector } from "@/components/CountryCurrencySelector";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useAuthStore } from "@/stores/useAuthStore";
import { useCartStore } from "@/stores/useCartStore";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  description: string;
  image_url: string;
  gender: number;
  category: {
    name: string;
  };
}

const Index = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGender, setSelectedGender] = useState<number | null>(null);
  const { user, signOut, initialize } = useAuthStore();
  const { fetchCartItems, addToCart, getTotalItems: getCartTotal } = useCartStore();
  const { 
    fetchWishlistItems, 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist, 
    getTotalItems: getWishlistTotal 
  } = useWishlistStore();
  const { selectedCountry, setSelectedCountry, formatPrice } = useCurrency();
  const { toast } = useToast();

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (user) {
      fetchCartItems();
      fetchWishlistItems();
    }
  }, [user]);

  useEffect(() => {
    fetchProducts();
  }, [selectedGender]);

  const fetchProducts = async () => {
    try {
      let query = supabase
        .from('products')
        .select(`
          id,
          name,
          brand,
          price,
          rating,
          description,
          image_url,
          gender,
          category:categories(name)
        `)
        .eq('is_active', true);

      if (selectedGender !== null) {
        query = query.eq('gender', selectedGender);
      }

      const { data, error } = await query;

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId: string) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    try {
      await addToCart(productId);
      toast({
        title: "Added to cart!",
        description: "Item has been added to your cart.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart.",
        variant: "destructive",
      });
    }
  };

  const handleWishlistToggle = async (productId: string) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    try {
      if (isInWishlist(productId)) {
        await removeFromWishlist(productId);
        toast({
          title: "Removed from wishlist",
          description: "Item has been removed from your wishlist.",
        });
      } else {
        await addToWishlist(productId);
        toast({
          title: "Added to wishlist!",
          description: "Item has been added to your wishlist.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update wishlist.",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 to-pink-50 relative">
      {/* Gender Model Display */}
      <GenderModelDisplay selectedGender={selectedGender} />

      {/* Header */}
      <header className="bg-black shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-cyan-300">Shains Spark</h1>
              <p className="text-amber-700">Discover Your Signature Scent</p>
            </div>
            <div className="flex gap-4 items-center">
              <CountryCurrencySelector
                selectedCountry={selectedCountry}
                onCountryChange={setSelectedCountry}
              />
              {user ? (
                <>
                  <WishlistSidebar>
                    <Button variant="outline" size="sm" className="text-purple-600 border-purple-600 hover:bg-cyan-300 hover:text-black transition-colors duration-200">
                      <Heart className="h-4 w-4 mr-2" />
                      Wishlist ({getWishlistTotal()})
                    </Button>
                  </WishlistSidebar>
                  <CartSidebar>
                    <Button variant="outline" size="sm" className="text-purple-600 border-purple-600 hover:bg-cyan-300 hover:text-black transition-colors duration-200">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Cart ({getCartTotal()})
                    </Button>
                  </CartSidebar>
                  <Button variant="outline" size="sm" className="text-purple-600 border-purple-600 hover:bg-pink-300 hover:text-black transition-colors duration-200" onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4 mr-2" />
                    Wishlist (0)
                  </Button>
                  <Button size="sm" variant="outline">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Cart (0)
                  </Button>
                  <Button size="sm" onClick={() => setAuthModalOpen(true)}>
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </>
              )}
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
        <div className="max-w-7xl mx-auto px-4 hover:transition duration-150 ease-in-out hover:bg-purple-100">
          <GenderFilter
            selectedGender={selectedGender}
            onGenderChange={setSelectedGender}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 brightness-3000"
                  />
                  <div className="absolute top-3 right-3">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-white/80 backdrop-blur-sm"
                      onClick={() => handleWishlistToggle(product.id)}
                    >
                      <Heart 
                        className={`h-4 w-4 ${
                          user && isInWishlist(product.id) 
                            ? 'fill-red-500 text-red-500' 
                            : ''
                        }`} 
                      />
                    </Button>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {product.category?.name}
                    </span>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                  </div>
                  <CardDescription className="text-sm text-gray-500">
                    {product.brand}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-purple-600">
                      {formatPrice(product.price)}
                    </span>
                    <Button 
                      size="sm" 
                      className="bg-rose-500 hover:bg-cyan-500"
                      onClick={() => handleAddToCart(product.id)}
                    >
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

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </div>
  );
};

export default Index;
