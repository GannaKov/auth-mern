import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styles from "./RegisterPage.module.css";
import { Link } from "react-router-dom/dist";

const validationSchema = yup.object({
  nickname: yup
    .string("Enter your email")
    .min(3, "Nickname should be of minimum 3 characters length")
    .required("Nickname is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const RegisterPage = () => {
  const formik = useFormik({
    initialValues: {
      nickname: "",
      email: "foobar@example.com",
      password: "foobar",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className={styles.pageWrp}>
      <form onSubmit={formik.handleSubmit} className={styles.registerForm}>
        <TextField
          margin="normal"
          fullWidth
          id="nickname"
          name="nickname"
          label="nickname"
          value={formik.values.nickname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.nickname && Boolean(formik.errors.nickname)}
          helperText={formik.touched.nickname && formik.errors.nickname}
        />
        <TextField
          margin="normal"
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          margin="normal"
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button
          color="primary"
          variant="contained"
          type="submit"
          sx={{ marginTop: "30px" }}
        >
          Sign Up
        </Button>
      </form>
      <Link to={"/login"}>Log In</Link>
    </div>
  );
};

export default RegisterPage;
