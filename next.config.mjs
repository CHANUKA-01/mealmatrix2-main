/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "images.pexels.com" }],
  },
  transpilePackages: ["react-big-calendar"], // 👈 added this
};

export default nextConfig;
