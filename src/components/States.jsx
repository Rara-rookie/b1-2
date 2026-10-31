import React from 'react';

export function Loading({ message = '데이터를 불러오는 중입니다...' }) {
  return (
    <div class="state-box">
      <div class="spinner"></div>
      <p>{message}</p>
    </div>
  );
}

export function ErrorState({ message = '오류가 발생했습니다.', onRetry }) {
  return (
    <div class="state-box error">
      <i class="fa-solid fa-circle-exclamation"></i>
      <h3>요청 처리 실패</h3>
      <p>{message}</p>
      {onRetry && (
        <button class="btn btn-secondary" style={{ marginTop: '1rem' }} onClick={onRetry}>
          <i class="fa-solid fa-rotate-right"></i> 다시 시도
        </button>
      )}
    </div>
  );
}

export function EmptyState({ message = '표시할 데이터가 없습니다.', actionText, onAction }) {
  return (
    <div class="state-box">
      <i class="fa-solid fa-box-open"></i>
      <h3>데이터가 존재하지 않습니다</h3>
      <p>{message}</p>
      {actionText && onAction && (
        <button class="btn btn-primary" style={{ marginTop: '1rem' }} onClick={onAction}>
          {actionText}
        </button>
      )}
    </div>
  );
}
