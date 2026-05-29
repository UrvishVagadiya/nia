export const usePriceFormatter = () => {
  const formatPrice = (num: number) => {
    if (num >= 1000) {
      const val = num / 1000;
      return `₹${Number(val.toFixed(1))}k`;
    }
    return `₹${num.toLocaleString("en-IN")}`;
  };

  const formatCurrency = (num: number) => {
    return num.toLocaleString("en-IN");
  };

  return {
    formatPrice,
    formatCurrency,
  };
};
