import React from 'react';
import { Link } from 'react-router-dom';

export function Card({ item }) {
  const { id, title, description, category, status, createdAt } = item;

  const dateStr = new Date(createdAt).toLocaleDateString('ko-KR');

  return (
    <article class="item-card">
      <div>
        <span class="card-badge">{category}</span>
        <h3 class="card-title">
          <Link to={`/items/${id}`}>{title}</Link>
        </h3>
        <p class="card-desc">{description}</p>
      </div>

      <div class="card-footer">
        <span class="status-tag">
          <i class="fa-solid fa-circle-dot" style={{ color: status === 'Completed' ? 'var(--success-color)' : 'var(--accent-color)' }}></i> {status}
        </span>
        <span>{dateStr}</span>
      </div>
    </article>
  );
}
