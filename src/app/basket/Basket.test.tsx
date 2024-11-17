import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import BasketPage from './page';
import useBasketStore from '@/store/basketStore';
import ThemeRegistry from '@/providers/ThemeRegistry';

global.matchMedia = global.matchMedia || function() {
  return {
    matches: false,  // Default to small screen (false), set to true for larger screen
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };
};

// Mock the store
jest.mock('@/store/basketStore');

// Mock next/link
jest.mock('next/link', () => {
  return ({ children }: { children: React.ReactNode }) => children;
});

// Mock ProductActionsContainer since it's a separate component
jest.mock('@/components/common/ProductActions.tsx', () => {
  return function MockProductActions({ product }: { product: any, isVertical: boolean }) {
    return <div data-testid="product-actions">{product.id}</div>;
  };
});

const mockProducts = [
  {
    id: '1',
    title: 'محصول تست 1',
    price: 100.00,
    quantity: 2,
    image: '/test1.jpg',
  },
  {
    id: '2',
    title: 'محصول تست 2',
    price: 150.50,
    quantity: 1,
    image: '/test2.jpg',
  }
];

const renderBasketPage = () => {
  return render(
    <ThemeRegistry>
      <BasketPage />
    </ThemeRegistry>
  );
};

describe('BasketPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Empty State', () => {
    beforeEach(() => {
      (useBasketStore as unknown as jest.Mock).mockImplementation(() => ({
        products: []
      }));
    });

    it('should render empty basket message when no products', () => {
      renderBasketPage();

      expect(screen.getByText('سبد خرید شما خالی است')).toBeInTheDocument();
      expect(screen.getByRole('img')).toHaveAttribute('src', '/images/empty-basket.svg');
    });
  });

  describe('With Products', () => {
    beforeEach(() => {
      (useBasketStore as unknown as jest.Mock).mockImplementation(() => ({
        products: mockProducts
      }));
    });

    it('should render basket header', () => {
      renderBasketPage();

      expect(screen.getByText('سبد خرید')).toBeInTheDocument();
      const basketIcon = screen.getByTestId('ShoppingBasketIcon');
      expect(basketIcon).toBeInTheDocument();
    });

    it('should render ProductActionsContainer for each product', () => {
      renderBasketPage();

      const productActions = screen.getAllByTestId('product-actions');
      expect(productActions).toHaveLength(mockProducts.length);
      
      // Verify each product has its actions
      mockProducts.forEach((product, index) => {
        expect(productActions[index]).toHaveTextContent(product.id);
      });
    });
  });
});