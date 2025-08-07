import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental : {
        optimizeCss : true // for Combines and minifies CSS
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
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