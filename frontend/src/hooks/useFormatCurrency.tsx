import { useMemo } from "react";

const useFormatCurrency = (amount: number|undefined) => {
  if (!amount) amount = 0
  return useMemo(() => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }, [amount]);
};

export default useFormatCurrency;
