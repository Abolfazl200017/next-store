import { Product } from '@/services/api/types';
import { create } from 'zustand';

export type ProductWithQuantity = Product & {
  quantity: number;
};

type BasketState = {
  products: ProductWithQuantity[];
  loading: boolean;
  addProduct: (product: Product, quantity: number) => void;
  updateProductQuantity: (id: string, quantity: number) => void;
  removeProduct: (id: string | number) => void;
  reset: () => void;
  initializeStore: () => void;
};

const STORAGE_KEY = 'basket-storage';

// Helper functions for localStorage
const getStorageData = (): ProductWithQuantity[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

const setStorageData = (products: ProductWithQuantity[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
};

const initialState: Pick<BasketState, 'products' | 'loading'> = {
  products: getStorageData(), // Initialize from localStorage
  loading: true,
};

const useBasketStore = create<BasketState>()((set) => ({
  products: initialState.products,
  loading: initialState.loading,

  initializeStore: () => {
    const storedProducts = getStorageData();
    set({
      products: storedProducts,
      loading: false,
    });
  },

  addProduct: (product, quantity) =>
    set((state) => {
      const existingProduct = state.products.find((p) => p.id === product.id);
      let newProducts;
      
      if (existingProduct) {
        newProducts = state.products.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + quantity }
            : p
        );
      } else {
        newProducts = [...state.products, { ...product, quantity }];
      }
      
      // Save to localStorage
      setStorageData(newProducts);
      
      return { products: newProducts };
    }),

  updateProductQuantity: (id, quantity) =>
    set((state) => {
      const newProducts = state.products.map((product) =>
        product.id.toString() === id ? { ...product, quantity } : product
      );
      
      // Save to localStorage
      setStorageData(newProducts);
      
      return { products: newProducts };
    }),

  removeProduct: (id) =>
    set((state) => {
      const newProducts = state.products.filter(
        (product) => product.id.toString() !== id.toString()
      );
      
      // Save to localStorage
      setStorageData(newProducts);
      
      return { products: newProducts };
    }),

  reset: () => {
    // Clear localStorage and reset state
    localStorage.removeItem(STORAGE_KEY);
    set({ products: [], loading: true });
  },
}));

export default useBasketStore;

// Test store version
export const createTestBasketStore = (customInitialState?: Partial<BasketState>) => {
  const mockStorageKey = 'test-basket-storage';
  
  const getTestStorageData = (): ProductWithQuantity[] => {
    try {
      const data = localStorage.getItem(mockStorageKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading from test localStorage:', error);
      return [];
    }
  };

  const setTestStorageData = (products: ProductWithQuantity[]) => {
    try {
      localStorage.setItem(mockStorageKey, JSON.stringify(products));
    } catch (error) {
      console.error('Error writing to test localStorage:', error);
    }
  };

  return create<BasketState>()((set) => ({
    products: customInitialState?.products || getTestStorageData(),
    loading: false,
    
    initializeStore: () => {
      const storedProducts = getTestStorageData();
      set({ products: storedProducts, loading: false });
    },
    
    addProduct: (product, quantity) =>
      set((state) => {
        const existingProduct = state.products.find((p) => p.id === product.id);
        let newProducts;
        
        if (existingProduct) {
          newProducts = state.products.map((p) =>
            p.id === product.id
              ? { ...p, quantity: p.quantity + quantity }
              : p
          );
        } else {
          newProducts = [...state.products, { ...product, quantity }];
        }
        
        setTestStorageData(newProducts);
        return { products: newProducts };
      }),

    updateProductQuantity: (id, quantity) =>
      set((state) => {
        const newProducts = state.products.map((product) =>
          product.id.toString() === id ? { ...product, quantity } : product
        );
        
        setTestStorageData(newProducts);
        return { products: newProducts };
      }),

    removeProduct: (id) =>
      set((state) => {
        const newProducts = state.products.filter(
          (product) => product.id.toString() !== id.toString()
        );
        
        setTestStorageData(newProducts);
        return { products: newProducts };
      }),

    reset: () => {
      localStorage.removeItem(mockStorageKey);
      set({ products: [], loading: false });
    },
  }));
};