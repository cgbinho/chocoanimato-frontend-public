interface StepsData {
  id: number;
  name: string;
  backend_name?: string;
}

export const OrderSteps: StepsData[] = [
  {
    id: 1,
    name: 'Aguardando Pagamento',
    backend_name: 'Aguardando Pagamento'
  },
  { id: 2, name: 'Pagamento Confirmado', backend_name: 'Paga' },
  { id: 3, name: 'Download Disponível', backend_name: 'Disponível' },
  { id: 4, name: 'Pedido Entregue', backend_name: 'Pedido Entregue' }
];
