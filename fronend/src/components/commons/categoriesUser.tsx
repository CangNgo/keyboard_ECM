import {
  faBagShopping,
  faReceipt,
  faHeart,
  faSearch,
  faStar,
  faCoins,
  faAward,
  faHistory,
  faStore,
  faGift,
  faPercent,
  faCog,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface UserCategoryItem {
  name: string;
  href: string;
  icon: IconDefinition;
  tag?: string; // Tùy chọn: Thẻ nổi bật như "Mới", "Tạo ngay"
}

export interface UserCategorySection {
  section: string;
  items: UserCategoryItem[];
}

export const userCategories: UserCategorySection[] = [
  {
    section: "Quản lý đơn hàng",
    items: [
      { name: "Đơn mua", href: "/don-mua", icon: faBagShopping },
      { name: "Đơn bán", href: "/don-ban", icon: faReceipt },
    ],
  },
  {
    section: "Tiện ích",
    items: [
      { name: "Tin đăng đã lưu", href: "/tin-luu", icon: faHeart },
      { name: "Tìm kiếm đã lưu", href: "/tim-kiem-luu", icon: faSearch },
      { name: "Đánh giá từ tôi", href: "/danh-gia", icon: faStar },
    ],
  },
  // {
  //   section: "Dịch vụ trả phí",
  //   items: [
  //     { name: "Đồng Tốt", href: "/dong-tot", icon: faCoins },
  //     { name: "Gói PRO", href: "/goi-pro", icon: faAward, tag: "Mới" },
  //     {
  //       name: "Lịch sử giao dịch",
  //       href: "/lich-su-giao-dich",
  //       icon: faHistory,
  //     },
  //     {
  //       name: "Cửa hàng / chuyên trang",
  //       href: "/cua-hang",
  //       icon: faStore,
  //       tag: "Tạo ngay",
  //     },
  //   ],
  // },
  // {
  //   section: "Ưu đãi, khuyến mãi",
  //   items: [
  //     { name: "Chợ Tốt ưu đãi", href: "/uu-dai", icon: faGift },
  //     { name: "Ưu đãi của tôi", href: "/uu-dai-cua-toi", icon: faPercent },
  //   ],
  // },
  // {
  //   section: "Khác",
  //   items: [
  //     { name: "Cài đặt tài khoản", href: "/cai-dat", icon: faCog },
  //     { name: "Trợ giúp", href: "/tro-giup", icon: faQuestionCircle },
  //   ],
  // },
];
