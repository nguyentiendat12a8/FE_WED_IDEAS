import React from "react";
import "./styles/input.scss";

const Input = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  children,
  label,
  defaultValue,
}) => {
  let input = (
    <input
      className="input"
      type={type}
      name={name}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      defaultValue={defaultValue}
      autoComplete={type === "password" ? "off" : "on"}
    />
  );

  if (type === "textarea") {
    input = (
      <textarea
        className="input"
        name={name}
        onChange={onChange}
        cols="30"
        rows="10"
        value={value}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    );
  }

  if (type === "select") {
    input = (
      <select className="input" name={name} onChange={onChange} value={value}>
        {children}
      </select>
    );
  }

  return (
    <div className="input-container">
      {label && <label> {label} </label>}
      {input}
    </div>
  );
};

export default Input;
