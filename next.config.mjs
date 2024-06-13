/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // unoptimized: true,
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'shop.uibarn.com',
                port: '',
                pathname: '/storage/**',
            },
        ],
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};

export default nextConfig;
