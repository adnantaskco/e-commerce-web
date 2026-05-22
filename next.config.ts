import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "azseller.s3.amazonaws.com",
      "upload.wikimedia.org",
       "prestashop.codezeel.com",
       "i.ibb.co",
    ],
  },
};

export default nextConfig;