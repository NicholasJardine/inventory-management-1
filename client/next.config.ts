// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;



import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nj-inventory-management-1.s3.af-south-1.amazonaws.com',
        port: "",
        pathname: "/**"
      },
    ],
  },
};

export default nextConfig;
