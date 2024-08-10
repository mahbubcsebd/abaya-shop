/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // unoptimized: true,
        formats: ['image/avif', 'image/webp'],
        // domains: ['admin.abayaa.shop', 'shop.uibarn.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'admin.abayaa.shop',
                port: '',
                pathname: '/storage/**',
            },
            {
                protocol: 'https',
                hostname: 'shop.uibarn.com',
                port: '',
                pathname: '/storage/10/**',
            },
        ],
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};

export default nextConfig;
