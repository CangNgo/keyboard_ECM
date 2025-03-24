import React, { useEffect, useState } from "react";
import TextField from "../../components/commons/TextField";
import SelectBox from "../../components/commons/SelectBox";
import Button from "../../components/commons/Button";
import { category } from "../../types/categoryTypes";
import { findAllCategory } from "../../apis/categoryAPI";
import { SelectBoxType } from "../../types/optionSelecBox";
import { findAllSuppliers } from "../../apis/supplierAPI";
import { SupplierDTO } from "../../types/supplierType";
import { Toaster, toast } from "sonner"
import { AddProduct } from "../../types/product";
import axiosJWT from "../../config/axiosJWTConfig";
import { addProduct } from "../../apis/productAPI";
import { DOMAIN } from "../../apis";

interface FormData {
  productName: string;
  categoryId: string;
  price: number;
  shortDescription: string;
  longDescription: string;
  size: number;
  maxQuantity: number;
  miniQuantiy: number;
  quantityInStock: number;
  color: string;
}

function AddProduct() {

  const [imagePreview, setImagePreview] = useState<string[]>([]); // State để lưu URL của ảnh preview
  const [category, setCategory] = useState<category[]>([])
  const [supplier, setSupplier] = useState<SupplierDTO[]>([])
  const [optionCategory, setOptionCategory] = useState<SelectBoxType[]>([])
  const [optionSupplier, setOptionSupplier] = useState<SelectBoxType[]>([])
  //các thuộc tính
  const [imageFile, setImageFile] = useState<File[]>([]);
  const [formData, setFormData] = useState<FormData>()
  const [productName, setProductName] = useState<string>("")
  const [productPrice, setProductPrice] = useState<number>(0)
  const [productShortDescription, setProductShortDescription] = useState<string>("")
  const [productLongDescription, setProductLongDescription] = useState<string>("")
  const [productSize, setProductSize] = useState<string>("0")
  const [productMaxQuantity, setProductMaxQuantity] = useState<number>(0)
  const [productMiniQuantity, setProductMiniQuantity] = useState<number>(0)
  const [productInStock, setProductInStock] = useState<number>(0)
  const [productColor, setProductColor] = useState<string>("")
  const [productSupplier, setProductSupplier] = useState<string>("")
  const [productCategory, setProductCategory] = useState<string>("")

  useEffect(() => {
    const fetchAllCategory = async () => {
      try {
        const response = await findAllCategory()
        setCategory(response.data)
        const options = response.data.map((item: category) => ({
          value: item.id,
          label: item.name,
          disable: item.isDeleted,
        }));
        setOptionCategory(options);
      } catch (error) {
        console.log("Lỗi khi lấy category", error);
        return null
      }
    }

    //fetch supplier 
    const fetchAllSuppliers = async () => {
      try {
        const response = await findAllSuppliers()
        console.log(response.body.data);
        
        setSupplier(response.body.data)
        const options = response.body.data.map((item: SupplierDTO) => ({
          value: item.supplierId,
          label: item.supplierName,
        }));

        setOptionSupplier(options)
        return response.data
      } catch (error) {
        console.log("Lỗi khi lấy supplier", error);
        throw new Error

      }
    }

    fetchAllSuppliers()
    fetchAllCategory()

  }, [])

  //xử lý form 

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setImageFile(files);

      // Tạo URL preview cho mỗi file
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setImagePreview(newPreviews);
    }
  };

  const handleChangProductName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const productName = e.target.value;
    setProductName(productName);
  };

  const handleChangProductPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = Number(e.target.value)

    setProductPrice(price);
  };

  const handleChangProductShortDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductShortDescription(e.target.value);
  };

  const handleChangProductLongDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductLongDescription(e.target.value);
  };

  const handleChangProductSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductSize(e.target.value);
  };

  const handleSupplier = (e: React.ChangeEvent<HTMLSelectElement>) => {    
    setProductSupplier(e.target.value)
    console.log(e.target.value);

  };
  const handleProductCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProductCategory(e.target.value)
  };

  const handleProductMaxQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductMaxQuantity(Number(e.target.value));
  };

  const handleProductMiniQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductMiniQuantity(Number(e.target.value));
  };

  const handleProductInStock = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductInStock(Number(e.target.value));
  };

  const handleProductColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductColor(e.target.value);
  };

  const handleAddProduct = async () => {
    try {
      // Tạo FormData để gửi file
      const formData = new FormData();

      // Thêm các trường văn bản
      formData.append('categoryId', productCategory);
      formData.append('supplierId', productSupplier);
      formData.append('name', productName);
      formData.append('price', productPrice.toString());
      formData.append('shortDescription', productShortDescription);
      formData.append('longDescription', productLongDescription);
      formData.append('color', productColor);
      formData.append('quantityInStock', productInStock.toString());
      formData.append('minimumInStock', productMiniQuantity.toString());
      formData.append('maximumInStock', productMaxQuantity.toString());
      formData.append('size', productSize.toString());

      // Thêm các file ảnh
      imageFile.forEach((file, index) => {
        formData.append('images', file);
      });

      // Gọi API với FormData
      const response = await axiosJWT.post(`${DOMAIN}/skeleton/admin/v1/inventory`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response) {
        toast.success("Thêm sản phẩm thành công");
        // Reset form
        resetForm();
      }
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error("Lỗi khi thêm sản phẩm");
    }
  };

  // Hàm reset form tách riêng
  const resetForm = () => {
    setProductName("");
    setProductPrice(0);
    setProductShortDescription("");
    setProductLongDescription("");
    setProductSize("0");
    setProductMaxQuantity(0);
    setProductMiniQuantity(0);
    setProductInStock(0);
    setProductColor("");
    setImageFile([]);
    setImagePreview([]);
    setProductSupplier("");
    setProductCategory("");
  };


  return <>
    <div className="flex">
      <div className="w-1/3">
        <div className="ml-2 mr-2">
          <SelectBox customClassName="w-full" onChange={handleProductCategory} options={optionCategory} defaultOptionValue={"Loại sản phẩm"} name="category-id" id="category-id" label="Loại sản phẩm" />
        </div>
        <TextField onChange={handleChangProductName} value={productName} placeholder="Example" name="product-name" id="product-name" type="text" label="Tên sản phẩm" />
        <TextField onChange={handleChangProductPrice} value={String(productPrice)} placeholder="Example" name="product-price" id="product-price" type="number" label="Giá sản phẩm" />
        <TextField onChange={handleChangProductShortDescription} value={productShortDescription} placeholder="Example" name="product-shortdescription" id="product-shortdescription" type="text" label="Mô tả ngắn" />
        <TextField onChange={handleChangProductLongDescription} value={productLongDescription} placeholder="Example" name="product-longdescription" id="product-longdescription" type="text" label="Mô tả dài" />
        <TextField onChange={handleChangProductSize} value={productSize} placeholder="Example" name="product-size" id="product-size" type="number" label="Kích thước" />
      </div>
      <div className="w-1/3">
        <div className="ml-2 mr-2">
          <SelectBox customClassName="w-full" onChange={handleSupplier} options={optionSupplier} defaultOptionValue={"Chọn nhà cung cấp"} name="supplier-id" id="supplier-id" label="Nhà cung cấp" />
        </div>
        <TextField onChange={handleProductMaxQuantity} value={String(productMaxQuantity)} placeholder="Example" name="max-quantity" id="max-quantity" type="number" label="Số lượng tối đa" />
        <TextField onChange={handleProductMiniQuantity} value={String(productMiniQuantity)} placeholder="Example" name="mini-quantity" id="mini-quantity" type="number" label="Số lượng tối thiểu" />
        <TextField onChange={handleProductInStock} value={String(productInStock)} placeholder="Example" name="quantity-in-stock" id="quantity-in-stoct" type="number" label="Số lượng hiện tại" />
        <TextField onChange={handleProductColor} value={productColor} placeholder="Example" name="product-color" id="product-color" type="text" label="Màu" />
        <TextField placeholder="Example" name="product-image" id="product-image" type="file" multiple label="Hình ảnh" className="w-1/2" onChange={(e) => { handleImageChange(e) }} />
        <Button onClick={handleAddProduct} className="float-right mr-3 bg-blue-200 hover:bg-blue-400">Thêm sản phẩm</Button>

      </div>
      <Toaster richColors position="top-right" />
      <div className="w-96 p-4 h-96 flex ">
        {imagePreview.map((item, index) => (
          <img key={index} src={item} alt="" />
        ))}
      </div>
    </div>
  </>;
}

export default AddProduct;
