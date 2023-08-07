/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: false,
    optimizeFonts: false,
    swcMinify: false,
    reactStrictMode: false,
    experimental: {
        serverActions: true,
    }
}

module.exports = nextConfig
