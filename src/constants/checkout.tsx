interface BrazillianStatesData {
  name: string;
  value: string;
}

interface StepsData {
  id: number;
  name: string;
}

export const CheckoutSteps: StepsData[] = [
  { id: 1, name: 'Dados Pessoais' },
  { id: 2, name: 'Endereço' },
  { id: 3, name: 'Modo de Pagamento' },
  { id: 4, name: 'Confirmação do Pedido' }
];

export const BrazillianStates: BrazillianStatesData[] = [
  { name: 'Acre', value: 'ac' },
  { name: 'Alagoas', value: 'al' },
  { name: 'Amapá', value: 'ap' },
  { name: 'Amazonas', value: 'am' },
  { name: 'Bahia', value: 'ba' },
  { name: 'Ceará', value: 'ce' },
  { name: 'Distrito Federal', value: 'df' },
  { name: 'Espírito Santo', value: 'es' },
  { name: 'Goiás', value: 'go' },
  { name: 'Maranhão', value: 'ma' },
  { name: 'Mato Grosso', value: 'mt' },
  { name: 'Mato Grosso do Sul', value: 'ms' },
  { name: 'Minas Gerais', value: 'mg' },
  { name: 'Pará', value: 'pa' },
  { name: 'Paraíba', value: 'pb' },
  { name: 'Paraná', value: 'pr' },
  { name: 'Pernambuco', value: 'pe' },
  { name: 'Piauí', value: 'pi' },
  { name: 'Rio de Janeiro', value: 'rj' },
  { name: 'Rio Grande do Norte', value: 'rn' },
  { name: 'Rio Grande do Sul', value: 'rs' },
  { name: 'Rondônia', value: 'ro' },
  { name: 'Roraima', value: 'rr' },
  { name: 'Santa Catarina', value: 'sc' },
  { name: 'São Paulo', value: 'sp' },
  { name: 'Sergipe', value: 'se' },
  { name: 'Tocantins', value: 'to' }
];
