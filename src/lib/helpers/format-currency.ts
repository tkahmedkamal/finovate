const formatCurrency = (currency: string) => {
  return Intl.NumberFormat('en-Us', {
    style: 'currency',
    currency
  });
};

export default formatCurrency;
