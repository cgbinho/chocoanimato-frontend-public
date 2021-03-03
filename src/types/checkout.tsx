export interface CheckoutState {
  items: ItemData[];
  coupon: CouponData;
  payer: PayerData;
  payment: PaymentData;
}

export interface PaymentData {
  method: 'BOLETO' | 'CREDIT_CARD';
  card_hash: string;
  total: number;
  subtotal: number;
  card?: {
    card_holder_name: string;
    number: string;
    expiration_date: string;
  };
}

export interface PayerData {
  name: string;
  email: string;
  tax_id: string;
  address?: {
    postal_code: string;
    street: string;
    number: string;
    locality: string;
    city: string;
    region_code: string;
    region: string;
  };
}
export interface ItemData {
  id: string;
  name: string;
  template: {
    duration: number;
    ratio: string;
    price: number;
    category: string[];
    description: string;
  };
}
export interface OrderData {
  id: string;
  reference_id: string;
  transaction_id: string;
  payment_method: string;
  project_ids: string[];
  gross_amount: number;
  discount_amount: number;
  net_amount: number;
  installment_count: number;
  status: {
    pt: string;
    en: string;
  };
  projects: {
    id: string;
    name: string;
    description: string;
    category: string[];
    ratio: string;
    duration: number;
  }[];
  boleto?: Boleto;
  created_at?: string;
  updated_at?: string;
}

export interface CouponData {
  id: string;
  code: string;
  amount: number;
  is_percent: boolean;
}

export interface CheckoutItem {
  id: string;
  name: string;
  template: Template;
}

interface Template {
  duration: string;
  ratio: string;
  price: string;
  category: string;
  description: string;
}

interface Boleto {
  // id: any;
  boleto_url: string;
  boleto_barcode: string;
  boleto_expiration_date: string;
  // due_date: any;
  // pdf_url: any;
  // img_url: any;
}
