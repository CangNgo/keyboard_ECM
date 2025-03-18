import React, { useEffect, useState } from "react";
import ShoesItem from './../../components/commons/ShoesItem';
import Image from './../../components/commons/Image';
import ListProduct from "../../components/commons/ListProduct";
import { findAllProduct } from "../../apis/productAPI";

// Định nghĩa ImageData với thuộc tính urlImage
export interface ImageData {
  urlImage: string;
}

export interface Product {
  id: string;
  images: ImageData[]; 
  name: string;
  price: number;
  shortDescription: string;
  longDescription: string;
}

function Home() {
  const [product, setProduct] = useState<Product[]>([])

  useEffect(() => {

    const fetchAllProduct = async () => {
      const response = await findAllProduct()
      console.log(response.data);
      setProduct(response.data)
      console.log("Product : ", product);
    }
    fetchAllProduct()
  }, [])

  return <>
    <ListProduct products={product} />
  </>
}

export default Home;