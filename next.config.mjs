/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Next.js 정적 파일 단독 내보내기(SSG Export) 활성화
  output: 'export',
  // 하브리드 배포 경로에 맞게 베이스 경로 매핑
  basePath: '/dashboard',
  // 정적 빌드 시 Next.js 이미지 최적화 서버 미작동 오류를 예방하기 위한 옵션
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
