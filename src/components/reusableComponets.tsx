// InputField.tsx
import React from "react";
import "./custom.css";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange }) => {
  return (
    <div className="input-field">
      <label>{label}</label>
      <input value={value} onChange={(e) => onChange(e)} />
    </div>
  );
};

export default InputField;
