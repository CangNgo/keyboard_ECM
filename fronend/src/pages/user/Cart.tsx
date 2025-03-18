import React, { useEffect, useState } from "react";
import CartItem from "../../components/commons/CartItem";
import useFormatCurrency from "../../hooks/useFormatCurrency";
import Button from "../../components/commons/Button";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface dataCart {
  id: string;
  images: { urlImage: string }[]; // Cho phép cả string và mảng object
  name: string;
  price: number;
  color: string;
  size: string;
  branch: string;
  quantity: number;
  isChecked: boolean;
}
export interface checkOut {
  id: string;
  images: string[] | { urlImage: string }[];
  name: string;
  price: number;
  color: string;
  size: string;
  branch: string;
  quantity: number;
  isChecked: boolean;
}

function Cart() {
  const navigate = useNavigate()
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [item, setItem] = useState<dataCart[]>([]);
  const [checkOut, setCheckOut] = useState<checkOut[]>([]);
  useEffect(() => {
    const getCartItemsFromLocalStorage = (): dataCart[] => {
      try {
        // Lấy dữ liệu từ localStorage
        const cartItemsJson = localStorage.getItem('cartItems');

        // Kiểm tra nếu không có dữ liệu
        if (!cartItemsJson) {
          return [];
        }

        // Parse JSON và ép kiểu
        const parsedItems = JSON.parse(cartItemsJson);


        // Validate và chuyển đổi các item sang đúng kiểu dataCart
        const cartItems: dataCart[] = parsedItems.map((item: any) => ({
          id: item.id || '',
          images: Array.isArray(item.images)
            ? item.images
            : (item.images ? [{ images: item.images }] : []), // Chuyển đổi images thành mảng các object
          name: item.name || '',
          price: item.price || 0,
          color: item.color || [],
          size: item.size || [],
          branch: item.branch || '',
          quantity: item.quantity || 1,
          isChecked: item.isChecked || false
        }));

        return cartItems;
      } catch (error) {
        toast.error('Lỗi khi parse dữ liệu giỏ hàng!')
        return [];
      }
    };

    // Sử dụng
    const cartItems = getCartItemsFromLocalStorage();

    console.log("sp local", cartItems);
    setItem(cartItems);
  }, []);


  // Tính tổng giá trị
  useEffect(() => {
    const total = item.reduce((sum, currentItem) => {
      return sum + currentItem.price * currentItem.quantity;
    }, 0); // Bắt đầu với giá trị khởi tạo là 0
    setTotalPrice(total);
  }, [item]); // Chỉ tính lại khi `item` thay đổi



  const updateLocalStorage = (updatedItems: dataCart[]) => {
    try {
      console.log("update Local:", updatedItems[0]);

      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    } catch (error) {
      toast.error('Lỗi khi cập nhật giỏ hàng');
    }
  };

  const handleChangeQuantity = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const quantity: number = parseInt(e.target.value);

    if (quantity <= 0 || isNaN(quantity)) {
      alert("Số lượng không được bé hơn 1");
      return;
    }

    if (quantity > 999) {
      alert("Số lượng không được lớn hơn 999");
      return;
    }

    const updatedItems = item.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );

    setItem(updatedItems);
    updateLocalStorage(updatedItems);
  };

  //giam so luong
  const handleMinusQuanttity = (id: string) => {
    const updatedItems = item.map((item) =>
      item.id === id
        ? {
          ...item,
          quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity,
        }
        : item
    );

    setItem(updatedItems);
    updateLocalStorage(updatedItems);
  };

  //them tăng so luong
  const handleAddQuantity = (id: string) => {
    const updatedItems = item.map((item) =>
      item.id === id
        ? {
          ...item,
          quantity: item.quantity < 999 ? item.quantity + 1 : item.quantity,
        }
        : item
    );

    setItem(updatedItems);
    updateLocalStorage(updatedItems);
  };

  //xoa san pham
  const handleRemoveItem = (id: string) => {
    let checked: Boolean = confirm("Bạn có muốn xóa sản phẩm này không!");
    if (checked) {
      const updatedItems = item.filter((item) => item.id !== id);
      setItem(updatedItems);
      updateLocalStorage(updatedItems);
    }
  };

  //tick chon san pham
  const handleChecked = (id: string) => {
    const updatedItems = item.map((item) =>
      item.id === id
        ? {
          ...item,
          isChecked: !item.isChecked
        }
        : item
    );

    setItem(updatedItems);
    updateLocalStorage(updatedItems);
  }


  //day san pham len localStorege 
  const handelRediractCheckout = () => {
    const selectedItems = item.filter((cartItem) => cartItem.isChecked === true);

    if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán!");
      return;
    }

    const checkoutItems: checkOut[] = selectedItems.map((cartItem) => {
      // // Lấy size và color từ DOM
      // const sizeInput = document.querySelector(`#shoes-size-${cartItem.id}`) as HTMLInputElement | null;
      // const colorInput = document.querySelector(`#shoes-color-${cartItem.id}`) as HTMLInputElement | null;

      // const sizeItem = sizeInput ? parseInt(sizeInput.value) : cartItem.size[0]; // Dùng giá trị mặc định nếu không chọn
      // const colorItem = colorInput ? colorInput.value : cartItem.color[0]; // Dùng màu đầu tiên nếu không chọn

      // Tạo đối tượng checkOut
      return {
        id: cartItem.id,
        images: cartItem.images,
        name: cartItem.name,
        price: cartItem.price,
        color:cartItem.color,
        size:cartItem.size,
        branch: cartItem.branch,
        quantity: cartItem.quantity,
        isChecked: true,
      };
    });

    setCheckOut(checkoutItems);

    // Lưu vào localStorage
    localStorage.setItem("checkOut", JSON.stringify(checkoutItems));

    // Điều hướng tới trang thanh toán
    navigate("/thanh-toan");
  };

  return (
    <>
      <div>
        <h1>Giỏ hàng</h1>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="w-1/6">Hình ảnh</th>
            <th className="w-1/6">Thông tin</th>
            <th className="w-1/6">Giá</th>
            <th className="w-1/6">Số lượng</th>
            <th className="w-1/6">Tổng giá</th>
            <th className="w-1/6">Xóa</th>
          </tr>
        </thead>
        <tbody>
          {item.map((cartItem, index) => (
            <CartItem
              key={index}
              item={cartItem}
              onChecked={handleChecked}
              onQuantityChange={handleChangeQuantity}
              onMinusQuantity={handleMinusQuanttity}
              onAddQuantity={handleAddQuantity}
              onRemoveItem={handleRemoveItem}
            />
          ))}
        </tbody>
      </table>

      <div className="flex flex-col float-end w-56">
        <div className="font-bold">
          <div>
            Tổng giá: <span className="text-red-600">{useFormatCurrency(totalPrice)}</span>
          </div>
        </div>
        <div>
          <Button onClick={handelRediractCheckout} className=" bg-red-300 hover:bg-red-500 w-full mt-5">
            Thanh toán
          </Button>
        </div>
      </div>
    </>
  );
}

export default Cart;
