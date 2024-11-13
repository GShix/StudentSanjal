import React from 'react';

interface SelectProps {
  label: string;
  name: string;
  id?: string;
  options: Record<string, string>; // { value: label }
  className?: string;
  helperText?: string;
  selected?: string | null;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectInput: React.FC<SelectProps> = ({
  label,
  name,
  id = '',
  options,
  className = '',
  helperText = '',
  selected = null,
  error,
  onChange,
}) => {
  return (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-semibold mb-2 text-gray-600">
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={selected ?? ''}
        onChange={onChange}
        className={`py-2 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-600 focus:ring-0 ${className}`}
        aria-describedby={`helper-${id}`}
      >
        {Object.entries(options).map(([value, option]) => (
          <option key={value} value={value}>
            {option}
          </option>
        ))}
      </select>
      {helperText && (
        <p className="text-sm text-gray-500 mt-2" id={`helper-${id}`}>
          {helperText}
        </p>
      )}
      {error && <p className="text-sm mt-2 text-red-600">{error}</p>}
    </div>
  );
};

export default SelectInput;
