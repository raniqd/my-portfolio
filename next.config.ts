import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Three.js and WebGL-related packages
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],

  // Turbopack config (default in Next.js 16+)
  turbopack: {},

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ["framer-motion", "gsap"],
  },
};

export default nextConfig;
