import { formatPrice } from '../../../services/formatPrice';
import { Container } from './styles';

const Totals = ({ total, subtotal }) => {
  const subtotalFormatted = formatPrice(subtotal);
  const totalFormatted = formatPrice(total);
  const discountFormatted = formatPrice(subtotal - total);

  const hasDiscount = total !== subtotal;

  return (
    <Container>
      <hr />
      <section>
        <h4>Subtotal</h4>
        <h4>{subtotalFormatted}</h4>
      </section>
      {hasDiscount && (
        <section className="discount">
          <h4>Desconto</h4>
          <h4>- {discountFormatted}</h4>
        </section>
      )}
      <section>
        <h3>Total</h3>
        <h3>{totalFormatted}</h3>
      </section>
    </Container>
  );
};

export default Totals;
