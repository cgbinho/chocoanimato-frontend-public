import { IStepDTO } from '../types/multistep';
import { IsOrderExpired } from './formatTime';
/*
GETS THE STATUS NUMBER BASED ON STATUS NAME.
*/
export const formatOrderStepStatus = (order: any, steps: IStepDTO[]) => {
  const status = order.status;

  if (status.en === 'waiting_payment') {
    return {
      id: 1,
      name: 'Aguardando Pagamento'
    };
  }

  if (status.en === 'authorized') {
    return {
      id: 2,
      name: 'Pagamento Confirmado'
    };
  }

  if (status.en === 'paid') {
    return {
      id: 3,
      name: 'Download Disponível'
    };
  }

  // If order expired, returns 'Pedido Entregue'.
  const isOrderExpired = IsOrderExpired(order.created_at);

  if (isOrderExpired) {
    const statusGenerated = {
      id: 4,
      name: 'Pedido Entregue'
    };
    return statusGenerated;
  }

  // If no compatible status is found, generate a custom status:
  return { id: 5, name: 'Aguardando novo status' };
};
