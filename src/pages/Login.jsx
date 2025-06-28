import { useFileHandler, useInputValidation } from '6pp';
import { CameraAlt as CameraAltButton } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { VisuallyHiddenInput } from '../components/styles/styledComponent';
import { server } from '../constants/config';
import { userExists } from '../redux/reducers/auth';
import { usernameValidator } from '../redux/utils/validator.js';

const Login = () => {

  const [isLogin, setIsLogin] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const toggleLogin = () => {
    setIsLogin(prev => !prev);
  };

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const password = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const avatar = useFileHandler("single");

  const dispatch = useDispatch();


  const handleLogin = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging in...");
    setIsLoading(true);
    const config = {
      withCredentials: true, headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const { data } = await axios.post(`${server}/api/v1/user/login`, { username: username.value, password: password.value }, config);
      dispatch(userExists(data.user));
      toast.success(data.message, {
        toastId
      });
      toast.dismiss(toastId);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", {
        toastId
      });
    } finally {
      setIsLoading(false);
      toast.dismiss(toastId);

    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Signing up...");
    setIsLoading(true);
    const formData = new FormData();
    formData.append("avatar", avatar.file);
    console.log("avatar file:", avatar);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    const config = {
      withCredentials: true, headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    try {
      const { data } = await axios.post(`${server}/api/v1/user/new`, formData, config);
      dispatch(userExists(data.user));
      toast.success(data.message, {
        toastId
      });
      toast.dismiss(toastId);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", {
        toastId
      });
    } finally {
      setIsLoading(false);
    }


  }


  return (
    <Container component={"main"} maxWidth="xs"
      sx={{
        height: "max(100vh,500px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Paper elevation={3}
        sx={{
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>{
          isLogin ? <>
            <Typography variant="h5">Login</Typography>
            <form style={{ width: "100%", marginTop: "1rem" }}
              onSubmit={handleLogin}>
              <TextField required fullWidth label="Username" margin='normal' variant="outlined"
                value={username.value}
                onChange={username.changeHandler} />


              <TextField required fullWidth label="Password" type='password' margin='normal' variant="outlined"
                value={password.value}
                onChange={password.changeHandler} />

              <Button sx={{ marginTop: "1rem", }} variant='contained' color='primary' type='submit' fullWidth disabled={isLoading} >Login</Button>

              <Typography textAlign={"center"} m={"1rem"}>or</Typography>
              <Button sx={{ marginTop: "1rem", }} variant='text' fullWidth onClick={toggleLogin} disabled={isLoading} >Register here</Button>
            </form>
          </> : <>
            <Typography variant="h5">SignUp</Typography>
            <form style={{ width: "100%", marginTop: "1rem" }}
              onSubmit={handleSignUp}>
              <Stack position={"relative"} width={"10rem"} margin={"auto"} >
                <Avatar sx={{ width: "10rem", height: "10rem", objectFit: "contain" }} src={avatar.preview} />

                <IconButton sx={{
                  position: "absolute",
                  bottom: 0, right: 0,
                  bgcolor: "rgba(0,0,0,0.5)",
                  ":hover": {
                    bgcolor: "rgba(0,0,0,0.7)",
                  },
                  color: "white",
                }}
                  component="label"
                >
                  <>
                    <CameraAltButton />
                    <VisuallyHiddenInput type="file" onChange={avatar.changeHandler} />
                  </>
                </IconButton>
              </Stack>
              {avatar.error && (
                <Typography variant="caption" color="error" display={"block"} width={"fit-content"} m={"1rem auto"}>
                  {avatar.error}
                </Typography>
              )}
              <TextField required fullWidth label="Name" margin='normal' variant="outlined"
                value={name.value}
                onChange={name.changeHandler} />
              <TextField required fullWidth label="Bio" margin='normal' variant="outlined"
                value={bio.value}
                onChange={bio.changeHandler} />
              <TextField required fullWidth label="Username" margin='normal' variant="outlined"
                value={username.value}
                onChange={username.changeHandler} />
              {username.error && (
                <Typography variant="caption" color="error">
                  {username.error}
                </Typography>
              )}
              <TextField required fullWidth label="Password" type='password' margin='normal' variant="outlined"
                value={password.value}
                onChange={password.changeHandler} />
              {password.error && (
                <Typography variant="caption" color="error">
                  {password.error}
                </Typography>
              )}
              <Button sx={{ marginTop: "1rem", }} variant='contained' color='primary' type='submit' fullWidth disabled={isLoading}>SignUp</Button>

              <Typography textAlign={"center"} m={"1rem"}>or</Typography>
              <Button sx={{ marginTop: "1rem", }} variant='text' fullWidth onClick={toggleLogin} disabled={isLoading}>Login Instead</Button>
            </form>
          </>
        }
      </Paper>
    </Container>
  )
}

export default Login
