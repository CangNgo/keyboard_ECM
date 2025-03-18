import React, { useState } from "react";
import NavigationMenu from "../NavigationMenu";
import SearchBar from "../SearchBar";
import Image from "../Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCommentDots,
  faBagShopping,
  faTable,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { userCategories } from "../categoriesUser";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { adminNavigation } from '../../../assets/data/AdminNavigation';

const AdminHeader: React.FC = () => {
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
const navigate = useNavigate()

  const handleCart = ()=>{
navigate("gio-hang")
  }
  return (
    <header className="bg-white shadow-md py-2 fixed z-20 w-full top-0">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Image alt="Chợ Tốt Logo" />
        </div>

        {/* Navigation Menu */}
        <div className="relative ml-4">
          <button
            className="flex items-center font-bold text-gray-700"
            onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
          >
            Danh mục
          </button>
          {isCategoryMenuOpen && (
            <div className="absolute top-full left-0 bg-white shadow-md mt-2 w-72 rounded-md">
              <NavigationMenu categories={adminNavigation} />
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-4">
          <SearchBar 
            placeholder="Tìm kiếm sản phẩm"
            onSearch={(query) => console.log("Từ khóa tìm kiếm:", query)}
          />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <button
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label="Thông báo"
          >
            <FontAwesomeIcon icon={faBell} className="w-5 h-5 text-gray-500" />
          </button>

          <button
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label="Tin nhắn"
          >
            <FontAwesomeIcon
              icon={faCommentDots}
              className="w-5 h-5 text-gray-500"
            />
          </button>

          <button
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label="Giỏ hàng"
          >
            <FontAwesomeIcon
              icon={faBagShopping}
              onClick={handleCart}
              className="w-5 h-5 text-gray-500"
            />
          </button>

          <button
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label="Quản lý tin"
          >
            <FontAwesomeIcon icon={faTable} className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Account Menu and Post Button */}
        <div className="flex items-center space-x-4 ml-4">
          {/* Account Menu */}
          <div className="relative">
            <button
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
              onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
            >
              <FontAwesomeIcon
                icon={faUser}
                className="w-5 h-5 text-gray-700"
              />
              <span className="ml-2 text-gray-700">Tài khoản</span>
            </button>
            {isAccountMenuOpen && (
              <div className="absolute top-full right-0 bg-white shadow-md mt-2 w-72 rounded-md overflow-hidden z-50">
                {/* Đăng nhập / Đăng ký */}
                <div className="flex items-center px-4 py-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="w-6 h-6 text-gray-500"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700 font-bold">
                      <Button className="bg-transparent hover:bg-transparent text-black" to="/dang-nhap" >Đăng nhập</Button> / <Button className="bg-transparent hover:bg-transparent text-black" to="/dang-ky">Đăng ký</Button>
                    </p>
                  </div>
                </div>
                <hr className="border-gray-200" />
                {/* Các nhóm menu */}
                {userCategories.map((section) => (
                  <div key={section.section} className="mb-4">
                    {/* Tiêu đề nhóm */}
                    <div className="px-4 py-2 bg-gray-100 font-bold text-gray-700">
                      {section.section}
                    </div>
                    {/* Các mục trong nhóm */}
                    <ul>
                      {section.items.map((item) => (
                        <li
                          key={item.name}
                          className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          {/* Icon */}
                          <div className="w-6 h-6 mr-3 text-gray-500">
                            <FontAwesomeIcon icon={item.icon} />
                          </div>
                          {/* Tên mục */}
                          <a href={item.href} className="flex-1 text-gray-700">
                            {item.name}
                          </a>
                          {/* Tag nếu có */}
                          {item.tag && (
                            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                              {item.tag}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Post Button */}
          <button className="ml-4 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
            ĐĂNG TIN
          </button>
        </div>
      </div>
    </header>
  );
};
export default AdminHeader;
