import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../lib/api';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Loading, ErrorState } from '../components/States';

export function ItemFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'React',
    status: 'Pending'
  });

  const [errors, setErrors] = useState({});
  const [fetching, setFetching] = useState(isEdit);
  const [fetchError, setFetchError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit) {
      setFetching(true);
      api.getItemById(id)
        .then((data) => {
          setFormData({
            title: data.title,
            description: data.description,
            category: data.category || 'React',
            status: data.status || 'Pending'
          });
        })
        .catch((err) => {
          setFetchError(err.message || '정보를 불러오지 못했습니다.');
        })
        .finally(() => {
          setFetching(false);
        });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = '제목을 입력해 주세요.';
    } else if (formData.title.trim().length < 2) {
      newErrors.title = '제목은 최소 2자 이상이어야 합니다.';
    }

    if (!formData.description.trim()) {
      newErrors.description = '설명 내용을 입력해 주세요.';
    } else if (formData.description.trim().length < 5) {
      newErrors.description = '설명은 최소 5자 이상 작성해 주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      if (isEdit) {
        await api.updateItem(id, formData);
        navigate(`/items/${id}`);
      } else {
        const created = await api.createItem(formData);
        navigate(`/items/${created.id}`);
      }
    } catch (err) {
      alert(err.message || '저장에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  if (fetching) return <Loading message="기존 Task 정보 불러오는 중..." />;
  if (fetchError) return <ErrorState message={fetchError} />;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/items" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          &larr; 목록으로 돌아가기
        </Link>
      </div>

      <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 'var(--radius-md)', padding: '2.5rem', boxShadow: 'var(--shadow-sm)' }}>
        <h1 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>
          {isEdit ? 'Task 수정하기' : '새 Task 등록하기'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem' }}>
          필수 정보를 입력하여 Task를 {isEdit ? '수정' : '등록'}하세요.
        </p>

        <form onSubmit={handleSubmit} novalidate>
          <Input
            label="제목"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Task 제목을 입력하세요 (예: React SPA 상태 관리 구현)"
            error={errors.title}
            required
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Input
              label="카테고리"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              options={[
                { value: 'React', label: 'React' },
                { value: 'Backend', label: 'Backend' },
                { value: 'UX/UI', label: 'UX/UI' },
                { value: 'DevOps', label: 'DevOps' }
              ]}
            />

            <Input
              label="진행 상태"
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={[
                { value: 'Pending', label: '대기 (Pending)' },
                { value: 'In Progress', label: '진행 중 (In Progress)' },
                { value: 'Completed', label: '완료 (Completed)' }
              ]}
            />
          </div>

          <Input
            label="상세 설명"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="구체적인 작업 목표 및 내용을 입력해 주세요."
            error={errors.description}
            required
            isTextarea
            rows={5}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
            <Button variant="secondary" onClick={() => navigate(-1)} disabled={submitting}>
              취소
            </Button>
            <Button type="submit" variant="primary" loading={submitting}>
              {isEdit ? '수정 저장' : '등록 완료'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
