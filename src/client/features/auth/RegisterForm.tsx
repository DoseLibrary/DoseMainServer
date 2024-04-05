import { useState } from "react";
import { Button, PasswordInput, TextInput } from "../../core";
import { useAppDispatch } from "../../app/hooks";
import { registerThunk, resetError } from "./authSlice";
import { addErrorToast, addSuccessToast } from "../toast/toastSlice";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const validateInputs = () => {
    if (username.length < 3) {
      dispatch(addErrorToast('Username must be at least 7 characters long'));
      return false;
    }
    if (password.length < 8) {
      dispatch(addErrorToast('Password must be at least 7 characters long'));
      return false;
    }
    if (password !== repeatPassword) {
      dispatch(addErrorToast('Passwords do not match'));
      return false;
    }
    return true;
  }

  const handleSubmit = () => {
    dispatch(resetError());
    if (validateInputs()) {
      dispatch(registerThunk({ username, password }))
        .then(() => dispatch(addSuccessToast('Successfully registered!')))
        .then(() => navigate('/login'))
        .catch(err => dispatch(addErrorToast(err.message)));
    }
  };

  return (
    <div className="space-y-2">
      <TextInput
        onChange={val => setUsername(val)}
        label="Username"
        description="Enter your username"
        value={username}
        required
      />
      <PasswordInput
        onChange={val => setPassword(val)}
        label="Password"
        description="Enter your password"
        value={password}
        required
      />
      <PasswordInput
        onChange={val => setRepeatPassword(val)}
        label="Repeat password"
        description="Enter your password"
        value={repeatPassword}
        required
      />
      <Button onClick={handleSubmit} label="Register" size="small" className="float-right" />
    </div>
  )
};
