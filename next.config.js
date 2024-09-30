// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jjkv.github.io",
        port: "",
        pathname: "/jazzy_vintage_cube_images/output_images/**",
      },
    ],
  },
};

module.exports = nextConfig;
