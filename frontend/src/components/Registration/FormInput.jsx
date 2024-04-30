// FormInput.jsx
import React from 'react';
import './FormInput.css';

const FormInput = ({ name, type, placeholder, label, value, onChange, star, options }) => {
  if (type === 'select') {
    return (
      <div className="formInput">
        <label htmlFor={name}>{label}</label>
        <select
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          required
          className='select-form-input'
        >
          <option value="" disabled>Select {label}</option>
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="formInput">
      <label htmlFor={name}>{label} {star && <span>*</span>}</label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default FormInput;
