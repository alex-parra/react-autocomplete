import React from 'react';

import styles from './style.module.scss';

const FieldText = (props) => {
  const { name, label, value, onChange, placeholder = '', autoFocus = false, ...otherProps } = props;

  const handleChange = (ev) => {
    if (typeof onChange !== 'function') return;
    onChange(ev);
  };

  return (
    <div id={name} className={styles.field} {...otherProps}>
      {label && <label htmlFor={`${name}_label`}>{label}</label>}
      <input
        type="text"
        id={`${name}__input`}
        value={value || ''}
        onChange={handleChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
      />
    </div>
  );
};

export default FieldText;
