import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Button = (props: any) => {
  return (
      <button
        className={`btn-field btn ${props.style}`}
        type={props.type}
        onClick={props.onClick}
      >
        {/* <Link to={`${props.linkTo}`} className="btn-link"> */}
            {props.text}
        {/* </Link> */}
        
      </button>
  );
};

export default Button;
