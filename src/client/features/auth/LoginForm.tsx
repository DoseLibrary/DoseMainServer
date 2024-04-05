import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { Button, PasswordInput, TextInput } from "../../core";
import { loginThunk } from "./authSlice";
import { addErrorToast, addSuccessToast } from "../toast/toastSlice";
import { useState } from "react";
import { AppMode, getCurrentAppmode } from "../../utils/mode-util";
import { LoginWithDose } from "./LoginWithDose";

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isServer = getCurrentAppmode() === AppMode.SERVER;

  const handleSubmit = () => {
    dispatch(loginThunk({ username, password }))
      .then(() => dispatch(addSuccessToast('Successfully logged in!')))
      .then(() => navigate('/'))
      .catch(err => dispatch(addErrorToast(err.message)));
  }

  return (
    <div className="space-y-2">
      <TextInput
        onChange={val => setUsername(val)}
        value={username}
        label="Username"
        description="Enter your username"
      />
      <PasswordInput
        onChange={val => setPassword(val)}
        value={password}
        label="Password"
        description="Enter your password"
      />

      <div className="space-x-2">
        {isServer && <LoginWithDose />}
        <Button onClick={handleSubmit} label="Login" size="small" />
      </div>

    </div>
  )
};
