import adminRoutes from "../config/adminRoutes";
import userRoutes from "../config/userRoutes";
import Home from "../pages/public/Home";
import Checkout from "../pages/user/Checkout";
import AddProduct from "../pages/admin/AddProduct";
import DisableUser from "../pages/admin/DisableUser";
import ReportUser from "../pages/admin/ReportUser";
import publicRoutes from "../config/pulicRoutes";
import SignIn from "../pages/public/SignIn";
import OnlyContentLayout from "../components/layouts/OnlyContentLayout";
import DefaultLayout from "../components/layouts/DefaultLayout";
import Login from "../pages/public/Login";
import Comment from "../pages/user/Comment";
import Cart from "../pages/user/Cart";
import ProductDetail from "../pages/public/ProductDetail";
import { RouteConfig } from "../App";
import File from "../components/commons/File";
import Profile from "../pages/user/Profile";
import AddCategory from "../pages/admin/AddCategory";
import LayoutAdmin from "../components/layouts/LayoutAdmin";
import AdminHome from "../components/commons/admin/AdminHome";
import AddInstructor from "../pages/user/AddInstructor";

// Cấu hình routes theo role và layout
const publicConfig : RouteConfig[]= [
  {
    path: publicRoutes.home,
    component: Home,
    layout: DefaultLayout,
    isPrivate: false,
  },
  {
    path: publicRoutes.login,
    component: Login,
    layout: OnlyContentLayout,
    isPrivate: false,
  },
  {
    path: publicRoutes.signIn,
    component: SignIn,
    layout: OnlyContentLayout,
    isPrivate: false,
  },
  {
    path: publicRoutes.productDetail, 
    component: ProductDetail , 
    layout: DefaultLayout , 
    isPrivate: false
  },
  {
    path: publicRoutes.importFile, 
    component: File ,
    layout: DefaultLayout , 
    isPrivate: false
  }
];

const userConfig : RouteConfig[]= [

  {
    path: userRoutes.home,
    component: Home,
    layout: DefaultLayout,
    isPrivate: false,
  },
  {
    path: userRoutes.profile,
    component: Profile,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    path: userRoutes.cart,
    component: Cart,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    path: userRoutes.checkout,
    component: Checkout,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    path: userRoutes.comment,
    component: Comment,
    layout: DefaultLayout,
    isPrivate: true,
  },

];

const adminConfig = [  {
  path: adminRoutes.addInstructor,
  component: AddInstructor,
  layout: DefaultLayout,
  isPrivate: false,
},
  {
    path:adminRoutes.adminHome, 
    component: AdminHome,
    layout:LayoutAdmin, 
    isPrivate: true,
  },
  {
    path: adminRoutes.addCategory,
    component: AddCategory,
    layout: LayoutAdmin,
    isPrivate: true,
  },
  {
    path: adminRoutes.addProduct,
    component: AddProduct,
    layout: LayoutAdmin,
    isPrivate: true,
  },
  {
    path: adminRoutes.disableUser,
    component: DisableUser,
    layout: LayoutAdmin,
    isPrivate: true,
  },
  {
    path: adminRoutes.reportUser,
    component: ReportUser,
    layout: LayoutAdmin,
    isPrivate: true,
  },
];

export { userConfig, adminConfig, publicConfig };
