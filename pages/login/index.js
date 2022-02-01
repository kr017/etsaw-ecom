import { Button, Grid, TextField } from "@material-ui/core";
import { useRouter, withRouter } from "next/router";
import { useEffect, useRef } from "react";
import { loginUser } from "../api";
import styles from "../../styles/Login.module.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/user.slice";

const Login = props => {
  const router = useRouter();
  const dispatch = useDispatch();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  useEffect(() => {}, []);

  const handleSubmit = e => {
    e.preventDefault();

    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    const data = {
      email,
      password,
    };
    loginUser(data).then(res => {
      let results = JSON.parse(res.body);
      if (results && results.data) {
        let userID = results.data[0].id;
        let data = results.data[0].fields;
        data.id = userID;

        dispatch(setUser(data));
        router.push("/");
      }
    });
  };
  return (
    <div className={styles.container}>
      <span className={styles.loginLabel}>Login</span>
      <Grid className={styles.inputContainer}>
        <Grid className={styles.inputholder}>
          <TextField
            name="email"
            type="email"
            required
            id="email"
            inputRef={emailInputRef}
            placeholder="email"
            value={"admin@gmail.com"}
            variant="outlined"
            size="small"
            className={styles.input}
            color="primary"
          />
        </Grid>
        <Grid className={styles.inputholder}>
          <TextField
            name="password"
            type="passowrd"
            required
            id="password"
            inputRef={passwordInputRef}
            placeholder="password"
            defaultValue={"123456"}
            variant="outlined"
            size="small"
            className={styles.input}
            color="primary"
          />
        </Grid>

        <Button
          onClick={handleSubmit}
          className={styles.submitBtn}
          style={{ padding: "8px 28px" }}
          variant="contained"
          color="secondary"
        >
          Login
        </Button>
      </Grid>
    </div>
  );
};

export default withRouter(Login);
