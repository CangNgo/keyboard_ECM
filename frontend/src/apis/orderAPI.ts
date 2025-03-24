import { DOMAIN } from ".";
import axiosJWT from "../config/axiosJWTConfig";
import { CheckOutLocation } from "../pages/user/Checkout";
import { UpdateOrder } from "../types/orderTypes";
const baseURL= "/skeleton/public/v1/order"
export const addOrder = async (data:CheckOutLocation[])=>{
    try {
        const response = await axiosJWT.post(`${DOMAIN}${baseURL}`, data)
        return response.data
    } catch (error) {
        console.log("lỗi axios" ,error);
        throw new Error
    }

}

export const getAllOrders = async ()=>{
    try {
        const response = await axiosJWT.get(`${DOMAIN}/skeleton/admin/v1/order/all`)
        return response.data
    } catch (error) {
        console.log("lỗi axios" ,error);
        throw new Error
    }
}

export const updateStatusOrder = async (updateOrder:UpdateOrder) =>{
    try {
        const response = await axiosJWT.put(`${DOMAIN}/skeleton/admin/v1/order`,updateOrder)
        return response.data
    } catch (error) {
        throw new Error
    }
}
