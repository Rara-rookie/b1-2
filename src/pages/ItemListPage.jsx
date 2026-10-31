import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useItems } from '../hooks/useItems';
import { Card } from '../components/Card';
import { Loading, ErrorState, EmptyState } from '../components/States';

export function ItemListPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const { items, loading, error, refetch } = useItems({ search, category });

  return (
    <div>
      <div class="page-header">
        <h1 class="page-title">Tasks 목록</h1>
        <p class="page-desc">등록된 모든 Task 항목을 조회하고 검색/필터링할 수 있습니다.</p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', background: 'var(--card-bg)', border: '1px solid var(--card-border)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
        <div style={{ flex: 1, minWidth: '240px' }}>
          <input
            type="text"
            placeholder="제목 또는 설명 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            class="input-field"
          />
        </div>
        <div style={{ width: '180px' }}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            class="select-field"
          >
            <option value="">모든 카테고리</option>
            <option value="React">React</option>
            <option value="Backend">Backend</option>
            <option value="UX/UI">UX/UI</option>
            <option value="DevOps">DevOps</option>
          </select>
        </div>
        <Link to="/items/new" class="btn btn-primary">
          <i class="fa-solid fa-plus"></i> Task 추가
        </Link>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : items.length === 0 ? (
        <EmptyState
          message={search || category ? '검색/필터 조건에 일치하는 Task가 없습니다.' : '등록된 Task가 없습니다.'}
          actionText="+ 첫 Task 생성하기"
          onAction={() => window.location.assign('/items/new')}
        />
      ) : (
        <div class="card-grid">
          {items.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
