import React, { useEffect, useState } from 'react';
import { checkOut } from './Cart';
import Image from '../../components/commons/Image';
import { ChangeEvent } from 'react';
import TextField from '../../components/commons/TextField';
import axiosJWT from '../../config/axiosJWTConfig';
import { DOMAIN } from '../../apis';
import { toast, Toaster } from 'sonner';
import { addOrder } from '../../apis/orderAPI';

// Types for our data structures
// interface CartItem {
//   id: number;
//   hinhAnh: string;
//   tenSanpham: string;
//   soLuong: number;
//   gia: number;
// }

export interface CheckOutLocation {
  price: number;
  quantity: number;
  size: string;
  productId: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  totalPrice: number;
  description: string;
}

//function
const Checkout: React.FC = () => {

  const [addressSubmit, setAddressSubmit] = useState<string>("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [fullName, setFullName] = useState("")
  const [listCheckout, setListCheckout] = useState<checkOut[]>([])

  const [listResult, setListResult] = useState<checkOut[]>([])
  const [description, setDescription] = useState<string>("")

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const addressString = e.target.value
    setAddressSubmit(addressString)
  }

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const addressString = e.target.value
    setEmail(addressString)
  }
  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const addressString = e.target.value
    setPhoneNumber(addressString)
  }

  const handleFullName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fullname = e.target.value
    setFullName(fullname)
  }
  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    const description = e.target.value
    setDescription(description)
  }

  //get local 
  useEffect(() => {
    const getLocalStorage = () => {
      const listjson = localStorage.getItem("checkOut");
      if (!listjson) {
        return [];
      }

      try {
        const parseListJson = JSON.parse(listjson);
        const checkoutItems: checkOut[] = parseListJson.map((item: any) => ({
          id: item.id || '',
          images: Array.isArray(item.images)
            ? item.images
            : (item.images ? [{ images: item.images }] : []),
          name: item.name,
          price: item.price,
          color: item.color,
          size: item.size,
          branch: item.branch,
          quantity: item.quantity,
          isChecked: item.isChecked
        }));

        setListCheckout(checkoutItems);
        console.log(checkoutItems);

      } catch (error) {
        console.error("Error parsing localStorage data:", error);
        return [];
      }
    };

    getLocalStorage();
  }, []);

  const calculateTotal = () => {
    return listCheckout.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  console.log(listCheckout);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement checkout logic here
    const list: CheckOutLocation[] = listCheckout.map((item) => ({
      price: item.price,
      quantity: item.quantity,
      size: item.size,
      productId: item.id,
      email: email,
      fullName: fullName,
      phoneNumber: phoneNumber,
      address: addressSubmit,
      totalPrice: item.price * item.quantity,
      description: description,
      color: item.color
    }));

    const handleAddProduct = async () => {
      try {
        const response = await addOrder(list)

        toast.success("Thêm sản phẩm thành công");
        console.log(response.data);
        
      } catch (error) {
        console.error("Lỗi:", error);
        toast.error("Lỗi khi thêm sản phẩm");
      }
    };
    handleAddProduct()

    console.log("Order submitted:", list);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0 md:space-x-6">
        {/* Order Details Section */}
        <div className="w-full md:w-1/2 lg:w-5/12">
          <h5 className="text-xl font-semibold mb-4">Đơn hàng</h5>
          <table className="w-full text-center">
            <tbody className="border-t border-b border-black">
              {listCheckout.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-4">
                    <div className="flex items-center">
                      <Image
                        src={item?.images[0]?.urlImage}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg mr-4"
                      />
                      <div className="text-left">
                        <h3 className="font-bold text-lg">{item.name}</h3>
                        <div className="mt-2">
                          <select className="border rounded p-1">
                            <option value="">{item.color}</option>
                          </select>
                        </div>
                        <p className="mt-2">Số lượng: {item.quantity}</p>
                      </div>
                    </div>
                  </td>
                  <td className="font-semibold">
                    {item.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Voucher Section */}
          <div className="mt-6">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Mã giảm giá"
                className="flex-grow border border-black rounded p-2"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Áp dụng
              </button>
            </div>
            <hr className="my-4" />
          </div>

          {/* Price Calculation */}
          <div>
            <div className="flex justify-between mb-2">
              <p className="font-bold">Tạm tính:</p>
              <p>{calculateTotal().toLocaleString()}đ</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between mb-4">
              <p className="font-bold text-xl">Tổng tiền:</p>
              <p className="font-bold text-lg">{calculateTotal().toLocaleString()}đ</p>
            </div>
          </div>

          {/* Back to Cart Link */}
          <div className="mt-4">
            <a href="/thanh-toan" className="flex items-center text-blue-600">
              Quay về giỏ hàng
            </a>
          </div>
        </div>

        {/* Shipping Information Section */}
        <div className="w-full md:w-1/2 lg:w-5/12">
          <h5 className="text-xl font-semibold mb-4">Thông tin nhận hàng</h5>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <TextField
                type="email"
                placeholder="Email: Example@gmail.com"
                className="w-full border rounded p-2"
                value={email}
                onChange={handleEmail}
              />
              <TextField
                type="text"
                placeholder="Họ và tên: Nguyễn Văn A"
                className="w-full border rounded p-2"
                value={phoneNumber}
                onChange={handlePhone}
              />
              <TextField
                type="tel"
                placeholder="Số điện thoại: 0123456789"
                className="w-full border rounded p-2"
                value={fullName}
                onChange={handleFullName}
              />

              {/* Province Dropdown */}


              <div className="relative">
                <TextField
                  placeholder="Địa chỉ"
                  className="w-full border rounded p-2 h-24"
                  value={addressSubmit}
                  onChange={(e) => handleAddress(e)}
                />
              </div>
               <div className="relative">
                <TextField
                  placeholder="Ghi chú"
                  className="w-full border rounded p-2 h-14"
                  value={description}
                  onChange={(e) => handleDescription(e)}
                />
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded text-lg uppercase"
                >
                  Thanh toán
                </button>
              </div>
            </div>
          </form>
          <Toaster richColors position='top-right' />
        </div>
      </div>
    </div>
  );
};

export default Checkout;