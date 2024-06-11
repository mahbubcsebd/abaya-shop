/** @type {import('next').NextConfig} */
const nextConfig = {
    // images: {
    //     domains: ['shop.uibarn.com'],
    // },
    // images: {
    //     remotePatterns: [
    //         {
    //             protocol: 'https',
    //             hostname: 'shop.uibarn.com',
    //         },
    //     ],
    // },
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
};

export default nextConfig;
