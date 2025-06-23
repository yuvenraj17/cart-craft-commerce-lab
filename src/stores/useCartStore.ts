import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    image_url: string;
    brand: string;
  };
}

interface CartState {
  items: CartItem[];
  loading: boolean;
  fetchCartItems: () => Promise<void>;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  loading: false,
  
  fetchCartItems: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          id,
          product_id,
          quantity,
          product:products(id, name, price, image_url, brand)
        `);
      
      if (error) throw error;
      set({ items: data || [] });
    } catch (error) {
      console.error('Error fetching cart items:', error);
    } finally {
      set({ loading: false });
    }
  },
  
  addToCart: async (productId: string, quantity = 1) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('cart_items')
        .upsert(
          { 
            product_id: productId, 
            quantity,
            user_id: user.id 
          },
          { onConflict: 'user_id,product_id' }
        );
      
      if (error) throw error;
      await get().fetchCartItems();
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },
  
  updateQuantity: async (productId: string, quantity: number) => {
    try {
      if (quantity <= 0) {
        await get().removeFromCart(productId);
        return;
      }
      
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('product_id', productId);
      
      if (error) throw error;
      await get().fetchCartItems();
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    }
  },
  
  removeFromCart: async (productId: string) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('product_id', productId);
      
      if (error) throw error;
      await get().fetchCartItems();
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  },
  
  clearCart: async () => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all user's items
      
      if (error) throw error;
      set({ items: [] });
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  },
  
  getTotalPrice: () => {
    return get().items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  },
  
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
}));
