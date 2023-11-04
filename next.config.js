/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: 'export',
    images: { unoptimized: true },
    env: {
        NEXT_PUBLIC_BASE_URL: process.env.BASE_URL,
    },
};

module.exports = nextConfig;
