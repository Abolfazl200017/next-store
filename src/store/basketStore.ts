import { Product } from '@/services/api/types';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { mockProducts } from './mockData';

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
  initializeStore: () => void; // Method to set up the store
};

// Create initial state with mock data
const initialState: Pick<BasketState, 'products' | 'loading'> = {
  products: [],
  loading: true,
};

const useBasketStore = create<BasketState>()(
  devtools(
    persist(
      (set) => ({
        // Initial state
        products: initialState.products,
        loading: initialState.loading,

        // Method to initialize the store
        initializeStore: () => {
          set({ loading: true }); // Set loading to true initially
          setTimeout(() => {
            // Simulating an API or data fetch
            set({
              products: process.env.NODE_ENV === 'development' ? mockProducts : [],
              loading: false, // Set loading to false after initialization
            });
          }, 1000); // Simulated delay
        },

        // Add a product
        addProduct: (product, quantity) =>
          set(
            (state) => {
              const existingProduct = state.products.find((p) => p.id === product.id);
              if (existingProduct) {
                return {
                  products: state.products.map((p) =>
                    p.id === product.id
                      ? { ...p, quantity: p.quantity + quantity }
                      : p
                  ),
                };
              }
              return { products: [...state.products, { ...product, quantity }] };
            },
            false,
            'basket/addProduct'
          ),

        // Update product quantity
        updateProductQuantity: (id, quantity) =>
          set(
            (state) => ({
              products: state.products.map((product) =>
                product.id.toString() === id ? { ...product, quantity } : product
              ),
            }),
            false,
            'basket/updateQuantity'
          ),

        // Remove a product
        removeProduct: (id) =>
          set(
            (state) => ({
              products: state.products.filter(
                (product) => product.id.toString() !== id
              ),
            }),
            false,
            'basket/removeProduct'
          ),

        // Reset the store
        reset: () =>
          set(
            { products: initialState.products, loading: false },
            false,
            'basket/reset'
          ),
      }),
      {
        name: 'basket-storage',
      }
    )
  )
);

export default useBasketStore;

export const createTestBasketStore = (customInitialState?: Partial<BasketState>) => {
  return create<BasketState>()((set) => ({
    products: customInitialState?.products || mockProducts,
    loading: false, // Set loading to false for test stores by default
    initializeStore: () => {},
    addProduct: (product, quantity) =>
      set((state) => {
        const existingProduct = state.products.find((p) => p.id === product.id);
        if (existingProduct) {
          return {
            products: state.products.map((p) =>
              p.id === product.id
                ? { ...p, quantity: p.quantity + quantity }
                : p
            ),
          };
        }
        return { products: [...state.products, { ...product, quantity }] };
      }),
    updateProductQuantity: (id, quantity) =>
      set((state) => ({
        products: state.products.map((product) =>
          product.id.toString() === id ? { ...product, quantity } : product
        ),
      })),
    removeProduct: (id) =>
      set((state) => ({
        products: state.products.filter(
          (product) => product.id.toString() !== id
        ),
      })),
    reset: () => set({ products: mockProducts }),
  }));
};
