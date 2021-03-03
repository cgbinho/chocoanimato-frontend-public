export type IUserProps = {
  id: string;
  name: string;
  email: string;
  is_verified: boolean;
  provider: string;
  token: string;
};

export type ISignUpCredentials = {
  name: string;
  email: string;
  password: string;
};

export type ISignInCallbackProps = {
  user: IUserProps;
  token: string;
  provider?: string;
};

export type AuthState = {
  token: string;
  user: IUserProps;
  // provider: string;
};

export type ISignInProps = {
  email: string;
  password: string;
};

export type OrderProps = {
  id: string;
  transaction_id: string;
  payment_method: string;
  boleto?: string;
  project_ids: string[];
  gross_amount: number;
  discount_amount: number;
  net_amount: number;
  installment_count: number;
  status: number;
  created_at: string;
  updated_at: string;
};
