import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Image from '../../components/commons/Image';
import Button from '../../components/commons/Button';
import { findProductById } from '../../apis/productAPI';
import { toast, Toaster } from 'sonner';

// Định nghĩa interface cho sản phẩm
interface ProductDetail {
  id: string | null;
  name: string;
  price: number;
  shortDescription?: string;
  longDescription?: string;
  images: { urlImage: string }[];
  color?: string;
  size?: string|null;
  branch?: string;
  quantity?: number;
}

function ProductDetail() {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [searchParams] = useSearchParams();
  const [color, setColor] = useState('');
  const [size, setSize] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<{ urlImage: string }[]>([])

  // Lấy giá trị của tham số 'id'
  const productId = searchParams.get('id') || null;

  useEffect(() => {
    const fetchProductDetail = async () => {
      if (!productId) {
        setError('Không tìm thấy ID sản phẩm');
        setLoading(false);
        return;
      }

      try {
        const response = await findProductById(productId);
        const product = response.data.products
        const inventories = response.data.inventories
        console.log("sản phẩm: ", product);
        
        if (product) {
          setProduct(product);
          // Khởi tạo giá trị mặc định cho color và size nếu cần
          setColor(inventories[0].color || '');
          setSize(inventories[0].size || null);
          setImageUrl(product?.images[0].urlImage)
          console.log("Hình ảnh: ", product?.images[0].urlImage);
        } else {
          setError('Không tìm thấy sản phẩm');
        }
      } catch (err) {
        setError('Lỗi khi tải thông tin sản phẩm');
        toast.error("Lỗi khi lấy sản phẩm")
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

  const handleAddToCart = () => {
    if (!product) return;

    // Lấy danh sách sản phẩm từ localStorage (nếu có)
    const items: ProductDetail[] = JSON.parse(localStorage.getItem('cartItems') || '[]');
  
    const existingItemIndex = items.findIndex(
      (existingItem) => 
        existingItem.id === product.id
      //  && 
        // existingItem.color === color && 
        // existingItem.size === size
    );
  
    if (existingItemIndex > -1) {
      // Nếu sản phẩm đã tồn tại, tăng số lượng
      items[existingItemIndex].quantity = (items[existingItemIndex].quantity || 0) + 1;
    } else {
      // Nếu chưa tồn tại, thêm mới
      const newItem: ProductDetail = {
        ...product,
        quantity: 1,
        color: color, 
        size: size,
        id:productId,
        price: product.price
      };
      items.push(newItem);

    }
  
    // Lưu lại vào localStorage
    localStorage.setItem('cartItems', JSON.stringify(items));
    toast.success("Thêm vào giỏ hàng thành công")
  };

  const handleCheckoutNow = () => {
    handleAddToCart();
    // navigate('/checkout');
  };
  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Không tìm thấy sản phẩm</div>;

  return (
    <div className="flex text-lg justify-between">
      <div className="w-1/3 pr-4">
        <div className="w-full h-full">
          <Image 
            classes="w-full h-full rounded-lg object-cover" 
            src={product.images?.[0]?.urlImage || ''} 
          />
        </div>
      </div>
      <div className="w-1/3 pr-4">
        <div className="flex justify-start flex-row">
          <div className="w-3/5 flex text-left">
            <div className="w-1/2 flex flex-col">
              <span>Tên sản phẩm: </span>
              <span>Mô tả: </span>
              <span>Giá: </span>
              <span>Màu: </span>
              <span>Kích cỡ: </span>
            </div>
            <div className="w-1/2 flex justify-start flex-col">
              <span className='text-red-500 font-medium'>{product.name}</span>
              <span>{product.shortDescription || 'Không có mô tả'}</span>
              <span>{product.price} VND</span>
              <span>
                <select
                  name="shoes-color"
                  className="p-0 w-40 border rounded-md focus:outline-none"
                  id="shoes-color"
                  value={color}
                  onChange={handleChangeColor}
                >
                  {/* Thêm các option cho màu sắc nếu có */}
                  <option value="">{color}</option>
                </select>
              </span>
              <span>
                <select
                  name="shoes-size"
                  className="p-0 w-40 border rounded-md focus:outline-none"
                  id="shoes-size"
                  value={size || ''}
                  onChange={handleChangeSize}
                >
                  {/* Thêm các option cho kích thước nếu có */}
                  <option >{size}</option>
                </select>
              </span>
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
            onClick={handleAddToCart}
          >
            Thêm vào giỏ hàng
          </Button>
        </div>
        <div>{product.longDescription}</div>
      </div>
      <div className="w-1/3 pr-4">
        {product.images?.[1] && (
          <Image src={product.images[1].urlImage} />
        )}
      </div>
      <Toaster richColors position='top-right'/>
    </div>
  );
}
export default ProductDetail;