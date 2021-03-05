import Button from '../../../components/Form/Button';

import MultiStep from '../../../components/Form/Multistep';

import TemplateTags from '../../../components/Template/Tags';
import OrderTitle from '../../../components/Order/Title';
import OrderInfo from '../../../components/Order/Info';
import OrderDetails from '../../../components/Order/Details';
import Totals from '../../../components/Order/Totals';

import { OrderCardContainer, OrderItemContainer } from './styles';

import ErrorComponent from '../../../components/ErrorComponent';
import { formatOrderStepStatus } from '../../../services/formatOrderStepStatus';
import React from 'react';
import { FaRegFileVideo } from 'react-icons/fa';
import { fetchDownload } from '../../../hooks/download';
import { useMutation } from 'react-query';
import { OrderSteps as steps } from '../../../constants/orders';
import { IsOrderExpired } from '../../../services/formatTime';

const OrderCard = ({ order }) => {
  // this is the current order status step:
  const currentStep = formatOrderStepStatus(order, steps);

  return (
    <>
      <MultiStep currentStep={currentStep} steps={steps} />
      <OrderCardContainer>
        <hr />
        <OrderInfo order={order} />
        <OrderDetails order={order} />
        <h2>Resumo do Pedido</h2>
        {order.projects.map(project => (
          <OrderItem
            project={project}
            order={order}
            currentStep={currentStep}
            key={project.id}
          />
        ))}
        <Totals total={order.net_amount} subtotal={order.gross_amount} />
      </OrderCardContainer>
    </>
  );
};

const OrderItem = ({ order, project, currentStep }) => {
  const { id, name, description, category, duration, ratio } = project;

  const { created_at } = order;
  const isOrderExpired = IsOrderExpired(created_at);

  const isDownloadable = () => {
    // // If order already expired:
    if (isOrderExpired) {
      return false;
    }
    // If order is not status 3 or 4:
    if (currentStep.id !== 3) {
      return false;
    }
    // isDownloadable!
    return true;
  };

  return (
    <OrderItemContainer>
      <hr />
      <OrderTitle name={name} description={description} />
      <TemplateTags margin="0" tags={{ category, ratio, duration }} />
      <Download project={project} isDownloadable={isDownloadable()} />
    </OrderItemContainer>
  );
};

const Download = ({ project, isDownloadable }) => {
  const { id } = project;

  const [
    mutate,
    { isIdle, isLoading, isError, isSuccess, data, error, reset }
  ] = useMutation(fetchDownload);

  const handleDownload = () => {
    mutate(id);
  };

  return (
    <>
      <Button
        primary
        width="100%"
        onClick={handleDownload}
        isLoading={isLoading}
        disabled={!isDownloadable}
      >
        <FaRegFileVideo size="18px" />
        <span>Download video</span>
      </Button>
      {isError && (
        <ErrorComponent
          hasIcon={false}
          // @ts-ignore: Unreachable code error
          message={`Erro - O arquivo não existe ou já expirou.`}
        />
      )}
      {/* {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
    </>
  );
};

export default OrderCard;
