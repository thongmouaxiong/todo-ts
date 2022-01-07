import React from "react";
import './style.css'

const InputField = (props: any) => {
  return (
    <input
      className={`input-field ${props.size} form-control`}
      id={props.name}
      name={props.name}
      value={props.value}
      onChange={props.handleChange}
      placeholder={`Enter ${props.name}`}
      type={props.type}
      required={props.required}
    ></input>
  );
};

export default InputField;
