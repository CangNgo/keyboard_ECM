import { addCategoryDTO } from '../types/categoryTypes';
import { DOMAIN } from './index';
import axiosJWT from '../config/axiosJWTConfig';


const BASE_URL = `${DOMAIN}/skeleton/admin/v1/category`

export const addCategory = async (addCategoryDTO: addCategoryDTO) => {
    try {
        const response = await axiosJWT.post(BASE_URL, addCategoryDTO)
        return response.data
    } catch (error) {
        console.error('Error fetching all activities:', error);
        throw error;
    }
}

export const findAllCategory = async () => {
    try {
        const response = await axiosJWT.get(BASE_URL)
        return response.data
    } catch (error) {
        console.error('Error fetching all activities:', error);
        throw error;
    }
}
