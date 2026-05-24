// frontend/src/app/layout.tsx
import '../styles/globals.css';
import React from 'react';

export const metadata = {
  title: 'AAA TEAM 실시간 대시보드 갤러리',
  description: 'Next.js, Supabase, n8n 기반의 실시간 데이터 파이프라인 대시보드',
};

/**
 * 전역 Layout 컴포넌트입니다.
 * 프리미엄 HSL 타이포그래피 및 globals.css를 통합 로드합니다.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
