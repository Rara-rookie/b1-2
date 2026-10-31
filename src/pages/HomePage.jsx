import React from 'react';
import { Link } from 'react-router-dom';
import { useItems } from '../hooks/useItems';
import { Card } from '../components/Card';
import { Loading } from '../components/States';

export function HomePage() {
  const { items, loading } = useItems();

  const totalCount = items.length;
  const completedCount = items.filter((i) => i.status === 'Completed').length;
  const inProgressCount = items.filter((i) => i.status === 'In Progress').length;

  return (
    <div>
      <div class="page-header" style={{ marginBottom: '3rem' }}>
        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--accent-color)', textTransform: 'uppercase' }}>
          React SPA Dashboard
        </span>
        <h1 class="page-title">버튼 누르면 화면이 스르륵 바뀌는 Task Tracker</h1>
        <p class="page-desc">
          React 18 + React Router v6 기반으로 라우팅, 컴포넌트 분리, 비동기 상태 관리 및 CRUD 기능을 제공하는 SPA 서비스입니다.
        </p>
        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
          <Link to="/items" class="btn btn-primary">
            <i class="fa-solid fa-list"></i> Task 목록 보기
          </Link>
          <Link to="/items/new" class="btn btn-outline">
            <i class="fa-solid fa-plus"></i> 새 Task 등록
          </Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>전체 Task 수</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--accent-color)' }}>{loading ? '-' : totalCount}</div>
        </div>
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>진행 중 (In Progress)</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--warning-color)' }}>{loading ? '-' : inProgressCount}</div>
        </div>
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>완료됨 (Completed)</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--success-color)' }}>{loading ? '-' : completedCount}</div>
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.4rem' }}>최근 등록된 Task</h2>
        <Link to="/items" style={{ color: 'var(--accent-color)', fontWeight: 600, fontSize: '0.9rem' }}>
          전체보기 &rarr;
        </Link>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div class="card-grid">
          {items.slice(0, 3).map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
