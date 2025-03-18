import React, { useEffect, useState } from "react"
import { Orders, UpdateOrder } from "../../../types/orderTypes"
import { getAllOrders, updateStatusOrder } from "../../../apis/orderAPI"
import { toast, Toaster } from "sonner"
import Button from "../Button";

function AdminHome() {
  const [orders, setOrders] = useState<Orders[]>([])
  const [status, setStatus] = useState("")

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const orders: Orders[] = await getAllOrders()
        console.log(orders);
        setOrders(orders)
      } catch (error) {
        console.log("Lỗi");
        toast.error("lỗi")
        console.log(error);
      }
    }
    fetchAllOrders()
  }, [status])

  const handleUpdateStatusXacNhan = (orderId:string, status:string) =>{

    const data: UpdateOrder ={
      orderId: orderId, 
      status: status
    }
    const updateStatus = async ()=>{
      console.log(data);
      setStatus(data.status)
      try {
        const response = await updateStatusOrder(data)
        console.log(response);
      } catch (error) {
        console.log("Lỗi");
      }
    }
    updateStatus()
  }

  return (

    <div>
      <div>
        <h1>Đơn hàng</h1>
      </div>
      <div>
        <table className="table-auto text-center">
          <thead>
            <tr>
              <th className="">email</th>
              <th className="">Tên khách hàng</th>
              <th className="">phoneNumber</th>
              <th className="">address</th>
              <th className="w-32">Trạng thái đơn hàng</th>
              <th className="w-32">Ngày đặt hàng</th>
              <th className="">Tổng giá</th>
              <th className="">Ghi chú</th>
              <th className="">Xác nhận</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => (
              <tr key={index}>
                <td className="">{item.fullName}</td>
                <td className="">{item.phoneNumber}</td>
                <td className="">{item.email}</td>
                <td className="w-40">{item.address}</td>
                <td className="">{item.statusOrder}</td>
                <td className="">{item.orderDate ? new Date(item.orderDate).toLocaleDateString('vi-VN') : ''}</td>
                <td className="">{item.totalPrice}</td>
                <td className="">{item.description}</td>
                <td className="">
                  <Button small className="bg-blue-400 hover:bg-blue-500" onClick={() =>handleUpdateStatusXacNhan(item.orderId, "PROCESSING")}>Xác nhận</Button>
                  <Button small className="bg-blue-400 hover:bg-blue-500" onClick={() =>handleUpdateStatusXacNhan(item.orderId, "CANCELLED")}>Hủy đơn</Button>
                </td>
              </tr>))}
          </tbody>
        </table>
      </div>
      <Toaster richColors position="top-right" />
    </div>
  )
}
export default AdminHome