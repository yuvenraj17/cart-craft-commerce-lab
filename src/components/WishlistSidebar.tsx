
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { useCartStore } from "@/stores/useCartStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { useToast } from "@/hooks/use-toast";

interface WishlistSidebarProps {
  children: React.ReactNode;
}

export const WishlistSidebar = ({ children }: WishlistSidebarProps) => {
  const [open, setOpen] = useState(false);
  const { items, removeFromWishlist, getTotalItems } = useWishlistStore();
  const { addToCart } = useCartStore();
  const { user } = useAuthStore();
  const { toast } = useToast();

  const handleAddToCart = async (productId: string) => {
    if (!user) return;
    
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

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      await removeFromWishlist(productId);
      toast({
        title: "Removed from wishlist",
        description: "Item has been removed from your wishlist.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item from wishlist.",
        variant: "destructive",
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Wishlist ({getTotalItems()})
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <Heart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Your wishlist is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <img 
                      src={item.product.image_url} 
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.product.name}</h4>
                      <p className="text-sm text-gray-500">{item.product.brand}</p>
                      <p className="text-lg font-bold text-purple-600">${item.product.price}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(item.product_id)}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRemoveFromWishlist(item.product_id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
