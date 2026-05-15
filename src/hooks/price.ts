export const usePriceFormatter = () => {
  const formatPrice = (num: number) => {
    if (num >= 1000) {
      return `₹${(num / 1000).toFixed(0)}k`;
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
