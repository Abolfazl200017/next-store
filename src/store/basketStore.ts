import { Product } from '@/services/api/types';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { mockProducts } from './mockData';

export type ProductWithQuantity = Product & {
  quantity: number;
};

type BasketState = {
  products: ProductWithQuantity[];
  addProduct: (product: Product, quantity: number) => void;
  updateProductQuantity: (id: string, quantity: number) => void;
  removeProduct: (id: string|number) => void;
  reset: () => void;
};

// Create initial state with mock data
const initialState: Pick<BasketState, 'products'> = {
  products: process.env.NODE_ENV === 'development' ? mockProducts : []
};

const useBasketStore = create<BasketState>()(
  devtools(
    persist(
      (set) => ({
        // Initialize with mock data in development
        products: initialState.products,

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

        reset: () =>
          set(
            { products: initialState.products },
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