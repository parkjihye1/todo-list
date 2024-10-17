/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: "/todo-list",
  // next 이미지 최적화 옵션 off
  images: {
    unoptimized: true
  }
};

export default nextConfig;
