/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                pathname: '**',
            },
            {
                protocol: 'http',
                hostname: '**',
                pathname: '**',
            },
        ],
    },

    compiler: {
        styledComponents: true,
    },
};

module.exports = nextConfig;
