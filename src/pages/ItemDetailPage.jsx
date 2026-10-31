import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useItemDetail } from '../hooks/useItems';
import { api } from '../lib/api';
import { Loading, ErrorState } from '../components/States';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';

export function ItemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { item, loading, error, refetch } = useItemDetail(id);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDeleteConfirm = async () => {
    setDeleteLoading(true);
    try {
      await api.deleteItem(id);
      setIsDeleteModalOpen(false);
      navigate('/items');
    } catch (err) {
      alert(err.message || '삭제에 실패했습니다.');
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) return <Loading message="상세 정보를 불러오는 중입니다..." />;
  if (error || !item) return <ErrorState message={error || '아이템을 찾을 수 없습니다.'} onRetry={refetch} />;

  const createdDate = new Date(item.createdAt).toLocaleString('ko-KR');

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/items" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          &larr; 목록으로 돌아가기
        </Link>
      </div>

      <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 'var(--radius-md)', padding: '2.5rem', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <span class="card-badge">{item.category}</span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>등록일: {createdDate}</span>
        </div>

        <h1 style={{ fontSize: '1.8rem', marginBottom: '1.25rem' }}>{item.title}</h1>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.85rem', borderRadius: '12px', backgroundColor: 'var(--bg-tertiary)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '2rem' }}>
          상태: <span style={{ color: item.status === 'Completed' ? 'var(--success-color)' : 'var(--accent-color)' }}>{item.status}</span>
        </div>

        <div style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap', lineHeight: 1.8, marginBottom: '2.5rem', borderTop: '1px solid var(--card-border)', paddingTop: '1.5rem' }}>
          {item.description}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', borderTop: '1px solid var(--card-border)', paddingTop: '1.5rem' }}>
          <Link to={`/items/${id}/edit`} class="btn btn-secondary">
            <i class="fa-solid fa-pen-to-square"></i> 수정하기
          </Link>
          <Button variant="danger" onClick={() => setIsDeleteModalOpen(true)}>
            <i class="fa-solid fa-trash-can"></i> 삭제하기
          </Button>
        </div>
      </div>

      {/* Modal Confirmation */}
      <Modal
        isOpen={isDeleteModalOpen}
        title="Task 삭제 확인"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalOpen(false)}
        loading={deleteLoading}
        confirmText="삭제"
        cancelText="취소"
      >
        정말로 <strong>"{item.title}"</strong> Task를 삭제하시겠습니까? 삭제된 정보는 복구할 수 없습니다.
      </Modal>
    </div>
  );
}
