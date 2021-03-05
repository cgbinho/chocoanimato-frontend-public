import { FiFilm, FiClock } from 'react-icons/fi';
import { BsPhoneLandscape, BsPhone } from 'react-icons/bs';

import { OrderTitleContainer } from './styles';
import OrderThumbnail from '../Thumbnail';

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
