import React from 'react';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
      <h1 style={{ fontSize: '6rem', fontWeight: 800, color: 'var(--accent-color)', lineHeight: 1 }}>404</h1>
      <h2 style={{ fontSize: '1.8rem', margin: '1rem 0' }}>페이지를 찾을 수 없습니다</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        요청하신 주소가 변경되었거나 존재하지 않는 페이지입니다.
      </p>
      <Link to="/" class="btn btn-primary btn-lg">
        <i class="fa-solid fa-house"></i> 홈으로 돌아가기
      </Link>
    </div>
  );
}
