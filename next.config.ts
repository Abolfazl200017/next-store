import type { NextConfig } from 'next';

import withPWA from 'next-pwa';

const config = {
  i18n: {
    locales: ['fa'],
    defaultLocale: 'fa',
  },
};

const nextConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
})(config) as NextConfig;

export default nextConfig;