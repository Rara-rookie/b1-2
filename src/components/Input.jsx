import React from 'react';

export function Input({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error = '',
  required = false,
  isTextarea = false,
  rows = 4,
  options = null
}) {
  return (
    <div class="input-wrapper">
      {label && (
        <label htmlFor={id} class="input-label">
          {label} {required && <span class="required">*</span>}
        </label>
      )}

      {isTextarea ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          class={`textarea-field ${error ? 'error' : ''}`}
        />
      ) : options ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          class={`select-field ${error ? 'error' : ''}`}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          class={`input-field ${error ? 'error' : ''}`}
        />
      )}

      <span class="input-error-text">{error}</span>
    </div>
  );
}
