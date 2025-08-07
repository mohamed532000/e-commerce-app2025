import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    compress : true,
    swcMinify : true,
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
        styledComponents : true
    },
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