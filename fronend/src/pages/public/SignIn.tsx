import React, { useEffect, useState } from "react";
import axios from "axios";
import TextField from "../../components/commons/TextField";
import Button from "../../components/commons/Button";
import Image from "../../components/commons/Image";
import { SignIn } from "../../types/userTypes";
import { addUser } from "../../apis/userAPI";
import { toast, Toaster } from "sonner";

interface Logo {
  name: string;
  src: string;
}

function SignIn() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //check data 
  let checkEmail = false
  let checkPassowrd = false
  let checkConfirmPassword = false
  let checkPhoneNumber = false

  //error 
  const [errorEmail, setErrorEmail] = useState("")
  const [errorPassword, setErrorPassword] = useState("")
  const [errorPhoneNumber, setErrorPhoneNumber] = useState("")
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("")

  const logo: Logo[] = [
    {
      name: "Facebook",
      src: "https://tse2.mm.bing.net/th?id=OIP.cOz92GK9w_2_VxUIWBL0ngHaHa&pid=Api&P=0&h=180",
    },
    {
      name: "Google",
      src: "https://tse4.mm.bing.net/th?id=OIP.D6P-BO32wCApcPIIjt6p5wHaHa&pid=Api&P=0&h=180",
    },
  ];

  const handlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    let phone:string = e.target.value;
    setPhoneNumber(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  //check
  const handleCheckEmail = (email: string) => {
    const emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email === "") {
      setErrorEmail("Vui lòng nhập email")
      return
    }

    if (!emailPattern.test(email)) {
      setErrorEmail("Email không đúng định dạng")
      return;
    }
    setErrorEmail("")
    checkEmail = true
  }

  const handleCheckPassword = (password: string) => {
    if (password === "") {
      setErrorPassword("Password không được để trống")
      return
    }

    if (password.length <= 8) {
      setErrorPassword("Mật khẩu không được bé hơn 8 ")
      return
    }

    setErrorPassword("")
    checkPassowrd = true
  }


  const hanldelCheckConfirmPassword = (confirmPassword: string) => {
    if (confirmPassword === "") {
      setErrorConfirmPassword("Mật khẩu không được để trống")
      return
    }

    if (confirmPassword.length <= 8) {
      setErrorConfirmPassword("Xác nhận mật khẩu không được bé hơn 8")
      return
    }

    if (confirmPassword !== password) {
      setErrorConfirmPassword("Xác nhận mật khẩu không giống với mật khẩu")
      return
    }

    setErrorConfirmPassword("")
    checkConfirmPassword = true
  }

  const handleCheckPhoneNumber = (phoneNumber:string) => {
    // Check if date is undefined or invalid
    if (phoneNumber.length <10 || phoneNumber.length >13 ) {
      setErrorPhoneNumber("Số điện thoại không hợp lệ")
      checkPhoneNumber = false
      return
    }


    setErrorPhoneNumber("")
    checkPhoneNumber = true
  }
  //gửi api
    const handleLogin = async () => {
      handleCheckEmail(email);
      handleCheckPassword(password);
      hanldelCheckConfirmPassword(confirmPassword);
      handleCheckPhoneNumber(phoneNumber);
    
      // Đợi các giá trị state được cập nhật
      if (!checkEmail || !checkPassowrd || !checkConfirmPassword || !checkPhoneNumber) {
        toast.error("Thông tin không hợp lệ")
        return;
      }
    
      const signInData: SignIn = {
        email:email,
        password:password,
        phoneNumber: phoneNumber,
      };
    
      try {
        console.log(signInData);
        
        const response = await addUser(signInData);
        console.log("kết quả đăng ký: ",response.message);
        
        toast.success("Đăng ký thành công")
        // Reset form
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPhoneNumber(""); // Hoặc một giá trị mặc định
      } catch (error) {
        toast.error("Đăng ký thất bại")
        console.error(error);
      }
    };
  

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <div className="back fixed top-0 right-0">
        <Button className="p-3 text-xl text-black bg-transparent hover:bg-yellow-100 rounded-md" to="/dang-nhap">
          Quay lại đăng nhập
        </Button>
      </div>
      <div className="w-80">
        <div className="">
          <img src="" alt="" />
        </div>
        <div className="font-bold text-4xl text-left p-2">Đăng ký</div>
        <TextField name="email" id="email" value={email} onChange={handleEmail} type="email" label="Email" error={errorEmail} />
        <TextField name="password" id="password" value={password} onChange={handlePassword} type="password" label="Password" error={errorPassword} />
        <TextField name="confirmPassword"
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPassword}
          type="password"
          label="Confirm password"
          error={errorConfirmPassword}
        />
        <TextField 
        name="phoneNumber" 
        id="phoneNumber" 
        value={phoneNumber} 
        onChange={handlePhoneNumber} 
        type="number" 
        label="Số điện thoại" 
        className="pr-2" error={errorPhoneNumber} />
        <div className="p-2">
          <Button onClick={handleLogin} outline large primary>
            Đăng ký
          </Button>
        </div>
        <div className="flex gap-2 p-2">
          {logo.map((item, index) => (
            <Button
              key={index}
              className="flex bg-transparent"
              lefticon={<Image sizes="small" src={item.src} alt={item.name} />}
              small={true}
              flex={true}
            >
              {item.name}
            </Button>
          ))}
        </div>
      </div>
      <Toaster position="top-right"/>
    </div>
  );
}
export default SignIn;
