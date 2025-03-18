import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import React from "react";
interface LoginProps {
  children: ReactNode;
}

function OnlyContentLayout({ children }: LoginProps) {
  const url = 'url(https://tse1.mm.bing.net/th?id=OIP.qY5IMi4MBqXUR1PJucuaRQHaEK&pid=Api&P=0&h=180)'
  return (
    <div className={`bg-[${url}] bg-cover bg-center 1 min-h-screen` }>
      {children || <Outlet />}
    </div>
  );
}

export default OnlyContentLayout;
