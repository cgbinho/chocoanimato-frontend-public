import { Container, PriceContainer } from './styles';
import { formatPrice } from '../../../services/formatPrice';

interface IPriceProps {
  justify: string; // 'center', 'end'
  price: number;
  oldPrice?: number;
}

const OrderPrice: React.FC<IPriceProps> = ({ price, oldPrice, justify }) => {
  const oldPriceFormatted = formatPrice(oldPrice);
  const priceFormatted = formatPrice(price);

  return (
    <PriceContainer justify={justify}>
      {oldPrice && <del>{oldPriceFormatted}</del>}
      <h4>{priceFormatted}</h4>
    </PriceContainer>
  );
};

export default OrderPrice;
