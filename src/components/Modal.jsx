import React from 'react';
import { Button } from './Button';

export function Modal({ isOpen, title, children, onConfirm, onCancel, confirmText = '확인', cancelText = '취소', loading = false }) {
  if (!isOpen) return null;

  return (
    <div class="modal-backdrop" onClick={onCancel}>
      <div class="modal-content" onClick={(e) => e.stopPropagation()}>
        <div class="modal-header">{title}</div>
        <div class="modal-body">{children}</div>
        <div class="modal-actions">
          <Button variant="secondary" onClick={onCancel} disabled={loading}>
            {cancelText}
          </Button>
          <Button variant="danger" onClick={onConfirm} loading={loading}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
