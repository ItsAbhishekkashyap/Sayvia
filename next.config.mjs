/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/(.*)',
          destination: 'https://sayvia.xyz/:path*',
          permanent: true,
        },
      ];
    },
  };
  
  export default nextConfig;
  
