import Link from 'next/link';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { useCheckout } from '../../../hooks/checkout';

import { Container } from './styles';

type ICartIconProps = {
  size: string;
};

const CartIcon: React.FC<ICartIconProps> = ({ size }: ICartIconProps) => {
  // const { checkout } = useCheckout();

  // const { items } = checkout;

  // Check if there are items.
  // const hasItems = !!items?.[0];

  return (
    <Container>
      <Link href="/checkout">
        <a>
          {/* {hasItems && <span>{items.length}</span>} */}
          <HiOutlineShoppingCart size={size} />
        </a>
      </Link>
    </Container>
  );
};

export default CartIcon;
