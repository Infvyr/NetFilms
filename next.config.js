/** @type {import('next').NextConfig} */
const securityHeaders = [
	{
		key: 'X-DNS-Prefetch-Control',
		value: 'on'
	},
	{
		key: 'X-XSS-Protection',
		value: '1; mode=block'
	},
	{
		key: 'X-Frame-Options',
		value: 'SAMEORIGIN'
	},
	{
		key: 'X-Content-Type-Options',
		value: 'nosniff'
	}
];
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['images.pexels.com', 'i.ytimg.com']
	},
	async headers() {
		return [
			{
				source: '/:path*',
				headers: securityHeaders
			}
		];
	}
};

module.exports = nextConfig;
