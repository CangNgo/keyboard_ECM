import React, { useEffect, useState } from "react";
import ShoesItem from '../../components/commons/ShoesItem';
import Image from '../../components/commons/Image';
import ListProduct from "../../components/commons/ListProduct";
import { findAllProduct } from "../../apis/productAPI";

// Định nghĩa ImageData với thuộc tính urlImage
export interface ImageData {
  urlImage: string;
}

export interface Product {
  id: number;
  image_url: string; 
  name: string;
  min_price: number;
  max_price: number;
}

function Home() {
  const [product, setProduct] = useState<Product[]>([])

  useEffect(() => {

    const fetchAllProduct = async () => {
      const response = await findAllProduct()
      console.log(response);
      setProduct(response)
      console.log("Product : ", product);
    }
    fetchAllProduct()
  }, [])

  return <>
    <ListProduct products={product} />
  </>
}

export default Home;