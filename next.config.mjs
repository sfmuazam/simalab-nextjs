/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // atau 'http' jika diperlukan
        hostname: 'utfs.io',
        port: '',
        pathname: '/**', // ini akan mencocokkan semua path
      },
      {
        protocol: 'https', // atau 'http' jika diperlukan
        hostname: 'api.slingacademy.com',
        port: '',
        pathname: '/**', // ini akan mencocokkan semua path
      },
    ],
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // gantikan dengan origin Anda yang sebenarnya
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ],
      },
    ];
  },
};

export default nextConfig;
