// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    headers: async () => [
        {
          source: '/:path*',
          headers: [
            {
              key: 'CDN-Cache-Control',
              value: 'public, max-age=3600'
            }
          ],
        },
    ],
    images : {
        remotePatterns : [
            {
                protocol : "https",
                hostname : "*"
            }
        ]
    }
};
 
export default withNextIntl(nextConfig);