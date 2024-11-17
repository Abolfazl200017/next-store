interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
}

export interface Token {
  token: string;
}