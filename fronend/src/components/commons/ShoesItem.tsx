import React from "react";
import Image from "./Image";
import useFormatCurrency from "../../hooks/useFormatCurrency";
interface ProdcutPtops {
  id: string;
  title: string;
  description?: string;
  image: string;
  classes?: string;
  classesImg?: string;
  classesTitle?: string;
  classesDescription?: string;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
  price?: number; 
  index?:number;
  onclick: (id: string) => void;
}
function ShoesItem({
  id,
  title,
  description,
  image,
  small,
  medium,
  large,
  classes = "text-md ",
  classesImg,
  classesTitle = " text-md w-full text-center",
  classesDescription = "  text-md w-full text-center",
  price = 0, 
  onclick,
  index
}: ProdcutPtops) {
  //điều chỉnh props
const priceItem = useFormatCurrency(price)
  //size small
  if (small) {
    classes += " w-16 text-small mr-4";
    classesImg += " w-3/5 rounded-2xl pt-2";
    classesTitle += " text-lg whitespace-normal break-words line-clamp-1";
    classesDescription += " text-sm whitespace-normal break-words line-clamp-2";
  }

  //size medium
  if (medium) {
    classes += " w-32 text-small mr-4";
    classesImg += " w-4/5 rounded-2xl pt-2";
    classesTitle += " text-lg whitespace-normal break-words line-clamp-1";
    classesDescription += " text-sm whitespace-normal break-words line-clamp-2";
  }

  if (large) {
    classes += " w-44 h-56 text-small mr-4";
    classesImg += " w-full h-full object-cover rounded-2xl pt-2";
    classesTitle += " text-base whitespace-normal break-words line-clamp-1";
    classesDescription += " text-sm whitespace-normal break-words line-clamp-2";
  }

  console.log("shoes item: ", image);
  

  return (
    <div className={`${classes} w-full flex flex-col items-center justify-center cursor-pointer`} >
      <div className="w-40 h-40 flex items-center justify-center" onClick={() => {onclick(id)}}>
        <Image src={image} className={classesImg} />
      </div>
      <div className={`${classesTitle} text-center`}>{title}</div>
      <div className={`${classesDescription} text-center`}>{description}</div>
      {large && (<div className="text-red-400 font-bold text-center">{priceItem}</div>)}
    </div>
  );
}

export default ShoesItem;
