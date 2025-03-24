export interface Orders{
    orderId: string; 
    email:string;
    fullName:string;
    phoneNumber:string;
    address:string;
    statusOrder:string;
    orderDate: string;
    totalPrice:number;
    description:string;

}

export interface UpdateOrder{
    orderId:string;
    status:string;
}