export interface addCategoryDTO  {
    name:string; 
    status:string;
    isDeleted: boolean;
    description:string
}

export interface category{
    id: string; 
    name: string; 
    image: string;
    status: string;
    isDeleted: boolean;
    description:string;
    
}