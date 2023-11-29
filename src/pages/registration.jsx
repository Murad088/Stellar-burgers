import React from 'react';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/auth";
import { useDispatch } from "react-redux";
import { registerRequest } from "../services/actions/AuthActions";

export const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const loginClick = () => {
    navigate("/login");
  };
  let auth = useAuth();
  
  const [form, setValue] = useState(() => ({
    name: "",
    email: "",
    password: "",
  }));
  
  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerRequest(form));
  };
  
  return (
    <form className={styles.main} onSubmit={onSubmit}>
      <h2 className="text text_type_main-large mb-6">Регистрация</h2>
      <div className="mb-6">
        <Input
          value={form.name}
          type={"text"}
          placeholder={"Имя"}
          name={"name"}
          onChange={onChange}
        />
      </div>
      <div className="mb-6">
        <Input
          value={form.email}
          type={"email"}
          placeholder={"E-mail"}
          name={"email"}
          onChange={onChange}
        />
      </div>
      <div className="mb-6">
        <Input
          value={form.password}
          type={"password"}
          placeholder={"Пароль"}
          name={"password"}
          icon="ShowIcon"
          onChange={onChange}
        />
      </div>
      <Button htmlType="submit" type="primary" size="medium">Зарегистрироваться</Button>
      <div className={`mt-20 ${styles.footer}`}>
        <p className="text text_type_main-default text_color_inactive">Уже зарегистированы?</p>
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={loginClick}
        >
          Войти
        </Button>
      </div>
    </form>
  );
};