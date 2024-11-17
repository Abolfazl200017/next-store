import { ProductWithQuantity } from "./basketStore";

export const mockProducts: ProductWithQuantity[] = [
  {
    id: 1,
    title: 'Nike Air Max 270',
    price: 150.99,
    quantity: 1,
    image: '/images/products/nike-air-max.jpg',
    description: 'Classic Nike sneakers with Air technology',
    category: 'Shoes',
    rating: {
      count: 150,
      rate: 3
    },
  },
  {
    id: 2,
    title: 'Adidas Ultra Boost',
    price: 180.50,
    quantity: 2,
    image: '/images/products/adidas-ultra-boost.jpg',
    description: 'Premium running shoes with Boost technology',
    category: 'Shoes',
    rating: {
      count: 15,
      rate: 5,
    },
  },
  {
    id: 3,
    title: 'Puma RS-X',
    price: 120.00,
    quantity: 1,
    image: '/images/products/puma-rsx.jpg',
    description: 'Retro-style sneakers with modern comfort',
    category: 'Shoes',
    rating: {
      count: 50,
      rate: 4,
    },
  }
];