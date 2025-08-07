import createNextIntlPlugin from 'next-intl/plugin';
import withBundleAnalyzer from "@next/bundle-analyzer";
 
const withNextIntl = createNextIntlPlugin();
const bundleAnalyzer = withBundleAnalyzer({
    enabled : process.env.ANALYZE === "true"
})
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    compress : true,
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
 
export default bundleAnalyzer(withNextIntl(nextConfig));