import axiosJWT from "../config/axiosJWTConfig"
import { DOMAIN } from './index';

export const findAllInventory = async () =>{
    try {
        const reponse = await axiosJWT.get(`${DOMAIN}/skeleton/admin/v1/inventory`)
        return reponse.data
    } catch (error) {
        console.log("Lỗi khi get inventory", error);
        
    }
}