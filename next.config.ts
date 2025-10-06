import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["http://10.53.18.105:3000"],
  /* config options here */
  compress: true,
  images: {
		remotePatterns: [{ hostname: "*" }],
	},
  experimental: {
    authInterrupts: true,
		reactCompiler: true,
		optimizeCss: true,
		optimizeServerReact: true,
		optimizePackageImports: ["lucide-react", "date-fns"],
  },
  async headers(){
    return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "Strict-Transport-Security",
						value: "max-age=63072000; includeSubDomains; preload",
					},
					{
						key: "X-Frame-Options",
						value: "DENY",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "Permissions-Policy",
						value: `camera=(), microphone=(), geolocation=(), midi=(), sync-xhr=(), fullscreen=(self "${process.env.NEXT_PUBLIC_APP_URL}"), geolocation=("${process.env.NEXT_PUBLIC_APP_URL}")`,
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
				],
			},
		];
  }
};

export default nextConfig;
