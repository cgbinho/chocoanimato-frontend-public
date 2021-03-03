import OrderThumbnail from '../Thumbnail';
import { OrderTitleContainer } from './styles';

const OrderTitle = ({ name, description }) => {
  return (
    <OrderTitleContainer>
      <OrderThumbnail width="54" height="52" />
      <aside>
        <h4>{name}</h4>
        <p>{description}</p>
      </aside>
    </OrderTitleContainer>
  );
};

export default OrderTitle;
