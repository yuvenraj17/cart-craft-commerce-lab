
import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';

interface WishlistItem {
  id: string;
  product_id: string;
  created_at: string;
  product: {
    id: string;
    name: string;
    price: number;
    image_url: string;
    brand: string;
  };
}

interface WishlistState {
  items: WishlistItem[];
  loading: boolean;
  fetchWishlistItems: () => Promise<void>;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  getTotalItems: () => number;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],
  loading: false,
  
  fetchWishlistItems: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('wishlist_items')
        .select(`
          id,
          product_id,
          created_at,
          product:products(id, name, price, image_url, brand)
        `);
      
      if (error) throw error;
      set({ items: data || [] });
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
    } finally {
      set({ loading: false });
    }
  },
  
  addToWishlist: async (productId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('wishlist_items')
        .insert({ 
          product_id: productId,
          user_id: user.id 
        });
      
      if (error) throw error;
      await get().fetchWishlistItems();
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  },
  
  removeFromWishlist: async (productId: string) => {
    try {
      const { error } = await supabase
        .from('wishlist_items')
        .delete()
        .eq('product_id', productId);
      
      if (error) throw error;
      await get().fetchWishlistItems();
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  },
  
  isInWishlist: (productId: string) => {
    return get().items.some(item => item.product_id === productId);
  },
  
  getTotalItems: () => {
    return get().items.length;
  },
}));
