import fs from "fs";
import path from "path";
import type { NextConfig } from "next";

const routesPath = path.join(process.cwd(), "content", "replica-routes.json");
const replicaRoutes: string[] = fs.existsSync(routesPath)
  ? (JSON.parse(fs.readFileSync(routesPath, "utf8")) as string[])
  : [];

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/replica/index.html" },
        { source: "/documents/download", destination: "/replica/document-download.html" },
        ...replicaRoutes.map((route) => ({
          source: `/${route}`,
          destination: `/replica/${route}.html`,
        })),
      ],
    };
  },
};

export default nextConfig;
