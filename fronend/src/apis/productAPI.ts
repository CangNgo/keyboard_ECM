import axiosJWT from "../config/axiosJWTConfig"
import { DOMAIN } from './index';
import { AddProduct } from './../types/product';
import axios from "axios";

interface page {
    currentPage:number;
    limitPage:number
}

export const findAllProduct = async () => {

    const page:page = {
        currentPage:1,
        limitPage:8
    }
    try {
        const response = await axiosJWT.get(`${DOMAIN}/skeleton/public/v1/product`, {
           params:page
        })
        return response.data
    } catch (error) {
        console.error('Error fetching all activities:', error);
        throw error;
    }
}

export const findProductById = async (id: string) => {
    try {
        const response = await axiosJWT.get(`${DOMAIN}/skeleton/public/v1/product/${id}`)
        console.log(response.data);
        
        return response.data
    } catch (error) {
        console.error('Error fetching all activities:', error);
        throw error;
    }
}

export const addProduct = async (data: AddProduct) => {
    try {
        const response = await axiosJWT.post(`${DOMAIN}/skeleton/admin/v1/inventory`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data
    } catch (error) {
        console.error('Lỗi khi thêm mới', error);
        throw error;
    }
}


