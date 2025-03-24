import axios from "axios";
import axiosJWT from "../config/axiosJWTConfig";
import { Login, SignIn } from "../types/userTypes";
import { DOMAIN } from './index';

const apiSigIn = "/skeleton/public/v1/user";
const apiLogin = "api/token"
export const addUser=async (signIn:SignIn) =>{
    try {
        const response = await axiosJWT.post(`${DOMAIN}${apiSigIn}`,signIn)
        console.log(response.data);
        
        return response.data
    } catch (error) {
        throw new Error
    }
}

export const login = async (login:Login) => {
    try {
        const response = await axiosJWT.post(`${apiLogin}`,login)
        console.log(response);
        return response.data
    } catch (error) {
        throw new Error
    }
}