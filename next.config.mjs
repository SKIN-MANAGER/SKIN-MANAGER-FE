/* eslint-disable import/no-anonymous-default-export */
export default {
  async rewrites() {
    return [
      {
        source: '/api/:path*', // 요청의 경로 패턴
        destination: 'http://localhost:8080/api/:path*', // 실제 백엔드 서버 URL
      },
    ];
  },
};
