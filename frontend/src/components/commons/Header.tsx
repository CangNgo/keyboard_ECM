import React, { ChangeEvent, useState } from "react";
import NavigationMenu from "../commons/NavigationMenu";
import SearchBar from "../commons/SearchBar";
import Image from "../commons/Image";
import cang from "../../assets/img/462174035_1265880167773698_7926684173028503711_n.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCommentDots,
  faBagShopping,
  faTable,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { productCategories } from "../commons/categoriesProduct";
import { userCategories } from "../commons/categoriesUser";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import SelectBox from "./SelectBox";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          welcome: 'Welcome',
          hello: 'Hello, {{name}}!',
          cart: 'Cart',
          notifications: 'Notifications',
          messages: 'Messages',
          account: 'Account',
          login: 'Login',
          register: 'Register',
          logout: 'Logout',
          postAd: 'Post Ad',
          category:"Category"
        }
      },
      vi: {
        translation: {
          welcome: 'Chào mừng',
          hello: 'Xin chào, {{name}}!',
          cart: 'Giỏ hàng',
          notifications: 'Thông báo',
          messages: 'Tin nhắn',
          account: 'Tài khoản',
          login: 'Đăng nhập',
          register: 'Đăng ký',
          logout: 'Đăng xuất',
          postAd: 'Đăng tin',
          category:"Danh mục"
        }
      },
      fr: {
        translation: {
          welcome: 'Bienvenue',
          hello: 'Bonjour, {{name}}!',
          cart: 'Panier',
          notifications: 'Notifications',
          messages: 'Messages',
          account: 'Compte',
          login: 'Se connecter',
          register: 'S\'inscrire',
          logout: 'Se déconnecter',
          postAd: 'Poster une annonce',
          category:"Bienvenido"
        }
      },
      es: {
        translation: {
          welcome: 'Bienvenido',
          hello: '¡Hola, {{name}}!',
          cart: 'Carrito',
          notifications: 'Notificaciones',
          messages: 'Mensajes',
          account: 'Cuenta',
          login: 'Iniciar sesión',
          register: 'Registrarse',
          logout: 'Cerrar sesión',
          postAd: 'Publicar anuncio',
          category:"Bienvenido"
        }
      },
      de: {
        translation: {
          welcome: 'Willkommen',
          hello: 'Hallo, {{name}}!',
          cart: 'Warenkorb',
          notifications: 'Benachrichtigungen',
          messages: 'Nachrichten',
          account: 'Konto',
          login: 'Anmelden',
          register: 'Registrieren',
          logout: 'Abmelden',
          postAd: 'Anzeige aufgeben',
          category:"Warenkorb"
        }
      },
      ja: {
        translation: {
          welcome: 'ようこそ',
          hello: 'こんにちは、{{name}}！',
          cart: 'カート',
          notifications: '通知',
          messages: 'メッセージ',
          account: 'アカウント',
          login: 'ログイン',
          register: '登録',
          logout: 'ログアウト',
          postAd: '広告を投稿'
        }
      },
      ko: {
        translation: {
          welcome: '환영합니다',
          hello: '안녕하세요, {{name}}!',
          cart: '장바구니',
          notifications: '알림',
          messages: '메시지',
          account: '계정',
          login: '로그인',
          register: '회원가입',
          logout: '로그아웃',
          postAd: '광고 게시'
        }
      },
      zh: {
        translation: {
          welcome: '欢迎',
          hello: '你好, {{name}}!',
          cart: '购物车',
          notifications: '通知',
          messages: '消息',
          account: '账户',
          login: '登录',
          register: '注册',
          logout: '退出',
          postAd: '发布广告'
        }
      },
      ar: {
        translation: {
          welcome: 'مرحبا',
          hello: 'مرحبا، {{name}}!',
          cart: 'عربة التسوق',
          notifications: 'إشعارات',
          messages: 'رسائل',
          account: 'حساب',
          login: 'تسجيل الدخول',
          register: 'التسجيل',
          logout: 'تسجيل الخروج',
          postAd: 'نشر إعلان'
        }
      },
      ru: {
        translation: {
          welcome: 'Добро пожаловать',
          hello: 'Привет, {{name}}!',
          cart: 'Корзина',
          notifications: 'Уведомления',
          messages: 'Сообщения',
          account: 'Аккаунт',
          login: 'Войти',
          register: 'Регистрация',
          logout: 'Выйти',
          postAd: 'Разместить объявление'
        }
      }
    },
    lng: 'vi',
    fallbackLng: 'vi'
  });
const Header: React.FC = () => {
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const navigate = useNavigate()

  const handleGoToHome= ()=>{
    navigate('/')
  }

  const options = [
    { label: "English", value: "en" },
    { label: "Tiếng Việt", value: "vi" },
    { label: "Français", value: "fr" },
    { label: "Español", value: "es" },
    { label: "Deutsch", value: "de" },
    { label: "日本語", value: "ja" },
    { label: "한국어", value: "ko" },
    { label: "中文", value: "zh" },
    { label: "العربية", value: "ar" },
    { label: "Русский", value: "ru" }
  ];
  
  const handleCart = () => {
    navigate("gio-hang")
  }
  //đa ngôn ngữ 
  const { t, i18n } = useTranslation();
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = event.target.value;
    console.log(selectedLanguage);
    
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <header className="bg-white shadow-md py-2">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-4 cursor-pointer" onClick={handleGoToHome}>
          <Image src={cang} alt="Chợ Tốt Logo" />
        </div>

        {/* Navigation Menu */}
        <div className="relative ml-4">
          <button
            className="flex items-center font-bold text-gray-700"
            onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
          >
           {t("category")}
          </button>
          {isCategoryMenuOpen && (
            <div className="absolute top-full left-0 bg-white shadow-md mt-2 w-72 rounded-md">
              <NavigationMenu categories={productCategories} />
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
              <span className="ml-2 text-gray-700">{t("account")}</span>
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
                      <Button className="bg-transparent hover:bg-transparent text-black" to="/dang-nhap" >{t("login")}</Button> / <Button className="bg-transparent hover:bg-transparent text-black" to="/dang-ky">Đăng ký</Button>
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
                <Button>Đăng xuất</Button>
                <button>hello</button>
              </div>
            )}

          </div>

          {/* Post Button */}
          <button className="ml-4 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
           {t("postAd")}
          </button>
        </div>
        <SelectBox 
        onChange={handleLanguageChange} 
        options={options} 
        defaultOptionValue={"Việt Nam"}
        name="language-selector" 
        id="language-selector" 
      /> 
      </div>
     </header>
  );
};
export default Header;
