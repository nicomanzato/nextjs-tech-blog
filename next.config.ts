import type { NextConfig } from "next";

const apiUrl = new URL(
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api",
);

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    // ponytail: backend runs on localhost in dev, which Next's image
    // optimizer blocks by default as an SSRF guard. Only relaxed in dev —
    // prod's PUBLIC_URL is a real public host so this never applies there.
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",
    remotePatterns: [
      { protocol: "https", hostname: "lite-tech-api.litebox.ai" },
      {
        protocol: apiUrl.protocol.replace(":", "") as "http" | "https",
        hostname: apiUrl.hostname,
        port: apiUrl.port,
      },
    ],
  },
};

export default nextConfig;
