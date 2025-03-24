import { useNavigate } from "react-router-dom";
import { Product } from "../../pages/public/Home";
import ShoesItem from './ShoesItem';

interface ListProductProps {
  products: Product[]
}

export default function ListProduct({ products }: ListProductProps) {
  const gridColumns = 4
  const navigete = useNavigate()

  const handleItemDetail = (id: number) => {

    navigete(`/chi-tiet-san-pham?id=${id}`)
  }

  console.log("List product: " , products[1]?.image_url);
  
  return (
    <div className={`grid grid-cols-${gridColumns} gap-3`}>
      {products.map((item, index) => {
        const props = {
          id: item.id,
          title: item.name,
          min_price: item.min_price,
          max_price: item.max_price,
          // description: item.longDescription,
          image: item.image_url || "", // Trích xuất URL từ image[0]
          large: true,
          onclick: () => handleItemDetail(item.id),
        };

        return <ShoesItem {...props} key={index} />;
      })}
    </div>
  );
}