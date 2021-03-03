import { formatPrice } from '../../../services/formatPrice';
import { PriceContainer } from './styles';

const Price = ({ price }) => {
  const priceFormatted = formatPrice(price);
  return (
    <PriceContainer>
      {/* <del>{priceFormatted}</del> */}
      <span>{priceFormatted}</span>
    </PriceContainer>
  );
};

export default Price;
