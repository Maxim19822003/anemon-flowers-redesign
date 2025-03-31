/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: '.next',
  output: 'export',
  // basePath: '/anemon-flowers', // Закомментировано для локального просмотра
  
  // Закомментируем экспериментальные функции, которые могут вызывать проблемы
  /*
  experimental: {
    turbo: {
      resolveAlias: {
        '@svgr/webpack': '@svgr/webpack',
      },
    },
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  */
  
  images: {
    unoptimized: true, // Это правильно для статического экспорта
    // Упростим конфигурацию изображений
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Закомментируем redirects, которые могут вызывать проблемы
  /*
  async redirects() {
    return [
      {
        source: '/#:section*',
        destination: '/:section*',
        permanent: true,
      },
    ];
  },
  */
  
  // Оставим webpack конфигурацию для SVG
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;