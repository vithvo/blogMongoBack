import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import styles from "./Login.module.scss";
import { fetchRegister, isAuthSelector } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";

export const Registration = () => {
  const isAuth = useSelector(isAuthSelector);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,

    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "Ivan Ivanov",
      email: "ivan@test.ru",
      password: "123456",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      alert("Не удалось зарегистрироваться");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper elevation={0} classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          // label="Полное имя"
          fullWidth
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register("fullName", { required: "Укажите полное имя" })}
        />
        <TextField
          className={styles.field}
          // label="E-Mail"
          fullWidth
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "Укажите почту" })}
        />
        <TextField
          className={styles.field}
          // label="Пароль"
          fullWidth
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", { required: "Укажите пароль" })}
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
