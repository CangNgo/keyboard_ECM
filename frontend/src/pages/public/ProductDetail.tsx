import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Image from "../../components/commons/Image";
import Button from "../../components/commons/Button";
import { findProductById } from "../../apis/productAPI";
import { toast, Toaster } from "sonner";
import { Properties } from "xlsx";

// Định nghĩa interface cho sản phẩm
interface ProductDetail {
  id: string | null;
  name: string;
  price: number;
  dimensions_mm?: string;
  weight_in_grams?: string;
  total_quantity?: number;
  image_url?: string;
  category?: number;
  color?: string;
  size?: string | null;
  branch?: string;
  quantity?: number;
}
interface properties {
  id: number;
  name: string;
  value: number;
  category: number;
}

interface variants {
  id: number;
  name: string;
  price: string;
  quanity: number;
  image_url: string;
  sku: string;
  product: number;
}

function ProductDetail() {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [searchParams] = useSearchParams();
  const [color, setColor] = useState("");
  const [size, setSize] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>();
  const [variant, setVariant] = useState<variants[]>([]);
  const [properties, setProperties] = useState<Properties[]>([]);
  const [currentVariant, setCurrentVariants] = useState<variants>();
  // Lấy giá trị của tham số 'id'
  const productId = searchParams.get("id") || null;

  useEffect(() => {
    const fetchProductDetail = async () => {
      if (!productId) {
        setError("Không tìm thấy ID sản phẩm");
        setLoading(false);
        toast.error("Mã sản phẩm của m ddauauu!!!!! ");
        return;
      }

      try {
        const response = await findProductById(productId);
        const product: ProductDetail = response;
        setProperties(response.properties);
        setVariant(response.variants);
        setCurrentVariants(response.variants[0]);
        console.log("sản phẩm: ", product);
        if (product) {
          setProduct(product);
          // Khởi tạo giá trị mặc định cho color và size nếu cần
          // setColor(inventories[0].color || '');
          // setSize(inventories[0].size || null);
          setImageUrl(product.image_url);
          console.log("Hình ảnh: ", product.image_url);
        } else {
          setError("Không tìm thấy sản phẩm");
        }
      } catch (err) {
        setError("Lỗi khi tải thông tin sản phẩm");
        toast.error("Gặp lỗi rồi anh eiii!");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId]);

  // Xử lý khi chọn màu
  const handleChangeColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setColor(e.target.value);
  };

  // Xử lý khi chọn kích thước
  const handleChangeSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(e.target.value);
  };

  const handleAddToCart = (id:number) => {
    if (!product) return;

    // Lấy danh sách sản phẩm từ localStorage (nếu có)
    const items: ProductDetail[] = JSON.parse(
      localStorage.getItem("cartItems") || "[]"
    );

    const existingItemIndex = items.findIndex(
      (existingItem) => existingItem.id === product.id
      //  &&
      // existingItem.color === color &&
      // existingItem.size === size
    );

    if (existingItemIndex > -1) {
      // Nếu sản phẩm đã tồn tại, tăng số lượng
      items[existingItemIndex].quantity =
        (items[existingItemIndex].quantity || 0) + 1;
    } else {
      // Nếu chưa tồn tại, thêm mới
      const newItem: ProductDetail = {
        ...product,
        quantity: 1,
        color: color,
        size: size,
        id: productId,
        price: product.price,
      };
      items.push(newItem);
    }

    // Lưu lại vào localStorage
    localStorage.setItem("cartItems", JSON.stringify(items));
    toast.success("Thêm vào giỏ hàng thành công");
  };

  const handleCheckoutNow = () => {
    handleAddToCart();
    // navigate('/checkout');
  };
  if (loading) return <div>Đang tải...</div>;
  if (error)
    return (
      <div>
        {error} <Toaster richColors position="top-right"></Toaster>
      </div>
    );
  if (!product) return <div>Không tìm thấy sản phẩm </div>;
  
  const handleCurrentVariant = (id:number) => {
    console.log("variant ID: ", id);
    
    const current = variant.filter((item) => item.id === id)
    
    setCurrentVariants(current[0])
  }
  return (
    <div className="flex text-lg justify-between">
      <div className="w-1/3 pr-4">
        <div className="w-full h-full">
          <Image
            classes="w-full h-full rounded-lg object-cover"
            src={currentVariant?.image_url || ""}
          />
        </div>
      </div>
      <div className="w-1/3 pr-4">
        <div className="flex justify-start flex-row">
          <div className="w-full flex text-left">
            <div className="w-2/5 flex flex-col">
              <span>Tên sản phẩm: </span>
              <span>Cân nặng: </span>
              <span>Giá: </span>
            </div>
            <div className="w-3/5 flex justify-start flex-col">
              <span className="text-red-500 font-medium">{product.name}</span>
              <span>{product.weight_in_grams || "Không có cân nặng"} g </span>
              <span>{currentVariant?.price} VND</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <Button
            className="bg-red-300 focus:outline-none hover:bg-red-400 w-1/3"
            onClick={handleCheckoutNow}
          >
            Mua ngay
          </Button>
          <Button
            className="bg-blue-300 focus:outline-none hover:bg-blue-400 w-2/3"
            onClick={() => handleAddToCart(currentVariant.id)}
          >
            Thêm vào giỏ hàng
          </Button>
        </div>
        {/* <div>{product.longDescription}</div> */}
      </div>
      <div className="w-1/3 pr-4">
        <div className="flex flex-wrap justify-between">
          {variant.map((item) => (
            <div key={item.id} className="w-24 h-24 " onClick={() => handleCurrentVariant(item.id)}>
              <img src={item.image_url} alt="" />
            </div>
          ))}
        </div>
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
}
export default ProductDetail;
