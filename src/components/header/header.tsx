import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./header.css";
import Logo from "../../images/logo.png";
import InputField from "../form/input";
import Button from "../form/button";
import { InputChange, FormSubmit, RootStore } from "../../utills/TypeScript";
import { createUser, login } from "../../redux/action/authAction";

import { FaBars } from "react-icons/fa";
import { ALERT } from "../../redux/types/alertType";
import { CgClose } from "react-icons/cg";

function Header() {
  const [user, setUser] = useState({ username: "" });

  const [click, setClick] = useState(false);
  const [menu, setMenu] = useState(false);

  const dispatch = useDispatch();

  const { auth } = useSelector((state: RootStore) => state);

  const handleChange = (e: InputChange) => {
    const { value } = e.target;
    setUser({ username: value });
  };

  const handleSubmit = async (e: FormSubmit) => {
    e.preventDefault();
    if (!user.username)
      return dispatch({
        type: ALERT,
        payload: { errors: "Username is required." },
      });
    dispatch(login(user));
    handleReset();
    closeMenu();
  };

  const handleClick = async (e: FormSubmit) => {
    e.preventDefault();
    if (!user.username)
      return dispatch({
        type: ALERT,
        payload: { errors: "Username is required." },
      });
    dispatch(createUser(user));
    handleReset();
    closeMenu();
  };

  const MenuClick = () => setClick(!click);

  const closeMenu = () => setClick(false);

  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    setUser({ username: "" });
  };

  useEffect(() => {
    handleReset()
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setMenu(true);
    } else {
      setMenu(false);
    }
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <img src={Logo} className="logo-icon" alt="" />
          <div className="logo-text">
            <h1>TODO</h1>
          </div>
        </Link>
        <form className={click ? "form-field active" : "form-field"}>
          {/* {auth.user?.username && <h1>{auth.user?.username}</h1>} */}

          <InputField
            name="username"
            handleChange={handleChange}
            required={true}
          />

          <Button
            text="Login"
            type="submit"
            onClick={handleSubmit}
            style="btn-outline-primary"
            linkTo="/task"
          />
          <Button
            text="Create"
            onClick={handleClick}
            style="btn-outline-primary"
            type="button"
            linkTo="/task"
          />
        </form>
        {menu && (
          <div className="menu-bar" onClick={MenuClick}>
            {click ? <CgClose /> : <FaBars />}
          </div>
        )}
      </nav>
    </>
  );
}

export default Header;
