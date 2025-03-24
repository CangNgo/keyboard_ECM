// src/pages/Login.tsx
import React, { useState, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { login } from "../../apis/userAPI";
import Button from "../../components/commons/Button";
import TextField from "../../components/commons/TextField";
import { useAuth } from "../../store/AuthContext";

interface LoginData {
  username: string;
  password: string;
}

interface LoginResponse {
  access: string;
  data: {
    username: string;
    // Thêm các thuộc tính khác nếu API trả về
  };
}

function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const [errorUsername, setErrorUsername] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");

  const handleCheckUsername = (username: string): boolean => {
    if (!username) {
      setErrorUsername("Vui lòng nhập username");
      return false;
    }
    setErrorUsername("");
    return true;
  };

  const handleCheckPassword = (password: string): boolean => {
    if (!password) {
      setErrorPassword("Password không được để trống");
      return false;
    }
    setErrorPassword("");
    return true;
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    const isUsernameValid = handleCheckUsername(username);
    const isPasswordValid = handleCheckPassword(password);

    if (!isUsernameValid || !isPasswordValid) return;

    try {
      const loginData: LoginData = { username, password };
      const response = await login(loginData) as LoginResponse;
      
      if (response) {
        authLogin(response.data, response.access);
        toast.success("Đăng nhập thành công");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        toast.error("Đăng nhập thất bại");
      }
    } catch (error: unknown) {
      toast.error("Tài khoản không tồn tại");
    }
  };

  return (
    <div className="flex h-screen flex-col w-screen justify-center items-center">
      <div className="back fixed top-0 right-0">
        <Button className="p-3 text-xl text-black" to="/">
          X
        </Button>
      </div>
      <div className="w-80">
        <div className="font-bold text-4xl text-left p-2">Đăng nhập</div>
        <TextField
          tabIndex={1}
          type="text"
          onChange={handleEmail}
          label="text"
          placeholder="Username"
          error={errorUsername}
        />
        <TextField
          tabIndex={2}
          type="password"
          onChange={handlePassword}
          label="Password"
          placeholder="Password"
          error={errorPassword}
        />
        <div className="p-2">
          <Button
            outline
            large
            primary
            className="bg-transparent hover:bg-yellow-100 active:border-indigo-400"
            onClick={handleLogin}
          >
            Đăng nhập
          </Button>
        </div>
        <div className="pr-2 flex flex-row-reverse">
          <Link to="/dang-ky" className="text-black hover:text-yellow-400">
            Đăng ký
          </Link>
        </div>
        <Toaster richColors position="top-right" />
      </div>
    </div>
  );
}

export default Login;