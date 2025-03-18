
# King of shoes
## Cách Cài Dự Án
Cài tất cả dependency trong dự án
```js
npm install
```
Chạy dự án
```js
npm run dev
```


assets/
  Chứa các tài nguyên tĩnh của dự án như:

  Images (*.png, *.jpg, *.svg)
  Fonts (*.ttf, *.woff, *.woff2)
  Videos, audios`
  Files JSON tĩnh 

components/
  Chứa các components có thể tái sử dụng trong dự án
  Chia làm 2 phần chính:
  a) common/ - Chứa các UI components cơ bản: Button, TextField
  b) layouts/ - Chứa các components layout: header, footer

hooks/ 
  Chứa các custom hooks có thể tái sử dụng

pages/ 
    Chứa các components tương ứng với các route: trang-chu, chi-tiet-san-pham, login, logout

routes/
  Cấu hình routing cho ứng dụng: phân trang 

api/
  callAPI từ baackend

store/ 
  Quản lý state toàn cục với Redux Toolkit

Lợi ích của việc tổ chức cấu trúc này:

---
Dễ dàng tìm kiếm và bảo trì code
  Tách biệt các concerns (UI, logic, routing...)
  Tái sử dụng code hiệu quả
  Dễ dàng mở rộng ứng dụng
  Tuân thủ nguyên tắc DRY (Don't Repeat Yourself)
  Dễ dàng testing từng module