export const API_ENDPOINTS = {
  // AUTH: {
  //   LOGIN: '/auth/login',
  //   REGISTER: '/auth/register',
  //   REFRESH: '/auth/refresh',
  // },
  // USERS: {
  //   BASE: '/users',
  //   BY_ID: (id: number) => `/users/${id}`,
  //   POSTS: (id: number) => `/users/${id}/posts`,
  // },
  PRODUCTS: {
    BASE: 'products',
  },
  SINGLE_PRODUCT: {
    BASE: 'products/',
  },
  REGISTER: {
    BASE: 'auth/login',
  }
} as const;