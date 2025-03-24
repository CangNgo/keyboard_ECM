import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { login } from "../../apis/userAPI";
import Button from "../../components/commons/Button";
import TextField from "../../components/commons/TextField";

interface Logo {
  name: string;
  src: string;
}

// interface LoginProps {
//   username?: string;
//   currency?: string;
//   type?: string;
// }

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate()
  let checkUsername = false;
  let checkPassowrd = false;
  //error
  const [errorUsername, setErrorUsername] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const navigate = useNavigate();

  //check
  const handleCheckUsername = (username: string) => {
    if (username === "") {
      setUsername("Vui lòng nhập username");
      return;
    }
    setUsername("");
    checkUsername = true;
  };

  const handleCheckPassword = (password: string) => {
    if (password === "") {
      setErrorPassword("Password không được để trống");
      return;
    }

    // if (password.length < 8) {
    //   setErrorPassword("Mật khẩu không được bé hơn 8 ");
    //   return;
    // }

    setErrorPassword("");
    checkPassowrd = true;
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    handleCheckUsername(username);
    handleCheckPassword(password);
    //kiem tra du lieu

    try {
      if (!username || !checkPassowrd) return;
      const loginData = {
        username,
        password,
      };
      const response = await login(loginData);
      console.log("login page" ,response);

      if (response) {
        localStorage.setItem("auth_token", response.access);
        // localStorage.setItem(
        //   "auth_role",
        //   response.data.role ? "ADMIN" : "SUPPER_ADMIN"
        // );
        toast.success("Đăng nhập thành công")
        setTimeout(() => {
          navigate("/")
        }, 1500)

      } else {
        toast.success("Đăng nhập thất bại");
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
        <div className="">
          <img src="" alt="" />
        </div>
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
            className=" bg-transparent hover:bg-yellow-100 active:border-indigo-400"
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
