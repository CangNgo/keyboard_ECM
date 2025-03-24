import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/commons/Button";
import Image from "../../components/commons/Image";
import { faAdd, faMinus } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import useFormatCurrency from "../../hooks/useFormatCurrency";

interface CartItemProps {
  item: {
    id: string;
    images: { urlImage: string }[]; 
    name: string;
    price: number;
    color: string;
    size: string;
    branch: string;
    quantity: number;
  };
  onQuantityChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => void;
  onMinusQuantity: (id: string) => void;
  onAddQuantity: (id: string) => void;
  onRemoveItem: (id: string) => void;
  onChecked: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onQuantityChange,
  onMinusQuantity,
  onAddQuantity,
  onRemoveItem,
  onChecked
}) => {
  return (
    <tr>
      <td className="py-3">
        <div className="flex justify-center items-center">
          <input className="mr-4 top-0" onClick={() => onChecked(item.id)} type="checkbox" />
          <div className="">
            {item.images?.[0] && (
              <Image imgString={item.images[0]} />
            )}
          </div>
        </div>
      </td>
      <td className="py-3">
        <div className="w-3/5 flex text-left justify-center flex-row items-center">
          <div className="flex justify-center flex-col">
            <span>Nike 01</span>
            <span>Giầy thể thao</span>
            <span>
              <select
                name={`shoes-color-${item.id}`}
                className="p-0 w-40 border-none rounded-md focus:outline-none focus:ring-transparent focus:border-none"
                id={`shoes-color-${item.id}`}
              >
                  <option value={item.color}>
                    {item.color}
                  </option>
              </select>
            </span>
            <span>Nike</span>
            <span>
              <select
                name={`shoes-size-${item.id}`}
                className="p-0 w-40 border-none rounded-md focus:outline-none focus:ring-transparent focus:border-none"
                id={`shoes-size-${item.id}`}
              >
                  <option value={item.size}>
                    {item.size}
                  </option>
              </select>
            </span>
          </div>
        </div>
      </td>
      <td className="text-center py-3">
        <div>{useFormatCurrency(item.price)}</div>
      </td>
      <td className="text-center py-3">
        <div className="flex border-spacing-0 border w-[84%] justify-between">
          <Button
            onClick={() => onMinusQuantity(item.id)}
            marginIconNone
            className="rounded-none active:bg-slate-400 focus:outline-none text-center"
            lefticon={<FontAwesomeIcon className="mr-0" icon={faMinus} />}
          />
          <input
            className="w-14 p-0 text-center no-spinner border-none"
            min={1}
            max={999}
            value={item.quantity}
            onChange={(e) => onQuantityChange(e, item.id)}
            type="number"
          />
          <Button
            onClick={() => onAddQuantity(item.id)}
            marginIconNone
            className="rounded-none active:bg-slate-400 focus:outline-none text-center"
            lefticon={<FontAwesomeIcon icon={faAdd} />}
          />
        </div>
      </td>
      <td className="text-center py-3">
        <div className="totalPrice">
          {useFormatCurrency(item.price * item.quantity)}
        </div>
      </td>
      <td className="text-center py-3">
        <div className="remove-item">
          <Button onClick={() => onRemoveItem(item.id)}>Xóa</Button>
        </div>
      </td>
    </tr>
  );
};

export default CartItem;
