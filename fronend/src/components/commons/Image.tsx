import React from "react";
import { useState, forwardRef } from "react";
import defaultImage from "../../assets/img/defaultImage.jpg";
interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string  ;
  alt?: string;
  fallBack?: string;
  imgSmall?: boolean;
  classes?: string;
  imgCart?: boolean;
  imgString?:{ urlImage: string; };
}

const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ src, alt, imgSmall, imgCart, imgString, classes, ...props }, ref) => {
    const [fallBack, setFallBack] = useState("");

    const handleError = () => {
      setFallBack(defaultImage);
    };

    classes += " overflow-hidden object-cover";
    if (imgSmall) {
      classes += " w-22";
    }

    if (imgCart) {
      classes += " w-";
    }
    if(imgString){
      src = imgString?.urlImage
    }
    return (
      <img
        className={classes + " w-24 bg-none"}
        ref={ref}
        src={src ?  src : fallBack}
        alt={alt}
        {...props}
        onError={handleError}
      />
    );
  }
);

export default Image;
