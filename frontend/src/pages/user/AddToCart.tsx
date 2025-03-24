import giay1 from "../../assets/img/giay1.jpg";
import Image from "../../components/commons/Image";

import React from "react";
function AddToCart() {
  return (
    <>
      <div>Giỏ hàng</div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="w-1/4">Hình ảnh</th>
            <th className="w-2/4">Thông tin</th>
            <th className="w-1/4">Số lượng</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="flex justify-center items-center">
                <Image src={giay1} imgCart />
              </div>
            </td>
            <td>
              <div className="flex justify-center flex-row items-center">
                <div className="w-3/5 flex text-left">
                  <div className="w-1/2 flex justify-center flex-col">
                    <span>Tên: </span>
                    <span>Loại: </span>
                    <span>Màu: </span>
                    <span>Thương hiệu: </span>
                    <span>Kích cỡ: </span>
                  </div>
                  <div className="w-1/2 flex justify-center flex-col">
                    <span>Nike 01</span>
                    <span>Giầy thể thao</span>
                    <span>
                      <select
                        name="shoes-color"
                        className="p-0 w-40 border-none rounded-md focus:outline-none focus:ring-transparent focus:border-none"
                        id="shoes-color"
                      >
                        <option value="màu xanh">màu xanh</option>
                        <option value="màu xanh">màu xanh</option>
                        <option value="màu xanh">màu xanh</option>
                      </select>
                    </span>
                    <span>Nike</span>
                    <span>43</span>
                  </div>
                </div>
              </div>
            </td>
            <td className="text-center">
              <div className=""></div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default AddToCart;
